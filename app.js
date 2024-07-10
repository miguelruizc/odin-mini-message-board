const express = require('express');
const { router: indexRouter } = require('./routes/index');
const newRouter = require('./routes/new');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(indexRouter);
app.use(newRouter);
app.use((req, res) => {
	res.status(404).render('404');
});

app.listen(3000, () => console.log('Server running, listening to port 3000'));
