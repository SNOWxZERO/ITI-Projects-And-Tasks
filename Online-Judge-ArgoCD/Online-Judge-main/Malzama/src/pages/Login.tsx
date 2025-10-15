
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthService from "../services/Auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { User } from "../Context/UserContext";


const schema = yup.object().shape({
  username: yup.string().required().min(3).matches(/^[^@]+$/, "Username cannot contain @"),
  password: yup.string().required().min(8),
});

export default function Login() {
  const currentUser = useContext(User);




  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await AuthService.login(data.username, data.password);
      setLoading(false);
      if (response.response_code === "4") {
        throw(new Error(response.response_description));
      }

      if (response.response_code === "1") {
        toast.success(response.response_description);
        const token = response.access_token;
        const username = data.username;
        currentUser.setAuth({ token, username });
        
      }

      
    } catch (err) {
      console.error("Error logging in:", err);
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
          <Typography component="h1" variant="h5">
            Sign in
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
              autoComplete="username"
              autoFocus
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <button
              type="submit"
              className = "submitBtn"
              disabled={loading}
            >
              Sign In
            </button>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </div>
  );
}
