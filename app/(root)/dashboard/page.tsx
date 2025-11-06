// Types
import { Product } from "@prisma/client";
// Libs
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
// Components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardMetric from "@/components/dashboard/DashboardMetric";
import DashboardStockLevels from "@/components/dashboard/DashboardStockLevels";
import DashboardChart from "@/components/dashboard/DashboardChart";
import DashboardEfficiency from "@/components/dashboard/DashboardEfficiency";

const LOW_STOCK_THRESHOLD = 5;

const DashboardPage = async () => {
	const user = await getUser();
	const userId = user?.id;

	const [allProducts, lowStockProducts, recentProducts] = await Promise.all([
		prisma.product.findMany({
			where: { userId, },
			select: { price: true, quantity: true, createdAt: true }
		}),
		prisma.product.findMany({
			where: { userId, lowStockAt: { not: null }, quantity: { lte: LOW_STOCK_THRESHOLD } },
		}),
		prisma.product.findMany({
			where: { userId },
			orderBy: { createdAt: "desc" },
			take: 5
		})
	]);
	
	const totalValue = allProducts.reduce(
		(acc, product) => acc + Number(product.price) * Number(product.quantity), 0
	);

	const weeklyProductData = getWeeklyProductData(allProducts as Array<Product>);

	const inStockCount = allProducts.filter(product => product.quantity > LOW_STOCK_THRESHOLD)?.length;
	const lowStockCount = allProducts.filter(product => product.quantity <= LOW_STOCK_THRESHOLD && product.quantity > 0)?.length;
	const outOfStockCount = allProducts.filter(product => product.quantity === 0)?.length;

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Dashboard</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
				<Card>
					<CardHeader>
						<CardTitle>Key Metrics</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-3 gap-6">
							<DashboardMetric title="Total Products" value={allProducts.length.toString()} symbol="+" />
							<DashboardMetric title="Total Value" value={Number(totalValue).toFixed(0)} symbol="$" />
							<DashboardMetric title="Low Stock" value={lowStockProducts.length.toString()} symbol="+" />
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>New products per week</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-48">
							<DashboardChart data={weeklyProductData} />
						</div>
					</CardContent>
				</Card>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<Card>
					<CardHeader>
						<CardTitle>Stock Levels</CardTitle>
					</CardHeader>
					<CardContent>
						<DashboardStockLevels products={recentProducts} lowStockThreshold={LOW_STOCK_THRESHOLD} />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Efficiency</CardTitle>
					</CardHeader>
					<CardContent>
						<DashboardEfficiency 
							allProductsCount={allProducts.length} 
							inStockCount={inStockCount} 
							lowStockCount={lowStockCount} 
							outOfStockCount={outOfStockCount} 
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default DashboardPage;

function getWeeklyProductData(allProducts: Array<Product>) {
	const now = new Date();
	const weeklyProductData = [];
	
	for (let i = 11; i >= 0; i--) {
		const weekStart = new Date(now);

		weekStart.setDate(weekStart.getDate() - i * 7);
		weekStart.setHours(0, 0, 0, 0);

		const weekEnd = new Date(weekStart);
		weekEnd.setDate(weekEnd.getDate() + 6);
		weekEnd.setHours(23, 59, 59, 999);

		const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, '0')}/${String(weekStart.getDate()).padStart(2, '0')}`;

		const weekProducts = allProducts.filter(product => {
			const productDate = new Date(product?.createdAt);

			return productDate >= weekStart && productDate <= weekEnd;
		});

		weeklyProductData.push({
			week: weekLabel,
			products: weekProducts.length,
		});
	}

	return weeklyProductData;
}