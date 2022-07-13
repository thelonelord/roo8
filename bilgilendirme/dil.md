 const msg = message
const db = require("quick.db")
    var en = require("../language/english");
    var tr = require("../language/turkish");

    var dil = db.fetch(`language_${msg.guild.id}`)

if(dil == "en") {
    var lang = en
} 
if(!dil) {
  var lang = tr
}