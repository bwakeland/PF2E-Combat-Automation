![](https://img.shields.io/badge/Foundry-v0.7.9-informational)
<!--- Downloads @ Latest Badge -->
<!--- replace <user>/<repo> with your username/repository -->
<!--- ![Latest Release Download Count](https://img.shields.io/github/downloads/<user>/<repo>/latest/module.zip) -->

<!--- Forge Bazaar Install % Badge -->
<!--- replace <your-module-name> with the `name` in your manifest -->
<!--- ![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2F<your-module-name>&colorB=4aa94a) -->




# FoundryVTT Module for Pathfinder 2e

Automatically calculates hits, misses, crits, and crit-fails. Displays the result of the attack on the targeted unit by
comparing to AC. Puts the result into chat, whispers the GM privately the difference between the result and the target
in case manual adjustment is needed.

Also calculates degree of success on trips, shoves, disarms, feints, demoralizes, grapples, and tumble through. Displays rule elements for the degree of success achieved against the target. Requires the use of the skill macros in the PF2E system compendium.

Includes 2 macros: <br>
One that creates an XP popup in the style of loot distribution to give out XP: game.PF2ECombatAutomation.xpPopup(); <br>
One that allows you to use Vexing tumble as a skill that's compatible with this module: game.PF2ECombatAutomation.vexingTumble();


To install module use: https://github.com/bwakeland/PF2E-Combat-Automation/releases/latest/download/module.json
## Changelog

Added a macro for Vexing tumble
