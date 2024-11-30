
async function dataLoad() {
  const response = await fetch('http://localhost:3000/pastElections')
    .then(response => response.json())
    .catch(err => console.log("Couldn't fetch data: ", err));
  if(response && response.endsAt) {
    displayElections(response);
  }else  {
    $('#electionContent').html('<h4>No previous elections found.</h4>')
  }
} 

function displayElections(data) {

  return data.rows.forEach(election => {
    const elecDiv = document.createElement('div');
    elecDiv.id = "elecDiv";
        
    const elecTitle = document.createElement('div');
    elecTitle.id = "elecTitle";
    elecTitle.textContent = election.name;
        
    const endDate = document.createElement('div');
    endDate.id = "endDate";
    endDate.textContent = election.endsAt;
        
    elecDiv.appendChild(elecTitle);
    elecDiv.appendChild(endDate);
        
    $('#electionContent').appendChild(elecDiv);
  });
}

$(document).ready(dataLoad);