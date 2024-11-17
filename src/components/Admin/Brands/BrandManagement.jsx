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
import BrandCreateUpdateModal from "./BrandCreateUpdateModal";

export default function BrandsManagement() {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: { name: "" },
  });
  const { errors } = formState;

  // get all brands
  const { isLoading, data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  // Create, update and delete brand
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

  // Open modal
  const handleOpenModal = (mode, brand) => {
    setModalMode(mode);
    if (mode === "create") {
      reset();
    } else {
      reset(brand);
    }
    setOpenModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    reset({});
    setOpenModal(false);
  };

  // Handle form submit
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

  if (isLoading) return <p>Loading...</p>;

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
      <BrandCreateUpdateModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        modalMode={modalMode}
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
      />
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

const StyledTableCell = styled(TableCell)`
  font-size: var(--font-size-md);
`;
