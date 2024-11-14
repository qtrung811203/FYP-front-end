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
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import { MdVisibility as VisibilityIcon } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders } from "../../../services/admin/apiAdminOrders";
import { formatCurrency } from "../../../utils/formatCurrency";

export default function OrdersManagement() {
  const querryClient = useQueryClient();
  // const [orders, setOrders] = useState(initialOrders);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const handleOpenModal = (order) => {
    console.log(order);
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  // Format address for data from API
  const formatAddress = (address) => {
    return `${address?.address}, ${address?.province}, ${address?.district}, ${address?.ward}`;
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
              <TableCell>Order ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.data.orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell align="right">
                  <Button
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpenModal(order)}
                    aria-label={`View details of order ${order._id}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="order-modal-title"
      >
        <ModalContent>
          {selectedOrder && (
            <>
              <Typography
                id="order-modal-title"
                variant="h6"
                component="h2"
                gutterBottom
              >
                Order Details - {selectedOrder._id}
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary={selectedOrder.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Shipping Information"
                    secondary={formatAddress(selectedOrder.shippingInformation)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Note"
                    secondary={selectedOrder.note || "N/A"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Status"
                    secondary={selectedOrder.status}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Payment Method"
                    secondary={selectedOrder.paymentMethod}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Total Price"
                    secondary={formatCurrency(selectedOrder.totalPrice)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Order Date"
                    secondary={selectedOrder.createdAt}
                  />
                </ListItem>
              </List>
              <Divider />
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                Ordered Products
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="ordered products table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <ProductImage
                            src={product.itemId.imageItem}
                            alt={product.itemId.name}
                          />
                        </TableCell>
                        <TableCell>{product.itemId.name}</TableCell>
                        <TableCell>{product.itemId.category}</TableCell>
                        <TableCell>
                          {formatCurrency(product.itemId.price)}
                        </TableCell>
                        <TableCell>{product.itemId.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </ModalContent>
      </Modal>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 20px;
`;

const TableWrapper = styled(TableContainer)`
  margin-top: 20px;
`;

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

// Dummy data for orders
const initialOrders = [
  {
    id: "1001",
    email: "customer1@example.com",
    paymentMethod: "Credit Card",
    totalPrice: 150.0,
    orderDate: "2023-06-01",
    shippingInformation: "123 Main St, City, Country",
    note: "Please leave at the door",
    status: "Delivered",
    products: [
      {
        image: "/placeholder.svg",
        name: "Product A",
        category: "Electronics",
        price: 50.0,
        quantity: 2,
      },
      {
        image: "/placeholder.svg",
        name: "Product B",
        category: "Books",
        price: 25.0,
        quantity: 2,
      },
    ],
  },
  {
    id: "1002",
    email: "customer2@example.com",
    paymentMethod: "PayPal",
    totalPrice: 75.5,
    orderDate: "2023-06-02",
    shippingInformation: "456 Elm St, Town, Country",
    note: "Gift wrap please",
    status: "Processing",
    products: [
      {
        image: "/placeholder.svg",
        name: "Product C",
        category: "Clothing",
        price: 75.5,
        quantity: 1,
      },
    ],
  },
  {
    id: "1003",
    email: "customer3@example.com",
    paymentMethod: "Bank Transfer",
    totalPrice: 200.0,
    orderDate: "2023-06-03",
    shippingInformation: "789 Oak St, Village, Country",
    note: "",
    status: "Shipped",
    products: [
      {
        image: "/placeholder.svg",
        name: "Product D",
        category: "Home & Garden",
        price: 100.0,
        quantity: 2,
      },
    ],
  },
];
