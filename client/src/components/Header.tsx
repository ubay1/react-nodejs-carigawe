/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { AppDispatch } from '../store'
import { RootState } from '../store/rootReducer'
import { RiSuitcaseLine, RiCloseLine, RiMenuLine, RiSendPlaneFill, RiCheckLine, RiArrowRightSLine, RiUserLine, RiHome3Line, RiLogoutCircleRLine, RiLoginCircleLine, RiEdit2Line } from "react-icons/ri";
import { IoEllipsisVertical, IoSearch } from "react-icons/io5";
// import { expiredToken } from '../store/user'
import { setLoading } from '../store/loading'
import { setPageActive } from '../store/pageActive'
import { Slide, toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { expiredToken } from '../store/user'
import socket from '../utils/socket'
import { AppBar, IconButton, makeStyles, Theme, Toolbar, createStyles, fade, Menu, MenuItem, Badge, Typography, InputBase, createMuiTheme, ThemeProvider, Button, Tooltip, List, ListItem, ListItemIcon, ListItemText, Divider, Drawer } from '@material-ui/core'
import { MdEmail, MdNotifications, MdAccountCircle, MdMenu, MdSearch, MdMail, MdMoreVert, MdPerson, MdInput, MdAssignment, MdInbox, MdDrafts, MdPower, MdExitToApp, MdCopyright } from "react-icons/md";
import moment from 'moment'
import { VscSignOut } from "react-icons/vsc";

interface ITypeHeader {
  sudahDiPage?: string;
  actionSearchJob?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'block',
      // [theme.breakpoints.up('sm')]: {
      //   display: 'block',
      // },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#3b82f6',
    }
  },
});

const Header = (props: ITypeHeader) => {
  const [menuHide, setmenuHide] = useState(true)
  const [diPageMana, setdiPageMana] = useState("")
  const history = useHistory();

  const userRedux = useSelector((state: RootState) => state.user)
  const pageActive = useSelector((state: RootState) => state.pageActive)
  const dispatch: AppDispatch = useDispatch()

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [openDrawer, setopenDrawer] = useState(false)
  
  const toggleDrawer = (value: any) => {
    setopenDrawer(value);
  };

  const list = () => {
    return(
      // <div
      //   className="w-60"
      //   role="presentation"
      //   onClick={() => {setopenDrawer(false)}}
      //   onKeyDown={() => {setopenDrawer(false)}}
      // >
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <MdInbox />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MdDrafts />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
      // </div>
    )
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MdEmail />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <MdNotifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MdAccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            {
              userRedux.token !== '' 
              ?
                <IconButton
                  edge="start"
                  className="focus:outline-none mr-2 md:hidden"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => { setopenDrawer(true); }}
                >
                  <MdMenu/>
                </IconButton>
              : <div></div>
            }
            <Drawer style={{width:'250px'}} open={openDrawer} onClose={() => { setopenDrawer(false) }}>
              <div className="w-64">
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <ListItemIcon className="min-w-0 mr-2 bg-red-500 p-1 rounded-full shadow">
                      <VscSignOut  size={18} color="#fff"/>
                    </ListItemIcon>
                    <ListItemText primary="Keluar" />
                  </ListItem>
                  <Divider />
                  <ListItem className="text-center flex justify-center items-center">
                      <MdCopyright size={15} className="mr-1"/> 
                      <div className="text-xs uppercase font-semibold">{moment().format('Y')} Cari Gawe </div>
                  </ListItem>
                </List>
              </div>
            </Drawer>
            <Typography variant="h6" component="b"  className={`${classes.title}, text-white`} noWrap>
              <Link to="/" className="focus:outline-none" onClick={() => {
                dispatch(setPageActive({
                  ispage: 'beranda'
                }))
              }}>
                Cari Gawe
              </Link>
            </Typography>
            <div className={classes.grow} />
            <div className="hidden md:block">
              {
                userRedux.token !== ''
                ?
                  userRedux.profile.recruiter
                  ?
                    props.sudahDiPage === 'createjob' ? <div></div>
                    :
                      <>
                        <Link
                          to="/recruiter/create-job"
                          onClick={() => {
                            dispatch(setPageActive({
                              ispage: 'createjobs'
                            }))
                          }}
                        >
                          <Tooltip title="Buat loker">
                            <IconButton aria-label="show 4 new mails" color="inherit" className="focus:outline-none">
                              <RiSuitcaseLine />
                            </IconButton>
                          </Tooltip>
                        </Link>

                        <Link
                          to="/profil"
                          onClick={() => {
                            dispatch(setPageActive({
                              ispage: 'profil'
                            }))
                          }}
                        >
                          <Tooltip title="Profil">
                            <IconButton
                              color="inherit"
                              className="focus:outline-none"
                            >
                              <MdPerson />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </>
                    :
                    // jika login sebagai pencari kerja
                    <>
                      <div className="flex justify-center items-center">
                        <Link
                          to="/profil"
                          onClick={() => {
                            dispatch(setPageActive({
                              ispage: 'profil'
                            }))
                          }}
                        >
                          <Tooltip title="Profil">
                            <IconButton
                              color="inherit"
                              className="focus:outline-none"
                            >
                              <MdPerson />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        
                        <Tooltip title="Keluar">
                        <IconButton
                          className="text-white focus:outline-none"
                          // size="small"

                          onClick={async () => {
                            toast('Anda telah keluar', {
                              position: "bottom-right",
                              autoClose: 5000,
                              type: 'info',
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              transition: Slide
                            })
                            await Cookies.remove('token')

                            await window.location.replace('/login')
                            
                            setTimeout(() => {
                              // expiredToken(dispatch)
                            }, 2000)
                          }}
                        >
                          <VscSignOut/>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </>
                  : 
                  <div>
                    <Link
                      to="/login"
                    >
                      <Tooltip title="Masuk">
                        <IconButton aria-label="show 4 new mails" color="inherit" className="focus:outline-none">
                          <MdInput />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    {/* <Link
                      to="/register"
                    >
                      <Tooltip title="Daftar">
                        <IconButton aria-label="show 4 new mails" color="inherit" className="focus:outline-none">
                          <MdAssignment />
                        </IconButton>
                      </Tooltip>
                    </Link> */}
                  </div>
              }
            </div>
            
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu}
        {renderMenu} */}
      </div>
    </ThemeProvider>
  )
}

export default Header;