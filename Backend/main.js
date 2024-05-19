const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();

app.use(cors());
app.use(express.json());

const contentTypesRoutes = require('./routes/contentTypes');
const contentEntriesRoutes = require('./routes/contentEntries');

app.use('/content-types', contentTypesRoutes);
app.use('/content-entries', contentEntriesRoutes);

const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
    app.listen(PORT , () => {
        console.log(`app running on port ${PORT}`);
    });
});

