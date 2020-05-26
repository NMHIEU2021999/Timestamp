// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
    if (!req.params.date_string) {
        let date = new Date();
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString(),
        });
        return;
    }

    let date = null;
    let regex = /^(\d+)$/;

    if (regex.test(req.params.date_string)) {
        let timestamp = parseInt(req.params.date_string);
        date = new Date(timestamp);
    }
    else {
        let timestamp = Date.parse(req.params.date_string);
        if (!isNaN(timestamp)) {
            date = new Date(timestamp);
        }
    }

    if (date) {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString(),
        });
    } else {
        res.json({ error: "Invalid Date" });
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});