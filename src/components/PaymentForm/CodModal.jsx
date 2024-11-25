/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Modal, Box, Typography, Button } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { removeAllFromCart } from "../../features/cartSlice";

const OrderConfirmationModal = ({ open, onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      dispatch(removeAllFromCart());
    }
  }, [open, dispatch]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="order-confirmation-modal"
      aria-describedby="order-confirmation-description"
    >
      <ModalContent>
        <IconWrapper>
          <FaCheckCircle />
        </IconWrapper>
        <Typography
          id="order-confirmation-modal"
          variant="h4"
          component="h2"
          gutterBottom
        >
          COD order has been created
        </Typography>
        <Typography
          id="order-confirmation-description"
          variant="body1"
          gutterBottom
        >
          Order confirmation request has been sent to your email. Please check
          your email to confirm your order.
        </Typography>
        <Button
          variant="contained"
          onClick={onClose}
          style={{ marginTop: "16px", backgroundColor: "#4caf50" }}
        >
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default OrderConfirmationModal;

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background-color: white;
  box-shadow: 24px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
`;

const IconWrapper = styled.div`
  color: #4caf50;
  font-size: 48px;
  margin-bottom: 16px;
`;
