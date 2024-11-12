import {
  FormControl,
  FormLabel,
  Stack,
  Typography,
  styled,
} from "@mui/material";

export const SignInContainerWrapper = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  backgroundColor: "#E6E6E6",
  padding: "1rem",
});
export const FormHeading = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.7rem",
  lineHeight: "2rem",
  textAlign: "center",
  mb: 4,
  textTransform: "uppercase",
});

export const SignInContainer = styled(Stack)(({ theme }) => ({
  minWidth: "100%",
  maxWidth: "450px",
  backgroundColor: "#fff",
  // background
  borderRadius: "8px",
  padding: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
    minWidth: "450px",
  },
  boxShadow: `hsla(220 , 30%, 5%, 0.05) 0px 5px 15px 0px,
                hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px`,

  ...theme.applyStyles("dark", {
    boxShadow: `hsla(220 , 30%, 5%, 0.05) 0px 5px 15px 0px,
                hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px`,
  }),
}));
export const ErrorText = styled(Typography)({
  fontSize: "12px",
  marginTop: "3px",
  marginLeft: "5px",
  fontWeight: "500",
  color: "red",
});
export const StyledFormControl = styled(FormControl)({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  marginBlock: "30px",
});
export const StyledFormLabel = styled(FormLabel)({
  fontWeight: 600,
  width: "fit-content",
});
