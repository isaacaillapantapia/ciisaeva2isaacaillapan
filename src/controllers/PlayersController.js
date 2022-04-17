const PlayersDAO = require('../models/dao/PlayersDAO')

class PlayersController {
  constructor (db) {
    this.playersDao = new PlayersDAO(db)
    this.renderHomeWithPlayers = this.renderHomeWithPlayers.bind(this)
    this.renderSinglePlayer = this.renderSinglePlayer.bind(this)
    this.renderPlayerCreationForm = this.renderPlayerCreationForm.bind(this)
    this.renderPlayerUpdateForm = this.renderPlayerUpdateForm.bind(this)
    this.insertAndRenderPlayer = this.insertAndRenderPlayer.bind(this)
    this.updateAndRenderPlayer = this.updateAndRenderPlayer.bind(this)
    this.deletePlayerAndRenderResponse = this.deletePlayerAndRenderResponse.bind(this)
  }

  async renderHomeWithPlayers (req, res) {
    const players = await this.playersDao.getAll()
    res.render('home', {
      players
    })
  }

  async renderSinglePlayer (req, res) {
    const id = req.params.id

    try {
      // throw Error('Murio la Base de Datos') <-------------- este es un codigo para forzar un error y botar la base de datos
      const player = await this.playersDao.getById(id)

      if (!player) {
        res.status(404).render('404')
        return
      }

      res.render('player', {
        id,
        title: player.title,
        content: player.content,
        image: player.image
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderPlayerCreationForm (req, res) {
    res.render('player-form')
  }

  async renderPlayerUpdateForm (req, res) {
    const id = req.params.id

    try {
      const player = await this.playersDao.getById(id)

      if (!player) {
        res.status(404).render('404')
        return
      }

      res.render('player-form', {
        id,
        title: player.title,
        content: player.content,
        image: player.image
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderPlayer (req, res) {
    const title = req.body.title
    const content = req.body.content
    const image = req.body.image

    const player = { title, content, image }

    try {
      const id = await this.playersDao.create(player)

      res.redirect(`/players/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderPlayer (req, res) {
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content
    const image = req.body.image

    try {
      const player = { title, content, id, image }

      await this.playersDao.update(player)

      res.redirect(`/players/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deletePlayerAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const player = await this.playersDao.getById(id)

      if (!player) {
        res.status(404).render('404')
        return
      }

      await this.playersDao.delete(id)

      res.render('player-deleted', {
        id,
        title: player.title
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = PlayersController
