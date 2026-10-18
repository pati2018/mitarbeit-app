# Mitarbeit

Web-App zum schnellen Erfassen der Mitarbeit (+, ++, +++, fehlt) pro Klasse und Unterrichtstag.

- Läuft komplett im Browser, auch offline (Service Worker).
- **Keine Schülerdaten im Repository.** Klassenlisten werden auf dem Gerät aus der Notenliste
  (Blätter mit „Name“/„Vorname“ in B3/C3, Klasse in C1), aus WebUntis-Exporten oder aus einer
  eigenen Sicherung eingelesen und nur im `localStorage` des Geräts gespeichert.
- Export: eine Excel-Arbeitsmappe mit einem Blatt pro Klasse (Datum × Schüler, Anzahl, fehlt, MA %).
- iPad: in Safari öffnen → Teilen → „Zum Home-Bildschirm“, damit die Daten dauerhaft erhalten bleiben.

Excel-Bibliothek: SheetJS Community Edition 0.20.3 (`vendor/`, Apache-2.0).
