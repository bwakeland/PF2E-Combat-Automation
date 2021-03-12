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

export function calcDegreeOfSuccess(rollDifferential, rollOnDie) {
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

export function formatSuccess(result) {
    const totalText = []
    switch (result.degreeOfSuccess) {
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
    totalText.push(result.target);
    totalText.push(".");
    return totalText.join("");
}