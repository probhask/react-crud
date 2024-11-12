import { Box, Button, Grid2, Stack, Typography, styled } from "@mui/material";

import OperativeModal from "@/components/OperativeModal";
import UserCard from "@/components/UserCard";
import { useAppContext } from "@/context";

const Home = () => {
  const { userList, openModal } = useAppContext();
  return (
    <Box sx={{ width: "100%", height: "100%", padding: 2 }}>
      <Stack sx={{ marginTop: 3, marginBottom: 5 }}>
        <Heading variant="h1">CRUD OPERATIONS</Heading>

        <AddUserButton fullWidth onClick={openModal}>
          ADD USERS
        </AddUserButton>
      </Stack>

      <UserCardContainer container>
        {userList.map((data) => (
          <UserCard key={data.id} userData={data} />
        ))}
      </UserCardContainer>
      <OperativeModal />
    </Box>
  );
};

export default Home;

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "2rem",
  textAlign: "center",
  marginTop: 0,
  marginBottom: "2rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3rem",
  },
}));
const AddUserButton = styled(Button)({
  backgroundColor: "#000",
  color: "#fff",
  maxWidth: "450px",
  marginInline: "auto",
});
const UserCardContainer = styled(Grid2)(({ theme }) => ({
  display: "grid",
  gap: "20px",
  paddingBlock: "20px",
  gridTemplateColumns: "repeat(1,1fr)",
  marginInline: "auto",
  [theme.breakpoints.up("sm")]: {
    gap: "30px",
    gridTemplateColumns: "repeat(2,1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3,1fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3,1fr)",
  },
}));
