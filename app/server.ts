import { App } from 'app/app';
import { UsersController } from 'app/controllers/users.controller';


const app = new App([
  new UsersController()
]);

app.listen();
