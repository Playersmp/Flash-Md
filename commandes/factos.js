const { zokou } = require('../framework/zokou');
const { default: axios } = require('axios');
//const conf = require('../set');



zokou({nomCom:"fact",reaction:"📡",categorie:"NEW"},async(dest,zk,commandeOptions)=>{


      const { data } = await axios.get(`https://nekos.life/api/v2/fact`)
        return zk.reply(`*Fact:* ${data.fact}\n\n*Powered by FLASH-MD*`)   
    }

)