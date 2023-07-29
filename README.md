# BookLibrairyProject
In development:

My very first full stack app, using Sql server (Azure DataStudion v1.41.2) , Entity framework code first approach,.Net 7.0 , React and css as frontend,initialy this app was an assignment from Salt bootcamp where I had 24 hours to build a fullstack CRUD application  and being responsive design.

I decided to create a simple application for users to share with others the books and stories they had read and share their opinion about them. As it is often difficult to choose which book to read, the application propose a book to read among the various books already published in the application.

Initialy I had three tables user,Books and Opinions.For that assignment I have decided to have focus on the one to many relation between Books and Opinions first and managing the corresponding CRUD operations before going further with the User table.

So for every review added a digital book is generated with the related review informations and so far it looks like this:

![my image](presentation_image.png)



# Technologies
.Net: New backend in developpement: https://github.com/PhilippeLeopoldie/bookLibraryBackend

Azure Sql Database : due to the end of my azure subscription I have switched temporaly to an in memory database and finally to Vercel platform using postGres database

Entity framework code first approach

ASP.NET Core Web APIs

API platform: Heroku

Database : postGres

Database platform: Vercel

React

TypeScript

CSS

HTML

Frontend platform: Vercel

Test driven development : 

  XunitTest ongoing: https://github.com/PhilippeLeopoldie/bookLibraryBackend/blob/main/LibraryBackend.Tests/UnitTest.cs
  
  Integration tests: implementation ongoing 

# deploying link:

Frontend:
https://books-library-philippe-leopoldie.vercel.app/

Backend:
Example of end points getBooks: https://leopoldie-booklibrary-backend.herokuapp.com/api/book








