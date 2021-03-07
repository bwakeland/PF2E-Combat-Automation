import {parseAttack} from "./scripts/parse-attack.js";
Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {

});

Hooks.on("createChatMessage", (message) => {
   if((data.flags.pf2e.context.type === "spell-attack-roll") || (data.flags.pf2e.context.type === "attack-roll")) {
       parseAttack(message)
   }
});