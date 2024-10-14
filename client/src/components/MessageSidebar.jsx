import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete"; 
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages,addMessage,deleteMessage} from "../state/index";

const MessageSidebar = ({ selectedFriend, handleClose, userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const messages = useSelector((state) => state.messages);
 

  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        sender: userId,
        receiver: selectedFriend._id,
        text: message, 
        
    
      };
      console.log("sender",newMessage.sender);
      
      try {
        const response = await axios.post(
          "https://moha-ten.vercel.app/messages/send",
          newMessage,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",

            },
          }
        );
        console.log("Sent message response:", response.data.message);
        dispatch(addMessage(response.data.message))
        setMessage("");
        setIsDialogOpen(true);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `https://moha-ten.vercel.app/messages/${userId}/${selectedFriend._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedMessages = response.data.messages;
     dispatch(setMessages({fetchedMessages}));
     
     console.log("Fetched messages:", fetchedMessages)
    } catch (error) {
      console.error("Error fetching messages:", error);
    }

  };
  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`https://moha-ten.vercel.app/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteMessage(messageId));  
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedFriend]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: "300px",
        backgroundColor: "#1E1E1E",
        color: "white",
        boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.3)",
        padding: "1rem",
        zIndex: 1100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          color: "white",
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
      >
        <CloseIcon />
      </IconButton>

      <Typography
        variant="h6"
        fontWeight="500"
        mb="1.5rem"
        sx={{ color: "#FFD700" }}
      >
        Chat with {selectedFriend?.name}
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mb: "1rem",
          padding: "0.5rem",
          backgroundColor: "#2C2C2C",
          borderRadius: "8px",
        }}
      >
        {!messages||messages.length === 0 ? (
          <Typography variant="body2" sx={{ color: "#888" }}>
            No messages yet.
          </Typography>
        ) : (
          messages.map((message) => (
            <Box
              key={message._id}
              sx={{
                mb: "0.5rem",
                display: "flex",
                justifyContent:
                message.sender === userId ? "flex-end" : "flex-start",
                
              }}
            >
              <Box
                sx={{
                  maxWidth: "80%",
                  padding: "0.5rem 1rem",
                  backgroundColor: message.sender === userId ? "#FFD700" : "#3E3E3E",
                  color: message.sender === userId ? "#1E1E1E" : "#FFFFFF",
                  borderRadius: "10px 10px 10px 0px",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {message.sender === userId ? "You" : selectedFriend.name}:{" "}
                  {message.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#888", display: "block" }}
                >
                  {new Date(message.createdAt).toLocaleTimeString()}
                </Typography>
                {message.sender === userId && (
                      <IconButton
                      onClick={() => handleDeleteMessage(message._id)}
                      sx={{ color: "red", marginLeft: "5px" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    )}
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0rem",
        }}
      >
        <Box
          component="textarea"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            flexGrow: 1,
            border: "none",
            outline: "none",
            bgcolor: "#333",
            color: "#FFD700",
            padding: "0.4rem",
            borderRadius: "5px",
            resize: "none",
            maxWidth: "300px",
            "&::placeholder": {
              color: "#FFD700",
            },
          }}
          rows={2}
        />

        <IconButton onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            backgroundColor: "#333",
            color: "white",
          },
        }}
      >
        <DialogContent>
          <Typography sx={{ color: "#FFD700" }}>
            Message sent successfully to {selectedFriend?.name}!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{
              backgroundColor: "#FFD700",
              color: "#1E1E1E",
              "&:hover": { backgroundColor: "#FFC107" },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MessageSidebar;
