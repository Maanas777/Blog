import React, { useContext, useEffect, useState } from 'react'
import { AppBar, Box, Button, IconButton, Toolbar, useMediaQuery } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { Menu as MenuIcon } from "@mui/icons-material"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../App';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { auth, setAuth, refresh, setRefresh } = useContext(AuthContext);
  const navigator = useNavigate()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isNonMobileDevice = useMediaQuery("(min-width: 1000px)")

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:7000/api/user/auth", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      const data = await res.json()
      if (res.ok) {
        setAuth(data)
        setRefresh(false)
      }else{
        setAuth(null)
      }
    }
    fetchUser()
  }, [auth, refresh])

  const logOut = () => {
    localStorage.removeItem("token")
    setRefresh(true)
    navigator("/login")
  }

  return (
    <AppBar sx={{ p: "0 5%" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <h3>Blogs</h3>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {isNonMobileDevice ?
            <>
              {auth ?
                <>
                  <Button><Link style={{ color: "#fff", textDecoration: "none" }} to={"/"}>Home</Link></Button>
                  <Button><Link style={{ color: "#fff", textDecoration: "none" }} to={"/create"}>Create</Link></Button>
                  <Button color='inherit' onClick={logOut}>Logout</Button>
                </>
                :
                <>
                  <Button><Link style={{ color: "#fff", textDecoration: "none" }} to={"/login"}>Login</Link></Button>
                  <Button><Link style={{ color: "#fff", textDecoration: "none" }} to={"/register"}>Register</Link></Button>
                </>
              }
            </>
            : <>
              <IconButton
                sx={{ color: "#fff" }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {auth ? [
                  <MenuItem onClick={handleClose}><Link style={{ color: "#333", textDecoration: "none" }} to={"/"}>Home</Link></MenuItem>,
                  <MenuItem onClick={handleClose}><Link style={{ color: "#333", textDecoration: "none" }} to={"/create"}>Create</Link></MenuItem>,
                  <MenuItem onClick={() => {handleClose(); logOut()}}>Logout</MenuItem>,
                ]
                  :
                  [
                    <MenuItem onClick={handleClose}><Link style={{ color: "#333", textDecoration: "none" }} to={"/login"}>Login</Link></MenuItem>,
                    <MenuItem onClick={handleClose}><Link style={{ color: "#333", textDecoration: "none" }} to={"/register"}>Register</Link></MenuItem>
                  ]}
              </Menu>

            </>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar