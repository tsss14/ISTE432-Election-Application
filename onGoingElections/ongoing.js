async function dataLoad() {
  const response = await fetch('http://localhost:3000/ongoingElections')
    .then(response => response.json())
    .catch(err => console.log("Couldn't fetch data: ", err));
  if(response && response.endsAt) {
    displayElections(response);
  }else  {
    $('#electionContent').html('<h4>No ongoing elections found.</h4>')
  }
} 

function displayElections(data) {

  return data.forEach(election => {
    const elecDiv = document.createElement('div');
    elecDiv.id = "elecDiv";
        
    const elecTitle = document.createElement('div');
    elecTitle.id = "elecTitle";
    elecTitle.textContent = data.fieldstitle;
        
    const endDate = document.createElement('div');
    endDate.id = "endDate";
    endDate.textContent = data.endDate;
        
    elecDiv.appendChild(elecTitle);
    elecDiv.appendChild(endDate);
        
    $('#electionContent').appendChild(elecDiv);
  });
}

$(document).ready(dataLoad);