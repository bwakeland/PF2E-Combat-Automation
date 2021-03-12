import {parseAttack} from "./lib/parse-attack.js";
import {xpPopup} from "./lib/xp-popup.js";
import {parseSkill} from "./lib/parse-skill.js";

Hooks.once('init', async function () {

});

Hooks.once('ready', async function () {
    game['PF2ECombatAutomation'] = {
        xpPopup: xpPopup,
    }
});

Hooks.on("createChatMessage", (message) => {
    if ((typeof (message.data.flags.pf2e) !== 'undefined') && ((typeof message.data.flags.pf2e.context) !== 'undefined')) {
        if (((message.data.flags.pf2e.context.type === "spell-attack-roll") ||
            (message.data.flags.pf2e.context.type === "attack-roll"))
            && game.user.isGM) {
            parseAttack(message);
        }
        else if (((message.data.flags.pf2e.context.type === "skill-check") && game.user.isGM)) {
            parseSkill(message);
        }
    }
});