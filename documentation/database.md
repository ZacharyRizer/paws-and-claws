## Tables and Their Associations

Below is a representation of all of the tables and their relations:

![](../documentation/images/PawsAndClawsTable.jpeg)

1. Users: all user information - for both shelters and adopters
   1. adopters are linked to a preferred pet
   2. linked to their uploaded available pets

2. Pets: details of an available pet
   1. links to a breed table
   2. linked to a shelter's id

3. Adoption requests will be linked to a particulr adopter and a particular pet, and then through the pet to the particular shelter
