let smartcast = require('vizio-smart-cast');
let discord = require('discord.js');
require('dotenv').config()
const bitfield = 2146958847;
const client = new discord.Client();
const tv = new smartcast(process.env.SMARTCAST_IP, process.env.SMARTCAST_AUTH);

// DISCORD BOT
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content === '!help' || msg.content === '!commands') {
    msg.reply("```!on - Turns on TV.\n\!off - Turns off TV.\n\!atv - Turns on Apple TV.\n\!tv - Switches to TV input.\n\!xbox - Switches to TV/xbox input.\n\!smartcast - Switches to SMARTCAST input.```");
  }
})

client.on('message', (msg) => {
  if (msg.channel.permissionsFor(client.user).bitfield == bitfield) {
    if (msg.content === '!on' && msg.channel.id === process.env.DISCORD_CHANNEL_ID) {
      msg.reply('Turning on TV!');
      tv.control.power.on();
    } else if (msg.content === '!off' && msg.channel.id === process.env.DISCORD_CHANNEL_ID) {
      msg.reply('Turning off TV!');
      tv.control.power.off();
    } else if (msg.content === '!atv' && msg.channel.id === process.env.DISCORD_CHANNEL_ID) {
      tv.power.currentMode().then(data => {
        if (data.ITEMS[0].VALUE === 1) {
          msg.reply('Switching to Apple TV!');
          tv.input.set('HDMI-4');
        } else if (data.ITEMS[0].VALUE === 0) {
          msg.reply('Turning on TV and switching input!');
          tv.control.power.on().then(tv.input.set('HDMI-4'));
        };
      });
    } else if (msg.content === '!tv' && msg.channel.id === process.env.DISCORD_CHANNEL_ID) {
        tv.power.currentMode().then(data => {
          if (data.ITEMS[0].VALUE === 1) {
            msg.reply('Switching to TV!');
            tv.input.set('HDMI-1');
          } else if (data.ITEMS[0].VALUE === 0) {
            msg.reply('Turning on TV and switching input!');
            tv.control.power.on().then(tv.input.set('HDMI-1'));
          };
        });
    } else if (msg.content === '!xbox' && msg.channel.id === process.env.DISCORD_CHANNEL_ID) {
        tv.power.currentMode().then(data => {
          if (data.ITEMS[0].VALUE === 1) {
            msg.reply('Switching to Xbox!');
            tv.input.set('HDMI-1');
          } else if (data.ITEMS[0].VALUE === 0) {
            msg.reply('Turning on TV and switching input!');
            tv.control.power.on().then(tv.input.set('HDMI-1'));

          };
        });
    } else if (msg.content === '!smartcast' && msg.channel.id === process.env.DISCORD_CHANNEL_ID) {
        tv.power.currentMode().then(data => {
          if (data.ITEMS[0].VALUE === 1) {
            msg.reply('Switching to Smartcast!');
            tv.input.set('smartcast');
          } else if (data.ITEMS[0].VALUE === 0) {
            msg.reply('Turning on TV and switching input!');
            tv.control.power.on().then(tv.input.set('smartcast'));
          };
        });
    }
  }
})

client.login(process.env.DISCORD_TOKEN);