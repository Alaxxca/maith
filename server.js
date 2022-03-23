const dbd = require("dbd.js")

const bot = new dbd.Bot({
  token: "seu token",
  prefix: "$getServerVar[prefixo]"
})

bot.variables({
  prefixo: "m.",
  en_us: "on",
  pt_br: "off",
  dj: "off",
  djrole: "nada",
  usar_comandos: "desativado",
  status1: "m.help",
  status2: "You are a epic people <3"
})

bot.onMessage()

bot.command({
  name: "prefix",
  aliases: ["set-prefix", "change-prefix"],
  code: `
  <:verif:834083048709816371>| **My prefix has been changed to \`$getServerVar[prefixo]\`**
  $setServerVar[prefixo;$message[1];$guildID]


  $onlyPerms[manageserver;{author:Invalid Command! | Error 289:https://cdn.discordapp.com/attachments/834056076079923232/834058798317568020/flying.gif}{thumbnail: $userAvatar[802355278946500648]}{color:#8025db}{description: 
  <:arrow:834066858071425054> Command: **$getServerVar[prefixo;$guildID]prefix**
  <:arrow:834066858071425054> Permissions: **Manage Server**
  <:arrow:834066858071425054> Example: **$getServerVar[prefixo]prefix m!**
  
  <:faq:834069518934212609> **FAQ**
  The error 289 occurs when the user who executed the command, does not have the necessary permission to execute, if you are an administrator, ask your superior to grant the necessary permission (Probably he will not do this)}]


  $onlyIf[$message!=;{author:Invalid Command! | Error 297:https://cdn.discordapp.com/attachments/834056076079923232/834071783769899048/flying.gif}{thumbnail: $userAvatar[802355278946500648]}{color:#8025db}{description: 
  <:arrow:834066858071425054> Command: **$getServerVar[prefixo;$guildID]prefix**
  <:arrow:834066858071425054> Example: **$getServerVar[prefixo]prefix m!**
  
  <:faq:834069518934212609> **FAQ**
  The error 297 occurs when the user does not write anything when it is necessary to write, for example, use the play command without writing anything at all.}]`
})

bot.command({
  name: "play",
  aliases: ["p", "youtube"],
  code: ` 
  $author[Added in queue;$userAvatar[$clientID]]
  $color[#c542f5]
  $description[
    **Now Playing:** $songInfo[title]

    $addField[Queue:;$queueLength;yes]
  ]
  $textSplit[$playSong[$message;4s;yes;yes;];]
  $onlyIf[$message!=;{author:Invalid Command.:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:Please write something valid.}]
  $onlyIf[$voiceID[$authorID]!=;{author:Invalid Command.:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:Please connect to any voice channel on the server.}]
  
  $onlyBotPerms[speak;connect;{author:Invalid Command! | Error 308:https://cdn.discordapp.com/attachments/834056076079923232/834414045661495296/flying.gif}{thumbnail: $userAvatar[802355278946500648]}{color:#8025db}{description:
  <:arrow:834066858071425054> Command: **$getServerVar[prefixo]play**
  <:arrow:834066858071425054> Bot Permissions: **Connect & Speak**
  <:arrow:834066858071425054> Example: **$getServerVar[prefixo]play ily (i love you baby) (feat. Emilee)**
  
  <:faq:834069518934212609> **FAQ**
  The error 308 occurs when the bot (In this case, myself) does not have the necessary permissions, if you are an administrator, put the permissions that is requested in \`Bot permissions\`, thank you!}]
  
  $if[$getServerVar[dj]==on]
  $onlyForRoles[$getServerVar[djrole];{author:Missing permission:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:The administrator has activated DJ mode on this server, only people with the DJ position will be able to use my commands.}]
  $endIf
  $cooldown[2s;<:wait:835990250236280893> • Wait %time% before placing another song in the queue.]`
})

bot.command({
  name: "stop",
  code: `
  $stopSong
  **⏹ • The music was stopped.**
  $onlyIf[$voiceID[$authorID]==$voiceID[$clientID];{author:Hey, you’re not connected.:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:You can only stop if you are on the same voice channel as I am.}]
  $onlyIf[$queueLength!=0;{author:Hey, nothing is playing.:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:Nothing is playing for me to stop the music.}]
  
  $if[$getServerVar[dj]==on]
  $onlyForRoles[$getServerVar[djrole];{author:Missing permission:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:The administrator has activated DJ mode on this server, only people with the DJ position will be able to use my commands.}]
  $endIf
  $cooldown[3s;<:wait:835990250236280893> • Wait %time% before stoping the song again.]`
})

bot.command({
  name: "pause",
  code: `
  $pauseSong
  **⏸️ • Music was paused, type \`$getServerVar[prefixo]resume\` to return.**
  $onlyIf[$voiceID[$authorID]==$voiceID[$clientID];{author:Hey, you’re not connected.:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:You can only pause if you are on the same voice channel as I am.}]
  $onlyIf[$queueLength!=0;{author:Hey, nothing is playing.:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:Nothing is playing for me to pause the music.}]
  
  $if[$getServerVar[dj]==on]
  $onlyForRoles[$getServerVar[djrole];{author:Missing permission:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:The administrator has activated DJ mode on this server, only people with the DJ position will be able to use my commands.}]
  $endIf
  $cooldown[3s;<:wait:835990250236280893> • Wait %time% before pausing the song again.]`
})


