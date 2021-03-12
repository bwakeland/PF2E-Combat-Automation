import {formatSuccess} from "./degrees-of-success.js";

export function sendToChat(attackResults) {
    const chatMessage = []
    const whisperMessage = []
    attackResults.forEach(attackResult => {
        const attackMessage = formatSuccess(attackResult);
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