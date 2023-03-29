import { HStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <HStack>
            <div><Sidebar /></div>
            <div className="flex-1">{children}</div>
        </HStack>
    );
}