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
            title: 'My FormApplication',
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
        console.log("_onsubmit")
        console.log(event);
        console.log(options);
        return super._onSubmit(event, options);
    }

    async _updateObject(event, formData) {
        console.log("Attempting to distribute XP");
        console.log(formData);
        console.log(this.actorsInfo);
        // data.data.details.xp.value
        for (const actorInfo of this.actorsInfo) {
            const actor = game.actors.get(actorInfo.id);
            await actor.update({
                ['data.details.xp.value']: actor.data.data.details.xp.value + formData.xpAmount,
            });
        }
        const testActor = game.actors.get(this.actorsInfo[0].id);
        console.log(testActor);
    }
}

export function xpPopup() {
    const playerActors = game.actors.filter((actor) => actor.hasPlayerOwner);
    console.log(playerActors);
    const actorsInfo = playerActors.map((actor) => ({
        id: actor.id,
        name: actor.name,
        checked: false,
    }));
    const sheetData = {
        actorsInfo: actorsInfo
    }
    new XpDistributionForm(sheetData).render(true);
    console.log(sheetData);
}