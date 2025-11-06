// Components
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
	// Stack uses React Suspense, which will render this page while user data is being fetched.
	// See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col items-center gap-3">
				<Spinner className="size-8" />
				<p className="text-sm text-muted-foreground">Loading...</p>
			</div>
		</div>
	);
}