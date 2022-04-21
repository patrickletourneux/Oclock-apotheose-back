# backend files for CduProps

project end of O'Clock training dev fullstack Javascript 
november 2021/ april 2022

with Guillaume, Axel , Amélie, Anne, Patrick

Node.js server with postgresql bdd

## local installation steps

- clone the repo on your machine,
stay in branch master

- instal package 
``` npm i ```

- create bdd postgresql

    psql create a user with password<br>
    psql create a bdd

- copy sqitch.conf.example to sqitch.conf and modify sqitch.conf
  
- add tables and datas to bdd, install sqitch if necessary

      ```sqitch deploy```

- add datas in bdd, play files  ```seeding_demo-apo...``` in good order<br>
psql -U  user -d database -f nomfichier.sql 

- copy .env-EXAMPLE to .env and modify .env

- lauch server
``` npm run dev```