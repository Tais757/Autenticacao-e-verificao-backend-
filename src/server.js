const app = require('./app');

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => console.log(`App ouvindo na porta ${PORTA}`));