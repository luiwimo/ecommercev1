import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ShoppingCart } from '@material-ui/icons';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import { actionTypes } from '../Reducer';
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: "whitesmoke",
    boxShadow: "none",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  image: {
      marginRight: "10px",
      height: "5rem",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [{basket, user}, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleOut = () => {
    if(user) {
      auth.signOut();
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [],
      });
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      });
      navigate("/");
    }
  } 

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <img alt="logo" className={classes.image} src="https://cdn.pixabay.com/photo/2016/10/18/00/48/stopwatch-1749080__340.png"/>        
            </IconButton>
          </Link>
          <div className={classes.grow} />
          <Typography variant="h6" color="textPrimary" component="p">
            Hello {user ? user.email : "Guest"}
          </Typography>
          <div className={classes.button}>
            <Link to="/signin">
              <Button variant="outlined" onClick={handleOut}>
                  <strong>{user ? "Sign Out" : "Sing In"}</strong>
              </Button>
            </Link>
            <Link to="/checkout-page">
              <IconButton aria-label="show cart items" color="inherit" >
                  <Badge badgeContent={basket?.length} color="secondary">
                      <ShoppingCart fontSize='large' color="primary"/>
                  </Badge>
              </IconButton>
              </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}