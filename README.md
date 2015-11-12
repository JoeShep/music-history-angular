# music-history-angular
Demonstration code for introductory Angular session at Nashville Software School

Fork it, clone it, run it:  
  - cd into project
  - type `bower install` to install jQuery, bootstrap, angular, and angular-route
  - type `npm install` to install grunt
  - open a new tab and cd into project
  - run `grunt` to generate the CSS and set up watch tasks for JS lint and SASS compilation
  - Back in the first tab, make sure you're not in a sub-folder then run `http-server`
  
Once you open the browser to the `blahblah:8080/#/songs/list`, you should see a div with 6 song title in it, and a text box.

Change `/#/songs/list` to `/#/songs/new` and you should see a form for entering a new song.

Fill out the form and click `Add Song`. If your dev tools are open (If not, why aren't they?) you will see a console log of the list of songs, including the one you just added. Change route from `new` back to `list` (don't refresh the browser) and you will see....nothing new. Why? We just added a new song and the console.log shows it added to the songs array. What's going on?

The answer lies in the wonderful world of promises. See if you can figure out how to get a new promise to be created when a new song is added, instead of getting back an already resolved promise from the ititial page load, that didn't include the new song.

If you get that working, try these things:
  - Get the `getSingleSong` factory method working
  - Break the factory and controllers out into individual files. Is your first instict to create a `controllers` folder? That would work, but what if you grouped controllers and partials (and modules if you had more than one) together into folders by feature instead? (song-list, song-form, song-detail, etc). Would this appeal to you or bother you? Just something to think about.
  - Add events that trigger the route changes.

