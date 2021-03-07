import {parseAttack} from "./lib/parse-attack.js";
Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {

});

Hooks.on("createChatMessage", (message) => {
   if((message.data.flags.pf2e.context.type === "spell-attack-roll") || (message.data.flags.pf2e.context.type === "attack-roll")) {
       parseAttack(message)
   }
});