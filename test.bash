#!/bin/bash -xv


curl -X POST \
    -H "Content-Type: application/json" \
    -H "x-api-key: f9303b04-8db4-4d34-b2a9-356ba490f977" \
    -d '{
          "zoekParameters": 
            [
              {
                "parameter": "identificatie",
                "zoekWaarden": ["nl.imow-gm0080.activiteit.BouwwerkAgrarischBouwen"]
              }
            ]
       }
       ' \
https://service.int.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/presenteren/v5/activiteiten/_zoek

curl -X POST \
    -H "Content-Type: application/json" \
    -H "x-api-key: f9303b04-8db4-4d34-b2a9-356ba490f977" \
    -d '{
          "zoekParameters": 
            [
              {
                "parameter": "document.type",
                "zoekWaarden": ["Omgevingsverordening"]
              }
            ]
       }
       ' \
https://service.int.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/presenteren/v5/omgevingsdocumenten/_zoek
