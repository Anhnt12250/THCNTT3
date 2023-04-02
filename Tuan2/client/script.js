
turnSwitch = (object, event) => {
    $.ajax({
        type: 'PUT',
        contentType: "application/json",
        dataType: 'json',
        url: 'http://localhost:5555/update-farm',
        data: JSON.stringify({
            id: object.id,
            name: object.name,
            description: object.description,
            isTurnOn: object.isTurnOn,
            class: object.class
        }),
        success: () => {
            let tempInput = document.querySelector(`#input-${object.id}`);
            tempInput.checked = object.isTurnOn == 1 ? true : false;
        },
        error: () => alert("Can't load data")
    })


    event.preventDefault();
    event.stopPropagation();
}

addFarm = (data) => {
    var str = "";

    data.forEach(item => {
        str += `
            <div class="col-md-4 device">
                <h5>
                    <span>
                        <i class="${item.class}"></i>
                        ${item.name}
                    </span>
                </h5>
                <p>${item.description}</p>
                <label class="switch" id="item-${item.id}">
                    <input id="input-${item.id}" type="checkbox" ${item.isTurnOn == 1 ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>
            </div>
            `
    })

    const farms = document.querySelector("#farms");
    farms.innerHTML = str;
}

addSwitch = (data) => {
    data.forEach(item => {
        temp = document.querySelector(`#item-${item.id}`);
        temp.addEventListener('click', (e) => {
            item.isTurnOn = item.isTurnOn == 1 ? 0 : 1;
            turnSwitch(item, e);
        }, false)
    })
}

loadFarms = () => {
    $.ajax({
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        url: 'http://localhost:5555/get-all-farms',
        success: (data) => {
            addFarm(data)
            addSwitch(data)
        },
        error: () => alert("Can't load data")
    })
}


$(document).ready(function () {
    loadFarms();
})