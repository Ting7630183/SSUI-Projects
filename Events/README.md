[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8513251&assignment_repo_type=AssignmentRepo)
# SSUI HW2 Template

[Please read the rubric and instructions for the assignment here.](https://www.cs.cmu.edu/~bam/uicourse/05631fall2022/HW2/index.html)

## Submission

To submit this assignment, push your most recent code to this repository and make sure you set up GitHub Pages:

Go to `Settings -> Pages -> Deploy from a branch -> main / (root)`

You should see your live website at `https://cmu-ssui-fall2022.github.io/hw2-<your-github-username>/`.

**Lastly, submit the URL for you website to the Canvas assignment**.

Name: Cuiting Li 
Andrew ID: cuitingl
GitHub URL: https://github.com/CMU-SSUI-Fall2022/hw2-Ting7630183
WebPage URL: https://cmu-ssui-fall2022.github.io/hw2-Ting7630183/

Design: To coordinate multiple event handlers, I have a bunch of global variables to keep track of different states. There are three kind of different stats in the global.
Type 1: objects of the target event including, such as selected_object, object_of_mouse_down, object_of_double_click and etc.
Type2: the offset and original position of objects which are 2D positions and stored as an array, such as mouse_down_offset, double_click_offset, double_click_original_position and etc.
Type3: states that keep track of events such as is_mouse_down, dragging_or_not, double_click_mode and etc and all these states are kept as boolean variables. 

Testing: I have created more divs in the HTML in order to test whether all event handlers work.
No extra credits