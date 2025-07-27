import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from '@mui/material';

export default function LoginPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/rules');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold" mt={1}>
            Sign in to your account
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            fullWidth
            sx={{
              mt: 1,
              py: 1.2,
              background: 'linear-gradient(to right, #1976d2, #1565c0)',
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}