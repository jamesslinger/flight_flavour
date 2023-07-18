import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";


function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ threshold: 50, disableHysteresis: true });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const pages = [
  { name: 'About', link: '/about'},
  { name: 'Contact', link: '/contact'},
  { name: 'Flight Search', link: '/'}
];

export default function NavBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <HideOnScroll {...props}>
    <AppBar className="nav-bar" position="sticky" color="transparent" elevation={0}>
      <Container>
        <Toolbar>
        <FlightTakeoffIcon className="nav-icon" color="action"
         sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.5, color: '#fff' }}
        />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 0.5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            Flight Flavour
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', ml: -3}}>
            <IconButton
              size="large"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#fff"
            >
              <MenuIcon sx={{ color: '#fff', display: { xs: 'flex', md: 'none' } }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: 'flex',
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name}>
                  <Button
                    key={page.name}
                    href={page.link}
                    sx={{ color: 'black', fontSize: '0.7rem'}}
                  >
                    {page.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <FlightTakeoffIcon className="nav-icon"
           sx={{ display: { xs: 'none', sm: 'flex', md: 'none' }, mr: 0.5, color: '#fff' }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            Flight Flavour
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                href={page.link}
                sx={{ ml: 'auto', color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </HideOnScroll>
  );
}
