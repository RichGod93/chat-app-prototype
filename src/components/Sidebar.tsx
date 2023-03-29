import {
    Box,
    Flex,
    HStack,
    VStack,
    Text,
    Button,
    useToast,
    useColorMode,
} from "@chakra-ui/react";
import { FaCircle, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { AiOutlineWechat } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";

function Sidebar() {
    const { logout } = useAuth();
    const toast = useToast();
    const isOnline = collection(db, "isOnline");

    const { colorMode, toggleColorMode } = useColorMode();

    const handleLogout = () => {
        try {
            logout();

            if (auth.currentUser != null) {
                setDoc(doc(isOnline, auth?.currentUser.uid), {
                    isOnline: false,
                });
                console.log("user signed out");
                toast({
                    title: "Goodbye",
                    description: "See you next time",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error: any) {
            console.log("could not sign user out", error);
            toast({
                title: "Error",
                description: "Could not sign you out",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <VStack
            height={'100vh'}
            direction="column"
            borderRight={"2px"}
            borderColor={"gray.600"}
            overflowY="auto"
        >
            <Box flex="1">
                {/* Logo or title */}
                <HStack
                    p="4"
                    fontWeight="bold"
                    width={"100%"}
                    display="flex"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    borderBottom={"1px"}
                    borderColor={"gray.600"}
                >
                    <AiOutlineWechat size={30} />
                    <Text fontSize={20}>Chat App</Text>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <FaMoon /> : <FaSun />}
                    </Button>
                </HStack>
                <HStack
                    p="4"
                    fontWeight="bold"
                    width={"100%"}
                    display="flex"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    borderBottom={"1px"}
                    borderColor={"gray.600"}
                >
                    <HStack>
                        {auth.currentUser?.photoURL ? (
                            <Image
                                src={auth.currentUser?.photoURL}
                                alt="User PFP"
                                width={40}
                                height={40}
                                className="rounded-full"
                                style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <FaUserCircle size={30} />
                        )}
                        <Text fontSize={15}>{auth.currentUser?.displayName}</Text>
                    </HStack>

                    {isOnline ? (
                        <FaCircle color="green" size={10} />
                    ) : (
                        <FaCircle color="red" size={10} />
                    )}
                </HStack>
                {/* Navigation links */}
                <Flex direction={'column'} overflowY={'auto'}>
                    <HStack
                        p="4"
                        cursor="pointer"
                        _hover={{ bg: "gray.200", color: "gray.900" }}
                        width={'100%'}
                    >
                        <Flex align="center">
                            <FaUserCircle size={30} />
                            <Text fontWeight="bold" ml={5}>
                                username
                            </Text>
                        </Flex>
                    </HStack>
                </Flex>
            </Box>

            <HStack alignSelf={'end'} pr={3} pb={5}>
                <Button px={"16"} onClick={handleLogout} colorScheme="red">
                    Logout
                </Button>
            </HStack>
        </VStack>
    );
}

export default Sidebar;
