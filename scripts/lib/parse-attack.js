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

const calcDegreeOfSuccess = (target, rollTotal) => {
    const rollDifferential = rollTotal - target;
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
    if (rollTotal === 20) {
        return incrementSuccess(initialDegreeOfSuccess);
    } else if (rollTotal === 1) {
        return decrementSuccess(initialDegreeOfSuccess);
    } else {
        return initialDegreeOfSuccess
    }
}

const sendToChat = (attackResults) => {
    const chatMessage = []
    attackResults.forEach(attackResult => {
        console.log(attackResult);
        const attackMessage = attackResult.attacker + " " + attackResult.degreeOfSuccess + " on " + attackResult.target;
        chatMessage.push(attackMessage)
    });
    const finalText = chatMessage.join("\n");
    ChatMessage.create({content: finalText});
}

export function parseAttack(message) {
    console.log("Parsing Attack Message");
    const rollTotal = message._roll._total;
    const attackResults = []
    game.user.targets.forEach(attackTarget => {
        const rollTarget = attackTarget.actor.data.data.attributes.ac.value
        const degreeOfSuccess = calcDegreeOfSuccess(rollTarget, rollTotal);
        console.log("Logging the attackTarget to find the name")
        console.log(attackTarget)
        const attackResult = {
            rollTarget: rollTarget,
            degreeOfSuccess: degreeOfSuccess,
            attacker: message.user.data.name,
            //target: attackTarget.value.data.name
        };
        attackResults.push(attackResult)
    });
    if (attackResults.length > 0) {
        sendToChat(attackResults);
    }
}