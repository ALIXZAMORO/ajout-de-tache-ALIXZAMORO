const taskList = {

  init : async function()
  {
    console.log('taskList init')

    // Optionnel : vider la <ul> si on ne l'a pas déjà fait dans le HTML
    // let taskListElement = document.querySelector( ".tasklist" );
    // taskListElement.textContent = "";

    // On demande à l'API de nous retourner toutes les taches
    let allTasks = await taskList.getAllTasksFromAPI();

    // Maintenant que nos taches sont récupérées (on est sur que c'est le cas grace a await)
    // On peut boucler dessus pour les ajouter au DOM
    for( let task of allTasks )
    {
      taskList.insertTaskInDOM( task );
    }
  },

  // Méthode qui renvoi la liste des taches depuis l'API
  getAllTasksFromAPI: async function()
  {
    console.log('taskList getAllTasksFromAPI');

    // On fait une requete à l'API grace à fetch
    let response = await fetch( "http://localhost:8000/api/tasks" );

    // Ici comme on a await fetch(), on ne reçoit pas une Promise mais la réponse de l'API
    console.log( response );

    // Il faut encore lire le JSON de cete réponse, et pour ça, on utilise .json() dessus
    // Attention là encore on reçoit une Promise (de lecture du JSON), il faut aussi la await
    let jsonData = await response.json();
    console.log( jsonData );

    // Ici, j'ai bien dans jsonData, le contenu de la réponse converti du JSON, je le retourne
    return jsonData;
  },
  
  // Méthode qui se charge d'ajouter les données d'UNE tache reçue en argument
  // dans le DOM en créant la structure du HTML qui la représente
  insertTaskInDOM: function( taskData )
  {
    // On créé notre élément qui représent notre tache, ici une <li>
    let taskElement = document.createElement( "li" );

    // On lui défini l'attribut de donnée data-id et y stocke l'ID de la task en BDD
    taskElement.dataset.id = taskData.id;

    // Ensuite on passe au contenu de la li, d'abord le titre en <p>
    let titleElement = document.createElement( "p" );

    // On définit le contenu textuel de cette nouvelle balise <p> parle titre de la tache
    titleElement.textContent = taskData.title;

    // Il ne faut pas oublier d'indiquer que cette balise doit etre DANS la <li> créé précédemment
    taskElement.append( titleElement );

    // E07 : Ajout de la catégorie en <em>
    let categoryElement = document.createElement( "em" );
    if( taskData.category != null )
    {
      categoryElement.textContent = taskData.category.name;
    }
    else
    {
      categoryElement.textContent = "Non catégorisé";
    }
    titleElement.append( categoryElement );

    // On fait pareil pour les boutons d'action
    let deleteButtonElement = document.createElement( "div" );
    deleteButtonElement.classList.add( "delete" );
    deleteButtonElement.addEventListener( 'click', taskDelete.handleDeleteButtonClick );
    taskElement.append( deleteButtonElement );

    let editButtonElement = document.createElement( "div" );
    editButtonElement.classList.add( "edit" );
    taskElement.append( editButtonElement );

    // Enfin, il ne reste plus qu'à ajouter notre <li> dans la <ul>
    // Sinon, elle n'apparaitra nulle part !
    let taskListElement = document.querySelector( ".tasklist" );
    taskListElement.append( taskElement );
  }
};