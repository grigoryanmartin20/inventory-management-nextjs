import { TrendingUp } from "lucide-react";

const DashboardMetric = ({ title, value, symbol }: { title: string, value: string, symbol: string }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<div className="text-3xl font-bold">{value}</div>
			<h3 className="text-sm">{title}</h3>
			<div className="flex items-center justify-center mt-1">
				<span className="text-xs text-gray-600">{symbol}{value}</span>
				<TrendingUp className="w-3 h-3 text-green-600 ml-1" />
			</div>
		</div>
	)
}

export default DashboardMetric;