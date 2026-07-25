# Atlasgames Kommandozentrale

Interaktive Vorführanwendung für eine modulare Management-Plattform im Profifußball.

## Bereiche

- Öffentlicher Auftritt mit Kader, Profilen und Neuigkeiten
- Persönlicher Spielerzugang mit Kalender, Nachrichten, Dokumenten, Aufgaben und Leistung
- Managementbereich mit Kadersteuerung, Verträgen, Transfers, Scouting, Sponsoren und Medizin

Die Oberfläche arbeitet vollständig im Browser mit Vorführdaten. Formulare, Navigation, Nachrichten, Aufgaben und Detailansichten sind interaktiv; es werden keine echten persönlichen Daten gespeichert oder übertragen.

## Veröffentlichung

Jeder Push auf `main` veröffentlicht die Anwendung über GitHub Actions auf `atlas.smarbiz.sbs`. Dafür werden die Repository-Secrets `HOST` und `PASS` verwendet. Die Anmeldung erfolgt als `root` über Port 22.
