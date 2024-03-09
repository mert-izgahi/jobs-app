import { SignIn } from "@clerk/nextjs";
import React from "react";

function SignInPage() {
    return (
        <div>
            <SignIn afterSignInUrl={"/"} />
        </div>
    );
}

export default SignInPage;
