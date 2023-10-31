# Home

Going to leave myself notes here so when I go for long period of time without coding, I can remember when I left off.

## 10-30-2023

I have JWT in the auth store and it's working ... using clerk jwt ... have it in the service base in the Auth header ... need to now do the backend for it

Clerk sets the cookie in the browser - I just have to get it and use it

## 10-29-2023

I'm learning more about Auth browser --> server --> browser --> etc

I'm learning about JWT. I think it won't be that bad and that I can implement it with Clerk...

I need to do the initIterceptors on the service base. That'll add a token each time from the frontend

I'm going to match my server JWT key with the Clerk JWT key ... and then it should work

On the backend, I'll have to add the JWT verification [like in this video](https://www.youtube.com/watch?v=mbsmsi7l3r4)

More to come...

FWIW: clerk has a node integration but I don't need to use that ... I would only use that if I had a custom UI for logging in, but since I'm using Clerk's UI, I don't need to do it on the server side ... I just need to be able to send the token ... and I can get a token from Clerk on the frontend and set it ...

And I can set that token as a cookie so that I go for that first ...

## 10-22-2023

- Have chipped away on this over the last week. Tonight I finished putting together the API for saving a shopping list and returning all the users shopping lists

**NEXT:** finish the front end (UI through store/service calls). Need to think through the long-term workflow.

## 10-15-2023

Have chipped away last couple days w/o updating here, but now I'm building the list in order. You can select grocery items, a grocery store, and then it will output a grocery list in the order of that specific grocery store.

User is prompted:

- save and go shopping now
- save for later

Thinking this step should be moved up in the user flow so the steps are

- I want to build a shopping list
- I select grocery items
  - Go shopping now?
  - Save for later?
- If shopping now, select grocery store
- Output the list

NEXT STEPS

- DB tables and API for saving a grocery list
  - list will be item focused and store agnostic
- front-end store/service to save the list

## 10-9-2023

I worked on selecting a grocery store and building the list. Going to pick up with that again next time.

## 10-8-2023

I've been working on the 'Go Shopping' view ... currently working on the 'Select Grocery Store' screen ... I've got a prototype for the 'Select Ingredients' screen

Idea is user can next:

- select grocery store
- build the list in the order you'll go through the store

## 10-5-2023

First time coding in a while. Create Grocery Store isn't working yet. Failed (and crashed) during create process.

The issue is I already created an address during a previous failed attempt, so i need to iron out the address check portion of the create process.

**Error: null value in column "addressid" of relation "grocerystores" violates not-null constraint**

10:55 update

Skins are down 30-20 in fourth quarter... and in coding, I successfully created a grocery store ... 4 actually, 1st is junk and then 2-4 are duplicates created while debugging some errors. But seems like it's all working. I updated the table so it will look for unique address/store name combo. maybe only 1 store per address? probably a safe bet. but now I can do a 'go shopping' ui (or start it at least)

NEXT TIME: start with /src/components/shopping/select-grocery-items.vue

## 9-23-2023

Auth seems to be working really well... just wrote to the user table, so now i think i'll be able to start saving additional information for the user

I'm writing to the User table successfully and can get from the user table. can probably add that to the server cache, too

todo:
groceryStores_users table

## 9-21-2023

Clerk is implemented at a low level and is working well. Seems like a keeper. I have 3 components implemented:

- user button
- sign up button
- sign in button

Since Clerk has its own components, I just had to put these in the appropriate place.

Now I'm going to create a User table to manage user data for the app.

Fiished up working on the User table ... created most of the API and added the table to the DB ... now just trying ot work on doing the findOrCreate

## 9-20-2023

Making progress on implementing Clerk ... I need to check how to put get the key from the env.local file but everything else is straightforward

Setting is up with the JS SDK and it's working nicely ... not completey ideal, but it's getting what i need and I can use their components, which is most important for me right now for getting the auth setup

What I finished (need to think things over and make sure it's all real tight, but it's preliminarily working):

- sign up and sign in buttons
  - should hide the sign in button if the user is signed in
- route guard to look at if user isAuthenticated
  - should redirect back to login page if not

Todo:

- add other components from Clerk, like the topbar user menu link, which would allow user to sign out
- user table in PostGres + other tables for the shopping lists

## 9-19-2023

BIG SUCCESS! Did the first create of a groceryStore in the DB and it worked the first time ... woooo!!! I'm going to take the time to reevaluate my next steps.

