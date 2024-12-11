async function findUser(username) {
    let res = await fetch("http://localhost:3000/findUser", {
        method: "POST",
        headers: {"Content-Type" : "application/json" },
        body: JSON.stringify({"username": username})
    });
    res = await res.json();
    $('#queryContainer').empty();
    $('#queryContainer').append(`<input type="text" value="${res.first_name}" id="firstName"><button type="button" class="btn btn-primary" onclick="changeName($('#firstName').value(), $('#lastName').value())">`)
    $('#queryContainer').append(`<p>${res.last_name}</p>`)
    $('#queryContainer').append(`<p>${res.username}</p>`)
    $('#queryContainer').append(`<p>${res.role}</p>`)
    $('#queryContainer').append(`<p>${res.name}</p>`)


}