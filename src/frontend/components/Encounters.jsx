import React, { useEffect, useState } from "react";
import { getEncounters } from "../services/apiService";
import { classColors } from "../utils/classColors";

const Encounters = () => {
	const [groupedEncounters, setGroupedEncounters] = useState({});
	const [searchQuery, setSearchQuery] = useState(""); // State voor zoekbalk
	const [classes, setClasses] = useState([]); // Unieke classes
	const [selectedClass, setSelectedClass] = useState(""); // Geselecteerde class

	useEffect(() => {
		const fetchData = async () => {
			const data = await getEncounters();

			// Group encounters by encounterId
			const grouped = data.reduce((acc, curr) => {
				if (!acc[curr.encounterId]) {
					acc[curr.encounterId] = { data: [], totalDPS: 0 };
				}
				acc[curr.encounterId].data.push(curr);
				acc[curr.encounterId].totalDPS += curr.dps || 0; // Summing up total DPS
				return acc;
			}, {});

			// Collect unique classes
			const uniqueClasses = Array.from(
				new Set(data.map((encounter) => encounter.className).filter(Boolean))
			);

			setGroupedEncounters(grouped);
			setClasses(uniqueClasses); // Set unique class
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

	// Apply filtering based on searchQuery and selectedClass
	const filterEncounters = () => {
		if (!searchQuery.trim() && !selectedClass) return groupedEncounters;

		return Object.keys(groupedEncounters).reduce((acc, encounterId) => {
			const { data } = groupedEncounters[encounterId];
			const matchesQuery =
				!searchQuery.trim() ||
				data.some((encounter) =>
					encounter.name.toLowerCase().includes(searchQuery.toLowerCase())
				);

			const matchesClass =
				!selectedClass ||
				data.some((encounter) => encounter.className === selectedClass);

			if (matchesQuery && matchesClass) {
				acc[encounterId] = groupedEncounters[encounterId];
			}

			return acc;
		}, {});
	};

	const filteredEncounters = filterEncounters();

	//Reset filter function
	const resetFilters = () => {
		setSearchQuery(""); // Clear the search bar
		setSelectedClass(""); // Reset the dropdown menu
	};

	return (
		<div>
			<h1 className="page-title">
				Lost Ark <br /> DPS Encounter Data
			</h1>
			<div className="filters">
				<input
					type="text"
					placeholder="Search for a character name, boss, or ally..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="search-bar"
				/>
				<select
					value={selectedClass}
					onChange={(e) => setSelectedClass(e.target.value)}
					className="class-filter"
				>
					<option value="">All Classes</option>
					{classes.map((className, index) => (
						<option key={index} value={className}>
							{className}
						</option>
					))}
				</select>
				<button onClick={() => resetFilters()} className="reset-button">
					Reset Filters
				</button>
			</div>

			{/* Encounters */}
			<div className="encounter-container">
				{Object.keys(filteredEncounters).length === 0 ? (
					<p>Loading encounters...</p>
				) : (
					Object.keys(filteredEncounters).map((encounterId) => {
						const encountersData = filteredEncounters[encounterId];
						const { data: encounters, totalDPS } = encountersData; // Destructure data and totalDPS
						const bossName = getBossName(encounters);

						// Filter out boss from the table and sort by DPS
						const sortedEncounters = encounters
							.filter((encounter) => encounter.type !== "boss")
							.sort((a, b) => b.dps - a.dps);

						return (
							<div key={encounterId} className="encounter-group">
								<h2 className="Encounter">
									Encounter #{encounterId} - {bossName}
								</h2>
								<table className="encounter-table">
									<thead>
										<tr>
											<th></th>
											<th>Gear Score</th>
											<th>Name</th>
											<th>Class</th>
											<th>DPS</th>
											<th>DPS %</th>
										</tr>
									</thead>
									<tbody>
										{sortedEncounters.map((encounter, index) => {
											const damagePercentage =
												(encounter.dps /
													groupedEncounters[encounterId].totalDPS) *
												100;
											const classColor = getClassColor(encounter.className);

											return (
												<tr
													key={index}
													className="encounter-row"
													style={{
														backgroundColor: `${classColor}33`,
													}}
												>
													{/* DPS Bar */}
													<div
														className="dps-bar"
														style={{
															width: `${damagePercentage}%`, // Adjust width by DPS %
															backgroundColor: `${classColor}99`,
														}}
													/>
													{/* Row Content */}
													<td className="encounter-row-content">
														{formatGearScore(encounter.gearScore)}
													</td>
													<td className="encounter-row-content">
														{encounter.name}
													</td>
													<td className="encounter-row-content">
														{encounter.className || "N/A"}
													</td>
													<td className="encounter-row-content">
														{encounter.dps.toLocaleString()}
													</td>
													<td className="encounter-row-content">
														{damagePercentage.toFixed(2).replace(".", ",")}%
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Encounters;
