import * as Yup from "yup";

import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import {
  ErrorText,
  FormHeading,
  StyledFormControl,
  StyledFormLabel,
} from "./ui/custom-mui-style";

import { Close } from "@mui/icons-material";
import { Formik } from "formik";
import React from "react";
import { useAppContext } from "@/context";

const FormValidationSchema = Yup.object({
  username: Yup.string().required("name is required"),
  email: Yup.string().email().required("email is required"),
  dob: Yup.date().required("dob is required"),
});

function formatDate(date: string | Date) {
  const parsedDate = new Date(date);
  const year = String(parsedDate.getFullYear());
  const month = String(parsedDate.getMonth()).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const OperativeModal = React.memo(() => {
  const {
    addNewUser,
    editUser,
    updateUserId,
    setUpdateUserId,
    setUserFormData,
    userFormData,
    closeModal,
    displayModal,
    initialUserFormData,
  } = useAppContext();

  const handleCloseModal = () => {
    setUpdateUserId(null);
    setUserFormData(initialUserFormData);
    closeModal();
  };

  const handleSaveUser = ({
    values,
    setSubmitting,
  }: {
    values: { username: string; email: string; dob: string };
    setSubmitting: (isSubmitting: boolean) => void;
  }) => {
    if (updateUserId) {
      editUser(
        {
          username: values.username,
          email: values.email,
          dob: new Date(values.dob),
        },
        updateUserId
      )
        .then(() => {
          setUserFormData(initialUserFormData);
          setUpdateUserId(null);
          closeModal();
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      addNewUser({
        username: values.username,
        email: values.email,
        dob: new Date(values.dob),
      })
        .then(() => {
          setUserFormData(initialUserFormData);
          closeModal();
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };
  return (
    <Modal
      open={displayModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-email"
    >
      <ModalContainer>
        <Stack
          sx={{ flexDirection: "row", width: "100%", alignItems: "center" }}
        >
          <FormHeading variant="h1" sx={{ flex: 1 }}>
            {updateUserId ? "Edit User" : "Add New User "}
          </FormHeading>
          <IconButton onClick={handleCloseModal}>
            <Close />
          </IconButton>
        </Stack>

        <Formik
          initialValues={{
            username: userFormData?.username || "",
            email: userFormData?.email || "",
            dob: formatDate(userFormData?.dob),
          }}
          validationSchema={FormValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSaveUser({ values, setSubmitting });
          }}
        >
          {({
            values,
            handleChange,
            errors,
            handleSubmit,
            handleBlur,
            touched,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="">
              <StyledFormControl>
                <StyledFormLabel htmlFor="username" className="text-right">
                  User Name
                </StyledFormLabel>
                <TextField
                  id="username"
                  name="username"
                  type="string"
                  placeholder="enter user name"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="username"
                  fullWidth
                  variant="standard"
                  error={touched.username && errors.username ? true : false}
                  sx={{ ariaLabel: "username" }}
                />
                {touched.username && errors.username && (
                  <ErrorText variant="body2">{errors.username}</ErrorText>
                )}
              </StyledFormControl>
              <StyledFormControl>
                <StyledFormLabel htmlFor="email" className="text-right">
                  Email
                </StyledFormLabel>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="enter user email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  fullWidth
                  variant="standard"
                  error={touched.email && errors.email ? true : false}
                  sx={{ ariaLabel: "email" }}
                />
                {touched.email && errors.email && (
                  <ErrorText variant="body2">{errors.email}</ErrorText>
                )}
              </StyledFormControl>

              <StyledFormControl>
                <StyledFormLabel htmlFor="dob">DOB</StyledFormLabel>
                <TextField
                  id="dob"
                  name="dob"
                  type="date"
                  value={values.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="dob"
                  fullWidth
                  variant="standard"
                  error={touched.dob && errors.dob ? true : false}
                  sx={{ ariaLabel: "dob" }}
                />
                {touched.dob && errors.dob && (
                  <ErrorText variant="body2">{errors.dob}</ErrorText>
                )}
              </StyledFormControl>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{ backgroundColor: "#000", color: "#fff" }}
              >
                Save
              </Button>
            </form>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
});
OperativeModal.displayName = "Modal";

export default OperativeModal;

const ModalContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
  width: "100%",
  maxWidth: "400px",
  boxShadow: "0 0 10px gray",
  padding: "20px",
  borderRadius: "5px",
  [theme.breakpoints.up("sm")]: {
    width: "400px",
  },
}));
