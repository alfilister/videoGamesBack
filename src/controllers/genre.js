const axios = require("axios")
const { Genre } = require("../db")
const { API_KEY } = process.env

const getGenres = async () => {
  try {
    const genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    )

    const response = genresApi.data.results.map((el) => el.name)

    const resInDb = await response.forEach((el) => {
      Genre.findOrCreate({
        where: { name: el },
      })
    })

    return response
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getGenres,
}
