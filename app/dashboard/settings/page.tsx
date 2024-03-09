import ProfileForm from "@/components/forms/ProfileForm";
import { Container } from "@mantine/core";
import React from "react";
import {
    dehydrate,
    QueryClient,
    HydrationBoundary,
} from "@tanstack/react-query";
function SettingsPage() {
    const client = new QueryClient();

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <Container size="xl" py={"md"}>
                <ProfileForm />
            </Container>
        </HydrationBoundary>
    );
}

export default SettingsPage;
