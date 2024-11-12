import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { DateRange, EmailOutlined } from "@mui/icons-material";

import React from "react";
import { USER_DATA } from "@/type";
import { useAppContext } from "@/context";

type UserCardProps = {
  userData: USER_DATA;
};
const UserCard = React.memo(
  ({ userData: { dob, email, username, id } }: UserCardProps) => {
    const { openModal, setUpdateUserId, setUserFormData, deleteUser } =
      useAppContext();

    const handleEdit = () => {
      setUpdateUserId(id);
      setUserFormData({ username, email, dob });
      openModal();
    };
    return (
      <StyledCard>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            {username}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <StyledDataDisplayWrapper>
            <StyledDataDisplay>
              <DateRange />
              <Typography>{new Date(dob)?.toLocaleDateString()}</Typography>
            </StyledDataDisplay>

            <StyledDataDisplay>
              <EmailOutlined />
              <Typography>{email}</Typography>
            </StyledDataDisplay>
          </StyledDataDisplayWrapper>
        </CardContent>

        <CardActions sx={{ justifyContent: "center", gap: 3, my: 1 }}>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#526E48",
              color: "#fff",
              maxWidth: "120px",
            }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#C62E2E",
              color: "#fff",
              maxWidth: "120px",
            }}
            onClick={() => deleteUser(id)}
          >
            Delete
          </Button>
        </CardActions>
      </StyledCard>
    );
  }
);
UserCard.displayName = "UserCard";

export default UserCard;

const StyledCard = styled(Card)(() => ({
  boxShadow: "0 0 2px gray",
}));

const StyledDataDisplayWrapper = styled(Stack)({
  flexDirection: "column",
  gap: 6,
});
const StyledDataDisplay = styled(Stack)({
  flexDirection: "row",
  gap: 6,
});
