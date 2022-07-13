const Discord = require('discord.js')

exports.run = (client, message, args) => {

 

  let command;
  if (client.commands.has(args.slice(0).join(' '))) {
    command = args.slice(0).join(' ');
  } else if (client.aliases.has(args.slice(0).join(' '))) {
    command = client.aliases.get(args.slice(0).join(' '));
  }

  if (!args[0]) return message.reply("komut ısmı yazmassan nası baslatcm")
  if (!command) {

    return message.reply("Botta `" + args.slice(0).join(' ') + "` komutu bulamıyorum");
  } else {

    message.channel.send("`" + command + "` ısmındekı komutu yenıde baslatıorum suan bekle...")
      .then(message => {

        client.reload(command)
          .then(() => {
            message.edit("`" + command + "` komut yenıden baslatıldı ");
          })

          .catch(e => {
            message.edit(`komut klasorde \`${command}.js\` dosya bulanamadı.`);
          });
      });
  }
    
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
   permLevel: 5,
}

exports.help = {
    name: 'reload',
    description: 'sa.',
    usage: 'as',

}
