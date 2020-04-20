## Tables and Their Associations

Below is a representation of all of the tables and their relations:

![](/documentation/Images/PawsAndClawsTable.jpeg)

1. Users: all user information - for adopters
   *  Users.userPetPrefId => particular UserPetPrefs.id
   *  AdoptionRequests.userId => particular Users.id


2. Pets: details of an available pet
   *  Pets.breedId => particular Breeds.id
   *  Pets.shelterId => particular Shelter.id
   *  AdoptionRequests.petId => particular Pets.id

3. AdoptionRequests: created by an adopter to alert a shelter they are interested in a particular pet
   *  AdoptionRequests.petId => particular Pets.id
   *  AdoptionRequests.userId => particular Users.id
   *  AdoptionRequests.ShelterId => particular Shelter.id

4. UserPetPrefs: 'virtual' pet created by the adopter to match qualities with available pets
   *  Users.userPetPrefId => particular UserPetPrefs.id
   *  UserPetPrefs.breedId => particular Breeds.id

5. Breeds: preseeded list of all available breeds with their associated petType
   *  Pets.breedId => particular Breeds.id
   *  UserPetPrefs.breedId => particular Breeds.id
