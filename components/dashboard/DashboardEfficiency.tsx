"use client";

// Components
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const DashboardEfficiency = (
	{ allProductsCount, inStockCount, lowStockCount, outOfStockCount }:
		{ allProductsCount: number, inStockCount: number, lowStockCount: number, outOfStockCount: number }
) => {
	const inStockPercentage = allProductsCount > 0 ? Math.round((inStockCount / allProductsCount) * 100) : 0;
	const lowStockPercentage = allProductsCount > 0 ? Math.round((lowStockCount / allProductsCount) * 100) : 0;
	const outOfStockPercentage = allProductsCount > 0 ? Math.round((outOfStockCount / allProductsCount) * 100) : 0;

	const chartData = [{ value: inStockPercentage, fill: "var(--chart-1)" }];

	const chartConfig = {
		value: {
			label: "In Stock",
			color: "var(--chart-1)",
		},
	} satisfies ChartConfig;

	return (
		<>
			<ChartContainer
				config={chartConfig}
				className="mx-auto aspect-square max-h-[250px]"
			>
				<RadialBarChart
					data={chartData}
					startAngle={0}
					endAngle={250}
					innerRadius={80}
					outerRadius={110}
				>
					<PolarGrid
						gridType="circle"
						radialLines={false}
						stroke="none"
						className="first:fill-muted last:fill-background"
						polarRadius={[86, 74]}
					/>
					<RadialBar dataKey="value" background cornerRadius={10} />
					<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
						<Label
							content={({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-foreground text-4xl font-bold"
											>
												{chartData[0].value.toLocaleString()}%
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 24}
												className="fill-muted-foreground"
											>
												In Stock
											</tspan>
										</text>
									)
								}
							}}
						/>
					</PolarRadiusAxis>
				</RadialBarChart>
			</ChartContainer>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 mb-2">
					<span className="w-3 h-3 rounded-full bg-green-600"></span>
					<span>In Stock ({inStockPercentage}%)</span>
				</div>
				<div className="flex items-center gap-2 mb-2">
					<span className="w-3 h-3 rounded-full bg-yellow-600"></span>
					<span>Low Stock ({lowStockPercentage}%)</span>
				</div>
				<div className="flex items-center gap-2 mb-2">
					<span className="w-3 h-3 rounded-full bg-gray-600"></span>
					<span>Out of Stock ({outOfStockPercentage}%)</span>
				</div>
			</div>
		</>
	)
}

export default DashboardEfficiency;