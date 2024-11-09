const { Button } = require("bootstrap");

async function dataLoad() {
  const data = await fetch('http://localhost:3000/pastElections');
  return data;
} 

async function init() {
    const header = $('<div>');
    const placeholderName = "placeholder name";
    const data = await dataLoad().json();
    console.log(data);

    
    $(document.body).append(header);
    $(header).addClass("text-bg-primary p-3").text("Welcome!");
    $(document.body).append(`<form>\
        <h2>Previous Elections</h2>`)

        data.forEach(election => {
          const elecDiv = document.createElement('div');
          elecDiv.id = "elecDiv";
        
          const elecTitle = document.createElement('div');
          elecTitle.id = "elecTitle";
          elecTitle.textContent = data.title;
        
          const endDate = document.createElement('div');
          endDate.id = "endDate";
          endDate.textContent = data.endDate;
        
          elecDiv.appendChild(elecTitle);
          elecDiv.appendChild(endDate);
        
          body.appendChild(elecDiv);
});
  }

$(document).ready(init);