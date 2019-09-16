import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import logo from '../../logo.svg';
import './navbar.component.css';

// const useStyles = {
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: 2,
//   },
//   title: {
//     flexGrow: 1,
//   },
// };

export default function MenuAppBar() {
  const [auth] = React.useState(true); //setAuth
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

//   function handleChange(event) {
//     setAuth(event.target.checked);
//   }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
        <AppBar position="fixed">
            <Toolbar>
                <img src={logo} className="App-logo" alt="logo" />
                <Typography variant="h6" color="inherit" noWrap>
                    Ucom
                </Typography>
                {auth && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            horizontal='right'
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    </div>
  );
}