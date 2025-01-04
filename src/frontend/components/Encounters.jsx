import React, { useEffect, useState } from "react";
import { getEncounters } from "../services/apiService";
import { classColors } from "../utils/classColors";

const Encounters = () => {
	const [groupedEncounters, setGroupedEncounters] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const data = await getEncounters();
			console.log("Fetched data:", data);

			// Group encounters by encounterId
			const grouped = data.reduce((acc, curr) => {
				if (!acc[curr.encounterId]) {
					acc[curr.encounterId] = { data: [], totalDPS: 0 };
				}
				acc[curr.encounterId].data.push(curr);
				acc[curr.encounterId].totalDPS += curr.dps || 0; // Summing up total DPS
				return acc;
			}, {});

			setGroupedEncounters(grouped);
		};

		fetchData();
	}, []);

	// Helper function to get boss name
	const getBossName = (encounters) => {
		const boss = encounters.find((encounter) => encounter.type === "boss");
		return boss ? boss.name : "Unknown Boss";
	};

	// Helper function to format gear score
	const formatGearScore = (gearScore) => {
		if (!gearScore) return "N/A";
		return Number.isInteger(gearScore)
			? gearScore
			: gearScore.toFixed(2).replace(".", ",");
	};

	// Helper function to calculate DPS percentage
	const calculateDPSPercentage = (dps, totalDPS) => {
		return totalDPS
			? ((dps / totalDPS) * 100).toFixed(2).replace(".", ",") + "%"
			: "0%";
	};

	// Helper function to get class color
	const getClassColor = (className) => {
		return classColors[className]?.color || "#000"; // Default color black
	};

	return (
		<div>
			<h1>Encounter Data</h1>
			{Object.keys(groupedEncounters).length === 0 ? (
				<p>Loading encounters...</p>
			) : (
				Object.keys(groupedEncounters).map((encounterId) => {
					const encountersData = groupedEncounters[encounterId];
					const { data: encounters, totalDPS } = encountersData; // Destructure data and totalDPS
					const bossName = getBossName(encounters);

					// Filter out boss from the table and sort by DPS
					const filteredEncounters = encounters
						.filter((encounter) => encounter.type !== "boss")
						.sort((a, b) => b.dps - a.dps);

					return (
						<div key={encounterId} className="encounter-group">
							<h2>
								Encounter #{encounterId} - {bossName}
							</h2>
							<table className="encounter-table">
								<thead>
									<tr>
										<th>Gear Score</th>
										<th>Name</th>
										<th>Type</th>
										<th>Class Name</th>
										<th>DPS</th>
										<th>DPS %</th>
									</tr>
								</thead>
								<tbody>
									{filteredEncounters.map((encounter, index) => (
										<tr
											key={index}
											style={{
												color: getClassColor(encounter.className),
											}}
										>
											<td>{formatGearScore(encounter.gearScore)}</td>
											<td>{encounter.name}</td>
											<td>{encounter.type}</td>
											<td>{encounter.className || "N/A"}</td>
											<td>{encounter.dps.toLocaleString()}</td>
											<td>{calculateDPSPercentage(encounter.dps, totalDPS)}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					);
				})
			)}
		</div>
	);
};

export default Encounters;