bot.command({
  name: "resume",
  aliases: ["continue", "r"],
  code: `
  $resumeSong
  **▶️ • The song was successfully returned.**
  
  $onlyIf[$voiceID[$authorID]==$voiceID[$clientID];{author:Hey, you’re not connected.:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:You can only resume if you are on the same voice channel as I am.}]
  $onlyIf[$queueLength!=0;{author:Hey, nothing is playing.:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:Nothing is playing for me to resume the music.}]
  
  $if[$getServerVar[dj]==on]
  $onlyForRoles[$getServerVar[djrole];{author:Missing permission:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:The administrator has activated DJ mode on this server, only people with the DJ position will be able to use my commands.}]
  $endIf
  $cooldown[3s;<:wait:835990250236280893> • Wait %time% before resuming the song again.]`
})

bot.command({
  name: "skip",
  aliases: ["sk", "playnext"],
  code: `
	$skipSong
	$title[<a:disco:802579309151649792>| Music was skipped...]
	$color[#7106C9]

$onlyIf[$voiceID!=;<:errado:802555504927703112>| Unfortunately you are not connected to the voice channel to skip the music.]
$onlyBotPerms[connect;<:errado:802555504927703112>| Unfortunately I am not allowed to \`connect\` to this voice channel to skip the song.]
$onlyIf[$queueLength!=0;<:errado:802555504927703112>| Unfortunately no music is playing for me to skip the sound.]
$onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| You are unfortunately not connected to the same voice channel as I am to do this action, are you some kind of monster to end other people's fun?]

$if[$getServerVar[dj]==on]
$if[$getServerVar[pt_br]==on]
$onlyForRoles[$getServerVar[djrole];<:errado:802555504927703112>| O modo DJ esta ativado neste servidor, então apenas membros com meu cargo de DJ poderá usar meus comandos, desculpe-me.]
$endIf
$endIf

$if[$getServerVar[dj]==on]
$if[$getServerVar[en_us]==on]
$onlyForRoles[$getServerVar[djrole];<:errado:802555504927703112>| DJ mode is activated on this server, so only members with my DJ role will be able to use my commands, sorry.]
$endIf
$endIf
$cooldown[2s;{title:Hey, wait! :rage:}{color:#c603fc}{description:
You need to wait before using this command again. %time% to execute this command again.}]`
})

bot.command({
  name: "nowplaying",
  aliases: ["np", "now-playing", "songinfo"],
  code: `
  $if[$getServerVar[en_us]==on]
	$author[Now Playing ♬]
	$description[
    **I'm Playing:**
    **[$songInfo[title]]($songInfo[url])**

    $addField[Published by:;$songInfo[publisher];yes]
    $addField[Queue size:;$queueLength;yes]

    $addField[Position:;$songInfo[duration];yes]
    $addField[Time left to finish the sound:;$songInfo[duration_left];yes]]
$thumbnail[$songInfo[thumbnail]]
$footer[Music requested by $username[$songInfo[userID]] | $addTimestamp;$userAvatar[$songInfo[userID]]]

$suppressErrors[<:errado:802555504927703112>| There's nothing playing for me to show information about the song.]
$onlyIf[$queueLength!=0;<:errado:802555504927703112>| There's nothing playing for me to show information about the song]
$endIf

  $if[$getServerVar[pt_br]==on]
	$author[Está Tocando ♬]
	$description[
    **Eu estou tocando:**
    **[$songInfo[title]]($songInfo[url])**

    $addField[Publicado por:;$songInfo[publisher];yes]
    $addField[Tamanho da fila:;$queueLength;yes]

    $addField[Posição:;$songInfo[duration];yes]
    $addField[Tempo faltando para finalizar o som:;$songInfo[duration_left];yes]]
$thumbnail[$songInfo[thumbnail]]
$footer[Musica requisitada por: $username[$songInfo[userID]] | $addTimestamp;$userAvatar[$songInfo[userID]]]
$suppressErrors[<:errado:802555504927703112>| Não tem nada tocando para eu enviar informações sobre a música, isso é impossível.]
$onlyIf[$queueLength!=0;<:errado:802555504927703112>| Não tem nada tocando para eu enviar informações sobre a música, isso é impossível.]
$endIf

$cooldown[2s;{title:Hey, wait! :rage:}{color:#c603fc}{description:
You need to wait before using this command again. %time% to execute this command again.}]`
})

bot.command({
  name: "volume",
  aliases: ["vol", "set-volume"],
  code: `
$description[
<a:nota_music:803022229654601808>| The bot volume has been changed to \`$volume\`
]
$color[#7106C9]
$volume[$message[1]]

$onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| You are unfortunately not connected to the same voice channel as I am to do this action, are you some kind of monster to end other people's fun?]
$onlyIf[$message[1]<=200;<:errado:802555504927703112>| In order not to make your hearing worse, you cannot set a volume higher than 200%, thank you.]
$onlyIf[$voiceID!=;<:errado:802555504927703112>| Unfortunately you are not connected to the voice channel to change the volume.]
$onlyPerms[manageserver;<:errado:802555504927703112>| Unfortunately you are not allowed to __Manage Server__ to change the volume of the bot.]
$suppressErrors[<:errado:802555504927703112>| There is nothing playing to change the volume, or you have not entered a valid number.]

$cooldown[2s;{title:Hey, wait! :rage:}{color:#c603fc}{description:
You need to wait before using this command again. %time% to execute this command again.}]`
})

