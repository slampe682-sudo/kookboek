# Mijn Kookboek

Online op **https://slampe682-sudo.github.io/kookboek/**

## Een recept toevoegen

**Via de website:** klik op **+ Recept toevoegen**. GitHub opent een nieuw bestand met een sjabloon. Vul het in, geef het bestand een naam (bijv. `lasagne.md`) en klik op **Commit changes**. Binnen een minuut staat het recept online.

**Via Claude:** zeg bijvoorbeeld *"Zet mijn recept voor lasagne in het kookboek"* en plak het recept.

## Opbouw van een recept

Elk recept is één bestand in de map `_recepten/`:

```markdown
---
title: Naam van het recept
emoji: 🍽️
categorie: Hoofdgerecht        # bijv. Ontbijt, Lunch, Voorgerecht, Hoofdgerecht, Dessert, Bakken
tijd: 30                       # minuten
porties: 4
beschrijving: Eén zin over dit gerecht.
tip: Optioneel: een handige tip.
ingredienten:
  - { hoeveelheid: 300, eenheid: g, naam: bloem }
  - { hoeveelheid: 2, eenheid: "", naam: eieren }
  - { naam: snufje zout }       # zonder hoeveelheid: wordt niet omgerekend
  - { hoeveelheid: 1, eenheid: "", naam: "ui, gesnipperd" }   # komma in de naam? Zet de naam tussen "aanhalingstekens"
---

1. Eerste stap.
2. Tweede stap.
```

Hoeveelheden worden op de site automatisch omgerekend als je het aantal personen aanpast.
