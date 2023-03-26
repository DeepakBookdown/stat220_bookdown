# (PART\*) Set-up Instructions {-}

# What is R, RStudio, and RMarkdown? {#rstudio}

R is a free and open source statistical programming language that facilitates statistical computation. There are a myriad of application that can be done in R, thanks to a huge online support community and dedicated packages. However, R has no graphical user interface and it has to be run by typing commands into a text interface. 


## What is RStudio?

RStudio provides graphical interface to R! You can think of RStudio as a graphical front-end to R that that provides extra functionality. The use of the R programming language with the RStudio interface is an essential component of this course. 


## R Studio Server

The quickest way to get started is to go to [https://maize2.mathcs.carleton.edu](https://maize2.mathcs.carleton.edu), which opens an R Studio window in your web browser. Once logged in, I recommend that you do the following:

- Step 1: Create a folder for this course where you can save all of your work. In the Files window, click on New Folder.
- Step 2: Click on Tools -> Global Options -> R Markdown. Then uncheck the box that says "Show output inline..."

(It is also possible to download RStudio on your own laptop. Instructions may be found at the end of this document.)


## R/RStudio

The use of the R programming language with the RStudio interface is an
essential component of this course. You have two options for using
RStudio:

-   The **server version** of RStudio on the web at
    (<https://maize2.mathcs.carleton.edu>). The advantage of using the
    server version is that all of your work will be stored in the cloud,
    where it is automatically saved and backed up. This means that you
    can access your work from any computer on campus using a web
    browser. This server may run slow during peak days/hours. I also recommend
    you to download a local version of R server in your computer in case of rare outages.

-   A **local version** of RStudio installed on your machine. This
    option is highly recommended due to the computational resources this
    course demands. Using this version you can only store your files in your local machine. Additionally, we can save our work on GitHub. We will learn how to use GitHub in the beginning of the course. Both R and RStudio are free and open-source. Please make sure that you have recently updated both R and RStudio.

##  **Installing R/RStudio (not needed if you are using the maize server)**

> Download the latest version of R: <https://cran.r-project.org/>
> Download the free Rstudio desktop version: <https://www.rstudio.com/products/rstudio/download/>

Use the default download and install options for each. For R, download the "precompiled binary" distribution rather than the source code

**Updating R/RStudio (not needed if you are using the maize server)**

If you have used a local version of R/RStudio before and it is still installed on your machine, then you should make sure that you have the most recent versions of each program.

-   To check your version of R, run the command `getRversion()` and compare your version to the newest version posted on  <https://cran.r-project.org/>. If you need an update, then install the newer version using the installation directions above.

-   In RStudio, check for updates with the menu option `Help > Check for updates`. Follow directions if an update is needed.

** Did it work? (A sanity check after your install/update) **

  Do whatever is appropriate for your operating system to launch
    RStudio. You should get a window similar to the screenshot you see
    [here](https://www.rstudio.com/wp-content/uploads/2014/04/rstudio-workbench.png),
    but yours will be more boring because you haven't written any code
    or made any figures yet!

  Put your cursor in the pane labeled *Console*, which is where you
    interact with the live R process. Create a simple object with code
    like `x <- 2 * 4` (followed by enter or return). Then inspect the
    `x` object by typing `x` followed by enter or return. You should see
    the value `8` printed. If this happened, you've succeeded in
    installing R and RStudio!

## What is RMarkdown?

An R Markdown file (.Rmd file) combines R commands and written analyses, which are 'knit' together into an HTML, PDF, or Microsoft Word document. 

An R Markdown file contains three essential elements:

- Header: The header (top) of the file contains information like the document title, author, date and your preferred output format (pdf_document, word_document, or html_document).

- Written analysis: You write up your analysis after the header and embed R code where needed. The online help below shows ways to add formatting details like bold words, lists, section labels, etc to your final pdf/word/html document. For example, adding ** before and after a word will bold that word in your compiled document. 

- R chunks: R chunks contain the R commands that you want evaluated. You embed these chunks within your written analysis and they are evaluated when you compile the document.


## Install LaTeX (for knitting R Markdown documents to PDF): 

You need a Latex compiler to create a pdf document from a R Markdown file. If you use the maize server, you don’t need to install anything. If you are using a local RStudio, you should install a Latex compiler. Below are the recommended installers for Windows and Mac:

-   [MacTeX](https://www.tug.org/mactex/) for Mac (3.2GB)

-   [MiKTeX](https://miktex.org/download) for Windows (190MB)

-   Alternatively, you can install the `tinytex` R package by running
    `install.packages("tinytex")` in the console.



## Updating R/RStudio (not needed if you are using the maize2 server)

If you have used a local version of R/RStudio before and it is still installed on your machine, then you should make sure that you have the most recent versions of each program.

-   To check your version of R, run the command `getRversion()` and compare your version to the newest version posted on  <https://cran.r-project.org/>. If you need an update, then install the newer version using the installation directions above.

-   In RStudio, check for updates with the menu option `Help > Check for updates`. Follow directions if an update is needed.


## Opening a new file

If using Rstudio on your computer, using the **File>Open File** menu to find and open this .Rmd file. 

If using Maize Rstudio from your browser:

- In the Files tab, select **Upload** and **Choose File** to find the .Rmd that you downloaded. Click *OK* to upload to your course folder/location in the maize server account. 

- Click on the .Rmd file in the appropriate folder to open the file. 

##  Running codes and knitting .Rmd files:

- You can run a line of code by placing your cursor in the line of code and clicking **Run Selected Line(s)**
- You can run an entire chunk by clicking the green triangle on the right side of the code chunk.
- After each small edit or code addition, **Knit** your Markdown. If you wait until the end to Knit, it will be harder to find errors in your work.
- Format output type: You can use any of pdf_document, html_document type, or word_document type. 

- **Maize users**: You may also need to allow for "pop-up" in your web browser when knitting documents. 

## Few More Instructions

The default setting in Rstudio when you are running chunks is that the “output” (numbers, graphs) are
shown **inline** within the Markdown Rmd. If you prefer to have your plots appear on the right of the console and not below the chunk, then change the settings as follows:

1. Select Tools > Global Options.
2. Click the R Markdown section and uncheck (if needed) the option Show output inline for all
R Markdown documents.
3. Click OK.

Now try running R chunks in the .Rmd file to see the difference. You can recheck this box if you prefer
the default setting.


## VPN

If you plan to do any work off campus this term, you need to install Carleton’s VPN. This will allow you to access the **maize** server (if needed).

**Installing the GlobalProtect VPN**

Follow the directions [here](https://wiki.carleton.edu/display/itskb/GlobalProtect+VPN) to install VPN.



