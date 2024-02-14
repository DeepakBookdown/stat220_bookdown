---
output:
  pdf_document: default
  html_document: default
---
# Class Activity 17


```r
# load the necessary libraries
library(tidyverse)
library(stringr)
library(purrr)
library(ggthemes)
library(rvest)
library(polite)
```



## Group Activity 1

1. Go to the [the numbers webpage](https://www.the-numbers.com/movie/budgets/all) and extract the table on the front page.


<details>
<summary class="answer">Click for answer</summary>




```r
session1 <- read_html("https://www.the-numbers.com/movie/budgets/all") %>%
  html_nodes(css = "table") %>%
  html_table()

table_base <- session1 %>% .[[1]]
```

</details>



2. Find out the number of pages that contain the movie table, while looking for the changes in the url in the address bar. How does the url changes when you go to the next page?


<details>
<summary class="answer">Click for answer</summary>



*Answer:* The starting count of the movie gets concatenated to the url in increments of 100.


</details>


3. Write a for loop to store all the data in multiple pages to a single data frame. Please do the same using `purrr:map_df()` as well.



<details>
<summary class="answer">Click for answer</summary>




```r
library(tidyverse)
library(rvest)

new_urls <- "https://www.the-numbers.com/movie/budgets/all/"

# Create an empty data frame
df1 <- list()

# Generate a vector of indices
index <- seq(1, 6301, 100)
```














