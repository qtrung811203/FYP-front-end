import styled from "styled-components";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Shop</FooterTitle>
          <FooterLink href="/products">All Products</FooterLink>
          <FooterLink href="/categories">Categories</FooterLink>
          <FooterLink href="/deals">Special Deals</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Customer Service</FooterTitle>
          <FooterLink href="/contact">Contact Us</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/returns">Returns & Exchanges</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterLink href="/about">Our Story</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/careers">Careers</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Connect With Us</FooterTitle>
          <SocialIcons>
            <SocialIcon
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </SocialIcon>
            <SocialIcon
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </SocialIcon>
            <SocialIcon
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;

//Styled Components
const FooterWrapper = styled.footer`
  background-color: var(--primary-color);
  color: var(--fourth-color);
  padding: 6rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FooterSection = styled.div`
  flex: 1;
  margin: 0 1rem;
  min-width: 200px;
`;

const FooterTitle = styled.h3`
  color: var(--fourth-color);
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: var(--fourth-color);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    color: var(--warm-accent);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: var(--fourth-color);
  font-size: 1.5rem;

  &:hover {
    color: var(--warm-accent);
  }
`;
