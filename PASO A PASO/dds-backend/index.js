const express = require("express");

// crear servidor
const app = express();

app.use(express.json()); // para poder leer json en el body

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

const categoriasmockRouter = require("./routes/categoriasmock");
app.use(categoriasmockRouter);


// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});

