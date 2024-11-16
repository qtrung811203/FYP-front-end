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
import toast from "react-hot-toast";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/admin/apiAdminProducts";
import { getBrands } from "../../../services/admin/apiAdminBrands";
import { formatDateSelection } from "../../../utils/formatDate";
import LoadingModal from "../../Loading/LoadingModal";

//Component
import CreateEditProductModal from "./CreateEditProductModal";

export default function ProductManagement() {
  const querryClient = useQueryClient();
  const [openProductModal, setOpenProductModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [coverImage, setCoverImage] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [choosenProduct, setChoosenProduct] = useState(null);

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

  // Create Product Mutation
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

  // Delete Product Mutation
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

  // Update Product Mutation
  const { mutate: updateProductMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ slug, formData }) => updateProduct(slug, formData),
    onSuccess: () => {
      toast.success("Product updated successfully");
      querryClient.invalidateQueries("products");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  // Submit form data
  const onSubmit = (data) => {
    const formData = new FormData();
    // Filter fields to create or update
    const filterData = {
      name: data.name,
      brand: data.brand?._id ? data.brand._id : data.brand,
      description: data.description,
      openTime: data.openTime,
      closeTime: data.closeTime,
      imageCover: data.imageCover,
      images: data.images,
    };

    for (const key in filterData) {
      if (key === "imageCover") {
        filterData[key] instanceof Blob &&
          formData.append("imageCover", filterData[key]);
      } else if (key === "images") {
        filterData[key].forEach((image) => {
          if (image instanceof Blob) {
            formData.append("images", image);
          }
        });
      } else {
        formData.append(key, filterData[key]);
      }
    }

    if (modalMode === "create") {
      createProductMutation(formData);
    } else {
      updateProductMutation({ slug: choosenProduct.slug, formData });
    }
    handleCloseProductModal();
  };

  // Handle Modal Open
  const handleOpenProductModal = (mode, product = null) => {
    //Change Status
    setModalMode(mode);
    setOpenProductModal(true);
    if (mode === "edit") {
      setCoverImage(product.imageCover);
      setProductImages(product.images);
      setChoosenProduct(product);
      reset({
        ...product,
        openTime: formatDateSelection(product.openTime),
        closeTime: formatDateSelection(product.closeTime),
      });
    } else {
      setChoosenProduct(null);
    }
  };

  // Handle Modal Close
  const handleCloseProductModal = () => {
    setOpenProductModal(false);
    setCoverImage(null);
    setProductImages([]);
    reset({
      name: "",
      brand: "",
      description: "",
      openTime: "",
      closeTime: "",
      imageCover: null,
      images: [],
    });
  };

  // NOT IMPLEMENTED YET
  const handleOpenItemModal = (product, item = null) => {
    setChoosenProduct(product);
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
                <TableCell>{formatDateSelection(product?.openTime)}</TableCell>
                <TableCell>{formatDateSelection(product?.closeTime)}</TableCell>
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
      <CreateEditProductModal
        open={openProductModal}
        handleClose={handleCloseProductModal}
        modalMode={modalMode}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        control={control}
        setValue={setValue}
        coverImage={coverImage}
        productImages={productImages}
        handleCoverImageUpload={handleCoverImageUpload}
        removeImageCover={removeImageCover}
        handleImagesUpload={handleImagesUpload}
        removeAllProductImages={removeAllProductImages}
        brands={brands.data.brands}
        choosenProduct={choosenProduct}
      />

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
      <LoadingModal isOpen={isCreating} message="Creating product..." />
      <LoadingModal isOpen={isDeleting} message="Deleting product..." />
      <LoadingModal isOpen={isUpdating} message="Updating product..." />
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

const ImageAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;
