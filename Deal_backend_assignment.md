# Blog post

Write endpoints for a simple blogging application where your main resources are Posts, Comments, and Interactions. Each post has multiple comments and interactions, and each comment has multiple interactions.

### Notes:
* Users are consists of 2 types, `ADMIN` and `USER` 
* An authenticated user can create posts. Admins can then either approve these posts for them to be published to other users, or reject them. Notice that you are ONLY required to implement the endpoints listed later here in the document.
* Each post has one of three statuses `(APPROVED, PENDING, REJECTED)` 
* Each post can have comments and interactions from any authenticated user
* Each comment can have interactions from any authenticated user
* Interactions types are `(LIKE, DISLIKE, SAD, ANGRY)`

## Schemas

* The application resources implement the following schemas. Implement them in your code, and use them in your implementation of the endpoints.

### User
* username
* password 
* role

### Post
* title
* body
* status
* createdBy

### Comment
* body
* post
* createdBy

### Interaction
* type
* post
* comment
* createdBy


## ​Requirements

### Models
- Create a model for each schema with needed links between them

### endpoints

- Endpoint `POST /user/login`. to take an email and password and return `JWT token` to be used for authentication. token payload should be user `_id` and `email`

- Endpoint `POST /posts`. Used only by regular users to create new posts. Make sure to create the post with the correct status.

- Endpoint `GET /posts`. Used by both admins and regular users. Responds with a paginated list of posts ordered (from latest to oldest), each post contains an `interactions` object its keys are the interaction type and its value indicating the total number of interactions of that type for that post. also `createdBy` property should contains post creator _id, email and role (use aggregation only to get the needed result)

    Note: in case of normal user it should return APPROVED posts only. Default limit equals 10.

* Result shape must be 

```javascript
{
  "data": [{
    //...post data
    createdBy: {
      _id: 'XXXX',
      email: 'XXXX',
      role: 'USER',
    },
    interactions: {
      LIKE: 3,
      SAD: 45
    }
  }],
  "total": Number,
  "page": Number,
  "limit": Number,
  "totalPages": Number,
  "hasNextPage": Boolean,
  "hasPrevPage": Boolean
}
```

- Endpoint `/admin/statistics`. Used only by admins for a dashboard implemented for our application. In one of the pages of this dashboard we need some numbers for analytical purposes: (use aggregation only to get the needed result)
  *  Total number of pending posts, (status = PENDING).
  *  Total number of approved posts, (status = APPROVED).
  *  Total number of rejected posts, (status = REJECTED).
  *  Total number of posts.
  *  Total number of comments on all posts.
  *  Total number of interactions on posts only.
  *  Total number of interactions on comments only.
  *  Total number of interactions on all posts and comments.

* Add whatever request query/parameter needed for such requirements.

* There is a mongodb dump file (gzip) named `blog_sample-db.gzip` contains some data with an admin and some users, posts with their related comments and interactions. You can add more data to help you in your queries, but we will test your code against the dump file in this task and compare the results with our results.

* ​It is required for the endpoints to be performant, and follow best practices for endpoint and server security.

* API documentation is required for each endpoint

* Integration testing is required for each endpoint

* admin should login via email admin@deal.com - password: deal123

* replace current plain text passwords with hashed passwords with salt `dealapp` and send the new backup file with the task and deliver the code via github repo.

required technologies are:
* framework: ExpressJS
* database: MongoDB (mongoose)
* testing: Mocha - chai
* documentation: Swagger


