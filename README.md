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
> The main purpose was to create application mostly for desktops / large screens because of amount of data presented but progressively I'm working on responsiveness. I've recently provided better scalable tables and split the client profile to the desired form (I'm going to make the same with other profiles). Sometimes you may encounter leftover css because I didn't use scss/sass from the beginning (also working on it).<br/> 

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

### Panels
https://github.com/wiktord2000/Service-Assistant/assets/63188869/7200211c-15b0-42b9-b519-bfe9c9139260

https://github.com/wiktord2000/Service-Assistant/assets/63188869/974686b4-f1e6-445e-b7b3-5923e6f01c03

https://github.com/wiktord2000/Service-Assistant/assets/63188869/e121641a-666f-486e-8f96-d717c85cf9e2

https://github.com/wiktord2000/Service-Assistant/assets/63188869/23889142-1403-4c18-80ea-1a9bddf17978

https://github.com/wiktord2000/Service-Assistant/assets/63188869/1842ee8a-3541-4828-baa8-b69de0a666f0

https://github.com/wiktord2000/Service-Assistant/assets/63188869/60244694-4f5d-40f4-9d12-1e26cb2cfb5f

### Profiles
https://github.com/wiktord2000/Service-Assistant/assets/63188869/03be7f14-3329-4ed5-a9fd-fd5153ccb6d5

https://github.com/wiktord2000/Service-Assistant/assets/63188869/9e93a1dc-8d15-46b2-8e1d-26b33363c71f

https://github.com/wiktord2000/Service-Assistant/assets/63188869/73903d36-d87c-4b52-b864-146059ac61a9

https://github.com/wiktord2000/Service-Assistant/assets/63188869/3461ad96-397a-4034-b1bc-f74644fde6e2


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
