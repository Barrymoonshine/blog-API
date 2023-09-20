# Blog API

Live link: https://blog-api-client-theta.vercel.app/

## Summary

This is the back-end/server part of the Sayonara or Blog API Client project.

This app was built using MongoDB/Mongoose, ExpressJS and NodeJS and is the back-end/server for the front-end/client which was also built as part of this project, and can be found [here](https://github.com/Barrymoonshine/blog-API-client).

Hosted and deployed on fly.io.

## Key skills employed

**RESTful architecture**

- API endpoints built following a RESTful architecture with reliance on HTTP methods to complete actions and statelessness with state managed by the client

**Authentication and Authothorization**

- Authentication completed with JWTs and the jsonwebtoken package and authorisation completed using custom middleware and the bcryptjs package to securely encrypt and decrypt passwords

**CORS**

- CORS resource sharing completed using the express cors package, with access limited to specific origins, methods and headers to support secure and seamless integration with the front-end

**Custom middleware**

- Creation of a range of custom middleware to support the smooth running of the app, with duplicate checking (likes and username) and credentials and token validation

**Schema design**

- Implementation of range of 1:1 schemas to cover all data used in the app, on balance this felt like the most appropriate design decision as it is both more simple than a 1:many approach (requiring less data manipulation in the front or back end than for example a nested array) and (whilst unlikely with a low traffic app such as this) doesn't have any size limitations such as with arrays
