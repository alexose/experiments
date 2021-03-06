Sense home energy meter to InfluxDB
===================================

This is a tool to siphon data from your [Sense](https://sense.com) home energy meter to an InfluxDB database.

## Why?

Because this allows you to visualize your home energy data in Grafana, which is much more powerful than the built-in Sense graphs.

## How?

First, ensure that you have [Node.js](https://nodejs.org/en/download/) installed.  Then:

    git clone https://github.com/alexose/sense2influx
    cd sense2influx
    cp config.js.example config.js

You'll want to edit config.js to reflect your username, password, and relevant InfluxDB settings.

    node index.js

## Questions?

Please feel free to open an [issue](https://github.com/alexose/sense2influx/issues) or reach out to me directly.

  


