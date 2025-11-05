import { redirect } from "next/navigation";
// Stackframe
import { stackServerApp } from "@/stack/server"

export const getUser = async () => {
	const user = await stackServerApp.getUser();

	if (!user) redirect("/sign-in");

	return user;
}