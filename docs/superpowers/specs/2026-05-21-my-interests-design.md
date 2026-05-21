# My Interests Page — Design Spec

**Date:** 2026-05-21  
**Status:** Approved

---

## Overview

Add a "My Interests" link to the student navigation header that leads to a dedicated page listing all programmes the logged-in student has registered interest in, with the ability to withdraw interest from each.

---

## Architecture

A standard server-rendered page following the existing pattern: new route → middleware → controller → model → view. Withdrawal uses the existing JSON API (`DELETE /api/interest/:id`) extended to work from this new page via client-side JS in `dom.js`.

---

## Components

### 1. Data Layer — `app/models/interest.js`

Add a new exported function:

```js
getInterestsByUsername(username)
```

SQL:
```sql
SELECT i.id, p.id as programmeId, p.title
FROM interest i
JOIN programmes p ON i.programmeId = p.id
WHERE i.username = :username
ORDER BY p.title
```

Returns: `Array<{ id, programmeId, title }>`

No other model functions are changed.

---

### 2. Route — `app/server.js`

Register one new GET route in the student section:

```js
app.get("/my-interests", myInterestsController, requireStudent);
```

Protected by `requireStudent` — unauthenticated users and admins cannot access it.

---

### 3. Controller — `app/controllers/interest.js`

Add a new exported function `myInterestsController`:

```js
export function myInterestsController(ctx) {
    const { session } = ctx;
    const interests = getInterestsByUsername(session.username);
    return render(myInterestsView, { interests }, ctx);
}
```

---

### 4. View — `app/views/interest.js` (new file)

Renders a simple list. Each entry shows the programme title (linked to `/programmes/:id`) and a "Withdraw" button with `data-programme-id` wired for the JS handler.

**Populated state:**
```html
<ul class="interest-list">
  <li data-interest-item>
    <a href="/programmes/:id">Programme Title</a>
    <button data-programme-id=":id">Withdraw Interest</button>
  </li>
</ul>
```

**Empty state:**
```html
<p>You have no registered interests. <a href="/programmes">Browse programmes</a></p>
```

---

### 5. Header — `app/render.js`

Add "My Interests" link to the student nav only (not admins):

```js
const links = session
    ? `
        <a href="/programmes">Programmes</a>
        ${session.role === "student" ? `<a href="/my-interests">My Interests</a>` : ""}
        ${session.role === "admin" ? `<a href="/admin">Admin</a>` : ""}
        <form method="POST" action="/logout"><button>Sign Out</button></form>
    `
    : `...`
```

---

### 6. Client-side JS — `assets/js/dom.js`

Extend the existing withdraw/interest handler so it works on `/my-interests`:

- On the "My Interests" page, after a successful `DELETE /api/interest/:id`, remove the parent `<li>` from the DOM.
- If the list becomes empty after removal, replace the `<ul>` with the empty-state message.

No new JS files needed — logic added to existing `dom.js`.

---

## Data Flow

```
GET /my-interests
  → requireStudent (redirect to /login if not a student)
  → myInterestsController
  → getInterestsByUsername(session.username)
  → myInterestsView({ interests })
  → render() → HTML response

Withdraw button click (JS)
  → DELETE /api/interest/:programmeId
  → interestDeleteController (existing)
  → withdrawInterest(username, programmeId) (existing)
  → JSON { registered: false, count }
  → dom.js removes <li> from DOM
```

---

## Error Handling

- Unauthenticated or admin access to `/my-interests` → `requireStudent` redirects to `/login`.
- JS withdraw failure (network error) → existing error handling in `dom.js` applies; no DOM change.
- Empty interests list → empty state shown server-side on page load; also handled client-side when last item withdrawn.

---

## Out of Scope

- Pagination (student interest lists are expected to be small)
- Sorting/filtering
- Re-registering interest from this page (use programme detail page)
