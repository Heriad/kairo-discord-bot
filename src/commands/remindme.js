const { SlashCommandBuilder, MessageFlags } = require('discord.js');

const MAX_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days

function parseDuration(raw) {
  if (!raw) return null;
  const matches = raw.toLowerCase().match(/(\d+)([smhd])/g);
  if (!matches) return null;
  const unitMap = { s: 1000, m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000 };
  let total = 0;
  for (const token of matches) {
    const [, amount, unit] = token.match(/(\d+)([smhd])/);
    total += parseInt(amount, 10) * unitMap[unit];
  }
  if (total <= 0 || total > MAX_DURATION) {
    return null;
  }
  return total;
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (60 * 1000)) % 60;
  const hours = Math.floor(ms / (60 * 60 * 1000)) % 24;
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds && !days && !hours) parts.push(`${seconds}s`);
  return parts.join(' ');
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remindme')
    .setDescription('Sends a reminder after the specified time')
    .addStringOption(option =>
      option
        .setName('time')
        .setDescription('e.g. 10m, 2h, 1d2h')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('Reminder content')
        .setRequired(true)
    ),
  async execute(interaction) {
    const rawDuration = interaction.options.getString('time');
    const reminderText = interaction.options.getString('message');
    const duration = parseDuration(rawDuration);

    if (!duration) {
      await interaction.reply({ content: 'Enter the time in format e.g. 10m, 2h, 1d2h (max 7 days).', flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.reply({ content: `I will remind you in ${formatDuration(duration)}.`, flags: MessageFlags.Ephemeral });

    setTimeout(async () => {
      const reminderMessage = `⏰ Hey <@${interaction.user.id}>! Reminder: ${reminderText}`;
      try {
        await interaction.user.send(reminderMessage);
      } catch (error) {
        if (interaction.channel) {
          try {
            await interaction.channel.send(reminderMessage);
          } catch (_) {
            // Ignore error to avoid interrupting the reminder.
          }
        }
      }
    }, duration);
  }
};
