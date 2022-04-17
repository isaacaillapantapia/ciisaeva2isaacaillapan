const express = require('express')
const PlayersController = require('./controllers/PlayersController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const playersController = new PlayersController(sqlClient)

// Routes
router.get('/', playersController.renderHomeWithPlayers)
router.get('/about', pageController.renderAbout)

router.get('/players/create' , playersController.renderPlayerCreationForm)
router.post('/players/create', playersController.insertAndRenderPlayer)

router.get('/players/:id', playersController.renderSinglePlayer)

router.get('/players/:id/update', playersController.renderPlayerUpdateForm)
router.post('/players/:id/update', playersController.updateAndRenderPlayer)

router.post('/players/:id/delete', playersController.deletePlayerAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router