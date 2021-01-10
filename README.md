# Mój Dziennik

## Uruchomienie

Aby uruchomić stronę, należy użyć serwera, który domyślnie obsługuje SPA.

- Przy pomocy pythona: `python3 -m http.server`
- Przy pomocy `serve` (można go zainstalować za pomocą `npm` lub `yarn`)

Alternatywnie można posłużyć się stroną [hostowaną na GitHubie](https://vlaska.github.io/Moj-dziennik/).

## Logowanie

```
Login: jkowalski
Hasło: Kowalski!23
Kod uwerzytelniający: HM00 lub HHM30,
```

gdzie:

- H - aktualna godzina (24h, jeżeli wcześniej niż 10, jest poprzedzona zerem)
- M - aktualna minuta (jeżeli mniejsza niż 10, jest poprzedzona zerem)
- 00 lub 30 - jeżeli liczba sekun jest mniejsza od 30, wtedy 00, w przeciwnym wypadku 30

## Linki

Pod adresem `/#/linki` (lub `/Moj-dziennik/#/linki` w przypadku strony na GitHubie) można znaleźć linki do niektórych stron (w tym do formularza zmiany hasła).
