import React, { useState } from "react"; 
import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  MicOutlined,
  VideoLibraryOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import axios from "axios";

const MyPostWidget = ({ picturePath}) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);

      if (image) {
          formData.append("picture", image);
          formData.append("picturePath", image.name);
      }

      if (video) {
          formData.append("video", video);
          formData.append("videoPath", video.name);
         
      }
      if(audio) {
        formData.append("audio", audio);
        formData.append("audioPath", audio.name);
      }
      try {
          const response = await axios.post("https://moha-ten.vercel.app/posts", formData, {
              headers: { Authorization: `Bearer ${token}` },
          });
          

          dispatch(setPosts({ posts: response.data }));
          setImage(null);
          setVideo(null);
          setPost("");
      } catch (error) {
          console.error("Error posting:", error);
      }
  };

  return (
      <WidgetWrapper>
          <FlexBetween gap="1.5rem">
              <UserImage image={picturePath} />
              <InputBase
                  placeholder="What's on your mind..."
                  onChange={(e) => setPost(e.target.value)}
                  value={post}
                  sx={{
                      width: "100%",
                      backgroundColor: palette.neutral.light,
                      borderRadius: "1rem",
                      padding: "1rem 1.5rem",
                      border: `2px solid ${post ? "#ff6f20" : palette.neutral.light}`,
                      transition: "border-color 0.3s ease",
                      "&:focus": {
                          outline: "none",
                          border: `2px solid #ff6f20`,
                      },
                      "&:hover": {
                          border: `2px solid #ff6f20`,
                      },
                  }}
              />
          </FlexBetween>

          {isImage && (
              <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
                  <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                  >
                      {({ getRootProps, getInputProps }) => (
                          <FlexBetween>
                              <Box
                                  {...getRootProps()}
                                  border={`2px dashed ${palette.primary.main}`}
                                  p="1rem"
                                  width="100%"
                                  sx={{ "&:hover": { cursor: "pointer" } }}
                              >
                                  <input {...getInputProps()} />
                                  {!image ? (
                                      <p>Add Image Here</p>
                                  ) : (
                                      <FlexBetween>
                                          <Typography>{image.name}</Typography>
                                          <EditOutlined />
                                      </FlexBetween>
                                  )}
                              </Box>
                              {image && (
                                  <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                                      <DeleteOutlined />
                                  </IconButton>
                              )}
                          </FlexBetween>
                      )}
                  </Dropzone>
              </Box>
          )}

  
          {isVideo && (
              <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
                  <Dropzone
                      acceptedFiles=".mp4,.mov,.avi"
                      multiple={false}
                      onDrop={(acceptedFiles) => setVideo(acceptedFiles[0])}
                  >
                      {({ getRootProps, getInputProps }) => (
                          <FlexBetween>
                              <Box
                                  {...getRootProps()}
                                  border={`2px dashed ${palette.primary.main}`}
                                  p="1rem"
                                  width="100%"
                                  sx={{ "&:hover": { cursor: "pointer" } }}
                              >
                                  <input {...getInputProps()} />
                                  {!video ? (
                                      <p>Add Video Here</p>
                                  ) : (
                                      <FlexBetween>
                                          <Typography>{video.name}</Typography>
                                          <EditOutlined />
                                      </FlexBetween>
                                  )}
                              </Box>
                              {video && (
                                  <IconButton onClick={() => setVideo(null)} sx={{ width: "15%" }}>
                                      <DeleteOutlined />
                                  </IconButton>
                              )}
                          </FlexBetween>
                      )}
                  </Dropzone>
              </Box>
          )}
  {isAudio && (
        <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone
            acceptedFiles=".mp3,.wav,.m4a"
            multiple={false}
            onDrop={(acceptedFiles) => setAudio(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!audio ? (
                    <p>Add Audio Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{audio.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {audio && (
                  <IconButton onClick={() => setAudio(null)} sx={{ width: "15%" }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
          <Divider sx={{ margin: "1.25rem 0" }} />

          <FlexBetween>
             
              <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                  <ImageOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                      Image
                  </Typography>
              </FlexBetween>

             
              <FlexBetween gap="0.25rem" onClick={() => setIsVideo(!isVideo)}>
                  <VideoLibraryOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                      Video
                  </Typography>
              </FlexBetween>

              <FlexBetween gap="0.25rem" onClick={() => setIsAudio(!isAudio)}>
          <MicOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
            Audio
          </Typography>
        </FlexBetween>

              <Button
                  disabled={!post}
                  onClick={handlePost}
                  sx={{
                      color: "orange",
                      backgroundColor: "#1122",
                      borderRadius: "0.8rem",
                      padding: "0.5rem 1.5rem",
                      transition: "background-color 0.3s ease, transform 0.2s ease",
                      "&:hover": {
                          backgroundColor: "#2212",
                      },
                  }}
              >
                  POST
              </Button>
          </FlexBetween>
      
      </WidgetWrapper>
  );
};

export default MyPostWidget