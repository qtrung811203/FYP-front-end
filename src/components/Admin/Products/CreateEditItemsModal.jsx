/* eslint-disable react/prop-types */
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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
} from "@mui/material";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const CreateEditItemsModal = ({
  open,
  setOpen,
  choosenProduct,
  setChoosenProduct,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleCloseItemModal}
      aria-labelledby="item-modal-title"
    >
      <ModalContent>
        <Typography
          id="item-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Manage Items for {choosenProduct.name}
        </Typography>
        <List>
          {choosenProduct?.items.map((item) => (
            <ListItem
              key={item._id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleOpenItemModal(currentProduct, item)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <FaTrash />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <ImageAvatar src={item.imageItem} alt={item.name} />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`${item.category} - $${item.price} - Stock: ${item.stock}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          {currentItem?.id ? "Edit Item" : "Add New Item"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormField
              name="name"
              label="Name"
              value={currentItem?.name || ""}
              onChange={(e) => handleInputChange(e, "item")}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={currentItem?.category || ""}
                onChange={(e) => handleInputChange(e, "item")}
                required
              >
                {/* {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))} */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormField
              name="description"
              label="Description"
              value={currentItem?.description || ""}
              onChange={(e) => handleInputChange(e, "item")}
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="image-label">Image</InputLabel>
              <Select
                labelId="image-label"
                name="imageItem"
                value={currentItem?.imageItem || ""}
                onChange={(e) => handleInputChange(e, "item")}
                required
              >
                {currentProduct?.images.map((image, index) => (
                  <MenuItem key={index} value={image}>
                    Image {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormField
              name="price"
              label="Price"
              type="number"
              value={currentItem?.price || ""}
              onChange={(e) => handleInputChange(e, "item")}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormField
              name="stock"
              label="Stock"
              type="number"
              value={currentItem?.stock || ""}
              onChange={(e) => handleInputChange(e, "item")}
              required
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          // onClick={}
          style={{ marginTop: "20px" }}
        >
          {currentItem?.id ? "Update Item" : "Add Item"}
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default CreateEditItemsModal;

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

const FormField = styled(TextField)`
  margin: 10px 0;
  width: 100%;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
`;

const ImageBoxPreShow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const StyledSelect = styled.select`
  font-size: var(--font-size-md);
  padding: 10px;
  width: 100%;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  background-color: white;
  color: var(--text-color);
  font-family: inherit;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ImageAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;
