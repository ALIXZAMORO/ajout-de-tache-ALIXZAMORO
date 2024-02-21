const taskDelete = {

    // Fonction appellée lors du clic sur le bouton de suppression
    handleDeleteButtonClick: async function( event )
    {
      console.log( event );
      
      // On récupère l'élement cliqué
      let clickedButtonElement = event.currentTarget;
      // console.log( clickedButtonElement.parentElement );
      // console.log( clickedButtonElement.parentNode );
      
      // On récupère la <li> parente la plus proche
      // DOC : https://developer.mozilla.org/fr/docs/Web/API/Element/closest
      let taskElement = clickedButtonElement.closest( 'li' );
      // console.log( taskElement );
  
      // Récupéréation de l'id de la tache pour le delete
      let taskID = taskElement.dataset.id;
  
      // On supprime la tache dans l'API
      await taskDelete.deleteTaskFromAPI( taskID );
  
      // On retire l'élement du DOM
      taskElement.remove();
    },
  
    deleteTaskFromAPI: async function( id )
    {
      let response = await fetch( 
        "http://localhost:8000/api/tasks/" + id,  // URL de l'endpoint d'API
        { method: 'DELETE' }                      // Options du Fetch
      );
      console.log( response );
    }
  }