'use client';

import { useFormStatus } from 'react-dom';
import { TrashIcon } from 'lucide-react';
// Components
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

const InventoryDeleteButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" variant="destructive" disabled={pending} className="min-w-[100px]">
			{pending ? <Spinner className="size-4" /> : <TrashIcon className="size-4" />}
			Delete
		</Button>
	);
}

export default InventoryDeleteButton;