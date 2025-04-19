const express = require('express');
const app = express();

require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const client = new Client();

// ✅ Heroku-compatible port binding
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(PORT, () => console.log(`Web server running on port ${PORT}.`));

// 🔐 Config
const TOKEN = process.env.TOKEN;
const CHANNEL_ID = "1268315944141324369"; // Channel to send messages to
const GUILD_ID = "1353309496134467634"; // Server ID

// 📢 Your base ad message
const baseMessage = `
**Selling JB items** for PAYPAL/CRYPTO. I also accept RBX 💸 
Torpedo 19.5$ (2x) | Javelin 17.3 (3x) Beignet 13$ (3x)| Celsior 12.8$ (5x) | Proto-8 11.5$ (3x) | Arachnid 9$ (3x) | Beam Hybrid 7.6$ (2x) | Icebreaker 7.2$ (2x) | M12 5.9$ (1x) | Banana Car 5.3$ (2x) | Crew Capsule 4.3$ (0x) | Bandit 3.6 (2x) | Parisian 3.4$ (2x) | Aperture 3.2$ (0x) | Rattler 2.8$ (x3) | Scorpion 2.6$ (x5) | Carbonara 2.4$ (1x) | Goliath 1.7$ (0x) | Torero 1.5$ (2x) | Brulee 1.45$ (x10) |  Wedge $1.25 (x0) | Bloxy $1 (x1) | Storm rider $1 (x90)  |  Longhorn 0.75$ (1x) | Shell Classic 0.65$ (2x) | Megalodon 0.65 (2x)
-
**SPOILERS :wing: **:
Checker 11$ (3x) | Drip 6.5$ (1x) | Thrusters 9$ (4x) | 3x Bicycle Rack 2.5$ (1x)
-
**RIMS & TIRES :white_circle: **:
Void rims 10$ (3x) | Brickset tire 9$ (1x) | Spinners 6$ (5x) | Snowflake 1.5$ (1x) | Hypno 3$ (3x) | Track toy 1$ (1x)
-
**TEXTURES & COLORS :rainbow: **:
1x Vantablack | 1x Hyperpink lvl 5 | 1x Hyperorange lvl 5 | 1x Hypergreen lvl 5 | 1x Hyperdiamond lvl 5 | 1x Hyperyellow lvl 5 | 1x Hyperblue lvl 5 | 1x Hyperred lvl 5 | 1x Hyperyellow lvl 4 | 1x Hyperpurple lvl 3
-----------------------------------------------------
*DM @jb_marketplace for other items not available on this list*
-------------------------------------------------
-
Using a **TRUSTED MM** or **YGF**  (45+ vouches!)
*preferably purchases over 10$*
-
**Feel free to dm me with the items and the payment method!!**
`;

function insertZeroWidthSpace(text) {
  const positions = [10, 30, 50, 70];
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
  if (!channel) return console.error("❌ Channel not found");

  let counter = 1;

  const sendLoop = async () => {
    while (counter <= 1000000) {
      const message = insertZeroWidthSpace(baseMessage);
      try {
        await channel.send(message);
        console.log(`✅ Sent message #${counter}, waiting...`);
      } catch (err) {
        console.error(`❌ Error sending message #${counter}:`, err.message);
      }
      counter++;
      const delay = getRandomInterval();
      console.log(`⏱️ Waiting ${delay / 1000}s`);
      await new Promise((r) => setTimeout(r, delay));
    }
  };

  sendLoop();
});

client.login(TOKEN);
