import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { FaUser as User } from "react-icons/fa";
import { GoPackage as Package } from "react-icons/go";
import { FaLock as Lock } from "react-icons/fa";
import { FaMapPin as MapPin } from "react-icons/fa";
import { CiLogout as LogOut } from "react-icons/ci";

import AccountTab from "../components/Account/AccountTab";
import OrdersTab from "../components/Account/OrdersTab";
import ChangePasswordTab from "../components/Account/ChangePasswordTab";
import AddressTab from "../components/Account/AddressTab";

import { useAuth } from "../hooks/useAuth";
import { logout } from "../services/apiAuth";

export default function ProfilePage() {
  const { user, setUser, userLoading } = useAuth();
  const [activeSection, setActiveSection] = useState("account");

  const navigate = useNavigate();

  if (userLoading) {
    return <p>Loading...</p>;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return <AccountTab userData={user} setUserData={setUser} />;
      case "orders":
        return <OrdersTab />;
      case "password":
        return <ChangePasswordTab />;
      case "addresses":
        return <AddressTab />;
      default:
        return null;
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <PageContainer>
        <Sidebar>
          <WelcomeText>
            <h2>ACCOUNT PAGE</h2>
            <p>Hello, {user?.name}!</p>
          </WelcomeText>
          <NavMenu>
            <NavItem
              href="#"
              $active={activeSection === "account"}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("account");
              }}
            >
              <User size={20} />
              Account Information
            </NavItem>
            <NavItem
              href="#"
              $active={activeSection === "orders"}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("orders");
              }}
            >
              <Package size={20} />
              Orders
            </NavItem>
            <NavItem
              href="#"
              $active={activeSection === "password"}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("password");
              }}
            >
              <Lock size={20} />
              Change Password
            </NavItem>
            <NavItem
              href="#"
              $active={activeSection === "addresses"}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("addresses");
              }}
            >
              <MapPin size={20} />
              Address
            </NavItem>
          </NavMenu>
        </Sidebar>
        <MainContent>{renderContent()}</MainContent>
      </PageContainer>
      <LogOutContainer>
        <LogoutButton onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </LogoutButton>
      </LogOutContainer>
    </>
  );
}

const colors = {
  primaryColor: "#16423C",
  secondaryColor: "#6A9C89",
  thirdColor: "#C4DAD2",
  fourthColor: "#E9EFEC",
  warmAccent: "#D68060",
  coolAccent: "#60A1D6",
};

const PageContainer = styled.div`
  display: flex;
  gap: 40px;
  max-width: 1400px;
  margin: 5rem auto;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  flex: 0 0 250px;
`;

const MainContent = styled.div`
  flex: 1;
`;

const WelcomeText = styled.div`
  margin-bottom: 30px;
  h2 {
    color: ${colors.primaryColor};
    font-size: 20px;
    margin-bottom: 10px;
  }
  p {
    color: ${colors.secondaryColor};
    font-size: 16px;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  color: ${(props) =>
    props.$active ? colors.primaryColor : colors.secondaryColor};
  text-decoration: none;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  background-color: ${(props) =>
    props.$active ? colors.fourthColor : "transparent"};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.fourthColor};
  }
`;

const LogOutContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 100px;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: transparent;
  color: ${colors.secondaryColor};
  border: 1px solid ${colors.secondaryColor};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  margin-top: 20px;

  &:hover {
    border-color: var(--warm-accent);
    background-color: var(--warm-accent);
    color: white;
  }
`;
