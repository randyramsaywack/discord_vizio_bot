let smartcast = require('vizio-smart-cast');
let discord = require('discord.js');
require('dotenv').config()
const bitfield = 2146958847;
const client = new discord.Client();
const living_room_tv = new smartcast(process.env.SMARTCAST_IP_LIVING_ROOM, process.env.SMARTCAST_AUTH_LIVING_ROOM);
const randy_room_tv = new smartcast(process.env.SMARTCAST_IP_RANDY_ROOM, process.env.SMARTCAST_AUTH_RANDY_ROOM);

// DISCORD BOT
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content === '!help' || msg.content === '!commands') {
    msg.reply("```Living Room TV\n!on - Turns on TV.\n\!off - Turns off TV.\n\!atv - Turns on Apple TV.\n\!tv - Switches to TV input.\n\!xbox - Switches to TV/xbox input.\n\!smartcast - Switches to SMARTCAST input.\n\nRandy's Room TV```");
  }
})

client.on('message', (msg) => {
  if (msg.channel.permissionsFor(client.user).bitfield == bitfield) {
    if (msg.content === '!on' && msg.channel.id === process.env.DISCORD_CHANNEL_ID_LIVING_ROOM) {
      msg.reply('Turning on TV!');
      living_room_tv.control.power.on();
    } else if (msg.content === '!off' && msg.channel.id === process.env.DISCORD_CHANNEL_ID_LIVING_ROOM) {
      msg.reply('Turning off TV!');
      living_room_tv.control.power.off();
    } else if (msg.content === '!atv' && msg.channel.id === process.env.DISCORD_CHANNEL_ID_LIVING_ROOM) {
      living_room_tv.power.currentMode().then(data => {
        if (data.ITEMS[0].VALUE === 1) {
          msg.reply('Switching to Apple TV!');
          living_room_tv.input.set('HDMI-4');
        } else if (data.ITEMS[0].VALUE === 0) {
          msg.reply('Turning on TV and switching input!');
          living_room_tv.control.power.on().then(tv.input.set('HDMI-4'));
        };
      });
    } else if (msg.content === '!tv' && msg.channel.id === process.env.DISCORD_CHANNEL_ID_LIVING_ROOM) {
        living_room_tv.power.currentMode().then(data => {
          if (data.ITEMS[0].VALUE === 1) {
            msg.reply('Switching to TV!');
            living_room_tv.input.set('HDMI-1');
          } else if (data.ITEMS[0].VALUE === 0) {
            msg.reply('Turning on TV and switching input!');
            living_room_tv.control.power.on().then(tv.input.set('HDMI-1'));
          };
        });
    } else if (msg.content === '!xbox' && msg.channel.id === process.env.DISCORD_CHANNEL_ID_LIVING_ROOM) {
        living_room_tv.power.currentMode().then(data => {
          if (data.ITEMS[0].VALUE === 1) {
            msg.reply('Switching to Xbox!');
            living_room_tv.input.set('HDMI-1');
          } else if (data.ITEMS[0].VALUE === 0) {
            msg.reply('Turning on TV and switching input!');
            living_room_tv.control.power.on().then(tv.input.set('HDMI-1'));
          };
        });
    } else if (msg.content === '!smartcast' && msg.channel.id === process.env.DISCORD_CHANNEL_ID_LIVING_ROOM) {
        living_room_tv.power.currentMode().then(data => {
          if (data.ITEMS[0].VALUE === 1) {
            msg.reply('Switching to Smartcast!');
            living_room_tv.input.set('smartcast');
          } else if (data.ITEMS[0].VALUE === 0) {
            msg.reply('Turning on TV and switching input!');
            living_room_tv.control.power.on().then(living_room_tv.input.set('smartcast'));
          };
        });
    }
  }
})

client.on('message', (msg) => {
    if (msg.channel.permissionsFor(client.user).bitfield == bitfield) {
        if (msg.content === '!on' && msg.channel.id === process.env.DISCORD_CHANNEL_ID_RANDY_ROOM) {
            msg.reply('Turning on TV!');
            randy_room_tv.control.power.on();
        } else if (msg.content === '!off' && msg.channel.id === process.env.DISCORD_CHANNEL_ID_RANDY_ROOM) {
            msg.reply('Turning off TV!');
            randy_room_tv.control.power.off();
        } else if (msg.content === '!tv' && msg.channel.id === process.env.DISCORD_CHANNEL_ID_RANDY_ROOM) {
            randy_room_tv.power.currentMode().then(data => {
              if (data.ITEMS[0].VALUE === 1) {
                msg.reply('Switching to TV!');
                randy_room_tv.input.set('HDMI-1');
              } else if (data.ITEMS[0].VALUE === 0) {
                msg.reply('Turning on TV and switching input!');
                randy_room_tv.control.power.on().then(randy_room_tv.input.set('HDMI-1'));
              };
            });
        } else if (msg.content === '!smartcast' && msg.channel.id === process.env.DISCORD_CHANNEL_ID_RANDY_ROOM) {
            randy_room_tv.power.currentMode().then(data => {
              if (data.ITEMS[0].VALUE === 1) {
                msg.reply('Switching to Smartcast!');
                randy_room_tv.input.set('smartcast');
              } else if (data.ITEMS[0].VALUE === 0) {
                msg.reply('Turning on TV and switching input!');
                randy_room_tv.control.power.on().then(randy_room_tv.input.set('smartcast'));
              };
            });
        }
    }
})

client.login(process.env.DISCORD_TOKEN);