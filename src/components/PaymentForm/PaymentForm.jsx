/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import styled from "styled-components"

import DropList from "./DropList"
import {
  getProvinces,
  getDistrictsByProvinceId,
  getWardsByDistrictId,
} from "../../services/apiLocation"

export default function PaymentForm({ isOpen, onClose }) {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

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
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProvinces()
      setProvinces(data)
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectChange = async (name, id, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "province" && { district: "", ward: "" }),
      ...(name === "district" && { ward: "" }),
    }))

    if (name === "province") {
      const fetchedDistricts = await getDistrictsByProvinceId(id)
      setDistricts(fetchedDistricts || [])
    }

    if (name === "district") {
      const fetchedWards = await getWardsByDistrictId(id)
      setWards(fetchedWards || [])
    }
  }

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form data submitted:", formData)
    // Xử lý gửi dữ liệu form ở đây
    onClose()
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={(e) => handleCloseModal(e)}>
      <ModalContent>
        <FormTitle>Payment Information</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
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
          <Button type="submit">Thanh toán</Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  )
}

const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
}

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
`

const ModalContent = styled.div`
  background-color: ${colors.fourthColor};
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(22, 66, 60, 0.1);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: var(--font-size-lg);
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${colors.thirdColor};
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: ${colors.secondaryColor};
  }
`

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid ${colors.thirdColor};
  border-radius: 4px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: ${colors.secondaryColor};
  }
`

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
    accent-color: ${colors.primaryColor};
  }
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${colors.primaryColor};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.secondaryColor};
  }
`

const FormTitle = styled.h2`
  color: ${colors.primaryColor};
  text-align: center;
  margin-bottom: 20px;
`
