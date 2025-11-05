import { cookies } from "next/headers"
// Components
import { SidebarLayout } from "./sidebar-layout"

export default async function Layout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

	return (
		<SidebarLayout defaultOpen={defaultOpen}>
			{children}
		</SidebarLayout>
	)
}