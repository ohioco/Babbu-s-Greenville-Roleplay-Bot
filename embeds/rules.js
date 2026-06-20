// embeds/rules.js
// FIX 1: message.member null-check added (crashes if partial member)
// FIX 2: delete trigger message before sending embed, not after, to avoid
//         the brief flash where both messages are visible
// FIX 3: permission denial no longer sends a public reply (deleted quietly)
// FIX 4: Added error handling to catch and log send failures
// NOTE:  ?rules requires GatewayIntentBits.MessageContent in index.js — see bottom

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

const STAFF_ROLE = "1508564268415713533";
const BABY_BLUE  = 0x89CFF0;

module.exports = {
  name: "messageCreate",

  async execute(message) {
    if (message.author.bot) return;
    if (message.content.toLowerCase() !== "?rules") return;

    // FIX: message.member can be null for partial guild members
    if (!message.member) return;

    if (!message.member.roles.cache.has(STAFF_ROLE)) {
      // Delete trigger quietly — no public error reply that everyone sees
      await message.delete().catch(() => {});
      return;
    }

    // Delete trigger before sending so there's no visible flash
    await message.delete().catch(() => {});

    const embed = new EmbedBuilder()
      .setTitle("Babbu's Greenville Roleplay™ | Server Regulations")
      .setColor(BABY_BLUE)
      .setImage("")
      .setDescription(
`Welcome to **Babbu's Greenville Roleplay**! We are a third-party Greenville Roleplay Server, which is civilian-centred to ensure a smooth and professional civilian experience within our server. Our aim is to bring back the glory of Greenville Roleplay with a unique and engaging twist on the gamemode. Below you will find all the rules and guidelines that must be adhered to at all times.

__**Babbu's Greenville Roleplay™ | Server Regulations**__

**Rule __1__ ➜ Respectful Conduct:**
All members must treat each other with utmost respect, fostering an atmosphere of courtesy and inclusivity. Discrimination, hate speech, and personal attacks are strictly prohibited. Regardless of differences, maintain a civil and courteous demeanor in all interactions.

**Rule __2__ ➜ No Spamming:**
To ensure a clutter-free and organised communication experience, refrain from sending consecutive messages or posting irrelevant content. Only share information that aligns with the channel's purpose and contribute meaningfully to discussions.

**Rule __3__ ➜ No Inappropriate Content:**
Sharing or posting sexually explicit, suggestive, violent, or age-inappropriate content is strictly forbidden. It is important to maintain a safe and comfortable space for members of all ages and backgrounds.

**Rule __4__ ➜ Confidentiality:**
Respect the privacy of all individuals within the Babbu's Greenville Roleplay community. Refrain from disclosing personal information, including phone numbers, addresses, or any other sensitive details without explicit permission.

**Rule __5__ ➜ No Unauthorized Advertising:**
Prior consent from server moderators or owners is necessary before promoting other Discord servers, websites, or services. Unsolicited advertising disrupts Babbu's Greenville Roleplay's community and is not tolerated.

**Rule __6__ ➜ Channel-Specific Guidelines:**
In addition to the server-wide rules, each channel may have its specific guidelines. Familiarise yourself with and adhere to these guidelines to ensure a harmonious and well-organised environment within Babbu's Greenville Roleplay.

**Rule __7__ ➜ No Hacking or Cheating:**
Engaging in hacking, cheating, or exploiting software or game vulnerabilities is strictly forbidden. Uphold fair play and maintain the integrity of Babbu's Greenville Roleplay's community activities.

**Rule __8__ ➜ No Impersonation:**
Avoid impersonating other members, staff, or well-known figures within the Babbu's Greenville Roleplay community. Misrepresenting oneself or others can lead to confusion, distrust, and disruptions.

**Rule __9__ ➜ Staff Compliance:**
Promptly and respectfully follow instructions given by moderators and server staff. They are entrusted with maintaining order and ensuring a positive environment in Babbu's Greenville Roleplay. Cooperation is essential.

**Rule __10__ ➜ Discord Terms of Service:**
Ensure that you follow **[Discord TOS](https://discord.com/terms)** at all times within Babbu's Greenville Roleplay. Breaking Terms of Service will result in severe disciplinary action taken against the offending member.
      `
      )
      .setFooter({ text: "Babbu's Greenville Roleplay™ | Server Regulations" })
      .setTimestamp();

    const menu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("rules_links")
        .setPlaceholder("Babbu's Greenville Roleplay - Links")
        .addOptions([
          {
            label:       "Babbu's Greenville Roleplay TikTok",
            description: "Follow us on TikTok @bbgvrp",
            value:       "tiktok",
            emoji:       "📱",
          },
        ]),
    );

    try {
      await message.channel.send({ embeds: [embed], components: [menu] });
    } catch (err) {
      console.error("[Rules Embed] Failed to send rules embed:", err.message);
      // Log additional context for debugging
      console.error(`[Rules Embed] Channel: ${message.channel.id}, Guild: ${message.guild.id}`);
    }
  },
};

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  REQUIRED: add MessageContent to index.js intents or ?rules will never fire

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent,   // ← ADD THIS
    ],
    ...
  });

  Also enable "Message Content Intent" in your app's Discord Developer Portal
  under Bot → Privileged Gateway Intents.

  ALSO CHECK:
  - Bot has "Send Messages" permission in the channel
  - Bot has "Embed Links" permission in the channel
  - Channel is a text channel (not voice/stage/forum)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
