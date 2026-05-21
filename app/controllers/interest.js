import { getInterestCount, getInterestsByUsername, registerInterest, withdrawInterest } from "../models/interest.js";
import render from "../render.js";
import { myInterestsView } from "../views/interest.js";

export function interestPostController(ctx) {
    const { session, params } = ctx;
    registerInterest(session.username, params.id);
    const count = getInterestCount(params.id);
    return Response.json({ registered: true, count });
}

export function interestDeleteController(ctx) {
    const { session, params } = ctx;
    withdrawInterest(session.username, params.id);
    const count = getInterestCount(params.id);
    return Response.json({ registered: false, count });
}

export function myInterestsController(ctx) {
    const { session } = ctx;
    const interests = getInterestsByUsername(session.username);
    return render(myInterestsView, { interests }, ctx);
}
