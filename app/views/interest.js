import { escape } from "@std/html/entities";

export function myInterestsView({ interests }) {
    if (interests.length === 0) {
        return `
            <section aria-labelledby="interests-heading">
                <h2 id="interests-heading">My Interests</h2>
                <p>You have no registered interests. <a href="/programmes">Browse programmes</a></p>
            </section>
        `;
    }

    const items = interests.map(({ programmeId, title }) => `
        <li class="interest-item">
            <a href="/programmes/${programmeId}">${escape(title)}</a>
            <button data-programme-id="${programmeId}">Withdraw Interest</button>
        </li>
    `).join("");

    return `
        <section aria-labelledby="interests-heading">
            <h2 id="interests-heading">My Interests</h2>
            <ul class="interest-list" id="interest-list">
                ${items}
            </ul>
        </section>
    `;
}
