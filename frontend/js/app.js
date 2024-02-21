const app = {
  init: function()
  {
    console.log( "app init" );

    // On déclenche l'init des autres modules
    taskList.init();
    taskAdd.init();

    // Si j'ai besoin de taskList ici, et que je veux m'assurer qu'elle est chargée
    // alors j'ai besoin de await, sinon inutile d'attendre.
  }
};

// Une fois le DOM chargé, on initialise notre module app
document.addEventListener( "DOMContentLoaded", app.init );

// Si on avait appellé app.init directement, on aurait potentiellement
// commencé a travailler avec un DOM partiellement chargé !
// app.init();