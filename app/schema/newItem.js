import { minLength, required } from "../validation.js";

export const newItemSchema = {
    "new-item" : {
        validators: [required, minLength(8)],
        displayName: "New item"
    
    }
}