import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCreateProfile, fetchCreateProfilePic } from "../ProfileService";
import { USER_ID } from "../../assets/Constant";

const ProfileCreate: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = Number(params.get("userId")) || USER_ID; // 기본값 USER_ID

  const [bio, setBio] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [published, setPublished] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const [myId,setMyId] = useState<number>(USER_ID);
    
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setMyId(Number(storedId));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {//user_id추가
      const res = await fetchCreateProfile({
        user_id:myId,
        username: username,
        bio: bio,
        published: published,
      });

      if (image) {
        await fetchCreateProfilePic(image, res.user_id);
      }

      alert("프로필이 작성되었습니다.");
      navigate(-1);
    } catch (error) {
      alert("Failed to create profile");
    }
  };

  return (
    <Container>
      <Title>프로필 작성하기</Title>
      <Form onSubmit={handleSubmit}>
        <FileInputLabel>
          {preview ? (
            <PreviewImage src={preview} alt="이미지 미리보기" />
          ) : (
            <span>+</span>
          )}
          <StyledFileInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </FileInputLabel>
        <StyledInput
          type="text"
          placeholder="이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <StyledTextarea
          placeholder="자기소개 작성하기"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        <SwitchContainer>
          <input
            type="checkbox"
            checked={published}
            onChange={() => setPublished(!published)}
          />
          <span>Publish</span>
        </SwitchContainer>
        <StyledButton type="submit">작성하기</StyledButton>
      </Form>
    </Container>
  );
};

export default ProfileCreate;

const Container = styled.div`
  padding: 1vh;
  background: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 3vh;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45vh;
  border: 2px dashed #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 8vh;
  color: black;
  text-align: center;
  position: relative;
`;

const StyledFileInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
  object-fit: cover;
  position: absolute;
`;

const StyledTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 15vh;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #0056b3;
  }
`;