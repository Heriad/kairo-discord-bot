const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { kairo_token, welcome_channel } = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

client.commands = new Collection();

const pathToCommands = path.join(__dirname + '/commands');
const commandFiles = fs.readdirSync(pathToCommands).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`${pathToCommands}/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
  console.log('Kairo started');
  const channel = await client.channels.fetch(welcome_channel);
  channel.send('I am ready, what are we going to do?');
  client.user.setActivity('Evolving');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
    return;
  }
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: 'There was an error while executing this command',
      ephemeral: true
    });
  }
})

client.login(kairo_token);