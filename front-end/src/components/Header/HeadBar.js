import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { isAuthenticated } from '../../utils/jwtUtil';
import logo from './logo1.jpg';

// http://localhost:3000
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display:'none',

    },
  },
  link: {
    marginRight: theme.spacing(10),
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2.5),
  },
}));

function HeadBar(props) {
  const { children, onLogout } = props ;
  //constants
  const classes = useStyles();
  // const colors = color();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true);  //로그인 체크
  const isMenuOpen = Boolean(anchorEl);
  // event handler

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {	
    setAnchorEl(null);	
  };
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (     // 회원 정보 누를 시 나오는 메뉴바	
    <Menu	
      anchorEl={anchorEl}	
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}	
      id={menuId}	
      keepMounted	
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}	
      open={isMenuOpen}	
      onClose={handleMenuClose}	
    >	

      {isAuthenticated() && (<div>	
        <MenuItem onClick={handleMenuClose}>내 정보</MenuItem>	
        <MenuItem onClick={handleMenuClose}>나의 질문 / 받은 질문</MenuItem>	
        <MenuItem onClick={onLogout}>로그아웃</MenuItem>
        <MenuItem onClick={handleMenuClose}>도움말</MenuItem>	
      </div>)	
      }	

      {isAuthenticated() || (<div>	
        <Link to="/register" style={{textDecoration:"none", color:"black"}}><MenuItem>회원가입</MenuItem></Link>	
        <Link to="/login" style={{textDecoration:"none", color:"black"}}><MenuItem>로그인</MenuItem></Link>	
        <MenuItem onClick={handleMenuClose}>홈페이지 기여하기</MenuItem>	
        <MenuItem onClick={handleMenuClose}>도움말</MenuItem>	
      </div>)	
      }	

    </Menu>	
  );
  //rendering!!!

  return (
    <div className={classes.grow}>
      <AppBar>
        <Toolbar>
          <Grid item xs={3}>
          <Link to="/" style={{textDecoration:"none", color:"white"}}>
          <div>
            <Avatar variant="square" alt="ASK" src={logo}>
              <Typography className={classes.title} variant="h6" noWrap>
                물어봐
              </Typography>
            </Avatar>
          </div>
          </Link>
          </Grid>
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated() &&
              <div className="login">
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </div>
            }
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          { children }
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default HeadBar; 