bot.command({
  name: "queue",
  code: `
  $title[<:title:835993070167654411> Queue]
  $color[#b342f5]
  $description[
    \`\`\`
  ✧♬•*¨*•.｡｡.•*¨*•♬✧
  Now playing: $songInfo[title]
  ✧♬•*¨*•.｡｡.•*¨*•♬✧


    $queue[1;20;{number} -> {title}]

    These are the first 20 next songs to be played, use $getServerVar[prefixo]play to play too
    \`\`\`]

   $onlyIf[$queueLength!=0;{author:Hey, nothing is playing.:https://cdn.discordapp.com/attachments/834056076079923232/835979373289930752/Error.gif}{color:#f01a1a}{description:Nothing is playing for me to show the music queue.}]`
})

bot.command({
  name: "loop",
  aliases: ["loop-queue", "loop-song", "looping"],
  code: `
$loopQueue
$if[$getServerVar[en_us]==on]
$title[<a:disco:802579309151649792>| Loop Queue]
$description[
Queue looping has been changed to allowed, or removed]

$onlyIf[$voiceID!=;<:errado:802555504927703112>| Unfortunately you are not connected to the voice channel to resume the music.]
$onlyBotPerms[connect;<:errado:802555504927703112>| Unfortunately I am not allowed to \`connect\` to this voice channel to loop the song.]
$onlyIf[$queueLength!=0;<:errado:802555504927703112>| Unfortunately no music is playing for me to loop the sound.]
$onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| You are unfortunately not connected to the same voice channel as I am to do this action, are you some kind of monster to end other people's fun?]
$endIf

$if[$getServerVar[pt_br]==on]
$sendMessage[{title: <a:disco:802579309151649792>| Looping da fila}{description: O looping da fila foi ativado, ou desativado};no]

$onlyIf[$voiceID!=;<:errado:802555504927703112>| Infelizmente você não esta conectado(a) em nenhum canal de voz]
$onlyBotPerms[connect;<:errado:802555504927703112>| Infelizmente eu não tenho permissão de \`conectar\` ao canal de voz para o looping.]
$onlyIf[$queueLength!=0;<:errado:802555504927703112>| Infelizmente não tem nada tocando para eu ativar ou desativar o looping]
$onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| Você Infelizmente não esta conectado no mesmo canal de voz que eu estou, você por acaso é algum tipo de pessoa que desejar acabar com a diversão dos outros?]
$endIf

$if[$getServerVar[dj]==on]
$if[$getServerVar[pt_br]==on]
$onlyForRoles[$getServerVar[djrole];<:errado:802555504927703112>| O modo DJ esta ativado neste servidor, então apenas membros com meu cargo de DJ poderá usar meus comandos, desculpe-me.]
$endIf
$endIf

$if[$getServerVar[dj]==on]
$if[$getServerVar[en_us]==on]
$onlyForRoles[$getServerVar[djrole];<:errado:802555504927703112>| DJ mode is activated on this server, so only members with my DJ role will be able to use my commands, sorry.]
$endIf
$endIf

$cooldown[2s;{title:Hey, wait! :rage:}{color:#c603fc}{description:
You need to wait before using this command again. %time% to execute this command again.}]`
})

//Ajudas

bot.command({
  name: "help",
  aliases: ["commands", "commandlist"],
  code: `
  $if[$getServerVar[en_us]==on]
$author[Bot commands]
$color[#7106C9]
$description[
My prefix in this server is \`$getServerVar[prefixo]\`

**Music**
\`play\`, \`stop\`, \`pause\`, \`resume\`, \`skip\`, \`nowplaying\`, \`volume\`, \`queue\`, \`loop\`, \`dmnp\`, \`panel\`, \`spotify\`

**Bot settings**
\`prefix\`, \`language\`, \`prune\`, \`dj\`

**General**
\`ping\`, \`vote\`, \`help\`, \`botinfo\`, \`bug-report\`]
$endIf

$if[$getServerVar[pt_br]==on]
$sendMessage[{title: Comandos do bot}{color:#7106C9}{description:
Meu prefixo neste servidor: \`$getServerVar[prefixo]\`

**Comandos de música**
\`play\`, \`stop\`, \`pause\`, \`resume\`, \`skip\`, \`nowplaying\`, \`volume\`, \`queue\`, \`loop\`, \`dmnp\`, \`panel\`,  \`spotify\`

**Confugurações do bot**
\`prefix\`, \`language\`, \`prune\`, \`dj\`

**Geral**
\`ping\`, \`vote\`, \`help\`, \`botinfo\`, \`bug-report\`};no]
$endIf
$cooldown[3s;{title:Hey, wait! :rage:}{color:#c603fc}{description:
You need to wait before using this command again. %time% to execute this command again.}]`
})

