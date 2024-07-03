import React from "react";
import "./gamecard.scss";

interface GameCardProps {
	nom: string;
	image: string;
	heures: number;
}

const GameCard: React.FC<GameCardProps> = ({ nom, image, heures }) => {
	return (
		<div className="game-card" style={{ backgroundImage: `url(${image})` }}>
			<div className="game-card-overlay">
				<div className="game-card-hours">{heures} heures</div>
			</div>
			<div className="game-card-title">{nom}</div>
		</div>
	);
};

export default GameCard;
