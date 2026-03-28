import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";
import { encodeBase64Url,decodeBase64Url } from "@std/encoding";
import { encode } from "node:punycode";
export function setFlash(headers,message){

    setCookie(headers, {
        name: "flash",
        value: encodeBase64Url(message),
        path: "/"

    });

}

export function getFlash(requestHeaders,responseHeaders){

    const {flash} = getCookies(requestHeaders);
    if (flash){
        deleteCookie(responseHeaders, "flash", {path: "/"});
        return new TextDecoder().decode(decodeBase64Url(flash));
    }

}

// const msg = "hello world";
// const encoded = encodeBase64Url(msg);
// const decoded = new TextDecoder().decode(decodeBase64Url(encoded));
// console.log(msg, decoded);
// console.log(encoded);