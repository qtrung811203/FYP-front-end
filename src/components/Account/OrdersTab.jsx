import styled from "styled-components"
import { useEffect, useState } from "react"

import { FaEye as Eye } from "react-icons/fa"

import OrderDetailsModal from "./OrderDetailModal"

import { getOrders } from "../../services/apiUser"
import { formatDate } from "../../utils/formatDate"
import { formatCurrency } from "../../utils/formatCurrency"

function OrdersTab() {
  const [orders, setOrders] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    async function fetchOrders() {
      const response = await getOrders()
      setOrders(response.data.orders)
    }

    fetchOrders()
  }, [])

  const formatAddress = (shippingInformation) => {
    return `${shippingInformation.address}, ${shippingInformation.ward}, ${shippingInformation.district}, ${shippingInformation.province}`
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  return (
    <>
      <ContentHeader>Your Order</ContentHeader>
      <InfoSection>
        <Table>
          <thead>
            <tr>
              <Th>Id</Th>
              <Th>Date</Th>
              <Th>Address</Th>
              <Th>Total Amount (VND)</Th>
              <Th>Payment Method</Th>
              <Th>Note</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{formatDate(order.createdAt)}</Td>
                <Td>{formatAddress(order.shippingInformation)}</Td>
                <Td>{formatCurrency(order.totalPrice)}</Td>
                <Td>{order.paymentMethod}</Td>
                <Td>{order.shippingInformation.note}</Td>
                <Td>
                  <ViewButton onClick={() => handleViewOrder(order)}>
                    <Eye size={16} />
                    View
                  </ViewButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </InfoSection>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default OrdersTab

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  padding: 12px;
  background-color: ${colors.thirdColor};
  color: ${colors.primaryColor};
`

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${colors.fourthColor};
`

const ViewButton = styled.button`
  background-color: ${colors.coolAccent};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${colors.primaryColor};
  }
`
