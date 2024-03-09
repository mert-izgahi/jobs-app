import prisma from "@/prisma/db";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
export default async function Home() {
    const client = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(client)}>
            Home Page
        </HydrationBoundary>
    );
}
