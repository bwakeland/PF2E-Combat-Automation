import {calcDegreeOfSuccess} from "./degrees-of-success.js"
import {sendToChat} from "./chat.js"

const calcGridDistance = (one, two) => {
    let gs = canvas.grid.size;
    let dx = Math.abs((one.x - two.x) / gs);
    let dy = Math.abs((one.y - two.y) / gs);
    let dz = Math.abs((one.elevation - two.elevation));
    let maxDim = Math.max(dx, dy);
    let minDim = Math.min(dx, dy);
    let dist = (maxDim + Math.floor(minDim / 2)) * canvas.scene.data.gridDistance;
    dist += dz;
    return dist;
}


export function parseAttack(message) {
    console.log("Parsing Attack Message");
    const rollTotal = message._roll._total;
    const rollOnDie = message._roll.results[0];
    const attackResults = []
    /*    const originToken = canvas.tokens.controlled[0]
        let rangedAttack = false;
        let volleyAttack = false;
        let volleyDistance = 0;
        let rangeIncrement = 0;
        message.data.flags.pf2e.context.options.forEach(option => {
            if (option.startsWith("ranged")) {
                rangedAttack = true;
            }
            if (option.startsWith("volley")) {
                volleyAttack = true;
                volleyDistance = parseInt(option.split("-")[1]);
            }
        });*/
    message.user.targets.forEach(attackTarget => {
        //const dist = calcGridDistance(originToken, attackTarget);
        const rollTarget = attackTarget.actor.data.data.attributes.ac.value
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