Brain dump: the createGroceryStore UI leaves something to be desired but that's okay - the goal was to get it working and it is working!!! I know have a grocery store in the DB and the DTO it sent back after the success was a beautiful grocery store. Now I should be able to GET a grocery store and the API looks good for that...

It would be a good idea to look at how I want to handle POST results ... because I don't really care about the error handling in GETs as much as I care about the error handling in a POST ... and, at the same time, I want to know when I have a successful post

NEXT TIME (ended up doing late night work on this and finished):

- Continue with PostResult backend and frontend (more frontend is done than backend so maybe start at backend)s

## 9-18-2023

Have not coded for a while... proposed to Michelle on 9-9-2023!!! We are so excited. Now, I'm back to some coding.

Tonight focused on FED for Create Category and Grocery Item:

- no duplicate requests
- separate components for both
- filter results while typing
- added a ton of ingredients - think there are plenty to create a limited first grocery store:
  - produce, bread, deli, meat, aisle 1, aisle 2, aisle 3

**Next Up**

- Create the store (don't think the FED store/service is ready to send data ... then review the backend api again before making the attempt)

## 9-5-2023

Basically finished the API for create grocery store, which involved updates to the other create flows. Aisle was most intensive ... returning an AisleDto and created/tweaked the aisles_groceryitemcategories TABLE.

Kept going and got the frontend tied up... and got the nav to link to the home page and added the cache clear on the admin home page

Next up:

- Add all the ingredients I need to do the Produce/Deli/First 5 Aisles at Harris Teeter Canton
- Backend: going to eventually add grocery items to the category DTO ... only create with Categories but when returning the data, include ingredients.

## 9-4-2023

I'm done w working on server-side caching for a bit. Yesterday, I finished the setup for the getAll calls ... whenever I started implementing findOne calls in the client I'll start implementing the server-side cache there, too.

Focus now is on UI for Create Store.

Tonight I got the Address tab mostly done (need to validate inputs to enable next button) and started the Aisles UI.

Next up:

- Update the Aisle table with the order column (done) ✓
- Update the categories_aisles table ✓
- Backend for creating a grocery store (the new table) ✓
- Draggable in the UI: https://www.npmjs.com/package/vue-draggable-next

## 9-2-2023

I changed up my path forward with caching. I went with `node-cache` because it's simpler to start with ... and if I ever need to upgrade to Redis because of performance issues, I don't think it would be a huge lift ... but not worth implementing from the beginning because it would be more complex for building in production ... node-cache is in-memory.

Tonight I updated the getAll for category, item & storeName ... going to do the others tonight while i still have energy... then next step is stripping the other cache stuff and deleting that ... then I can just continue with the store creation with focus on the steps necessary for that.

## 9-1-2023

Why did I decide to write my own caching mechanism? That was silly! But I think I learned a lot about how it works / etc ... but now I need to undo all of that and put back in my old code (which at first I commented out but I think I deleted!!!)

The plan: implement Redis. Free/Open-Source/Wildy Popular. Going to need to implmeent Redis Cloud for production

## 8-29-2023

Tonight I finished implementing the server-side cache. Now I'll hit the DB wayyyyy less than I would have before. When I deploy, I'm going to have to monitor server-side memory usage... I don't think this should be too cray though.

### Next time:

- remove all the async/await stuff in the API levels
  - start with GroceryItem and GroceryItemCategory and test those
- test adding GroceryItem and GroceryItemCategory w the caching patterns
- test GroceryStoreName patterns
- if all that is working, clean up all the commented out code in the controllers
- need to look at the PostGroceryStore API routes ... that is the next one
- probably build the UI out to complete building a new grocery store..

## 8-27-2023

Cache started and pattern introduced. Also can use aliases on the backend now (!).

The key to that was a few things:

- updating the script to start the server to use 'ts-node' instead of just 'node' ... then i added another package
  'tsconfig-paths' and added an update to the tsconfig

```ts
{
	"ts-node": {
		// Do not forget to `npm i -D tsconfig-paths`
		"require": ["tsconfig-paths/register"]
	}
}
```

### When I return next:

- continue with the cache implementation

## 8-22-2023

Important concept I need to setup for the backend: caching.

Why: I need to limit interactions between the server and the backend. The more transactions to the DB, the more $$$ ... most DBs set things up so they charge for the DB interactions per interaction, and there me be an upper limit which would crash the app ... so being able to limit that is key.

How I think I would do it ...

At app startup, I'd build the cache. The cache would be built by a findAll for all the tables ... and then that's in the cache ...

Then anytime I perform a findAll or findOne from the controller, I check the cache first to see if there is a value...

Anytime I perform a create, I'm going to do a sequelize.create and push that value to the cache's findAll ...

Anytime I perform an update, I'm going to do a find on the cache, then a sequelize.save() to the db ...

I'm not currently hanlding a delete, but it would be a delete from the DB and a delete from the cache...

## 8-20-2023

Been working on the API today for categories and grocery items ... got it working.

Made some DB updates ... now going to approach the groceryItem:groceryItemCategories as a one:many relationship ... each groceryItem can have 1 category, ie Milk is Dairy ... thinking I could eventually add subtypes ... like Milk, Chocolate Milk and Sour Cream are all Dairy, but Milk and Choc Milk would have subtype Milk

UI is super basic but it works for adding data... not going to go forever with that TBH... just need it so that it writes to the DB quickly and consistently (no editing yet... probably will build that the first time I need an edit but right now just trying to do it all correctly the first time)

My next steps are to continue with my data points. Next will be address... then aisle... then groceryStore...

My main goal right now is essentially to setup a minimal list (no more items for a bit probably) so I can setup a grocery store with like 3 aisles and start working towards building an actual grocery list

Before I do that, I probably need to take a night to implement auth ... that is going to be my priority after I get the admin api finished

### Priorities

- Admin API / UI
- Auth
- Build Shopping List

## 8-13-2023

Ended with the GET working for categories and grocery items ... can also POST to category ... UI started

API to possibly check out and use: https://developer.kroger.com/documentation/public/getting-started/quick-start

## 8-11-2023

I'm going to go with Prisma and PostGres.

I started the backend for this probably at the beginning of the year. I researched the backend and different ORMs. I initially started with Prisma. Probably took at deep dive into Prisma when Michelle was in Mexico (so, February). In April I made another big push, committing my code and reorganizing things.

Since then, I have been doing more database analysis. I looked at MySql and Sequelize as the DB && ORM components and rewrote the database. I have the tables in a good place and I'm trying to make sure I make the best decision as far as database.

Today I want to make significant strides in the coding. And I think I need to go with Prisma/PostGres.

I'm going with this because:

- PostGres is proven commodity
- Prisma, while it has its detractors, is solid and I'm not doing anything too crazy with it. My man WebDevEd has [a video where he suggests using Prisma](https://www.youtube.com/watch?v=gxkwMm_j850). So I think it's legit and I'm going to use it.
  - The other biggest reason for using Prisma is I've already written essentially the whole API using it, so no need to rewrite the API, which will allow me to start creating the front-end sooner

Today's goal:

- Get the project back up and running with prisma/postgres
  - Add prisma back to the code base
  - Add it using PostGres
  - Create the tables
    - Add smallest amount of test data possible
  - Test the tables (PostMan?)
  - Setup a PostGres DB somewhere not local (Railway or Supabase)
    - ENV file will host the connections keys

Railway ... Prisma ... Drizzle? Dr ...

Auth: Clerk ... it's paid ... free tier allows 5000 users so i should be good ...

Tailwind for CSS?

DigitalOcean and Render ... places to host Node/Express apps ...

**10:40am update:** going to use Sequelize instead of Prisma

Reasoning: Prisma has more overhead and has to create it's own shit for it to work, whereas Sequelize I just have to connect to the DB and query it. Going to take more time to do that but it'll be easier long-term I think

**11:40am update:**
Got the first API call working using Sequelize and my local PostGres DB. Here's what needs to be done to get that started:

- run `yarn startserver` command
- that exposes the api at http://localhost:3000
- I confirmed it's working by visiting localhost:3000 and http://localhost:3000/api/grocery-store-names (the only one I have setup with Sequelize currently)

Next steps when I get back:

- Create a super basic front-end and see if I can start the frontend, visit it and successfully hit the API
- After that is working, we will create the other API calls for this and create the associate front-end for it, and then I'll test it all out ...
- If i can get that working at the end of today, then it's all about chipping away with the other API endpoints
- Then I need to figure out how to host the DB on Railway ... and then I need to start connecting to that
  - When I do that, I'll need to figure out the ENV stuff so i can hide connection strings

**1:30pm update**
Got the front-end building and Vite is building and page using the `yarn vite` command ... next step is attempting to connect a service

**5pm update**
Got the API working on first GET (getAllGroceryStoreNames). Got a store setup and starting the CreateGroceryStore view ...

