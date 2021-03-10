const DegreesOfSuccess = {
    CRIT_FAIL: "critical failure",
    FAIL: "fail",
    SUCCESS: "success",
    CRIT_SUCCESS: "critical success",
}

const incrementSuccess = (degreeOfSuccess) => {
    switch (degreeOfSuccess) {
        case DegreesOfSuccess.CRIT_FAIL:
            return DegreesOfSuccess.FAIL;
        case DegreesOfSuccess.FAIL:
            return DegreesOfSuccess.SUCCESS;
        case DegreesOfSuccess.SUCCESS:
            return DegreesOfSuccess.CRIT_SUCCESS;
        case DegreesOfSuccess.CRIT_SUCCESS:
            return DegreesOfSuccess.CRIT_SUCCESS;
    }
}

const decrementSuccess = (degreeOfSuccess) => {
    switch (degreeOfSuccess) {
        case DegreesOfSuccess.CRIT_SUCCESS:
            return DegreesOfSuccess.SUCCESS;
        case DegreesOfSuccess.SUCCESS:
            return DegreesOfSuccess.FAIL;
        case DegreesOfSuccess.FAIL:
            return DegreesOfSuccess.CRIT_FAIL;
        case DegreesOfSuccess.CRIT_FAIL:
            return DegreesOfSuccess.CRIT_FAIL;
    }
}

const calcDegreeOfSuccess = (rollDifferential, rollOnDie) => {
    const calcInitialDegreeOfSuccess = (differential) => {
        if (differential >= 10) {
            return DegreesOfSuccess.CRIT_SUCCESS;
        } else if (differential >= 0) {
            return DegreesOfSuccess.SUCCESS;
        } else if (differential <= -10) {
            return DegreesOfSuccess.CRIT_FAIL;
        } else {
            return DegreesOfSuccess.FAIL;
        }
    }
    const initialDegreeOfSuccess = calcInitialDegreeOfSuccess(rollDifferential)
    if (rollOnDie === 20) {
        return incrementSuccess(initialDegreeOfSuccess);
    } else if (rollOnDie === 1) {
        return decrementSuccess(initialDegreeOfSuccess);
    } else {
        return initialDegreeOfSuccess
    }
}

const formatAttack = (attackResult) => {
    const totalText = []
    switch (attackResult.degreeOfSuccess) {
        case DegreesOfSuccess.CRIT_SUCCESS:
            totalText.push("🎯" + ' <b>Critical Hit</b> on ');
            break;
        case DegreesOfSuccess.SUCCESS:
            totalText.push("✅" + ' <b>Hit</b> on ');
            break;
        case DegreesOfSuccess.FAIL:
            totalText.push("🟥" + ' <b>Miss</b> on ');
            break;
        case DegreesOfSuccess.CRIT_FAIL:
            totalText.push("💣" + ' <b>Critical Failure</b> on ');
            break;
        default:
            totalText.push("Shouldn't ever see this");
    }
    totalText.push(attackResult.target);
    totalText.push(".");
    return totalText.join("");
}

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


const sendToChat = (attackResults) => {
    const chatMessage = []
    const whisperMessage = []
    attackResults.forEach(attackResult => {
        const attackMessage = formatAttack(attackResult);
        chatMessage.push(attackMessage)
        const missedByText = "Roll difference of " + attackResult.rollDifferential.toString() +
            " on " + attackResult.target;
        whisperMessage.push(missedByText)
    });
    const finalText = chatMessage.join("\n");
    const finalWhisper = whisperMessage.join("\n");
    const displayData = {content: finalText, speaker: {alias: attackResults[0].messageAlias}};
    ChatMessage.create(displayData);
    const whisperData = {content: finalWhisper};
    whisperData.user = game.users.entities.find(user => user.isGM)._id;
    whisperData.whisper = ChatMessage.getWhisperRecipients('GM');
    ChatMessage.create(whisperData);
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
    game.user.targets.forEach(attackTarget => {
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