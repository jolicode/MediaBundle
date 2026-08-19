import { fetchFolder, getFolderUrl, getSearchUrl, isSelectableLink, setFieldValue } from '../../../../assets/js/helpers/modalFetch.js';

const { jQuery, Admin } = window;

const MEDIA_CHOICE_SELECTOR = '[data-component="media-choice"]';

const MediaSelector = class {
  constructor(mediaChoiceContainer) {
    this.mediaChoiceContainer = mediaChoiceContainer;
    this.deleteButton = mediaChoiceContainer.querySelector('[data-component="media-choice-delete"]');
    this.editButton = mediaChoiceContainer.querySelector('[data-component="media-choice-edit"]');
    this.id = mediaChoiceContainer.dataset.mediaId;
    this.mediaContainer = document.getElementById(`joli-media-container_${this.id}`);
    this.inputElement = document.getElementById(this.id);
    this.modal = false;
    this.modalContent = false;
    this.currentFolder = false;
    this.currentSearchValue = '';
  }

  openSearchPanel = () => {
    const searchContainer = this.modalContent.querySelector('[data-component="search-container"]');

    if (searchContainer) {
      searchContainer.toggleAttribute('data-active', true);
      searchContainer.querySelector('[data-component="media-search-input"]').focus();
    }
  };

  setupSearch = () => {
    const searchForm = this.modalContent.querySelector('[data-component="media-search"]');
    const searchInput = this.modalContent.querySelector('[data-component="media-search-input"]');
    if (!searchForm || !searchInput) return;

    this.currentSearchValue = searchInput.value;

    const newSearchForm = searchForm.cloneNode(true);
    searchForm.parentNode.replaceChild(newSearchForm, searchForm);

    const newInput = newSearchForm.querySelector('[data-component="media-search-input"]');

    // the modal content is re-rendered on every fetch: keep the search
    // panel visible as long as a search is active
    if (this.currentSearchValue) {
      this.openSearchPanel();
    }

    newSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.currentSearchValue = newInput.value.trim();
      fetchFolder(getSearchUrl(this.currentFolder, this.currentSearchValue)).then(this.configureModal);
    });

    newInput.addEventListener('search', () => {
      if (!newInput.value) {
        this.currentSearchValue = '';
        fetchFolder(this.currentFolder).then((html) => {
          this.configureModal(html);
          this.openSearchPanel();
        });
      }
    });
  };

  configureModal = (html) => {
    this.modalContent.innerHTML = html;
    Admin.shared_setup(this.modal);
    this.setupSearch();
  };

  handleModalClick = (event) => {
    const target = event.target.closest('a');

    if (!isSelectableLink(target)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (target.dataset.mediaTemplate === undefined || target.dataset.mediaUrl === undefined) {
      // this is not a selectable media
      this.currentFolder = getFolderUrl(target.attributes.href.value);
      fetchFolder(getSearchUrl(target.attributes.href.value, this.currentSearchValue)).then(this.configureModal);
      return;
    }

    this.mediaContainer.innerHTML = target.dataset.mediaTemplate;
    this.mediaChoiceContainer.toggleAttribute('data-empty', false);
    setFieldValue(this.inputElement, target.dataset.mediaUrl);
    this.editButton.dataset.folder = target.dataset.mediaFolder;
    jQuery(this.modal).modal('hide');
  };

  handleModalSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target.closest("form");

    if (form && form.dataset.component === 'media-search') {
      return;
    }

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

  choose(event) {
    event.preventDefault();
    event.stopPropagation();

    // initialize components
    if (!this.modal) {
      this.modal = document.getElementById(`field_dialog_${this.id}`);
      this.modal.addEventListener('click', this.handleModalClick);
      this.modal.addEventListener("submit", this.handleModalSubmit);

      // the modal markup comes from @SonataAdmin/CRUD/Association/edit_modal.html.twig
      this.modalContent = document.querySelector(`#field_dialog_${this.id} .modal-body`);
      document.body.appendChild(this.modal);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          jQuery(this.modal).modal('hide');
        }
      });
    }

    this.modalContent.innerHTML = '';
    this.currentSearchValue = '';
    this.currentFolder = this.editButton.attributes.href.value + '/' + this.editButton.dataset.folder;

    fetchFolder(this.currentFolder).then((html) => {
      this.configureModal(html);
      jQuery(this.modal).modal();
      Admin.setup_list_modal(this.modal);
    });

    return false;
  }

  delete(event) {
    event.preventDefault();
    event.stopPropagation();

    this.mediaChoiceContainer.toggleAttribute('data-empty', true);
    const template = document.getElementById(`template-null-label-${this.id}`);
    this.mediaContainer.innerHTML = "";
    this.mediaContainer.appendChild(template.content.cloneNode(true));

    this.editButton.dataset.folder = '';
    setFieldValue(this.inputElement, '');
  }
}

const configureMediaSelector = () => {
  const mediaSelectors = {};

  const getMediaSelector = (node) => {
    const container = node.closest(MEDIA_CHOICE_SELECTOR);
    const mediaId = container.dataset.mediaId;

    if (!mediaSelectors[mediaId]) {
      mediaSelectors[mediaId] = new MediaSelector(container);
    }

    return mediaSelectors[mediaId];
  }

  jQuery(document).on('click', '[data-component="media-choice-delete"]', function (e) {
    getMediaSelector(e.target).delete(e);
  });

  jQuery(document).on('click', '[data-component="media-choice-edit"]', function (e) {
    getMediaSelector(e.target).choose(e);
  });
};

export default configureMediaSelector;
