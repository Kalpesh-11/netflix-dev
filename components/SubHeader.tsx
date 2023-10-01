import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Container from "@mui/material/Container";
import React from "react";
import Link from "next/link";

export default function SubHeader() {
  const pathName = usePathname();
  const isSubsectionPage =
    pathName.includes("movie") || pathName.includes("tv");
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window : undefined,
  });
  const style = {
    backgroundColor: trigger ? "rgb(20, 20, 20)" : "transparent",
    backgroundImage: "linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)",
    boxShadow: "unset",
    transition: "all 0.4",
    top: 40,
  };

  return (
    <>
      <AppBar position="fixed" className="netflix-header" style={style}>
        <Container maxWidth="xl" disableGutters sx={{ px: "4%" }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "red",
                textDecoration: "none",
              }}
            >
              NETFLIX
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                test
              </IconButton>
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiMenu-paper": { backgroundColor: "black" },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {["asd", "asdas"].map((title, index) => (
                  <Link
                    key={`SettingMenus . ${index}`}
                    href={title}
                    className={`netflix-nav-link`}
                  >
                    {title}
                  </Link>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
