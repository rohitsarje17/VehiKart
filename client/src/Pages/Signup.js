import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        VehiKart
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const navi = (path)=>{
    navigate(path);
  }

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   const formData = new FormData(event.currentTarget);
//   const email = formData.get('email');
//   const password = formData.get('password');

//   try {
//     const response = await axios.post('http://localhost:5000/user/login', {
//       email,
//       password,
//     });
    
//     // Assuming your backend responds with a token upon successful login
//    // const token = response.data.token;

//     // Do something with the token, like storing it in local storage or state
//    // localStorage.setItem('token', token);

//     // Redirect to profile page upon successful login 
//     navigate('/profile');
//   } catch (error) {
//     console.error('Error signing in:', error);
//     // Handle login failure, show an error message or something
//   }
// };
const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await axios.post('http://localhost:5000/user/login', {
      email,
      password,
    });

    // Assuming your backend responds with user data including the user ID
    const { user } = response.data;

    // Store the token and user ID in local storage or state
   // localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id);

    // Redirect to profile page upon successful login
    navigate('/profile');
  } catch (error) {
    console.error('Error signing in:', error);
    // Handle login failure, show an error message or something
  }
};
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item onClick = {navigate("/createAccount")}>
              <div onClick = {()=>navi('/createAccount')}>
                <Typography variant="subtitle1">
                  Don't have an account? Create one!
                </Typography>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}