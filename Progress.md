# Progess

## Challenge 1 feedback

### Data gathering

Het opnemen van data doe ik via ARKit en het emotion detection systeem van deze library. Deze gebruikt de camera van de iPhone om patterns te vinden aan de hand van een data set die komt met de library.

### Uploading the data

Het pushen van de data naar firebase is zeer simpel in Swift. Het is direct geïmplementeerd dankzij packages en werkt seemlessly. Heel weinig code is nodig hiervoor. Collections kunnen ook direct aangemaakt worden via de app, hiervoor moet gewoon een collection een unieke naam hebben en deze zal automatisch in firebase terecht komen met de data er in.

### GDPR

GDPR is heel makkelijk om te volgen. De camera wordt enkel gebruikt als de user dit toelaat. De prompt wordt de eerste keer dat de app geopoend wordt getoont.

### Readme

Language was een probleem dat nu gefixt is. Documentatie over data flow werdt ook toegevoegd.

### Single factor and reusability of functions

Sommige functies hebben meerdere functies die dienen om de algemene functie volledig functioneel te maken. Deze dienen ook om de functie reusable te maken en om de werking van de app simpel te houden. De service voor emotion data analysis heeft veel functies om het modulair, reusable en compleet te maken zonder dat alle andere viewmodels te ingewikkeld worden met te veel functies.

## Challenge 2 feedback

### Readme feedback

De README werd onderverdeeld in files in de aangepaste folders volgens use-case (vb: readme voor ViewModels). De README werdt ook aangepast voor een verdere uitleg van contribution guidelines.