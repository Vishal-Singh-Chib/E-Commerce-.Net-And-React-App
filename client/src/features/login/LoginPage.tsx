import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
  CircularProgress
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLoginHandler } from "./LoginProcessor";
import type { Message } from "../../app/models/Message";


export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<Message | null>(null);

  const { handleSubmit, isLoading } = useLoginHandler(
    email,
    password,
    setMessage
  );

  return (
    <Box
      sx={{
        
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        elevation={10}
        sx={{
          minWidth: 350,
          padding: 2,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
             Login / Register
          </Typography>

          {message?.type  && message?.type !== 'error' && (
            <Alert
              icon={<CheckCircleOutlineIcon />}
              severity="success"
              sx={{ my: 2 }}
            >
              {message?.text}
            </Alert>
          )}
          {message?.type && message?.type ==='error'  && (
            <Alert
              icon={<CheckCircleOutlineIcon />}
              severity="error"
              sx={{ my: 2 }}
            >
              {message?.text}
            </Alert>
          )}
 
 
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            color="primary"
            sx={{ fontWeight: "bold", py: 1.5 }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "LOGIN / REGISTER"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
