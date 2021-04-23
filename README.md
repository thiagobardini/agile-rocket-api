## Description
CRM - Custom Relation Management 
<br>
Manage Accounts and Opportunities administrative tasks, and close more deals faster.

## Technologies used for the Application.
- HTML
- SCSS
- JavaScript
- React
- Axios
- Bootstrap
- Passport
- MongoDB

## Important Links

- [Agile Rocket Client Repo](https://github.com/thiagobardini/agile-rocket-client)
- [Agile Rocket API Repo](https://github.com/thiagobardini/agile-rocket-api)
- [Deployed Agile Rocket API](https://mysterious-sierra-58663.herokuapp.com/)
- [Deployed Agile Rocket Client](https://thiagobardini.github.io/agile-rocket-client/#/)

## API URL
    production: 'https://mysterious-sierra-58663.herokuapp.com/',
    development: 'http://localhost:4741'
  
## Set up and installation
1. Download this application.
2. Unzip the application.
3. Move into the folder and run the command `git init`.
4. Install dependencies with `npm install`.
5. Ensure that you have  `nodemon`  installed by running  `npm install -g nodemon`.
6. Ensure the API is functioning properly by running  `npm run server`.
7. Once everything is working, make an initial commit.
8. Run the development server with `npm start`.

## Tasks

| Command                | Effect                                                                                                      
|------------------------|-------------------------------------------------------------------------------------------------------------|
| `npm run server`       | Starts a development server with `nodemon` that automatically refreshes when you change something.                                                                                         |
| `npm test`             | Runs automated tests.                                                                                       |
| `npm run debug-server` | Starts the server in debug mode, which will print lots of extra info about what's happening inside the app. |
## Deployment
`git commit -a - m "your messages"`

`git checkout main`

`git merge your_feature_branch`

`git push heroku main`

`heroku restart`

## API Routes
| Verb   | URI Pattern        | Request Body      | Headers   | Action              |
|--------|--------------------|-------------------|-----------|---------------------|
| POST   | `/sign-up`         | **credentials**   | N/A       | user sign-up        |
| POST   | `/sign-in`         | **credentials**   | N/A       | user sign-in        |
| DELETE | `/sign-out`        | N/A               | **Token** | user sign-out       |
| PATCH  | `/change-password` | **passwords**     | **Token** | change-password     |
|        |                    |                   |           |                     |
| GET    | `/accounts`           | N/A               | N/A       | index accounts         |
| GET    | `/accounts/:id`       | N/A               | N/A       | show single account    |
| POST   | `/accounts`           | `post: {}`        | **Token** | create account         |
| PATCH  | `/accounts/:id`       | post              | **Token** | update account         |
| DELETE | `/accounts/:id`       | N/A               | **Token** | remove account         |
|        |                    |                   |           |                     |
| GET    | `/opportunities`        | N/A               | **Token** | index account opportunities |
| GET    | `/opportunities/:id`    | N/A               | **Token** | show account opportunity   |
| POST   | `/opportunities`        | `opportunity: {}`     | **Token** | create account opportunity |
| PATCH  | `/opportunities/:id`    | opportunity           | **Token** | update account opportunity |
| DELETE | `/opportunities/:id`    | N/A               | **Token** | delete account opportunity |

### Unsolved Problems
- I want to improve styling.
- Version 2, I am still working on - I still need to create some features as create multiple opportunities/show all/update/delete for opportunities.
- For version 3, I want to create some charts and data reports.

## ERD
![](https://i.imgur.com/NqYzWFc.png)
