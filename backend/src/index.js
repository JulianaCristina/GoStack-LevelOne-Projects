const express = require('express')
const {uuid, isUuid } = require('uuidv4')

const app = express();

app.use(express.json())


const projects = [];

//interceptador de requisições
function logRequests(request, response, next){
    const {method, url } = request; //pego qual método e qual a rota da requisição

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    return next(); //não interrompe o fluxo
}

function validadeProjectId( request, response, next){
    //vai validar se o id é válido

    const {id} = request.params;


    if(!isUuid(id)){
        return response.status(400).json({error: 'Invalid project ID.'})
    }

    return next()

}

app.use(logRequests)
// app.use('/projects/:id', logRequest) outra forma de utilizar

app.get('/projects', (request, response) => {

    const {title} = request.query;

    const results = title ? projects.filter(project => project.title.includes(title)) : projects;

    return response.json(results)
})

app.post('/projects', (request, response) => {

    const {title, owner } = request.body;
    
    const project = {id: uuid(), title, owner};

    projects.push(project)
    return response.json(project)
})

app.put('/projects/:id', validadeProjectId, (request, response) => {

    const { id } = request.params;
    const {title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return response.status(400).json({error: 'Project not found.'})
    }

    const project = {id, title, owner}

    projects[projectIndex] =  project

    return response.json(project)
})

app.delete('/projects/:id', validadeProjectId, (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return response.status(400).json({error: 'Project not found.'})
    }

    projects.splice(projectIndex, 1)

    return response.status(204).send();
})
app.listen(3333, () => {
    console.log('Back-end started!')
})