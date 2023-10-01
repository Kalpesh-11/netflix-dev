"use client";
import { Box, Button, Menu, Toolbar, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getGenre } from "@/utils";
import { GenreProps } from "@/types";
import { useSearchParams } from "next/navigation";
import { BiSolidDownArrow } from "react-icons/bi";
export default function SubHeader() {
  const pathName = usePathname();
  const query = pathName.split("/");
  const type = query[2];
  const [genreList, setGenreList] = useState<GenreProps[] | null>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const searchParams = useSearchParams();
  const isGenreSet = searchParams.get("bc");
  const [isExist, setIsExist] = useState<GenreProps | null>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    async function getData() {
      const genreList = await getGenre(type);
      setGenreList(genreList);
      for (const genreArray of genreList) {
        if (genreArray.id == isGenreSet) {
          setIsExist(genreArray);
          break;
        } else {
          setIsExist(null);
        }
      }
    }
    getData();
  }, [type, isGenreSet]);
  const heading = query[2] === "movie" ? "Movies" : "TV Shows";
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ px: "4%", display: { xs: "none", md: "flex" } }}
    >
      <Toolbar disableGutters>
        <Typography
          variant={isGenreSet ? "h6" : "h4"}
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: isGenreSet ? 100 : 500,
            color: isGenreSet ? "grey" : "white",
            textDecoration: "none",
            textTransform: "capitalize",
          }}
        >
          {isGenreSet ? <Link href={pathName}>{`${heading} >`}</Link> : heading}
        </Typography>
        {!isExist ? (
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleOpenUserMenu}
              sx={{
                py: "2px",
                px: "10px",
                color: "white",
                "& .MuiButton-endIcon svg": {
                  fontSize: "10px",
                  ml: "1rem",
                },
                borderColor: "white",
              }}
              variant="outlined"
              endIcon={<BiSolidDownArrow />}
              size="small"
            >
              Genres
            </Button>
            <Menu
              sx={{
                mt: "35px",
                "& .MuiMenu-paper": {
                  backgroundColor: "rgba(0,0,0,.9)",
                  border: "1px solid hsla(0,0%,100%,.15)",
                },
                "& .MuiList-root": { display: "flex" },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <div className="flex gap-3 p-6 text-white">
                {genreList &&
                  Array.from(
                    { length: Math.ceil(genreList.length / 7) },
                    (value, index) => {
                      const startIndex = index * 7;
                      const endIndex = startIndex + 7;
                      const group = genreList.slice(startIndex, endIndex);

                      return (
                        <div key={`genreGroup-${index}`}>
                          {group.map((genre) => (
                            <Link
                              key={`genre-${genre.id}`}
                              href={{
                                pathname: pathName,
                                query: { bc: genre.id },
                              }}
                              className="block"
                              onClick={handleCloseUserMenu}
                            >
                              {genre.name}
                            </Link>
                          ))}
                        </div>
                      );
                    }
                  )}
              </div>
            </Menu>
          </Box>
        ) : (
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },

              fontWeight: 700,
              color: "#ff",
              textDecoration: "none",
              textTransform: "capitalize",
            }}
          >
            {isExist.name}
          </Typography>
        )}
      </Toolbar>
    </Container>
  );
}
