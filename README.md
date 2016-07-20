<h3>Orbital Team1202</h3>

What have we completed?

  We are using <b>Ionic</b> as our framework and <b>Firebase</b> as our backend database and using <b>Github</b> for our source code control.
  We have also greatly improved our UI since Milestone 2 submission. 
  
 <h4> Features: </h4>

    Feature 1 - Email login and choosing of username. This users to share as well as get information from live feed and forums.
    Feature 2 - Forum System 
      Allows users to update  information based on the level of crowd, share live status of canteens. 
      Users can see what other users have written and acts as a secondary source of information. Users can also upload images to the forum.
    Feature 3 - Shows different icons based on a canteen's level of crowdedness. 
      The crowd level in each canteen is determined by the number of people present in the database which is tracked by geolocation services using Geofire.
    Feature 4 - Shows the canteens nearest to you and its crowdedness level.
    Feature 5 - Menu for cafes/fastfood and stalls for canteens 
    Feature 6 - Map and address for food oulets included 
      Based on a survey conducted, many students themselves do not have knowledege about the different food outlets available in NUS. 
      Thus we have included the address and google map for those who have the time and wish to expolre other food outlets in NUS. 
 
  Below we will demonstrate how a user will use our app. The video below also shows a live demostration of how our app works. 
  We will also show the various versions our app have been through after continous user-testing with friends and family as well as surveys conducted to get feedback and peer evaluation comments.



    Splash Screen & App Icons 
<span>
<img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Simulator%20Screen%20Shot%2020%20Jul%202016%2C%201.04.13%20PM.png"/>
<img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screenshot_20160720-130246.png" />
<img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Simulator%20Screen%20Shot%2020%20Jul%202016%2C%2012.00.01%20PM.png" />
<br />
</span>


    Login Page 
<span>    
<img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/loginPage.png" />
<img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/errorMessage.png">
<img height="300" width="150" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/WhatsApp-Image-20160629.jpeg" />
</br>
</span>

    The app starts off with a login screen where the users will need to login. 
    Upon logging in, the application will obtain and store the location of the user. 
    Users can also sign up and register here if they do not have an account yet.
    
  Home Page <br />
  <span>
  <img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/homePage.png">
  <img height="300" width="150" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screen%20Shot%202016-07-07%20at%204.38.25%20PM.png"/>
  <img height="300" width="150" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screen%20Shot%202016-07-07%20at%204.36.46%20PM.png"/>
  <img height="300" width="150" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screen%20Shot%202016-06-23%20at%2011.17.38%20AM.png"/>
  <br />
  </span>
      
  Upon logging in, user is redirected to the main yumNUS page. 
    Top 3 picks specify the nearest three food outlets based on your location, which is this case 
    is off since an emulator is used for the screenshots. 
    The major 4 icons redirect users to the nearest outlets, list of canteens, cafes or fastfood. 
  
    Nearby
  <span>
  <img height="300" src = "https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/nearby.png">
  <img height="300" src= "https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screen%20Shot%202016-06-23%20at%2011.45.51%20AM.png"/>
  <br/>
  </span>

    The Nearby function in the main page brings us here. 
    Eateries nearby the user's current location will be displayed with distance from where they are as well as 
    the type of eatery (cafe, canteen, cast food). 
    We have color coded these eateries according to its crowd level and display the percentage of crowd the outlet faces. 


  Canteen,Cafe,FastFood<br />
<span>
  <img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/canteen.png">
  <img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/cafe.png">
  <img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/fastfood.png">
  <img height="300" width="150" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screen%20Shot%202016-06-23%20at%2011.23.00%20AM.png" /> 
  <br />
</span>
    
  <p>Under Canteen,Cafe and Fastfood, a page with all the specified eateries will be listed.<br /> Each eatery has an color coded icon according to the data obtained from our database server. <br /> Based on the number of people present in each canteen, <br /> the level of crowd is color coded in 3 colors: red (very crowded), yellow (getting crowded), and green (not very crowded).<br /> The app checks the data and ensures its within 20min from the current time.<br />  If it is not, the server would delete the data and it would not be in the calculations.<br />  This ensures that the data shown to the user is as recent as possible. </p>

    *Currently dummy values are being feeded into the database. 

  Information <br /> 
<span>
<img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/canteenInfo.png" />
<img height="300" width="150" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screen%20Shot%202016-07-08%20at%202.21.41%20PM.png" />
<img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screen%20Shot%202016-07-07%20at%204.44.12%20PM.png" />
<br />
</span>
  <p> Clicking on any canteen/cafe/fastfood will lead to a page with information of that eatery,<br />
  and user will be able to view the forum, details and menu of the eatery.</p>

  Forum<br />
<span>
<img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/forum1.png" />
<img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/forum2.png" />
<img height="300" width="150" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screenshot_20160717-132503.png"/>
<img height="300" width="150" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screen%20Shot%202016-07-08%20at%202.18.57%20PM.png"/>
<br />
</span>
    
  This is where all the comments from the user is collated and shown. 
  Each user's forum name, and time the comment was published is displayed. 
  Commnets are only loaded if they are sent within the day itself. If it is not, the server would delete it. 
  Instead of two separate options as forum and contribute, fourm page now contains contribute option, simplifying 
  UI for user. 
  <br />

  Contribute <br />
<span>
<img height="300" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/forum2.png" />
<img height="300" width="150" src="https://github.com/vesaliE/orbital1202/blob/master/Appscreenshots/Screenshot_20160717-132516.png" />
<br />
</span>

    As stated in milestone 2, we have implemented users to submit pictures in, so that users can see the state of the canteen.
    Users can also submit comments and choose icons related to the level of crowdedness. 
    
 
 


 

 

 

 
