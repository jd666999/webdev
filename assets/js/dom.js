// Programme detail page: toggle interest button
const form = document.querySelector('#interest-form');
if (form) {
    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const id = form.dataset.programmeId;
        const registered = form.dataset.registered === 'true';
        const method = registered ? 'DELETE' : 'POST';

        const response = await fetch(`/api/interest/${id}`, { method });
        if (response.ok) {
            const { registered: now, count } = await response.json();
            form.dataset.registered = now;
            form.querySelector('button').textContent = now ? 'Withdraw Interest' : 'Register Interest';
            document.querySelector('#interest-count').textContent =
                `${count} student${count !== 1 ? 's' : ''} interested`;
        }
    });
}

// My Interests page: withdraw button removes the list item
const interestList = document.querySelector('#interest-list');
if (interestList) {
    interestList.addEventListener('click', async (ev) => {
        const btn = ev.target.closest('button[data-programme-id]');
        if (!btn) return;

        const id = btn.dataset.programmeId;
        const response = await fetch(`/api/interest/${id}`, { method: 'DELETE' });
        if (response.ok) {
            const item = btn.closest('li');
            item.remove();
            if (interestList.querySelectorAll('li').length === 0) {
                interestList.replaceWith(
                    Object.assign(document.createElement('p'), {
                        textContent: 'You have no registered interests. '
                    })
                );
                // Add the browse link after the paragraph
                const section = document.querySelector('[aria-labelledby="interests-heading"]');
                const p = section.querySelector('p');
                const a = document.createElement('a');
                a.href = '/programmes';
                a.textContent = 'Browse programmes';
                p.appendChild(a);
            }
        }
    });
}
