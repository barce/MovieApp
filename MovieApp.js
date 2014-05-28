if (Meteor.isClient) {
  // Declare client Movies collection
  Movies = new Meteor.Collection("movies");
   
  // Bind moviesTemplate to Movies collection
  Template.moviesTemplate.movies = function () {
    return Movies.find();
  };

  Template.movieForm.events = {
    'submit': function (e, tmpl) {
      // Don't postback
      e.preventDefault();
      
      // create the new movie
      var newMovie = {
        title: tmpl.find("#title").value,
        director: tmpl.find("#director").value
      };
      
      // add the movie to the db
      Movies.insert(newMovie);
    }
  };
}

if (Meteor.isServer) {
  Movies = new Meteor.Collection("movies");

  Meteor.startup(function () {
    if (Movies.find().count() == 0) {
      console.log("got here");
      Movies.insert({ title: "Star Wars", director: "Lucas" });
      Movies.insert({ title: "Memento", director: "Nolan" });
      Movies.insert({ title: "King Kong", director: "Jackson" });
    }
  });
}
