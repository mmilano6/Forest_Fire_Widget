
/* author: _mike_milano - mmilano6@gmail.com - michaelmilanodesign.com
*
* This javascript is based of a python script that was used to control and update
* a LED strip via a Raspberry Pi. Py script would open a websocket and read and
* parse a text file with a nine digit color code. Then it would update the LED.
* The script had to run for an unknown length, and most likely it was several hours.
* It was part of a bigger hi-fi prototype of an IoT system, which had to work after
* being plugged in, without any support team.
*/

//initial risk color and global variables
let current_R = 0;
let current_G = 0;
let current_B = 0;

let incrementSeconds = 0;

var todays_Risk_Color = "#64C80A";

var testColor = "000000000";

//Set loop to constantly check txt file. This needs more work so its not so taxing and is more effecient
setInterval(function() { riskUpdate() }, 0);

function riskUpdate()
{
  var sampleResp = "000000000";

//Chose to use fetch over ajax so it could be contained in script and easily implemented elsewhere. Also allowed for continual checking.
  Promise.all([
    fetch("http://mmd.michaelmilanodesign.com/firerisk.txt").then(x => x.text())
        ]).then(([sampleResp]) => {
          testColor = sampleResp;
          console.log(sampleResp);
          document.getElementById("parseTest").textContent = testColor;
        });


//Begin to parse original color code into R,G,and B.
   var risk_COLOR = testColor;

   var risk_R = parseInt(risk_COLOR.slice(0, 3));
   var risk_G = parseInt(risk_COLOR.slice(3, 6));
   var risk_B = parseInt(risk_COLOR.slice(6, 9));

   var current_R = risk_R;
   var current_G = risk_G;
   var current_B = risk_B;


// Convert RGB nine digit color code to HEX via @jonkantner · jonkantner.com

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

       var canvas = document.getElementById("myCanvas");

       document.getElementById("myCanvas").style.backgroundColor = "#" + todays_Risk_Color;
   }
