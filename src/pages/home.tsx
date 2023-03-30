import Layout from "@/components/Layout";
import { Box } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import Chat from "./chats/[id]";

const Home = () => {
    return (
        <>
            <Box>
                <Chat key={""} id={""} sender={""} message={""} timestamp={Timestamp} />
            </Box>
        </>
    );
};

export default Home;
