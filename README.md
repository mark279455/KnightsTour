# Quicksilver IT Site

README.md file for my Code Institutute second project.

![Techsini](documentation/testing/techsini.JPG)

This is an old mathematics puzzle, in which you have to move a knight around a chessboard without landing on the same square twice.
It is possible to do, but it will take you a few attempts.
There are solutions you can find online if you look for them.

The game is simple to play, and allows you to play on square boards between 4 x 4 and up to 15 x 15.
As a mathematics problem it has a long history [Wikipedia](https://en.wikipedia.org/wiki/Knight%27s_tour)

It is not easy to complete, but there are literally trillions of solutions. 
    THIS PAGE WILL SHOW YOU SOLUTIONS [Youtube Numberphile](https://www.youtube.com/watch?v=ab_dY3dZFHM)

It is hosted on Github here [The Knight's Tour](https://mark279455.github.io/KnightsTour/)

[Mark Cooper Knights Tour Github Repository](https://github.com/mark279455/KnightsTour)

## Technology Used

HTML
CSS
Javascript
Google Fonts


## Credits

Cedits are due to...
Gareth_mentor for his advice and recommendations.
ger_ci for help and advice with javascript coding.

## Design

The site consists of 1 responsive page.
index.html

### Colours

The Colours used have been changed a few times during development.
The decision ws made to change to a paler colour chessboard to contrast more with the red and blue of the knights.
the brighter background was chosen to make the page brighter, and the blue text to contrast with that.

### Typography

The fonts used are from Google Fonts.
They are:
Lato - sans-serif
Merriweather - sans-serif

The creator is ot a fan of serif fonts.

---
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


---
## Features

### Resizing

a.  The board will resize according to the dimensions of the display it is opened on.
b.  The board will resize dynamically when a compute browser window is resized.

### Highlighting
a.  Possible moves are highligted, during play, and invalid moves cannot be made.

### Instructions and Results
a.  The Instructions and results are shown in the same space in order that when played on smaller 
        displays the end of game results are visible.
b.  Moves made during play are shown at the end of the game


---
## Deployment

The website has been deployed using Github pages.

on Github, goto settings and then pages.
deploy from branch, main and root.

The site uses relative references, and so deployment in a local environment requires only a web server and a dedicated directory for the project


Version Control
The site was created using the Gitpod and pushed to github to the remote repository ‘KnightsTour’.

The following git commands were used throughout development to push code to the remote repo:

git add <file> - This command was used to add the file(s) to the staging area before they are committed.

git commit -m “commit message” - This command was used to commit changes to the local repository queue ready for the final step.

git push - This command was used to push all committed code to the remote repository on github.

Deployment to Github Pages
The site was deployed to GitHub pages. The steps to deploy are as follows:
In the GitHub repository, navigate to the Settings tab
From the menu on left select 'Pages'
From the source section drop-down menu, select the Branch: main
Click 'Save'
A live link will be displayed in a green banner when published successfully.
The live link can be found here - https://mark279455.github.io/KnightsTour/

Clone the Repository Code Locally
Navigate to the GitHub Repository you want to clone to use locally:

Click on the code drop down button
Click on HTTPS
Copy the repository link to the clipboard
Open your IDE of choice (git must be installed for the next steps)
Type git clone copied-git-url into the IDE terminal
The project will now of been cloned on your local machine for use.

---
## Tests 

Tests were done on the index page to ensure responsiveness on screen sizes from 320px and upwards as defined in [WCAG 2.1 Reflow criteria for responsive design](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html) Chrome, Edge, Firefox and Opera browsers.


Validation
The three html files were validated successfully by the W3C validator.

* [Index Page](https://validator.w3.org/nu/?showsource=yes&doc=https://mark279455.github.io/KnightsTour/index.html)

* [Styles.css](https://validator.w3.org/nu/?showsource=yes&doc=https://mark279455.github.io/KnightsTour/assets/css/style.css)

The site was verified by the W3.org CSS Validator page as well.

![CSS VALIDATION](documentation/testing/w3.org-css-validator.jpg)


## Lighthouse

Lighthouse initially gave slower results than required. Images on the site were converted from .jpg to to .webp format, this successfully improved the loading times and raised the Lighthouse scores to be all over 90%.

index.html
![LIGHTHOUSE](documentation/testing/lighthouse-index.jpg)

services.html
![LIGHTHOUSE](documentation/testing/lighthouse-services.jpg)

contactus.html
![LIGHTHOUSE](documentation/testing/lighthouse-contactus.jpg)


## Wave

index.html

![WAVE-INDEX](documentation/testing/wave-index.jpg)

services.html

![WAVE-SERVICES](documentation/testing/wave-services.jpg)

contactus.html

![WAVE-CONTACTUS](documentation/testing/wave-contactus.jpg)

Wave produced a report showing 2 alerts on each page. This alert was in the header which is common to all pages.

![WAVE-ALERT](documentation/testing/wave-redundant-in-header.jpg)

![WAVE2](documentation/testing/wave2.jpg)

These alerts related to a duplicated link in the header - which was a design choice.


---
## Bugs

The form on the contactus page does not check that the input for number of computers is negative. For this to work, javascript would be required.

