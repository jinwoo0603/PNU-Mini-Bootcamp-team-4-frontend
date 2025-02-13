import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCreateProfilePic, fetchUpdateProfile, fetchGetProfile, fetchGetProfilePic } from "../ProfileService";
import { USER_ID } from "../../assets/Constant";

const ProfileEdit: React.FC = () => {
  const location = useLocation();

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await fetchGetProfile(myId);
        const profilepic = await fetchGetProfilePic(myId);
        setUsername(profile.username || "");
        setBio(profile.bio || "");
        setPublished(profile.published || false);
        if (profilepic) {
          setPreview(profilepic);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, [myId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetchUpdateProfile({
        username,
        bio,
        published,
      }, myId);

      if (image) {
        console.log(res.user_id);
        await fetchCreateProfilePic(image, myId);
    }
    } catch (error) {
      alert("Failed to update profile");
    }
    alert("프로필이 수정되었습니다.");
    navigate(-1);
  };

  return (
    <Container>
      <Title>프로필 수정하기</Title>
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
          placeholder="자기소개 수정하기"
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
        <StyledButton type="submit">저장하기</StyledButton>
      </Form>
    </Container>
  );
};

export default ProfileEdit;

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
