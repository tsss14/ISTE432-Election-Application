//const { callElection } = require("../../businessLayer");

async function dataLoad() {
  const response = await fetch('https://teamkal.webdev.gccis.rit.edu/api/pastElections')
    .then(response => response.json())
    .catch(err => console.log("Couldn't fetch data: ", err));
  if(response) {
    //console.log(response);
    displayElections(response);
  }else  {
    $('#electionContent').html('<h4>No previous elections found.</h4>')
  }
  return
} 

function displayElections(data) {
  var $listGroup = $("#electionList");
  $listGroup.empty();

  $.each(data.rows, function(index, election) {
    var $listItem = $('<a href="#" class="list-group-item list-group-action" data-id="' + election.id + '">')
    .text("Name: " + election.name + " || Ends at: " + election.endsAt)
    .on('click', function(event) {
      event.preventDefault();
    });
    $listGroup.append($listItem)
        
  });
}

$(document).ready(dataLoad);