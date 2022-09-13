import express from 'express';
const app = express();
app.get('/users', (request, response) => {
    console.log('teste');
    return response.json([
        {
            name: 'Matheus',
            id: 1
        }
    ]);
});
app.listen(3333, () => {
    console.log('server running!');
});
