const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tts")
    .setDescription("speaks message")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message you want to send")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.SendTTSMessages
      )
    )
      return await interaction.reply({
        content: "You don't have perms to send tts message in this sever",
      });

    const { options } = interaction;
    const message = options.getString('message');

    const embed = new EmbedBuilder()
    .setColor(client.color)
    .setTitle(message)
    .setDescription(message)

    await interaction.reply({embeds: [embed], tts: true});
  },
};
