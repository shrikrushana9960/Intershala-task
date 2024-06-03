import { Avatar, Button, Container, Paper, Tab, Tabs, TextField, styled } from '@mui/material';
import React, { useState } from 'react';
import Api from '../utils/Api';
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../DataLayer/DataLayer';

const StyledContainer = styled(Container)({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: (theme) => theme.spacing(1)
});

const StyledTextField = styled(TextField)({
  margin: (theme) => theme.spacing(1, 0)
});

const StyledButton = styled(Button)({
  margin: (theme) => theme.spacing(3, 0, 2)
});

function Login() {
  const [value, setValue] = React.useState(0);
  const [email, setEmail] = useState();
  const [username, setUserName] = useState();
  const [, dispatch] = useDataLayerValue();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      let res = await Api.post('/user/login', {
        username,
        password
      });
      console.log(res.data);
      if (res.data.success) {
        console.log(res.data.data);
        dispatch({
          type: 'SET_USER_DETAILS',
          userDetails: res.data.data
        });
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          errMess: { message: 'Login Successful', type: 'success' }
        });
        navigate('/');
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        errMess: { message: 'Account Not Found ', type: 'error' }
      });
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let res = await Api.post('/user', {
        username,
        password,
        email
      });
      console.log(res.data);
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {value === 0 ? (
          <StyledForm onSubmit={handleSignIn}>
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <StyledButton type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </StyledButton>
          </StyledForm>
        ) : (
          <StyledForm onSubmit={handleRegister}>
            <input accept="image/*" id="contained-button-file" hidden type="file" />
            <label htmlFor="contained-button-file">
              <Avatar
                src="/images/example.jpg"
                style={{
                  margin: '10px',
                  width: '60px',
                  height: '60px'
                }}
              />
            </label>
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
              autoFocus
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <StyledButton type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </StyledButton>
          </StyledForm>
        )}
      </StyledPaper>
    </StyledContainer>
  );
}

export default Login;
