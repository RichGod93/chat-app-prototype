import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import {
    Center,
    Input,
    Heading,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Link,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react';

import { FaGoogle } from "react-icons/fa";
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });


export default function Signup() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    return (
        <>
            <Head>
                <title>Chat App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="">
                <Center h={'100vh'}>
                    <form>
                        <Stack spacing={4} width={'lg'}>
                            <Heading size='3xl'>Sign up</Heading>
                            <Link href='/' className='text-xs'>{`Already have an account? Login`}</Link>
                            <FormControl id='displayName'>
                                <FormLabel>Username</FormLabel>
                                <Input type='text' placeholder='joseph1234' value={username} onChange={(e) => setUsername(e.target.value)} />
                            </FormControl>
                            <FormControl id='email'>
                                <FormLabel>Email address</FormLabel>
                                <Input type='email' placeholder='example@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id='password'>
                                <FormLabel>Password</FormLabel>
                                <Input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                            <Button colorScheme={'blue'} size='lg'>
                                Sign in
                            </Button>
                            <Button colorScheme={'red'} size='lg' leftIcon={<FaGoogle />}>
                                Sign in with Google
                            </Button>
                        </Stack>
                    </form>


                </Center>


            </main>
        </>
    );
}
