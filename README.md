# Service allow user login using identity provider and Supabase.

- [Important Note](#important-note)
- [Install](#install)
    - [Setup Environment](#setup-environment)
        - [Installation](#installation)
        - [Environment Configuration](#environment-configuration)
- [Commands](#commands)
- [API Endpoints](#api-endpoints)
    - [GET - /api/identity-provider/start](#get---apiidentity-providerstart)
    - [GET - /api/users/user-info](#get---apiusersuser-info)
    - [GET - /health](#get---health)
- [Documents](#documents)
    - [API Document](#api-document)


## Important Note
- We have to run the [front-end](front-end/README.md) (Web client) application to serve the callbacks and obtain the Supabase access token

## Install
### Setup Environment
#### Installation

Before starting to explore this application. You have to make sure your machine has a Node version >= 15.

- `Node verion >= 15` (Required)
- `Docker client` (Optional)
- Run the command `npm i` to install all the dependencies of this application.

#### Environment Configuration

Following `src/.env.example` file, you have to create a new copy file called `src/.env`. This is where the environments variables are situated. The following variables below must be declared in the `.env` file.

- `NODE_ENV=development or NODE_ENV=production` (The running environment of the application)
- `PORT=4001` (Port on which the business logic endpoints are served)
- `CLIENT_APP_URL=http://localhost:3001` (The address web client address where we use to trigger the callback after identity provider login)
- `APP_HOST_NAME=localhost:4001` (The host name that use in Swagger documentation)
- `SUPABASE_ANON_KEY`(The anon key obtained from Supanase app)
- `SUPABASE_SERVICE_URL`(The service url obtained from Supanase app)


## Commands

By using the following commands you will make the application work in the proper way.

```bash
# lint, checking the coding rules
$ npm run lint

# lint, fix violents coding rules
$ npm run lint:fix

# build notification application
$ npm run build

# start the application
$ npm run start

# start the application using Docker development
$ docker-compose up

# force the application running with Docker in the background
$ docker-compose up -d
```

## API Endpoints

### GET - /api/identity-provider/start

Endpoint allows user to request login using their identity provider

> Auth Type: NONE

#### Query Params<!-- omit in toc -->

| Property | Type   | Specificity                     |
|----------| ------ |---------------------------------|
| provider | string | **enum: ['discord', 'google']** |

#### Response<!-- omit in toc -->
Success:

- Redirect to user's identity provider app
- There is a callback url provided, which is the [Web Client URL](front-end/README.md). So, we need to start the font-end application to receive the Supabase access token

400

```jsonc
{
   "statusCode": 400,
    "message": "BAD_REQUEST",
    "data": [
        {
            "message": "query should have required property 'provider'",
            "params": {
                "missingProperty": "provider"
            }
        }
    ]
}
```

500

```jsonc
{
  "statusCode": 500,
  "message": "TRY_AGAIN"
}
```

### GET - /api/users/user-info

Endpoint allows to fetch user's information using their access token provided from Supabase

> Auth Type: Supabase Auth

#### Headers Request<!-- omit in toc -->

| Property      | Type    | Specificity               |
|---------------| ------- | ------------------------- |
| Authorization | string  | **required**              |

#### Response<!-- omit in toc -->

200

```jsonc
{
  "id": "user-id",
  "email": "user@example.com"
```

400

```jsonc
{
  "statusCode": 400,
    "message": "BAD_REQUEST",
    "data": [
        {
            "message": "headers should have required property 'authorization'",
            "params": {
                "missingProperty": "authorization"
            }
        }
    ]
}
```

500

```jsonc
{
  "statusCode": 500,
  "message": "TRY_AGAIN"
}
```

### GET - /health

The default endpoint runs in the middleware when you start running the application. This serves to check the health status of this application.

> Auth Type: NONE

#### Response<!-- omit in toc -->

200 - OK

## Documents

### API Document

After starting the command `npm run start`, you can land on API document page which is`http://${url}:${port}/docs` and all documents for the implemented endpoints are situated there.
