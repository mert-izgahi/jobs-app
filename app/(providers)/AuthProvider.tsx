import { currentUser } from "@clerk/nextjs";
import prisma from "@/prisma/db";
async function AuthProvider() {
    const user = await currentUser();
    if (user) {
        const existsUser = await prisma.user.findUnique({
            where: {
                email: user.emailAddresses[0].emailAddress,
            },
        });

        if (!existsUser) {
            await prisma.user.create({
                data: {
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.emailAddresses[0].emailAddress,
                    clerkId: user.id,
                    image: user.imageUrl,
                },
            });
        }
    }
    return null;
}

export default AuthProvider;
