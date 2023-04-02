addFarm = (data) => {
    var str = "";
    $.each(data, (i, item) => {
        console.log(item);

        str += `
            <div class="col-md-4 device">
                <img class="img-thumbnail" src="./assets/${item.image}" />
                <h5>${item.name}</h5>
                <p>${item.description}</p>
                <ul class="details">
                    <li>
                        <span style="font-size: 32px; color: red;">
                            <i class="fas fa-temperature-high"></i>${item.temperature}
                        </span>
                        <br>
                        <span style="font-size: 32px; color: blue;">
                            <i class="fas fa-water"></i>${item.humidity}
                        </span>
                    </li>
                </ul>
                <a href="#" class="btn btn-primary btn-sm" >Details</a>
            </div>
            `
    })
    $("#farms").html(str);
}

loadFarms = () => {
    $.ajax({
        type: 'GET',
        contentType: "application/json",
        dataType: 'json',
        url: 'http://localhost:5555/get-all-farms',
        success: (data) => addFarm(data),
        error: () => alert("Can't load data")
    })
}

$(document).ready(function () {
    loadFarms();
})