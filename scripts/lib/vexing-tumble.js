export function vexingTumble() {
    if (canvas.tokens.controlled.length !== 1) {
        ui.notifications.warn(game.i18n.localize('PF2E.ActionsWarning.NoActor'))
        return;
    }
    let playerActor = canvas.tokens.controlled[0].actor;
    const skillKey = Object.keys(playerActor.data.data.skills).find(
        (key) => playerActor.data.data.skills[key].name === "acrobatics"
    );

    const options = playerActor.getRollOptions([
        "all",
        "skill-check",
        "acrobatics",
    ]);

    options.push("action:vexing-tumble");
    playerActor.data.data.skills[skillKey].roll(event, options);
}