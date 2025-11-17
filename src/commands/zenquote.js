const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('zenquote')
    .setDescription('Random quote from ZenQuotes'),
  async execute(interaction) {
    await interaction.deferReply();
    try {
      const { data } = await axios.get('https://zenquotes.io/api/random');
      const quote = Array.isArray(data) && data.length > 0 ? data[0] : null;
      if (!quote) {
        await interaction.reply('Failed to fetch the quote. Please try again later.');
        return;
      }
      const quoteEmbed = new EmbedBuilder()
        .setColor("#333333")
        .setTitle('ZenQuote')
        .setDescription(`"${quote.q}"`)
        .setFooter({ text: `— ${quote.a}` })
        .setTimestamp(Date.now());
      await interaction.reply({ embeds: [quoteEmbed] });
    } catch (error) {
      await interaction.reply({
        content: 'Something went wrong while fetching the quote.',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};