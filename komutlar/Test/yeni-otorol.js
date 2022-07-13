const Discord = require("discord.js");
const qdb = require("quick.db");
exports.run = async (client, message, args) => {
  
  
  var a = await qdb.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  
  if (a) {
    var p = a;
  }
  if (!a) {
    
  var p = await qdb.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  }
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("##0000c8")
        .setDescription(
          ` ⚠️ Lütfen bir komut belirtin. Eğer otorolü kullanmayı bilmiyorsanız \`${p}otorol yardım\` ⚠️`
        )
    );
  if (args[0] === "ayarla") {
    if (!args[1])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(
            ` ⚠️ Lütfen bir komut belirtin. Eğer otorolü kullanmayı bilmiyorsanız \`${p}otorol yardım\` ⚠️`
          )
      );
    if (args[1] === "kanal") {
      var kanal =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[2]);
      if (!kanal)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#0000c8")
            .setDescription(
              ` ⚠️ Lütfen bir kanal belirtin. Eğer otorolü kullanmayı bilmiyorsanız \`${p}otorol yardım\` ⚠️`
            )
        );
      qdb.set(`otorolkanali_${message.guild.id}`, kanal.id);
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Otorol kanalı ayarlandı!`)
      );
    }
    if (args[1] === "üye") {
      var rol =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[2]);
      if (!rol)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#0000c8")
            .setDescription(
              ` ⚠️ Lütfen bir rol belirtin. Eğer otorolü kullanmayı bilmiyorsanız \`${p}otorol yardım\` ⚠️`
            )
        );
      qdb.set(`otoroluye_${message.guild.id}`, rol.id);
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Otorol üye rolü ayarlandı!`)
      );
    }
    if (args[1] === "bot") {
      var rol =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[2]);
      if (!rol)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#0000c8")
            .setDescription(
              ` ⚠️ Lütfen bir rol belirtin. Eğer otorolü kullanmayı bilmiyorsanız \`${p}otorol yardım\` ⚠️`
            )
        );
      qdb.set(`otorolbot_${message.guild.id}`, rol.id);
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Otorol bot rolü ayarlandı!`)
      );
    }
  }
  if (args[0] === "mesaj") {
    if (!args[1])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(
            ` ⚠️ Lütfen bir tür belirtin. Eğer otorolü kullanmayı bilmiyorsanız \`${p}otorol yardım\` ⚠️`
          )
      );
    if (args[1] === "embed") {
      var text = args.slice(2).join(" ");
      if (!text)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#0000c8")
            .setDescription(
              ` ⚠️ Lütfen bir mesaj belirtin. Eğer otorolü kullanmayı bilmiyorsanız \`${p}otorol yardım\` ⚠️`
            )
        );
      if (text.length > 1000)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#0000c8")
            .setDescription(` ⚠️ Mesajınız 1000 karakterden fazla! ⚠️`)
        );
      qdb.set(`otorolmesajtur_${message.guild.id}`, "embed");
      qdb.set(`otorolmesaji_${message.guild.id}`, text);
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Otorol mesajı \`embed\` olarak ayarlandı!`)
      );
    }
    if (args[1] === "normal") {
      var text = args.slice(2).join(" ");
      if (!text)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#0000c8")
            .setDescription(
              ` ⚠️ Lütfen bir mesaj belirtin. Eğer otorolü kullanmayı bilmiyorsanız \`${p}otorol yardım\` ⚠️`
            )
        );
      if (text.length > 1000)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#0000c8")
            .setDescription(` ⚠️ Mesajınız 1000 karakterden fazla! ⚠️`)
        );
      qdb.delete(`otorolmesajtur_${message.guild.id}`);
      qdb.set(`otorolmesaji_${message.guild.id}`, text);
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#0000c8")
          .setDescription(`Otorol mesajı \`düz yazı\` olarak ayarlandı!`)
      );
    }
    if (args[1] === "resim") {
      if (qdb.has(`otorolmesajtur_${message.guild.id}`)) {
        var link = args.slice(2).join(" ");
        if (!link)
          return message.channel.send(
            new Discord.MessageEmbed()
              .setColor("#0000c8")
              .setDescription("Bir link belirtin!")
          );
        if (!link.startsWith("http"))
          return message.channel.send(
            new Discord.MessageEmbed()
              .setColor("#0000c8")
              .setDescription("Link `http` ile başlamıyor yada geçersiz link")
          );
        qdb.set(`otorolresim_${message.guild.id}`, link); 
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#0000c8")
            .setDescription("Otorol embed mesaj resim/gif'i ayarlandı!")
        );
      } else
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#0000c8")
            .setDescription(
              "Resim ekliyebilmem için embed mesaja ihtiyacım var!"
            )
        );
    }
  }
  if (args[0] === "kapat") {
    if (!args[1]) {
      qdb.delete(`otorolkanali_${message.guild.id}`);
      qdb.delete(`otoroluye_${message.guild.id}`);
      qdb.delete(`otorolbot_${message.guild.id}`);
      qdb.delete(`otorolmesajtur_${message.guild.id}`);
      qdb.delete(`otorolmesaji_${message.guild.id}`);
      qdb.delete(`otorolresim_${message.guild.id}`);
      const embed = new Discord.MessageEmbed()
        .setColor("#0000c8")
        .setTitle(`Otorol`)
        .setDescription(
          `Otorol başarıyla kapatıldı.`
        )
      /*  .setFooter(`${message.author.username} istedi!`)
        .setTimestamp();*/
      function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

      message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor("#0000c8")
            .setDescription(`Otorol sıfırlanıyor!`)
        )
        .then(message => {
          sleep(5000);

          message.edit(embed);
        });
    }
    if (args[1] === "kanal") {
      qdb.delete(`otorolkanali_${message.guild.id}`);
      const embed = new Discord.MessageEmbed()
        .setColor("#0000c8")
        .setTitle(`Otorol`)
        .setDescription(`Otorol kanalı kapatıldı.`)
      /*  .setFooter(`${message.author.username} istedi!`)
        .setTimestamp();*/
      return message.channel.send(embed);
    }
    if (args[1] === "üye") {
      qdb.delete(`otoroluye_${message.guild.id}`);
      const embed = new Discord.MessageEmbed()
        .setColor("#0000c8")
        .setTitle(`Oto Rol`)
        .setDescription(`Otorol Üye Rolü kapatıldı.`)
        /*.setFooter(`${message.author.username} istedi!`)
        .setTimestamp();*/
    }
    if (args[1] === "bot") {
      qdb.delete(`otorolbot_${message.guild.id}`);
      const embed = new Discord.MessageEmbed()
        .setColor("#0000c8")
        .setTitle(`Otorol`)
        .setDescription(`Otorol Bot Rolü Sıfırlandı!`)
       /* .setFooter(`${message.author.username} istedi!`)
        .setTimestamp();*/
      return message.channel.send(embed);
    }
    if (args[1] === "mesaj") {
      qdb.delete(`otorolmesajtur_${message.guild.id}`);
      qdb.delete(`otorolmesaji_${message.guild.id}`);
      qdb.delete(`otorolresim_${message.guild.id}`);
      const embed = new Discord.MessageEmbed()
        .setColor("#0000c8")
        .setTitle(`Oto Rol Sistemi`)
        .setDescription(`Otorol Mesajı Sıfırlandı!`)
      return message.channel.send(embed);
    }
  }
  if (args[0] === "bilgi") {
    var olumlu = "<:onay:746367770731741205> ";
    var olumsuz = "<:hata:746320500359430184> ";
    if (qdb.has(`otorolkanali_${message.guild.id}`)) {
      var a = olumlu;
    } else {
      var a = olumsuz;
    }
    if (qdb.has(`otoroluye_${message.guild.id}`)) {
      var b = olumlu;
    } else {
      var b = olumsuz;
    }
    if (qdb.has(`otorolbot_${message.guild.id}`)) {
      var c = olumlu;
    } else {
      var c = olumsuz;
    }
    if (qdb.has(`otorolmesaji_${message.guild.id}`)) {
      var d = olumlu;
    } else {
      var d = olumsuz;
    }
    const embed = new Discord.MessageEmbed()
      .setColor("#0000c8")
      .setTitle(`Oto Rol Sistemi`)
      .setThumbnail(client.user.avatarURL())
      .addField("Otorol kanalı", a, true)
      .addField("Otorol üye rolü", b, true)
      .addField("Otorol bot rolü", c, true)
      .addField("Otorol Mesajı", d, true)
    return message.channel.send(embed);
  }

  if (args[0] === "yardım") {
    if (!args[1]) {
      const embed = new Discord.MessageEmbed()
        .setColor("#0000c8")
        
        .setDescription(
          `
Otomatik Rol Sistemi

  **${p}otorol ayarla kanal <kanal>** : Otorol kanalını ayarlar.
  
  **${p}otorol ayarla üye <rol>** : Otorol üye rolünü ayarlar.
  
  **${p}otorol ayarla bot <rol>** : Otorol bot rolünü ayarlar.
  
  **${p}otorol mesaj <tür> <mesaj>** : Otorol mesajını ayarlar.
  \`Detaylı bilgi için ${p}otorol yardım mesaj\`
  
  **${p}otorol sıfırla** : Otorol veritabanını sıfırlar. 
  \`Detaylı bilgi için ${p}otorol yardım sıfırla\`
  
  **${p}otorol bilgi** : Ayarlanan işlemleri gösterir.
  
  **${p}otorol yardım** : Otorol Yardım Menüsü
  `
        )
       
      return message.channel.send(embed);
    }
    if (args[1] === "mesaj") {
      const embed = new Discord.MessageEmbed()
        .setColor("#0000c8")
        .setTitle(`Oto Rol Sistemi`)
        .setDescription(
          `
  **✉️ ${p}otorol mesaj embed <mesaj>** : Otorol mesajını \`embed\` olarak ayarlar.
  
  **🖼️ ${p}otorol mesaj resim <link>** : Embed Mesaj'a Gif/Resim ekler.
  
  **💬 ${p}otorol mesaj normal <mesaj>** : Otorol mesajını \`düz yazı\` olarak ayarlar.
  
  👥 \`{kullanıcı}\` Kullanıcıyı belirtir.
  
  🔥 \`{sunucu}\` Sunucuyu belirtir.
  
  🧑 \`{rol}\` Rol'ü belirtir.
  `
        )
      return message.channel.send(embed);
    }
    if (args[1] === "sıfırla") {
      const embed = new Discord.MessageEmbed()
        .setColor("#0000c8")
        .setTitle(`Oto Rol Sistemi`)
        .setDescription(
          `
    **☠️ ${p}otorol kapat** : Tüm veritabanını sıfırlar.
    
    **💬 ${p}otorol kapat mesaj** : Otorol mesajını kapatır.
    
    **🛠️ ${p}otorol kapat kanal** : Otorol kanalını kapatır.
    
    **🤖 ${p}otorol kapat bot** : Bot rolünü kapatır.
    
    **🧑 ${p}otorol kapat üye** : Üye rolünü kapatır.
    `
        )
        .setFooter(`${message.author.username} istedi..`)
        .setTimestamp();
      return message.channel.send(embed);
    }
  }
};
exports.conf = {
  aliases: [],
  permLevel: 5
};
exports.help = {
  name: "adm-otorol"
};
