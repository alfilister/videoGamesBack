const { Router } = require("express")
const { Videogame, Genre } = require("../db")
const {
  getAllVideogames,
  getApiInfo,
  getDbInfo,
  getVideogameByName,
  getVideogameById,
  postVideogame,
  deleteVideogame,
} = require("../controllers/videogame")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    let totalVideogames = await getAllVideogames()
    const { name } = req.query

    if (name) {
      const response = getVideogameByName(name, totalVideogames)
      response.videoSlice
        ? res.status(200).json({
            status: "found",
            quantity_found: response.videoName.length,
            quantity_shown: response.videoSlice.length,
            data: response.videoSlice,
          })
        : res.status(404).json({ status: "notFound" })
    } else {
      res.status(200).json({
        length: totalVideogames.length,
        data: totalVideogames,
      })
    }
  } catch (err) {
    next(err)
  }
})

router.get("/db", async (req, res, next) => {
  try {
    let dbVideoGames = await getDbInfo()
    res.send(dbVideoGames)
  } catch (err) {
    next(err)
  }
})

router.get("/api", async (req, res, next) => {
  try {
    let apiVideogames = await getApiInfo()
    res.send(apiVideogames)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    const response = await getVideogameById(id)

    response
      ? res.status(200).send(response)
      : res.status(404).send("ID not found")
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const videoCreated = await postVideogame(req.body)
    res.status(201).json({
      status: "Videogame succesfully created",
      dataProvided: videoCreated,
    })
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await deleteVideogame(id)

    res.json({
      status: `Videogame with id: ${id} succesfully deleted`,
      dataRemainInDb: result,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
