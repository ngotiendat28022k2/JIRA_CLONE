import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "../component/naBar/aside";
import Drawer from "../component/naBar/drawer";
import { Box } from "@mui/material";


type Props = {};

const Layout = (props: Props) => {
    return (
        <div className="flex justify-between items-start h-full">
        
        <div className="max-w-[20%] w-full flex justify-between items-start h-[100%]">
            <Box className="bg-[#0a4db0] w-full max-w-[80px] top-0 left-0 z-10 pt-[20px] h-full ">
                <Drawer />
            </Box>
            <Box className="bg-[#f4f5f7] w-full pt-[20px] pl-[30px] h-full">
                <Aside/>
            </Box>
        </div>

        <div className="w-full bg-[#fff] pl-[50px] pt-[20px]">
                <main className="">
                    <Outlet />
                </main>
        </div>

       </div>
    );
};

export default Layout;
