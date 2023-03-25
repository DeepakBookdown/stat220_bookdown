# (PART\*) Basics R

# What is R?

R is a free and open source statistical programming language that facilitates statistical computation. There are a myriad of application that can be done in R, thanks to a huge online support community and dedicated packages. However, R has no graphical user interface and it has to be run by typing commands into a text interface. 


## What is RStudio?

RStudio provides graphical interface to R! You can think of RStudio as a graphical front-end to R that that provides extra functionality. The use of the R programming language with the RStudio interface is an essential component of this course. 


## R Studio Server

The quickest way to get started is to go to [https://maize.mathcs.carleton.edu](https://maize.mathcs.carleton.edu), which opens an R Studio window in your web browser. Once logged in, I recommend that you do the following:

- Step 1: Create a folder for this course where you can save all of your work. In the Files window, click on New Folder.
- Step 2: Click on Tools -> Global Options -> R Markdown. Then uncheck the box that says "Show output inline..."

(It is also possible to download RStudio on your own laptop. Instructions may be found at the end of this document.)


## R Markdown Basics

An R Markdown file (.Rmd file) combines R commands and written analyses, which are 'knit' together into an HTML, PDF, or Microsoft Word document. 

An R Markdown file contains three essential elements:

- Header: The header (top) of the file contains information like the document title, author, date and your preferred output format (pdf_document, word_document, or html_document).

- Written analysis: You write up your analysis after the header and embed R code where needed. The online help below shows ways to add formatting details like bold words, lists, section labels, etc to your final pdf/word/html document. For example, adding ** before and after a word will bold that word in your compiled document. 

- R chunks: R chunks contain the R commands that you want evaluated. You embed these chunks within your written analysis and they are evaluated when you compile the document.


## Installing R/RStudio (not needed if you are using the maize server)

-   Download the latest version of R: 
    - Windows: [http://cran.r-project.org/bin/windows/base/](http://cran.r-project.org/bin/windows/base/)
    - Mac: [http://cran.r-project.org/bin/macosx/](http://cran.r-project.org/bin/macosx/)

-   Download the free Rstudio desktop version (Windows or Mac): <https://www.rstudio.com/products/rstudio/download/>

  Use the default download and install options for each.

## Install LaTeX (for knitting R Markdown documents to PDF): 

If you want to compile R Markdown to .pdf files, you also need a LaTeX distribution (Note: this is not necessary if you choose to compile as a Word document.) Click [instructions for Windows](http://www.miktex.org/) or [instructions for Mac]( https://tug.org/mactex/), depending on your operating system to complete the installation.


## Updating R/RStudio (not needed if you are using the maize server)

If you have used a local version of R/RStudio before and it is still installed on your machine, then you should make sure that you have the most recent versions of each program.

-   To check your version of R, run the command `getRversion()` and compare your version to the newest version posted on  <https://cran.r-project.org/>. If you need an update, then install the newer version using the installation directions above.

-   In RStudio, check for updates with the menu option `Help > Check for updates`. Follow directions if an update is needed.


## Instructions

If using Rstudio on your computer, using the **File>Open File** menu to find and open this .Rmd file. 

If using Maize Rstudio from your browser:

- In the Files tab, select **Upload** and **Choose File** to find the .Rmd that you downloaded. Click *OK* to upload to your course folder/location in the maize server account. 

- Click on the .Rmd file in the appropriate folder to open the file. 

Extra notes:

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
