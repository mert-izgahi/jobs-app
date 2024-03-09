import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpPage() {
    return (
        <div>
            <SignUp afterSignUpUrl={"/"} />
        </div>
    );
}

export default SignUpPage;
