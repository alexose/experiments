Market Research
===============

This is an experiment in improving the state of market research in government aquisition.

We've identified a need for contract officers and acquisition experts to share their research among each other and between agencies.  Towards this goal, we've built a simple way to upload Microsoft Word documents and search their contents.

In the future, we may add new interfaces to make market research easier.  Some ideas include:
  * A way to quickly search and understand existing contracts
  * Better, smarter ways of building templates
  * Inline sharing and collaboration tools

Install:

    brew update && brew install elasticsearch && elasticsearch

Build:
    cd experiments/research 
    npm install
    cp node_modules/rc-slider/assets/index.css css/slider.css
    cp node_modules/bootstrap/dist/css/bootstrap.min.css css/
    watchify -t reactify -t brfs js/* -o ./dist/app.js -d -v
