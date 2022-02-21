const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('catto')
    .setDescription('Displays a random cat photo'),
  async execute(interaction) {
    const { data: response} = await axios.get('https://api.thecatapi.com/v1/images/search');
    const catto = response[0].url;
    await interaction.reply(catto);
  }
}