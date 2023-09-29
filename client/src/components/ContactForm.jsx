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
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from "@mui/material/Paper";
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Form } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';


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

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: ""
  });
  const form = useRef();

  const confirmSend = () => {
    setOpen(true);
  };

  const confirmClose = () => {
    setOpen(false);
  };

  const sendEmail = () => {
    emailjs.sendForm('service_vqhgyj5', 'template_nhru9br', '#contact_form', 'Z4NHUisA-l2JYwHi4')
      .then((response) => {
                confirmSend()
                setLoading(false);
                setFormValues({
                  name: "",
                  email: "",
                  message: ""
                });
     }, (error) => {
                alert(`Sorry, there was a problem with your submission. Please try again.\nError: ${error}` )
     });
  }

  function handleClick(e) {
    e.preventDefault();
    if (form.current.reportValidity()) {
      setLoading(true)
      sendEmail()
    }
  }

  const CustomPaperBG = (props) => {
    return <Paper style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', outline: 'none', borderRadius: '15px', padding: '1rem' }} {...props} />
  };

  const ease = [0.08, 0.37, 0.45, 0.89];

  return (
    <>
      <ThemeProvider theme={theme}>
        <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, transition: { delay: 0.5, duration: 1, ease } }}
          animate={{ opacity: 1, transition: { delay :0.5, duration: 1, ease } }}
          exit={{ opacity: 0, transition: { delay: 0.5, duration: 1, ease } }}
        >
          <Form
            ref={form}
            id='contact_form'
            className='contact-bg'
          >
            <Box
              component={motion.div}
              sx={{ px: 2 }}             
            >
              <motion.h4>CONTACT US</motion.h4>
              <motion.p>If you have any questions, suggestions or experience an issue with our site, please feel free to contact us via the form below.</motion.p>
              <Box className="form-container" sx={{ width: '100%' }}>
                <Stack direction='column'>
                  <TextField
                   required
                   variant='outlined'
                   margin='normal'
                   name='user_name'
                   label='Your Name'
                   type='text'
                   placeholder='Your first and last name...'
                   value={formValues.name}
                   onChange={(e) =>
                    setFormValues({...formValues, name: e.target.value})}
                   />
                  <TextField
                   required
                   variant='outlined'
                   margin='normal'
                   name='user_email'
                   label='Your Email'
                   type='email'
                   placeholder='Your contact email...'
                   value={formValues.email}
                   onChange={(e) =>
                    setFormValues({...formValues, email: e.target.value})}
                   />
                  <TextField
                   required
                   variant='outlined'
                   margin='normal'
                   multiline rows={8}
                   name='user_msg'
                   type='text'
                   label='Your Message'
                   placeholder='Type your message here...'
                   value={formValues.message}
                   onChange={(e) =>
                    setFormValues({...formValues, message: e.target.value})}
                   />
                  <LoadingButton
                    id='cf-btn'
                    variant='outlined'
                    type='submit'
                    onClick={handleClick}
                    loading={loading}
                    endIcon={<SendIcon />}
                    component={Button}
                    loadingIndicator={<img className="logo-img-spin" src="../fly_lt.png" width={36} height={36} alt="logo" />}
                    sx={{
                      width: '100%',
                      border: '1px solid',
                      px: 1,
                      py: 1.5,
                      mt: 2,
                      fontSize: 16,
                      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.75)'
                    }}
                  >
                    {!loading && <span>Send</span>}
                  </LoadingButton>
                </Stack>
              </Box>
              <motion.div
                animate={{ opacity: 1, transition: { duration: 1, ease } }}
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
                  <DialogContent sx={{ p: 0 }}>
                    <DialogContentText id="alert-dialog-description" className='fd-text' sx={{ pb: 3, color: '#fff'}}>
                      We'll be in touch very soon.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus variant='outlined' onClick={confirmClose} sx={{ py: 1, mx: 'auto', width: '85%' }}>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </motion.div>
            </Box>
          </Form>
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </>
  )
};