bot.command({
  name: "ping",
  code: `
$if[$getServerVar[en_us]==on]
$description[The ping of the bot is in $ping ms]
$color[#7106C9]
$endIf

$if[$getServerVar[pt_br]==on]
$sendMessage[{description: O ping do bot esta em $ping ms}{color:#7106C9};no]
$endIf`
})

bot.command({
  name: "botinfo",
  aliases: ["bot-info", "info-bot"],
  code: `
  $if[$getServerVar[en_us]==on]
<@!$authorID>
$title[Maith (Version $packageVersion)]
$color[#ac3dc4]
$description[
  $addField[Uptime;$uptime;yes]
  $addField[CPU;$cpu%;yes]
  $addField[RAM Usage;$ramMB;yes]
  $addField[Voice Channels;$allChannelsCount[voice];yes]
  $addField[Guilds;$serverCount;yes]
  $addField[Members;$allMembersCount;yes]
  **Developed by:** \`$username[592867068500508682]#$discriminator[592867068500508682]\`
]
$thumbnail[$userAvatar[802355278946500648]]
$endIf

$if[$getServerVar[pt_br]==on]
<@!$authorID>
$title[Maith (Version $packageVersion)]
$color[#ac3dc4]
$description[
  $addField[Uptime;$uptime;yes]
  $addField[CPU;$cpu%;yes]
  $addField[RAM Usage;$ramMB;yes]
  $addField[Canais de voz;$allChannelsCount[voice];yes]
  $addField[Guildas;$serverCount;yes]
  $addField[Membros;$allMembersCount;yes]
  **Desenvolvido por:** \`$username[592867068500508682]#$discriminator[592867068500508682]\`
]
$thumbnail[$userAvatar[802355278946500648]]
$endIf
$cooldown[2s;{title:Hey, wait! :rage:}{color:#c603fc}{description:
You need to wait before using this command again. %time% to execute this command again.}]`
})

bot.command({
  name: "dmnp",
  code: `
  $dm[$authorID]
  	$title[$songInfo[title];$songInfo[url]]
	$description[
<:title:802935420367142922>| I'm currently playing: **$songInfo[title]**

<:dono:802936271264677889>| Published by: **$songInfo[publisher]**

<:relogio:802935769844547595>| Music duration: **$songInfo[duration] minutes | $songInfo[duration_left] to finish the song**

<:voz:802936591923937280>| Music requested by: **$username[$songInfo[userID]] | $songInfo[userID]**]
$color[#7106C9]
$thumbnail[$songInfo[thumbnail]]

$suppressErrors[<:errado:802555504927703112>| There's nothing playing for me to show information about the song.]
$onlyIf[$queueLength!=0;<:errado:802555504927703112>| There's nothing playing for me to show information about the song]
$cooldown[2s;{title:Hey, wait! :rage:}{color:#c603fc}{description:
You need to wait before using this command again. %time% to execute this command again.}]
`
})

//Mentions

bot.command({
  name: "<@!802355278946500648>",
  code: `
  $if[$getServerVar[en_us]==on]
$description[Howdy, I'm Maith, I can play music in your discord server <a:nota_music:803022229654601808>, my prefix in this server is $getServerVar[prefixo] to listen to music write $getServerVar[prefixo]play [Add me clicking here\\](https://discord.com/oauth2/authorize?client_id=802355278946500648&scope=bot&permissions=3410944)]
$endIf

$if[$getServerVar[pt_br]==on]
$sendMessage[{description: Olá, eu sou a Maith, um ótimo bot para você ouvir música em seu servidor de discord <a:nota_music:803022229654601808>, my prefixo dentro deste servidor é \`$getServerVar[prefixo]\` para ouvir música escreva \`$getServerVar[prefixo]play\` [Me adicione clicando aqui\\](https://discord.com/oauth2/authorize?client_id=802355278946500648&scope=bot&permissions=3410944)};no]
$endIf`,
  nonPrefixed: true
})

bot.command({
  name: "<@802355278946500648>",
  code: `
  $if[$getServerVar[en_us]==on]
$description[Howdy, I'm Maith, I can play music in your discord server <a:nota_music:803022229654601808>, my prefix in this server is $getServerVar[prefixo] to listen to music write $getServerVar[prefixo]play [Add me clicking here\\](https://discord.com/oauth2/authorize?client_id=802355278946500648&scope=bot&permissions=3410944)]
$endIf

$if[$getServerVar[pt_br]==on]
$sendMessage[{description: Olá, eu sou a Maith, um ótimo bot para você ouvir música em seu servidor de discord <a:nota_music:803022229654601808>, my prefixo dentro deste servidor é \`$getServerVar[prefixo]\` para ouvir música escreva \`$getServerVar[prefixo]play\` [Me adicione clicando aqui\\](https://discord.com/oauth2/authorize?client_id=802355278946500648&scope=bot&permissions=3410944)};no]
$endIf`,
  nonPrefixed: true
})

//votes


bot.command({
  name: "vote",
  aliases: ["voting", "dbl"],
  code: `
  $if[$getServerVar[en_us]==on]
  $title[
    Vote]
  $color[#cb60db]
  $description[
    [Vote for Maith on top.gg\\](https://top.gg/bot/802355278946500648/vote)]
    $endIf
    
  $if[$getServerVar[pt_br]==on]
  $sendMessage[{title: Vote em mim!}{color:#cb60db}{description:[Vote na Maith pela top.gg\\](https://top.gg/bot/802355278946500648/vote)};no]
  $endIf`
})

