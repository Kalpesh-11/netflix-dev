"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useScrollTrigger } from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { SearchBox, Sidebar, SubHeader } from ".";
import { menus, SettingMenus } from "@/constants";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks";
import { ProfilesProps } from "@/types";
import { getProfile } from "@/utils";

function Header() {
  const router = usePathname();
  const query = router.split("/");
  const type = query[2];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );
  const { profiles }: ProfilesProps = useAppSelector(
    (state) => state.profiles.profileList
  );
  const profile = getProfile(selectedProfileID, profiles);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [state, setState] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const style = {
    backgroundColor: trigger ? "rgb(20, 20, 20)" : "transparent",
    backgroundImage: "linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)",
    boxShadow: "unset",
    transition: "all 0.4",
  };
  if (!profile) {
    return;
  }
  return (
    <>
      <AppBar position="fixed" className="netflix-header" style={style}>
        <Container maxWidth="xl" disableGutters sx={{ px: "4%" }}>
          <Toolbar disableGutters>
            {/* DeskTop Logo */}
            <Link href="/">
              <Typography
                variant="h6"
                noWrap
                component="a"
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
            </Link>
            {/* Mobile Menu icon */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="Links"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={toggleDrawer(true)}
                sx={{
                  p: 1,
                }}
              >
                <RxHamburgerMenu></RxHamburgerMenu>
              </IconButton>
            </Box>
            {/* Mobile Logo */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "red",
                textDecoration: "none",
              }}
            >
              NETFLIX
            </Typography>
            {/* Mobile search */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <SearchBox isDesktop={false} />
            </Box>
            {/* Desktop nav Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {Object.entries(menus).map(([title, link], index) => (
                <Link
                  key={index}
                  href={link}
                  className={`netflix-nav-link ${
                    router == link ? "active" : ""
                  }`}
                >
                  {title}
                </Link>
              ))}
            </Box>
            {/* Desktop profile Menu & Search*/}
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <SearchBox isDesktop={true} />
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={profile?.name}
                  src={profile?.imgSrc}
                  variant="rounded"
                />
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
                {Object.entries(SettingMenus).map(([title, link], index) => (
                  <Link
                    key={`SettingMenus . ${index}`}
                    href={link}
                    className={`netflix-nav-link ${
                      router == link ? "active" : ""
                    }`}
                  >
                    {title}
                  </Link>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        {["movie", "tv"].includes(type) && <SubHeader />}
      </AppBar>
      <Sidebar toggleDrawer={toggleDrawer} state={state} />
    </>
  );
}
export default Header;
