const express = require('express');
const { create } = require('express-handlebars');
const products = require('./data/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Handlebars como mecanismo de visualização
const handlebars = create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Servindo arquivos estáticos
app.use(express.static('public'));

// Rota para a página inicial (home)
app.get('/', (req, res) => {
  res.render('home', { products });
});

// Rota para página de cada produto
app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(prod => prod.id === productId);
  res.render('product', { product });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});