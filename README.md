# express-backend 
[![npm version](https://badge.fury.io/js/@meetbit%2Fexpress-backend.svg)](https://badge.fury.io/js/@meetbit%2Fexpress-backend) [![Test](https://github.com/MeetBit/express-backend/actions/workflows/test-package.yml/badge.svg)](https://github.com/MeetBit/express-backend/actions/workflows/test-package.yml) [![Release](https://github.com/MeetBit/express-backend/actions/workflows/release-package.yaml/badge.svg)](https://github.com/MeetBit/express-backend/actions/workflows/release-package.yaml) 

This boilerplate will you get started with a production-ready expressjs backend server complete with the following:

- absolute imports
- modular file structure
- live-reloading
- automated testing
- custom production-ready error handler
- custom logger that interfaces with CloudWatch
- many more

This uses multiple other packages to work. Their documentation will be linked below.

If something does not work, please [file an issue](https://github.com/MeetBit/express-backend/issues/new).

If you need help or have some suggestions, [let us know in Discussions](https://github.com/MeetBit/express-backend/discussions/new).

Express-Backend is maintained and developed by [MeetBit Inc.](https://meetbit.io/)

## Quick Start



```bash
npx @meetbit/express-backend my-server
```

**Make sure you have Node 16.14.0 and Yarn 1.22.x**. This will create a new project called `my-server`, install required packages and run your server for the first time.

//insert gif here

This runs the server in `PORT=3001` to avoid clashes with most frontend frameworks like ReactJS. You can start testing your new server by running a `GET /` request using Insomnia or Postman. Or, you can just type `[http://localhost:3001](http://localhost:3001)` on your browser.

//insert gif

You can start creating routes by adding modules in `./routes` and following how the calendar route is coded.

## Creating Your Server



You’ll need to have Node 16.0.0 or later version but **we recommend running Node 16.14.0** specifically for your local and production environments. **You must also have Yarn 1.2x.x installed**. It is a personal preference we have at MeetBit to use Yarn but feel free to switch to npm if you prefer. You can follow this [tutorial](https://www.mixmax.com/engineering/to-yarn-and-back-again-npm).

### npx

```bash
npx @meetbit/express-backend my-server
```

*([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))*

This **creates a folder** with a structure outlined below and **installs required dependencies** using Yarn. This also **runs your server** on `PORT=3001` by default to avoid clashes with the default ports of most frontend frameworks (PORT=3000).

## Environment Variables



express-backend does not require any environment variables to get started. But the following can be configured for customization and is required for production.
| Key                   | Development Value                |
|-----------------------|----------------------------------|
| ENV                   | dev (default) \| prod \| staging |
| PORT                  | 3001 (default)                   |
| AWS_ACCESS_KEY_ID     | *generate your own               |
| AWS_SECRET_ACCESS_KEY | *generate your own               |
| AWS_REGION            | *generate your own               |

*(The required AMI Permissions used for logging to CloudWatch be available below.)*

## File Structure



```
my-server/
├── bin/
├── controllers/
├── middlewares/
│   ├── middlewareA/
│   │   └── index.js
├── public/
│   └── images/
│       └── logo-32.png
├── routes/
│   ├── calendar/
│   │   ├── calendar.js
│   │   ├── calendar.test.js
│   │   └── index.js
│   └── index.js
├── tests/
│   └── app.test.js
├── utils/
├── ├── logger/
│   │   └── index.js
├── .env
├── .gitignore
├── app.js
├── jsconfig.json
├── LICENSCE
├── package.json
├── README.md
└── yarn.lock
```

Express-Backend follows a modularized version of the Model-View-Controller (MVC) pattern where instead of separating routers and controllers, we join them in the same module including the route’s tests. To explain each file/folder:

- /bin → holds www file to run your server.
- /controllers → holds general controllers that you think might be used by several routes. (might not be very necessary with modules but just in case).
- /middlewares → holds scustom middlewares here. catchAsync and globalLogger is included.
- /public → holds static assets like images, etc.
- /routes → holds your modularized routes.
- /tests → holds general application tests.
- /utils → holds general utilities. A custom winston logger is included.

In case you’re wondering, the example route provided is `calendar` because that’s what we deal with at MeetBit.

## Live-Reloading and Running Your Server



```bash
yarn dev
```

Express-Backend has been **configured to use nodemon** when running your server on during development. Please not that this is NOT hot-reloading. nodemon restarts your server every time it notices changes in your code (except in /tests) so session data, states and other ephemeral data will not be stored. Your frontend application will also be needed to be refreshed separately.

To learn more on how to configure and customize nodemon, read its documentation.

## Absolute Imports



```jsx
// app.js
...
const globalLogger = require('#middlewares/globalLogger')
const indexRouter = require('#routes/index')
```

Express-Backend has been configured to allow **absolute imports without any additional packages or typescript**. To use, simple follow the syntax above and append an `#` before the folder name in root. 

Please note that this was only preconfigured to be used on index.js files of modules in the locations outlines below and on any file in root. Nesting is also allowed and works (e.g. `#routes/routeA/subRouteB` )

- #root (any file)
- #controllers
- #middlewares
- #public
- #routes
- #tests
- #utils

### Making Modifications

The main way we are making this work is with subpath imports in `package.json` and `jsconfig.json` for intellisense so you will need to make modifications to both files. At the same time, you will need to make adjustments to `jest: {... moduleNameMapper: { ... } }` in package.json for tests to work. You can follow the following syntax for both files.

```jsx
//package.json

...
//subpath imports
"imports": {
  "#root/*": "./*",  // this will allow you to reference all files but you will also have to mention the filename itself. e.g. require(`#root/app.js`)
  "#controllers/*": "./controllers/*/index.js", // this is perfect for modules and there will be no need to mention index.js. e.g. require(`#routes/calendar`)
	...
},

...
//jest moduleNameMapper
"jest": {
    ...
  "moduleNameMapper": {
    "#root/(.*)": "<rootDir>/$1", // <rootDir> references the root directory
    "#controllers/(.*)": "<rootDir>/controllers/$1", // $1 references the wildcard that replaces (.*)
  }
},

...
```

```jsx
//jsconfig.json

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "#root/*": ["./*"],
      "#controllers/*": ["./controllers/*"],
    }
  }
}
```

Why `#`? This is because subpath imports use the `#` prefix compared to module-alias’ `@` prefix. We opted to use subpath imports for two main reason: (1) less packages; and (2) differentiation between npm packages starting with the `@` prefix.

## Pre-Built Middleware



Express-Backend has three pre-built middleware for you, `catchAsync`, `globalLogger` and `newError`.

### catchAsync

```jsx
//calendar.js

exports.getCalendar = catchAsync(async (req, res, next) => {
	//do some api calls
	
	//logger
	res.status(200).send('Successfully got calendar')
})
```

The general usage for catchAsync is outlined above and it is **used to remove the need for a try-catch block around an entire controller** that makes requests to an API. To use, follow syntax above and wrap your asynchronous controller in catchAsync.

### globalLogger

```
2022-03-05T20:59:07.720Z info: [requestId-xxYY] POST /calendar Request Received
2022-03-05T20:59:07.732Z info: [requestId-xxYY] POST /calendar Responded in 5.506ms
```

**Every request that comes in and when responses are sent out is logged** with globalLogger. The response time is also included at the response log. The above shows how both logs will show on your console. More information about how logging can be done is available below.

### newError

```
2022-03-05T20:59:25.843Z error: [requestId-xxYY] POST /calendar 500 Internal Server Error-Something went wrong in creating your calendar.
```

**We implemented an error-handling middleware to process all errors**. It builds on top of http-errors and logs errors using our custom logger and comes preconfigured. Just make sure to keep `app.use(errorHandler)` in `app.js` at the end of the file after all other middleware and routes. Here’s the error-handler’s standard behavior:

- In production, the default error status code is 500 unless specified.
- In production, any http errors with status codes >500 is reverted to 500.
- In production, only the status code and error message is logged and returned in the response.
- In development and staging, instead of the error message, a stack trace is logged and returned in the response.

newError uses http-error so you can **follow the standard syntax of createError()** to throw errors:

```jsx
if (!user) return next(createError(401, 'Unauthorized. Please login.'))
```

In addition to the above three middlewares, **express-backend  and configures the following useful middlewares** for you:

- helmet
- compression
- cors
- express.json
- express.urlencoded
- cookieParser
- responseTime

## Custom Winston Logger with CloudWatch



Express-Backend has **a pre-built custom logger that logs request information along with your message** for easily tracing errors and requests in production. It uses winston and winston-cloudwatch to interface with AWS CloudWatch in production.

### Setup

In order to use our custom logger in production, you have to setup your environment variables to connect to CloudWatch. `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_REGION` are required. The **minimum AMI Permissions** required for the logger are: 

- DescribeLogStreams
- CreateLogGroup
- CreateLogStream
- PutLogEvents
- PutRetentionPolicy

### Usage

```jsx
const logger = require('#utils/logger')

const thisIsAController = (req,res,next) => {
	logger.error(`message`, req) // with request object
}

logger.info(`message outside a controller`) // without request object
```

Using the logger is quite simple and **can be used to completely replace `console.log`** even in development. Whenever you are in a controller or have access to the HTTP request object, you can pass it as the second parameter and the request information will be logged together with your message. This is optional and you can still log messages without it. The logger follows [winston’s logging levels](https://github.com/winstonjs/winston#logging-levels) (based on npm logging levels) as laid out below:
| level   | priority |
|---------|----------|
| error   | 0        |
| warn    | 1        |
| info    | 2        |
| http    | 3        |
| verbose | 4        |
| debug   | 5        |
| silly   | 6        |

### Logging Behavior

```
2022-03-05T21:46:51.731Z info: RUNNING express-backend v1.0.0 on PORT 3001
2022-03-05T21:18:17.376Z info: [requestId-xxYY] POST /calendar - Request Received
2022-03-05T21:18:17.379Z error: [requestId-xxYY] POST /calendar - 500 Internal Server Error-InternalServerError: Something went wrong in creating your calendar.
    at /express-backend/routes/calendar/calendar.js:24:32
    at /express-backend/middlewares/catchAsync/index.js:27:5
		...long stacktrace
2022-03-05T21:18:17.392Z info: [requestId-xxYY] POST /calendar - Responded in 5.415ms
```

The above shows **how logs are viewed from the console** in development. As mentioned in newError above, the stack trace is logged when errors occur in development and staging. The first line also illustrates logs that do not come from within a controller.

// insert image

The above shows **how logs are viewed from CloudWatch** for production. Staging are similar except: (1) they log the stack trace when an error occurs; and (2) the Log Group Name is automatically is suffixed with `-staging` (e.g. express-backend-staging). The logger also handles running your server in clusters and separates each instance on a separate Log Stream.

### Request Information

The biggest advantage that our custom logger brings is its ability to log request information along with your logs. This allows you to easily search and filter for certain logs from within CloudWatch (and even your console). By default, the logger includes the following information on every log:

- log level
- request ID
- request method
- request path

Something that might be unfamiliar for most of you is the `requestId` inside the brackets. This is not standard but is something we do at MeetBit to trace all logs belonging to a single request and allows us to connect an event from the frontend to a particular request. To use this, simply add `x-request-id` to your headers.

## Testing



```bash
yarn test
```

Express-Backend comes with jest, supertest and jest-runner-groups for **automated testing**. Running the command above will run all `*.test.js` files within your project. Refer to jest and supertest, and jest-runner-groups’ documentation for an in-depth explanation of how to setup your tests. A general setup can be seen in `tests/app.test.js` and `route/calendar/calendar.test.js`.

### Modular Testing

```jsx
//calendar.test.js

/**
 * Main Test File.
 * 
 * @group unit
 * @group integration
 * @group calendar
 */

 const request = require("supertest");
 const app = require("#root/app");
 
 const { nanoid } = require('nanoid')
 
 describe("Testing calendar functions.", () => {
   test("GET /", (done) => {
     request(app)
       .get("/calendar/123")
       .set('x-request-id', `test-${nanoid(6)}`)
       .expect(200)
       .end((err, res) => {
         if (err) return done(err);
         return done();
       });
   })

	... other tests
})
```

Similar to how we recommend you store your controllers and routes under the same folder as a module, **we also recommend you write your tests in a modular way**. You may reserve `tests/*` for general app-wide tests that check functionality across multiple facets of your app. To do this, you can simply add groups to the test files to which tests the files are a part of. The example above indicates the test will run for unit, integration and calendar tests.

### Grouping Tests

```bash
yarn test --group=unit --group=sanity
```

In connection to the previous section, running tests for a particular group is quite easy. You just have to **add the `--group` flag to the test command and indicate which tests you want to run**. The example above will run tests that are a part of unit and/or sanity. You may also opt to just run tests on a single group.

## Contributing



We are open for contributions! We’re not yet sure how to go about this so just feel free to create a pull request.

## Sponsors



Support Express-Backend by contributing financially as a sponsor. [Sponsor a monthly amout here](https://buy.stripe.com/4gw5nHbMv6jJfNS4gg) and we'll add you in this README.

## Resources



This file references documentation from the different dependencies that this project uses. Here are links to the most important ones you will need as you develop your server.

- [ExpressJs](https://expressjs.com/en/4x/api.html)
- [nodemon](https://github.com/remy/nodemon)
- [http-errors](https://github.com/jshttp/http-errors)
- [winston](https://github.com/winstonjs/winston)
- [winston-cloudwatch](https://github.com/lazywithclass/winston-cloudwatch)
- [jest](https://github.com/facebook/jest)
- [supertest](https://github.com/visionmedia/supertest) 
- [jest-runner-groups](https://github.com/eugene-manuilov/jest-runner-groups)

## License



Express-Backend is open source software by [MeetBit Inc](https://meetbit.io). [licensed as MIT](https://github.com/MeetBit/express-backend/blob/master/LICENSE)
.