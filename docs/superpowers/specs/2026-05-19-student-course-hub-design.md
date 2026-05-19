# Student Course Hub — Design Spec

**Date:** 2026-05-19
**Module:** CTEC3705 Advanced Web Development
**Scenario:** University Student Course Hub

---

## Overview

A Deno web application for a UK university that markets degree programmes to prospective students. The app has two sides: a public student-facing site for browsing programmes and registering interest, and a protected admin interface for managing all content.

Built on the existing infrastructure: custom router, middleware chain, MVC pattern, session auth, validation schemas, SQLite via `@db/sqlite`.

---

## Roles

| Role | Access |
|---|---|
| **Public** | Browse published programmes, view modules and staff |
| **Student** | + Register / withdraw interest in programmes (requires account) |
| **Admin** | + Full CRUD on programmes, modules, staff; view and export mailing list |

The `users` table has a `role` column: `'admin'` or `'student'`. Admins are seeded via a db-init task. Students self-register.

---

## Database Schema

```sql
CREATE TABLE users (
  username TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  hashedPassword TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student'
);

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE programmes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  level TEXT NOT NULL CHECK(level IN ('UG', 'PG')),
  description TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE modules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  programmeId INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  year INTEGER NOT NULL CHECK(year BETWEEN 1 AND 4),
  staffName TEXT,
  FOREIGN KEY (programmeId) REFERENCES programmes(id) ON DELETE CASCADE
);

CREATE TABLE staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  jobTitle TEXT NOT NULL,
  bio TEXT NOT NULL,
  profileImageId INTEGER,
  FOREIGN KEY (profileImageId) REFERENCES files(id)
);

CREATE TABLE interest (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  programmeId INTEGER NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(username, programmeId),
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
  FOREIGN KEY (programmeId) REFERENCES programmes(id) ON DELETE CASCADE
);

CREATE TABLE files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  bytes BLOB NOT NULL
);
```

---

## File Structure

Extending the existing layout — no structural changes, only additions:

```
app/
  models/
    users.js          ← update: add email + role
    session.js        ← unchanged
    programmes.js     ← new
    modules.js        ← new
    staff.js          ← new
    interest.js       ← new
    files.js          ← new

  controllers/
    home.js           ← update: show published programmes count
    programmes.js     ← new (public list + detail)
    interest.js       ← new (JSON API for fetch)
    admin/
      programmes.js   ← new
      modules.js      ← new
      staff.js        ← new
      interest.js     ← new (mailing list + CSV export)

  views/
    home.js           ← update
    programmes.js     ← new
    admin/
      programmes.js   ← new
      modules.js      ← new
      staff.js        ← new
      interest.js     ← new

  middleware/
    auth.js           ← update: add requireAdmin, requireStudent
    validate.js       ← unchanged
    headers.js        ← unchanged
    logging.js        ← unchanged

  schema/
    user.js           ← update: add email field
    programme.js      ← new
    module.js         ← new
    staff.js          ← new

  render.js           ← update: nav shows admin link for admins
  server.js           ← update: add all new routes
  tasks/
    db-create.js      ← update: full new schema + seed admin user

assets/
  style.css           ← update: subgrid, container queries, focus states
  js/
    dom.js            ← implement: interest toggle via fetch
```

---

## Routes

### Public
```
GET  /                         Home — welcome + link to programmes
GET  /programmes               List all published programmes (filter ?level=UG|PG)
GET  /programmes/:id           Programme detail: description, modules by year, staff
GET  /register                 Student registration form
POST /register                 Create student account → auto login → redirect /
GET  /login                    Login form
POST /login                    Create session → redirect /
POST /logout                   Delete session → redirect /
GET  /assets/*                 Static files
```

### Student (requireSession + role='student')
```
POST   /api/interest/:id       Register interest → JSON { registered: true, count: n }
DELETE /api/interest/:id       Withdraw interest → JSON { registered: false, count: n }
```

### Admin (requireAdmin middleware)
```
GET      /admin                          Dashboard: counts of programmes, students, registrations
GET      /admin/programmes               List all programmes (published + drafts)
GET      /admin/programmes/new           New programme form
POST     /admin/programmes               Create programme
GET      /admin/programmes/:id/edit      Edit form
POST     /admin/programmes/:id           Update programme
POST     /admin/programmes/:id/delete    Delete programme
POST     /admin/programmes/:id/publish   Toggle published flag
GET      /admin/modules/new             New module form (select programme)
POST     /admin/modules                 Create module
GET      /admin/modules/:id/edit        Edit module form
POST     /admin/modules/:id             Update module
POST     /admin/modules/:id/delete      Delete module
GET      /admin/staff/new              New staff form (with photo upload)
POST     /admin/staff                  Create staff member
GET      /admin/staff/:id/photo        Serve profile photo (BLOB from DB)
GET      /admin/interest               Mailing list: table of students per programme
GET      /admin/interest/export.csv    Download mailing list as CSV
```

---

## Middleware

### Existing (unchanged)
- `withlogs` — request logging
- `withHeaders` — response headers
- `withSession` — attaches session to ctx
- `requireSession` — redirects to /login if no session
- `excludesSession` — redirects logged-in users away from login/register
- `validate(schema)` — validates form data against a schema

