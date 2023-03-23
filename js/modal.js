document.addEventListener("click", (e)=> {
    onModalButtonClick(e);
    onModalCloseClick(e);
    onModalOutsideClick(e);
});


function onModalButtonClick(evt) {
    const el = evt.target.closest("[data-modal-open]");
    if (!el) return;
    const modalSelector =  el.dataset.modalOpen;

    document.querySelector(modalSelector).classList.add("show");

};

function onModalCloseClick(evt){
    const el = evt.target.closest("[data-modal-close]");
    if (!el) return;

  el.parentElement.parentElement.classList.remove("show")

};

function onModalOutsideClick(evt) {
 const el = evt.target;
   
 if(!el.matches("[data-modal]")) return;

  el.classList.remove("show")
}