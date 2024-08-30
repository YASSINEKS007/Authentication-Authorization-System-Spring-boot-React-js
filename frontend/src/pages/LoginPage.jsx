import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import NavBar from "../components/NavBar";
import api from "../api/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const login = async (data) => {
    try {
      const response = await api.post(`/login`, {
        password: data.password,
        email: data.email,
      });
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const boxStyles = {
    width: "100%",
    maxWidth: "600px",
    p: 3,
    border: "1px solid black",
    boxShadow: 2,
    borderRadius: "8px",
    m: {
      xs: 1,
      sm: 2,
      md: 3,
    },
  };

  return (
    <div className="h-screen w-auto">
      <NavBar />
      <div className="flex justify-center items-center mt-6">
        <Box sx={boxStyles}>
          <form onSubmit={handleSubmit(login)}>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
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
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.password}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  <FormHelperText>{errors.password?.message}</FormHelperText>
                </FormControl>
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
                  Log In
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: "center",
                  mt: 2,
                  fontSize: "16px",
                }}
              >
                Don’t have an account?{" "}
                <span
                  style={{
                    color: "#1976d2",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate("/register")}
                >
                  Register Here
                </span>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default LoginPage;
