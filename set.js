const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUxudGF3b05LWURyMTZhV1RYcTFlamxNaGJGNUFIWmdzQnBLT0M5OTFYMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWitRTXFqbHBnMURqYVdyK0w3OU9ZUHhTMXdXYjJWNlYyR3pIYmJ0MmRXVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTQzJxY0MyV25IblEwSUU1dUw0THNzTXc3QW1aM2IyanNOd0R0M3ZpRkhZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtMDdEWkl5b1ZKT2hpTXRVei9lR1hrcCtoUER5VFo0U1Q2b09kdlF5aFF3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1KM00rRWNPNi9JRzZBNG82dXo0QlU4MEx3YzE5VEpJaENrSlRuK1JRMnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNCQzdIWlhNbGZ1VUJGNUVMWTRWOE4vVUxEY2hyZ1Z3d2hqNGhqblgveWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNERGalJEM29YOWdla3NseE1rdktOZkhrL2dPR0x6ekoxcElGRGlHanNrWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiekdQK0VnemErOWNrSGcwa1ZlVStPS0tjUDdaVzFZaVpWOVVWRXNDOU5DOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpVSEMweDB3RCtMRk1LY2NyYnVjSnJrV21vOFQzekZ1UDlmRXB2aDdRblFjQ2tWRVpFSFhFMDhtLzRSUVNEa01tNFZsem5hS2ZJbmpwekJ4SVRkampRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ5LCJhZHZTZWNyZXRLZXkiOiJTQWI1a0JmalNpdmpORSt3bXNSd2FGM2hJTS96c3VLek5WNzJkaDV4OExNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI3VFgwcm5WTlQxbUx3M1Z1TGJaVzJBIiwicGhvbmVJZCI6IjUzZTgwNTZhLWU3M2UtNDA1Yy1iMTU3LTY2ZDkxZDgwZWQ0MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxK3dpVzJlS2V4UDI0VHRWMEgwVlAxUzhTdEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOUxoNjNvTWpKWGJoallhWlZnSXl4cXpBazhVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRUSERUMlIxIiwibWUiOnsiaWQiOiIxODc2ODM3NTI1NDo4NUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT2YzbEs0REVQdm90N29HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWXVMbWRYMzZ3bEQ3d1JCeWVFSXVBZTNIeW9KSHhiZllONjVRem5ONnZUVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiM2Y2T0JUUjJza2Fsajhoa1R6U1NVUmVwQklwS1IwZVVMemJOclNxckttUXVKdHcwT1UvSUtjK29TRDJoWDFTbjNkaVBJS0gzRHJkU1hjVGZ4ZUpWQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IjJWNURiV0lOTXd0MzRYcDlPR2t6alk0NThmaGc0c3I4b2lVRkNrdm9GVmIyQUc2ZHZHZjh6QkhFU1k4MHVKTTBLN1B6UmNmL3JSTUtNR0FoRXQ2NGhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTg3NjgzNzUyNTQ6ODVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV0xpNW5WOStzSlErOEVRY25oQ0xnSHR4OHFDUjhXMzJEZXVVTTV6ZXIwMSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzE2MjEyMH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "♡zak♡",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "18768375254",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'true',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
