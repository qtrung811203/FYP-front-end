/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";

import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../../../services/admin/apiAdminItems";
import toast from "react-hot-toast";

const CreateEditItemsModal = ({
  open,
  setOpen,
  choosenProduct,
  setChoosenProduct,
}) => {
  const queryClient = useQueryClient();
  const [currentItem, setCurrentItem] = useState(null);
  const { register, handleSubmit, reset, control } = useForm();

  useEffect(() => {
    if (choosenProduct) {
      reset({
        imageItem: choosenProduct.images[0],
      });
    }
  }, [choosenProduct, reset]);

  const { isLoading: isItemsLoading, data: items } = useQuery({
    queryKey: ["items", choosenProduct?.slug],
    queryFn: () => getItems(choosenProduct.slug),
  });

  const { mutate: addItemMutation } = useMutation({
    mutationFn: ({ slug, newItem }) => createItem(slug, newItem),
    onSuccess: () => {
      toast.success("Item added successfully");
      queryClient.invalidateQueries(["items", choosenProduct?.slug]);
    },
    onError: () => {
      toast.error("Error adding item");
    },
  });

  const { mutate: updateItemMutation } = useMutation({
    mutationFn: ({ slug, id, updatedItem }) =>
      updateItem(slug, id, updatedItem),
    onSuccess: () => {
      toast.success("Item updated successfully");
      queryClient.invalidateQueries(["items", choosenProduct?.slug]);
    },
    onError: () => {
      toast.error("Error updating item");
    },
  });

  const { mutate: deleteItemMutation } = useMutation({
    mutationFn: ({ slug, id }) => deleteItem(slug, id),
    onSuccess: () => {
      toast.success("Item delete successfully");
      queryClient.invalidateQueries(["items", choosenProduct?.slug]);
    },
    onError: () => {
      toast.error("Error adding item");
    },
  });

  const handleCloseItemModal = () => {
    setOpen(false);
    setChoosenProduct(null);
    setCurrentItem(null);
    handleResetForm();
  };

  // Form submit
  const onSubmit = (data) => {
    if (currentItem) {
      updateItemMutation({
        slug: choosenProduct.slug,
        id: currentItem._id,
        updatedItem: data,
      });
    } else {
      addItemMutation({
        slug: choosenProduct.slug,
        newItem: filterItem(data),
      });
    }
    handleResetForm();
  };

  // Edit item
  const handleEditItem = (item) => {
    setCurrentItem(item);
    const filterField = filterItem(item);
    reset({
      ...filterField,
      imageItem: item.imageItem,
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setCurrentItem(null);
    handleResetForm();
  };

  // Delete item
  const handleDeleteItem = (slug, itemId) => {
    setCurrentItem(null);
    deleteItemMutation({ slug, id: itemId });
  };

  // Reset form
  const handleResetForm = () => {
    reset({
      name: "",
      category: "",
      description: "",
      imageItem: choosenProduct?.images[0],
      price: "",
      stock: "",
    });
  };

  // Filter item
  const filterItem = (data) => {
    const filterItem = {
      name: data.name,
      category: data.category,
      description: data.description,
      imageItem: data.imageItem,
      price: data.price,
      stock: data.stock,
    };
    return filterItem;
  };

  if (!choosenProduct || isItemsLoading) return null;

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
        {items.data.items.length === 0 ? null : (
          <List>
            {items.data.items.map((item) => (
              <ListItem
                key={item._id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditItem(item)}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        handleDeleteItem(choosenProduct.slug, item._id)
                      }
                    >
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
        )}

        {/* FORM BELOW */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            {choosenProduct?.items.length === 0 ? "Add New Item" : "Edit Item"}
          </Typography>

          {/* NAME */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputLabel>Name</InputLabel>
              <FormField {...register("name", { required: true })} />
            </Grid>

            {/* CATEGORY */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Category</InputLabel>
              <FormField {...register("category", { required: true })} />
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12}>
              <InputLabel>Description</InputLabel>
              <FormField
                {...register("description", { required: true })}
                multiline
                rows={4}
              />
            </Grid>

            {/* IMAGE FORM AND SHOW */}
            <Grid item xs={12} sm={2}>
              <InputLabel id="image-label">Image</InputLabel>
              <Controller
                name="imageItem"
                control={control}
                defaultValue={
                  currentItem
                    ? currentItem.imageItem
                    : choosenProduct?.images[0]
                }
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Select {...field} labelId="image-label">
                      {choosenProduct?.images.map((image, index) => (
                        <MenuItem key={index} value={image}>
                          <ImageAvatar src={image} alt={choosenProduct.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </Grid>

            {/* PRICE */}
            <Grid item xs={12} sm={5}>
              <InputLabel>Price (VND)</InputLabel>
              <FormField
                {...register("price", { required: true })}
                type="number"
              />
            </Grid>

            {/* STOCK */}
            <Grid item xs={12} sm={5}>
              <InputLabel>Stock</InputLabel>
              <FormField
                {...register("stock", { required: true })}
                type="number"
              />
            </Grid>
          </Grid>
          <div style={{ float: "right" }}>
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: "20px", backgroundColor: "#16423C" }}
            >
              {currentItem ? "Update Item" : "Add Item"}
            </Button>
            {currentItem && (
              <Button
                variant="contained"
                color="error"
                onClick={handleCancelEdit}
                style={{ marginTop: "20px", marginLeft: "10px" }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateEditItemsModal;

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

const ImageAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;
