// Types
import { Prisma } from "@prisma/client";
// Libs
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/actions/products";
// Components
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InventoryDeleteButton from "@/components/inventory/InventoryDeleteButton";
import InventoryPagination from "@/components/inventory/InventoryPagination";

const ITEMS_PER_PAGE = 10;

const InventoryPage = async ({ searchParams }: { searchParams: Promise<{ search?: string; page?: string }> }) => {
	const user = await getUser();
	const userId = user?.id;
	const params = await searchParams;
	const search = params?.search?.trim() || '';
	const currentPage = Math.max(1, parseInt(params?.page || '1', 10));

	const whereClause: Prisma.ProductWhereInput = { userId, name: { contains: search, mode: 'insensitive' } };

	const [products, totalProducts] = await Promise.all([
		prisma.product.findMany({
			where: whereClause,
			orderBy: { createdAt: "desc" },
			skip: (currentPage - 1) * ITEMS_PER_PAGE,
			take: ITEMS_PER_PAGE,
		}),
		prisma.product.count({ where: whereClause }),
	]);

	const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Inventory</h1>
			<Card>
				<CardContent>
					<form action="/inventory" className="flex gap-2">
						<Input type="text" name="search" placeholder="Search products" className="w-full" defaultValue={search} />
						<Button type="submit">Search</Button>
					</form>
				</CardContent>
			</Card>
			<Card>
				<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Name</TableHead>
							<TableHead>SKU</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead>Low Stock At</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products?.length ? (products.map((product) => (
							<TableRow key={product.id}>
								<TableCell className="min-w-[200px]">{product.name}</TableCell>
								<TableCell className="w-[100px]">{product.sku || "-"}</TableCell>
								<TableCell className="w-[150px]">{Number(product.price).toFixed(2)}</TableCell>
								<TableCell className="w-[100px]">{product.quantity}</TableCell>
								<TableCell className="w-[100px]">{product.lowStockAt || "-"}</TableCell>
								<TableCell className="w-[100px] text-right">
									<form action={async (formData: FormData) => {
										'use server';

										await deleteProduct(formData);
									}}>
										<input type="hidden" name="id" value={product.id} />
										<InventoryDeleteButton />
									</form>
								</TableCell>
							</TableRow>
						))) : (
							<TableRow>
								<TableCell colSpan={6} className="text-center">No products found</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				</CardContent>
			</Card>
			{totalPages > 1 && (
				<InventoryPagination 
					currentPage={currentPage} 
					totalPages={totalPages} 
					search={search} 
				/>
			)}
		</div>
	)
}

export default InventoryPage