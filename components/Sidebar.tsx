'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
// Stackframe
import { UserButton } from "@stackframe/stack";
// Components
import {
	Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
	SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar"
import { BarChart3, Package, Plus, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AppSidebar = () => {
	const pathname = usePathname();
	const { isMobile, setOpenMobile } = useSidebar();
	const menuItems = [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: BarChart3
		},
		{
			title: 'Inventory',
			url: '/inventory',
			icon: Package
		},
		{
			title: 'Add Products',
			url: '/add-products',
			icon: Plus
		},
		{
			title: 'Settings',
			url: '/settings',
			icon: Settings
		},
	]

	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex items-center justify-between gap-2 px-2 py-2">
					<div className="flex items-center gap-2">
						<BarChart3 className="size-6" />
						<h2 className="font-semibold">Inventory Management</h2>
					</div>
					{isMobile && (
						<Button
							variant="ghost"
							size="icon"
							className="size-7"
							onClick={() => setOpenMobile(false)}
						>
							<X className="size-4" />
							<span className="sr-only">Close sidebar</span>
						</Button>
					)}
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={pathname === item.url}
										tooltip={item.title}
									>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<UserButton showUserInfo  />
			</SidebarFooter>
		</Sidebar>
	)
}

export default AppSidebar;