import Link from "next/link";
// Libs
import { addProduct } from "@/lib/actions/products";
// Components
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddProductsPage = async () => {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Add Product</h1>
			<Card className="max-w-lg">
				<CardContent>
					<form action={addProduct}>
						{/* Name */}
						<div>
							<Label htmlFor="name" className="mb-2 block">
								Name <span className="text-red-500">*</span>
							</Label>
							<Input type="text" name="name" id="name" placeholder="Enter product name" required />
						</div>
						{/* Price and Quantity */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
							<div>
								<Label htmlFor="price" className="mb-2 block">
									Price <span className="text-red-500">*</span>
								</Label>
								<Input type="number" name="price" id="price" step="0.01" min="0" placeholder="0.00" required />
							</div>
							<div>
								<Label htmlFor="quantity" className="mb-2 block">
									Quantity <span className="text-red-500">*</span>
								</Label>
								<Input type="number" name="quantity" id="quantity" min="0" placeholder="0" required />
							</div>
						</div>
						{/* SKU */}
						<div className="mt-6">
							<Label htmlFor="sku" className="mb-2 block">SKU</Label>
							<Input type="text" name="sku" id="sku" placeholder="Enter SKU (optional)" />
						</div>
						{/* Low Stock At */}
						<div className="mt-6">
							<Label htmlFor="lowStockAt" className="mb-2 block">Low Stock</Label>
							<Input type="number" name="lowStockAt" id="lowStockAt" min="0" placeholder="Enter low stock threshold (optional)" />
						</div>
						{/* Submit Button */}
						<div className="flex justify-end items-center gap-4 mt-10">
							<Link href="/inventory" className="text-sm text-gray-300 hover:text-gray-500">Cancel</Link>
							<Button type="submit" className="min-w-[100px]">Add Product</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default AddProductsPage;