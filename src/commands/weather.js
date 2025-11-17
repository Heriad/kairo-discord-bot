const axios = require('axios');
const { weather_api_key } = require('../config.json');
const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Replay with current weather for passed location')
    .addStringOption(option => option.setName('location').setDescription('Location to check the weather').setRequired(true)),
  async execute(interaction) {
    try {
      const location = interaction.options.getString('location');
      const { data: currentWeather } = await axios.get('http://api.weatherstack.com/current?access_key=' + weather_api_key + '&query=' + location);
      const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const date = new Date();
      const day = weekday[date.getDay()];
      const weatherEmbed = new EmbedBuilder()
        .setColor('#333333')
        .setTitle('Weather')
        .setDescription(currentWeather.current.weather_descriptions[0])
        .setThumbnail(currentWeather.current.weather_icons[0])
        .addFields(
          { name: 'Temperature', value: currentWeather.current.temperature.toString() + '°C', inline: true },
          { name: 'Location', value: currentWeather.request.query, inline: true },
          { name: 'Date', value: day + ' ' + currentWeather.location.localtime, inline: true },
          { name: 'Wind speed', value: currentWeather.current.wind_speed.toString() + ' km/h', inline: true },
          { name: 'Precipitation', value: currentWeather.current.precip.toString() + '%', inline: true },
          { name: 'Humidity', value: currentWeather.current.humidity.toString() + '%', inline: true }
        );
      await interaction.reply({ embeds: [weatherEmbed] });
    } catch (_) {
      await interaction.reply({
        content: 'Something went wrong while fetching the weather 🌧️',
        flags: MessageFlags.Ephemeral
      });
    }
  }
};