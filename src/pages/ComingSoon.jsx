import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Animation to make the static noise "jitter" rapidly
const noiseJitter = keyframes`
  0% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(-10%, 5%); }
  30% { transform: translate(5%, -10%); }
  40% { transform: translate(-5%, 15%); }
  50% { transform: translate(-10%, 5%); }
  60% { transform: translate(15%, 0); }
  70% { transform: translate(0, 10%); }
  80% { transform: translate(-15%, 0); }
  90% { transform: translate(10%, 5%); }
  100% { transform: translate(5%, 0); }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #050505; /* Dark background to make the white noise pop */
  color: white;
  overflow: hidden;
`;

// Generates TV static using an inline SVG filter
const StaticBackground = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  width: 200%;
  height: 200vh;
  background: transparent
    url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
  opacity: 0.15; /* Adjust this to make the static harsher or softer */
  animation: ${noiseJitter} 0.2s infinite linear;
  z-index: 1;
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2; /* Keeps the text above the static */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3); /* Slight glow on text */
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  letter-spacing: 5px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 3px;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    letter-spacing: 2px;
  }
`;

const GoBackButton = styled.button`
  font-size: 1.25rem;
  padding: 0.75rem 2rem;
  cursor: pointer;
  background: #ffffff;
  color: #000000;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #cccccc;
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.6rem 1.5rem;
  }
`;

function ComingSoon() {
  const navigate = useNavigate();

  return (
    <Container>
      <StaticBackground />
      <ContentWrapper>
        <Title>COMING SOON</Title>
        <GoBackButton onClick={() => navigate("/")}>HOME</GoBackButton>
      </ContentWrapper>
    </Container>
  );
}

export default ComingSoon;