//callbacks

bot.musicEndCommand({
  channel: "$channelID",
  code: `
  $if[$getServerVar[en_us]==on]
  $title[Thank you for using me! :wave:]
  $color[#ca6fe8]
  $description[
    Thank you very much for using my service.
    
    **Do you want to help me?**
    Consider helping me by adding me to your beautiful server! [Click here to add me in your server](https://discord.com/oauth2/authorize?client_id=802355278946500648&scope=bot&permissions=8)]
    $image[$randomText[https://cdn.discordapp.com/attachments/829749554869436456/829749626579582976/wallpapersden.com_minimal-planet-red-background_2560x1600.jpg;https://cdn.discordapp.com/attachments/829749554869436456/829749682321752065/solar_system_wallpaper_076_-_2802x1576.jpg;https://cdn.discordapp.com/attachments/829749554869436456/829749714836389908/xs2t5siri4y01.jpg]]
  $endIf
  
  $if[$getServerVar[pt_br]==on]
  $title[Obrigado por me usar! :wave:]
  $description[
    Muito Obrigado por utilizar meu serviço.
    
    **Você quer me ajudar?**
    Considere me ajudar me adicionando em seu belo servidor. [Clique aqui para me adicionar](https://discord.com/oauth2/authorize?client_id=802355278946500648&scope=bot&permissions=8)]
  $image[$randomText    [https://cdn.discordapp.com/attachments/829749554869436456/829749626579582976/wallpapersden.com_minimal-planet-red-background_2560x1600.jpg;https://cdn.discordapp.com/attachments/829749554869436456/829749682321752065/solar_system_wallpaper_076_-_2802x1576.jpg;https://cdn.discordapp.com/attachments/829749554869436456/829749714836389908/xs2t5siri4y01.jpg]]
  $endIf`
})

bot.musicStartCommand({
  channel: "$channelID",
  code: `
  $if[$getServerVar[en_us]==on]
  $description[Now I'm playing: **$songInfo[title]** requested by ** $username[$songInfo[userID]] **.]
  $color[#f246c1]
  $endIf
  $if[$getServerVar[pt_br]==on]
  $sendMessage[{description: Agora eu estou tocando **$songInfo[title]** requisitada por ** $username[$songInfo[userID]] **.}{color:#f246c1};no]
  $endIf`
})

bot.command({
  name: "clouster",
  aliases: ["check-uptime", "clouster-ping"],
  code: `
  $title[Painel de controle]
  $description[

\`\`\`
Intel(R) Xeon(R) CPU E5-2630L v3 @ 1.80GHz

1 <                    > 0.30%
2 <                    > 0.15%
3 <                    > 0.34%
4 <                    > 0.36%
5 <                    > 0.38%

5 CPU Opened\`\`\`




\`\`\`
Toal Memory used      : $ram
CPU    : $cpu



OS Release       : Debian GNU/Linux 9
Uptime           : $uptime
Arch             : x64
Bot Version      : v1.9.4
\`\`\`]
$color[#eb4034]
$onlyForIDS[592867068500508682;]`
})

bot.botJoinCommand({
  channel: "801836065384038433",
  code: `
  $title[Eu fui adicionada em um servidor]
  $color[#f54242]
  $description[
    Nome do servidor: ** $serverName **
    ID do servidor: ** $guildID **
    Link: $getServerInvite]`
})
bot.onGuildJoin()


bot.command({
  name: "botleave",
  code: `
  $botLeave[$message]
  $addCmdReactions[:X:]
  $onlyForIDS[592867068500508682;]`
})

bot.command({
  name: "panel",
  aliases: "painel",
  code: `
  $if[$getServerVar[en_us]==on]
    $reactionCollector[$splitText[1];$authorID;3m;⏭️,⏸️,▶️,⏹️,🔁,🔇;skip,pause,play,stop,loop,mute;no]
    $textSplit[$sendMessage[{description: Now I'm playing: **$songInfo[title]** requested by ** $username[$songInfo[userID]] **.}{color:#f246c1};yes]; ]
    $endIf

    $if[$getServerVar[pt_br]==on]
        $reactionCollector[$splitText[1];$authorID;3m;⏭️,⏸️,▶️,⏹️,🔁,🔇;skip,pause,play,stop,loop,mute;no]
    $textSplit[$sendMessage[{description: Agora eu estou tocando **$songInfo[title]** requisitada por ** $username[$songInfo[userID]] **.}{color:#f246c1};yes]; ]
    $endIf
  $if[$getServerVar[dj]==on]
  $if[$getServerVar[pt_br]==on]
  $onlyForRoles[$getServerVar[djrole];<:errado:802555504927703112>| O modo DJ esta ativado neste servidor, então apenas membros com meu cargo de DJ poderá usar meus comandos, desculpe-me.]
  $endIf
  $endIf

  $if[$getServerVar[dj]==on]
  $if[$getServerVar[en_us]==on]
  $onlyForRoles[$getServerVar[djrole];<:errado:802555504927703112>| DJ mode is activated on this server, so only members with my DJ role will be able to use my commands, sorry.]
  $endIf
  $endIf
    $cooldown[3m; :clock10: Wait %time% to use this command again]`
})

