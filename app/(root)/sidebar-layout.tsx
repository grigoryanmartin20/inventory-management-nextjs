"use client"

// Components
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/Sidebar"

export function SidebarLayout({ 
	children, 
	defaultOpen 
}: { 
	children: React.ReactNode
	defaultOpen?: boolean 
}) {
	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
				</header>
				<main className="flex flex-1 flex-col gap-4 px-4 py-3">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}