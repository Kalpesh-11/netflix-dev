import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { menus, SettingMenus } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideBarProps } from "@/types";

function Sidebar({ toggleDrawer, state }: SideBarProps) {
  const router = usePathname();
  return (
    <Drawer
      anchor="left"
      open={state}
      onClose={toggleDrawer(false)}
      sx={{ ".MuiDrawer-paper": { backgroundColor: "black", pt: 5 } }}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {Object.entries(SettingMenus).map(([title, link]) => (
            <ListItem key={title} disablePadding>
              <ListItemButton>
                <Link
                  href={link}
                  className={`netflix-nav-link ${
                    router == link ? "active" : ""
                  }`}
                >
                  {title}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ backgroundColor: "#333" }} />
        <List>
          {Object.entries(menus).map(([title, link]) => (
            <ListItem key={title} disablePadding>
              <ListItemButton>
                <Link
                  href={link}
                  className={`netflix-nav-link ${
                    router == link ? "active" : ""
                  }`}
                >
                  {title}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
