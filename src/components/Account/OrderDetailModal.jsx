/* eslint-disable react/prop-types */
import styled from "styled-components"
import {
  FaTimes,
  FaBox,
  FaCalendarAlt,
  FaCheckCircle,
  FaDollarSign,
  FaPhoneAlt,
  FaStickyNote,
} from "react-icons/fa"
import { MdOutlinePayment, MdEmail } from "react-icons/md"

import { formatDate } from "../../utils/formatDate"
import { formatCurrency } from "../../utils/formatCurrency"

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!order) return null

  return (
    <Modal $isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <Title>Order #{order.id}</Title>
        <OrderInfo>
          <InfoItem>
            <FaBox />
            <span>Order Id: {order.id}</span>
          </InfoItem>
          <InfoItem>
            <FaPhoneAlt />
            <span>Phone Number: {order.shippingInformation.phoneNumber}</span>
          </InfoItem>
          <InfoItem>
            <MdEmail />
            <span>Email: {order.email}</span>
          </InfoItem>
          <InfoItem>
            <FaCalendarAlt />
            <span>Order Day: {formatDate(order.createdAt)}</span>
          </InfoItem>
          <InfoItem>
            <FaDollarSign />
            <span>Total Price: {formatCurrency(order.totalPrice)}</span>
          </InfoItem>
          <InfoItem>
            <MdOutlinePayment />
            <span>Payment Method: {order.paymentMethod}</span>
          </InfoItem>
          <InfoItem>
            <FaCheckCircle />
            <span>Payment Status: {order.status}</span>
          </InfoItem>
          <InfoItem>
            <FaStickyNote />
            <span>Note: {order.shippingInformation.note}</span>
          </InfoItem>
        </OrderInfo>
        <ProductTable>
          <thead>
            <tr>
              <TableHeader>Image</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Quantity</TableHeader>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.itemId._id}>
                <TableCell>
                  <ProductImage src={item.itemId.imageItem} alt={item.itemId.name} />
                </TableCell>
                <TableCell>{item.itemId.name}</TableCell>
                <TableCell>{item.itemId.category}</TableCell>
                <TableCell>
                  {item.itemId.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </ModalContent>
    </Modal>
  )
}

export default OrderDetailsModal

const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
}

const Modal = styled.div`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background-color: ${colors.fourthColor};
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.primaryColor};
`

const Title = styled.h2`
  color: ${colors.primaryColor};
  margin-bottom: 20px;
`

const OrderInfo = styled.div`
  background-color: ${colors.thirdColor};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  svg {
    margin-right: 10px;
    color: ${colors.secondaryColor};
  }
`

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  background-color: ${colors.secondaryColor};
  color: white;
  text-align: center;
`

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${colors.thirdColor};
  text-align: center;
`

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`
