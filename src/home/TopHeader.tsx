import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const HeaderContainer = styled.header`
  position: absolute;
  width: 80vh;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 999;
`;

const Title = styled.h1`
  font-size: 3vh;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 40px;
  height: 40px;
  color: #333; 
  text-decoration: none;
  font-size: 18px;
  border-radius: 50%;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  & svg {
    color: #333;
  }
`;

function TopHeader({ title = "PNU St4gram" }) {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <IconButton onClick={() => navigate(-1)}>
          {"<<"}
        </IconButton>
        <Title>{title}</Title>
        <IconButton as={Link} to="/">
          <FaHome />
        </IconButton>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default TopHeader;
