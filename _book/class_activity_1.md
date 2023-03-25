# (PART\*) Class Activities {-}

# Class Activity 1

The `R` package `babynames` provides data about the popularity of individual baby names from the US Social Security Administration. Data includes all names used at least 5 times in a year beginning in 1880.


```r
#install.packages("babynames")  # uncomment to install
library(babynames)
```

Below is the list for first few cases of baby names.


```r
head(babynames)
```

```
# A tibble: 6 x 5
   year sex   name          n   prop
  <dbl> <chr> <chr>     <int>  <dbl>
1  1880 F     Mary       7065 0.0724
2  1880 F     Anna       2604 0.0267
3  1880 F     Emma       2003 0.0205
4  1880 F     Elizabeth  1939 0.0199
5  1880 F     Minnie     1746 0.0179
6  1880 F     Margaret   1578 0.0162
```

1. How many cases and variables are in the dataset `babynames`?

**Answer:** 


```r
dim(babynames)
```

```
[1] 1924665       5
```

There are 1924665 cases and 5 variables in the dataset `babynames`.

Let's use the package tidyverse to do some exploratory data analysis.


```r
#install.packages("tidyverse")   # uncomment to install
library(tidyverse)
babynames %>% filter(name=='Aimee')
```

```
# A tibble: 150 x 5
    year sex   name      n      prop
   <dbl> <chr> <chr> <int>     <dbl>
 1  1880 F     Aimee    13 0.000133 
 2  1881 F     Aimee    11 0.000111 
 3  1882 F     Aimee    13 0.000112 
 4  1883 F     Aimee    11 0.0000916
 5  1884 F     Aimee    15 0.000109 
 6  1885 F     Aimee    17 0.000120 
 7  1886 F     Aimee    17 0.000111 
 8  1887 F     Aimee    18 0.000116 
 9  1888 F     Aimee    12 0.0000633
10  1889 F     Aimee    16 0.0000846
# ... with 140 more rows
```

```r
filtered_names <- babynames %>% filter(name=='Aimee')
```


```r
#install.packages("ggplot2")   # uncomment to install
library(ggplot2)
```


```r
ggplot(data=filtered_names, aes(x=year, y=prop)) + 
  geom_line(aes(colour=sex)) + 
  xlab('Year') + 
  ylab('Prop. of Babies Named Aimee')
```

