import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import streetScene from "../assets/street-scene.jpg";

const GlobalAnimations = createGlobalStyle`
  body {
    background-color: #ffffff; 
  }
`;

const blockGlitch1 = keyframes`
  0% { clip-path: inset(15% 0 75% 0); transform: translate(-10px, 0); }
  15% { clip-path: inset(45% 0 45% 0); transform: translate(10px, 0); }
  30% { clip-path: inset(80% 0 5% 0); transform: translate(-12px, 0); }
  45% { clip-path: inset(25% 0 65% 0); transform: translate(8px, 0); }
  60% { clip-path: inset(55% 0 25% 0); transform: translate(-15px, 0); }
  75% { clip-path: inset(5% 0 85% 0); transform: translate(12px, 0); }
  90% { clip-path: inset(65% 0 15% 0); transform: translate(-8px, 0); }
  100% { clip-path: inset(35% 0 55% 0); transform: translate(10px, 0); }
`;

const blockGlitch2 = keyframes`
  0% { clip-path: inset(8% 0 82% 0); transform: translate(12px, 0); }
  20% { clip-path: inset(38% 0 52% 0); transform: translate(-10px, 0); }
  40% { clip-path: inset(72% 0 12% 0); transform: translate(15px, 0); }
  60% { clip-path: inset(18% 0 72% 0); transform: translate(-8px, 0); }
  80% { clip-path: inset(58% 0 32% 0); transform: translate(10px, 0); }
  100% { clip-path: inset(88% 0 2% 0); transform: translate(-12px, 0); }
`;

const loadingBarGlitch = keyframes`
  0% { width: 0%; transform: skewX(0deg); opacity: 1; }
  10% { width: 15%; transform: skewX(-20deg); opacity: 0.8; }
  20% { width: 10%; transform: skewX(20deg) translateX(5px); opacity: 1; }
  40% { width: 45%; transform: skewX(0deg); }
  50% { width: 40%; transform: skewX(40deg) translateX(-5px); opacity: 0.6; }
  60% { width: 65%; transform: skewX(-10deg); opacity: 1; }
  80% { width: 90%; transform: skewX(0deg); }
  90% { width: 85%; transform: skewX(30deg); opacity: 0.9; }
  100% { width: 100%; transform: skewX(0deg); opacity: 1; }
`;

const textGlitch = keyframes`
  0% { transform: translate(0); text-shadow: 0 0 0 #000; }
  20% { transform: translate(-2px, 1px); text-shadow: 2px 0px 0px rgba(100,100,100,0.5); }
  40% { transform: translate(-1px, -1px); text-shadow: -2px 0px 0px rgba(150,150,150,0.5); }
  60% { transform: translate(2px, 1px); text-shadow: 2px 0px 0px rgba(50,50,50,0.5); }
  80% { transform: translate(1px, -1px); text-shadow: -2px 0px 0px rgba(200,200,200,0.5); }
  100% { transform: translate(0); text-shadow: 0 0 0 #000; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  background: white;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const PhotoWrapper = styled.div`
  position: relative;

  width: 33.333vw;
  height: 70vh;
  margin-top: 0;
  margin-bottom: 2rem;

  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(props) => props.$src});
    background-size: cover;
    background-position: center;
    filter: grayscale(100%);

    display: block;

    background-color: transparent;
  }

  &::before {
    animation: ${blockGlitch1} 0.25s infinite linear alternate-reverse;
    z-index: 1;
  }

  &::after {
    animation: ${blockGlitch2} 0.3s infinite linear alternate-reverse;
    z-index: 2;
  }

  @media (max-width: 768px) {
    width: 60vw;
    height: 50vh;
  }

  @media (max-width: 480px) {
    width: 85vw;
    height: 40vh;
  }
`;

const LinkContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: auto;
`;

const GlitchBarBox = styled.div`
  width: 250px;
  height: 8px;
  background: #ccc;
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 180px;
  }
`;

const GlitchBarFill = styled.div`
  height: 100%;
  background: #000;
  animation: ${loadingBarGlitch} 4s infinite linear;
`;

const ApparelLink = styled.a`
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 4px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  animation: ${textGlitch} 0.4s infinite linear;

  &:hover {
    color: #555;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }
`;

const Footer = styled.footer`
  width: 100%;
  background: #1a1a1a;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0;
  flex-shrink: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
`;

const IconLink = styled.a`
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.6;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: #999;
  margin-top: 0.5rem;
`;

function Home() {
  const [loadingActive, setLoadingActive] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // This timer now only controls the loading bar -> text transition
    const timer = setTimeout(() => {
      setLoadingActive(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    { icon: FaInstagram, label: "Instagram" },
    { icon: FaTwitter, label: "Twitter" },
    { icon: FaFacebook, label: "Facebook" },
    { icon: FaLinkedin, label: "LinkedIn" },
  ];

  return (
    <>
      <GlobalAnimations />
      <Container>
        {/* Removed the $active prop so the photo glitches permanently */}
        <PhotoWrapper $src={streetScene} />

        <LinkContainer>
          {loadingActive ?
            <GlitchBarBox>
              <GlitchBarFill />
            </GlitchBarBox>
          : <ApparelLink onClick={() => navigate("/coming-soon")}>
              APPAREL
            </ApparelLink>
          }
        </LinkContainer>

        <Footer>
          <SocialLinks>
            {socialLinks.map(({ icon: Icon, label }) => (
              <IconLink
                key={label}
                onClick={() => navigate("/coming-soon")}
                title={label}
              >
                <Icon />
              </IconLink>
            ))}
          </SocialLinks>
          <Copyright>&copy; 2026 Your Company. All rights reserved.</Copyright>
        </Footer>
      </Container>
    </>
  );
}

export default Home;
