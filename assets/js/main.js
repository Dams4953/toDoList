import { tasks as initialTasks } from './storage.js';


document.addEventListener('DOMContentLoaded', () => {
    const askTextForm = document.getElementById('conteneur_askText');
    const askTextInput = document.getElementById('conteneur_asktText_input');
    const affichageId = document.getElementById('conteneur_affichageId');


    // fonction load localStorage
    //
    const loadAsk = () => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }
        return initialTasks;
    };


    // load tâches fonction
    //
    let currentask = loadAsk();


    // fonction save tâches localStorage
    //
    const saveAsk = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Fonction liste de tâches.
    //
    const functionRenduAsk = () => {
        affichageId.innerHTML = currentask.map((task, index) => `
            <li class="${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <span class="task-text">${task.task}</span>
                <button class="delete-button" data-index="${index}">Supprimer</button>
            </li>
        `).join('');

        // écouteurs d'événements buttons suppression.
        //
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                currentask.splice(index, 1);
                saveAsk(currentask);
                functionRenduAsk();
            });
        });

        // écouteurs d'événements cases à cocher.
        //
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const index = event.target.getAttribute('data-index');
                currentask[index].completed = event.target.checked; 
                saveAsk(currentask); 
        
                const listItem = event.target.parentElement;
                listItem.style.textDecorationLine = event.target.checked ? 'line-through' : '';
            });
        });
    };


    // fonction ajout nouvelle tâche.
    //
    const addAsk = (taskText) => {
        currentask.push({ task: taskText, completed: false });
        saveAsk(currentask);
        functionRenduAsk();
    };

    // Gestionnaire d'événements formulaire ajout de tâche.
    //
    askTextForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = askTextInput.value.trim();
        if (taskText) {
            addAsk(taskText);
            askTextInput.value = '';
        }
    });

    // affichage liste des tâches chargement de page.
    //
    functionRenduAsk();
});
