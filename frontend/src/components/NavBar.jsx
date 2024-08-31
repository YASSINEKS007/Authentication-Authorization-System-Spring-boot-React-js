import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../store/state";
import { useNavigate } from "react-router-dom";

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
    <nav
      className="flex justify-between items-center bg-green mx-auto rounded-full mt-1"
      style={{ width: "80%", height: "50px" }}
    >
      <Box sx={{ color: "green" }}>hello</Box>

      <span className="ml-auto">
        {isAuthenticated && (
          <Button
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </span>
    </nav>
  );
};

export default NavBar;
