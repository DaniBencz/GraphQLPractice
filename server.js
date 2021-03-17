import express from 'express';

const app = express();
const port = process.env.PORT || 4040

app.get('/', (req, res) => {
    res.send('Hello!');
})

app.listen(port, () => console.log(`server running on port ${port}`));
