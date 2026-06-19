require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],

  partials: [Partials.Message, Partials.Reaction],
});

client.commands = new Collection();

// Session state
client.sessionHost = null;
client.sessionCoHost = null;
client.sessionLink = null;
client.sessionFrpSpeed = null;
client.sessionPeacetime = null;
client.sessionHC = null;
client.reinviteLink = null;
client.reinviteReleased = false;

// ── LOAD COMMANDS ────────────────────────────────────────────────────────────
console.log("[Loader] Starting command load...");
try {
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((f) => f.endsWith(".js"));

  for (const file of commandFiles) {
    try {
      const command = require(`./commands/${file}`);

      // Validate command structure
      if (!command || !command.data || !command.execute) {
        console.warn(`⚠️  Command ${file} is missing required fields (data, execute)`);
        continue;
      }

      client.commands.set(command.data.name, command);
      console.log(`  ✅ Command: ${command.data.name}`);
    } catch (err) {
      console.error(`  ❌ Failed to load command ${file}:`, err.message);
    }
  }
  console.log(`[Loader] ✅ Loaded ${client.commands.size} commands\n`);
} catch (err) {
  console.error("[Loader] ❌ Critical error loading commands:", err);
  process.exit(1);
}

// ── LOAD EVENTS ──────────────────────────────────────────────────────────────
console.log("[Loader] Starting event load...");
try {
  const eventFiles = fs
    .readdirSync("./events")
    .filter((f) => f.endsWith(".js"));

  for (const file of eventFiles) {
    try {
      const event = require(`./events/${file}`);

      // Validate event structure
      if (!event || !event.name || !event.execute) {
        console.warn(`⚠️  Event ${file} is missing required fields (name, execute)`);
        continue;
      }

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
      console.log(`  ✅ Event: ${event.name}`);
    } catch (err) {
      console.error(`  ❌ Failed to load event ${file}:`, err.message);
    }
  }
  console.log(`[Loader] ✅ Loaded events\n`);
} catch (err) {
  console.error("[Loader] ❌ Critical error loading events:", err);
  process.exit(1);
}

// ── LOAD EMBEDS (message commands) ───────────────────────────────────────────
console.log("[Loader] Starting embed load...");
try {
  const embedFiles = fs
    .readdirSync("./embeds")
    .filter((f) => f.endsWith(".js"));

  if (embedFiles.length === 0) {
    console.log("[Loader] ℹ️  No embed files found (optional)\n");
  } else {
    for (const file of embedFiles) {
      try {
        const event = require(`./embeds/${file}`);

        // Validate embed structure
        if (!event || !event.name || !event.execute) {
          console.warn(`⚠️  Embed ${file} is missing required fields (name, execute)`);
          continue;
        }

        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args, client));
        } else {
          client.on(event.name, (...args) => event.execute(...args, client));
        }
        console.log(`  ✅ Embed: ${event.name}`);
      } catch (err) {
        console.error(`  ❌ Failed to load embed ${file}:`, err.message);
      }
    }
    console.log(`[Loader] ✅ Loaded embeds\n`);
  }
} catch (err) {
  console.error("[Loader] ❌ Critical error loading embeds:", err);
  process.exit(1);
}

client.once("clientReady", () => {
  console.log(`🚔 Babbu's Greenville Roleplay Online — ${client.user.tag}`);
  client.user
    .setPresence({
      activities: [],
      status: "online",
    })
    .catch((err) => console.error("[Ready] Failed to set presence:", err));
});

client.on("error", (err) => {
  console.error("[Client Error]", err);
});

client.on("warn", (msg) => {
  console.warn("[Client Warn]", msg);
});

if (!process.env.TOKEN) {
  console.error("[Error] TOKEN environment variable not set. Check .env file.");
  process.exit(1);
}

client.login(process.env.TOKEN).catch((err) => {
  console.error("[Login Error] Failed to login:", err.message);
  process.exit(1);
});
