const axios = require('axios');
const responseStatus = require('../models/status');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('doggo')
    .setDescription('Displays random a dog photo')
    .addStringOption(option => option.setName('breed').setDescription('Dog breed').setRequired(false)),
  async execute(interaction) {
    const breed = interaction.options.getString('breed')?.toLowerCase();
    let response;
    if (breed) {
      response = await axios.get('https://dog.ceo/api/breed/' + breed + '/images/random');
    } else {
      response = await axios.get('https://dog.ceo/api/breeds/image/random');
    }
    const doggo = response.data.message;
    if (response.data.status === responseStatus.SUCCESS) {
      await interaction.reply(doggo)
    } else {
      await interaction.reply('Doggo unavailable');
    }
  }
}