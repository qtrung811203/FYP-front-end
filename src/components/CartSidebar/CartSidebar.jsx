import styled from "styled-components"

import CartContainer from "./CartContainer"

function CartSidebar() {
  return (
    <SidebarContainer>
      {/* Add your sidebar content here */}
      <Background />
      <CartContainer />
    </SidebarContainer>
  )
}

export default CartSidebar

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999;
`
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  opacity: 0.5;
  z-index: -1;
  background: #363636;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`
