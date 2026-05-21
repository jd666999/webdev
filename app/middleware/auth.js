import { currentSession } from "../auth.js";
import redirect from "../redirect.js";

export function withSession(ctx, next) {
    const { request } = ctx;
    ctx.session = currentSession(request.headers);
    console.log(ctx.session ? `logged in as ${ctx.session.username} (${ctx.session.role})` : "No session found");
    return next(ctx);
}

export function requireSession(ctx, next) {
    const { session, headers } = ctx;
    if (!session) {
        console.log("Access denied to protected route");
        return redirect(headers, "/login", "Sign in to gain access");
    }
    console.log("Access granted!");
    return next(ctx);
}

export function excludesSession(ctx, next) {
    const { session, headers } = ctx;
    if (session) {
        console.log("Access denied to logged in user");
        return redirect(headers, "/", "Sign Out to gain access");
    }
    console.log("Access granted!");
    return next(ctx);
}

export function requireAdmin(ctx, next) {
    if (!ctx.session || ctx.session.role !== "admin") {
        return redirect(ctx.headers, "/login", "Admin access required");
    }
    return next(ctx);
}

export function requireStudent(ctx, next) {
    if (!ctx.session) {
        return redirect(ctx.headers, "/login", "Sign in to gain access");
    }
    if (ctx.session.role !== "student") {
        return new Response("Forbidden", { status: 403 });
    }
    return next(ctx);
}
