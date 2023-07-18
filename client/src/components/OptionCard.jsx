import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from '@mui/material/Stack';
import FlightTakeoffSharpIcon from '@mui/icons-material/FlightTakeoffSharp';
import FlightLandSharpIcon from '@mui/icons-material/FlightLandSharp';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import CurrencyPoundSharpIcon from '@mui/icons-material/CurrencyPoundSharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';


const convertDate = (date) => {
    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
    
    const departDate = new Date(date)
    const convertedDate = departDate.toLocaleDateString('en-GB', dateOptions)
    return convertedDate
}

const convertTime = (date) => {
    const time = new Date(date)
    const departTime = time.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})
    return departTime
}

export default function OptionCard(props) {
    return (
        <Card id='opt-card' elevation={6}
         sx={{ display: 'flex', my: 2, mx: 'auto', borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.7)', justifyContent: 'center' }}
        >
          <CardActionArea>
            <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , mx: 'auto' }}>
              <Stack direction='column' spacing={1}
               sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' , mx: 'auto', p: 1}}>
                <Stack direction={{xs: 'column', md: 'row'}} spacing={1}>
                  <Chip id="opt-chip" variant="outlined" color="primary"
                   icon={<FlightTakeoffSharpIcon />}
                   label={`${props.data.cityFrom} (${props.data.flyFrom})`} 
                   sx={{ border: '1px solid', fontSize: '1.2rem', py: 0.5, boxShadow: 1,
                    height: 'auto', '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                    } }}
                  />
                  <DoubleArrowSharpIcon id='arrow' color="primary"
                   sx={{ fontSize: 34, display: 'flex', justifyContent: 'center', alignItems: 'center' , mx: 'auto', }}
                  />
                  <Chip id="opt-chip" variant="outlined" color="primary"
                   icon={<FlightLandSharpIcon />}
                   label={`${props.data.cityTo} (${props.data.flyTo})`}
                   sx={{ border: '1px solid', fontSize: '1.2rem', py: 0.5, boxShadow: 1, 
                    height: 'auto', '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                    } }}
                  />
                </Stack>
                <Divider flexItem id='divider' sx={{ my: 1, fontSize: 11 }}>Details</Divider>
                <Stack direction={{xs: 'column', md: 'row'}} spacing={1} >
                  <Chip id='details-chip' variant="outlined" color="primary"
                   icon={<CalendarMonthSharpIcon />}
                   label={convertDate(props.data.utc_departure)}
                   sx={{ border: '1px solid', fontSize: 12, boxShadow: 1,
                    height: 'auto', '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                    } }}
                  />
                  <Chip id='details-chip' variant="outlined" color="primary"
                   icon={<AccessTimeSharpIcon />}
                   label={convertTime(props.data.utc_departure)}
                   sx={{ border: '1px solid',  fontSize: 12, boxShadow: 1,
                    height: 'auto', '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                    } }}
                  />
                  <Chip id='details-chip' variant="outlined" color="primary"
                   icon={<CurrencyPoundSharpIcon />}
                   label={props.data.price}
                   sx={{ border: '1px solid', fontSize: 12, boxShadow: 1,
                    height: 'auto', '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                    } }}
                  />
                </Stack>
              </Stack>
              <Divider flexItem id='divider' orientation="vertical" />
              <Stack id='btn-stack' direction={{xs: 'column', sm: 'column', md: 'row'}} spacing={1}>
                <Button id='info-btn' variant="outlined"
                 href={props.data.deep_link}
                 startIcon={<AirplaneTicketOutlinedIcon />}
                 sx={{ border: '1px dashed', fontSize: 12, boxShadow: 1, p: 2, mx: 2, whiteSpace: 'normal' }}
                >
                  Details & Book
                </Button>
              </Stack>
            </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      );
}