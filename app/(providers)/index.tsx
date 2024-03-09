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
    NavLink,
    Stack,
    Text,
} from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import {
    IoHome,
    IoDesktop,
    IoSettings,
    IoAlbums,
    IoBarChart,
    IoBookmark,
    IoAdd,
} from "react-icons/io5";
function Provider({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure(false);
    const { currentUser, isLoadingCurrentUser } = useCurrentUser();
    const [hasMounted, setHasMounted] = useState(false);
    const pathname = usePathname();
    const sidebarLinks = [
        {
            href: "/",
            label: "Home",
            icon: IoHome,
        },

        {
            href: "/dashboard",
            label: "Dashboard",
            icon: IoDesktop,
        },
        {
            href: "/dashboard/jobs",
            label: "Jobs",
            icon: IoAlbums,
        },
        {
            href: "/dashboard/jobs/new",
            label: "New Job",
            icon: IoAdd,
        },
        {
            href: "/dashboard/settings",
            label: "Settings",
            icon: IoSettings,
        },

        {
            href: "/dashboard/analytics",
            label: "Analytics",
            icon: IoBarChart,
        },
        {
            href: "/dashboard/bookmarks",
            label: "Bookmarks",
            icon: IoBookmark,
        },
    ];
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
                <AppShellHeader px={"xl"}>
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
                            justify={isDashboard ? "flex-end" : "space-between"}
                            gap={"md"}
                            align="center"
                            flex={1}
                        >
                            {!isDashboard && (
                                <Flex align="center" gap="md">
                                    <Text component={Link} href="/" size="sm">
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
                </AppShellHeader>
                <AppShellNavbar p={"md"} hidden={!isDashboard}>
                    <Stack gap="md">
                        {sidebarLinks.map((link) => (
                            <NavLink
                                key={link.href}
                                component={Link}
                                href={link.href}
                                leftSection={
                                    <link.icon
                                        size={18}
                                        style={{ marginTop: 3 }}
                                    />
                                }
                                label={link.label}
                            />
                        ))}
                    </Stack>
                </AppShellNavbar>
                <AppShellMain>{children}</AppShellMain>
            </AppShell>
        </MantineProvider>
    );
}

export default Provider;
