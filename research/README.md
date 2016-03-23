Market Research
===============

This is an experiment in improving the state of market research in government acquisition.

We've identified a need for contract officers and acquisition experts to share their research among each other and between agencies.  Towards this goal, we've built a simple way to upload Microsoft Word documents and search their contents.

In the future, we may add new interfaces to make market research easier.  Some ideas include:
  * A way to quickly search and understand existing contracts
  * Better, smarter ways of building templates
  * Inline sharing and collaboration tools

Install
-------
    brew update
    brew install elasticsearch tika
    git clone https://github.com/alexose/experiments.git
    cd experiments/research
    npm install

If you're developing with a local ElasticSearch, you'll want to add the following to your elasticsearch.yml:

    http.cors.enabled : true  
    http.cors.allow-origin : "*"
    http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
    http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length

Build
-----
    npm run build 

Or, if you're actively developing:
    
    npm run watch 

Run
---

Start up elasticsearch:

    elasticsearch

Then start the server:

    npm start

Notes
-----
We use [tika](http://tika.apache.org/1.12/gettingstarted.html) to extract text from a variety of sources.  This could also be handled on the ElasticSearch side via the [mapper-attachments](https://www.elastic.co/guide/en/elasticsearch/plugins/master/mapper-attachments.html) plugin.  However, we expect to launch this to Amazon's hosted ElasticSearch, which doesn't support plugins at this time.
