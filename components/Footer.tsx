import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
export default function Footer() {
  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    color: "grey",
    gap: 2,
    fontSize: "12px",
  };
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2} className="pb-20">
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          spacing={2}
          className="text-secondary-white"
        >
          <Grid
            key={0}
            item
            sx={{
              width: "20%",
              height: "100%",
            }}
          >
            <Box sx={boxStyle}>
              <Link href={"#"}>Audio Description </Link>
              <Link href={"#"}>Investor Relation</Link>
              <Link href={"#"}>Legal Notices</Link>
              <Link href={"#"}>Service Code</Link>
            </Box>
          </Grid>
          <Grid
            key={0}
            item
            sx={{
              width: "20%",
              height: "100%",
            }}
          >
            <Box sx={boxStyle}>
              <Link href={"#"}>Help Center </Link>
              <Link href={"#"}>Jobs</Link>
              <Link href={"#"}>Cookie Preference</Link>
            </Box>
          </Grid>
          <Grid
            key={0}
            item
            sx={{
              width: "20%",
              height: "100%",
            }}
          >
            <Box sx={boxStyle}>
              <Link href={"#"}>Gift Cards </Link>
              <Link href={"#"}>Terms of Use</Link>
              <Link href={"#"}>Cooperate Information</Link>
            </Box>
          </Grid>
          <Grid
            key={0}
            item
            sx={{
              width: "20%",
              height: "100%",
            }}
          >
            <Box sx={boxStyle}>
              <Link href={"#"}>Media Center</Link>
              <Link href={"#"}>Privacy</Link>
              <Link href={"#"}>Contact Us</Link>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        xs={12}
        container
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        className="py-5 text-secondary-grey"
      >
        <Typography paragraph={true}>©2023 Kalpesh Bhagat.</Typography>
        <Typography
          component="a"
          href="https://github.com/Kalpesh-11/netflix-dev"
          target="_blank"
        >
          Checkout Source Code here
        </Typography>
      </Grid>
    </Grid>
  );
}
