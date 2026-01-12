PROJECT: SDG 14 - Ocean Conservation Interactive Poster
COURSE: COMM2754 - Digital Media Specialisation 1
SEMESTER: C 2025
STUDENT: Nguyen Thi Xuan Hien - s4072453

================================================================================
1. PROJECT DESCRIPTION
================================================================================
This project is a generative art poster advocating for SDG 14 (Life Below Water). 
It features a rotating typographic system using p5.js to create a "radar" effect, 
symbolizing the urgent monitoring of ocean health. 

The project includes:
- Animated typography rotating in concentric circles.
- Organic "blobs" moving along elliptical paths to simulate marine life/fluidity.
- Swaying coral imagery anchored to the bottom of the viewport.
- An informational overlay that provides details on SDG 14 and the team.

================================================================================
2. FILE STRUCTURE
================================================================================
/Project_Folder
  |
  |-- index.html       (The main entry point for the browser)
  |-- style.css        (Styling for the overlay, buttons, and layout)
  |-- java.js          (The p5.js logic for animation and graphics)
  |-- README.txt       (This file)
  |
  |-- /assets
      |-- Vector.svg   (Coral image asset)

================================================================================
3. HOW TO RUN
================================================================================
Option 1 (Recommended - VS Code):
   1. Open the project folder in Visual Studio Code.
   2. Install the "Live Server" extension.
   3. Right-click on 'index.html' and select "Open with Live Server".

Option 2 (Direct Open):
   1. Ensure the 'assets' folder contains 'Vector.svg'.
   2. Double-click 'index.html' to open it in any modern web browser (Chrome, 
      Firefox, Safari, Edge).

*Note: If the coral image does not load when opening directly, please use Option 1 
due to browser CORS (Cross-Origin Resource Sharing) security policies regarding 
loading local images.*

================================================================================
4. REFERENCES & CREDITS
================================================================================

--- Code & Libraries ---

1. p5.js (no date) Reference. Available at: https://p5js.org/reference/ (Accessed: 21 November 2025).

2. The Coding Train (2015) 9.1: Transformations Pt.1 (Translate, Rotate, Push/Pop) - p5.js Tutorial. Available at: https://www.youtube.com/watch?v=o9sgjuh-CBM (Accessed: 21 November 2025).

3. The Coding Train (2016) 3.4: Polar Coordinates - The Nature of Code. Available at: https://www.youtube.com/watch?v=N6JDbx47gJ0 (Accessed: 21 November 2025).

4. Google (2025) Gemini (Version 1.5 Pro) [Large Language Model]. Available at: https://gemini.google.com (Accessed: 21 November 2025). [Used for debugging responsive layout code and optimizing the arc-length spacing algorithm].

--- Fonts ---

1. Google Fonts (no date) 'Notable'. Available at: https://fonts.google.com/specimen/Notable (Accessed: 21 November 2025).

2. Google Fonts (no date) 'Atkinson Hyperlegible Mono'. Available at: https://fonts.google.com/specimen/Atkinson+Hyperlegible+Mono (Accessed: 21 November 2025).

--- Assets ---

1. Coral Vector Image: [Insert link to where you got the image or "Self-created"]