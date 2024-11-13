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
} from "@mui/material";
import {
  MdAdd as AddIcon,
  MdEdit as EditIcon,
  MdDelete as DeleteIcon,
} from "react-icons/md";

const initialBrands = [
  { id: 1, name: "Brand A", description: "Description for Brand A" },
  { id: 2, name: "Brand B", description: "Description for Brand B" },
  { id: 3, name: "Brand C", description: "Description for Brand C" },
];

export default function BrandManagement() {
  const [brands, setBrands] = useState(initialBrands);
  const [openModal, setOpenModal] = useState(false);
  const [currentBrand, setCurrentBrand] = useState({
    id: null,
    name: "",
  });
  const [modalMode, setModalMode] = useState("create");

  const handleOpenModal = (
    mode,
    brand = { id: null, name: "", description: "" }
  ) => {
    setModalMode(mode);
    setCurrentBrand(brand);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentBrand({ id: null, name: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBrand((prev) => ({ ...prev, [name]: value }));
  };

  // Create or update brand
  const handleSubmit = () => {
    if (modalMode === "create") {
      setBrands((prev) => [...prev, { ...currentBrand, id: Date.now() }]);
    } else {
      setBrands((prev) =>
        prev.map((brand) =>
          brand.id === currentBrand.id ? currentBrand : brand
        )
      );
    }
    handleCloseModal();
  };

  // Delete brand
  const handleDelete = (id) => {
    setBrands((prev) => prev.filter((brand) => brand.id !== id));
  };

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Brand Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenModal("create")}
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        Add New Brand
      </Button>
      <TableWrapper component={Paper}>
        <Table aria-label="brand management table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <StyledTableCell component="th" scope="row">
                  {brand.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <ActionButton
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenModal("edit", brand)}
                    aria-label={`Edit ${brand.name}`}
                    style={{ color: "var(--primary-color)" }}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(brand.id)}
                    aria-label={`Delete ${brand.name}`}
                    style={{ color: "red" }}
                  >
                    Delete
                  </ActionButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="brand-modal-title"
      >
        <ModalContent>
          <Typography id="brand-modal-title" variant="h5" component="h2">
            {modalMode === "create" ? "Create New Brand" : "Edit Brand"}
          </Typography>
          <FormField
            name="name"
            label="Brand Name"
            value={currentBrand.name}
            onChange={handleInputChange}
            required
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            {modalMode === "create" ? "Create" : "Update"}
          </Button>
          <Button onClick={handleCloseModal} color="inherit">
            Cancel
          </Button>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
}

//Styled Components
const PageContainer = styled.div`
  padding: 20px;
  font-size: var(--font-size-md);
`;

const TableWrapper = styled(TableContainer)`
  margin-top: 20px;
`;

const ActionButton = styled(Button)`
  margin: 0 5px;
`;

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  box-shadow: 24px;
  padding: 20px;
  border-radius: 8px;
`;

const FormField = styled(TextField)`
  margin: 10px 0;
  width: 100%;

  & .MuiInputBase-input {
    font-size: var(--font-size-md);
  }

  & .MuiFormLabel-root {
    font-size: var(--font-size-sm);
  }
`;

const StyledTableCell = styled(TableCell)`
  font-size: var(--font-size-md);
`;
