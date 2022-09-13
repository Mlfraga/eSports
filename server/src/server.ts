import express, {Request, Response} from 'express';

const app = express();

app.get('/ads', (request: Request, response: Response) => {
  return response.json([
    {
      name: 'Anúncio 1',
      id: 1
    },
    {
      name: 'Anúncio 2',
      id: 2
    },
  ]);
});

app.listen(3333, () => {
  console.log('server running!');
});