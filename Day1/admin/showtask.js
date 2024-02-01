document.addEventListener('DOMContentLoaded', function () {
    // Get user email from the query parameters (you may need a server to handle this)
    var userEmail = getQueryParam("user");

    // Display user tasks
    displayUserTasks(userEmail);
});

function getQueryParam(name) {
    // Function to retrieve query parameters from the URL
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function displayUserTasks(userEmail) {
    // Retrieve tasks from local storage
    var userTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Filter tasks for the specific user
    var userSpecificTasks = userTasks.filter(task => task.email === userEmail);

    // Display the user's name
    document.querySelector('h1').innerText = `Tasks for User: ${userEmail}`;

    // Display tasks
    var taskList = document.getElementById("taskList");
    userSpecificTasks.forEach(task => {
        var taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <strong>${task.name}</strong><br>
            Category: ${task.category}<br>
            Priority: ${task.priority}<br>
            Details: ${task.details}<br>
            Added on: ${task.timestamp}
        `;
        taskList.appendChild(taskItem);
    });
}
