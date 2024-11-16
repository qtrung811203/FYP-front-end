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
import toast from "react-hot-toast";

import {
  getProducts,
  deleteProduct,
} from "../../../services/admin/apiAdminProducts";
import { formatDateSelection } from "../../../utils/formatDate";
import LoadingModal from "../../Loading/LoadingModal";

//Component
import CreateEditProductModal from "./CreateEditProductModal";

export default function ProductManagement() {
  const querryClient = useQueryClient();
  const [openProductModal, setOpenProductModal] = useState(false);
  const [choosenProduct, setChoosenProduct] = useState(null);

  const [openItemModal, setOpenItemModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
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

  // Handle Modal Open
  const handleOpenProductModal = (product = null) => {
    setOpenProductModal(true);
    setChoosenProduct(product);
  };

  // DELETE PRODUCT
  const handleDeleteProduct = (slug) => {
    console.log(slug);
    deleteProductMutation(slug);
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FaPlus />}
        onClick={() => handleOpenProductModal()}
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
                    onClick={() => handleOpenProductModal(product)}
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
        setOpen={setOpenProductModal}
        choosenProduct={choosenProduct}
        setChoosenProduct={setChoosenProduct}
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

const ImageAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;
