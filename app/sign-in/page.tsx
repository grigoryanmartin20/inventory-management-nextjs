import Link from "next/link";
// Stackframe
import { SignIn } from "@stackframe/stack";

const SignInPage = () => {
	return (
		<div className="flex flex-col gap-4 min-h-screen items-center justify-center">
			<div className="w-full max-w-md">
				<SignIn />
			</div>
			<div>
				<Link href="/">Back to Home</Link>
			</div>
		</div>
	)
}

export default SignInPage;