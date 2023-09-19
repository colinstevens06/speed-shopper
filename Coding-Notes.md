# Home

Going to leave myself notes here so when I go for long period of time without coding, I can remember when I left off.

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

