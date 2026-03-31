import { minLength, required } from "../validation.js";

export const userSchema = {
    username: {validators:[required, minLength(8)]},
    password: {validators:[required, minLength(12)]}
}