const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crypto')
    .setDescription('Displays current value of selected cryptocurrencies'),
  async execute(interaction) {
    try {
      const [{ data: bitcoin }, { data: ethereum }, { data: nexo }] = await Promise.all([
        axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
        axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'),
        axios.get('https://api.binance.com/api/v3/ticker/price?symbol=NEXOUSDT')
      ]);
      const cryptoPriceEmbed = new EmbedBuilder()
        .setColor('#333333')
        .setTitle('Crypto prices')
        .addFields(
          { name: '(BTC) Bitcoin', value: `${parseFloat(bitcoin.price).toFixed(2)} $`, inline: true },
          { name: '(ETH) Ethereum', value: `${parseFloat(ethereum.price).toFixed(2)} $`, inline: true },
          { name: '(NEXO) Nexo', value: `${parseFloat(nexo.price).toFixed(2)} $`, inline: true }
        );
      await interaction.reply({ embeds: [cryptoPriceEmbed] });
    } catch (_) {
      await interaction.reply('Something went wrong while fetching a cryptocurrencies data 🤑');
    }
  }
};