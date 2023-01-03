import Box from "@mui/material/Box"
import Head from "next/head"
import { NavBar } from "../ui/NavBar";
import { Sidebar } from "../ui/Sidebar";

interface Props {
    title?: string;
    children: JSX.Element | JSX.Element[]
}

export const Layout = ({title = 'OpenJira - App', children}: Props) => {
  return (
    <Box sx={{ flexGrow: 1}}>
        <Head>
            <title>{title}</title>
        </Head>

       <NavBar />

        <Sidebar />

        <Box sx={{padding: '10px 20px'}}>
            {children}
        </Box>
        
    </Box>
  )
}
