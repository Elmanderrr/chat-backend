import { App } from 'app/app';
import { UsersController } from 'app/controllers/router/users.controller';


const app = new App([
  new UsersController()
]);

app.listen();
