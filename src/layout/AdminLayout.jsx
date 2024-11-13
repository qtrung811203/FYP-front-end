import { Link, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";

import {
  MdDashboard as DashboardIcon,
  MdInventory as InventoryIcon,
  MdShoppingCart as ShoppingCartIcon,
  MdBrandingWatermark as BrandIcon,
  MdPeople as PeopleIcon,
  MdMenu as MenuIcon,
} from "react-icons/md";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";

import BrandManagement from "../components/Admin/Brands/BrandManagement";
import UsersManagement from "../components/Admin/Users/UsersManagement";
import OrdersManagement from "../components/Admin/Orders/OrdersManagement";
import ProductsManagement from "../components/Admin/Products/ProductsManagement";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
  { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
  { text: "Orders", icon: <ShoppingCartIcon />, path: "/admin/orders" },
  { text: "Products", icon: <InventoryIcon />, path: "/admin/products" },
  { text: "Brand", icon: <BrandIcon />, path: "/admin/brand" },
];

// Sample components for each route
const DashboardComponent = () => <h1>Dashboard</h1>;
// const ProductsComponent = () => <h1>Products Management</h1>;

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar $isOpen={isSidebarOpen}>
        <SidebarHeader $isOpen={isSidebarOpen}>
          {isSidebarOpen && <Typography variant="h4">Admin Panel</Typography>}
          <IconButton
            onClick={toggleSidebar}
            style={{ color: colors.fourthColor }}
          >
            <MenuIcon />
          </IconButton>
        </SidebarHeader>
        <List>
          {menuItems.map((item, index) => (
            <StyledLink to={item.path} key={index}>
              <ListItem selected={location.pathname === item.path}>
                <ListItemIcon
                  style={{ color: colors.fourthColor, fontSize: "2rem" }}
                >
                  {item.icon}
                </ListItemIcon>
                {isSidebarOpen && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      style: {
                        fontSize: "1.5rem",
                      },
                    }}
                  />
                )}
              </ListItem>
            </StyledLink>
          ))}
        </List>
      </Sidebar>
      <MainContent>
        <Routes>
          <Route path="/" element={<DashboardComponent />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="brand" element={<BrandManagement />} />
        </Routes>
      </MainContent>
    </LayoutContainer>
  );
}

export default AdminLayout;

// Color definitions
const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
};

// Styled components
const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: ${(props) => (props.$isOpen ? "250px" : "70px")};
  background-color: ${colors.primaryColor};
  color: ${colors.fourthColor};
  transition: width 0.3s ease;
`;

const MainContent = styled.div`
  flex-grow: 1;
  background-color: ${colors.fourthColor};
  padding: 20px;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isOpen ? "space-between" : "center")};
  padding: 20px;
  background-color: ${colors.secondaryColor};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
