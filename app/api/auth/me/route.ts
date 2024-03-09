import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
export const GET = async (req: NextRequest) => {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    const id = user.id;

    if (!id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const _user = await prisma.user.findUnique({
        where: {
            clerkId: id,
        },
    });

    if (!_user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (_user) {
        return NextResponse.json({ result: _user }, { status: 200 });
    }
};
