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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { MdEdit as EditIcon } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  updateUserRole,
} from "../../../services/admin/apiAdminUsers";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const roles = ["admin", "user"];

export default function UsersManagement() {
  const querryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit, reset } = useForm({});

  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { mutate: updateUserRoleMutation } = useMutation({
    mutationFn: ({ _id, data }) => updateUserRole(_id, data),
    onSuccess: () => {
      toast.success("User role updated successfully");
      querryClient.invalidateQueries("users");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleOpenModal = (mode, id) => {
    reset({ _id: id });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Submit form data
  const onSubmit = (data) => {
    if (data.role === "") {
      toast.error("Please Choose Role");
    } else {
      const { _id, role } = data;
      updateUserRoleMutation({ _id, data: { role } });
      handleCloseModal();
    }
  };

  // Format address for data from API
  const formatAddress = (address) => {
    return `${address?.address}, ${address?.province}, ${address?.district}, ${address?.ward}`;
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <TableWrapper component={Paper}>
        <Table aria-label="user management table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data.users.map((user) => (
              <TableRow key={user._id}>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.role}</StyledTableCell>
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                <StyledTableCell>
                  {user?.address ? `${formatAddress(user?.address)}` : ""}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <ActionButton
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenModal("edit", user._id)}
                    aria-label={`Edit ${user.name}`}
                    style={{ color: "var(--warm-accent)" }}
                  >
                    Edit
                  </ActionButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>

      {/* Model for edit */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="user-modal-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <Typography id="user-modal-title" variant="h6" component="h2">
              Edit User
            </Typography>
            <FormSelect
              fullWidth
              style={{ marginBottom: "20px", marginTop: "20px" }}
            >
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                {...register("role")}
                defaultValue={""}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormSelect>
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              Update
            </Button>
            <Button onClick={handleCloseModal} color="inherit">
              Cancel
            </Button>
          </ModalContent>
        </form>
      </Modal>
    </PageContainer>
  );
}

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

const FormSelect = styled(FormControl)`
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
