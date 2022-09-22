const { Router } = require("express")
const { Genre } = require("../db")
const { getGenres } = require("../controllers/genre")

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const response = await getGenres()
    res.send(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
