import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkoutSuccess } from "../services/apiCheckout";
import { removeAllFromCart } from "../features/cartSlice";
import successIcon from "../assets/success.svg";
import NotFoundPage from "./NotFoundPage";

import Loading from "../components/Loading/Loading";

function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  //Get the cart from the store
  const dispatch = useDispatch();

  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessed, setIsProcessed] = useState(false);

  // Fetch the checkout session
  useEffect(() => {
    if (!sessionId || isProcessed) return;
    const fetchCheckoutSession = async () => {
      setIsLoading(true);
      try {
        const session = await checkoutSuccess(sessionId);
        if (session) {
          setSession(session);
          setIsProcessed(true);
          dispatch(removeAllFromCart());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [sessionId, isProcessed, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return session ? (
    <CheckoutSuccessContainer>
      <SuccessIcon src={successIcon} alt="success" />
      <p>Thank you for your order!</p>
      <SubText>Please check your email for more information!</SubText>
    </CheckoutSuccessContainer>
  ) : (
    <NotFoundPage />
  );
}

export default CheckoutSuccessPage;

const CheckoutSuccessContainer = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
`;
const SuccessIcon = styled.img`
  width: 100px;
  height: 100px;
`;

const SubText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;
