function init() {
    var p = document.createElement("p");
    var textNode1 = document.createTextNode("This is a test of jquery");
    p.appendChild(textNode1);
    document.body.appendChild(p);
}
$(document).ready(init);