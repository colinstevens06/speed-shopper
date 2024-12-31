# Home

Going to leave myself notes here so when I go for long period of time without coding, I can remember when I left off.

# 12-30-2024

On w Killa and he's sharing the knowledge.

cmd `history` and here's what we ran recently

```bash
  131  yarn startserver
  132  yarn startserver & # this let's me run multiple processes at the same time
  138  ps -ef | grep 27811 # this let's me see the process that was kicked off using the identifier it gave after starting the process
  140  kill -9 27811
  141  ps -ef | grep 27811
  142  history
  143  vi file-name # look up VIM and VI and that is a way to create files with content in Linux ... can also look at Nano instead of VIM because Nano is maybe a little easier ...
  144  chmod +x file-name # chmod changes permissions, +x make sit executable so can run as a script ... then in the next line you can run the bash file as an executable ... so the 'file-name' here would be a bash file
  ❯ ps -ef | grep node # see node processes
```

# 12-29-2024

I'm down in OC and we've been having fun. I've been doing some coding when I can and this time I'm focused on TechOps. Years ago, Cameron gifted me a RaspberryPi and I'm learning more about it and how to use it.

The problem I'm trying to solve: I want a free server and database that I manage. Back in April, I tried a free Heroku DB just for funsies. I just messed around w/ it for a day and never returned to it. The DB was free because it was in Beta. It left Beta after a few months, and I started getting charges even though I wasn't using it.

So I need a free option because I'm just doing this as a side project - as a hobby. Even though I'm a professional developer -- which feels weird to say but it's true now after three years in the industry -- right now this is just a side project that I work on a few times a year. I'm hoping that this year will be a little slower and I'll be able to spend more time finishing this app.

The RaspberryPi, which I've luckily had sitting, waiting to be used, cna probably fulfill this need.

It can be almost anything, and one thing it can be is a little server with a database. It has 32 GB microchip in it right now... I might want to get something bigger if possible.

The plan is to host my server and DB on the Raspberry Pi. I can hook that up to my router, which will allow my frontend to hit it. I can host the frontend on Netlify for free.

THIS IS THE KEY THOUGH BECAUSE NOW MY DATA WILL BE ON A REAL SERVER AND NOT JUST MY LAPTOP. AND THEN I CAN START USING THE APP FROM MY CELL PHONE AFTER I PUBLISH TO NETLIFY. AND START USING THIS THING FOR REAL.

## What I've done w/ RaspberryPi

A while ago, Cameron and I setup RaspberryPi to use w/ SSH. I was able to ping the raspberrypi w `raspberry ping` and get the IP address. I used that to execute `ssh pi@IPAddress` like `ssh pi@111.11.1.11` and then it connects.

I installed NVM w/ curl. Then I used NVM to install Node 18.13.0, same as I'm using on my computer.

I installed PostGres and have that running.

I ran into an error while trying to run postgres.

`psql: FATAL:  role "pi" does not exist`

I fixed this by logging in `sudo su postgres` and then executed `createuser pi -P --interactive` as a superadmin and now it works

Also: after I installed NVM, I had to restart the terminal before it recognized the install.

## Next Steps for RaspberryPi

- I'm currently in experiment mode with a plan to rewrite the RaspberryPi OS to the latest version after I get new hardware delivered to plug the microSD into
- In experiment mode, I want to learn about deploying my project to the server. I am doing my development on laptop. Code is hosted on GitHub. I need to deploy updates to the server (Raspberry) semi-regularly... so it would be dope to have a way to do that and i need to make sure I can build
- IT IS 2 SEPARATE THINGS:

  - SERVER: Node, need to deploy code here and rebuild the server when I make updates
  - DATABASE:
    - Create a database w/ authentication
      - I already created 2 roles... one for DB management and one for the website to use
    - Create tables
    - That should just about be it... cause then I'm going to write to the DB from the server ... and I already have a solid API, I just need to connect the API and the DB and look into all the auth & security shit for that ...
    - Cameron says do a bash script to create the tables

  ## Advice from Cameron

  - Do a git clone for the repo ...
  - When I push updates to GitHub, I can pull the code on the Pi and restart the server
  - if the repo is private, copy your ssh key to the pi user's ssh key
  - make a script that lives on the pi that does the pull and restart of the app. Then on laptop, make an alias that ssh's into the pi and runs the script. that way can 'deploy' fresh shit with one command

# 12-23-2024

I'm looking at this for the first time in forever. Since the last time I worked on this, we went to Spain and Italy, I built a site for that, LFG has played 3 shows, and Michelle and I got married!!! All of that was a lot of work, but planning the wedding was the most.

Since working on this last, I did shut down the Heroku DB that I setup as a test. Heroku charged me for a couple months of usage but they refunded after I reached out and shut everything down.

So, I need to take this back to the drawing board because I need a free option.

I have a raspberry pi and I might use that for the server and DB. That's my next big idea... and I think I'll go with that first.

Raspberry Pi can:

- host PostGres DB
- host NodeJS server

I think while we go to OC, I'm going to focus on the UI and seeing what else needs to be done to use this app. Especially on cell phone. I think I could have an MVP by end of 2025.

I might switch this project to pnpm, too. Side note from a tech perspective.

# 4-14-2024

Yeterday I did a bunch of research and started taking steps towards publishing the site.

A few things:

- Netlify for frontend
  - Netlfiy can support a preview env but it would probably run off the prod api
- Heroku for backend and database
  - Started an app in Heroku
  - Can do a staging env and a prod env
  - Going to look at deploying via CLI but also want to see if I can easily use the backend monorepo
  - Going to init the tables locally if I can w/o running a script
-

# 4-11-2024

Worked in authenticate-token.ts middleware ... and in there I'm setting `res.locals.clerkUserId` to the clerkUserId so that I can access it later and hit the user table and include that user's email / user name on the `updateby` properties

Next thing to do would be populating the property in the appropriate controllers (probably only controller files)

Here's the (site I was referencing)[https://stackoverflow.com/questions/71296347/get-the-current-user-from-anywhere-in-nodejs]

# 4-10-2024

Looking at how I can access the user info from the backend server. Using the clerk-node package... but I also have the user table for the app... and that has whether that user is an admin or not

# 3-23-2024

Have not done shit w/ project since new year begain. LFG had a sick show at 8x10 though on 3/9 and it was worth it.

Today is the first time I've looked at this in a while and my main thoughts are:

- It's time to explore a Dev DB.
  - Right now I have a local DB and this will do me no good as I populate data. I can still hook up to a Dev DB locally.
  - After creating a Dev DB, I'll need to run some scripts to create tables
  - After creating the tables, I'll be able to use the UI locally on the Dev DB
- Next big to-do really is going through the workflow and reminding myself where I am / what still need to be done. Also need to read through these notes to see where the UI left off.

After reading notes from mid-10/2023 to now, I think my assessment is on point: move to a remove DB is priority, then continue work on the UI / workflows. Looks like in October I had ideas for changing the flow for someone shopping/creating lists.

Heroku might be a great place to do the DB hosting.

Other next thing to do: - Update the 'updatedby' properties to populate from logged-in user

## 1-1-2024

Got a bunch done the last couple days. Highlights:

- API token security implemented
- Can save shopping lists
- Can reorder aisles when creating a grocery store

Next: continue to refine the Shopping List workflow (click old list and have UI populate)

