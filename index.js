#! /usr/bin/env node

var config = require('./config');
var dash_button = require('node-dash-button');
var dash = dash_button(config.button.id);

// Twilio Credentials
var accountSid = config.twilio.sid;
var authToken = config.twilio.token;

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

dash.on("detected", function (){

  console.log("Dash button detected!");
  // Best I could find Martin
  var waitMillis = 1000;
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < waitMillis);
  
  client.messages.create({
        to: config.message.to,
        from: config.message.from,
        body: config.message.body,
  }, function(err, message) {
        console.log(message.sid);
  });

});

