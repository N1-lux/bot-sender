const express = require('express');
const app = express();

require("dotenv").config();
require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const client = new Client();

app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(3000, () => console.log('Web server running on port 3000.'));

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = "1268315944141324369"; // Where to send
const GUILD_ID = "1353309496134467634"; // Server ID

// Base message (your full ad)
const baseMessage = `
**Selling JB items** for PAYPAL/CRYPTO. I also accept RBX :money_with_wings: 
Torpedo 19.5$ (0x) | Javelin 17.3 (4x) Beignet 12.8$ (5x)| Celsior 12.8$ (3x) | Proto-8 11.5$ (2x) | Arachnid 9$ (1x) | Beam Hybrid 7.6$ (3x) | Icebreaker 7.2$ (2x) | M12 5.9$ (2x) | Banana Car 5.3$ (2x) | Crew Capsule 4.3$ (0x) | Bandit 3.6 (3x) | Parisian 3.4$ (2x) | Aperture 3.2$  | Rattler 2.8$ (x3) | Scorpion 2.6$ (x5) | Carbonara 2.4$ (0x) | Goliath 1.7$ (1x) | Torero 1.5$ (2x) | Brulee 1.45$ (x12) |  Wedge $1.25 (x2) | Bloxy $1 (x1) | Storm rider $1 (x82)  |  Longhorn 0.75$ (1x) | Shell Classic 0.65$ (1x) | Megalodon 0.65 (1x)
-
**SPOILERS :wing: **:
Checker 11$ (2x) | Thrusters 9$ (4x) | 3x Bicycle Rack 2.5$ (1x)
-
**RIMS & TIRES :white_circle: **:
Void rims 10$ (3x) | Brickset tire 9$ (1x) | Spinners 6$ (3x) | Snowflake 1.5$ (1x) | Hypno 3$ (3x) | Track toy 1$ (1x)
-
**TEXTURES & COLORS :rainbow: **:
Hyperorange lvl 5 -  10$ | Hyperpink lvl 5 - 19$| Vantablack 8.5$ (1x) | Orange lvl 3 2.1$ (1x)
-----------------------------------------------------
*DM@jb_marketplace for other items not available on this list*
-------------------------------------------------
-
Using a **TRUSTED MM** or **YGF**  (35+ vouches!)
*preferably purchases over 10$*
-
**Feel free to dm me with the items and the payment method!!**
`;

function insertZeroWidthSpace(text) {
  const positions = [10, 30, 50, 70]; // Insert invisible char at these spots (not too early)
  for (let pos of positions) {
    if (text.length > pos) {
      text = text.slice(0, pos) + "\u200B" + text.slice(pos);
    }
  }
  return text;
}

function getRandomInterval(min = 15, max = 30) {
  return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}`);

  const channel = client.channels.cache.get(CHANNEL_ID);
  if (!channel) return console.error("Channel not found");

  const sendLoop = async () => {
    while (true) {
      const message = insertZeroWidthSpace(baseMessage);
      channel.send(message).catch(console.error);
      const delay = getRandomInterval();
      console.log(`Sent message, waiting ${delay / 1000}s`);
      await new Promise((r) => setTimeout(r, delay));
    }
  };

  sendLoop();
});

client.login(TOKEN);