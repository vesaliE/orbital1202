# orbital1202

Remember to add platforms & install geofire 

			bower install geofire --save

What are we currently working on?

  We are currently using Ionic as our framework and Firebase as our backend database and using github for our source code control.

  Current features:

    Feature 1 - Email login and choosing of username. This users to share as well as get information from live feed and forums.
    Feature 2 - Forum System. Allows users to update  information based on the level of crowd, share live status of canteens. Users can see what other users have written and acts as a secondary source of information.
    Feature 3 - Shows different colours of canteen names depending on its crowdedness. The crowd level in each canteen is determined by the number of people present in the database.
    Feature 4 - Shows the canteens nearest to you and its crowdedness level.
 

    Below we will demonstrate how a user will use our app. The video below also shows a live demostration of how our app works.



    Login Page 
    <img  height="700" src="https://cloud.githubusercontent.com/assets/19265844/16440964/fb282a48-3df8-11e6-9ffb-4b056a6b4bd4.jpeg"/>
  
 

    The app starts off with a login screen where the users will need to login. Upon logging in, the application will obtain and store the location of the user. Users can also sign up here if they do not have an account yet.

 

    Main Screen 
    <img src="https://cloud.githubusercontent.com/assets/19265844/16440929/c5a55b8e-3df8-11e6-8570-7487800b55d7.png">

    Following login, this page is shown with various options for users to choose from. Currently, show my location is just an option we are using for testing purposes and will be removed in the final app. 

 

    Check Canteen
    <img src="https://cloud.githubusercontent.com/assets/19265844/16440926/c4735068-3df8-11e6-8a06-f21bdd0208a4.png"/> 

    Under Check Canteen, Check Cafe, Check Fastfood, a page with all the specified eateries will be listed. Each eatery is color coded according to the data obtained from our database server. Based on the number of people present in each canteen, the level of crowd is color coded in 3 colors: red (very crowded), yellow (getting crowded), and green (not very crowded).
  
    The app checks the data and ensures its within 15min from the current time. If it is not, the server would delete the data and it would not be in the calculations. This ensures that the data shown to the user is as recent as possible.

    *Currently dummy values are being feeded into the database

 

    Biz Canteen

    Within each canteen, there will be 2 options, one for the user to submit comments, and the other for the user to see al the comments that have been sent in by other users.

 

    Leaving Comments

    Here users can submit their comments in. We are thinking about allowing users to submit pictures in too, so that users can see the state of the canteen. We will add that feature in milestone 3 if we have the time for it.

 

    See lah
    

    This is where all the comments from the user is collated and shown. Each user's forum name and message is displayed. Messages are only loaded if they are sent within the day itself. If it is not, the server would delete it. We are still in progress of figuring out how to display the date next to the comments.

 

    Show nearby
    <img  src= "https://cloud.githubusercontent.com/assets/19265844/16440924/c325ade6-3df8-11e6-9e0c-005ba72cfdec.png"/>    


    The Show Nearby function in the main page brings us here. Where eateries nearby the user's current location will be displayed with distance from where they are as well as what kind of eatery it is (cafe, canteen, cast food). We are intending to color code these eateries according to its crowd level and will add that in milestone 3.

 


 

 

 

 
