# App-Store
This app is a demo for a store with lists of buyers, products and purchases.
It contains three main parts:
1. App Store - Based on React. Allows information to be used on the client side by intent pages that come from components.
2. API - Based on Node. Allows to receive and send the information to the database.
3. Database - form MongoDB Atlas.

1. React - In this section there are several different modules that are in use:
  • The first is SPA (Single Page App) - gives the possibility to receive all the information found in the application as soon as the first page is loaded, thereby           reducing the time it takes to switch between different pages in the application.

  • The second is Redux - built by a reducer (located in the /appstore/src/functions folder), which receives all the information during operation in the components and       sends it back to all the pages in an updated form. Allows for faster loading of the information and shortens the time you have to wait for the API server.

  • In addition, the React part is built with a detailed and easy-to-understand component division.

2. API / Node - in this part the information is processed before sending information to the database and vice versa.
   It is built by different layers (such as BL, DAL, Router, Model, etc.) that give the possibility of reading and controlling what is happening in the process.

3. Database - The use of MongoDB Atlas gives a more convenient and faster possibility to use the database, and also provides a convenient infrastructure to upload the      application to a domain.

