import { Box, Flex, HStack, VStack, Text, Spacer, Button, useToast, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { AiOutlineWechat } from 'react-icons/ai';
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

function Sidebar() {
    const { logout } = useAuth();
    const toast = useToast();
    const isOnline = collection(db, 'isOnline');

    const { colorMode, toggleColorMode } = useColorMode();

    const handleLogout = () => {
        try {
            logout();

            if (auth.currentUser != null) {
                setDoc(doc(isOnline, auth?.currentUser.uid), {
                    isOnline: false,
                });
                console.log('user signed out');
                toast({
                    title: 'Goodbye',
                    description: 'See you next time',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error: any) {
            console.log('could not sign user out', error);
            toast({
                title: 'Error',
                description: 'Could not sign you out',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex h="100vh" direction="column">
            <Box flex="1">
                {/* Logo or title */}
                <HStack
                    p="4"
                    fontWeight="bold"
                    width={'100%'}
                    display='flex'
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <AiOutlineWechat size={30} />
                    <Text fontSize={20}>Chat App</Text>
                    <Button onClick={toggleColorMode}>{colorMode === 'light' ? (<FaMoon />) : (<FaSun />)}</Button>
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
