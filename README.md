#2014-1-15-week-in-congress

## Usage

### Widget

This widget is intended to be included as an iFrame. By default, the
widget will display all events. To force a maximum vertical height on
the widget, send `height` as a URL parameter. e.g.
`http://127.0.0.1:8000/?height=347`

### Scraper

Requirements:
- pip
- virtualenv

To install:

    make install

To start scraper:

    make start

The scraper will add a cron job to get the latest events every day.

### HALP!

To view your project locally:

    grunt server


To view locally using a php server:

    grunt php


To compile Compass/Sass:

    grunt compass



