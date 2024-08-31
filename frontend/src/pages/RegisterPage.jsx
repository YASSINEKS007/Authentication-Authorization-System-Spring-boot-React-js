import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { TextField, Typography, Button } from "@mui/material";
import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/api";

const RegisterPage = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const boxStyles = {
    width: "100%",
    maxWidth: "600px",
    padding: "24px",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    margin: {
      xs: "16px",
      sm: "24px",
      md: "32px",
    },
  };

  const register_user = async (data) => {
    try {
      const response = await api.post("/auth/register", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="h-screen w-full">
      <NavBar />
      <div className="flex justify-center items-center mt-6">
        <Box sx={boxStyles}>
          {/* Centering Typography */}
          <div className="flex justify-center mb-4">
            <Typography
              variant="h5"
              gutterBottom
            >
              Register
            </Typography>
          </div>
          <form onSubmit={handleSubmit(register_user)}>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={12}
              >
                <TextField
                  id="fullname"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  {...register("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              </Grid>

              <Grid
                item
                xs={12}
              >
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default RegisterPage;
