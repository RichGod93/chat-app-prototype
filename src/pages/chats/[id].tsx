import React, { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from '@/config/firebase';

export function Chat() {
    return (
        <Layout>
            <VStack className="flex flex-col h-screen">
                <Box className="flex-1"></Box>
                <HStack width={"90%"} pb={5}>
                    <Input
                        borderColor={"gray.700"}
                        placeholder="Enter message"
                        variant={"filled"}
                        size={"lg"}
                    />
                    <Button colorScheme={"telegram"} size={"md"}>
                        Send
                    </Button>
                </HStack>
            </VStack>
        </Layout>
    );
}

interface ChatProps {
    key: string;
    id: string;
    sender: string;
    message: string;
    timestamp: Function;
    received?: boolean;
}

export default function Chats(chatProps: ChatProps) {
    const [chats, setChats] = useState([]);
    // useEffect(() => {
    //     onSnapshot(
    //         query(collection(db, 'chats'), orderBy('timestamp', 'asc')),
    //         (snapshot) => {
    //             setChats(snapshot.docs);
    //         }
    //     );
    // });

    return (
        <div>
            <Chat
                key={chatProps.key}
                id={chatProps.id}
                sender={chatProps.sender}
                message={chatProps.message}
                timestamp={chatProps.timestamp}
                recieved={chatProps?.received}
            />
        </div>
    );
}
