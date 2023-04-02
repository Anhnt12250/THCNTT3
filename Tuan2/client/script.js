gSwitch = {}

turnSwitch = (object) => {
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
    })
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
                    <input type="checkbox" ${item.isTurnOn == 1 ? 'checked' : ''}>
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
        gSwitch[item.id] = document.querySelector(`#item-${item.id}`);
        gSwitch[item.id].addEventListener('click', () => {
            turnSwitch(item);
        })
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