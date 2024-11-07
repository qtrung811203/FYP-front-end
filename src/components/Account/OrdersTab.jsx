import styled from "styled-components"
import { FaEye as Eye } from "react-icons/fa"

function OrdersTab() {
  const orders = [
    {
      id: "ORD001",
      date: "2023-05-15",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      total: "1,500,000",
      paymentMethod: "COD",
      note: "Giao hàng ngoài giờ hành chính",
    },
    {
      id: "ORD002",
      date: "2023-05-20",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      total: "2,300,000",
      paymentMethod: "Chuyển khoản",
      note: "Không có",
    },
  ]

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
                <Td>{order.date}</Td>
                <Td>{order.address}</Td>
                <Td>{order.total}</Td>
                <Td>{order.paymentMethod}</Td>
                <Td>{order.note}</Td>
                <Td>
                  <ViewButton>
                    <Eye size={16} />
                    View
                  </ViewButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </InfoSection>
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
