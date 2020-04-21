## Tables and Their Associations

Below is a representation of all of the tables and their relations:

![](/documentation/Images/PawsAndClawsTable.png)

1. Users: all user information - for adopters
   *  UserPetPrefs.userId => particular Users.id
   *  AdoptionRequests.userId => particular Users.id


2. Pets: details of an available pet
   *  Pets.breedId => particular Breeds.id
   *  Pets.shelterId => particular Shelter.id
   *  AdoptionRequests.petId => particular Pets.id
   
3. Shelters: details of a shelter and all available pets
   *  AdoptionRequest.shelterId => particular Shelter.id
   *  Pets.shelterId => particular Shelter.id
   *  ShelterUsers.stateId => particular States.id
   
3. AdoptionRequests: created by an adopter to alert a shelter they are interested in a particular pet
   *  AdoptionRequests.petId => particular Pets.id
   *  AdoptionRequests.userId => particular Users.id
   *  AdoptionRequests.ShelterId => particular Shelter.id

4. UserPetPrefs: 'virtual' pet created by the adopter to match qualities with available pets
   *  UserPetPrefs.userId => particular Users.id
   *  UserPetPrefs.breedId => particular Breeds.id

5. Breeds: preseeded list of all available breeds with their associated petType
   *  Pets.breedId => particular Breeds.id
   *  UserPetPrefs.breedId => particular Breeds.id
