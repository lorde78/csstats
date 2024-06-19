import React from "react";

interface SquadStatsProps {
	stats: { name: string; value: number }[];
}

const SquadStats: React.FC<SquadStatsProps> = ({ stats }) => {
	return (
		<div>
			<h2>Squad Statistics</h2>
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

export default SquadStats;
