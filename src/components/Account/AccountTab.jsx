/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components"
import AccountModal from "./AccountModal"
import { useEffect, useState } from "react"
import { updateUser } from "../../services/apiUser"

function AccountTab({ userData, setUserData }) {
  const [modalState, setModalState] = useState({ isOpen: false, fieldToEdit: null })

  //Edit button handler
  const handleEdit = (field) => {
    setModalState({ isOpen: true, fieldToEdit: field })
  }

  //Save button handler
  const handleSave = async (newValue) => {
    const updatedUser = await updateUser(newValue)
    setUserData(updatedUser.data.user)
  }

  return (
    <>
      <ContentHeader>Account Information</ContentHeader>
      <InfoSection>
        <InfoRow>
          <InfoLabel>Email:</InfoLabel>
          <InfoValue>{userData?.email}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Full Name:</InfoLabel>
          <InfoValue>{userData.name}</InfoValue>
          <EditButton onClick={() => handleEdit("name")}>Edit</EditButton>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Phone Number:</InfoLabel>
          <InfoValue>{userData.phoneNumber}</InfoValue>
          <EditButton onClick={() => handleEdit("phoneNumber")}>Edit</EditButton>
        </InfoRow>
      </InfoSection>
      <AccountModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, fieldToEdit: null })}
        fieldToEdit={modalState.fieldToEdit}
        currentValue={userData[modalState.fieldToEdit] || ""}
        onSave={handleSave}
      />
    </>
  )
}

export default AccountTab

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

const InfoSection = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.fourthColor};
  align-items: center;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`

const InfoLabel = styled.div`
  flex: 0 0 150px;
  color: ${colors.primaryColor};
  font-weight: bold;
`

const InfoValue = styled.div`
  flex: 1;
  color: ${colors.secondaryColor};
`

const EditButton = styled.button`
  background-color: transparent;
  border: 1px solid ${colors.primaryColor};
  color: ${colors.primaryColor};
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.primaryColor};
    color: white;
  }
`
