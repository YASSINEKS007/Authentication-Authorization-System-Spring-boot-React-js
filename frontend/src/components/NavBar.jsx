import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../store/state";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.access != null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "green", padding: "0 20px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography
          variant="h6"
          sx={{ color: "white", flexGrow: 1, textAlign: "center" }}
        >
          Authentication & Authorization JWT Google
        </Typography>
        {isAuthenticated && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
