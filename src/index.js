const PORT = process.env.PORT || 3030;

const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const propiedadesRoutes = require('./routes/v1/propiedadesRoutes');
const clientesRoutes = require('./routes/v1/clientesRoutes');
const reservacionRoutes = require('./routes/v1/reservacionRoutes');
const ubicacionRoutes = require('./routes/v1/ubicacionRoutes');
const amenidadesRoutes = require('./routes/v1/amenidadesRoutes');
const pagosRoutes = require('./routes/v1/pagosRoutes');

app.use('/api/v1/propiedadesRoutes', propiedadesRoutes);
app.use('/api/v1/clientesRoutes', clientesRoutes);
app.use('/api/v1/reservacionRoutes', reservacionRoutes);
app.use('/api/v1/ubicacionRoutes', ubicacionRoutes);
app.use('/api/v1/amenidadesRoutes', amenidadesRoutes);
app.use('/api/v1/pagosRoutes', pagosRoutes);

app.listen(PORT, () => {
    console.log(`Api running on port ${PORT}`);
});