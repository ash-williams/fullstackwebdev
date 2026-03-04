---
layout: page
title: The Joi of Validation
permalink: /backend-development/joi-validation
parent: Part II:- Backend Development
nav_order: 2
---

# Introduction
In the previous lab, we covered a lot of the fundamental principles that are essential to this module:
- We familiarised ourselves with JavaScript
- We got to grips with REST API concepts
- We started writing basic REST API services with ExpressJS. This includes:
  - Creating endpoints with **methods** and **routes**
  - Understanding the **req** and **res** parameters for managing the HTTP request and response
    - `req.body` - where the HTTP request body is stored (i.e. the data being sent to the server)
    - sending responses back to the client with `res.sendStatus(xxx)` for sending default status codes, or `res.status(xxx).send(xxx)` for sending data back to the client.

Now that we can create basic Express apps, we can create routes and parameters, access data that is send to those routes, and send responses to the clients. The next steps are do something with that data (normally a database interaction). However, we first need to validated the data is correct against the specification and ensure that the client has sent the correct data.

In this lab, we will look at how we can validate data coming into the server using a library called `Joi`.

# The Joi of data validation
Joi is a library used for handling data validation. It is an NPM package, and so we install it in the same way we installed Express (`npm install --save joi`).

Once we've installed it, Joi is quite simple to use. We start by requiring in Joi at the top of our file, and then do the following:

1. We create a Joi schema - this schema sets the standard for what we expect the incoming data to look like.
2. We then take any incoming data and compare it with the schema.
3. Finally, we handle any errors if the incoming data does not meet the specification.

Let's have a closer look at this in process. Imagine we have a Movie database API where users can add movies by sending a `POST` request to `/movie`. The endpoint will look something like this:

```javascript
app.post("/movie", (req, res) => {

    let movie = {
        movie_id: next_id,
        movie_name: req.body.movie_name,
        movie_year: req.body.movie_year,
        movie_director: req.body.movie_director
    };

    movies.push(movie);
    next_id = next_id + 1;

    return res.status(201).send(movie);
})
```

We want to add validation right at the start of the endpoint, prior to any processing. The validation should check that the incoming data is correct. So let's implement some validation using Joi and the steps outlined above.

## 1. Create a Joi schema

At the top of our endpoint, let's create a Joi schema to specify the structure of the data that we expect to be sent. The Joi documentation can help you here:

```javascript
const schema = Joi.object({
    movie_name: Joi.string().required(),
    movie_year: Joi.number().min(1900).required(),
    movie_director: Joi.string().required()
})
```

From the above schema, we can see that it is an **object** with three **required** fields. `movie_name` and `movie_director` are **strings**, and the `movie_year` will be a **number** with a **min** value of 1900.

> Note that there is no `movie_id` in the incoming schema, as this is set by the server and not part of the incoming data.

## 2. Compare the incoming object with the schema

Next we take the incoming data from the request (`req.body`) and compare it against the schema. Here is the code:

```javascript
const { error } = schema.validate(req.body)
```

While this line is quite simple (the schema has a method called `validate` which takes in the object we want to validate as a parameter), this is the first time we have seen curly brackets in a variable declaration. This is just a bit of Javascript magic called 'destructuring'. Essentially, the validate method returns a big object of _stuff_, but we are only interested in the `error` part of the response. So we can use the curly brackets to just pull out the `error` information.

> See [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) for more information on destructuring

## 3. Handle any errors
Finally, we want to check if there are any errors. If there are then we want to return a response to the client and not process the request any further. Here is the code: 

```javascript
if(error) return res.status(400).send(error.details[0].message)
```

Again, this line is quite simple. If there is an error from step 2, then we return a `400` response and the HTTP request is completed. The `error` object contains an array called `details` because there may be multiple issues with the validation. To avoid overloading the end user here, we just take the first error (`details[0]`) and return the error message in our 400 response. 

Our complete endpoint should now look like this:

```javascript
app.post("/movie", (req, res) => {

    const schema = Joi.object({
        movie_name: Joi.string().required(),
        movie_year: Joi.number().min(1900).required(),
        movie_director: Joi.string().required()
    })

    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    let movie = {
        movie_id: next_id,
        movie_name: req.body.movie_name,
        movie_year: req.body.movie_year,
        movie_director: req.body.movie_director
    };

    movies.push(movie);
    next_id = next_id + 1;

    return res.status(201).send(movie);
})
```

> ## Note
> Joi is very powerful and we can do a lot with it. However, we will only scratch the service of its potential in this lab. For more information, have a look at the documentation here: [https://joi.dev/api/?v=17.13.3](https://joi.dev/api/?v=17.13.3).

# Exercise 1: Validating incoming data
This exercise builds on Exercise 4 and 5 from the previous lab (the shopping cart API). Make sure that you have first implemented your own version of the ShoppingCartAPI before starting.

The ShoppingCartAPI contains two endpoints that handle incoming data. This data needs to be validated so that we can be sure it adheres to the specification.

Using the Joi library, validate all incoming data across your API. Use the example above, and the Joi documentation to help you.

# That's all there is to it...
Validation with Joi is easy. There are other methods and libraries you could use for validation, but Joi is so simple that it is perfect for this level of complexity.

You will find that once you learn the basics of any programming language, the best answer will always be "there's a library that will do all of that for you".

[Next Lesson](https://ash-williams.github.io/fullstackwebdev/backend-development/databases){: .btn }