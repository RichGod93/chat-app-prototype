import Layout from "@/components/Layout";
import { Box } from "@chakra-ui/react";
import Chats from "./chats/[id]";

const Home = () => {
    return (
        <>
            <Box>
                <Chats />
            </Box>
        </>
    );
};

export default Home;
