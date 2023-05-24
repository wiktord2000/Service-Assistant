# Service Assistance
The purpose of the engineering project was to design and implement a web application for small car service workshops. Currently available solutions often focus only on larger businesses, which ultimately means that smaller ones receive a too advanced tool that does not support their work, but rather complicates it.

The implemented application offered a simple user interface, instinctive associations between resources, and facilitated communication with the customer by sending e-mails without the need to use external mailboxes. Additionally, the application offers the ability to analyze collected data, which can be used to make strategic decisions by the company.

<img width=180 src="https://user-images.githubusercontent.com/63188869/218562492-2779f525-26c4-4e8f-9455-e91a034a6242.png" />

## Use cases

- Company login and registration
- Maintaining a database of services provided by the company
- Maintaining a database of car parts and accessories
- Issuing invoices for services performed in the service center **| not ready yet**
- Sending notifications to customers' email addresses (e.g. repair status updates)
- Reviewing statistics based on data collected by the application (e.g. most commonly repaired car make and year) **| partly implemented**
- Managing orders (creating, planning, and continuously updating information)
- Maintaining a customer profile (e.g. repair history, owned vehicles, contact information)
- Maintaining a vehicle profile (e.g. repair history, owner information, and basic vehicle information)

> **Note**<br/> 
> The main purpose was to create application **only for desktops / large screens** because of amount of data presented but progressively I'm working on responsiveness. I've recently provided better scalable tables and split the client profile to the desired form (I'm going to make the same with other profiles). Sometimes you may encounter leftover css because I didn't use scss/sass from the beginning (I'm going to dispose it totally from the project).<br/> 

## Technologies 

- Angular
- Angular Material
- ASP.NET Core
- MailKit
- ngx-charts
- RxJS
- Entity Framework Core
- SqLite
- Swagger

## Preview

### Main views
<kbd><img width="100%" src="https://user-images.githubusercontent.com/63188869/218577462-26212b4b-ebb9-4e87-bc5e-6f3bd62f7307.png" /></kbd>

<kbd><img width="100%" src="https://user-images.githubusercontent.com/63188869/218578298-444c5774-9c7f-4aa0-938f-e72a1ba5422a.png" /></kbd>

<kbd><img width="100%" src="https://user-images.githubusercontent.com/63188869/218578320-bc42ec95-90e8-4f4a-9e70-9dd5bd1373d5.png" /></kbd>

<kbd><img width="100%" src="https://user-images.githubusercontent.com/63188869/218578332-77ccc7b7-e811-4e82-bbef-a26d10f3a98f.png" /></kbd>

<kbd><img width="100%" src="https://user-images.githubusercontent.com/63188869/218578363-2984c44d-26fb-40fb-b10b-d3a9bdb82618.png" /></kbd>

<kbd><img width="100%" src="https://user-images.githubusercontent.com/63188869/218578371-fd877fac-4f2a-43c8-98f8-9889fc597600.png" /></kbd>

### Adding order

<kbd><img width=700 src="https://user-images.githubusercontent.com/63188869/218578058-d9d3306a-cf97-4217-88b2-ecadc48640cd.png" /></kbd>

### Adding client

<kbd><img width=700 src="https://user-images.githubusercontent.com/63188869/218578352-41b9c924-2a5e-4250-a266-31b896eac846.png" /></kbd>


### Order's profile
<kbd><img width=700 src="https://user-images.githubusercontent.com/63188869/218579577-c4e96662-d989-4b0f-bbdc-579326cd1858.png" /></kbd>

<kbd><img width=700 src="https://user-images.githubusercontent.com/63188869/218579585-e3aaf065-cdbd-4d4d-b649-96e1b1947d9d.png" /></kbd>

### Part's profile

<kbd><img width=700 src="https://user-images.githubusercontent.com/63188869/218579606-b712d75f-6ae8-411e-b19b-bae76bfa39c7.png" /></kbd>

### Vehicle's profile

<kbd><img width=700 src="https://user-images.githubusercontent.com/63188869/218579620-52ef3e7d-6923-44fa-b5f2-4a13a4194ca7.png" /></kbd>

### Client's profile

<kbd><img width=700 src="https://user-images.githubusercontent.com/63188869/218579626-1c266a1a-c860-430e-913a-3c13b3020bfe.png" /></kbd>

<kbd><img width=700 src="https://user-images.githubusercontent.com/63188869/218579637-56105c2f-e037-4ccb-824a-9c3e3efa2153.png" /></kbd>

### Mail sending
<kbd><img width="100%" src="https://user-images.githubusercontent.com/63188869/218579653-734cc9ea-f23c-4a7e-88cc-96de0407f938.png" /></kbd>

## How to run the application?
1. Ensure you have **npm** installed ( run <code>npm -version</code> ) if not look at the instruction below. 
2. Ensure you have the **Angular CLI** installed ( run <code>ng version</code> ) if not run <code>npm install -g @angular/cli</code>.
3. Ensure you have **.NET 6.0** installed ( run <code>dotnet --version</code> ) if not download it from https://dotnet.microsoft.com/en-us/download.
4. Clone project from GitHub
5. Open new terminal inside <code>API/</code> folder and run command <code>dotnet run</code>.
6. Open new terminal inside <code>client/</code> folder and run commands <code>npm install</code> and <code>ng serve</code>
7. You should see following result in the console: 

<kbd><img width=600 src="https://user-images.githubusercontent.com/63188869/224010054-94adb8e9-5157-494a-9716-a29049a0928d.png" /></kbd>

8. Click the given URL to display content in your default browser.
9. Enjoy it!

> **:exclamation: Note: You don't have to create new account :exclamation:**<br/> 
> I recommend you to use the account with mocked data using following credentials:<br/> 
> **Login:** <code>wiktor</code><br/> 
> **Password:** <code>qweqweqwe</code>

### Npm installation

>**Note: npm is installed with Node.js**

This means that you have to install Node.js to get npm installed on your computer.
<br>
Download Node.js from the official Node.js web site: https://nodejs.org

## Swagger UI

If you want make a quick preview of created API and its endpoints you can simply use following URL 
<br>
<code>https://localhost:5001/swagger/index.html</code>

You should see following result inside your browser:
<kbd><img width=700 src="https://user-images.githubusercontent.com/63188869/224013071-426771ef-b844-4c0c-9292-3494ca63b94a.png" /></kbd>

>**Note:** The server have to be running (use <code>dotnet run</code> inside <code>API/</code> directory) </br>
>**More about Swagger:** <code>https://swagger.io/tools/swagger-ui/</code>

## Versions

### Angular project
<kbd><img width=400 src="https://user-images.githubusercontent.com/63188869/221030446-4890cdb9-8e8e-4aa9-8210-bfaf6f325a35.png" /></kbd>

### .NET Project
<kbd><img width=400 src="https://user-images.githubusercontent.com/63188869/221031975-102e7b0a-afce-46ff-adc1-0200848f6d90.png" /></kbd>

## More
The complete documentation for this project (PL): 
<br/>
https://drive.google.com/file/d/1yNgi6vnYRKNHuwGQwIwctEtKb8OX5P0Q/view?usp=sharing
