$(document).ready(function(){

    var name = 'Boston',
        src = 'http://forecast.weather.gov/meteograms/Plotter.php?lat=42.35843&lon=-71.05977&wfo=BOX&zcode=MAZ015&gset=20&gdiff=10&unit=0&tinfo=EY5&ahour=0&pcmd=1101111111111000000000000000000000000000000000000000000000&lg=en&indu=1!1!1&dd=0&bw=0&hrspan=48&pqpfhr=6&psnwhr=6';

    var ls = window.localStorage;
    if (ls){
        var hash = window.location.hash,
            storage = ls.getItem('name');

        if (storage === null) {
          storage = name;
        }

        if (hash !== '' && hash !== storage){
            load();
            return;
        } else if (storage){
            window.location.hash = storage;
            name = storage;
            src = ls.getItem('src') || src;
        }
    }

    init(name, src);

    function init(name, src){
        $('body').attr('id', name);
        $('h1#header').text('Six day forecast for ' + name).css({'text-transform':'upper-case'});

        // Append images
        var frame = $('#frame-0').empty();
        for (var h=0; h<=96; h+=48){
            frame.append(
                $('<img />')
                    .attr('src', src.replace('hour=0', 'hour=' + h))
                    .click(function() {
                       $('body').toggleClass('resized');
                    })
            );
        }

        window.onhashchange = load;
    }

    function load(e){

        if (e){
            e.preventDefault();
        }

        $('#spinner').show();

        var loc = window.location.hash.split('#').join(''),
            address = encodeURIComponent(loc);

        // Find info via Sieve
        // github.com/alexose/sieve
        var json = {
            "url" : "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=true&key=AIzaSyDibQKEZmgUqFdTs6uDcXMiI20wR9Sh-TQ",
            "cache" : 60 * 60 * 24 * 7 * 4,
            "debug" : true,
            "selector" : {
                "lat" : ".location .lat",
                "lng" : ".location .lng"
            },
            "then" : {
                "url" : "http://forecast.weather.gov/MapClick.php?lat={{lat}}&lon={{lng}}&unit=0&lg=english&FcstType=graphical",
                "cache" : 60 * 60 * 24 * 7 * 4,
                "engine" : "jquery",
                "selector" : "$('img[usemap=\"#MouseVal\"]').attr('src');"
            }
        };

        var string = btoa(JSON.stringify(json));

        $.ajax({
            url : "http://sieve.alexose.com?callback=?",
            data : { json : string },
            dataType : "jsonp",
            success: function(result){

                if (result === undefined) {
                  alert('Couldn\'t find anything!');
                  return;
                }

                src = 'http://forecast.weather.gov/' + result;

                init(loc, src);

                // Save to localstorage
                if (ls){
                    ls.setItem('name', loc);
                    ls.setItem('src', src);
                }
            },
            complete: function(){
                $('#spinner').hide();
            }
        });
    }
});
