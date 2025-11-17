const axios = require('axios');
const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('doggo')
    .setDescription('Displays random a dog photo')
    .addStringOption(option => option.setName('breed').setDescription('Dog breed').setRequired(false)),
  async execute(interaction) {
    try {
      const breed = interaction.options.getString('breed')?.toLowerCase();
      const response = await axios.get(breed ? `https://dog.ceo/api/breed/${breed}/images/random` : 'https://dog.ceo/api/breeds/image/random');
      const doggo = response.data.message;
      await interaction.reply(doggo);
    } catch (_) {
      await interaction.reply({
        content: 'Something went wrong while fetching a doggo 🐶',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};