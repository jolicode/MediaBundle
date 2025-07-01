const { jQuery, Admin } = window;

const MediaSelector = class {
  constructor(mediaChoiceContainer) {
    this.mediaChoiceContainer = mediaChoiceContainer;
    this.deleteButton = mediaChoiceContainer.querySelector('.js-joli-media-choice-delete');
    this.editButton = mediaChoiceContainer.querySelector('.js-joli-media-choice-edit');
    this.id = mediaChoiceContainer.dataset.mediaId;
    this.mediaContainer = document.getElementById(`joli-media-container_${this.id}`);
    this.inputElement = document.getElementById(this.id);
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

    if (target.dataset.mediaTemplate === undefined || target.dataset.mediaUrl === undefined) {
      // this is not a selectable media
      this.fetchFolder(target.attributes.href.value).then(this.configureModal);
      return;
    }

    this.mediaContainer.innerHTML = target.dataset.mediaTemplate;
    this.mediaChoiceContainer.classList.remove('empty');
    this.setFieldValue(target.dataset.mediaUrl);
    this.editButton.dataset.folder = target.dataset.mediaFolder;
    jQuery(this.modal).modal('hide');
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
      this.modal = document.getElementById(`field_dialog_${this.id}`);
      this.modal.addEventListener('click', this.handleModalClick);
      this.modal.addEventListener("submit", this.handleModalSubmit);

      this.modalContent = document.querySelector(`#field_dialog_${this.id} .modal-body`);
      document.body.appendChild(this.modal);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          jQuery(this.modal).modal('hide');
        }
      });
    }

    this.modalContent.innerHTML = '';

    this.fetchFolder(this.editButton.attributes.href.value + '/' + this.editButton.dataset.folder).then((html) => {
      this.configureModal(html);
      jQuery(this.modal).modal();
      Admin.setup_list_modal(this.modal);
    });

    return false;
  }

  delete(event) {
    event.preventDefault();
    event.stopPropagation();

    this.mediaChoiceContainer.classList.add('empty');
    const template = document.getElementById(`template-null-label-${this.id}`);
    this.mediaContainer.innerHTML = "";
    this.mediaContainer.appendChild(template.content.cloneNode(true));

    this.editButton.dataset.folder = '';
    this.setFieldValue('');
  }
}

const configureMediaSelector = () => {
  const mediaSelectors = {};

  const getMediaSelector = (node) => {
    const container = node.closest('.js-joli-media-choice-container');
    const mediaId = container.dataset.mediaId;

    if (!mediaSelectors[mediaId]) {
      mediaSelectors[mediaId] = new MediaSelector(container);
    }

    return mediaSelectors[mediaId];
  }

  jQuery(document).on('click', '.js-joli-media-choice-delete', function (e) {
    getMediaSelector(e.target).delete(e);
  });

  jQuery(document).on('click', '.js-joli-media-choice-edit', function (e) {
    getMediaSelector(e.target).choose(e);
  });
};

export default configureMediaSelector;