bot.awaitedCommand({
  name: "pause",
  code: `
  $pauseSong
  $if[$getServerVar[en_us]==on]
  **Music has been paused**
  $endIf
  $if[$getServerVar[pt_br]==on]
  **A música foi pausada**
  $endIf
  
  $onlyIf[$voiceID!=;<:errado:802555504927703112>| Unfortunately you are not connected to the voice channel to pause the music.]
$onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| You are unfortunately not connected to the same voice channel as I am to do this action, are you some kind of monster to end other people's fun?]
$onlyIf[$queueLength!=0;<:errado:802555504927703112>| Unfortunately no music is playing for me to pause the sound.]`
})

bot.awaitedCommand({
  name: "skip",
  code: `
  $skipSong
  $if[$getServerVar[en_us]==on]
  **The song was skipped**
  $endIf
  $if[$getServerVar[pt_br]==on]
  **A música foi pulada com sucesso**
  $endIf
  
  $onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| You are unfortunately not connected to the same voice channel as I am to do this action, are you some kind of monster to end other people's fun?]`
})

bot.awaitedCommand({
  name: "play",
  code: `
  $resumeSong
  $if[$getServerVar[en_us]==on]
  **Music was resumed**
  $endIf

  $if[$getServerVar[pt_br]==on]
  **A música foi retornada**
  $endIf
  
  $onlyIf[$voiceID!=;<:errado:802555504927703112>| Unfortunately you are not connected to the voice channel to resume the music.]
  $onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| You are unfortunately not connected to the same voice channel as I am to do this action, are you some kind of monster to end other people's fun?]`
})

bot.awaitedCommand({
  name: "stop",
  code: `
  $stopSong
  $if[$getServerVar[en_us]==on]
  **The music was stopped**
  $endIf
  $if[$getServerVar[pt_br]==on]
  **A música foi parada**
  $endIf
  
    $onlyIf[$voiceID!=;<:errado:802555504927703112>| Unfortunately you are not connected to the voice channel to stop the music.]

    $onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| You are unfortunately not connected to the same voice channel as I am to do this action, are you some kind of monster to end other people's fun?]`
})

bot.awaitedCommand({
  name: "loop",
  code: `
  $loopQueue
  $if[$getServerVar[en_us]==on]
  **The music loop has been enabled, or disabled.**
  $endIf
  $if[$getServerVar[pt_br]==on]
  **O looping da música foi ativado, ou desativado**
  $endIf
  
  $onlyIf[$voiceID!=;<:errado:802555504927703112>| Unfortunately you are not connected to the voice channel to resume the music.]
  $onlyBotPerms[connect;<:errado:802555504927703112>| Unfortunately I am not allowed to \`connect\` to this voice channel to loop the song.]
  $onlyIf[$queueLength!=0;<:errado:802555504927703112>| Unfortunately no music is playing for me to loop the sound.]
  $onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| You are unfortunately not connected to the same voice channel as I am to do this action, are you some kind of monster to end other people's fun?]`
})

bot.awaitedCommand({
  name: "mute",
  code: `
  $if[$volume!=1]
  $if[$getServerVar[en_us]==on]
  $volume[1]
  **The volume of the song has been muted, press the reaction again to return to the default song sound**
  $endIf
  $endIf

  $if[$volume==1]
  $if[$getServerVar[en_us]==on]
  $volume[100]
  **The sound was returned to the default of 100%**
  $endIf
  $endIf
  
  $if[$volume==1]
  $if[$getServerVar[pt_br]==on]
  $volume[100]
  **O som foi retornado ao volume padrão de 100%**
  $endIf
  $endIf

  $if[$volume!=1]
  $if[$getServerVar[pt_br]==on]
  $volume[1]
  **O volume foi definido para 0%, aperte na reação novamente para retornar ao volume padrão**
  $endIf
  $endIf
  
  $onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| You are unfortunately not connected to the same voice channel as I am to do this action, are you some kind of monster to end other people's fun?]`
})

bot.command({
  name: "setlang_ptbr",
  code: `
  $setServerVar[en_us;off;$guildID]
  $setServerVar[pt_br;on;$guildID]
  $title[Ok, eu irei falar em Português do Brasil aqui neste servidor.]
  $color[#e96eeb]
  
    $onlyPerms[manageserver;<:errado:802555504927703112>|You are not allowed to \`manage server\` to change bot language]`
})

bot.command({
  name: "setlang_enus",
  code: `
  $setServerVar[pt_br;off;$guildID]
  $setServerVar[en_us;on;$guildID]
  $title[Ok, i'll speak en-us in this server]
  $color[#e96eeb]
  
  $onlyPerms[manageserver;<:errado:802555504927703112>|You are not allowed to \`manage server\` to change bot language]`
})

bot.command({
  name: "language",
  aliases: "linguagem",
  code: `
  $title[Bot language]
  $color[#fc7ced]
  $description[
      **:flag_us:| English**
    \`$getServerVar[prefixo]setlang_enus\`
    
    **:flag_br:| Português do Brasil**
    \`$getServerVar[prefixo]setlang_ptbr\`]`
})

