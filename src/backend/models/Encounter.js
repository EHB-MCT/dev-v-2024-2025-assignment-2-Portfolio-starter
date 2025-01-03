const mongoose = require("mongoose");

const EncounterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    encounterId: { type: Number, required: true },
    className: { type: String },
    gearScore: { type: Number },
    dps: { type: Number },
  },
  { versionKey: false },
); // Disable __v

module.exports = mongoose.model("Encounter", EncounterSchema);