\begin{figure}
\includegraphics[width=1\linewidth]{class_activity_1_files/figure-latex/trend-1} \caption{A trend chart}(\#fig:trend)
\end{figure}

2. What do you see in the Figure 1? Explain in a few sentences.

**Answer:**

In Figure 1, we can see the proportion of babies named Aimee by year for both males and females. We notice that the name Aimee has been more popular among females than males throughout the years. There is a peak in popularity around the 1970s for female babies, and then the popularity declines.

3. Repeat question 2 to infer how does the proportion of babies with your first name trend over time. Examine the generated plot and describe the trend of your name's popularity over time. Consider the following points:

Has the popularity of your name increased, decreased, or remained stable over the years? Is there a noticeable difference in popularity between sexes? Are there any interesting patterns or trends, such as sudden increases or decreases in popularity?

**Answer:**


```r
# Replace 'YourName' with your first name
your_name <- "Dee"

your_name_data <- babynames %>% filter(name == your_name)

ggplot(data=your_name_data, aes(x=year, y=prop)) + 
  geom_line(aes(colour=sex)) + 
  xlab('Year') + 
  ylab(paste('Prop. of Babies Named', your_name))
```


\includegraphics[width=1\linewidth]{class_activity_1_files/figure-latex/unnamed-chunk-6-1} 

4. Compare the popularity of your first name with a randomly chosen name from the dataset. Examine the generated plot and compare the popularity of your first name with the randomly chosen name. Consider the following points:

Are there differences in popularity trends between the two names? Is one name consistently more popular than the other, or do their popularity levels change over time? Are there any interesting patterns or trends in the data, such as periods of rapid increase or decrease in popularity?

**Answer**


```r
# Replace 'YourName' with your first name
your_name_data <- babynames %>% filter(name == 'Dee')

# Replace 'RandomName' with a randomly chosen name from the dataset
random_name_data <- babynames %>% filter(name == 'Max')

# Combine the two datasets
combined_data <- bind_rows(your_name_data, random_name_data)

# Plot the data
ggplot(data=combined_data, aes(x=year, y=prop)) + 
  geom_line(aes(colour=sex, linetype=name)) + 
  xlab('Year') 
```


\includegraphics[width=1\linewidth]{class_activity_1_files/figure-latex/unnamed-chunk-7-1} 


## Extras (optional)

### Part 1: Setting Working Directory and Loading Data

1. Set your working directory to a folder on your computer where you would like to save your R scripts and data files.


```r
# Replace 'your_directory_path' with the path to your desired folder
# setwd("your_directory_path")
```


2. Load the mtcars dataset which comes preloaded with R. This dataset consists of various car features and their corresponding miles per gallon (mpg) values.



```r
data(mtcars)
head(mtcars)
```

```
                   mpg cyl disp  hp drat    wt  qsec vs am
Mazda RX4         21.0   6  160 110 3.90 2.620 16.46  0  1
Mazda RX4 Wag     21.0   6  160 110 3.90 2.875 17.02  0  1
Datsun 710        22.8   4  108  93 3.85 2.320 18.61  1  1
Hornet 4 Drive    21.4   6  258 110 3.08 3.215 19.44  1  0
Hornet Sportabout 18.7   8  360 175 3.15 3.440 17.02  0  0
Valiant           18.1   6  225 105 2.76 3.460 20.22  1  0
                  gear carb
Mazda RX4            4    4
Mazda RX4 Wag        4    4
Datsun 710           4    1
Hornet 4 Drive       3    1
Hornet Sportabout    3    2
Valiant              3    1
```


### Part 2: Downloading Packages

1. Install the "tidyverse" package, which is a collection of useful R packages for data manipulation, exploration, and visualization.


```r
# Uncomment the line below to install the package
# install.packages("tidyverse")
```


2. Load the "tidyverse" package into your R session.



```r
library(tidyverse)
```


### Part 3: Creating and Compiling an R Markdown File


1. Create a new R Markdown file in RStudio by clicking on "File" > "New File" > "R Markdown...". Save the file in your working directory.

2. Add the following code to your R Markdown file to create a scatter plot of the mtcars dataset, showing the relationship between miles per gallon (mpg) and the weight of the car (wt).



```r
# Create a scatter plot
ggplot(data = mtcars, aes(x = wt, y = mpg)) +
  geom_point() +
  xlab("Weight (1000 lbs)") +
  ylab("Miles per Gallon") +
  theme_minimal()
```


\includegraphics[width=1\linewidth]{class_activity_1_files/figure-latex/unnamed-chunk-12-1} 


3. Knit your R Markdown file to create an output document. Click the "Knit" button at the top of the RStudio script editor, and choose the output format you prefer (e.g., HTML, PDF, or Word).


\vspace*{0.2in}


## Questions

### 1. How does the weight of a car (wt) affect its miles per gallon (mpg) based on the scatter plot you created?

**Answer:**

Based on the scatter plot, there appears to be a negative relationship between the weight of a car (wt) and its miles per gallon (mpg). As the weight of a car increases, its fuel efficiency (mpg) tends to decrease.

\vspace*{0.2in}

### 2. What is the importance of setting a working directory in R?

**Answer:**

Setting a working directory in R is important because it determines the default location where R will read from or write to when loading or saving files. This makes it easier to keep your files organized and ensures that your R scripts can access the necessary files without needing to specify the full file paths. It also simplifies sharing your R projects with others since the file paths within your scripts will be relative to the working directory.



\vspace*{0.2in}

### 3. Explain the role of R Markdown in creating reproducible research documents.

**Answer:**

R Markdown plays a crucial role in creating reproducible research documents by allowing you to combine text, code, and output (e.g., tables, figures) within a single document. This integration of narrative, data, and results makes it easier to document your data analysis process, ensuring that others can easily understand, reproduce, and build upon your work. R Markdown also supports various output formats (e.g., HTML, PDF, Word) to make it easy to share your research findings with others.





