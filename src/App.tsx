import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./Post/PostList";
import PostCreate from "./Post/PostCreate";
import BottomNav from "./home/BottomNav";
import ProfileHome from "./Profile/ProfileHome";
import ProfileCreate from "./Profile/ProfileMenu/ProfileCreate";
import ProfileEdit from "./Profile/ProfileMenu/ProfileEdit";
import ProfilePreview from "./Profile/ProfileMenu/ProfilePreview";
import AccountLogin from "./account/AccountLogin";
import AccountRegister from "./account/AccountRegister";

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }

  #root {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Container = styled.div`
  position: relative;
  width: 80vh;
  max-width: 80vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: Arial, sans-serif;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;
  padding-bottom: 60px;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Container>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post-create" element={<PostCreate />} />
          <Route path="/profile" element={<ProfileHome />} />
          <Route path="/profileCreate" element={<ProfileCreate />} />
          <Route path="/profileEdit" element={<ProfileEdit />} />
          <Route path="/profileView" element={<ProfilePreview />} />
          <Route path="/login" element={<AccountLogin />} />
          <Route path="/register" element={<AccountRegister />} />
        </Routes>
      </Container>
      <BottomNav />
    </Router>
  );
}

export default App;
