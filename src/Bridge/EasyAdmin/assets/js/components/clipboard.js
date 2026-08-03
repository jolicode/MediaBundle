const configureClipboard = () => {
    const copy = document.querySelectorAll('[data-clipboard-target]');

    copy.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            const button = event.currentTarget;
            navigator.clipboard.writeText(document.querySelector(button.dataset.clipboardTarget).innerText).then(() => {
            // clipboard successfully set
            button.toggleAttribute('data-copied', true);
            setTimeout(() => {
                button.toggleAttribute('data-copied', false);
            }, 2000);
            });
        });
    });
};

export default configureClipboard;
