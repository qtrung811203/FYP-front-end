import styled from "styled-components"
import { useEffect, useState } from "react"

import { MdModeEdit as Edit2 } from "react-icons/md"
import { FaTrash as Trash2 } from "react-icons/fa"
import { FaPlus as Plus } from "react-icons/fa"

import { useAuth } from "../../hooks/useAuth"
import DropList from "../PaymentForm/DropList"
import {
  getProvinces,
  getDistrictsByProvinceId,
  getWardsByDistrictId,
} from "../../services/apiLocation"
import { updateUser } from "../../services/apiUser"

const AddressesComponent = () => {
  const { user, setUser } = useAuth()
  const [address, setAddress] = useState(user?.address ?? undefined)
  const [showForm, setShowForm] = useState(false)

  // Location data
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const [newAddress, setNewAddress] = useState({
    address: "",
    province: "",
    district: "",
    ward: "",
  })

  // Fetch provinces data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProvinces()
        setProvinces(data)
      } catch (error) {
        console.error("Failed to fetch provinces:", error)
      }
    }
    fetchData()
  }, [])

  // Fetch districts data
  useEffect(() => {
    const fetchDistricts = async () => {
      if (newAddress.province) {
        try {
          const provinceId = provinces.find((p) => p.name === newAddress.province)?.id ?? null
          if (!provinceId) return
          const fetchedDistricts = await getDistrictsByProvinceId(provinceId)
          setDistricts(fetchedDistricts || [])
        } catch (error) {
          console.error("Failed to fetch districts:", error)
        }
      }
    }

    fetchDistricts()
  }, [newAddress.province, provinces])

  // Fetch wards data
  useEffect(() => {
    const fetchWards = async () => {
      if (newAddress.district) {
        try {
          const districtId = districts.find((d) => d.name === newAddress.district)?.id ?? null
          if (!districtId) return
          const fetchedWards = await getWardsByDistrictId(districtId)
          setWards(fetchedWards || [])
        } catch (error) {
          console.error("Failed to fetch wards:", error)
        }
      }
    }

    fetchWards()
  }, [newAddress.district, districts])

  // Handle show form
  const handleShowForm = () => {
    setShowForm(true)
  }

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select change
  const handleSelectChange = async (name, id, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "province" && { district: "", ward: "" }),
      ...(name === "district" && { ward: "" }),
    }))
  }

  // Handle edit address
  const handleEditAddress = async (address) => {
    setNewAddress(address)
    setShowForm((prev) => !prev)
  }

  const handleDeleteAddress = async () => {
    // Delete
    const updatedUser = await updateUser({ address: null })
    setUser(updatedUser.data.user)
    setAddress(null)
    setNewAddress({
      address: "",
      province: "",
      district: "",
      ward: "",
    })
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedUser = await updateUser({ address: newAddress })
    setUser(updatedUser.data.user)
    setAddress(updatedUser.data.user.address)
    setShowForm(false)
  }

  return (
    <>
      {address ? (
        <>
          <ContentHeader>YOUR ADDRESS</ContentHeader>
          <AddressCard>
            <AddressActions>
              <ActionButton onClick={() => handleEditAddress(address)}>
                <Edit2 size={18} />
              </ActionButton>
              <ActionButton onClick={() => handleDeleteAddress(address.id)}>
                <Trash2 size={18} />
              </ActionButton>
            </AddressActions>
            <p>
              <strong>Address:</strong> {address.address}
            </p>
            <p>
              <strong>Province:</strong> {address.province}
            </p>
            <p>
              <strong>District:</strong> {address.district}
            </p>
            <p>
              <strong>Ward:</strong> {address.ward}
            </p>
          </AddressCard>
        </>
      ) : (
        <p>Don&apos;t have address</p>
      )}

      {!address && (
        <AddAddressButton onClick={handleShowForm}>
          <Plus size={20} />
          Add address
        </AddAddressButton>
      )}

      {showForm && (
        <AddressForm onSubmit={handleSubmit}>
          <Input
            name="address"
            value={newAddress.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <DropList
            options={provinces}
            placeholder="Province"
            value={newAddress.province}
            onChange={(id, value) => handleSelectChange("province", id, value)}
            disabled={false}
          />
          <DropList
            options={districts}
            placeholder="District"
            value={newAddress.district}
            onChange={(id, value) => handleSelectChange("district", id, value)}
            disabled={!newAddress.province}
          />
          <DropList
            options={wards}
            placeholder="Ward"
            value={newAddress.ward}
            onChange={(id, value) => handleSelectChange("ward", id, value)}
            disabled={!newAddress.district}
          />
          <SubmitButton type="submit">Save</SubmitButton>
        </AddressForm>
      )}
    </>
  )
}

export default AddressesComponent
const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
}

const ContentHeader = styled.h1`
  color: ${colors.primaryColor};
  font-size: 24px;
  margin-bottom: 30px;
`

const AddressCard = styled.div`
  background-color: white;
  border: 1px solid ${colors.thirdColor};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
`

const AddressActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.secondaryColor};
  display: flex;
  align-items: center;
  padding: 5px;

  &:hover {
    color: ${colors.primaryColor};
  }
`

const AddAddressButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${colors.coolAccent};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background-color: ${colors.primaryColor};
  }
`

const AddressForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.thirdColor};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${colors.secondaryColor};
  }
`

const SubmitButton = styled.button`
  background-color: ${colors.primaryColor};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${colors.secondaryColor};
  }
`
