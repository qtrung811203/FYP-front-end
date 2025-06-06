/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../hooks/useAuth";

import {
  getProvinces,
  getDistrictsByProvinceId,
  getWardsByDistrictId,
} from "../../services/apiLocation";
import emailValidation from "../../utils/emailValidation";
import { checkout, checkoutCod } from "../../services/apiCheckout";

//COMPONENTS
import CodModal from "./CodModal";
import Loading from "../Loading/Loading";
import LoadingModal from "../Loading/LoadingModal";
import DropList from "./DropList";

const stripePromise = loadStripe(
  "pk_test_51Q7T5KHxv792P1FeVX2530832RhslIDMtKZbqcDFOmoCrK76ZUeoJgDvyVgPZaxlzLi1xLKQcH0hMIjkuN6Jqx2D00FleKVO8J"
);

export default function PaymentForm({ isOpen, onClose }) {
  const { user, userLoading } = useAuth();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [codSuccess, setCodSuccess] = useState(false);

  const cart = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
    paymentMethod: "stripe",
  });

  //Fill Data to form
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        fullName: user.name,
        phoneNumber: user.phoneNumber,
        address: user?.address?.address || "",
        province: user?.address?.province || "",
        district: user?.address?.district || "",
        ward: user?.address?.ward || "",
        note: "",
        paymentMethod: "stripe",
      });
    }
  }, [user]);

  // Fetch provinces data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch districts data
  useEffect(() => {
    const fetchDistricts = async () => {
      if (formData.province) {
        try {
          const provinceId =
            provinces.find((p) => p.name === formData.province)?.id ?? null;
          if (!provinceId) return;
          const fetchedDistricts = await getDistrictsByProvinceId(provinceId);
          setDistricts(fetchedDistricts || []);
        } catch (error) {
          console.error("Failed to fetch districts:", error);
        }
      }
    };

    fetchDistricts();
  }, [formData.province, provinces]);

  // Fetch wards data
  useEffect(() => {
    const fetchWards = async () => {
      if (formData.district) {
        try {
          const districtId =
            districts.find((d) => d.name === formData.district)?.id ?? null;
          if (!districtId) return;
          const fetchedWards = await getWardsByDistrictId(districtId);
          setWards(fetchedWards || []);
        } catch (error) {
          console.error("Failed to fetch wards:", error);
        }
      }
    };

    fetchWards();
  }, [formData.district, districts]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate email
    if (name === "email") {
      if (!emailValidation(value)) {
        setError("Invalid email");
      } else {
        setError(null);
      }
    }
  };

  // Handle select change
  const handleSelectChange = async (name, id, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "province" && { district: "", ward: "" }),
      ...(name === "district" && { ward: "" }),
    }));
  };

  // Handle close modal
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setError(null);
      document.body.style.overflow = "auto";
      onClose();
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValidation(formData.email)) {
      alert("Please enter valid email");
      return;
    }
    {
      if (formData.paymentMethod === "cod") {
        setLoading(true);
        const codResponse = await checkoutCod({
          user: formData,
          items: cart.items,
        });
        console.log(codResponse);
        if (!codResponse) {
          alert("Checkout failed, please try again");
          return;
        } else {
          setCodSuccess(true);
        }
      } else {
        try {
          setLoading(true);
          const stripe = await stripePromise;
          const response = await checkout({
            user: formData,
            items: cart.items,
          });
          if (response) {
            stripe.redirectToCheckout({ sessionId: response });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  if (userLoading) return <Loading />;

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => handleCloseModal(e)}>
      <ModalContent>
        <FormTitle>Payment Information</FormTitle>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={user ? user.email : formData.email}
            onChange={handleChange}
            disabled={user}
            required
          />
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <DropList
            options={provinces}
            placeholder="Province"
            value={formData.province}
            onChange={(id, value) => handleSelectChange("province", id, value)}
            disabled={false}
          />
          <DropList
            options={districts}
            placeholder="District"
            value={formData.district}
            onChange={(id, value) => handleSelectChange("district", id, value)}
            disabled={!formData.province}
          />
          <DropList
            options={wards}
            placeholder="Ward"
            value={formData.ward}
            onChange={(id, value) => handleSelectChange("ward", id, value)}
            disabled={!formData.district}
          />
          <TextArea
            name="note"
            placeholder="Note (optional)"
            value={formData.note}
            onChange={handleChange}
          />
          <RadioGroup>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={formData.paymentMethod === "stripe"}
                onChange={handleChange}
              />
              Pay with Stripe
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Cash on deliverys
            </label>
          </RadioGroup>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <CircularProgress color="white" size={20} />
            ) : (
              "Checkout"
            )}
          </Button>
        </Form>
      </ModalContent>
      <LoadingModal isOpen={loading} />
      <CodModal open={codSuccess} onClose={handleCloseModal} />
    </ModalOverlay>
  );
}

// Styles Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--fourth-color);
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(22, 66, 60, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: var(--font-size-lg);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--third-color);
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--third-color);
  border-radius: 4px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 15px;
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  input[type="radio"] {
    margin-right: 5px;
    accent-color: var(--primary-color);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--secondary-color);
  }
  &:disabled {
    background-color: var(--third-color);
    cursor: not-allowed;
  }
`;

const FormTitle = styled.h2`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: var(--font-size-sm);
  margin-top: -18px;
  margin-bottom: -15px;
`;
