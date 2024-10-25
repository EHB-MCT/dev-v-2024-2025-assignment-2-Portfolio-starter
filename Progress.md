# Progess

## October 25 2024

### Data gathering

Het opnemen van data in Swift is moeilijk. Momenteel heb ik enkel implementaties gevonden waar een button drukken als informatie gebruikt kan worden. Dit heb ik omgevormd naar een button drukken stuurt de info van de button en de timestamp door naar firestore. Hetzelfde geldt voor bij het fetchen van de weer voor een bepaald stad. De details van de weer, de stad en de timestamp worden doorgegeven. Ik zou graag ook manieren vinden om mogelijk de eyetracking systeem van Apple te gebruiken (indien dit kan).

### Uploading the data

Het pushen van de data naar firebase is zeer simpel in Swift. Het is direct geïmplementeerd dankzij packages en werkt seemlessly. Heel weinig code is nodig hiervoor. Collections kunnen ook direct aangemaakt worden via de app, hiervoor moet gewoon een collection een unieke naam hebben en deze zal automatisch in firebase terecht komen met de data er in.

### GDPR

Ik wou in het begin ook de locatie van de user uploaden (zie commits rond de start van deze opdracht). Dit is iets dat enkel mag indien de user dit toelaat, maar voor een reden die ik niet ken (en ggen oplossing of uitleg voor heb gevonden) kon ik dit niet implementeren. Er zijn ook heel stricte regels rond deze topic via GDPR en ik wil dit momenteel liever vermijden.