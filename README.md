# Mental Health Ally

# Description
The Mental Health Ally app is a place where people can share any mental health related issues (anxiety, depression, bipolar disorder, etc.) in a safe place where others can give them virtual support.  People can post issues personal to them and others can respond to their giving advice or other forms of support.  It does not take the place of therapy, but it gives people a safe place to share when they feel like it and can connect with other people going through with similiar issues.  

# Tech Stack
Here's a brief high-level overview of the different technologies used to created Mental Health Ally
* This project used the React.  React is a JavaScript library for building user interfaces.
* For styling and components it is built with Mui which provides a library of base components that customizable and re-usable.
* For form validation it uses the package react-hook-form which makes applying validation logic to forms a breeze.
* For accessing data an api was built using .Net 5 and the Web Api project.
* For data storage SQLServer was used as a SQL database inside the Web Api project for storing data like posts, users, comments, etc.

# Features
Here's a high-level overview of all the features in the application
* User Authentication
* Viewing all of the recent posts
* Viewing a specific post along with the comments
  * Create a comment on a post [Requires Authentication]
* Create a new post [Requires Authentication]
* Viewing all Groups (each post belongs to a specific group)
  * Create a new group [Requires Authentication]
  * View all posts of a specific group

Here's a list features that are not implemented but are a work in progress
* Viewing a user's profile - which lists out the number of posts created and number of comments made
* Support for a nested comment system
* Favorite Posts collection so a user can visit later [Requires Authentication]
* Recording number of views a post has
* Search for posts by a query string
* Mobile version of the app
