import React, { useState } from "react";
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
} from "@mui/material";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

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

// Dummy data for products
const initialProducts = [
  {
    id: "1",
    name: "Product A",
    description: "Description for Product A",
    imageCover: "/placeholder.svg",
    status: "Active",
    brand: "Brand X",
    openTime: "09:00",
    closeTime: "18:00",
    images: ["/placeholder.svg", "/placeholder.svg"],
    items: [
      {
        name: "Item 1",
        category: "Category 1",
        description: "Description for Item 1",
        imageItem: "/placeholder.svg",
        price: 10,
        stock: 100,
      },
      {
        name: "Item 2",
        category: "Category 2",
        description: "Description for Item 2",
        imageItem: "/placeholder.svg",
        price: 20,
        stock: 50,
      },
    ],
  },
  {
    id: "2",
    name: "Product B",
    description: "Description for Product B",
    imageCover: "/placeholder.svg",
    status: "Inactive",
    brand: "Brand Y",
    openTime: "10:00",
    closeTime: "20:00",
    images: ["/placeholder.svg"],
    items: [],
  },
];

const brands = ["Brand X", "Brand Y", "Brand Z"];
const categories = ["Category 1", "Category 2", "Category 3"];

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalMode, setModalMode] = useState("create");

  const handleOpenProductModal = (mode, product = null) => {
    setModalMode(mode);
    setCurrentProduct(
      product || {
        name: "",
        description: "",
        imageCover: "",
        status: "Active",
        brand: "",
        openTime: "09:00",
        closeTime: "18:00",
        images: [],
        items: [],
      }
    );
    setOpenProductModal(true);
  };

  const handleCloseProductModal = () => {
    setOpenProductModal(false);
    setCurrentProduct(null);
  };

  const handleOpenItemModal = (product, item = null) => {
    setCurrentProduct(product);
    setCurrentItem(
      item || {
        name: "",
        category: "",
        description: "",
        imageItem: "",
        price: 0,
        stock: 0,
      }
    );
    setOpenItemModal(true);
  };

  const handleCloseItemModal = () => {
    setOpenItemModal(false);
    setCurrentItem(null);
  };

  const handleInputChange = (e, target = "product") => {
    const { name, value } = e.target;
    if (target === "product") {
      setCurrentProduct((prev) => ({ ...prev, [name]: value }));
    } else {
      setCurrentItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCurrentProduct((prev) => ({ ...prev, imageCover: imageUrl }));
    }
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setCurrentProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const handleSubmitProduct = () => {
    if (modalMode === "create") {
      setProducts((prev) => [
        ...prev,
        { ...currentProduct, id: Date.now().toString() },
      ]);
    } else {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === currentProduct.id ? currentProduct : product
        )
      );
    }
    handleCloseProductModal();
  };

  const handleSubmitItem = () => {
    const updatedProduct = {
      ...currentProduct,
      items: currentItem.id
        ? currentProduct.items.map((item) =>
            item.id === currentItem.id ? currentItem : item
          )
        : [
            ...currentProduct.items,
            { ...currentItem, id: Date.now().toString() },
          ],
    };
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    handleCloseItemModal();
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleDeleteItem = (productId, itemId) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              items: product.items.filter((item) => item.id !== itemId),
            }
          : product
      )
    );
  };

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FaPlus />}
        onClick={() => handleOpenProductModal("create")}
      >
        Add New Product
      </Button>
      <TableWrapper component={Paper}>
        <Table aria-label="product management table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Open Time</TableCell>
              <TableCell>Close Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <ImagePreview src={product.imageCover} alt={product.name} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.openTime}</TableCell>
                <TableCell>{product.closeTime}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleOpenProductModal("edit", product)}
                    aria-label={`Edit ${product.name}`}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenItemModal(product)}
                    aria-label={`View items of ${product.name}`}
                  >
                    <FaEye />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteProduct(product.id)}
                    aria-label={`Delete ${product.name}`}
                  >
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>

      {/* Product Modal */}
      <Modal
        open={openProductModal}
        onClose={handleCloseProductModal}
        aria-labelledby="product-modal-title"
      >
        <ModalContent>
          <Typography
            id="product-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            {modalMode === "create" ? "Create New Product" : "Edit Product"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormField
                name="name"
                label="Name"
                value={currentProduct?.name || ""}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                  labelId="brand-label"
                  name="brand"
                  value={currentProduct?.brand || ""}
                  onChange={handleInputChange}
                  required
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormField
                name="description"
                label="Description"
                value={currentProduct?.description || ""}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                name="openTime"
                label="Open Time"
                type="time"
                value={currentProduct?.openTime || ""}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                name="closeTime"
                label="Close Time"
                type="time"
                value={currentProduct?.closeTime || ""}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Cover Image:</Typography>
              <input
                accept="image/*"
                id="cover-image-upload"
                type="file"
                onChange={handleCoverImageUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="cover-image-upload">
                <Button variant="contained" component="span">
                  Upload Cover Image
                </Button>
              </label>
              {currentProduct?.imageCover && (
                <ImagePreview src={currentProduct.imageCover} alt="Cover" />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Product Images:</Typography>
              <input
                accept="image/*"
                id="images-upload"
                type="file"
                multiple
                onChange={handleImagesUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="images-upload">
                <Button variant="contained" component="span">
                  Upload Product Images
                </Button>
              </label>
              <div
                style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
              >
                {currentProduct?.images.map((image, index) => (
                  <ImagePreview
                    key={index}
                    src={image}
                    alt={`Product ${index + 1}`}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitProduct}
            style={{ marginTop: "20px" }}
          >
            {modalMode === "create" ? "Create" : "Update"}
          </Button>
        </ModalContent>
      </Modal>

      {/* Item Modal */}
      <Modal
        open={openItemModal}
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
            Manage Items for {currentProduct?.name}
          </Typography>
          <List>
            {currentProduct?.items.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleOpenItemModal(currentProduct, item)}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        handleDeleteItem(currentProduct.id, item.id)
                      }
                    >
                      <FaTrash />
                    </IconButton>
                  </>
                }
              >
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
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
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
            onClick={handleSubmitItem}
            style={{ marginTop: "20px" }}
          >
            {currentItem?.id ? "Update Item" : "Add Item"}
          </Button>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
}
