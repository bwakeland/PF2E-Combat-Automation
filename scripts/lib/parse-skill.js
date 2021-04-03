import {calcDegreeOfSuccess} from "./degrees-of-success.js"
import {sendSkillToChat} from "./chat.js";

const getSkillName = (message) => {
    let skillName = "Unknown"
    message.data.flags.pf2e.context.options.forEach(option => {
        if (option.startsWith("action")) {
            console.log(option);
            skillName = option.split(":")[1];
        }
    });
    return skillName;
};

const getTargetDC = (attackTarget, message) => {
    const skillName = getSkillName(message);
    switch (skillName) {
        case "demoralize":
            return (10 + attackTarget.actor.data.data.saves.will.value);
        case "trip":
        case "disarm":
        case "tumble-through":
            return (10 + attackTarget.actor.data.data.saves.reflex.value);
        case "shove":
        case "grapple":
            return (10 + attackTarget.actor.data.data.saves.fortitude.value);
        case "feint":
            return (10 + attackTarget.actor.data.data.attributes.perception.value);
        default:
            console.log(skillName);
            return -1;
    }

};

export function parseSkill(message) {
    const rollTotal = message._roll._total;
    const rollOnDie = message._roll.results[0];
    const attackResults = []
    const skillName = getSkillName(message);
    if (skillName === "Unknown") {
        console.log("Could not determine skill name, or skill is not targeted");
        return;
    }
    message.user.targets.forEach(attackTarget => {
        // const rollTarget = attackTarget.actor.data.data.attributes.ac.value
        const rollTarget = getTargetDC(attackTarget, message);
        if (rollTarget === -1) {
            return;
        }
        const rollDifferential = rollTotal - rollTarget;
        const degreeOfSuccess = calcDegreeOfSuccess(rollDifferential, rollOnDie);
        const attackResult = {
            rollTarget: rollTarget,
            degreeOfSuccess: degreeOfSuccess,
            rollDifferential: rollDifferential,
            attacker: message.user.data.name,
            target: attackTarget.data.name,
            messageAlias: message.alias,
            skillSlug: skillName,
        };
        attackResults.push(attackResult)
    });
    if (attackResults.length > 0) {
        sendSkillToChat(attackResults);
    }
}