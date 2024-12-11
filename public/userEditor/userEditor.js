async function findUser(username) {
    let res = await fetch("https://teamkal.webdev.gccis.rit.edu/findUser", {
        method: "POST",
        headers: {"Content-Type" : "application/json" },
        body: JSON.stringify({"username": username})
    });
    res = await res.json();
    $('#queryContainer').empty();
    $('#queryContainer').append(`<input type="text" value="${res.first_name}" id="firstName"><button type="button" class="btn btn-primary" onclick="changeName($('#firstName').val(), $('#lastName').val(), $('#selectedUser').text())">Change Name</button><br>`)
    $('#queryContainer').append(`<input type="text" value="${res.last_name}" id="lastName">`)
    $('#queryContainer').append(`<p id="selectedUser">${res.username}</p>`)
    $('#queryContainer').append(`<p>${res.role}</p>`)
    $('#queryContainer').append(`<p>${res.name}</p>`)


}

async function changeName(first, last, usrname) {
    console.log(first + ' ' + last + ' ' + usrname)
    let res = await fetch("https://teamkal.webdev.gccis.rit.edu/changeName", {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({first_name: first, last_name: last, username: usrname})
    });
}