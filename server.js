const express = require('express');
const nunjucks = require('nunjucks');
const path = require("path");
const sass = require('sass');
const { writeFileSync } = require('fs-extra');
const {ensureDir} = require("fs-extra");
const appRouter = require('./src/app/appRouter');

const app = express();
const port = 3000;

// Compile SASS
const result = sass.compile(path.join(__dirname, 'src/assets/sass/index.scss'), {
    quietDeps: true,
    sourceMap: true,
    sourceMapIncludeSources: true,
    style: 'expanded'
})

ensureDir(path.join(__dirname, 'public/css'), () => {
    writeFileSync(path.join(__dirname, 'public/css/index.css'), result.css)
})

// Set up Nunjucks templating engine
nunjucks.configure(['node_modules/govuk-frontend/dist', 'src/views'], {
    autoescape: true,
    express: app,
});

// Serve static public from src/assets
app.use('/public', express.static(path.join(__dirname, 'src/assets')))

// Serve static public/css from public/css
app.use('/public/css', express.static(path.join(__dirname, 'public/css')))

// Serve static assets from govuk-frontend
app.use('/assets', express.static(path.join(__dirname, 'node_modules/govuk-frontend/dist/govuk/assets')));

// Set the view engine to Nunjucks
app.set('view engine', 'njk');

// Define routes
app.use('/', appRouter);

// Page not found
app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
