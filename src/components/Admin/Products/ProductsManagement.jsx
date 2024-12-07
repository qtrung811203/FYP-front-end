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
  IconButton,
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
import CreateEditItemsModal from "./CreateEditItemsModal";

export default function ProductManagement() {
  const querryClient = useQueryClient();
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [choosenProduct, setChoosenProduct] = useState(null);
  const [chooseProductForItem, setChooseProductForItem] = useState(null);

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
    console.log("HANDLE" + product);
    setChoosenProduct(product);
    setOpenProductModal(true);
  };

  // DELETE PRODUCT
  const handleDeleteProduct = (slug) => {
    deleteProductMutation(slug);
    setChoosenProduct(null);
  };

  // Handle Open Modal
  const handleOpenItemModal = (product) => {
    setChooseProductForItem(product);
    setOpenItemModal(true);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Button
        variant="contained"
        startIcon={<FaPlus />}
        onClick={() => handleOpenProductModal()}
        style={{ backgroundColor: "#16423c", color: "white" }}
      >
        Add New Product
      </Button>
      <TableWrapper component={Paper}>
        <Table aria-label="product management table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Brand</StyledTableCell>
              <StyledTableCell>Open Time</StyledTableCell>
              <StyledTableCell>Close Time</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.data.map((product) => (
              <TableRow key={product._id}>
                <StyledTableCell>
                  <ImagePreview src={product.imageCover} alt={product.name} />
                </StyledTableCell>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: 150,
                    maxHeight: 10,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.description}
                </StyledTableCell>
                <StyledTableCell>{product.status}</StyledTableCell>
                <StyledTableCell>{product?.brand?.name}</StyledTableCell>
                <StyledTableCell>
                  {formatDateSelection(product?.openTime)}
                </StyledTableCell>
                <StyledTableCell>
                  {product?.closeTime &&
                    formatDateSelection(product?.closeTime)}
                </StyledTableCell>
                <StyledTableCell align="right">
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
                </StyledTableCell>
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
        setChoosenProduct={setChooseProductForItem}
      />

      {/* Item Modal */}
      <CreateEditItemsModal
        open={openItemModal}
        setOpen={setOpenItemModal}
        choosenProduct={chooseProductForItem}
        setChoosenProduct={setChoosenProduct}
      />

      <LoadingModal isOpen={isDeleting} message="Deleting product..." />
    </PageContainer>
  );
}

//Styled Components
const PageContainer = styled.div`
  padding: 20px;
`;

const TableWrapper = styled(TableContainer)`
  margin-top: 20px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
`;

const StyledTableCell = styled(TableCell)`
  font-size: 1.2rem;
  max-width: 150px;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px;
  text-align: center;
  font-weight: 500;
  color: #16423c;
  background-color: #f4f4f4;
  border: 1px solid #f4f4f4;
  border-radius: 5px;
`;
