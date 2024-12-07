/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Modal,
} from "@mui/material";
import styled from "styled-components";

import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";

const OrderViewModal = ({ order: selectedOrder, open, onClose }) => {
  // Format address for data from API
  const formatAddress = (address) => {
    return `${address?.address}, ${address?.province}, ${address?.district}, ${address?.ward}`;
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="order-modal-title">
      <ModalContent>
        <Typography
          id="order-modal-title"
          variant="h5"
          component="h2"
          gutterBottom
        >
          Order Details - {selectedOrder._id}
        </Typography>
        <List>
          <ListItem>
            <StyledListItemText
              primary="Email"
              secondary={selectedOrder.email}
            />
          </ListItem>
          <ListItem>
            <StyledListItemText
              primary="Shipping Information"
              secondary={formatAddress(selectedOrder.shippingInformation)}
            />
          </ListItem>
          <ListItem>
            <StyledListItemText
              primary="Note"
              secondary={selectedOrder.note || "N/A"}
            />
          </ListItem>
          <ListItem>
            <StyledListItemText
              primary="Status"
              secondary={selectedOrder.status}
            />
          </ListItem>
          <ListItem>
            <StyledListItemText
              primary="Payment Method"
              secondary={selectedOrder.paymentMethod}
            />
          </ListItem>
          <ListItem>
            <StyledListItemText
              primary="Total Price"
              secondary={formatCurrency(selectedOrder.totalPrice)}
            />
          </ListItem>
          <ListItem>
            <StyledListItemText
              primary="Order Date"
              secondary={formatDate(selectedOrder.createdAt)}
            />
          </ListItem>
        </List>
        <Divider />
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Ordered Products
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="ordered products table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrder.items.map((product, index) => (
                <TableRow key={index}>
                  <StyledTableCell>
                    <ProductImage
                      src={product.itemId.imageItem}
                      alt={product.itemId.name}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{product.itemId.name}</StyledTableCell>
                  <StyledTableCell>{product.itemId.category}</StyledTableCell>
                  <StyledTableCell>
                    {formatCurrency(product.itemId.price)}
                  </StyledTableCell>
                  <StyledTableCell>{product.quantity}</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ModalContent>
    </Modal>
  );
};

export default OrderViewModal;

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: white;
  box-shadow: 24px;
  padding: 20px;
  border-radius: 8px;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const StyledTableCell = styled(TableCell)`
  font-size: var(--font-size-md);
`;

const StyledListItemText = styled(ListItemText)`
  & .MuiListItemText-primary {
    font-size: var(--font-size-md);
  }

  & .MuiListItemText-secondary {
    font-size: var(--font-size-sm);
  }
`;
