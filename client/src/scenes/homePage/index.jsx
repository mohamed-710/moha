import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react"; // Import useEffect and useState
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import Loading from "../Loading"; // Adjust the path as necessary

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  // State to handle loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching with a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  if (loading) {
    return <Loading />; // Show loading component
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* Left Column */}
        <Box flexBasis={isNonMobileScreens ? "26%" : "100%"}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* Center Column */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : "100%"}
          mt={!isNonMobileScreens && "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>

        {/* Right Column (Shown only on non-mobile screens) */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box margin="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
