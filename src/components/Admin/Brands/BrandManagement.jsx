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
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  getBrands,
  deleteBrand,
  createBrand,
  updateBrand,
} from "../../../services/admin/apiAdminBrands";
import useBrandMutation from "../../../hooks/admin/useBrandMutation";

export default function BrandsManagement() {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");

  const { register, handleSubmit, formState, reset } = useForm({});
  const { errors } = formState;

  // get all brands
  const { isLoading, data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const { mutate: createBrandMutation } = useBrandMutation(
    createBrand,
    "Brand created successfully"
  );

  const { mutate: deleteBrandMutation } = useBrandMutation(
    deleteBrand,
    "Brand deleted successfully"
  );

  const { mutate: updateBrandMutation } = useBrandMutation(({ _id, data }) => {
    updateBrand(_id, data);
  }, "Brand updated successfully");

  if (isLoading) return <p>Loading...</p>;

  const handleOpenModal = (mode, brand) => {
    setModalMode(mode);
    if (mode === "create") {
      reset();
    } else {
      reset(brand);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  // Create or update brand
  const onSubmit = (data) => {
    if (modalMode === "create") {
      createBrandMutation(data);
    } else {
      const { _id, name } = data;
      updateBrandMutation({ _id, data: { name } });
    }
    handleCloseModal();
  };

  // Delete brand
  const handleDelete = (id) => {
    deleteBrandMutation(id);
  };

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Brand Management
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenModal("create")}
        size="large"
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
            {brands.data.brands.map((brand) => (
              <TableRow key={brand._id}>
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
                    onClick={() => handleDelete(brand._id)}
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

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="brand-modal-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <Typography id="brand-modal-title" variant="h5" component="h2">
              {modalMode === "create" ? "Create New Brand" : "Edit Brand"}
            </Typography>
            <FormField
              {...register("name", {
                required: "Name is required",
              })}
              label="Name"
              name="name"
            />
            {errors?.name && <ErrorSpan>{errors.name.message}</ErrorSpan>}
            <Button
              variant="contained"
              style={{ backgroundColor: "var(--primary-color)" }}
              type="submit"
            >
              {modalMode === "create" ? "Create" : "Update"}
            </Button>
            <Button color="inherit" onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalContent>
        </form>
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

const ErrorSpan = styled.div`
  color: red;
  font-size: var(--font-size-sm);
  margin-bottom: 10px;
`;
