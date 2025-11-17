# Kairo Discord Bot
Lightweight Discord bot with slash commands for fun facts (`/catto`, `/doggo`, `/zenquote`), quick info (`/crypto`, `/weather`) and utility (`/remindme`).

## Requirements
- Node.js 18+
- Discord application + bot token from the [Developer Portal](https://discord.com/developers/applications)
- Weatherstack API key (only if you want `/weather` to work)

## Installation
```bash
git clone https://github.com/Heriad/kairo-discord-bot.git
cd kairo-discord-bot
npm install
```

## Configuration (`src/config.json`)
Create the file with:

```json
{
	"kairo_token": "BOT_TOKEN",
	"welcome_channel": "TEXT_CHANNEL_ID",
	"clientId": "APPLICATION_ID",
	"guildId": "GUILD_ID_FOR_COMMANDS",
	"weather_api_key": "WEATHERSTACK_KEY"
}
```

- `kairo_token` – bot token from the *Bot* tab.
- `welcome_channel` – text channel where startup messages/reminders are posted.
- `clientId` – application (client) ID used when registering slash commands.
- `guildId` – server ID for instant command registration (global commands take longer to propagate).
- `weather_api_key` – required for `/weather` calls.

## Run
```bash
npm start
```
This registers slash commands for the configured guild and launches the bot.

## Core commands
- `/catto`, `/doggo [breed]` – random cat/dog images.
- `/crypto` – BTC/ETH/NEXO spot prices.
- `/weather location:<city>` – current conditions from Weatherstack.
- `/zenquote` – random quote.
- `/remindme time:<e.g. 15m> message:<text>` – schedules a reminder via DM (falls back to the channel if DMs are blocked).
