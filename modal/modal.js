var focusedElementBeforeModal;

var modal = document.querySelector('.modal');

var modalOverlay = document.querySelector('.modal-overlay');
var modalWrapper = document.querySelector('.modal-wrapper');

var modalToggle = document.querySelector('.modal-toggle');
modalToggle.addEventListener("click", openModal);

function openModal() {
  //Save current focus
  focusedElementBeforeModal = document.activeElement;
  
  //Listen for and trap the keyboard
  modal.addEventListener("keydown", trapTabKey);
  
  //Listen indicators to close the modal
  modalOverlay.addEventListener("click", closeModal);

  //Sign-UP button
  var signUpBtn = modal.querySelector("#signup");
  signUpBtn.addEventListener("click", closeModal);

  //Find all focusable children (using a query string)
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  
  var focusableElements = modal.querySelectorAll(focusableElementsString);

  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1];

  //Show the modal and overlay
  modalWrapper.classList.add("show-modal");
  modalOverlay.classList.add("show-modal");
  
  //Focus first child
  firstTabStop.focus();

  function trapTabKey(e) {
    //Check for tab key press
    if (e.keyCode === 9) {

      //SHIFT+TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

        //TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }

      }

    }
    
    //Check for ESC
    if (e.keyCode === 27) {
      closeModal();
    }
    

  }

  function closeModal() {
    modalWrapper.classList.remove("show-modal");
    modalOverlay.classList.remove("show-modal");

    //Set focus back to element that had it before the modal was opened
    focusedElementBeforeModal.focus();
  }

}
