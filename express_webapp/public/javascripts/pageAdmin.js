
var modals = document.querySelectorAll(".page-admin .content .page-list .modal_suppr");

for(var mod of modals){
    var id = mod.parentNode.childNodes[1].innerText;
    mod.classList.add("supr"+id);
}

var btn_suppr = document.querySelectorAll(".page-admin .content .page-list .list a.suppr");

for(var btn of btn_suppr){
    btn.addEventListener("click",function(e){

        var id = e.target.parentNode.childNodes[1].innerText;
        modalShare(id)
    });
}

function escapeHtml(unsafe){
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return unsafe.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function modalShare(id) {
    var modal_suppr = document.querySelector(".page-admin .content .page-list .modal_suppr.supr" + id);
    var close = document.querySelector(".page-admin .content .page-list .modal_suppr.supr" + id + " .close ");
    var btn_annuler = document.querySelector(".page-admin .content .page-list .modal_suppr.supr" + id + " .annuler");
    modal_suppr.style.display = "block";


    // Close the modal with the close button
    close.onclick = function () {
        modal_suppr.style.display = "none";
    };
    btn_annuler.onclick = function () {
        modal_suppr.style.display = "none";
    };

    // Close the modal by clicking outside it
    window.onclick = function (event) {
        if (event.target === modal_suppr) {
            modal_suppr.style.display = "none";
        }
    };

};