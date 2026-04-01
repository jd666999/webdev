import { escape } from "@std/html/entities";

export function fragments(errors){
    return Object.fromEntries(Object.keys(errors).map(key => {
        const {error, value, message} = errors[key] || {};
        return [key, {
            value: value ? `value="${escape(value)}"`: "",
            message: error ? `<p class="error">${escape(message)}</p>` : ""
        }];
    }));
}