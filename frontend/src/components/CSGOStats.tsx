import React from "react";

interface CSGOStatsProps {
	stats: { name: string; value: number }[];
}

const CSGOStats: React.FC<CSGOStatsProps> = ({ stats }) => {
	return (
		<div>
			<h2>CS:GO Statistics</h2>
			<ul>
				{stats.map((stat, index) => (
					<li key={index}>
						{stat.name}: {stat.value}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CSGOStats;