bot.command({
  name: "prune",
  aliases: ["clearbot", "prune-bot"],
  code: `
  $addCmdReactions[✅]
  $clear[100;802355278946500648]
  $if[$getServerVar[en_us]==on]
  $onlyPerms[managemessages;{title: Prune | What does it do?}{description: 
  The prune command was developed to delete the last 100 messages sent by me (I will only delete the messages I sent in the last 2 weeks)

  **User permissions:**
  Manage Messages (You lack this permission)

  **Aliases:** "clearbot" and "prune-bot".}{color:#eb34a4}]
  $endIf
  
  $if[$getServerVar[pt_br]==on]
  $onlyPerms[managemessages;{title: Prune | O que isto faz?}{description: 
  O comando de prune foi desenvolvido para deletar as ultimas 100 mensagens enviadas por mim(Eu só irei deletar mensagens antes de duas semanas)

  **Permissões do usuário:**
  Gerenciar mensagens (Lhe falta esta permissão)

  **Outras formas de executar o comando:** "clearbot" e "prune-bot".}{color:#eb34a4}]
  $endIf`
})

//DJS

bot.command({
  name: "djrole",
  aliases: ["dj-role", "create-djrole"],
  code: `
  $setServerVar[dj;on;$guildID]
  $setServerVar[djrole;$findRole[DJ Maith];$guildID]
  $if[$getServerVar[pt_br]==on]
  :tada:| **Eu criei o cargo de DJ em seu servidor, agora apenas membros com o cargo de <@&$findRole[DJ Maith]> poderão usar meus comandos.**
  $createRole[DJ Maith]
  $onlyIf[$getServerVar[djrole]==nada;<:errado:802555504927703112>| Você já criou um cargo de DJ neste servidor, use \`$getServerVar[prefixo]djrole_delete\` para deletar o antigo cargo do meu banco de dados.]
  $onlyPerms[manageserver; <:errado:802555504927703112>| Você não tem permissão para \`Gerenciar Servidor\` para utilizar este comando.]
    $onlyBotPerms[manageroles; <:errado:802555504927703112>| Não tenho permissão para \`Gerenciar Cargos\` para criar um cargo de DJ.]
  $endIf
  
  $if[$getServerVar[en_us]==on]
  :tada:| **I created the DJ position on your server, now only members with the position of <@&$findRole[DJ Maith]> will be able to use my commands.**
  $createRole[DJ Maith]

$onlyPerms[manageserver;
<:errado:802555504927703112>| You are not allowed to \`Manage Server\` to use this command.]
  $onlyIf[$getServerVar[djrole]==nada;<:errado:802555504927703112>| You have already created a DJ position on this server, use \`$getServerVar[prefixo]djrole_delete \` to delete the old position from my database.]

  $onlyBotPerms[manageroles; <:errado:802555504927703112>| I am not allowed to \`Manage Roles\` to create a dj role.]
  $endIf`
})

bot.command({
  name: "djrole_delete",
  code: `
  $setServerVar[djrole;nada;$guildID]
  $deleteRoles[$getServerVar[djrole]]
  $addCmdReactions[✅]
  
  $if[$getServerVar[en_us]==on]
  $onlyPerms[manageserver;
  <:errado:802555504927703112>| You are not allowed to \`Manage Server\` to use this command.]
  $onlyIf[$getServerVar[djrole]!=nada;<:errado:802555504927703112>| You have not created a DJ position on this server, use \`$getServerVar[prefixo]djrole\` to create the DJ role.]
  $onlyBotPerms[manageroles; <:errado:802555504927703112>| I am not allowed to \`Manage Roles\` to delete a dj role.]
  $endIf
  
  $if[$getServerVar[pt_br]==on]
  $onlyBotPerms[manageroles; <:errado:802555504927703112>| Não tenho permissão para \`Gerenciar Cargos\` para deletar o cargo de DJ.]
    $onlyIf[$getServerVar[djrole]!=nada;<:errado:802555504927703112>| Você não criou um cargo de DJ neste servidor, use \`$getServerVar[prefixo]djrole\` para criar o cargo.]
  $onlyPerms[manageserver; <:errado:802555504927703112>| Você não tem permissão para \`Gerenciar Servidor\` para utilizar este comando.]
  $endIf`
})

bot.command({
  name: "dj",
  code: `
  $if[$getServerVar[pt_br]==on]
  $title[Cargo de DJ]
  $color[#b84fdb]
  $description[
    Caso você queira que apenas pessoas com certo cargo poderão utilizar de meus comandos, este é o local exato!
    
    **O que isto faz?**
    Basicamente, caso você ative estas opções, eu não deixarei que pessoas sem meu cargo de DJ possa usar meus comando de música, muito útil para aquele seu amigo que você não quer de jeito nenhum que ele escute algum som em seu servidor.
    
    **Comandos:**
    **$getServerVar[prefixo]djrole (Cria um cargo de DJ)**
    
    **$getServerVar[prefixo]djrole_delete (Deleta o cargo de DJ que eu criei)**
    
    Permissões que eu preciso: **Gerenciar Cargos**
    Permissões que você precisa: **Gerenciar Servidor**]
  $endIf
  
  $if[$getServerVar[en_us]==on]
  $title[DJ Role]
  $color[#b84fdb]
  $description[
    If you want only people with a certain position to be able to use my commands, this is the exact place!
    
    **What does this do?**
    Basically, if you activate these options, I will not let people without my DJ position to use my music controls, very useful for that friend of yours that you do not want him to hear any sound on your server at all.
    
    **Commands:**
    **$getServerVar[prefixo]djrole** (Create a DJ role)
    **$getServerVar[prefixo]djrole_delete** (Delete my DJ role from your server)
    
    
  Permissions I need: **Manage Role**
  Permissions you need: **Manage Server**]
  $endIf`
})

