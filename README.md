<div align="center">
<img alt="Hashstack Logo" src="https://hashstack.finance/company_logos/hashstack.svg" height="76" />
<h1 style="margin: 0">Hashstack</h1>
</div>

<p align="center">
DISCORD MODERATION BOT - HASH
</p>

<p align="center">
    <img src="https://img.shields.io/badge/version-1.0.0-yellowgreen" alt="version 1.0.0"/>
    <img src="https://img.shields.io/badge/author-Hashstack-green" alt="author Hashstack"/>
</p>

## Commands 🔧

- **Common Commands**

  - **`/commands` - Get a list of all the commands**
  - **`/` - Get the answers to FAQs**

- **#gm Channel Commands**

  - **`!gm` - Post gm and get the data about streak and total counts**
  - **`!gn` - Post gn and get the data about streak and total counts**
  - **`!gmLeaderboard -a` - Get the leaderboard of GMs for all time**
  - **`!gmLeaderboard -m` - Get the leaderboard of GMs for last 30 days**
  - **`!gmLeaderboard -w` - Get the leaderboard of GMs for last 7 days**
  - **`!gnLeaderboard -a` - Get the leaderboard of GNs for all time**
  - **`!gnLeaderboard -m` - Get the leaderboard of GNs for last 30 days**
  - **`!gnLeaderboard -w` - Get the leaderboard of GNs for last 7 days**

## Functionalities 💻

- Sends a Welcome Message to every new joinee 🎉
- Timeouts new joinees for 30 mins ⏲️
- Supports captcha validation system to verify timedout users 🟢
- Gives answers to FAQs ❔
- Deletes messages against community guidelines 🔴
- Displays gm/gn record of each user 📢
- Disallows mass pinging and using blacklisted words/links/invites 🚫

## Installation 🔧

#### Install dependencies and build the server

```
$ yarn && yarn build
```

#### Setup Environment

```
$ .env // setup env with reference to .env.example
```

#### Start the development server

```
$ yarn dev
```

#### Start the server

```
$ yarn start
```

## Production
* MongoDB deployed at https://cloud.mongodb.com/ using dev@hashstack.finance (Google login). Its a serverless instance deployed to AWS. 
* Instance managed in above url but billing managed by our AWS account
* We subscribed to this: https://aws.amazon.com/marketplace/pp/prodview-pp445qepfdy34
* DB name: discord-moderation-prod
* Secrets are stored in AWS secrets