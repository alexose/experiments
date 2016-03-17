Wedding.farm
============

Build:
    cd wedding.farm
    npm install
    cp node_modules/rc-slider/assets/index.css css/slider.css
    cp node_modules/bootstrap/dist/css/bootstrap.min.css css/
    watchify -t reactify -t brfs js/* -o ./dist/app.js -d -v
