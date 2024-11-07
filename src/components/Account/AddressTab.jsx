import styled from "styled-components"
import { useState } from "react"

import { MdModeEdit as Edit2 } from "react-icons/md"
import { FaTrash as Trash2 } from "react-icons/fa"
import { FaPlus as Plus } from "react-icons/fa"

const AddressesComponent = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      address: "123 Đường ABC",
      province: "TP. Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Bến Nghé",
    },
    {
      id: 2,
      address: "456 Đường XYZ",
      province: "Hà Nội",
      district: "Quận Ba Đình",
      ward: "Phường Điện Biên",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [newAddress, setNewAddress] = useState({
    address: "",
    province: "",
    district: "",
    ward: "",
  })

  const handleAddAddress = () => {
    setShowForm(true)
    setEditingAddress(null)
    setNewAddress({ address: "", province: "", district: "", ward: "" })
  }

  const handleEditAddress = (address) => {
    setShowForm(true)
    setEditingAddress(address.id)
    setNewAddress(address)
  }

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingAddress) {
      setAddresses(
        addresses.map((address) =>
          address.id === editingAddress ? { ...newAddress, id: editingAddress } : address
        )
      )
    } else {
      setAddresses([...addresses, { ...newAddress, id: Date.now() }])
    }
    setShowForm(false)
    setEditingAddress(null)
    setNewAddress({ address: "", province: "", district: "", ward: "" })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <ContentHeader>ĐỊA CHỈ CỦA BẠN</ContentHeader>
      {addresses.map((address) => (
        <AddressCard key={address.id}>
          <AddressActions>
            <ActionButton onClick={() => handleEditAddress(address)}>
              <Edit2 size={18} />
            </ActionButton>
            <ActionButton onClick={() => handleDeleteAddress(address.id)}>
              <Trash2 size={18} />
            </ActionButton>
          </AddressActions>
          <p>
            <strong>Địa chỉ:</strong> {address.address}
          </p>
          <p>
            <strong>Tỉnh/Thành phố:</strong> {address.province}
          </p>
          <p>
            <strong>Quận/Huyện:</strong> {address.district}
          </p>
          <p>
            <strong>Phường/Xã:</strong> {address.ward}
          </p>
        </AddressCard>
      ))}
      {!showForm && (
        <AddAddressButton onClick={handleAddAddress}>
          <Plus size={20} />
          Thêm địa chỉ mới
        </AddAddressButton>
      )}
      {showForm && (
        <AddressForm onSubmit={handleSubmit}>
          <Input
            name="address"
            value={newAddress.address}
            onChange={handleChange}
            placeholder="Địa chỉ"
            required
          />
          <Select name="province" value={newAddress.province} onChange={handleChange} required>
            <option value="">Chọn Tỉnh/Thành phố</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            {/* Add more options as needed */}
          </Select>
          <Select name="district" value={newAddress.district} onChange={handleChange} required>
            <option value="">Chọn Quận/Huyện</option>
            <option value="Quận 1">Quận 1</option>
            <option value="Quận Ba Đình">Quận Ba Đình</option>
            {/* Add more options as needed */}
          </Select>
          <Select name="ward" value={newAddress.ward} onChange={handleChange} required>
            <option value="">Chọn Phường/Xã</option>
            <option value="Phường Bến Nghé">Phường Bến Nghé</option>
            <option value="Phường Điện Biên">Phường Điện Biên</option>
            {/* Add more options as needed */}
          </Select>
          <SubmitButton type="submit">
            {editingAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
          </SubmitButton>
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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.thirdColor};
  border-radius: 4px;
  font-size: 14px;
  background-color: white;

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
