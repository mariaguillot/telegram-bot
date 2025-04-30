// variable global que se puede leer desde cualquier lugar del código- dirname te devuelve en que carpeta de devuelve ...
// cuando usas app llama al archivo app

global.__basedir = __dirname
const app = require('./src/app.js')
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT} `)
})
