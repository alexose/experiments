function getSession(){

    var json = {
        url:      "http://somls.rapmls.com/",
        selector: {
            url: "$('img[name=Image13]')!.parent().attr('href')"
        },
        engine:   "jquery",
        then: {
            url: "{{url}}",
            selector: "$('form')!.serialize()",
            engine: "jquery"
        },
        cache: false,
        debug: true
    };

    send(json, function(results){
      var params = results.result[0][0];
      getIds(params);
    });
}

function getIds(params){

    var obj = paramsToObj(params);

    obj['Listing_Number_1'] = 2947949;

    var json = {
        url:      "http://somls.rapmls.com/scripts/mgrqispi.dll",
        method:   "POST",
        body:     $.param(obj),
        cache:    false,
        debug:    true
    };

    console.log(json);

    send(json, function(response){

        console.log(response);

        var results = response.result,
            ids = [];

        for (var i in results){
            var result = results[i];
            var id = $.trim(result.split(',')[1])
            ids.push(id);
        }

        showIds(ids);
    });
}

function showIds(ids){

    for (var i in ids){

        var id = ids[i];

        var body = 'APPNAME=Sooregon&PRGNAME=MLSPropertyDetail&ARGUMENTS=-N135609391%2C-N171275%2C-N0%2C-A%2C-N18478936&VCR_String=002947949-&VCR_RID_String={{rid_string}}&Listing_Cart_Count=0&Listing_RID={{rid}}&Section_Type=&IDXSearchType='

        body = body.replace('{{rid_string}}', id)
        body = body.replace('{{rid_string}}', id)

        var json = {
            url:      "http://somls.rapmls.com/scripts/mgrqispi.dll",
            method:   "POST",
            body:     body,
            cache:    false,
            debug:    true
        };

        send(json, function(response){
            $('#container').html(response.result);
            console.log(response);
        });
    }
}

function send(json, cb){

    var string = btoa(JSON.stringify(json));

    $.ajax({
        url : "http://localhost:3005?callback=?",
        data : { json : string },
        dataType : "jsonp",
        success: cb
    });
}

function paramsToObj(params){
    var pairs = params.split('&');

    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}
