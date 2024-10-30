import express from 'express'
import session from 'express-session'
import robots from 'express-robots-txt'
import nunjucks from 'nunjucks'
import path from 'path'
import { fileURLToPath } from 'url'
import * as sass from 'sass'
import fsExtra from 'fs-extra'
import appRouter from './src/app/app-router.js'
import addFilters from './src/lib/add-filters.js'
import addFunctions from './src/lib/add-functions.js'
import cookieParser from 'cookie-parser'

const { writeFileSync, ensureDir } = fsExtra
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const app = express()
const port = process.env.PORT

// Compile SASS
const result = sass.renderSync({
  file: path.join(__dirname, 'src/assets/sass/index.scss'),
  outFile: path.join(__dirname, 'public/css/index.css'),
  outputStyle: 'expanded'
})

ensureDir(path.join(__dirname, 'public/css')).then(() => {
  writeFileSync(path.join(__dirname, 'public/css/index.css'), result.css)
})

// Set up Nunjucks templating engine
const env = nunjucks.configure(
  ['node_modules/govuk-frontend/dist', 'src/views'],
  {
    autoescape: true,
    express: app
  }
)

app.use(
  robots({
    UserAgent: '*',
    Disallow: '/',
    CrawlDelay: '5'
  })
)

addFilters(env)
addFunctions(env)

// Serve static public from src/assets
app.use('/public', express.static(path.join(__dirname, 'src/assets')))

// Serve static public/css from public/css
app.use('/public/css', express.static(path.join(__dirname, 'public/css')))

// Serve static assets from govuk-frontend
app.use(
  '/assets',
  express.static(
    path.join(__dirname, 'node_modules/govuk-frontend/dist/govuk/assets')
  )
)

// Set the view engine to Nunjucks
app.set('view engine', 'njk')

// Middleware to enable body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Middleware to enable sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

// Middleware to enable cookies
app.use(cookieParser(process.env.SESSION_SECRET))

// Define routes
app.use('/', appRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
