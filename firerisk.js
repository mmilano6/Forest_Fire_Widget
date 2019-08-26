
/* author: _mike_milano
*
* This javascript is based of a python script that was used to control and update
* a LED strip via a Raspberry Pi. Py script would  open a websocket and read and
* parse a text file with a nine digit color code. Then it would update the LED.
* The script had to run for an unknown length, and most likely it was several hours.
*/

//initial risk color
let old_R = 0;
let old_G = 100;
let old_B = 200;

let current_R = 0;
let current_G = 0;
let current_B = 0;

let incrementSeconds = 0;

var todays_Risk_Color = "c80a64";

var testColor = "000000000";

setInterval(function() { riskUpdate() }, 0);

//window.onload =
function riskUpdate()
{

  Promise.all([
    fetch('http://mmd.michaelmilanodesign.com/firerisk.txt').then(x => x.text())
        ]).then(([sampleResp]) => {
          testColor = sampleResp;
          console.log(sampleResp);
          });

//http://mmd.michaelmilanodesign.com/firerisk.txt
 /*Promise.all([fetch('www.michaelmilanodesign.com/fire_risk.txt').then(x => x.text()),
 ]).then(([sampleResp]) => {
 console.log(sampleResp);
});*/
  // socket.setdefaulttimeout( 23 );  // timeout in seconds //
  //var risk_COLOR_FILE = urlopen('http://192.168.137.1/fire_risk.txt', 'r');

// GET FILE AND PARSE IT

/*
   const WebSocket = require('ws');
   var socket = new WebSocket('ws://localhost:3000');

*/
 //  var risk_COLOR_FILE = new WebSocket("wss://www.michaelmilanodesign.com/fire_risk.txt", "protocolOne");
   //var risk_COLOR_FILE = new WebSocket('wss://www.michaelmilanodesign.com/fire_risk.txt', "protocolOne");
   //var risk_COLOR_FILE = new WebSocket.Open('wss://www.google.com', "protocolOne");


   var risk_COLOR = "100010200";  // TEMPORARY COLOR FOR BUILD THE REST OF THE SCRIPT

   var risk_R = parseInt(risk_COLOR.slice(0, 3));
   var risk_G = parseInt(risk_COLOR.slice(3, 6));
   var risk_B = parseInt(risk_COLOR.slice(6, 9));

   var current_R = risk_R;
   var current_G = risk_G;
   var current_B = risk_B;



// CONVERT RGB NINE DIGIT COLOR CODE TO HEX via @jonkantner · jonkantner.com


       current_R = current_R.toString(16);
       current_G = current_G.toString(16);
       current_B = current_B.toString(16);

       if (current_R.length == 1)
           current_R = "0" + current_R;
       if (current_G.length == 1)
           current_G = "0" + current_G;
       if (current_B.length == 1)
           current_B = "0" + current_B;

       todays_Risk_Color = current_R + current_G + current_B;

       document.getElementById("myCanvas").style.backgroundColor = "#" + todays_Risk_Color;
   }
