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
  //   TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import {
  MdAdd as AddIcon,
  MdEdit as EditIcon,
  MdDelete as DeleteIcon,
} from "react-icons/md";

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

// Dummy data for users
const initialUsers = [
  {
    id: 1,
    email: "user1@example.com",
    name: "User One",
    role: "Admin",
    phoneNumber: "123-456-7890",
    address: "123 Main St, City, Country",
  },
  {
    id: 2,
    email: "user2@example.com",
    name: "User Two",
    role: "Editor",
    phoneNumber: "098-765-4321",
    address: "456 Elm St, Town, Country",
  },
  {
    id: 3,
    email: "user3@example.com",
    name: "User Three",
    role: "Viewer",
    phoneNumber: "111-222-3333",
    address: "789 Oak St, Village, Country",
  },
];

const roles = ["Admin", "Editor", "Viewer"];

export default function UsersManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    email: "",
    name: "",
    role: "",
    phoneNumber: "",
    address: "",
  });
  const [modalMode, setModalMode] = useState("create");

  const handleOpenModal = (
    mode,
    user = {
      id: null,
      email: "",
      name: "",
      role: "",
      phoneNumber: "",
      address: "",
    }
  ) => {
    setModalMode(mode);
    setCurrentUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentUser({
      id: null,
      email: "",
      name: "",
      role: "",
      phoneNumber: "",
      address: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (modalMode === "create") {
      setUsers((prev) => [...prev, { ...currentUser, id: Date.now() }]);
    } else {
      setUsers((prev) =>
        prev.map((user) => (user.id === currentUser.id ? currentUser : user))
      );
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenModal("create")}
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        Add New User
      </Button>
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.role}</StyledTableCell>
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                <StyledTableCell>{user.address}</StyledTableCell>
                <StyledTableCell align="right">
                  <ActionButton
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenModal("edit", user)}
                    aria-label={`Edit ${user.name}`}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(user.id)}
                    aria-label={`Delete ${user.name}`}
                  >
                    Delete
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
        <ModalContent>
          <Typography id="user-modal-title" variant="h6" component="h2">
            {modalMode === "create" ? "Create New User" : "Edit User"}
          </Typography>
          <FormSelect>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={currentUser.role}
              onChange={handleInputChange}
              required
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
