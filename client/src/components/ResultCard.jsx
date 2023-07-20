import React, { useState, useRef, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Box from "@mui/material/Box";
import OptionCard from "./OptionCard";
import Chip from "@mui/material/Chip";
import Stack from '@mui/material/Stack';
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import PlaceSharpIcon from '@mui/icons-material/PlaceSharp';
import FlightTakeoffSharpIcon from '@mui/icons-material/FlightTakeoffSharp';
import useScrollTrigger from "@mui/material/useScrollTrigger";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from "@mui/material/Fade";
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';


const scrollBarStyle = {

  scrollbarWidth: 'thin',
  '&:hover::-webkit-scrollbar': {
    display: 'block',
    },
    '&::-webkit-scrollbar': {
    width: '0.512rem',
    },
    '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'lightgrey',
    height: '8px',
    borderRadius: '8px',
    },
  };

function ScrollToTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={!trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{position: 'fixed',
            right: 12,
            bottom: 12,
          }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export default function ResultCard(props) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const lowestPrice = (props) => {
    let nums = []
    props.results.map((item) => nums.push(item.price))
    return Math.min(...nums)
    }  

  const CustomPaperBG = (props) => {
    return <Paper style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', outline: 'none' }} {...props} />
  };
   
  return (
      <React.Fragment>
        <CardActionArea onClick={handleOpen('paper')}>
          <Card elevation={8}
           sx={{ 
            maxWidth: 420,
            height: 325,
            background: `url('${'../images/'}${props.results[0].cityCodeTo}.jpg'), url('../fallback.jpg')`, 
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
            }}
          >
            <CardContent sx={{
              position: 'absolute',
              bottom: -16,
              left: -10
              }}
            >
              <Stack direction='row' spacing={1}>
                <Chip variant="outlined"
                  label={props.cityTo}
                  sx={{
                    color: '#FFF',
                    border: '1px solid',
                    fontSize: 24,
                    fontWeight: 500,
                    backgroundColor: `rgba(0, 0, 0, 0.4)`,
                    p: 1,
                    py: 2,
                    boxShadow: 2
                    }}
                />
              </Stack>
              <Stack direction='row' spacing={0.5} sx={{ mt: 0.5 }}>
                <Chip variant="outlined"
                 label={props.results[0].countryTo.name}
                 icon={<PlaceSharpIcon color='white' sx={{ fontSize: 20 }} />}
                 sx={{
                  color: '#FFF',
                  border: '1px solid',
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: `rgba(0, 0, 0, 0.4)`,
                  p: 1,
                  py: 1,
                  boxShadow: 2
                  }}
                />
                <Chip variant="outlined"
                 label={'from £'+ lowestPrice(props)}
                 icon={<FlightTakeoffSharpIcon color='white' sx={{ fontSize: 20 }} />}
                 sx={{
                  color: '#FFF',
                  border: '1px solid',
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: `rgba(0, 0, 0, 0.4)`,
                  p: 1,
                  py: 1,
                  boxShadow: 2
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </CardActionArea>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            className="dialog-bg"
            PaperComponent={CustomPaperBG}
            fullWidth={true}
            maxWidth='md'
          >
            {handleClose ? (
                <Fab
                  aria-label="close"
                  onClick={handleClose}
                  size='small'
                  sx={{
                    position: 'fixed',
                    right: 12,
                    top: 12,
                    boxShadow: 2,
                    border: '1px solid #fff',
                    color: '#1976d2'
                  }}
                >
                  <CloseIcon />
                </Fab>
              ) : null}
            <DialogTitle >
              <Chip color='primary' variant="outlined"
                label={props.cityTo}
                icon={<PlaceSharpIcon />}
                sx={{
                  border: '1px solid',
                  fontSize: 30,
                  fontWeight: 400,
                  p: 2,
                  boxShadow: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  color: '#000',
                }}  
              />
            </DialogTitle>
            <DialogContent
              dividers={scroll ==='paper'}
              id='dialog-content'
              className="dialog-content"
              sx={{
                px: 5,
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                  background: "#f1f1f1",
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555'
                }}}
            >
              <div id="back-to-top-anchor" />
              <DialogContentText
                id='dialog-description'
                ref={descriptionElementRef}
                tabIndex={-1}
                component={'span'}
              >
                {props.results.map((option) => {
                  return (
                    <OptionCard key={uuidv4()} data={option} />
                  )
                })}
              </DialogContentText>
            </DialogContent>
            <ScrollToTop {...props}>
              <Fab size="small"
                aria-label="scroll back to top"
                sx={{boxShadow: 2, border: '1px solid #fff', color: '#1976d2'}}
              >
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollToTop>     
          </Dialog> 
      </React.Fragment>
  );
}
