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
session1 <- bow(url = "https://www.the-numbers.com/movie/budgets/all") %>% scrape() %>%
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


3. Write a for loop to store all the data in multiple pages to a single data frame.



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
for (i in 1:length(index)) {
  url <- str_glue("{new_urls}{index[i]}")
  webpage <- read_html(url)
  table_new <- html_table(webpage)[[1]] %>%
    tibble::as_tibble(.name_repair = "unique") %>% 
    janitor::clean_names() %>% 
    mutate(x1 = as.character(x1))
  df1[[i]] <- table_new
}

df1_final <- do.call(rbind, df1)
df1_final1 <- reduce(df1, dplyr::bind_rows)
```



```r
# alternate using map/lapply
urls <- map(index, function(i) str_glue({new_urls}, {index[i]}))
urls <- map(index, ~str_glue({new_urls}, {.x}))


sessions <- map(urls, ~read_html(.x) %>% 
                  html_nodes("table") %>% 
                  html_table() %>% 
                  tibble::as_tibble(.name_repair = "unique") %>% 
                  janitor::clean_names())

movies_data <- do.call(rbind, lapply(1:length(urls), function(i) sessions[[i]][[1]]))
glimpse(movies_data)
```

```
Rows: 6,393
Columns: 6
$ ``               <chr> "1", "2", "3", "4", "5", "6", "7"…
$ ReleaseDate      <chr> "Dec 9, 2022", "Apr 23, 2019", "M…
$ Movie            <chr> "Avatar: The Way of Water", "Aven…
$ ProductionBudget <chr> "$460,000,000", "$400,000,000", "…
$ DomesticGross    <chr> "$684,060,555", "$858,373,000", "…
$ WorldwideGross   <chr> "$2,319,748,227", "$2,794,731,755…
```


</details>



## Group Activity 2

1. Go to the [the numbers webpage](https://www.scrapethissite.com/pages/forms/) and extract the table on the front page.


<details>
<summary class="answer">Click for answer</summary>




```r
session1 <- bow(url = "https://www.scrapethissite.com/pages/forms/") %>% scrape() %>%
  html_nodes(css = "table") %>%
  html_table()

table_base <- session1 %>% .[[1]]
```


</details>


2. Find out the number of pages that contain the movie table, while looking for the changes in the url in the address bar. How does the url changes when you go to the next page?



<details>
<summary class="answer">Click for answer</summary>



*Answer:* The url field has `?page_num=` added with the number of pages running from 1 to 24.

</details>



3. Write a for loop to store all the data in multiple pages to a single data frame.


<details>
<summary class="answer">Click for answer</summary>




```r
library(tidyverse)
library(rvest)

new_urls <- "http://scrapethissite.com/pages/forms/?page_num="

# Create an empty data frame
df2 <- list()

# Generate a vector of indices
index <- seq(1, 24)
```




```r
# Loop through indices, scrape data, and bind the resulting data frames
for (i in index) {
  url <- str_glue("{new_urls}{i}")
  webpage <- read_html(url)
  table_new <- html_table(webpage)[[1]] %>%
    tibble::as_tibble(.name_repair = "unique")
  df2[[i]] <- table_new
}

df2_final <- do.call(rbind, df2)
df2_final1 <- reduce(df2, dplyr::bind_rows)
```



```r
# alternate using map
urls <- map(index, function(i) str_glue({new_urls}, {i}))
urls <- map(index, ~str_glue({new_urls}, {.x}))


sessions <- map(urls, ~read_html(.x) %>% 
                  html_nodes("table") %>% 
                  html_table() %>% 
                  tibble::as_tibble(.name_repair = "unique") %>% 
                  janitor::clean_names())

sports_data <- do.call(rbind, lapply(1:length(urls), function(i) sessions[[i]][[1]]))
sports_data1 <- map_df(1:length(urls), ~sessions[[.x]][[1]])

glimpse(sports_data)
```

```
Rows: 582
Columns: 9
$ `Team Name`          <chr> "Boston Bruins", "Buffalo Sab…
$ Year                 <int> 1990, 1990, 1990, 1990, 1990,…
$ Wins                 <int> 44, 31, 46, 49, 34, 37, 31, 4…
$ Losses               <int> 24, 30, 26, 23, 38, 37, 38, 2…
$ `OT Losses`          <int> NA, NA, NA, NA, NA, NA, NA, N…
$ `Win %`              <dbl> 0.550, 0.388, 0.575, 0.613, 0…
$ `Goals For (GF)`     <int> 299, 292, 344, 284, 273, 272,…
$ `Goals Against (GA)` <int> 264, 278, 263, 211, 298, 272,…
$ `+ / -`              <int> 35, 14, 81, 73, -25, 0, -38, …
```

</details>



4. Create an interactive bar plot to display the number of wins per team and year.


<details>
<summary class="answer">Click for answer</summary>





```r
library(plotly)

bar_plot <- ggplot(sports_data, aes(x = Year, y = Wins, fill = `Team Name`)) +
  geom_bar(stat = "identity", position = "dodge") +
  labs(title = "Number of Wins per Team and Year") +
  theme(legend.position = "bottom")

plotly_bar <- ggplotly(bar_plot)
plotly_bar
```


</details>


5. Explore the relationship between the number of goals scored and the number of goals against for each team in each year with an interactive scatter plot.


<details>
<summary class="answer">Click for answer</summary>





```r
scatter_plot <- ggplot(sports_data, aes(x = `Goals For (GF)`, y = `Goals Against (GA)`, color = `Team Name`, text = paste("Team:", `Team Name`, "<br>Year:", Year))) +
  geom_point() +
  labs(title = "Goals Scored vs. Goals Against per Team and Year") +
  theme(legend.position = "bottom") +
  xlab("Goals Scored (GF)") +
  ylab("Goals Against (GA)") 
```



```r
plotly_scatter <- ggplotly(scatter_plot, tooltip = "text")
plotly_scatter
```

</details>



6. Visualize team performance per year (wins, losses, and OT losses) using a stacked bar plot.


<details>
<summary class="answer">Click for answer</summary>



```r
stacked_bar_plot <- ggplot(sports_data, aes(x = Year, fill = `Team Name`)) +
  geom_bar(aes(y = Wins), position = "stack", stat = "identity", width = 0.4, alpha = 0.8) +
  geom_bar(aes(y = Losses), position = "stack", stat = "identity", width = 0.4, alpha = 0.8) +
  geom_bar(aes(y = `OT Losses`), position = "stack", stat = "identity", width = 0.4, alpha = 0.8) +
  labs(title = "Team Performance per Year (Wins, Losses, and OT Losses)") +
  theme(legend.position = "bottom") +
  xlab("Year") +
  ylab("Number of Games")

plotly_stacked_bar <- ggplotly(stacked_bar_plot)
plotly_stacked_bar
```


</details>



