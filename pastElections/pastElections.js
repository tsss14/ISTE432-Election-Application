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
    $(document.body).append('<form>\
        <h2>Previous Elections</h2>\
        <div class="mb-3">\
          <label for="exampleInputEmail1" class="form-label">Email address</label>\
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">\
        </div>\
        <div class="mb-3">\
          <label for="exampleInputPassword1" class="form-label">Password</label>\
          <input type="password" class="form-control" id="exampleInputPassword1">\
        </div>\
        <button type="submit" class="btn btn-primary">Submit</button>\
      </form>');
    $('form').last().addClass('position-absolute top-50 start-50 translate-middle align-middle')
    $('button').last().on('click',async function() {
      fetch('http://localhost:3000/pastElections')
    } )
  }

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

$(document).ready(init);