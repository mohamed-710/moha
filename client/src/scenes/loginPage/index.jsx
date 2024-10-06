import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
} from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      backgroundColor="#0D1117" // Dark background similar to the screenshot
      padding={isNonMobileScreens ? "0 10%" : "0 5%"}
    >
      {/* Header Section */}
      <Box
        width="100%"
        backgroundColor="transparent" // Keeping it transparent as it looks better with a blurred background
        p=".3rem"
        textAlign="center"
        borderRadius="0 0 20px 20px"
      >
        <Typography
          fontWeight="bold"
          fontSize="clamp(2rem, 3vw, 3rem)"
          color="orange" // Sitemark logo text color matching the design
          fontFamily="Montserrat, sans-serif" // Modern font
        >
          TRIBEHUB
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Box
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"} // Change direction based on screen size
        width={isNonMobileScreens ? "60%" : "90%"} // Adjust width
        p="0"
        m="1rem auto"
        borderRadius="1.5rem"
        boxShadow="0px 0px 5px orange"
        sx={{
          backgroundColor: "transparent", // Dark blue background for the form
        }}
      >
        {/* Image Section */}
        <Box
          flex={1}
          display={isNonMobileScreens ? "flex" : "none"} // Hide image on small screens
          justifyContent="center"
          alignItems="center"
          borderRadius="1.5rem 0 0 1.5rem" // Rounded corners for image section
          overflow="hidden"
        >
          <img
            src="/loginimg.png" // Replace with the actual path to your image
            alt="Login Illustration"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Ensure image fits well
          />
        </Box>

        {/* Login Form Section */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          p="1.4rem"
        >
          <Box width="100%">
            <Typography
              fontWeight="bold"
              variant="h3"
              sx={{ mb: "1.7rem", color: "orange" }} // White text
              textAlign="center"
              fontFamily="Montserrat, sans-serif" // Modern font
            >
              Welcome 😊❤️
            </Typography>

            {/* Form Component */}
            <Form />
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box textAlign="center" mt="0.5rem">
        <Typography variant="body2" color="#B0B0B0">
          © 2024 Connect.io . All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
