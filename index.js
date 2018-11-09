const express = require('express');
const port = 9000;

const action = require("./data/helpers/actionModel.js");
const project = require("./data/helpers/projectModel.js");

const server = express();

server.use(express.json())

 //Get actions
 server.get('/api/actions', (req, res) => {
    action.get().then(actions => {
    res.json(actions);
  }).catch(err => res.send(err))
});
server.get('/api/actions/:id', (req, res) => {
    action.get(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(() =>
      //  Error
      res.status(404)
        .json({ message: "The post with the specified ID does not exist." })
    )
})
 // Get projects
server.get('/api/projects', (req, res) => {
    project.get().then(projects=> {
     res.status(200).json(projects);
    
  }).catch(err => res.send(err))
});
server.get('/api/projects/:id', (req, res) => {
    project.get(req.params.id)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(() =>
      //  Error
      res.status(404)
        .json({ message: "The post with the specified ID does not exist." })
    )
})
 //Post actions
 server.post('/api/actions', (req, res) => {
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };
    action.insert(newAction)
      .then(actions => {
        res.status(201).json(actions);
        action.get(actions.id)
          .then(newActionConfirmed => res.status(200).json(newActionConfirmed))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
});
 //Post projects
server.post('/api/projects', (req, res) => {
    const { name, description } = req.body;
    const newProject = { name, description };
    project.insert(newProject)
      .then(projects => {
        res.status(201).json(projects);
        project.get(projects.id)
          .then(newprojectsConfirmed => res.status(200).json(newprojectsConfirmed))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
  
  
 // Delete actions
 server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    action.remove(id)
      .then(removedAction => {
        res.status(200).json(removedAction);
      })
      .catch(err => console.error(err));
}); 
 //Delete projects
 server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    project.remove(id)
      .then(removedProjects => {
        res.status(200).json(removedProjects);
      })
      .catch(err => console.error(err));
}); 

 //Put actions
 server.put('/api/actions/:id',(req, res) => {
    const { id } = req.params;
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };
    action.update(id, newAction)
      .then(editedActions => {
        res.status(200).json(editedActions);
      }) 
      .catch(err => console.error(err));
  });
  
 //Put projects
 server.put('/api/projects/:id',(req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const newProject = { name, description };
    project.update(id, newProject)
      .then(editedProjects => {
        res.status(200).json(editedProjects);
      })
      .catch(err => console.error(err));
});
 
server.listen(port, () => {
    console.log (`\n ******* Server Running on Port ${port} ********\n`)
})