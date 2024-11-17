import { useState } from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

import { MdVisibility as VisibilityIcon } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

import OrderViewModal from "./OrderViewModal";

import { getOrders } from "../../../services/admin/apiAdminOrders";
import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";

export default function OrdersManagement() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>
      <TableWrapper component={Paper}>
        <Table aria-label="order management table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Payment Method</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.data.orders.map((order) => (
              <TableRow key={order._id}>
                <StyledTableCell>{order._id}</StyledTableCell>
                <StyledTableCell>{order.email}</StyledTableCell>
                <StyledTableCell>{order.paymentMethod}</StyledTableCell>
                <StyledTableCell>
                  {formatCurrency(order.totalPrice)}
                </StyledTableCell>
                <StyledTableCell>{formatDate(order.createdAt)}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpenModal(order)}
                    aria-label={`View details of order ${order._id}`}
                    style={{ color: "var(--warm-accent)" }}
                  >
                    View
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>

      {/* Modal View */}
      {selectedOrder && (
        <OrderViewModal
          open={openModal}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 20px;
`;

const TableWrapper = styled(TableContainer)`
  margin-top: 20px;
`;

const StyledTableCell = styled(TableCell)`
  font-size: var(--font-size-md);
`;
