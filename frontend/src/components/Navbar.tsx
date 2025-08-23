import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const navLinks = [
  { label: "Feed", to: "/feed" },
  { label: "Upload", to: "/video-upload" }
];

interface Props {
  window?: () => Window;
}

export default function Navbar(props: Props) {
  const { window } = props || {};
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("auth_token"));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleMenuClose();
    navigate("/")
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ my: 2, fontWeight: 700 }}
        component={Link}
        to="/"
        color="#2563eb"
        style={{ textDecoration: 'none' }}
      >
        🎬 VideoStream
      </Typography>
      <Divider />
      <List>
        {isAuthenticated &&
          navLinks.map((item) => (
            <ListItem key={item.to} disablePadding>
              <ListItemButton
                component={Link}
                to={item.to}
                selected={location.pathname === item.to}
                sx={{ textAlign: 'center' }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: 'white',
          borderBottom: 1,
          borderColor: 'grey.200',
          color: '#222',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: '1120px',
            mx: 'auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: '#2563eb',
                fontWeight: 700,
                textDecoration: 'none',
                mr: 2,
                letterSpacing: 1,
              }}
            >
              🎬 VideoStream
            </Typography>
            {isAuthenticated && (
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                {navLinks.map((item) => (
                  <Button
                    key={item.to}
                    component={Link}
                    to={item.to}
                    sx={{
                      color: location.pathname === item.to ? '#fff' : '#374151',
                      bgcolor:
                        location.pathname === item.to ? '#2563eb' : 'transparent',
                      fontWeight: 500,
                      borderRadius: 2,
                      textTransform: 'none',
                      px: 2,
                      '&:hover': {
                        bgcolor:
                          location.pathname === item.to ? '#1d4ed8' : '#f3f4f6',
                        color:
                          location.pathname === item.to ? '#fff' : '#1e293b',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar sx={{ bgcolor: '#1976d2', width: 36, height: 36 }}>U</Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/"
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                Login / Register
              </Button>
            )}

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 1, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
