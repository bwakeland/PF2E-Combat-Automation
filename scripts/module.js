import {parseAttack} from "./lib/parse-attack.js";
import {xpPopup} from "./lib/xp-popup.js";
import {vexingTumble} from "./lib/vexing-tumble.js";
import {parseSkill} from "./lib/parse-skill.js";

Hooks.once('init', async function () {

});

Hooks.once('ready', async function () {
    game['PF2ECombatAutomation'] = {
        xpPopup: xpPopup,
        vexingTumble: vexingTumble,
    }
});

Hooks.on("createChatMessage", (message) => {
    if ((message.data.flags.pf2e != null) && (message.data.flags.pf2e.context != null)) {
        if (((message.data.flags.pf2e.context.type === "spell-attack-roll") ||
            (message.data.flags.pf2e.context.type === "attack-roll")) &&
            game.user.isGM) {
            parseAttack(message);
        } else if (((message.data.flags.pf2e.context.type === "skill-check") && game.user.isGM)) {
            parseSkill(message);
        }
    }
});