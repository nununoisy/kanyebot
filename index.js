const Discord = require('discord.js');
const MarkovChain = require('purpl-markov-chain');
const kanye = require('./kanye.json');

const client = new Discord.Client();
const tweets = kanye.tweets.map(tweet=>tweet.full_text.replace(/https:\/\/t\.co\/.{10}/g, '').replace(/[\s\n]+/g,' ').trim()).filter(tweet=>tweet);

const chain = new MarkovChain();
tweets.forEach(tweet=>chain.update(tweet));

client.once("ready", ()=>{
    console.log('Logged in to Discord');
});

client.on('message', message=>{
    if (message.author.id===client.user.id) return;
    let chance = Math.random() > 0.9925 || (message.author.id==='580473757903224842' && message.mentions.has(client.user));
    if (chance) {
        let tweet = chain.generate();
        console.log('Responding', tweet);
        message.channel.send(tweet);
    } else {
        console.log('Not responding');
    }
});

client.on('messageReactionAdd', reaction => {
    console.log(reaction.emoji.name, reaction.users.cache.map(u=>`${u.username}#${u.discriminator}`), reaction.message.content);
})

client.login(process.env.BOTTOKEN)