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
} from "@mui/material";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../../../services/admin/apiAdminProducts";
import { getBrands } from "../../../services/admin/apiAdminBrands";
import { formatDate } from "../../../utils/formatDate";
import LoadingModal from "../../Loading/LoadingModal";

export default function ProductManagement() {
  const querryClient = useQueryClient();
  const [openProductModal, setOpenProductModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [coverImage, setCoverImage] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const [openItemModal, setOpenItemModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const { register, handleSubmit, reset, setValue, control } = useForm({
    defaultValues: {},
  });

  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { isLoading: isBrandLoading, data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const { mutate: createProductMutation, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
      querryClient.invalidateQueries("products");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { mutate: deleteProductMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      querryClient.invalidateQueries("products");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  // Submit form data
  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "images") {
        data[key].forEach((image) => {
          formData.append("images", image);
        });
      } else {
        formData.append(key, data[key]);
      }
    }
    createProductMutation(formData);
    handleCloseProductModal();
  };

  // Handle Modal Open
  const handleOpenProductModal = (mode, product = null) => {
    //Change Status
    setModalMode(mode);
    setOpenProductModal(true);
    // if (mode === "edit") {
    //   setCoverImage(product.imageCover);
    //   setProductImages(product.images);
    // }
  };

  // Handle Modal Close
  const handleCloseProductModal = () => {
    setOpenProductModal(false);
    setCoverImage(null);
    setProductImages([]);
  };

  // NOT IMPLEMENTED YET
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

  // IMAGE UPLOAD HANDLER
  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setValue("imageCover", file);
    }
  };

  const removeImageCover = () => {
    setCoverImage(null);
    setValue("imageCover", null);
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProductImages(imageUrls);
    setValue("images", files);
  };

  const removeAllProductImages = () => {
    setProductImages([]);
    setValue("images", []);
  };

  // DELETE PRODUCT
  const handleDeleteProduct = (slug) => {
    console.log(slug);
    deleteProductMutation(slug);
  };

  const handleDeleteItem = (productId, itemId) => {};

  if (isLoading || isBrandLoading) return <p>Loading...</p>;

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
            {products.data.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <ImagePreview src={product.imageCover} alt={product.name} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product?.brand?.name}</TableCell>
                <TableCell>{product?.openTime}</TableCell>
                <TableCell>{product?.closeTime}</TableCell>
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
                    onClick={() => handleDeleteProduct(product.slug)}
                    aria-label={`Delete ${product.slug}`}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {/* Header */}
            <Typography
              id="product-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              {modalMode === "create" ? "Create New Product" : "Edit Product"}
            </Typography>
            {/* Form Fields */}
            <FormField
              {...register("name", { required: true })}
              label="Name"
              required
            />

            {/* BRAND SELECT */}
            <StyledSelect {...register("brand", { required: true })}>
              {brands.data.brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </StyledSelect>

            {/* DESCRIPTION */}
            <FormField
              {...register("description", { required: true })}
              label="Description"
              multiline
              rows={4}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField
                  {...register("openTime")}
                  name="openTime"
                  type="date"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  {...register("closeTime")}
                  name="closeTime"
                  type="date"
                />
              </Grid>
            </Grid>

            {/* Cover Image */}
            <Typography variant="subtitle1">Cover Image:</Typography>
            <Controller
              name="imageCover"
              control={control}
              rules={{ required: true }}
              render={() => (
                <>
                  <input
                    accept="image/*"
                    id="cover-image-upload"
                    type="file"
                    onChange={handleCoverImageUpload}
                    style={{ display: "none" }}
                  />
                  <ImageBoxPreShow>
                    {coverImage && (
                      <ImagePreview src={coverImage} alt="Cover" />
                    )}
                    <div>
                      <label htmlFor="cover-image-upload">
                        <Button variant="contained" component="span">
                          Upload Cover Image
                        </Button>
                      </label>
                      <Button
                        component="span"
                        color="error"
                        onClick={removeImageCover}
                      >
                        Remove image
                      </Button>
                    </div>
                  </ImageBoxPreShow>
                </>
              )}
            />

            {/* Product Images */}
            <Typography variant="subtitle1">Product Images:</Typography>
            <Controller
              name="images"
              control={control}
              rules={{ required: true }}
              render={() => (
                <>
                  <input
                    accept="image/*"
                    id="images-upload"
                    type="file"
                    multiple
                    onChange={handleImagesUpload}
                    style={{ display: "none" }}
                  />
                  <ImageBoxPreShow>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "10px",
                      }}
                    >
                      {productImages.map((image, index) => (
                        <ImagePreview
                          key={index}
                          src={image}
                          alt={`Product ${index + 1}`}
                        />
                      ))}
                    </div>
                    <div>
                      <label htmlFor="images-upload">
                        <Button variant="contained" component="span">
                          Upload Product Images
                        </Button>
                      </label>
                      <Button
                        component="span"
                        color="error"
                        onClick={removeAllProductImages}
                      >
                        Remove all images
                      </Button>
                    </div>
                  </ImageBoxPreShow>
                </>
              )}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ float: "right" }}
            >
              {modalMode === "create" ? "Create" : "Update"}
            </Button>
          </ModalContent>
        </form>
      </Modal>

      {/* Item Modal */}
      {/* <Modal
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
      </Modal> */}
      <LoadingModal isOpen={isCreating} message="Creating product..." />
      <LoadingModal isOpen={isDeleting} message="Deleting product..." />
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
