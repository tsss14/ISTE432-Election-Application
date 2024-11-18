async function dataLoad() {
  const response = await fetch('http://localhost:3000/ongoingElections');
  if(!response.ok) {
    throw new Error('couldnt fetch data');
  }
  const data = await response.json();
  console.log(data);
} 

async function init() {
    const header = $('<div>');
    const placeholderName = "placeholder name";
    const data = await dataLoad();
    data.json();
    console.log(data);

    
    $(document.body).append(header);
    $(header).addClass("text-bg-primary p-3").text("Welcome " + placeholderName + "!");
    $(document.body).append(`<form>\
        <h2>Ongoing Elections</h2>`);

        data.forEach(election => {
          const elecDiv = document.createElement('div');
          elecDiv.id = "elecDiv";
        
          const elecTitle = document.createElement('div');
          elecTitle.id = "elecTitle";
          elecTitle.textContent = data.name;
        
          const endDate = document.createElement('div');
          endDate.id = "endDate";
          endDate.textContent = data.endsAT;
        
          elecDiv.appendChild(elecTitle);
          elecDiv.appendChild(endDate);
        
          body.appendChild(elecDiv);
});
}

$(document).ready(init);