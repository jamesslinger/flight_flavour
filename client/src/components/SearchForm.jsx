import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import FlightTakeoffSharpIcon from '@mui/icons-material/FlightTakeoffSharp';
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form } from "react-router-dom";
import { airports } from "./airports";
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';


const theme = createTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#ededed',
      contrastText: '#ededed',
    },
    secondary: {
      light: 'rgba(238, 238, 238, 0.85)',
      main: 'rgba(238, 238, 238, 0.85)',
      dark: 'rgba(255, 255, 255, 0.75)',
      contrastText: 'rgba(255, 255, 255, 0.75)',
    },
  }
})

function budgetValueText(value) {
  const symbol = "£";
  return `${symbol}${value}`;
}

export default function SearchForm() {
  const [airportList, setAirportList] = useState('');
  const [budgetValue, setBudgetValue] = useState(250);
  const [flyTimeframe, setFlyTimeframe] = useState(14);
  const [searchParams, setSearchParams] = useState('');

  const searchFormParams = () => {
    const apCodes = [airportList.map(airport => airport.code)].toString();
    
    const dateOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    };
  
    let dateToday = new Date();
    dateToday.toLocaleDateString('en-GB', dateOptions);
  
    let dateTomorrow = new Date()
    dateTomorrow.setDate(dateToday.getDate() + 1);
    const fromDate = dateTomorrow.toLocaleDateString('en-GB', dateOptions);
    
    let futureDate = new Date(dateTomorrow)
    futureDate.setDate(dateTomorrow.getDate() + flyTimeframe);
    const toDate = futureDate.toLocaleDateString('en-GB', dateOptions);
    
    const searchReq = new URLSearchParams({
      fly_from: apCodes,
      price_to: budgetValue,
      date_from: fromDate,
      date_to: toDate,
      limit: 999,
      one_per_date: 1,
      curr: 'GBP',
    })
    setSearchParams(searchReq)
  }

  const CustomListBG = (props) => {
    return <Paper style={{ backgroundColor: 'rgba(255, 255, 255, 0.80)'}} {...props} />
  };

  const ease = [0.08, 0.37, 0.45, 0.89];

  return (
    <>
      <ThemeProvider theme={theme}>
      <AnimatePresence>
          <Form
            className="search-form"
            action={`/results/${searchParams}`}
            params={searchParams}
          >
            <Box className='sf-bg' id='sf-bg' component={motion.div} initial={{ opacity: 0, transition: { delay: 0.5, duration: 1.5, ease } }}
            animate={{ opacity: 1, transition: { delay :0.5, duration: 1.5, ease } }}
            exit={{ opacity: 0, transition: { delay: 0.5, duration: 1.5, ease } }}>
                <Box sx={{ width: '95%' }}>
                  <h4>CHOOSE DEPARTURE AIRPORT</h4>
                  <Autocomplete
                    limitTags={3}
                    id='sf-auto'
                    className="sf-section"
                    fullWidth={true}
                    multiple={true}
                    options={airports}
                    onChange={(e, value) => {
                      setAirportList(value)
                      }}
                    getOptionLabel={(option) => option.name}
                    disableCloseOnSelect={true}
                    PaperComponent={CustomListBG}
                    sx={{ maxWidth: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Airport..."
                        placeholder="Type or click to search..."
                        color="primary"
                        sx={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 0.35)'}}
                        focused
                        required={airportList.length === 0} 
                      />
                    )}

                    renderOption={(props, option, { selected }) => (
                      <MenuItem
                        {...props}
                        id="sf-menu"
                        key={uuidv4()}
                        value={option.code}
                        sx={{ 
                          color: 'rgba(0, 0, 0, 0.7)',
                          textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
                          fontSize: '0.8rem'
                        }}
                      >
                        <FlightTakeoffSharpIcon />
                        {option.name} ({option.code})
                        {selected && <CheckIcon />}
                      </MenuItem>
                    )}

                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((props, selected) => (
                        <Chip
                          icon={<FlightTakeoffSharpIcon />}
                          key={uuidv4()}
                          variant="outlined"
                          color="primary"
                          label={props.name}
                          sx={{
                            border: '1px solid',
                            fontSize: '0.8rem',
                            boxShadow: 1,
                            textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)'
                          }}
                          {...getTagProps({ selected })}
                        />
                        ))
                    }
                  />
                </Box>
                <Box sx={{ width: '95%' }}>
                  <h4>SET YOUR BUDGET</h4>
                  <Slider
                    id='sf-budget'
                    className="sf-section"
                    sx={{      
                      "& .MuiSlider-thumb": {
                        borderRadius: "6px",
                      },
                      "& .MuiSlider-valueLabel": {
                        
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        textShadow: '1px 1px 6px rgba(0, 0, 0, 0.75)',
                      },           
                    }}
                    getAriaLabel={() => "Range"}
                    value={budgetValue}
                    defaultValue={250}
                    min={50}
                    max={750}
                    step={25}
                    onChange={(e) => {
                      setBudgetValue(e.target.value);
                    }}
                    valueLabelDisplay="on"
                    getAriaValueText={budgetValueText}
                    valueLabelFormat={(value) => <div>£{value}</div>}
                  />
                </Box>
                <Box sx={{ width: '95%' }}>
                  <h4>FLY WITHIN</h4>
                  <ToggleButtonGroup
                    id='sf-fly'
                    sx={{ maxWidth: 500 }}
                    className="sf-section"
                    fullWidth={true}
                    defaultValue={14}
                    value={flyTimeframe}
                    exclusive
                    onChange={(e) => {
                      setFlyTimeframe(parseInt(e.target.value));
                    }}
                    aria-label="Fly within"
                  >
                    <ToggleButton id="tg-btn1" value={7}
                    sx={{
                      py: 1,
                      border: '1px solid',
                      borderColor: '#fff',
                      color: '#fff',
                      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.75)'
                      }}
                    >
                      7 Days
                    </ToggleButton>
                    <ToggleButton id="tg-btn2" value={14}
                    sx={{
                      py: 1,
                      border: '1px solid',
                      borderColor: '#fff',
                      color: '#fff',
                      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.75)'
                      }}
                    >
                      14 Days
                    </ToggleButton>
                    <ToggleButton id="tg-btn3" value={30}
                    sx={{
                      py: 1,
                      border: '1px solid',
                      borderColor: '#fff',
                      color: '#fff',
                      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.75)'
                      }}
                    >
                      1 Month
                    </ToggleButton>
                    <ToggleButton id="tg-btn4" value={90}
                    sx={{
                      py: 1,
                      border: '1px solid',
                      borderColor: '#fff',
                      color: '#fff',
                      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.75)'
                      }}
                    >
                      3 Months
                    </ToggleButton>
                    <ToggleButton id="tg-btn5" value={180}
                    sx={{
                      py: 1,
                      border: '1px solid',
                      borderColor: '#fff',
                      color: '#fff',
                      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.75)'
                      }}
                    >
                      6 Months
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box> 
                  <Button
                    id="sf-btn"
                    sx={{
                      width: '95%',
                      border: '1px solid',
                      px: 1,
                      py: 1.5,
                      fontSize: 16,
                      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.75)'
                    }}
                    variant="outlined"
                    type="submit"
                    onClick={() => {
                      airportList.length > 0 && searchFormParams()
                    }}
                  >
                    Get Flights
                  </Button>
              </Box>
        </Form>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}
