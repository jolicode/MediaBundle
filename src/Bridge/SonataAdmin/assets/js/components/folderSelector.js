const { jQuery, Admin } = window;

const FolderSelector = class {
  constructor() {
    this.form = document.getElementById('move-form');
    this.inputElement = this.form.querySelector('#move_to');
    this.modal = false;
    this.modalContent = false;
    this.currentFolder = false;
  }

  fetchFolder = (url) => {
    this.currentFolder = url;
    return fetch(url).then((response) => response.text());
  };

  configureModal = (html) => {
    this.modalContent.innerHTML = html;
    Admin.shared_setup(this.modal);
  };

  handleModalClick = (event) => {
    const target = event.target.closest('a');

    if (
      target === null ||
      target.tagName !== 'A' ||
      target.attributes.href === undefined ||
      target.attributes.href.length === 0 ||
      target.attributes.href.value === '#'
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

        if (target.dataset.folderPath === undefined) {
      // this is not a selectable media
      this.fetchFolder(target.attributes.href.value).then(this.configureModal);
      return;
    }

    this.setFieldValue(target.dataset.folderPath);
    jQuery(this.modal).modal('hide');

    if (confirm(target.dataset.confirmation)) {
      this.form.submit();
    }
  };

  handleModalSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target.closest("form");
    const formData = new FormData(form);
    const url = form.action;

    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((response) => response.text())
      .then(this.configureModal)
    ;
  };

  setFieldValue = (value) => {
    this.inputElement.value = value;
    this.inputElement.dispatchEvent(new Event('change'));
  };

  choose(event) {
    event.preventDefault();
    event.stopPropagation();

    // initialize components
    if (!this.modal) {
      this.modal = document.getElementById('field_dialog_folder-choice');
      this.modal.addEventListener('click', this.handleModalClick);
      this.modal.addEventListener("submit", this.handleModalSubmit);

      this.modalContent = document.querySelector(`#field_dialog_folder-choice .modal-body`);
      document.body.appendChild(this.modal);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          jQuery(this.modal).modal('hide');
        }
      });
    }

    this.modalContent.innerHTML = '';

    this.fetchFolder(event.currentTarget.attributes.href.value + '/' + event.currentTarget.dataset.folder).then((html) => {
      this.configureModal(html);
      jQuery(this.modal).modal();
      Admin.setup_list_modal(this.modal);
    });

    return false;
  }
}

const configureFolderSelector = () => {
  jQuery(document).on('click', '[data-component=folder-choice]', function (e) {
    new FolderSelector().choose(e);
  });
};

export default configureFolderSelector;
