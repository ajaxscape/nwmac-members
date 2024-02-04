const express = require('express');
const nunjucks = require('nunjucks');
const govukFrontend = require('govuk-frontend');

const app = express();
const port = 3000;

// Set up Nunjucks templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

// Serve static assets from govuk-frontend
app.use('/govuk-frontend', express.static(govukFrontend.assetPath));

// Set the view engine to Nunjucks
app.set('view engine', 'njk');

// Define routes
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
