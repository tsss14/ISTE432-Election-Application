function init() {
    const header = $('<div>').addClass("text-bg-primary p-3").text("Welcome!");
    const placeholderName = "placeholder name";
    $(header).append(" " + placeholderName);
    $(document.body).append(header);
    const masterGrid = $("<div>").addClass("container-fluid d-flex vh-100 flex-column align-items-stretch");
    const row1 = $("<div>").addClass("row h-100");
    const row2 = $(row1).clone();
    var cell = $("<div>").addClass("col h-100 border border-primary");
    var cells = [cell.clone(), cell.clone(), cell.clone(), cell.clone()];

    cells.forEach((gridCell)=> {
        gridCell.text("test");
    }); 

    $(masterGrid).append(row1);
    $(row1).append(cells[0], cells[1]);
    $(masterGrid).append(row2);
    $(row2).append(cells[2], cells[3]);
    $(document.body).append(masterGrid);
}
$(document).ready(init);