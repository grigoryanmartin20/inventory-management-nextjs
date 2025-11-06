"use client";

// Components
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface DashboardChartProps {
	week: string;
	products: number;
}

const DashboardChart = ({ data }: { data: Array<DashboardChartProps> }) => {
	const chartConfig = {} satisfies ChartConfig;
	  
	return (
		<ChartContainer config={chartConfig} className="h-full w-full">
			<AreaChart accessibilityLayer data={data}>
				<defs>
					<linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.8} />
						<stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.1} />
					</linearGradient>
				</defs>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="week"
					axisLine={false}
					tickMargin={8}
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					tickMargin={8}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
				/>
				<Area
					dataKey="products"
					type="monotone"
					fill="url(#colorProducts)"
					stroke="var(--color-chart-1)"
					strokeWidth={2}
				/>
			</AreaChart>
		</ChartContainer>
	)
}

export default DashboardChart;