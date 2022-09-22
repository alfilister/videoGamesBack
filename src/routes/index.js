const { Router } = require("express")
const videogamesRoute = require("./videogames")
const genresRoute = require("./genres")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

router.use("/videogames", videogamesRoute)
router.use("/genres", genresRoute)

module.exports = router
