import {calcDegreeOfSuccess} from "./degrees-of-success.js"
import {sendToChat} from "./chat.js";

const getSkillName = (message) => {
    console.log(message.data.flags.pf2e.context.options);
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
    console.log(attackTarget);
    switch (skillName) {
        case "demoralize":
            return (10 + attackTarget.actor.data.data.saves.will.value);
        case "trip":
            return (10 + attackTarget.actor.data.data.saves.reflex.value);
        default:
            console.log(skillName);
    }

};

export function parseSkill(message) {
    console.log("Parsing skill");
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
        console.log(attackTarget);
        const rollTarget = getTargetDC(attackTarget, message);
        const rollDifferential = rollTotal - rollTarget;
        const degreeOfSuccess = calcDegreeOfSuccess(rollDifferential, rollOnDie);
        const attackResult = {
            rollTarget: rollTarget,
            degreeOfSuccess: degreeOfSuccess,
            rollDifferential: rollDifferential,
            attacker: message.user.data.name,
            target: attackTarget.data.name,
            messageAlias: message.alias
        };
        attackResults.push(attackResult)
    });
    if (attackResults.length > 0) {
        sendToChat(attackResults);
    }
}