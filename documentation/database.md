## Tables and Their Associations

Below is a representation of all of the tables and their relations:

![](../documentation/PawsAndClawsTable.jpg)

1. Users: details for the account that are public
   1. every user has a relation to a userData table that keeps private data
   2. every user is related to a role(s): Shelter and/or Adopter

2. Pets: details of an available pet
   1. links to a breeds, sex, age, and size tables
   2. each pet is linked to a shelter's id

3. when an adoption request is made, that request will be connected to a particulr adopter and a particular pet, and then through the pet to the particular shelter
