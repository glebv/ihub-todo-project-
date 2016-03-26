fetch('/api/projects')
    .then((res) => res.json())
    .then(renderProjects);


createProject({name: "new project"});
getProjectById(1);
updateProjectById(1, {name: "updated project"});
removeProjectById(2);
getTasksByProjectId(1);
createTaskByProjectId(1, {name: "One more task", deadline: Date.now() });
getTaskById(1,2);

//== project api
function createProject(project) {
    fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(project),
        headers: {
            'Content-type' : 'application/json'
        }
    })
};

function getProjectById(id) {
    fetch('/api/projects/' + id)
        .then((res) => res.json())
        .then((json) => console.log(json));
};

function updateProjectById(id, project) {
    fetch('/api/projects/' + id, {
        method: 'PUT',
        body: JSON.stringify(project),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((json) => console.log(json));
};

function removeProjectById(id) {
    fetch('/api/projects/' + id, {
        method: 'DELETE'
    })
    .then((res) => res.json())
    .then((json) => console.log(json));
};

//== tasks api
function getTasksByProjectId(id) {
  fetch('/api/projects/'+id+'/tasks')
      .then((res) => res.json())
      .then((json) => console.log(json));
};

function createTaskByProjectId(id, task) {
    fetch('/api/projects/'+id+'/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-type' : 'application/json'
        }
    })
    .then((res) => res.json())
    .then((json) => console.log('new task created ', json));
};

function getTaskById(projectId, taskId) {
    fetch('/api/projects/' + projectId + '/tasks/' + taskId)
        .then((res) => res.json())
        .then((json) => console.log('task ' + taskId + ' for project ' + projectId, json));
};


//== visual logic
function renderProjects(projects) {

    var app = document.getElementById('app');

    projects.forEach((project) => {

        var list = document.createElement('ul');

        Object.keys(project)
            .forEach((key) => {
                var item = document.createElement('li');
                item.textContent = key + ' | ' + project[key];
                list.appendChild(item);
            });

        app.appendChild(list);

    });
};