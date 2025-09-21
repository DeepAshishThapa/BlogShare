import { Outlet } from "react-router";
import ResponsiveAppBar from "@/components/header/Navbar";
import { Box, Button } from "@mui/material";



function Mainlayout() {
    return (
        <>
            <ResponsiveAppBar/>
            <Box sx={{pt:10}}></Box>

            <Outlet/>
             
        </>
    )
}

export default Mainlayout
