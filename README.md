Node JS Farm APP

Node version >= 12 will do


Run script:

```node <file_name>.js```

adding npm: (includes package.json in setup)
```npm init```


Run autobuild script via nodemon:

```nodemon <file_name>.js // if installed globally

add Script in Package.json if we want to use dev dependency in command. e.g. Nodemon
"start": "nodemon index.js", // to use Nodemon if nodemon is not installed Globally (dev dependency)

// to use the "start" script, use npm run 
npm run start // or "npm start"
```
