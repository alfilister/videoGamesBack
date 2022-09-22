const axios = require("axios")
const { Videogame, Genre } = require("../db")
const { API_KEY } = process.env

const getApiInfo = async () => {
  try {
    var first100 = []

    for (let i = 1; i <= 5; i++) {
      let apiUrl = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
      )

      let apiInfo = apiUrl.data.results.map((el) => {
        return {
          id: el.id,
          background_image: el.background_image,
          name: el.name,
          description: el.description,
          released: el.released,
          rating: el.rating,
          platforms: el.platforms.map((el) => el.platform.name),
          genres: el.genres.map((el) => el.name),
        }
      })

      first100 = first100.concat(apiInfo)
    }

    return first100
  } catch (err) {
    console.log(err)
  }
}

const getDbInfo = async () => {
  try {
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })
  } catch (err) {
    next(err)
  }
}

const getAllVideogames = async () => {
  try {
    let apiInfo = await getApiInfo()
    let dbInfo = await getDbInfo()

    const totalInfo = dbInfo.concat(apiInfo)

    return totalInfo
  } catch (err) {
    next(err)
  }
}

const getVideogameByName = (name, totalVideogames) => {
  const videoName = totalVideogames.filter((el) =>
    el.name.toLowerCase().includes(name.toLowerCase())
  )
  if (videoName.length) {
    let videoSlice = videoName.slice(0, 15)
    return { videoSlice, videoName }
  } else {
    return undefined
  }
}

const getVideogameById = async (id) => {
  try {
    if (id.includes("-")) {
      let dbInfo = await getDbInfo()
      let dbData = dbInfo.filter((el) => el.id === id)
      var dbVideoname = dbData[0]

      return dbVideoname
    } else {
      let idData = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      )
      let response = idData.data

      if (response) {
        let newFormat = {
          background_image: response.background_image,
          name: response.name,
          description: response.description,
          released: response.released,
          rating: response.rating,
          platforms: response.platforms.map((el) => el.platform.name),
          genres: response.genres.map((el) => el.name),
        }

        return newFormat
      } else {
        return undefined
      }
    }
  } catch (err) {
    console.log("Id not found BackEnd")
  }
}

const postVideogame = async (body) => {
  const {
    name,
    background_image,
    description,
    released,
    rating,
    platforms,
    genres,
  } = body

  let videoCreated = await Videogame.create({
    name,
    background_image,
    description,
    released,
    rating,
    platforms,
  })

  let genresDb = await Genre.findAll({
    where: { name: genres },
  })

  videoCreated.addGenre(genresDb)

  return videoCreated
}

const deleteVideogame = async (id) => {
  try {
    await Videogame.destroy({
      where: {
        id: id,
      },
    })
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })
  } catch (err) {
    console.log("Videogame ID not exist in DB")
  }
}

module.exports = {
  getAllVideogames,
  getDbInfo,
  getApiInfo,
  getVideogameByName,
  getVideogameById,
  postVideogame,
  deleteVideogame,
}
