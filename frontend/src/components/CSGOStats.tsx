// src/components/CSGOStatsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CSGOStats: React.FC = () => {
  const { steamId } = useParams<{ steamId: string }>();
  const [csgoStats, setCsgoStats] = useState<{ name: string; value: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/steam/${steamId}/csgo`);
        setCsgoStats(response.data.stats);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching CS:GO stats", error);
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [steamId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!csgoStats.length) {
    return <div>No stats available</div>;
  }

  return (
    <div className="stats-container">
      <h2>CS:GO Stats</h2>
      <ul>
        {csgoStats.map((stat, index) => (
          <li key={index}>
            {stat.name}: {stat.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CSGOStats;
