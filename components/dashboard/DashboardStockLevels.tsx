// Types
import { Product } from "@prisma/client";
// Components
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";

const DashboardStockLevels = (
	{ products, lowStockThreshold }: 
	{ products: Array<Product>, lowStockThreshold: number }
) => {
	const stockLevelsBgColors = ['bg-red-600', 'bg-yellow-600', 'bg-green-600'];
	const stockLevelsTextColors = ['text-red-600', 'text-yellow-600', 'text-green-600'];

	const getProductStockLevel = (product: Product): number => {
		if (product?.quantity === 0) return 0;

		if (product.quantity <= (product.lowStockAt || lowStockThreshold)) return 1;

		return 2;
	};

	return (
		<ItemGroup className="space-y-2">
			{products.map(product => {
				const stockLevel = getProductStockLevel(product);

				return (
					<Item key={product.id} variant="outline">
						<ItemContent>
							<ItemTitle className="w-full flex justify-between">
								<div className="flex items-center gap-2">
									<span className={`w-3 h-3 rounded-full ${stockLevelsBgColors[stockLevel]}`}></span>
									{product.name}
								</div>
								<span className={`text-xs ${stockLevelsTextColors[stockLevel]}`}>
									{product.quantity} units
								</span>
							</ItemTitle>
						</ItemContent>
					</Item>
				);
			})}
		</ItemGroup>
	)
}

export default DashboardStockLevels;