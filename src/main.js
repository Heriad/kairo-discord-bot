const fs = require('fs');
const path = require('path');
const { Events } = require('discord.js');
const { kairo_token, welcome_channel } = require('./config.json');
const { Client, GatewayIntentBits, Collection, MessageFlags } = require('discord.js');

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

client.once(Events.ClientReady, async () => {
  try {
    const channel = await client.channels.fetch(welcome_channel);
    channel.send('I am ready, what are we going to do?');
  } catch (err) {
    console.error('Failed to reach welcome channel', err);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (_) {
    await interaction.reply({
      content: 'There was an error while executing this command',
      flags: MessageFlags.Ephemeral
    });
  }
});

client.login(kairo_token);