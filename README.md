# Weersvoorspelling Scraper

Een applicatie die weersvoorspellingen verzamelt van een weerswebsite (weather.com) met behulp van een web scraper (met Puppeteer).

## Beschrijving

Dit project gebruikt een web scraper (met Puppeteer) om de weersvoorspelling van de komende dagen te verzamelen van weather.com. De scraper haalt informatie op zoals de temperatuur en de dag van de week voor de weersvoorspelling en slaat deze op in een JSON-bestand.

## Functionaliteiten

- **Scrapen van Weersvoorspelling**: De scraper haalt gegevens zoals temperatuur en de dag van de week op van een specifieke weerswebsite.
- **Opslaan van Gegevens**: De verzamelde weersgegevens worden opgeslagen in een JSON-bestand.
- **Configuratie van Puppeteer**: De scraper maakt gebruik van Puppeteer om de website te laden en de gegevens te extraheren.

## Doel

Het doel van dit project is om een eenvoudig weer scraping script te maken dat automatisch de weersvoorspelling verzamelt van een publieke website en de gegevens opslaat voor verder gebruik, bijvoorbeeld voor analyse of visualisatie.

## Technologieën

- **Scraping**: Puppeteer (Node.js)
- **Opslaan van Gegevens**: JSON-bestanden voor opslag
- **Backend**: Node.js voor het scrapen en het verwerken van gegevens

## Roadmap

1. Setup van het basisproject met Node.js en Puppeteer.
2. Ontwikkelen van de scraper om weersvoorspellingen te verzamelen.
3. Verzamelde gegevens opslaan in een JSON-bestand.
4. (Toekomstig) Visualisatie van de weersvoorspellingen.
5. (Toekomstig) Extra functionaliteit voor dynamische updates van weersgegevens.

## Gebruik

1. Installeer de benodigde dependencies:
    ```bash
    npm install puppeteer
    ```

2. Voer de scraper uit:
    ```bash
    node scraper.js
    ```

De verzamelde weersvoorspellingen worden opgeslagen in het `current_weather.json` bestand.

## Contributies

Voel je vrij om bij te dragen aan dit project! Maak een pull request voor nieuwe features of verbeteringen.
