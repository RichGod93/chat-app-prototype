import Sidebar from "@/components/Sidebar";
import { HStack } from "@chakra-ui/react";

const Home = () => {
    return (
        <>
            <HStack>
                <div className="w-60 border-r border-gray-700"><Sidebar /></div>

                <div className="flex-1"><p>Home</p></div>
            </HStack>

        </>
    );
};

export default Home;