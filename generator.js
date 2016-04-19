/*
*     
*   Mobileconfig Generator 1.0.0-2
*
*   Author: Joseph Shenton
*
*   Open Sourced Under The MIT License
*
*/

$(function () {
  $('#dlbutton').click(update);
  
});

var template = [
'<?xml version="1.0" encoding="UTF-8"?>',
'<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
'<plist version="1.0">',
'<dict>',
'<key>ConsentText</key>',
'<dict>',
'<key>default</key>',
'<string>DON\'T REMOVE THIS TEXT!! This profile was created using the open source mobileconfig generator by TeamiHackify. Download it now at http://timedevs.net/LPG/</string>',
'</dict>',
' <key>PayloadContent</key>',
' <array>',
'   <dict>',
'     <key>FullScreen</key>',
'     <true/>',
'     <key>Icon</key>',
'     <data><?base64textarea?></data>',
'     <key>IsRemovable</key>',
'     <true/>',
'     <key>Label</key>',
'     <string><?App_Name?></string>',
'     <key>PayloadDescription</key>',
'     <string>Adds a Web Clip.</string>',
'     <key>PayloadDisplayName</key>',
'     <string>Web Clip (<?App_Name?>)</string>',
'     <key>PayloadIdentifier</key>',
'     <string>com.ddgter.<?App_Creator?>.<?App_Name?>.99-5464jdfgdg-99.webclip1</string>',
'     <key>PayloadOrganization</key>',
'     <string><?App_Name?></string>',
'     <key>PayloadType</key>',
'     <string>com.apple.webClip.managed</string>',
'     <key>PayloadUUID</key>',
'     <string><?hexSource?></string>',
'     <key>PayloadVersion</key>',
'     <integer>1</integer>',
'     <key>Precomposed</key>',
'     <false/>',
'     <key>URL</key>',
'     <string><?App_PassPhrase?></string>',
'   </dict>',
' </array>',
' <key>PayloadDescription</key>',
' <string><?App_Name?></string>',
' <key>PayloadDisplayName</key>',
' <string><?App_Name?></string>',
' <key>PayloadIdentifier</key>',
' <string>com.profile.config</string>',
' <key>PayloadOrganization</key>',
' <string><?App_Creator?></string>',
' <key>PayloadRemovalDisallowed</key>',
' <false/>',
' <key>PayloadType</key>',
' <string>Configuration</string>',
' <key>PayloadUUID</key>',
' <string><?hexSource2?></string>',
' <key>PayloadVersion</key>',
' <integer>1</integer>',
'</dict>',
'</plist>',
].join('\r\n');
function d2h(d) {return d.toString(16);}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
function generateUUID2() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
function update() {

/* var tmp = App_Name.value;
 var str = '';
 for (var i=0; i<tmp.length; i++) {
    c = tmp.charCodeAt(i);
    str += d2h(c) + '';
  }*/
  document.getElementById("hexSource").value = generateUUID();
  document.getElementById("hexSource2").value = generateUUID2();
var variables = {
    'App_Name': $('#App_Name').val(),
    'base64textarea': $('#base64textarea').val(),
    'App_PassPhrase': $('#App_PassPhrase').val(),
    'App_Creator': $('#App_Creator').val(),
  'App_Hidden': $('#App_Hidden').val(),
  'App_Removeable': $('#App_Removeable').val(),
  'hexSource': $('#hexSource').val(),
  'hexSource2': $('#hexSource2').val(),
  };

  var newXml = template.replace(/<\?(\w+)\?>/g,
    function(match, name) {
      return variables[name];
    });

  
  $('#ResultXml').val(newXml);
  $('#DownloadLink')
    .attr('href', 'data:application/x-apple-aspen-config;base64,' + btoa(newXml))
    .attr('download', 'app.mobileconfig');
  $('#generated').show();
}

if (!window.btoa) {
  btoa = function (input) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    
    var result = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    
    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      
      result += chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4);
    } while (i < input.length);
      
    return result;
  };
}

$(document).ready(function(){
    // click event on the button
    $('#DownloadButton').click(function(){
        // get the content of the #result textarea
        val = $('#ResultXml').val();
        // remove all occurence of content of #name in #result
        $('#ResultXml').val(val.replace($('#removetext').val(), ""));
    });
});
var handleFileSelect = function(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            document.getElementById("base64textarea").value = btoa(binaryString);
        };

        reader.readAsBinaryString(file);
    }
};

if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
} else {
    alert('The File APIs are not fully supported in this browser.');
}
