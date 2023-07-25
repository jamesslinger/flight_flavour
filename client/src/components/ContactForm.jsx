import React, { useState, useRef, createRef } from 'react';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Paper from "@mui/material/Paper";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';



const theme = createTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#ededed',
      contrastText: '#ededed',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#fff',
    },
  },
  components: {
    // Inputs
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid #fff`,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `2px dotted #fff`,
            }
          }
        }
      }
    }
  }
});

const ContactForm = () => {
  const [open, setOpen] = useState(false);
  const form = useRef();
  
  const confirmSend = () => {
    setOpen(true);
  };

  const confirmClose = () => {
    setOpen(false);
    document.getElementById('contact_form').reset();
  };

  const sendEmail = (e) => {
      e.preventDefault();
      emailjs.sendForm('service_vqhgyj5', 'template_nhru9br', '#contact_form', 'Z4NHUisA-l2JYwHi4')
      .then((response) => {
        confirmSend()
     }, (error) => {
        alert(`Sorry, there was a problem with your submission. Please try again.\nError: ${error}` )
     });
  }

  const CustomPaperBG = (props) => {
    return <Paper style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', outline: 'none', borderRadius: '15px' }} {...props} />
  };

  return (
    <>
    <ThemeProvider theme={theme}>
        <Box
          id='contact_form'
          className='contact-bg'
          component='form'
         ref={form}
         onSubmit={sendEmail}
          autoComplete='off'
        >
          <h4>CONTACT US</h4>
          <p>If you have any questions, suggestions or experience an issue with our site, please feel free to contact us via the form below.</p>
          <Box className="form-container" sx={{ width: 500, maxWidth: '100%'}}>
            <Stack direction='column'>
              <TextField required margin='normal' name='user_name' label='Your Name' type='text' placeholder='Your first and last name...' />
              <TextField required margin='normal' name='user_email' label='Your Email' type='email' placeholder='Your contact email...' />
              <TextField required margin='normal' multiline rows={8} name='user_msg' type='text' label='Your Message' placeholder='Type your message here...' />
              <Button id='cf-btn' variant='outlined' type='submit'
                sx={{
                border: '1px solid #fff',
                mt: 1,
                px: 1,
                py: 1.5,
                fontSize: 16,
                textShadow: '1px 1px 4px rgba(0, 0, 0, 0.75)'
                }}
              >
                SEND
              </Button>
            </Stack>
          </Box>
          <Dialog
            open={open}
            onClose={confirmClose}
            className='dialog-bg'
            PaperComponent={CustomPaperBG}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title" className='fd-title'>
            Message Sent!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className='fd-text' sx={{color: '#fff'}}>
              We'll be in touch very soon.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' onClick={confirmClose} autoFocus sx={{ mx: 'auto', mb: 2, width: '70%' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        </Box>
        </ThemeProvider>
    </>
  )
}
export default ContactForm