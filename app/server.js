import { homeController } from "./controllers/home.js";
import { addItemController, itemsController } from "./controllers/items.js";
import { notFoundContoller } from "./controllers/notFound.js";
import { addSessionController, deleteSessionController, loginFormController } from "./controllers/sessions.js";
import { staticController } from "./controllers/static.js";
import { addUserController, registrationFormController } from "./controllers/users.js";
import { withSession } from "./middleware/auth.js";
import { withHeaders } from "./middleware/headers.js";
import { withlogs } from "./middleware/logging.js";
import applicationRouter from "./router.js";


const app = new applicationRouter();

app.use(withlogs);
app.use(withHeaders);
app.use(withSession);


app.get("/assets/*",staticController);
app.get("/", homeController);
app.get("/items", itemsController);
app.post("/items", addItemController);
app.get("/register", registrationFormController);
app.post("/register", addUserController);
app.get("/login", loginFormController);
app.post("/login", addSessionController);
app.post("/logout", deleteSessionController);

app.get("*", notFoundContoller);
app.post("*", notFoundContoller);


export default function server (request){
    return app.handle({request});


    }