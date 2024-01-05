
# Github Tutorial



```r
# load the required libraries
library(credentials) # to help with PAT access
library(gitcreds)
library(usethis)
```


```r
# STEPS INVOLVED TO ESTABLISH GIT CREDENTIALS / PAT

# Step 1

# usethis::use_git_config(user.name = "deepbas", user.email = "deepbas99@gmail.com")

# Step 2

# usethis::create_github_token()

# Step 3

# if this is the second/subsequent iteration start from here

# gitcreds::gitcreds_set()

# Verify

# gitcreds::gitcreds_get()
```



In this worksheet, you will practice creating a GitHub repository using the usethis::use_github() function and cloning it back to your local machine using RStudio's menu options.


## Tutorial 1: Creating and cloning a Repository starting from Github to RStudio

<blockquote>
1. Visit the GitHub website at [https://github.com](https://github.com) and sign in using your GitHub account. If you don't have an account yet, you can create one for free.

2. Once logged in, click on the "+" icon in the top right corner of the webpage, then click on "New repository".

3. Enter a name for your new repository in the "Repository name" field. You may also provide an optional description.

4. Choose the visibility of your repository by selecting either "Public" or "Private". Public repositories are visible to anyone, while private repositories are only visible to you and any collaborators you invite.

5. (Optional) Check the box to initialize the repository with a README file.

6. Click on the "Create repository" button to create your new repository.

</blockquote>

This will create a new GitHub repository on your Github account. Follow further to clone the repository to your local folder using RStudio.


<blockquote>

1. Go to your GitHub repository webpage and click on the green "Code" button. This will display a dropdown menu with a URL for your repository. Click on the clipboard icon to copy the URL to your clipboard.

2. Open RStudio, and from the "File" menu, select "New Project".

3. In the "New Project" dialog, choose "Version Control".

4. Select "Git" as the version control system.

5. In the "Repository URL" field, paste the URL that you copied from your GitHub repository webpage.

6. Choose a local directory where you want to clone the repository by clicking on the "Browse" button and navigating to the desired folder on your computer.

7. Click on "Create Project" to clone the GitHub repository to your local computer.

</blockquote>



## Tutorial 2: Creating a new GitHub repository using `usethis` R package (RStudio to Github) (Works ONLY on local RStudio)


### Prerequisites

<blockquote>
1. Install the usethis package if you haven't already: install.packages("usethis")

2. Make sure you have a GitHub account, and you are logged in.

3. Configure Git with your name and email address if you haven't already. Run the following commands in the R console, replacing "Your Name" and "youremail@example.com" with your information:
</blockquote>


```r
usethis::use_git_config(user.name = "Your Name", user.email = "youremail@example.com")
```



<blockquote>

4. Create a new R project in RStudio by clicking on "File" > "New Project" > "New Directory" > "New Project." Give your project a name and choose a location on your computer to save it. Click "Create Project."

5. Make a new file or copy and paste a .Rmd file that you want to have in your repo and save it to your requirement.

</blockquote>


6. In the R console, load the usethis package:


```r
library(usethis)
```

7. Initialize a Git repository for your project by running:


```r
usethis::use_git()
```


8. Now, let's create a new GitHub repository using the usethis::use_github() function. Run the following command:


```r
usethis::use_github()
```


9. Follow the instructions in the R console, and your GitHub repository will be created. Note the repository URL, as you will need it in the next activity.

</blockquote>


<!--

## (Optional) Tutorial 3: Creating a new GitHub repository using RStudio's Git terminal

<blockquote>
1. Create a new R project in RStudio by clicking on "File" > "New Project" > "New Directory" > "New Project." Give your project a name and choose a location on your computer to save it. Click "Create Project."

2. Initialize a Git repository for your project. Click on the "Terminal" tab in the bottom right pane of RStudio and run the following command:

```
git init
```

3. Configure Git with your name and email address if you haven't already. Run the following commands in the terminal, replacing "Your Name" and "youremail@example.com" with your information:

```
git config user.name "Your Name"
git config user.email "youremail@example.com"
```

4. Commit your project files to the Git repository. Run the following commands in the terminal:

```
git add .
git commit -m "Initial commit"
```

5. Go to your GitHub account, click on the "+" icon in the upper right corner, and select "New repository." Give your repository a name (it's recommended to use the same name as your R project), and click "Create repository."

6. In the "…or push an existing repository from the command line" section of your new GitHub repository, copy the commands under this section. It should look similar to the following (replace <your-username> and <your-repo-name> with your GitHub username and repository name):

```
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main
```

7. Paste the copied commands into the RStudio terminal and execute them. This will link your local Git repository to the remote GitHub repository and push your initial commit to the GitHub repository.

</blockquote>

-->


