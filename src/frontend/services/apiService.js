const BASE_URL = "http://localhost:3000/api";

export const getEncounters = async () => {
	try {
		const response = await fetch(`${BASE_URL}/encounters`);
		if (!response.ok) {
			throw new Error("Failed to fetch encounters data");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching encounters:", error);
		return [];
	}
};