bot.command({
  name: "spotify",
  code: `
  $playSpotify[$message[1];yes;erro]
  $If[$getServerVar[pt_br]==on]
  $onlyIf[$voiceID!=;<:errado:802555504927703112>| Você não esta conectado em nenhum canal de voz.]
  $onlyIfMessageContains[$message;https://open.spotify.com/playlist/;<:errado:802555504927703112>| Informe um link **url** válido de alguma playlist. Exemplo: \`$getServerVar[prefixo]spotify https://open.spotify.com/playlist/4BmEGXbzxyxQpqIfRrTGHV\`]
  $onlyBotPerms[speak;connect;<:errado:802555504927703112>| Eu não tenho permisssão de \`conectar\` e \`falar\` dentro do servidor para tocar alguma música.]
  $endIf
  
  $If[$getServerVar[en_us]==on]

  $onlyIfMessageContains[$message;https://open.spotify.com/playlist/;<:errado:802555504927703112>| Enter a valid **url** link for any playlist. Example: \`$getServerVar[prefixo]spotify https://open.spotify.com/playlist/4BmEGXbzxyxQpqIfRrTGHV\`]
  $onlyIf[$voiceID!=;<:errado:802555504927703112>| You are not connected to any voice channels.]
  $onlyBotPerms[speak;connect;<:errado:802555504927703112>| I am not allowed to \`connect \` and \`talk \` inside the server to play any music.]
  $endIf

$if[$queueLength!=0]
$if[$getServerVar[pt_br]==on]
$onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| Você não está no mesmo canal de voz que eu estou, decepcionante.]
$endIf
$endIf

$if[$queueLength!=0]
$if[$getServerVar[en_us]==on]
$onlyIf[$voiceID[$authorID]==$voiceID[802355278946500648];<:errado:802555504927703112>| You are not on the same channel that I am on to play a playlist.]
$endIf
$endIf

$if[$getServerVar[dj]==on]
$if[$getServerVar[pt_br]==on]
$onlyForRoles[$getServerVar[djrole];<:errado:802555504927703112>| O modo DJ esta ativado neste servidor, então apenas membros com meu cargo de DJ poderá usar meus comandos, desculpe-me.]
$endIf
$endIf

$if[$getServerVar[dj]==on]
$if[$getServerVar[en_us]==on]
$onlyForRoles[$getServerVar[djrole];<:errado:802555504927703112>| DJ mode is activated on this server, so only members with my DJ role will be able to use my commands, sorry.]
$endIf
$endIf

$cooldown[4s;{title:Hey, wait! :rage:}{color:#c603fc}{description:
You need to wait before using this command again. %time% to execute this command again.}]`
})


bot.command({
  name: "bug-report",
  code: `
  $if[$getServerVar[pt_br]==on]
  $author[Reporte bugs.;https://cdn.discordapp.com/attachments/801836065384038433/829718835045203988/bughunter.png]
  $color[#67ed55]
  $description[
    Então você, <@!$authorID>, gosta de reportar bugs? Isso é música para meus ouvidos! 
    
    Nós fornecemos recompensas para nossos relatores de bugs da $username[802355278946500648] :heart:
    
    **Como vou fazer o relato do bug?**
    Basta você clicar [aqui](https://forms.gle/n9fhTgYYBEVeXkCX7) para entrar no formulário de Reporte

    [Caso não consiga entrar por ali, tente clicando aqui](https://forms.gle/n9fhTgYYBEVeXkCX7)]
    $image[https://wallpapercave.com/wp/wp4566755.jpg]
    $thumbnail[https://cdn.discordapp.com/attachments/801836065384038433/829718835045203988/bughunter.png]
    $endIf
    
  $if[$getServerVar[en_us]==on]
  $author[Reporting Bugs.;https://cdn.discordapp.com/attachments/801836065384038433/829718835045203988/bughunter.png]
  $color[#67ed55]
  $description[
    So you, <@!$authorID>, like to report bugs? This is music to my ears!
    
    We provide rewards for our $username[802355278946500648] bug reporters :heart:
    
    **How will I report the bug?**
     Just click [here](https://forms.gle/n9fhTgYYBEVeXkCX7) to enter the Report form

    [If you can't get in there, try clicking here](https://forms.gle/n9fhTgYYBEVeXkCX7)]
    $image[https://wallpapercave.com/wp/wp4566755.jpg]
    $thumbnail[https://cdn.discordapp.com/attachments/801836065384038433/829718835045203988/bughunter.png]
    $endIf`
})

bot.command({
  name: "support",
  code: `
  Hey, check your dm!
  $dm
  https://discord.gg/aNvwsKrFe2`
})
