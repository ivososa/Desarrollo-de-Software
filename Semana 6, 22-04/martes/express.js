const express = require('express'); //Aca establece las interdependencias de express
const app = express();
const port = 3000;
app.get('/', (req, res) => {
 res.redirect('/home'); // redireccion
});
app.get('/home', (req, res) => {
 res.send('Página de Inicio!');
});
app.get('/aboutus', (req, res) => {
 res.send('Página de Acerca!');
});
app.use('', (req, res) => {
 res.send('Página no econtrada!');
});
app.listen(port, () => {
 console.log(`Aplicacion Hola Mundo escuchando en el
puerto ${port}`);
});