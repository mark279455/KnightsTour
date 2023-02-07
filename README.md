
# Quicksilver IT Site

README.md file for my Code Institutute second project.

It is hosted on Github here:  
[The Knight's Tour](https://mark279455.github.io/KnightsTour/)  
The GitHub repository:  
[Mark Cooper Knights Tour Github Repository](https://github.com/mark279455/KnightsTour)

![Techsini](documentation/testing/techsini.JPG)

The Knights Tour is an old mathematics puzzle, in which you have to move a knight around a chessboard without landing on the same square twice.

As a mathematics problem it has a long history [Wikipedia](https://en.wikipedia.org/wiki/Knight%27s_tour)

It is possible to do, but it will take you a few attempts, there are lierally trillions of solutions.
There are also different classifications of solutions.

## Closed Tour
    This is where your from your last move you can go back to the place you started from.

## Open Tour
    This is where your starting point, and last move are not related. - if thats the right word

## Magic Square
    Drop a 1 on your first square, a 2 on the second, and continue to the end.
    Mathematical magic squares are where all the columns and rows and diagonals
    and quarters add up to the same number.

There are solutions you can find online if you look for them.

This version of the game is simple to play, and allows you to play on square boards between 4 x 4 and up to 15 x 15.

It is not easy to complete, but there are literally trillions of solutions.  
    THIS PAGE WILL SHOW YOU SOLUTIONS [Youtube Numberphile](https://www.youtube.com/watch?v=ab_dY3dZFHM)


--- 

# CONTENTS

* [User Experience](#User-Experience)
  * [Initial Thoughts](#Initial-Thoughts)
  * [User Stories](#User-Stories)

* [Design](#Design)
  * [Colours](#Colours)
  * [Typography](#Typography)
  * [Wireframes](#Wireframes)
  * [Features](#Features)
  * [Future Development](#Future-Development)
  * [Accessibility](#Accessibility)

* [Technology Used](#Technology-Used)
  * [Development Tools](#Development-Tools)

* [Deployment](#Deployment)

* [Test](#Tests)
  * [W3C Validator](#W3C-Validator)
  * [Lighthouse](#Lighthouse)
    * [Index.html](#Index.html)
  * [Wave](#wave)
  * [Manual Testing](#Manual-Testing)
  * [Bugs](#Bugs)

* [Credits](#Credits)


--- 


## User Experience

### Initial Thoughts
The author became aware of this puzzle when they were at school, back in the late 70s.
Originally, the idea was to create a mutating board which could be any size by any size. (e.g. 6 by 8, or 17 by 3).
During development, it bacame obvious that this was going to be a problem, as on a small screen, the squares get too small to select.
One of the design wishes, was that the game should be completely responsive, so that in a browser window, the game would resize itself according to the window.


### User Stories  
    Requirements for the user:

    *   Instructions on how to play.
    *   The ability to see the next possible move(s).
    *   Results, and moves used.

- - - 
## Design

The site consists of 1 responsive page, index.html - this refers to a supporting css.page, and a javascript file - script.js.  
The logic for the game is in the javascript file, and the logic to resize the board is handled by the CSS.  
The code will resize and centre the chessboard until the screen is 640px wide, then it will anchor it to the
left side with a margin of 20px.


### Colours

The Colours used have been changed a few times during development.  
The decision was made to change to a paler colour chessboard to contrast more with the red and blue of the knights.  
The brighter background was chosen to make the page brighter, and the blue text to contrast with that.

### Typography

The fonts used are from Google Fonts.  
They are:  
    *   Lato - sans-serif  
    *   Merriweather - sans-serif

The creator is ot a fan of serif fonts.

## Wireframes

Wireframes were created using Balsamiq for the following screen widths:

320 - 600 px wide
601 - 640 px wide
641px = and wider

### Index.html - 320 to 600px wide

![Home Page](documentation/wireframes/320-600.png)


### Index.html - 601 to 640px wide

![Home Page](documentation/wireframes/600-640.png)

### Index.html - 641px and wider

![Home Page](documentation/wireframes/641-above.png)

## Features

### Resizing

    The board will resize according to the dimensions of the display it is opened on.  
    The board will resize dynamically when a compute browser window is resized.

### Highlighting

    Possible moves are highligted, during play, and invalid moves cannot be made.

### Instructions and Results
    
    The Instructions and results are shown in the same space in order that when played on smaller 
        displays the end of game results are visible.
    
    Moves made during play are shown at the end of the game

### Future Development

It would be nice to write some functionality where you could backup your moves, and go back to the last square that you moved to and then continue.
An option to play a "Magic Square" game, where instead of leaving a knight on your last square, you leave a number, and the game will calculate whether or not you have created a "[Magic Square](#Magic-Square)". 

---
## Accessibility
The site uses the following aids to accessibility.

    *   Semantic HTML.
    *   "alt" tags on images.
    *   Sufficient colour contrasts.

---

## Technology Used

    *   HTML
    *   CSS
    *   Javascript
    *   Google Fonts

### Development Tools

    Git
    GitPod
    Chrome Dev Tools
    techsini site to provide images for README

---

## Deployment

The website has been deployed using Github pages.

on Github, goto settings and then pages.
deploy from branch, main and root.

The site uses relative references, and so deployment in a local environment requires only a web server and a dedicated directory for the project

### Version Control
The site was created using the Gitpod and pushed to github to the remote repository ‘KnightsTour’.  

The following git commands were used throughout development to push code to the remote repo:

*   git add <file> - This command was used to add the file(s) to the staging area before they are committed.
*   git commit -m “commit message” - This command was used to commit changes to the local repository queue      ready for the final step.
*   git push - This command was used to push all committed code to the remote repository on github.

### Deployment to Github Pages
    The site was deployed to GitHub pages. The steps to deploy are as follows:

    *   In the GitHub repository, navigate to the Settings tab
    *   From the menu on left select 'Pages'
    *   From the source section drop-down menu, select the Branch: main
    *   Click 'Save'
    *   A live link will be displayed in a green banner when published successfully.
            The live link can be found here -   
            [The Knight's Tour](https://mark279455.github.io/KnightsTour/)

### Clone the Repository Code Locally
Navigate to the GitHub Repository you want to clone to use locally:

    *   Click on the code drop down button
    *   Click on HTTPS
    *   Copy the repository link to the clipboard
    *   Open your IDE of choice (git must be installed for the next steps)
    *   Type git clone copied-git-url into the IDE terminal
    *   The project will now of been cloned on your local machine for use.

---

## Tests 

Tests were done on the index page to ensure responsiveness on screen sizes from 320px and upwards as defined in [WCAG 2.1 Reflow criteria for responsive design](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html).


### W3C Validator
The index.html file was validated successfully by the W3C validator.

* [Index Page](https://validator.w3.org/nu/?showsource=yes&doc=https://mark279455.github.io/KnightsTour/index.html)

* [Styles.css](https://validator.w3.org/nu/?showsource=yes&doc=https://mark279455.github.io/KnightsTour/assets/css/style.css)

The style.css file was verified by the W3.org CSS Validator page.

![CSS VALIDATION](documentation/testing/w3.org-css-validator.png)


## Lighthouse

Lighthouse initially gave slower results than required. Images on the site were converted from .jpg to to .webp format, this successfully improved the loading times and raised the Lighthouse scores to be all over 90%.

### index.html

![LIGHTHOUSE](documentation/testing/lighthouse.png)


## Wave

index.html

![WAVE-INDEX](documentation/testing/wave_empty_board.png)

### Alerts
    Wave shows one alert - saying that the info3 field was a possible heading.
    It is not a heading.

### [Manual Testing](#Manual-Testing)
    The implmentation has been tested extensively using Chrome, Edge, Firefox and Opera browsers.

### Bugs

Everything works as designed, and the author is unaware of any bugs that exist.

---

## Credits

Cedits are due to...
    *   Gareth_mentor for his advice and recommendations.
    *   ger_ci for help and advice with javascript coding.

---
