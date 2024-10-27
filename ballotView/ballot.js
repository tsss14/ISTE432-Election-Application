function init() {
    const header = $('<div>').addClass("text-bg-primary p-3 vh-10").text("Welcome!");
    var footer = $('<div>').addClass("text-bg-primary p-3 vh-10");
    $(footer).append($("<button>").addClass("button button-primary").text("Submit"));
    const placeholderName = "placeholder name";
    $(header).append(" " + placeholderName);
    $(document.body).append(header);
    const masterGrid = $("<div>").addClass("container-fluid d-flex flex-column align-items-stretch").css("height", "90vh");
    const row1 = $("<div>").addClass("row h-100");
    const row2 = $(row1).clone();
    var cell = $("<div>").addClass("col h-100 border border-primary");
    var cells = [cell.clone(), cell.clone(), cell.clone(), cell.clone()];
    var minicells = new Array(16);
    for(var i = 0; i != 16; i++) {
        minicells[i] =  $("<div>").addClass("col border border-primary");
    }
    var minirows = new Array(4);
    for(var i = 0; i != 4; i++) {
        minirows[i] = $("<div>").addClass("row h-25");
    }
    $(cells[0]).addClass("container");
    var minirows2 = new Array(4);
    for(var i = 0; i != 4; i++) {
        minirows2[i] = $("<div>").addClass("row h-25 border border-primary");
    }
    $(cells[1]).addClass("container");
    console.log(minirows[1], minirows[2]);
    $(cells[1]).append(minirows2[0], minirows2[1], minirows2[2], minirows2[3]);
    $(cells[0]).append(minirows[0], minirows[1], minirows[2], minirows[3]);
    $(minirows[0]).append(minicells[0], minicells[1], minicells[2], minicells[3]);
    $(minirows[1]).append(minicells[4], minicells[5], minicells[6], minicells[7]);
    $(minirows[2]).append(minicells[8], minicells[9], minicells[10], minicells[11]);
    $(minirows[3]).append(minicells[12], minicells[13], minicells[14], minicells[15]);
    $(masterGrid).append(row1);
    $(row1).append(cells[0], cells[1]);
    $(masterGrid).append(row2);
    $(row2).append(cells[2], cells[3]);
    $(document.body).append(masterGrid);
    $(document.body).append(footer);
}
$(document).ready(init);