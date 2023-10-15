import { useAppSelector } from "@/hooks";
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
  const selectedProfileID = useAppSelector(
    (state) => state.profiles.selectedProfileID
  );
  if (!selectedProfileID) {
    return;
  }
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
              <Link key="Audio" href={"#"}>
                Audio Description{" "}
              </Link>
              <Link key="Investor" href={"#"}>
                Investor Relation
              </Link>
              <Link key="Legal" href={"#"}>
                Legal Notices
              </Link>
              <Link key="Service" href={"#"}>
                Service Code
              </Link>
            </Box>
          </Grid>
          <Grid
            key={1}
            item
            sx={{
              width: "20%",
              height: "100%",
            }}
          >
            <Box sx={boxStyle}>
              <Link key="Help" href={"#"}>
                Help Center{" "}
              </Link>
              <Link key="Jobs" href={"#"}>
                Jobs
              </Link>
              <Link key="Cookie" href={"#"}>
                Cookie Preference
              </Link>
            </Box>
          </Grid>
          <Grid
            key={2}
            item
            sx={{
              width: "20%",
              height: "100%",
            }}
          >
            <Box sx={boxStyle}>
              <Link key="Gift" href={"#"}>
                Gift Cards{" "}
              </Link>
              <Link key="Terms" href={"#"}>
                Terms of Use
              </Link>
              <Link key="Cooperate" href={"#"}>
                Cooperate Information
              </Link>
            </Box>
          </Grid>
          <Grid
            key={3}
            item
            sx={{
              width: "20%",
              height: "100%",
            }}
          >
            <Box sx={boxStyle}>
              <Link key="Media" href={"#"}>
                Media Center
              </Link>
              <Link key="Privacy" href={"#"}>
                Privacy
              </Link>
              <Link key="Contact" href={"#"}>
                Contact Us
              </Link>
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
        className="py-5 text-secondary-grey group"
      >
        <Typography
          component="a"
          href="https://www.kalpeshbhagat.com/"
          target="_blank"
          className="group-hover:text-tertiary-white-hover"
        >
          Take a Tour of My Portfolio
        </Typography>
        <Typography
          component="a"
          href="https://www.kalpeshbhagat.com/"
          target="_blank"
          className="group-hover:text-tertiary-white-hover"
        >
          ©2023 Kalpesh Bhagat.
        </Typography>
      </Grid>
    </Grid>
  );
}
