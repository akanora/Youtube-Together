const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', { token: 'token', totalShards: 'auto', respawn: true });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();