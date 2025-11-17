const axios = require('axios');
const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('catto')
    .setDescription('Displays a random cat photo'),
  async execute(interaction) {
    try {
      const { data: response } = await axios.get('https://api.thecatapi.com/v1/images/search');
      const catImageUrl = response[0].url;
      await interaction.reply(catImageUrl);
    } catch (_) {
      await interaction.reply({
        content: 'Something went wrong while fetching a catto 😿',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};