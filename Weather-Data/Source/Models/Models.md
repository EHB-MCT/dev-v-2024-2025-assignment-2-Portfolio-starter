## Models

Models are used to parse data into from the database or API using the services. View them as objects or templates for the data to transform into.

Use upper CamelCase to name files. Name them according to the type of "object" or use they will have.

Use tags "Codable" and "Identifiable" to make the models discoverable (ex: "struct Pokemon: Codable, Identifiable") and import "Foundation".

In case multiple models are being made for a single purpose, put them together in a subfolder named according to the models or the use case of them. Use upper CamelCase for the naming of the folder as well.