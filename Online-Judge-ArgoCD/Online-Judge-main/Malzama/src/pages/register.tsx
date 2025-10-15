import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/Copyright";
import AuthService from "../services/Auth";
import { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../Context/UserContext";
import '../index.css'

const schema = yup.object().shape({
  username: yup.string().required().min(3).matches(/^[^@]+$/, "Username cannot contain @"),
  email: yup.string().email().required().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email must be a valid email"),
  password: yup.string().required().min(8),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required(),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const currentUser = useContext(User);
  console.log(currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await AuthService.register(
        data.email,
        data.username,
        data.password
      );
      setLoading(false);
      if (response.response_code === "2" || response.response_code === "3") {
        throw new Error(response.response_description);
      }

      if (response.response_code === "1") {
        toast.success(response.response_description);
        const token = response.access_token;
        const username = data.username;
        const email = data.email;
        currentUser.setAuth({ token, username, email });
      }
    } catch (err) {
      console.error("Error registering:", err);
      toast.error(String(err));
    }
  };

  return (
    <div className="container">
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: "6rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              autoComplete="username"
              {...register("username")}
            />
            {errors.username && (
              <Typography variant="body2" color="error">
                {errors.username.message}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("email")}
              InputProps={{
                classes: {
                  focused: 'custom-focused',
                }}
              }
            />
            {errors.email && (
              <Typography variant="body2" color="error">
                {errors.email.message}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            {errors.password && (
              <Typography variant="body2" color="error">
                {errors.password.message}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Verify Password"
              type="password"
              id="verify-password"
              autoComplete="current-password"
              {...register("verifyPassword")}
            />
            {errors.verifyPassword && (
              <Typography variant="body2" color="error">
                {errors.verifyPassword.message}
              </Typography>
            )}
            <button
              type="submit"
              className="submitBtn"
              disabled = {loading}

            >
              Register
            </button>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <RouterLink to={"/signin"}>
                  {"Already have an account? Sign In"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
      <ToastContainer />
    </div>
  );
}
