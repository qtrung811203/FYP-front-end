/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";

const BrandCreateUpdateModal = ({
  openModal,
  handleCloseModal,
  modalMode,
  onSubmit,
  register,
  handleSubmit,
  errors,
}) => {
  return (
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
  );
};

export default BrandCreateUpdateModal;

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

const ErrorSpan = styled.div`
  color: red;
  font-size: var(--font-size-sm);
  margin-bottom: 10px;
`;
