# BookLibrairyProject
In development:

My very first full stack app, using Sql server (Azure DataStudion v1.41.2) , Entity framework code first migration as API (.Net 7.0) , React and css as frontend, this app is an assignment from Salt bootcamp where I had 24 hours to build a fullstack CRUD application  and being responsive design.

I decided to create a simple application for users to share with others the books and stories they had read and share their opinion about them. As it is often difficult to choose which book to read, the application offers a book to read among the various books already published in the application.

Initialy I had three tables user,Books and Opinions.For that assignment I have decided to have focus on the one to many relation between Books and Opinions first and managing the corresponding CRUD operations before going further with the User table.

So for every review added a virtual book is generated with the related review informations and so far it looks like this:

![my image](presentation_image.png)




# Technologies

Azure Sql Database

Entity framework code first approach

ASP.NET Core Web APIs

React (Typescript)


# deploying link:
the application is still in development but deployed on azure cloud service,  that allow me to work with:

  -the migration tool provided by EF core

  -the deployement process throw github actions

  -Azure cloud

NB: Due to Azure cold storage strategy there is few seconds of loading after some moment of inactivity for the first connection.

here is the deploying link:

https://green-flower-0ba5fcf03.2.azurestaticapps.net/



