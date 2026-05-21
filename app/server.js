// ─── Controllers ─────────────────────────────────────────────────────────────
// Each controller handles what happens when a specific URL is visited
import { homeController } from "./controllers/home.js";
import { adminDashboardController } from "./controllers/admin/index.js";
import { adminInterestController, adminInterestDeleteController, adminInterestExportController } from "./controllers/admin/interest.js";
import { adminModuleCreateController, adminModuleDeleteController, adminModuleEditController, adminModuleNewController, adminModuleUpdateController } from "./controllers/admin/modules.js";
import { adminProgrammeCreateController, adminProgrammeDeleteController, adminProgrammeEditController, adminProgrammeNewController, adminProgrammePublishController, adminProgrammeUpdateController, adminProgrammesController, programmeImageController } from "./controllers/admin/programmes.js";
import { adminStaffController, adminStaffCreateController, adminStaffNewController, staffPhotoController } from "./controllers/admin/staff.js";
import { interestDeleteController, interestPostController, myInterestsController } from "./controllers/interest.js";
import { notFoundContoller } from "./controllers/notFound.js";
import { programmeDetailController, programmesListController } from "./controllers/programmes.js";
import { addSessionController, deleteSessionController, loginFormController } from "./controllers/sessions.js";
import { staticController } from "./controllers/static.js";
import { addUserController, registrationFormController } from "./controllers/users.js";

// ─── Middleware ───────────────────────────────────────────────────────────────
// Middleware are functions that run before the controller on every request
import { excludesSession, requireAdmin, requireSession, requireStudent, withSession } from "./middleware/auth.js";
import { withHeaders } from "./middleware/headers.js";
import { withlogs } from "./middleware/logging.js";
import { validate } from "./middleware/validate.js";

// ─── Router & Schemas ────────────────────────────────────────────────────────
import applicationRouter from "./router.js";
import { moduleSchema } from "./schema/module.js";
import { programmeSchema } from "./schema/programme.js";
import { staffSchema } from "./schema/staff.js";
import { loginSchema, userSchema } from "./schema/user.js";

// Create a new router instance
const app = new applicationRouter();

// ─── Global Middleware ────────────────────────────────────────────────────────
// These run on EVERY request, in this order:
app.use(withlogs);    // logs the request method, URL and response status
app.use(withHeaders); // creates a fresh Headers object for the response
app.use(withSession); // checks if the user is logged in via their session cookie

// ─── Static Assets ────────────────────────────────────────────────────────────
// Serves CSS, JS and image files from the /assets folder
app.get("/assets/*", staticController);

// ─── Public Routes ────────────────────────────────────────────────────────────
// Anyone can visit these — no login required
app.get("/", homeController);
app.get("/programmes", programmesListController);           // list all programmes
app.get("/programmes/:id", programmeDetailController);     // single programme page
app.get("/programmes/:id/image", programmeImageController); // serves the programme image

// ─── Auth Routes ─────────────────────────────────────────────────────────────
// Register and login — only accessible if NOT already logged in (excludesSession)
app.get("/register", registrationFormController, excludesSession);
app.post("/register", registrationFormController, excludesSession, validate(userSchema), addUserController);
app.get("/login", loginFormController, excludesSession);
app.post("/login", loginFormController, excludesSession, validate(loginSchema), addSessionController);
// Logout — only accessible if logged in (requireSession)
app.post("/logout", deleteSessionController, requireSession);

// ─── Student Interest API ─────────────────────────────────────────────────────
// JSON API used by the fetch() calls in dom.js — only students can use these
app.post("/api/interest/:id", interestPostController, requireStudent);   // register interest
app.delete("/api/interest/:id", interestDeleteController, requireStudent); // remove interest
app.get("/my-interests", myInterestsController, requireStudent);

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
// requireAdmin checks the user is logged in AND has the admin role
app.get("/admin", adminDashboardController, requireAdmin);

// ─── Admin: Programmes ────────────────────────────────────────────────────────
app.get("/admin/programmes", adminProgrammesController, requireAdmin);
app.get("/admin/programmes/new", adminProgrammeNewController, requireAdmin);
app.post("/admin/programmes", adminProgrammeNewController, requireAdmin, validate(programmeSchema), adminProgrammeCreateController);
app.get("/admin/programmes/:id/edit", adminProgrammeEditController, requireAdmin);
app.post("/admin/programmes/:id", adminProgrammeEditController, requireAdmin, validate(programmeSchema), adminProgrammeUpdateController);
app.post("/admin/programmes/:id/delete", adminProgrammeDeleteController, requireAdmin);
app.post("/admin/programmes/:id/publish", adminProgrammePublishController, requireAdmin);

// ─── Admin: Modules ───────────────────────────────────────────────────────────
app.get("/admin/modules/new", adminModuleNewController, requireAdmin);
app.post("/admin/modules", adminModuleNewController, requireAdmin, validate(moduleSchema), adminModuleCreateController);
app.get("/admin/modules/:id/edit", adminModuleEditController, requireAdmin);
app.post("/admin/modules/:id", adminModuleEditController, requireAdmin, validate(moduleSchema), adminModuleUpdateController);
app.post("/admin/modules/:id/delete", adminModuleDeleteController, requireAdmin);

// ─── Admin: Staff ─────────────────────────────────────────────────────────────
app.get("/admin/staff", adminStaffController, requireAdmin);
app.get("/admin/staff/new", adminStaffNewController, requireAdmin);
app.post("/admin/staff", adminStaffNewController, requireAdmin, validate(staffSchema), adminStaffCreateController);
app.get("/admin/staff/:id/photo", staffPhotoController); // public — no auth needed, photos shown on programme pages

// ─── Admin: Interest / Mailing List ──────────────────────────────────────────
app.get("/admin/interest", adminInterestController, requireAdmin);
app.get("/admin/interest/export.csv", adminInterestExportController, requireAdmin); // downloads a CSV file
app.post("/admin/interest/:id/delete", adminInterestDeleteController, requireAdmin);

// ─── 404 Fallback ─────────────────────────────────────────────────────────────
// If no route matched above, return a not found page
app.get("*", notFoundContoller);
app.post("*", notFoundContoller);

// ─── Entry Point ──────────────────────────────────────────────────────────────
// This function is called by main.js for every incoming request
export default function server(request) {
    return app.handle({ request });
}
