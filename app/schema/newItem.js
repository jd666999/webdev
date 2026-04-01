import { required } from "../validation.js";

export const newItemSchema = {
    "new-item" : {
        validators: [required],
        displayName: "New item"
    
    }
}