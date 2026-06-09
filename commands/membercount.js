const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const STAFF_ROLE = "1455324349526442099";
const BABY_BLUE  = 0x89CFF0;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Shows the server member count"),

  async execute(interaction) {
    await interaction.guild.members.fetch();
    const total = interaction.guild.memberCount;
    const bots  = interaction.guild.members.cache.filter(m => m.user.bot).size;
    const human = total - bots;

    const embed = new EmbedBuilder()
      .setTitle("Babbu's Greenville Roleplay™ | Member Count")
      .setColor(BABY_BLUE)
      .addFields(
        { name: "Total",  value: `${total}`, inline: true },
      )
      .setFooter({ text: "Babbu's Greenville Roleplay™" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
