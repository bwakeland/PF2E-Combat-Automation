class XpDistributionForm extends FormApplication {
    constructor(sheetData) {
        super();
        this.actorsInfo = sheetData.actorsInfo;
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['form'],
            popOut: true,
            template: `modules/PF2E-Combat-Automation/templates/xppopup.html`,
            id: 'my-form-application',
            title: 'XP Distribution',
        });
    }

    getData() {
        // Return data to the template
        return {
            actorsInfo: this.actorsInfo,
            msg: this.exampleOption,
            color: 'red',
        };
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    async _onSubmit(event, options) {
        return super._onSubmit(event, options);
    }

    async _updateObject(event, formData) {
        // data.data.details.xp.value
        console.log(formData);
        for (const [index, actorInfo] of this.actorsInfo.entries()) {
            if (formData.selection[index]) {
                const actor = game.actors.get(actorInfo.id);
                await actor.update({
                    ['data.details.xp.value']: actor.data.data.details.xp.value + formData.xpAmount,
                });
            }

        }
    }
}

export function xpPopup() {
    const playerActors = game.actors.filter((actor) => actor.hasPlayerOwner);
    const actorsInfo = playerActors.map((actor) => ({
        id: actor.id,
        name: actor.name,
        checked: game.users.players.some((user) => user.active && user.character?.id === actor.id),
    }));
    const sheetData = {
        actorsInfo: actorsInfo
    }
    new XpDistributionForm(sheetData).render(true);
}