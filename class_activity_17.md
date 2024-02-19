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



```r
# Loop through indices, scrape data, and bind the resulting data frames
start_time <- proc.time() # Capture start time
for (i in 1:length(index)) {
  url <- str_glue("{new_urls}{index[i]}")
  webpage <- read_html(url)
  table_new <- html_table(webpage)[[1]] %>%
    janitor::clean_names() %>%
    mutate(across(everything(), as.character))
  df1[[i]] <- table_new
}
end_time <- proc.time() # Capture end time
end_time - start_time # Calculate duration
```

```
   user  system elapsed 
  3.794   0.145  27.814 
```

```r
df1_final <- do.call(rbind, df1)
df1_final1 <- reduce(df1, dplyr::bind_rows)
```



<!--


```r
# alternate using map_df()
start_time <- proc.time() # Capture start time

urls <- map(index, function(i) str_glue({new_urls}, {index[i]}))
urls <- map(index, ~str_glue({new_urls}, {.x}))

library(tidyverse)
library(rvest)
library(glue)
library(janitor)

# Assuming 'urls' is already defined
movies_data <- map_df(urls, ~read_html(.x) %>%
                        html_table() %>%
                        .[[1]] %>%
                        janitor::clean_names() %>% 
                        mutate(across(everything(), as.character))) 
end_time <- proc.time() # Capture end time
end_time - start_time # Calculate duration
```

```
   user  system elapsed 
  3.819   0.105  29.758 
```

-->

</details>



## Group Activity 2

1. Go to the [scrapethissite](https://www.scrapethissite.com/pages/forms/) and extract the table on the front page.

<!--
<details>
<summary class="answer">Click for answer</summary>




```r
session1 <- read_html("https://www.scrapethissite.com/pages/forms/") %>%
  html_nodes(css = "table") %>%
  html_table()

table_base <- session1 %>% .[[1]]
```


</details>
-->

2. Find out the number of pages that contain the movie table, while looking for the changes in the url in the address bar. How does the url changes when you go to the next page?



<details>
<summary class="answer">Click for answer</summary>



*Answer:* The url field has `?page_num=` added with the number of pages running from 1 to 24.

</details>



3. Write a for loop to store all the data in multiple pages to a single data frame. Please do the same using `purrr:map_df()` as well.


<details>
<summary class="answer">Click for answer</summary>




```r
library(tidyverse)
library(rvest)

new_urls <- "http://scrapethissite.com/pages/forms/?page_num="

# Generate a vector of indices
index <- seq(1, 24)
```




```r
df2 <- list()
start_time <- proc.time() # Capture start time

for (i in index) {
  url <- str_glue("{new_urls}{i}")
  webpage <- read_html(url)
  table_new <- html_table(webpage)[[1]] %>%
    janitor::clean_names() %>%
    #set_names(~ifelse(is.na(.) | . == "", paste("V", seq_along(.), sep=""), .)) %>%
    mutate(across(everything(), as.character))
  df2[[i]] <- table_new
}
end_time <- proc.time() # Capture end time
end_time - start_time # Calculate duration
```

```
   user  system elapsed 
  1.520   0.100   8.724 
```

```r
df2_final <- bind_rows(df2)
df2_final
```

```
# A tibble: 582 x 9
   team_name        year  wins  losses ot_losses win_percent
   <chr>            <chr> <chr> <chr>  <chr>     <chr>      
 1 Boston Bruins    1990  44    24     <NA>      0.55       
 2 Buffalo Sabres   1990  31    30     <NA>      0.388      
 3 Calgary Flames   1990  46    26     <NA>      0.575      
 4 Chicago Blackha~ 1990  49    23     <NA>      0.613      
 5 Detroit Red Win~ 1990  34    38     <NA>      0.425      
 6 Edmonton Oilers  1990  37    37     <NA>      0.463      
 7 Hartford Whalers 1990  31    38     <NA>      0.388      
 8 Los Angeles Kin~ 1990  46    24     <NA>      0.575      
 9 Minnesota North~ 1990  27    39     <NA>      0.338      
10 Montreal Canadi~ 1990  39    30     <NA>      0.487      
# i 572 more rows
# i 3 more variables: goals_for_gf <chr>,
#   goals_against_ga <chr>, x <chr>
```



```r
# alternate using map
urls <- map(index, function(i) str_glue({new_urls}, {i}))
urls <- map(index, ~str_glue("{new_urls}{.x}"))

start_time <- proc.time() # Capture start time
sports_data <- map_df(urls, ~read_html(.x) %>%
                  html_table() %>%
                  .[[1]] %>%
                  janitor::clean_names() %>%
                  mutate(across(everything(), as.character)))

end_time <- proc.time() # Capture end time
end_time - start_time # Calculate duration
```

```
   user  system elapsed 
  1.567   0.056   8.695 
```

```r
sports_data
```

```
# A tibble: 582 x 9
   team_name        year  wins  losses ot_losses win_percent
   <chr>            <chr> <chr> <chr>  <chr>     <chr>      
 1 Boston Bruins    1990  44    24     <NA>      0.55       
 2 Buffalo Sabres   1990  31    30     <NA>      0.388      
 3 Calgary Flames   1990  46    26     <NA>      0.575      
 4 Chicago Blackha~ 1990  49    23     <NA>      0.613      
 5 Detroit Red Win~ 1990  34    38     <NA>      0.425      
 6 Edmonton Oilers  1990  37    37     <NA>      0.463      
 7 Hartford Whalers 1990  31    38     <NA>      0.388      
 8 Los Angeles Kin~ 1990  46    24     <NA>      0.575      
 9 Minnesota North~ 1990  27    39     <NA>      0.338      
10 Montreal Canadi~ 1990  39    30     <NA>      0.487      
# i 572 more rows
# i 3 more variables: goals_for_gf <chr>,
#   goals_against_ga <chr>, x <chr>
```

</details>

