# Current Status of the Application
as of the last commit `03fbe4465cc1998a5a749640423ebeb94fae67ca` on August 20, 2018

## High Level Architecture Diagram
<img src="images/High-Level-Architecture-Diagram.png" height="500px"/>

*Figure 1. High level architecture diagram that illustrates the relationships between different system components (as of August 20, 2018).*

## Description of system components

### Backend Server and Database

[Wild Apricot](https://www.wildapricot.com/) Membership Managment Software is currently used by Yes Vancouver to manage members and events. Wild Apricot exposes RESTful APIs that allow the mobile application to retrieve information about these members and events.

### Frontend React Native Mobile Application

#### Basic Layout

Most of the application is structured in a layered manner. These layers are organized using the following folders:

-  `src/apicalls/` - is the lowest layer of the application that makes REST API calls to the Wild Apricot server. Before retrieving the events and contact details from Wild Apricot, first a Bearer authentication token needs to be retrieved. This authentication token expires after a certain amount of time and needs to be included in the header of every API call to Wild Apricot when retrieving or modifying events and contact details.

- `src/lib/` - is the middle layer of the application that takes the data returned from the apicalls layer and packages the data into objects that can be easily consumed by the user interface components.

- `src/components` - is the top layer of the application that defines the user interface layout.

Not all of the application follow this structure. The `Login` and `Signup` component have not been refactored yet and trigger API calls directly. In the future, it would be nice to have all components follow a consistent structure, whether it is this one or a completely new structure, to improve maintainability.

#### Events Screen
-   `src/components/Events/EventsList.js`  
    When a user clicks on the calendar icon on the bottom navigation bar, they will see a list of upcoming and past events. Currently, there is no logic to sort the list of events by data and this should be implemented in the future. This screen can also handle edge cases like displaying multi-day events and displaying and 'Failed to retrieve events' message when the server cannot be reached.

-   `src/components/Events/EventsDetails.js`  
    When a user clicks on an event listed on the EventsList screen, they will be navigated into the EventsDetails screen that displays a more details about an event. The way this page is rendered depends on how the event was created in Wild Apricot

    - **Basic Event**  
    When an admin on Wild Apricot creates an event by filling in the system's mandatory fields (eg. location, date, time) for events and adding HTML to the event description, the EventsDetails screen on the app will display the mandatory fields on the top and below that render the HTML in using the `react-native-render-html` library.

    - **Event with Additional Details**  
    In the Yes Vancouver app prototype, the EventsDetails screen contains a banner image, text description of the event, speakers, and sponsors. However, Wild Apricot does not support custom fields for Events. The challenge is finding a solution that keeps all the information about an event together in that Event entry on Wild Apricot, while not impacting the way the event is displayed on a Web browser. The current implementation requires an admin to add an XML document as an HTML comment to the end of the HTML description in an event entry on Wild Apricot. In the mobile app, this XML document is retrieved from the `DescriptionHtml` field of the events API response and then parsed for the banner image, event text description, speaker details, and sponsors.

#### Perks Screen

-   `src/components/Perks/PerksList.js` 
    Currently this screen displays a static list of sponsors. In the future, these sponsors and their logos should be fetched dynamically from the server. The issue is Wild Apricot does not have support for sponsors. Currently, the solution is to add a Contact in Wild Apricot to represent a sponsor and add some custom field. Sorting the sponsors alphabetically and categorically and favoriting sponsors has not been implemented.

-   `src/components/Perks/PerksDetails.js` 
    Currently this screen displays static details about a sponsor and this information needs to be dynamically fetched from the server.

#### Newsfeed Screen

`src/components/NewsFeed/NewsFeedView.js`  
When a user logins into the app, the NewsFeed screen will be initially displayed. Currently this screen just static images and text. In the prototype, this screen contains the fundraising goal and latest blog posts. May need to discuss with Yes Vancouver to clarify the requirements of this screen.

#### Messaging Screen

`src/components/Messaging/MessagingView.js`  
This feature was discussed with Yes Vancouver and will not be implemented due to its complexity. The tab on the bottom navigation bar for messaging has been commented out. Wild Apricot currently does not contain the functionality for messaging between members. To implement this feature in the app, an external database will be required. 

#### Profile Screen

`src/components/Profile/ProfileDetails.js`  
This view can fetch both the essential and custom fields for a contact from Wild Apricot and display them. The profile picture is currently static. Work needs to be done to dynamically fetch the profile picture from Wild Apricot. This screen currently has two buttons that navigate to the `EditProfile` and `ChangePassword` screens.

`src/components/Profile/EditProfile.js`  
This view allows a user to edit both the essential and custom text fields for a contact. When the form is submitted, Wild Apricot will be updated. Then the user will be navigated back to the `ProfileDetails` page, where they will see their updated details. Currently, uploading or editing a profile picture are not implemented.

`src/components/Profile/ChangePassword.js`  
The visual layout of the ChangePassword screen is implemented but does not do anything. The PUT call to change the password has not been implemented. This call is very similar to the one done in `EditProfile`.

#### Sign Up

`src/components/SignUp/SignUp.js`  
This view allows a user to create an account on Wild Apricot inside the app. Currently there is basic email validation and the component does make an API call to Wild Apricot to create an account. After creating an account, the user will be navigated to screens where they are prompted to fill in custom profile details (eg.company, title, Linkedin, Facebook). Only the visual layout of these screens are implemented. Submitting these custom profile details to Wild Apricot has not been implemented yet.

#### Authentication

`src/components/Login/LoginForm.js`  
Currently, a user can login with their Wild Apricot credentials in the app and see their own profile information. Log out functionality has not been implemented yet.