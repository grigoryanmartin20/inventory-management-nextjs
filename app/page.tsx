import Link from "next/link";
// Components
import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<div className="flex flex-col gap-4 min-h-screen items-center justify-center font-sans">
			<h1 className="text-4xl font-bold">Inventory Management</h1>
			<p className="max-w-2xl text-center">
				Streamline your inventory tracking with our powerful, easy-to-use management system. 
				Track products, manage stock levels, and gain valuable insights.
			</p>
			<Button asChild variant="outline" size="lg">
				<Link href="/sign-in">Sign In</Link>
			</Button>
		</div>
	);
}
