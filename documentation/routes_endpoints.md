## Routes and Endpoints

### API - Backend
1. Users routes
   * GET /users/role/adopter/:id - return a particular user profile page
   * GET /users/role/shelter/:id - return a particular shelter profile
   * GET /users/:id/preferredPet - grab users preferred pet for querry
   * POST /users - create a new user account
   * POST /users/token - used to create token for sustained login

2. Pets routes
   * GET /pets - returns available pets within match querry
   * GET /pets/:id - return a particular pet for profile page
   * POST /pets - shelter's ability to create a new pet
   * DELETE /pets/:id - shelter could delete a particular pet from the database once adopted

### FrontEnd Routes
1. Home Page `/` display top 10 available pets
2. Login `/login` => for adopters redirect to homepage, for shelters redirect to adoption request page
___
3. Register as adopter `/register/adopt` => post reqeust => redirect to homepage
4. Show matches `/apopter/:id/matches` => shows matches based on adopter's preferred pet
5. Create Preferred Pet `/create-dream-pet` => for adopters only => redirect to matchees
6.  Create adoption request `/create-adoption-request` => for adopters only
___
7. Register as shelter `/register/shelter` => post request => redirect to create pets page
8. Create Pets `/create-pet` => for shelters only => list of shelter's available pets
9.  Shelter's pet list `/shelters/:id/pets` => shows available pets for shelter
10. Adoption Request Page `/shelters/:id/adoption-requests` => for shelters only
___
11. About page `/about` describe this app
12. 404 error `/not-found` not found error page