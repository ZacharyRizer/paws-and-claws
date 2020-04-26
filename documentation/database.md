## Tables and Their Associations

Below is a representation of all of the tables and their relations:

![](/documentation/Images/PawsAndClawsTable.png)

1. Users: all user information - for adopters
   *  UserPetPrefs.userId => Users.id
   *  AdoptionRequests.userId => Users.id

2. Pets: details of an available pet
   *  Pets.breedId => Breeds.id
   *  Pets.shelterId => Shelter.id
   *  AdoptionRequests.petId => Pets.id
   
3. Shelters: details of a shelter and all available pets
   *  AdoptionRequest.shelterId => Shelter.id
   *  Pets.shelterId => Shelter.id
   *  ShelterUsers.stateId => States.id
   
4. AdoptionRequests: created by an adopter to alert a shelter they are interested in a particular pet
   *  AdoptionRequests.petId => Pets.id
   *  AdoptionRequests.userId => Users.id
   *  AdoptionRequests.ShelterId => Shelter.id

5. UserPetPrefs: 'virtual' pet created by the adopter to match qualities with available pets
   *  UserPetPrefs.userId => Users.id
   *  UserPetPrefs.breedId => Breeds.id

6. Breeds: preseeded list of all available breeds with their associated petType
   *  Pets.breedId => Breeds.id
   *  UserPetPrefs.breedId => Breeds.id
