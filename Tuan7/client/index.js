const listDevices = document.querySelector('#list-devices');
const dialog = document.querySelector('#dialog-update');

const addDeviceToListDevices = (device) => {
    const divContainer = document.createElement('div');
    divContainer.classList.add('line');

    divContainer.innerHTML = `
        <div class="name">${device.name}</div>
        <div class="type">${device.type}</div>
        <div class="description">${device.description}</div>
    `;

    actionDiv = document.createElement('div');
    actionDiv.classList.add('action');

    updateButton = document.createElement('button');
    updateButton.innerText = 'Update';
    updateButton.classList.add('btn');
    updateButton.classList.add('outlined');
    updateButton.addEventListener('click', () => {
        updateDevice(device);
    });

    deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('btn');
    deleteButton.classList.add('outlined');
    deleteButton.addEventListener('click', () => {
        deleteDevice(device._id);
    });

    actionDiv.appendChild(updateButton);
    actionDiv.appendChild(deleteButton);

    divContainer.appendChild(actionDiv);

    return divContainer;
}

const fetchDevices = async () => {
    listDevices.innerHTML = `
            <div class="line">
                <div class="name"><strong>Name</strong></div>
                <div class="type"><strong>Type</strong></div>
                <div class="description"><strong>Description</strong></div>
                <div class="action"><strong>Actions</strong></div>
            </div>
            `;


    fetch('http://localhost:5555/device/')
        .then(response => response.json())
        .then(data => {
            data.forEach(device => {
                listDevices.appendChild(addDeviceToListDevices(device));
            });
        });
}

const addDevice = document.querySelector('#add-device');

addDevice.addEventListener('click', () => {
    createDevice();
});

const createDevice = () => {
    dialog.showModal();

    const nameInput = document.querySelector('#name');
    const typeInput = document.querySelector('#type');
    const descriptionInput = document.querySelector('#description');

    nameInput.value = '';
    typeInput.value = '';
    descriptionInput.value = '';

    const createButton = document.querySelector('#create');
    createButton.style.display = 'inline-block';

    const execute = ($event) => {
        fetch('http://localhost:5555/device/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameInput.value,
                type: typeInput.value,
                description: descriptionInput.value,
            }),
        })
            .then(response => response.json())
            .then(data => {
                dialog.close();
                fetchDevices();
            }).catch(err => {
                console.log(err);
            })
        createButton.removeEventListener('click', execute, true);
    }

    createButton.addEventListener('click', execute, true);

    const updateButton = document.querySelector('#update');
    updateButton.style.display = 'none';

    const cancelButton = document.querySelector('#cancel');
    cancelButton.addEventListener('click', () => {
        createButton.removeEventListener('click', execute, true);
        dialog.close();
    });
}

const updateDevice = (device) => {
    dialog.showModal();

    const nameInput = document.querySelector('#name');
    const typeInput = document.querySelector('#type');
    const descriptionInput = document.querySelector('#description');

    nameInput.value = device.name;
    typeInput.value = device.type;
    descriptionInput.value = device.description;

    const createButton = document.querySelector('#create');
    createButton.style.display = 'none';

    const updateButton = document.querySelector('#update');
    updateButton.style.display = 'inline-block';

    const execute = ($event) => {
        fetch(`http://localhost:5555/device/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: device._id,
                name: nameInput.value,
                type: typeInput.value,
                description: descriptionInput.value,
            }),
        })
            .then(response => response.json())
            .then(data => {
                dialog.close();
                fetchDevices();
            }).catch(err => {
                console.log(err);
            })
        updateButton.removeEventListener('click', execute, true);
    }

    updateButton.addEventListener('click', execute, true);

    const cancelButton = document.querySelector('#cancel');

    cancelButton.addEventListener('click', () => {
        updateButton.removeEventListener('click', execute, true);
        dialog.close();
    });
}

const deleteDevice = async (id) => {
    fetch(`http://localhost:5555/device/?id=${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            fetchDevices();
        });
}



fetchDevices();