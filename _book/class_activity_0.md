# (PART\*) Class Activities {-}

# Class Activity 0

In this worksheet, you will practice creating a GitHub repository using the RStudio Git terminal, usethis::use_github() function and cloning it back to your local machine using RStudio's menu options.

## Tutorial 1: Creating a new GitHub repository using RStudio's Git terminal

<blockquote>
1. Create a new R project in RStudio by clicking on "File" > "New Project" > "New Directory" > "New Project." Give your project a name and choose a location on your computer to save it. Click "Create Project."

2. Initialize a Git repository for your project. Click on the "Terminal" tab in the bottom right pane of RStudio and run the following command:
</blockquote>

## Tutorial 2: Cloning the GitHub repository

In this worksheet, you will practice creating a GitHub repository using the usethis::use_github() function and cloning it back to your local machine using RStudio's menu options.


### Prerequisites

<blockquote>
1. Install the usethis package if you haven't already: install.packages("usethis")

2. Make sure you have a GitHub account, and you are logged in.

3. Configure Git with your name and email address if you haven't already. Run the following commands in the R console, replacing "Your Name" and "youremail@example.com" with your information:
</blockquote>


```r
usethis::use_git_config(user.name = "Your Name", user.email = "youremail@example.com")
```

### Creating a new GitHub repository

<blockquote> 
1.  Create a new R project in RStudio by clicking on "File" > "New Project" > "New Directory" > "New Project." Give your project a name and choose a location on your computer to save it. Click "Create Project."

2. In the R console, load the usethis package:

```r
library(usethis)
```

3. Initialize a Git repository for your project by running:


```r
usethis::use_git()
```


4. Now, let's create a new GitHub repository using the usethis::use_github() function. Run the following command:


```r
usethis::use_github()
```


5. Follow the instructions in the R console, and your GitHub repository will be created. Note the repository URL, as you will need it in the next activity.

</blockquote>


## Tutorial 3: Cloning the GitHub repository

<blockquote>
1. To clone the repository to another folder on your local machine, first, close the current RStudio project by clicking on "File" > "Close Project."

2. Next, create a new R project in RStudio by clicking on "File" > "New Project" > "Version Control" > "Git."

3. In the "Repository URL" field, paste the URL of the GitHub repository you created in Activity 1. Choose a location on your computer to save the cloned project, and click "Create Project."

4. Now, you have successfully cloned your GitHub repository to your local machine. You can make changes to the files
</blockquote>



## Tutorial 4: Creating a new GitHub repository using RStudio's Git terminal

<blockquote>
1. Create a new R project in RStudio by clicking on "File" > "New Project" > "New Directory" > "New Project." Give your project a name and choose a location on your computer to save it. Click "Create Project."

2. Initialize a Git repository for your project. Click on the "Terminal" tab in the bottom right pane of RStudio and run the following command:


```r
git init
```

3. Configure Git with your name and email address if you haven't already. Run the following commands in the terminal, replacing "Your Name" and "youremail@example.com" with your information:


```r
git config user.name "Your Name"
git config user.email "youremail@example.com"
```

4. Commit your project files to the Git repository. Run the following commands in the terminal:


```r
git add .
git commit -m "Initial commit"
```

5. Go to your GitHub account, click on the "+" icon in the upper right corner, and select "New repository." Give your repository a name (it's recommended to use the same name as your R project), and click "Create repository."

6. In the "…or push an existing repository from the command line" section of your new GitHub repository, copy

</blockquote>
