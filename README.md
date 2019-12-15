## How to use

Clone this repo and then in command line type:

`npm install` or `yarn`  to  install all dependencies

--

To launch app run `npm run start` or `yarn start` 


gh-pages link → [js-band-hw--final-task](https://nazarenkodima.github.io/js-band-hw-final-task/index.html)


### Project commands
Command name       | Description                                                      
:------------------|:----------------------------------
`start`            | start webpack-dev-server and watch for file changes          |
`build:config`     | build production version
`build:dev`        | builds dev version in dev env  (without code optimizations)
`build:prod`       | builds prod version in prod env (with code optimizations)
`test`             | run tests
`test:watch`       | run test and watch for changes
`code:clean`       | format and lint code together
`code:lint`        | lint code
`code:format`      | format code
`code:check:rules` | shows custom added rules

### Project structure
<pre>
   <code>
    .
    ├── README.md
    ├── nodemon.json
    ├── package-lock.json
    ├── package.json
    ├── source
    │   ├── REST                  // REST API
    │   │   ├── api.js
    │   │   ├── config.js
    │   │   └── index.js
    │   ├── bus                  // component's actions, reducers and types
    │   │   ├── auth
    │   │   ├── books
    │   │   ├── cart
    │   │   ├── counter
    │   │   ├── filters
    │   │   ├── ui
    │   │   ├── validators
    │   │   └── viewBook
    │   ├── components           // project's components
    │   │   ├── Book
    │   │   ├── Books
    │   │   ├── Cart
    │   │   ├── CartIcon
    │   │   ├── CartItem
    │   │   ├── Nav
    │   │   ├── NotFound
    │   │   ├── Notification
    │   │   ├── PriceWidget
    │   │   ├── SignIn
    │   │   ├── Spinner
    │   │   ├── ViewBook
    │   │   └── index.js
    │   ├── index.js
    │   ├── init                 // project's store, rootReducer, middleware     
    │   │   ├── middleware
    │   │   ├── rootReducer.js
    │   │   └── store.js
    │   ├── navigation           // project's routing
    │   │   ├── App.js
    │   │   ├── Private.js
    │   │   ├── Public.js
    │   │   └── book.js
    │   ├── pages                // project's pages
    │   │   ├── BookPage.js
    │   │   ├── BooksList.js
    │   │   ├── CartPage.js
    │   │   ├── NotFound.js
    │   │   ├── SignInPage.js
    │   │   └── index.js
    │   └── theme                // project's styles, assets
    │       ├── breakpoints.css
    │       ├── fonts
    │       ├── globals.css
    │       ├── images
    │       ├── init.css
    │       └── palette.css
    ├── static             
    │   ├── favicon
    │   │   └── favicon.png
    │   └── logos
    │       └── React.png
    ├── tree.txt
    ├── tsconfig.json
    └── webpack
    ├── .babelrc
    ├── .editorconfig
    ├── .eslintignore
    ├── .eslintrc.js
    ├── .gitignore
    ├── .prettierrc.js
    ├── .travis.yml
   </code>
</pre>
