Daiagon Alley

Made By Dylan Breon

DAI is an ethereum based stable coin that is algorithmically pegged to the US dollar through the use of various smart contracts deployed on the Ethereum blockchain. It was created by MakerDAO and can be used just like any other Ethereum token in various transactions across different wallets. Among other uses, DAI can be utilized within any dapp that requires some sort of stable payment system. An important use case of DAI is its use as a stable way to hold decentralized currency. Its holders can avoid volatility of other offerings. This has led to the boom of platforms that allow users to lend and borrow DAI stablecoin. With these services one can borrow DAI and, because of its stable nature, pay it back at the same rate they borrow it at (plus interest). Lenders can also lend with these platforms and earn interest! This lending interest rate is the focus of this project.

Daiagon Alley is a dashboard to compare the interest rate for those lending the DAI stable coin
through 3 different providers:

- Compound Finance
- The Dai Savings Rate (by MakerDAO)
- Aaave Protocal

Users can get a high level view of the current rates and can further explore the historical rates of these 3 platforms overtime.

Getting started:

Prerequisites:
-Latest version of docker installed

For the first run of the app, start by running the following command within the main directory:

    make migrate

This initializes a our postgres volume with a table to store our rates.

To run the project any other occasion you simply need to call the following:

    make run

To stop the application (and remove the containers):

    make stop

If you want to just build the project and not run it you can run:

    make build

If you want to run docker in the forefront so you can see the log in the command line you can run:

    make dev

Design Considerations:

- While blueprinting the app's design I wanted to create what was closer to how the application may run in
  production instead of what will perform best when run locally after cloning this repo. An important consideration
  related to this was the best way to fetch past rates. While there are services such as subgraphs (thegraph.com) that
  I could possibly call to easily fetch this data across a wide time span with good performance, a core requirement of
  the project was to get more experience writing smart contracts myself to query on chain data and then utilize my contracts in my dApp. The idea of the rates graph was to get the rates for up to 128 blocks behind the current. I could have called my contract's current rate functions on past block numbers to fetch all this data but this would likely be highly intensive process and even if I could find other contracts that allow for range queries, I wanted my application to stay up to date with on chain data. I decided to instead create an event listener that fires on every new blocked mined on the block chain, calls my contract to get the latest rates, and stores these in postgres. The benefit of this design is 2 fold: the ability to do a range query over my sql database for efficient retrieval of past rates (vs many on demand calls for all these past blocks at request time), and the ability to have a "live feed" of the most up to date on chain data within my application. This approach builds a better foundation for future features to be built upon such as live, custom price notifications!

- Trade offs: Node's event driven, few threaded architecture may not always perform as well when running a consistent triggered event every ~12s (time between each new ETH block). This could lower performance locally, but in a production environment, the process updating the database would run on a separate server allowing for a consistent updates
  of the database without colliding with traffic connecting to our express endpoints.

- Another important consideration was the offloading of data conversion to my nodejs server instead of within my smart contract running on the blockchain. When writing smart contracts on the blockchain you have to be much more frugal in your
  use of processing time and memory. The decentralized architecture creates a totally different runtime environment than a dedicated process running your code. Additionally, Solidity is not the most flexible data type wise and does not play kind with floating point (doesn't support it). I made my functions view functions which are essentially read only functions that do not cost any gas to run. These smart contracts commonly use BigNumbers for their rates (usually the "Ray" type aka 10^27) This means I have to process the numbers on the server to convert them to a percentage rate before storing or displaying them to the user.

- Making this application extra extra pretty was not my core focus... My UI focus was useability. What I did not question was my ability to spend a lot of time fine tuning css and perfecting my use of React library to make it beautiful. I wanted to dedicate more time exploring the architecture and how I was going to create all these different entities, allow for their efficient communication, and, importantly, diving deep into the ethereum blockchain and learning all I can about smart contracts.

What's next / Future backlog:

- Using redis to cache fetched data from frequent requests could result in huge performance boosts. In common use cases many users, or even a single user, will commonly request the same data. Redis provides an extra fast, in-memory key-value store to cache responses to common requests.

- The current process of requesting the rate with EVERY new block is not an optimized approach. In my experience these rates do not change that quickly and it would be better to trigger this event less frequently. Smart contract have the ability to emit special events which can then be listened to by other contracts. If I was able to find a smart contract from these providers that emits events on price change only, I could fire events within my smart contracts to then query the updated rates, and then listen to these events from my server.

- As these rates usually do not change very often it may be better to display the graph with less values on the x axis and zoom out further to show only when the rate changes with less points in between.

- Better compatibility between the schema of my data and the rate graph data ingestion. The graph expects the data in a format that is not structured like my db schema. This leads to me needing 3 database calls over the same rows to get the column value for each rate for the graph. While more modification of the db schema could help, I don't really dig the mechanisms behind Nivo's graph library and intend to find a better way to display graphs anyway.

- Create a process to prune my database. If the app keeps running it will just keep adding a new row to the db every 12 seconds, a separate db management process (ideally run in production at a time with less users) could lighten the database by offloading old data to long term storage or deleting data all together.

- Created views in the postgres database. The application has commonly used queries that could be established as a materialized view for faster responses.

- Explore server side rendering options. My stack allows for flexible switching of server vs client side processing and rendering. ALL the kids these days are chatting about "SSR" apps and their support of fast initial page loads. While I do not think this application should totally become SSR, It deserves some trial as my site has a simple UI and is a read only site with no writes.

- Make it more pretty: get on that css grind

Other important notes:

- My smart contract is currently deployed on the Kovan test network. The numbers for these rates are all over the place on this network which means my application data looks **very** odd at times. This is **especially** apparent on the graph.

- The live updating database feature is tricky to ship over GitHub. The DB will be empty when you clone this file so the graph will not be very accurate. I thought about going to all these past blocks and doing many smart contract calls in situations where the database wasn't up to date but, again, I wanted to think about a "real life" system and how this may function in production, not that my application is production ready...

- Be sure to run make migrate on first run or whenever you prune your docker download of volumes and containers. If you have issues with the table not yet created you can delete the container, volumes, and images and have another go. If I am having serious issues I will usually run:

  docker compose down && docker volume prune && docker image prune && docker container prune && docker system prune

and then:

    make migrate

USE THIS DOCKER COMMAND AT OWN RISK. This clears out volumes, images, containers and other docker data that could be important to other instances you have.

Awesome Resources:

- https://makerdao.com/en/

- https://aave.com/

- https://compound.finance/

- https://decrypt.co/resources/dai-explained-guide-ethereum-stablecoin

- https://decrypt.co/resources/smart-contracts

- https://cryptozombies.io/

- https://remix.ethereum.org/

- https://nivo.rocks
