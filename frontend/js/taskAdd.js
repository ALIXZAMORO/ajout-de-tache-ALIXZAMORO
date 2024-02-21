const taskAdd = {

  // Ici on a besoin d'une méthode init pour ajouter les eventListener
  // notamment sur le bouton qui affiche la modal et sur le form
  init: function()
  {
    // Ecoute du clic sur le bouton d'ajout (qui affiche la modal)
    let showModalButtonElement = document.querySelector( ".create-task-container > button" );
    showModalButtonElement.addEventListener( "click", taskAdd.handleShowModal );

    // Ecoute du clic sur le bouton de fermeture de la modal
    let closeModalButtonElement = document.querySelector( ".modal-dialog-close-button" );
    closeModalButtonElement.addEventListener( "click", taskAdd.handleClickCloseModal );

    // Ecoute du submit du formulaire d'ajout
    let addTaskFormElement = document.querySelector( ".modal-dialog > form" );
    addTaskFormElement.addEventListener( "submit", taskAdd.handleAddTaskFormSubmit );
  },

  // Méthode qui affiche la modal
  handleShowModal: function( event )
  {
    let modalElement = document.querySelector( ".modal-dialog" );
    modalElement.classList.add( "show" );
  },

  // Méthode qui masque la modal
  handleClickCloseModal: function( event )
  {
    let modalElement = document.querySelector( ".modal-dialog" );
    modalElement.classList.remove( "show" );
  },

  // Méthode qui gère la soumission du formulaire
  handleAddTaskFormSubmit: async function( event )
  {
    // Empêche le rechargement de la page
    event.preventDefault();

    // Récupération du formulaire soumis
    let formElement = event.currentTarget;

    // Récupération des valeurs 
    // Première méthode : Récupérer la .value du champ input  
    let taskNameInputElement = formElement.querySelector("#task-title");
    let newTaskName = taskNameInputElement.value;

    // BONUS - Deuxième méthode : FormData
    // DOC : https://developer.mozilla.org/fr/docs/Web/API/FormData/FormData
    // let addFormData = new FormData( formElement );
    // let newTaskNameData = addFormData.get( "title" );
    
    // On indique à l'API qu'il faut créer la nouvelle task
    let newTaskData = await taskAdd.addTaskToAPI( newTaskName );
    console.log( newTaskData );

    // On vérifie qu'on ne reçoit pas false de notre fonction
    if( newTaskData === false )
    {
      taskAdd.displayMessage( false );
    }
    else
    {
      // Ajouter la tache dans la liste
      taskList.insertTaskInDOM( newTaskData );

      // On fait également disparaitre la modal en appellant manuellement 
      // la fonction qui s'execute quand on clique sur la croix
      taskAdd.handleClickCloseModal();

      // On réinitialise les valeurs du formulaire
      formElement.reset();

      // Afficher un message de success
      taskAdd.displayMessage( true );
    }
  },

  // Méthode qui indique à l'API qu'il faut créer la nouvelle task
  addTaskToAPI: async function( taskName )
  {
    let response = await fetch( "http://localhost:8000/api/tasks", {
      method  : "POST",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify( { title: taskName } )
    } );

    // Si on avait transmis formData en paramètre de la méthode
    // on aurait pu stringifier directement tout l'objet formData
      // let response = fetch( "http://localhost:8000/api/tasks", {
      //   method  : "POST",
      //   headers : { "Content-Type": "application/json" },
      //   body    : JSON.stringify(formData)
      // } );

    // Vérifier que la requet nous renvoi bien un code 201
    if( response.status === 201 )
    {
      // On récupère l'objet task à partir du JSON de la réponse
      let taskData = await response.json();
      return taskData;
    }
    else
    {
      // Ici on se contente de retourner false, l'affichage de l'erreur
      // se fera dans une condition de la fonction parente
      return false;
    }
  },

  // Affiche le message de succès si l'argument est true
  // et masque le message d'erreur.
  displayMessage: function( success /* booléen */ )
  {
    let successMessageElement = document.querySelector( ".success" );
    successMessageElement.hidden = !success;

    let errorMessageElement = document.querySelector( ".danger" );
    errorMessageElement.hidden = success;
  }
};

let successMessageElement = document.querySelector(".message.success");
         successMessageElement.hidden = false;
         setTimeout(function () {
           successMessageElement.hidden = true;
         }, 3000);