import { homeController } from "./controllers/home.js";
import { addItemController, itemsController } from "./controllers/items.js";
import { notFoundContoller } from "./controllers/notFound.js";
import { addSessionController, deleteSessionController, loginFormController } from "./controllers/sessions.js";
import { staticController } from "./controllers/static.js";
import { addUserController, registrationFormController } from "./controllers/users.js";
import { excludesSession, requireSession, withSession } from "./middleware/auth.js";
import { withHeaders } from "./middleware/headers.js";
import { withlogs } from "./middleware/logging.js";
import { validate } from "./middleware/validate.js";
import applicationRouter from "./router.js";
import { newItemSchema } from "./schema/newItem.js";
import { userSchema } from "./schema/user.js";


const app = new applicationRouter();

app.use(withlogs);
app.use(withHeaders);
app.use(withSession);


app.get("/assets/*",staticController);
app.get("/", homeController);
app.get("/items", itemsController,requireSession);
app.post("/items", itemsController, requireSession, validate(newItemSchema), addItemController);
app.get("/register", registrationFormController, excludesSession);
app.post("/register", registrationFormController , excludesSession, validate(userSchema),addUserController);
app.get("/login", loginFormController, excludesSession);
app.post("/login",loginFormController ,excludesSession, validate(userSchema), addSessionController);
app.post("/logout", deleteSessionController,requireSession);

app.get("*", notFoundContoller);
app.post("*", notFoundContoller);


export default function server (request){
    return app.handle({request});


    }