### New
```js
// requireAdmin — must be logged in AND role === 'admin'
export function requireAdmin(ctx, next) {
  if (!ctx.session || ctx.session.role !== 'admin') {
    return redirect(ctx.headers, '/login', 'Admin access required');
  }
  return next(ctx);
}

// requireStudent — must be logged in AND role === 'student'
export function requireStudent(ctx, next) {
  if (!ctx.session || ctx.session.role !== 'student') {
    return new Response('Forbidden', { status: 403 });
  }
  return next(ctx);
}
```

Note: `withSession` must also attach `role` to `ctx.session`. The session model's `getSession` query needs to JOIN users to get the role.

---

## Validation Schemas

### userSchema (updated)
```js
{
  username: { validators: [required, minLength(3)] },
  email:    { validators: [required] },           // add email
  password: { validators: [required, minLength(8)] }
}
```

### programmeSchema
```js
{
  title:       { validators: [required, minLength(3)] },
  level:       { validators: [required] },
  description: { validators: [required, minLength(10)] }
}
```

### moduleSchema
```js
{
  title:       { validators: [required] },
  description: { validators: [required] },
  year:        { validators: [required] },
  programmeId: { validators: [required] },
  staffName:   { validators: [] }
}
```

### staffSchema
```js
{
  name:        { validators: [required] },
  jobTitle:    { validators: [required] },
  bio:         { validators: [required] },
  profileImage:{ validators: [isFileType('image/jpeg','image/png','image/webp'), maxFileSize(2 * 1024 * 1024)] }
}
```

File validators (`isFileType`, `maxFileSize`) added to `app/validation.js` following the lab 06 pattern.

---

## Client-Side Feature (dom.js)

**Feature:** Interest registration toggle on `/programmes/:id`

The programme detail page is server-side rendered. If a student is logged in, the page includes a form with data attributes:

```html
<form id="interest-form"
      data-programme-id="42"
      data-registered="false">
  <button type="submit">Register Interest</button>
  <span id="interest-count">14 students interested</span>
</form>
```

`dom.js` attaches to this form using the course-taught patterns:

```js
const form = document.querySelector('#interest-form');
if (form) {
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const id = form.dataset.programmeId;
    const registered = form.dataset.registered === 'true';
    const method = registered ? 'DELETE' : 'POST';

    const response = await fetch(`/api/interest/${id}`, { method });
    if (response.ok) {
      const { registered: now, count } = await response.json();
      form.dataset.registered = now;
      form.querySelector('button').textContent =
        now ? 'Withdraw Interest' : 'Register Interest';
      document.querySelector('#interest-count').textContent =
        `${count} student${count !== 1 ? 's' : ''} interested`;
    }
  });
}
```

This demonstrates:
- `ev.preventDefault()` (DOM lecture)
- `async/await` + `fetch` (Unit 5 lecture)
- `response.json()` (Unit 5 lecture)
- `textContent` + `dataset` DOM manipulation (DOM lecture)

If the user is not logged in, the form is replaced by a plain link to `/login` — no JS needed.

---

## CSS Techniques

### Subgrid — Programme Cards
```css
.programmes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-template-rows: auto;
  gap: 1.5rem;
}

.programme-card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;  /* inherits rows from parent */
}

/* All cards: title on row 1, description on row 2, button on row 3 */
.programme-card h2 { align-self: start; }
.programme-card p  { align-self: start; }
.programme-card a  { align-self: end; }
```

### Container Queries — Card Layout
```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .programme-card {
    grid-template-columns: 1fr 2fr;
  }
}
```

### Accessibility
- `:focus-visible` ring on all interactive elements (not just `:focus`)
- `:user-valid` / `:user-invalid` on form inputs
- Colour contrast ≥ 4.5:1 for body text (WCAG AA)
- Semantic: `<main>`, `<nav aria-label>`, `<section aria-labelledby>`, `<article>`, `<figure>`/`<figcaption>` for staff
- All `<img>` have descriptive `alt`
- `<label for>` on every input, errors linked via `aria-describedby`

---

## Security

| Threat | Mitigation |
|---|---|
| SQL injection | Prepared statements on all queries (`.prepare().run()`) |
| XSS | `escape()` from `@std/html` on all user-generated output in views |
| Unauthorised admin access | `requireAdmin` middleware on all `/admin/*` routes |
| Unauthorised student API access | `requireStudent` middleware on `/api/interest/*` |
| Weak passwords | `minLength(8)` validation on registration |
| Password storage | PBKDF2-SHA256, 5000 iterations (existing `hashPassword`) |

---

## What Each Video Demonstrates

| Video | Topic | Where in code |
|---|---|---|
| 1 | Routing + MVC | `app/router.js`, `app/server.js`, controllers/models/views pattern |
| 1 | SQL injection prevention | `app/models/*.js` — all prepared statements |
| 1 | XSS prevention | `app/views/*.js` — `escape()` on all output |
| 1 | Validation | `app/validation.js`, `app/schema/*.js`, `app/middleware/validate.js` |
| 2 | Session auth | `app/auth.js`, `app/models/session.js`, `app/middleware/auth.js` |
| 2 | Admin vs student authorisation | `requireAdmin` vs `requireStudent` middleware |
| 3 | Server-side rendering | All view functions returning HTML strings |
| 3 | Client-side fetch + DOM update | `assets/js/dom.js` — interest toggle |
| 4 | Subgrid | `.programmes-grid` + `.programme-card` in `style.css` |
| 4 | Container queries | `@container card` in `style.css` |
| 4 | Accessibility | Focus states, ARIA, semantic HTML, contrast |
