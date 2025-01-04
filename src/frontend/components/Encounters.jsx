import React, { useEffect, useState } from "react";
import { getEncounters } from "../services/apiService";
import { classColors } from "../utils/classColors";

const Encounters = () => {
	const [groupedEncounters, setGroupedEncounters] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const data = await getEncounters();
			console.log("Fetched data:", data);

			const grouped = data.reduce((acc, curr) => {
				if (!acc[curr.encounterId]) {
					acc[curr.encounterId] = [];
				}
				acc[curr.encounterId].push(curr);
				return acc;
			}, {});
			setGroupedEncounters(grouped);
		};

		fetchData();
	}, []);

	const getBossName = (encounters) => {
		const boss = encounters.find((encounter) => encounter.type === "boss");
		return boss ? boss.name : "Unknown Boss";
	};

	const getClassColor = (className) => {
		return classColors[className]?.color || "#000";
	};

	return (
		<div>
			<h1>Encounter Data</h1>
			{Object.keys(groupedEncounters).length === 0 ? (
				<p>Loading encounters...</p>
			) : (
				Object.keys(groupedEncounters).map((encounterId) => {
					const encounters = groupedEncounters[encounterId];
					const bossName = getBossName(encounters);

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
										<th>Name</th>
										<th>Type</th>
										<th>Class Name</th>
										<th>Gear Score</th>
										<th>DPS</th>
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
											<td>{encounter.name}</td>
											<td>{encounter.type}</td>
											<td>{encounter.className || "N/A"}</td>
											<td>{encounter.gearScore || 0}</td>
											<td>{encounter.dps.toLocaleString()}</td>
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
