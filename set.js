const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUpxTFVkT0YvVUlqY3ZxSDlSWFZvcTZNRjVMdGREQUtteHlyM0E5SVRGbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid21RTjZzaGVjeWFBTDR2cE1lMDd3ZHZnVTEvdlZLOTd5OWpFMXRjaHJRcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSGJ6MzVEZ0VzeTlLcys3dVVhWTlBZlRybkNRSW5rTDllZVVGdXhaRDFnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIreW5qK2ZQVlJ3ZzJDQW0xSm5WM2NJZjUvYzBlY2xjTDdOV25SbXNEa3pnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1HZFk4Q280ek9ZZXovRnhVdU1yc3lVNk14Y09PdHV4ODA5Z29hc1g0RW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IngzbmphZ2RYT1c1eFdYL1JBMXV6eW80RCtjNCtkb2pnd1RZd09HY3RuQUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk8ydm9Ucm00N0oraDBQckdSUm1iZkhISXBXS2NIWkgweU8xbmVORktVYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0s4Ly9naDRPRmZGd0YxbmRsRHJYZUU0NVQ5L25NUmN1TWFmVWt6UWFXUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhDVnlpN29WcHR2TmU5RFoxK01NSTlJQkkxVHdVYVZ0dmZPRHpEUmRmaGRtdjlCdzdiZjVYYjdONzV2UU4xZEZDMmh0Qlp0S0J3Q1Z4ZnExbDZaa2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUzLCJhZHZTZWNyZXRLZXkiOiIyd1ZZdXNnVUNPOU1wbVZBUTZLcDVPTEQ0ajNBZkNVQ2dCZjNoODQwZ2JJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjE4NzY1MDMwMTI0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjEyMTFDOENCN0ZERDU5NzE5MEFDODJGOUVFOUMxRThDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTU0MzY5MjN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InEtZkVtUHdoUU5lWjZ6NGZoSjY4bWciLCJwaG9uZUlkIjoiZmNiOTJlYzgtNGRkOS00MzkwLTlmZWUtZGRhNjdhNDAzODJlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ill2Qld4Z0NUM2g3QndTU0FWVCtkYjMxT3JxZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4ZXJaMlFrYkdJODlXajZ0RkdxOU5jdlBvbmM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUjQzWUhBMkYiLCJtZSI6eyJpZCI6IjE4NzY1MDMwMTI0OjEzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuC8kuKAryDigK/vuI/ig53igK8gUs6jzpRMIFrOlEvigK8g4oCv77iP4oOd4oCvIOC8kiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTnJqbm93RUVPajYvYkVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoid1NVcGNBdjgwcWdwNUhVTlh4WDVHbitPS09JbUI5cTk1cVk5UTRpci8zaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoid1hxM3QzUzgrM2k1c0pHMHR6OHI3aXd5WHo2aDRRc3ZLYnhrK0h0NDBRK3dOZlhaOFdzMUl2YTZORlN5S1dyVzZsVlh5TkcvWUNBeElZZDl0NUZ1QWc9PSIsImRldmljZVNpZ25hdHVyZSI6InJhcndreklDYjlHREoya0p1SmdWNUV6ajdhVFhPZzNRdXNodm5uMGJrREE2b1kwZklBcURyem5SenFyNWwzcWVKQTVTNUNJNFJUM1htTzVPOFNTTWhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTg3NjUwMzAxMjQ6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY0VsS1hBTC9OS29LZVIxRFY4VitScC9qaWppSmdmYXZlYW1QVU9JcS85NSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNTQzNjkxNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQeGIifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
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
