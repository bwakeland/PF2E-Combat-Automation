const degreesOfSuccess = {
    CRIT_FAIL: "critical failure",
    FAIL: "fail",
    SUCCESS: "success",
    CRIT_SUCCESS: "critical success",
}

const incrementSuccess = (degreeOfSuccess) => {
    switch (degreeOfSuccess) {
        case degreesOfSuccess.CRIT_FAIL:
            return degreesOfSuccess.FAIL;
        case degreesOfSuccess.FAIL:
            return degreesOfSuccess.SUCCESS;
        case degreesOfSuccess.SUCCESS:
            return degreesOfSuccess.CRIT_SUCCESS;
        case degreesOfSuccess.CRIT_SUCCESS:
            return degreesOfSuccess.CRIT_SUCCESS;
    }
}

const decrementSuccess = (degreeOfSuccess) => {
    switch (degreeOfSuccess) {
        case degreesOfSuccess.CRIT_SUCCESS:
            return degreesOfSuccess.SUCCESS;
        case degreesOfSuccess.SUCCESS:
            return degreesOfSuccess.FAIL;
        case degreesOfSuccess.FAIL:
            return degreesOfSuccess.CRIT_FAIL;
        case degreesOfSuccess.CRIT_FAIL:
            return degreesOfSuccess.CRIT_FAIL;
    }
}

const calcDegreeOfSuccess = (rollDifferential, rollOnDie) => {
    const calcInitialDegreeOfSuccess = (differential) => {
        if (differential >= 10) {
            return degreesOfSuccess.CRIT_SUCCESS;
        } else if (differential >= 0) {
            return degreesOfSuccess.SUCCESS;
        } else if (differential <= -10) {
            return degreesOfSuccess.CRIT_FAIL;
        } else {
            return degreesOfSuccess.FAIL;
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

const sendToChat = (attackResults) => {
    const chatMessage = []
    const whisperMessage = []
    attackResults.forEach(attackResult => {
        const attackMessage = attackResult.attacker + " " + attackResult.degreeOfSuccess + " on " + attackResult.target;
        chatMessage.push(attackMessage)
        const missedByText = "Roll difference of " + toString(attackResult.rollDifferential) +
            " on " + attackResult.target;
        whisperMessage.push(missedByText)
    });
    const finalText = chatMessage.join("\n");
    const finalWhisper = whisperMessage.join("\n");
    const displayData = {content: finalText, speaker: {alias: attackResults[0].messageAlias}};
    ChatMessage.create(displayData);
    const whisperData = {content: finalWhisper, speaker: {alias: attackResults[0].messageAlias}};
    whisperData.user = game.users.entities.find(user => user.isGM)._id;
    whisperData.whisper = ChatMessage.getWhisperRecipients('GM');
    ChatMessage.create(whisperData);

}

export function parseAttack(message) {
    console.log("Parsing Attack Message");
    const rollTotal = message._roll._total;
    const rollOnDie = message._roll.results[0];
    const attackResults = []
    game.user.targets.forEach(attackTarget => {
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