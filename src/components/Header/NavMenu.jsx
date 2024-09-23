import { Link } from "react-router-dom"
import styled from "styled-components"

function NavMenu() {
  return (
    <NavListStyle>
      <ListItemStyle>
        <Link to="/all">All Products</Link>
      </ListItemStyle>
      <ListItemStyle>
        <Link to="/notYet">Category</Link>
      </ListItemStyle>
    </NavListStyle>
  )
}

export default NavMenu

const NavListStyle = styled.ul`
  display: flex;
  position: relative;
  gap: 3rem;
  margin-left: 3rem;
  flex: 1;
  font-weight: 650;
  height: 100%;
  align-items: center;
  font-size: var(--font-size-md);

  @media (max-width: 768px) {
    display: none;
  }
`

const ListItemStyle = styled.li`
  position: relative;
  padding-right: 21px;
  height: 100%;
  transition: opacity 0.1s ease-in-out;
  white-space: nowrap;

  a {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &::after {
    content: "";
    height: 10px;
    width: 10px;
    position: absolute;
    background: url(/arrow-menu.png);
    background-size: contain;
    background-repeat: no-repeat;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    opacity: 0.5;
  }
`
