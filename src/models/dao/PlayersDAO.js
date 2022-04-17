class PlayersDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, title, content, image FROM players')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, title, content, image FROM players WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (player) {
    const response = await this.db.query('INSERT INTO players (title, content, image) VALUES (?, ?, ?)', [player.title, player.content, player.image])
    const result = response[0]
    return result.insertId
  }

  async update (player) {
    const response = await this.db.query('UPDATE players SET title = ?, content = ? , image = ? WHERE id = ? ', [player.title, player.content, player.image, player.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM players WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = PlayersDAO

