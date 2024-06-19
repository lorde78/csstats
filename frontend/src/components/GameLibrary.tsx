import React from "react";
import { Link } from "react-router-dom";

const GameLibrary: React.FC = () => {
	return (
		<div>
			<h1>Game Library</h1>
			<nav>
				<ul>
					<li>
						<Link to="/csgo">CS:GO</Link>
					</li>
					<li>
						<Link to="/squad">Squad</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default GameLibrary;
