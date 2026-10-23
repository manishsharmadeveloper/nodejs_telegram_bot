
require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    throw new Error(
        "TELEGRAM_BOT_TOKEN is missing from your .env file."
    );
}

const bot = new TelegramBot(token, {
    polling: true,
});

bot.on("polling_error", (error) => {
    console.error("Telegram polling error:", error.message);
});

bot.onText(/^\/start(?:@\w+)?(?:\s|$)/, async (msg) => {
    await bot.sendMessage(
        msg.chat.id,
        "Hello! Welcome to my Node.js Telegram bot.\n\n" +
        "Available commands:\n" +
        "/start - Start the bot\n" +
        "/help - Show help\n" +
        "/about - About this bot\n\n" +
        "Send me any text and I will repeat it."
    );
});

bot.onText(/^\/help(?:@\w+)?(?:\s|$)/, async (msg) => {
    await bot.sendMessage(
        msg.chat.id,
        "How to use this bot:\n" +
        "/start - Start the bot\n" +
        "/help - Display help\n" +
        "/about - Bot information\n\n" +
        "You can also send a normal text message."
    );
});

bot.onText(/^\/about(?:@\w+)?(?:\s|$)/, async (msg) => {
    await bot.sendMessage(
        msg.chat.id,
        "I am a Telegram bot built with Node.js " +
        "and the node-telegram-bot-api library."
    );
});

bot.on("message", async (msg) => {
    const text = msg.text;

    // Ignore commands and non-text messages.
    if (!text || text.startsWith("/")) {
        return;
    }

    try {
        await bot.sendMessage(msg.chat.id, text);
    } catch (error) {
        console.error("Failed to send message:", error.message);
    }
});

console.log("Node.js Telegram bot is running...");
