import { setFlash } from "./flash.js";

export default function redirect(headers,location,flash) {
    if (flash) setFlash(headers, flash);
    headers.set("location", location);
    return new Response(null, { headers, status: 303 });
}