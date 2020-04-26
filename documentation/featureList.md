## Feature-List
1. Create a user account for potential adopters and shelters
   * Shelters:
     * Has authority to add pets on the database
     * Has authority to edit a pet's information, including the isAdopted attribute, which when true, would remove that particular pet from the matching query
     * After registering for an account, the profile page shows all available pets at the shelter and any adoption requests that have been created for one of their available pets
   * Adopters:
     * Create an 'ideal' pet that matches to available pets
     * Ideal pet preferences can be edited at any time
     * After registering for an account, the profile page shows all matched pets along with any adoption the user has made
   * Unregistered Users:
     * Can browse most recently added available pets
   * Pets on the database:
     * All pets have a pet information page that shows all details of the animal
2. match people with pets based on similar preferences
   * matching algorithm:
     * loop through all categories of 'preferred pet' with available pets
     * get a percentage of the matched categories
     * display pets starting with the best match on down
   * matching preferences will include:
     * pet type
     * pet age
     * pet breed
     * pet size
     * pet gender
     * good with: kids or other pets
3. Adoption Requests:
   * when an adopter finds a matched pet that they like, they can create an adoption request to notify the shelter of their interest
   * all adoption requests a user makes are viewable on their profile
   * all adoption requests that have been sent to a particular shelter are viewable on the shelter's profile
4. Demo user login


### Stretch-Goals
1. Media query for mobile
2. Adding location to the matching algorithm
3. Show matches one by one with 'swiping' rather than a list
4. Real time messaging between shelter and adopter, rather than adoption requests