const skillText = {
    trip: {
        name: "Trip",
        criticalSuccess: "<b>Critical Success</b>: The target falls and lands prone and takes 1d6 bludgeoning damage.",
        success: "<b>Success</b>: The target falls and lands prone.",
        failure: "<b>Failure</b>: Nothing happens.",
        criticalFailure: "<b>Critical Failure</b>: You lose your balance and fall and land prone."
    },
    demoralize:
        {
            name: "Demoralize",
            criticalSuccess: "<b>Critical Success</b>: The target becomes frightened 2.",
            success: "<b>Success</b>: The target becomes frightened 1.",
            failure: "<b>Failure</b>: Nothing happens.",
            criticalFailure: "<b>Critical Failure</b>: Nothing happens."
        },
    disarm:
        {
            name: "Disarm",
            criticalSuccess: "<b>Critical Success</b>: You knock the item out of the target's grasp. It falls to the ground in the target's space.",
            success: "<b>Success</b>: You weaken your target's grasp on the item. Until the start of that creature's turn, attempts to Disarm the target of that item gain a +2 circumstance bonus, and the target takes a –2 circumstance penalty to attacks with the item or other checks requiring a firm grasp on the item.",
            failure: "<b>Failure</b>: Nothing happens.",
            criticalFailure: "<b>Critical Failure</b>: You lose your balance and become flat-footed until the start of your next turn."
        },
    'tumble-through':
        {
            name: "Tumble through",
            criticalSuccess: "<b>Critical Success</b>: You move through the enemy’s space, treating the squares in its space as difficult terrain (every 5 feet costs 10 feet of movement). If you don’t have enough Speed to move all the way through its space, you get the same effect as a failure.",
            success: "<b>Success</b>: You move through the enemy’s space, treating the squares in its space as difficult terrain (every 5 feet costs 10 feet of movement). If you don’t have enough Speed to move all the way through its space, you get the same effect as a failure.",
            failure: "<b>Failure</b>: Your movement ends, and you trigger reactions as if you had moved out of the square you started in.",
            criticalFailure: "<b>Critical Failure</b>: Your movement ends, and you trigger reactions as if you had moved out of the square you started in."
        },
    shove:
        {
            name: "Shove",
            criticalSuccess: "<b>Critical Success</b>: You push your target up to 10 feet away from you. You can Stride after it, but you must move the same distance and in the same direction.",
            success: "<b>Success</b>: You push your target back 5 feet. You can Stride after it, but you must move the same distance and in the same direction.",
            failure: "<b>Failure</b>: Nothing happens.",
            criticalFailure: "<b>Critical Failure</b>: You lose your balance, fall, and land prone."
        },
    grapple:
        {
            name: "Grapple",
            criticalSuccess: "<b>Critical Success</b>: Your target is restrained until the end of your next turn unless you move or your target Escapes.",
            success: "<b>Success</b>: Your target is grabbed until the end of your next turn unless you move or your target Escapes.",
            failure: "<b>Failure</b>: You fail to grab your target. If you already had the target grabbed or restrained using a Grapple, those conditions on that creature or object end.",
            criticalFailure: "<b>Critical Failure</b>:  If you already had the target grabbed or restrained, it breaks free. Your target can either grab you, as if it succeeded at using the Grapple action against you, or force you to fall and land prone."
        },
    feint:
        {
            name: "Feint",
            criticalSuccess: "<b>Critical Success</b>: You throw your enemy’s defenses against you entirely off. The target is flat-footed against melee attacks that you attempt against it until the end of your next turn.",
            success: "<b>Success</b>: Your foe is fooled, but only momentarily. The target is flat-footed against the next melee attack that you attempt against it before the end of your current turn.",
            failure: "<b>Failure</b>: Nothing happens.",
            criticalFailure: "<b>Critical Failure</b>: Your feint backfires. You are flat-footed against melee attacks the target attempts against you until the end of your next turn."

        },
    'vexing-tumble':
        {
            name: "Vexing Tumble",
            criticalSuccess: "<b>Critical Success</b>: This movement doesn't trigger reactions from the foe, the foe is flat-footed to you until the end of your turn. You have gained Panache.",
            success: "<b>Success</b>: This movement doesn't trigger reactions from the foe. You have gained Panache.",
            failure: "<b>Failure</b>: This movement triggers reactions from foes as normal, no other effect",
            criticalFailure: "<b>Critical Failure</b>: Your movement immediately stops when you enter the creature's reach; if you began in the creature's reach, you don't move.",
        }
}

export {skillText};