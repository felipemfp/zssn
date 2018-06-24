# ZSSN (Zombie Survival Social Network) - Frontend

## Problem Description

The world as we know it has fallen into an apocalyptic scenario. A laboratory-made virus is transforming human beings and animals into zombies, hungry for fresh flesh.

You, as a zombie resistance member (and the last survivor who knows how to code), was designated to develop a system to share resources between non-infected humans.

## Requirements

You will develop a website that consumes a ***REST API*** which will store information about the survivors, as well as the resources they own.

In order to accomplish this, the system must fulfill the following use cases, sorted by importance to guarantee the survival of the group.

- **Add survivors to the database**:

  A survivor must have a *name*, *age*, *gender*, *last location (latitude, longitude)* and *inventory*.

  The survivor inventory can have: **water**, **food**, **medication** and **ammunition**.

  The interface is expected to have a list of the possible itens to add to the inventory, as well as a map to assign the last location (initially with the current location of the survivor). An intuitive and pratical interface ensure the security of the members of your group.

- **Update survivor location**:

  Survivors must have the ability to update their last location. When added to the database, a survivor will receive a unique identification from the system. Using that identification the survivors must be able to search for themselves and update the last location in a pratical way.

- **Flag survivor as infected**:

  In a chaotic situation like that, it's inevitable that a survivor may get contaminated by the virus.  When this happens, we need to flag the survivor as infected.

  An infected survivor cannot trade with others, can't access/manipulate their inventory, nor be listed in the reports (infected people are kinda dead anyway, see the item on reports below).

  **A survivor is marked as infected when at least three other survivors report their contamination.**

  When a survivor is infected, their inventory items become inaccessible (they cannot trade with others).

  For pratical purposes, it's expected to being possible to search for a survivor by name to flag that survivor as infected. Who's gonna remember the identification from the whole group with the life in risk?

- **Survivors cannot Add/Remove items from inventory**:

  Their belongings must be declared when they are first registered in the system. After that they can only change their inventory by means of trading with other survivors.

  The items allowed in the inventory are described above in the first feature.

- **Trade items**:

  Survivors can trade items among themselves.

  To do that, they must respect the price table below, where the value of an item is described in terms of points.

  Both sides of the trade should offer the same amount of points. For example, 1 Water and 1 Medication (1 x 4 + 1 x 2) is worth 6 ammunition (6 x 1) or 2 Food items (2 x 3).

  The trades themselves won't be stored by the API, but the items will be transferred from one survivor to the other.

| Item         | Points   |
|--------------|----------|
| 1 Water      | 4 points |
| 1 Food       | 3 points |
| 1 Medication | 2 points |
| 1 Ammunition | 1 point  |

- **Reports**

  The interface will must show the following reports, served by the API:

    1. Percentage of infected survivors.
    1. Percentage of non-infected survivors.
    3. Average amount of each kind of resource by survivor (e.g. 5 waters per survivor)
    4. Points lost because of infected survivor.

---------------------------------------

## REST API

To communicate with the server you'll have available the endpoints documented in this swagger: http://zssn-backend-example.herokuapp.com/swagger-api/index.html

## Notes:

1. You can use **any** JavaScript _framework_/lib of your preference if needed;
2. You can use an ES6 or CoffeeScript _transpiler_ if you prefer;
3. You can use CSS _precompilers_, like SASS, PostCSS, Less or Stylus, again, if you prefer;
4. Pretty design is nice to have, but minimal UX is more important. Your life is in risk, it's not good to have a system that is hard to use;
5. New _features_ are welcome, but the priority is the previous listed _features_, sorted by importance;
6. The survivor should not reenter data in case there's some network problem. Practicity and objectivity is the ideal.


**Important:** For the evaluation keep this in mind: you don't need to complete every single feature listed in this test (consuming every single API in the documentation). For example, you can implement just the Survivor CRUD interface. But the less features you implement, the more you have to nail what you deliver. So, if you deliver just 1 feature, we expect it to be the most perfect implementation (structure, organization, testing, style, overall quality, fanciness, etc). The more feature you deliver, the less details you have to add. It's your choice.

**ARE YOU [NEGAN](https://en.wikipedia.org/wiki/Negan)?**
