// Stackframe
import { AccountSettings } from "@stackframe/stack";
// Components
import { Card, CardContent } from "@/components/ui/card";

const SettingsPage = () => {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Settings</h1>
			<Card>
				<CardContent>
					<AccountSettings />
				</CardContent>
			</Card>
		</div>
	)
}

export default SettingsPage;