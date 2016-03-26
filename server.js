var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var projects = [
    {
        "id": 1,
        "name": "My project",
        "tasks": [{
            "id": 1,
            "projectID": 1,
            "name": "My task",
            "deadline": 1457529375881,
            "done": false
        }, {
            "id": 2,
            "projectID": 1,
            "name": "My task2",
            "deadline": 1457529375881,
            "done": false
        }, {
            "id": 3,
            "projectID": 1,
            "name": "My task3",
            "deadline": 1457529375881,
            "done": false
        }]
    },
];

var i = 1;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//== project api
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
    var project = projects.find((project) => project.id === Number(req.params.id));
    res.json(project);
});

app.delete('/api/projects/:id', (req, res) => {
    projects = projects.filter((project) => project.id !== Number(req.params.id));
    res.json(projects);
});

app.put('/api/projects/:id', (req, res) => {
    projects.forEach((project, idx) => {
        if(project.id === Number(req.params.id)) {
            projects[idx] = Object.assign(projects[idx], req.body);
        }
    });
    res.json(projects);
});

app.post('/api/projects', (req, res) => {
    projects.push({
        name: req.body.name,
        id: ++i,
        tasks: [1,2,3]
    });
    res.json(projects);
});

//== tasks api
app.get('/api/projects/:id/tasks', (req, res) => {
    var project = projects.find((project) => project.id === Number(req.params.id));
    res.json(project.tasks);
});

app.post('/api/projects/:id/tasks', (req, res) => {
    projects.forEach((project, idx) => {
        if(project.id === Number(req.params.id)) {
            var tasks = projects[idx].tasks;
            tasks.push(Object.assign({id: tasks.length, done: false, projectID: project.id}, req.body));
            res.json(tasks[tasks.length-1]);
        }
    });
});

app.get('/api/projects/:projectId/tasks/:taskId', (req, res) => {
    var project = projects.find((project) => project.id === Number(req.params.projectId));
    var task = project.tasks.find((task) => task.id === Number(req.params.taskId));
    res.json(task);
});



app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Express server is listening om port 3000');
    }
});