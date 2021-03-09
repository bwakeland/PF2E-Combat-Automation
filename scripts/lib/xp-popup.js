export function xpPopup() {
    const playerActors = game.actors.filter((actor) => actor.hasPlayerOwner && actor instanceof PF2ECharacter);
    console.log(playerActors);
}