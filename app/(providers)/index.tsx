"use client";

import theme from "@/theme";
import { SignedIn, UserButton } from "@clerk/nextjs";
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    AppShellNavbar,
    Burger,
    Button,
    Container,
    Flex,
    Group,
    MantineProvider,
    Text,
} from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";

function Provider({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure(false);
    const { currentUser, isLoadingCurrentUser } = useCurrentUser();
    const [hasMounted, setHasMounted] = useState(false);
    const pathname = usePathname();

    const isDashboard = useMemo(() => {
        return pathname.includes("/dashboard");
    }, [pathname]);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted || isLoadingCurrentUser) {
        <>Loading ...</>;
    }

    return (
        <MantineProvider theme={theme}>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: "sm",
                    collapsed: { desktop: !isDashboard, mobile: !opened },
                }}
            >
                <AppShellHeader>
                    <Container size="xl">
                        <Flex h={60} align="center" gap="md">
                            <Group>
                                {isDashboard && (
                                    <Burger
                                        opened={opened}
                                        onClick={toggle}
                                        hiddenFrom="md"
                                    />
                                )}
                                <Text
                                    component={Link}
                                    href="/"
                                    size="xl"
                                    fw={"bolder"}
                                >
                                    Hireo
                                </Text>
                            </Group>

                            <Flex
                                justify={
                                    isDashboard ? "flex-end" : "space-between"
                                }
                                gap={"md"}
                                align="center"
                                flex={1}
                            >
                                {!isDashboard && (
                                    <Flex align="center" gap="md">
                                        <Text
                                            component={Link}
                                            href="/"
                                            size="sm"
                                        >
                                            Home
                                        </Text>
                                        <Text
                                            component={Link}
                                            href="/jobs"
                                            size="sm"
                                        >
                                            Find Work
                                        </Text>
                                        <Text
                                            component={Link}
                                            href="/dashboard"
                                            size="sm"
                                        >
                                            Dashboard
                                        </Text>
                                    </Flex>
                                )}
                                {currentUser ? (
                                    <SignedIn>
                                        <UserButton />
                                    </SignedIn>
                                ) : (
                                    <Button component={Link} href="/sign-in">
                                        Sign in
                                    </Button>
                                )}
                            </Flex>
                        </Flex>
                    </Container>
                </AppShellHeader>
                <AppShellNavbar>Navbar</AppShellNavbar>
                <AppShellMain>{children}</AppShellMain>
            </AppShell>
        </MantineProvider>
    );
}

export default Provider;
