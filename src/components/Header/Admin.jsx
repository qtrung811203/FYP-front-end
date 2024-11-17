import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";

function Admin() {
  return (
    <LinkStyled to="/admin">
      <StyledHeaderCart>
        <RiAdminFill />
      </StyledHeaderCart>
    </LinkStyled>
  );
}

export default Admin;

//Styled Components
const LinkStyled = styled(Link)`
  text-decoration: none;
  height: 100%;
`;

const StyledHeaderCart = styled.div`
  display: flex;
  width: 9rem;
  height: 100%;
  background-color: #155950;
  align-items: center;
  justify-content: center;
  color: white;

  svg {
    height: 5rem;
    width: 2.5rem;
  }
`;
