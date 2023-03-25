import { Box, Flex, HStack, VStack, Text, Spacer, Button } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineWechat } from 'react-icons/ai';
import { useAuth } from "@/context/AuthContext";

function Sidebar() {
    const { logout } = useAuth();

    const handleLogout = () => {
        try {
            logout();
        } catch (error: any) {
            console.log('could not log user out', error);
        }
    };

    return (
        <Flex h="100vh" direction="column">
            <Box flex="1">
                {/* Logo or title */}
                <HStack p="4" fontWeight="bold">
                    <AiOutlineWechat size={30} />
                    <Text fontSize={20}>Chat App</Text>
                </HStack>
                {/* Navigation links */}
                <VStack spacing="4" align="stretch">
                    <Box p="4" cursor="pointer" _hover={{ bg: "gray.200", color: "gray.900" }}>
                        <Flex align="center">
                            <FaUserCircle size={30} />
                            <Text fontWeight="bold" ml={5}>username</Text>

                        </Flex>
                    </Box>
                </VStack>
            </Box>

            <Spacer />

            <Box alignSelf="end" mr={3} mb={3}>
                <Button onClick={handleLogout} colorScheme="red">Logout</Button>
            </Box>
        </Flex>
    );
}

export default Sidebar;
