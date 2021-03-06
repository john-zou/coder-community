import styled from '@emotion/styled';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MessageIcon from '@material-ui/icons/Message';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/ccLogo.svg';
import PurpleButton from '../../pages/common/PurpleButton';
import { initializeGitHubOAuth } from '../../pages/login/login';
import { Avatar } from '@material-ui/core';
import { RootState } from '../../reducers/rootReducer';
import { User } from '../../store/types';
import { AppDispatch } from "../../store";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: "black",
    backgroundColor: "white",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#FAFAFA",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginRight: "auto",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
      maxWidth: "120%",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    position: "absolute",
    pointerEvents: "none",
    marginTop: "0.5em",
    marginLeft: "1em",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 550,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  link: {
    textDecoration: "none",
  },
}));


export default function Header(props) {
  const ListItemDiv = styled.div`
  margin-top: 10px;
  margin-right: 0.7em;
  cursor: pointer;
`;
  const isLoggedIn = useSelector<RootState, boolean>((state) => state.isLoggedIn);
  const user = useSelector<RootState, User>(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSearchKeyDown = (event) => {
    if (event.keyCode === 13) { // https://stackoverflow.com/questions/43384039/how-to-get-input-textfield-values-when-enter-key-is-pressed-in-react-js
      const query = event.target.value;
      history.push(`/search?q=${query}`);
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        history.push(`/user/${user.userID}`);
        handleMenuClose();
      }}>Profile</MenuItem>
      <MenuItem onClick={() => {
        history.push('/logout');
        handleMenuClose();
      }}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt="avatar" src={user?.profilePic} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ display: "flex" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img onClick={() => { window.location.href = "/" }} src={Logo} style={{ width: "5em" }} alt="logo" />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Typography>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onKeyDown={handleSearchKeyDown}
              />
            </Typography>
          </div>
          <div style={{ display: "flex", flex: 1 }}></div>

          <ListItem style={{ width: "unset" }}>
            <ListItemIcon>

              <Link to="/" className={classes.link}>
                <h4 style={{ marginRight: "0.7em" }}>Home</h4>
              </Link>

              {isLoggedIn &&
                <ListItemDiv>
                  <Link to="/create-post" className={classes.link}>
                    <PurpleButton content="Add a Post" />
                  </Link>
                </ListItemDiv>}

              {!isLoggedIn &&
                <ListItemDiv>
                  <div onClick={initializeGitHubOAuth}>
                    <PurpleButton content="Log In with GitHub" />
                  </div>
                </ListItemDiv>}

            </ListItemIcon>
          </ListItem>

          {isLoggedIn &&
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="avatar" src={user?.profilePic} />
              </IconButton>
            </div>}

          <div className={classes.sectionDesktop}>

          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
