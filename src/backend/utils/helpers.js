const { encounterMap } = require("./bossMap");

const isBoss = (name) => {
	for (const raid in encounterMap) {
		for (const stage in encounterMap[raid]) {
			if (encounterMap[raid][stage].includes(name)) {
				return true;
			}
		}
	}
	return false;
};

module.exports = { isBoss };
