const configureClipboard = () => {
    const copy = document.querySelectorAll('[data-clipboard-target]');

    copy.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            navigator.clipboard.writeText(document.querySelector(event.target.dataset.clipboardTarget).innerText).then(() => {
            // clipboard successfully set
            event.target.classList.add('is-copied');
            setTimeout(() => {
                event.target.classList.remove('is-copied');
            }, 2000);
            });
        });
    });
};


export default configureClipboard;
