import Koa from 'koa';
import Router from 'koa-router';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import studentRoutes from './api/routes/studentRoutes';
import animalsRoutes from './api/routes/animalsRoutes';

const port = 2121;
const app = new Koa();
const router = Router();

app.use(bodyParser());
app.use(respond());

studentRoutes(router);
animalsRoutes(router);

app.use(router.routes())
        .use(router.allowedMethods());
app.listen(port);
console.log(`Listening on ${port}`);
export default app.listen();