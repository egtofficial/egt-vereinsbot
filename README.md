egt-vereinsbot
==============

Vereinsbot für Elysium Gaming Tübingen e.V.

# Usage
```sh-session
$ egt-vereinsbot (-v|--version|version)
$ egt-vereinsbot --help [COMMAND]
USAGE
  $ egt-vereinsbot COMMAND
...
```

# API Keys
You need to pass the tokens for EasyVerein and the discord bot as environment variables.
```bash
EASYVEREIN_TOKEN=easyverein-api-token BOT_TOKEN=discord-bot-token ./bin/run bot
```
Eventually you will handle this with [pm2](https://pm2.keymetrics.io/) since the bot should always run.

# Commands
* egt-vereinsbot bot
