import React, { useState, useRef } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
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

  const ease = [0.08, 0.37, 0.45, 0.89];

  return (
    <>
      <ThemeProvider theme={theme}>
        <AnimatePresence mode="wait">
          <motion.div
            key={uuidv4()}
            initial={{ opacity: 0, transition: { delay: 0.5, duration: 1.5, ease } }}
            animate={{ opacity: 1, transition: { delay :0.5, duration: 1.5, ease } }}
            exit={{ opacity: 0, transition: { delay: 0.5, duration: 1.5, ease } }}
          >
            <Box
              id='contact_form'
              className='contact-bg'
              component='form'
              ref={form}
              onSubmit={sendEmail}
              autoComplete='off'
            >
              <motion.h4>CONTACT US</motion.h4>
              <motion.p>If you have any questions, suggestions or experience an issue with our site, please feel free to contact us via the form below.</motion.p>
              <Box className="form-container" sx={{ width: 500, maxWidth: '100%' }}>
                <Stack direction='column'>
                  <TextField variant='outlined' required margin='normal' name='user_name' label='Your Name' type='text' placeholder='Your first and last name...' />
                  <TextField variant='outlined' required margin='normal' name='user_email' label='Your Email' type='email' placeholder='Your contact email...' />
                  <TextField variant='outlined' required margin='normal' multiline rows={8} name='user_msg' type='text' label='Your Message' placeholder='Type your message here...' />
                  <Button id='cf-btn' variant='outlined' type='submit'
                    sx={{
                    border: '1px solid #fff',
                    mt: 2,
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
              <motion.div
                key={uuidv4()}
                initial={{ opacity: 0, transition: { delay: 0.5, duration: 1.5, ease } }}
                animate={{ opacity: 1, transition: { delay :0.5, duration: 1.5, ease } }}
                exit={{ opacity: 0, transition: { delay: 0.5, duration: 1.5, ease } }}
              >
                <Dialog
                  open={open}
                  onClose={confirmClose}
                  className='cf-bg'
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
              </motion.div>
            </Box>
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </>
  )
}
export default ContactForm