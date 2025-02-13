import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignupPost from "./AccountService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 320px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const AccountLogin = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await SignupPost.post("/signin", {
        login_id: loginId,
        pwd: password,
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("id",response.data.id);

      console.log("로그인 성공:", response.data);
      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패");
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Input
        type="text"
        placeholder="아이디"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>로그인</Button>
    </Container>
  );
};

export default AccountLogin;
