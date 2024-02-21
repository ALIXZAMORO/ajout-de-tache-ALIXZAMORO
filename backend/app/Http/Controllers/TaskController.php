<?php

  namespace App\Http\Controllers;

  use Illuminate\Http\Request;
  use Illuminate\Http\Response;

  use App\Models\Task;

  class TaskController extends Controller
  {
    // Méthode pour lister toutes les taches
    public function list()
    {
      return Task::all()->load( "category" );
    }

    // Méthode pour récupérer une tache en particulier
    // Notez que cette route contient un paramètre d'URL
    // qui sera automatiquement transmis à la méthode par Laravel
    public function find( $id )
    {
      return Task::findOrFail( $id )->load( "category" );
    }

    // Méthode d'ajout de tache
    public function add( Request $request )
    {
      // Grace a l'injection de dépendance on a désormia accès à $request
      // qui contient toutes les infos de la requete HTTP nous ayant conduit dans cette méthode
      // DOC : https://laravel.com/docs/master/requests#retrieving-input
      $title = $request->input( 'title', "valeur_par_défaut" );

      // On créé une nouvelle instance du Model
      $newTask = new Task();

      // On définit ses propriétés
      // Ici pas de setter sur les modèles Eloquent, les propriétés sont "publiques"
      $newTask->title = $title;

      // Je sauvegarde les changements en BDD (ou stopper le script si la sauvegarde échoue)
      $newTask->saveOrFail();

      // Je retourne la tache fraichement créée (automatiquement convertie en JSON encore une fois)
      // return $newTask;

      // Je peux également préciser à Laravel les détails de la réponse
      // Pratique lorsque je veux indiquer un code retour HTTP spécifique
      return response()->json( $newTask, Response::HTTP_CREATED );
    }

    // Fonction qui s'occupe de la modification d'une tache
    public function update( $id, Request $request )
    {
      // Récupération du nouveau titre de la tache
      $title = $request->input( 'title' ); // Le 2e argument (valeur par defaut) est optionnel

      // TODO bonus : Vérifier la validité des données reçues
      // DOC : https://laravel.com/docs/master/validation

      // Je récupère la tache existante à modifier
      $task = Task::findOrFail( $id );

      // Je modifie ses propriétés par les valeurs de la requete
      $task->title = $title;

      // Je sauvegarder ces changements en BDD
      $task->saveOrFail();

      // On retourne enfin la tache fraichement modifiée
      return $task;
    }

    // Fonction qui s'occupe de la suppression d'une tache
    public function delete( $id )
    {
      // On récupère la tache par son id (erreur 404 si ça échoue)
      $task = Task::findOrFail( $id );

      // On la supprime (erreur 500 si ça échoue)
      $task->deleteOrFail();

      // On retourne rien du tout MAIS avec un code retour "204 No Content"
      return response( null, Response::HTTP_NO_CONTENT );
    }
  }