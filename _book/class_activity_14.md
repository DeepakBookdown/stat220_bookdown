# Class Activity 14


```r
# load the necessary libraries
library(wordcloud)
library(reshape2)
library(tidyverse)
library(tidyr)
library(tidytext)
library(dplyr)
```



## Group Activity 1

### a. Variance and Skewness 

The variance of a random variable $x$ is defined as: 

$$\operatorname{Var}(x)=\frac{1}{n-1} \sum_{i=1}^{n}\left(x_{i}-\bar{x}\right)^{2}$$

where $x_i = (\sum_i^n x_i)/n$ is the sample mean. Also, the skewness of the random variable $x$ is defined as:

$$\operatorname{Skew}(x)=\frac{\frac{1}{n-2}\left(\sum_{i=1}^{n}\left(x_{i}-\bar{x}\right)^{3}\right)}{\operatorname{Var}(x)^{3 /2}}$$

Please write functions to calculate the variance and skewness of $\{12, 45, 54, 34, 56, 30, 67, \text{NA}\}$.


```r
x <- c(12, 45, 54, 34, 56, 30, 67, NA)
```


<details>
<summary class="answer">Click for answer</summary>


```r
# function to calculate the variance of a vector
var <- function(x){
  x <- na.omit(x) # omit NA values
  sum((x - mean(x)) ^ 2) / (length(x) - 1)
}
```



```r
var(x)
```

```
[1] 346.619
```




```r
# function to calculate the skewness of a vector
skewness <- function(x) {
  x <- na.omit(x) # omit NA values
  sum((x - mean(x)) ^ 3) /((length(x) - 2) * var(x) ^ (3 / 2))
}
```



```r
skewness(x)
```

```
[1] -0.3930586
```

</details>


### b. (Optional)  Conditions and breaks

Create a function that iterates through a numeric vector and stops when it encounters the first negative number, returning the position of that negative number. If there are no negative numbers in the vector, the function should return a message stating that there are no negative numbers.


<details>
<summary class="answer">Click for answer</summary>


```r
find_first_negative <- function(x) {
  negative_positions <- which(x < 0)
  
  if (length(negative_positions) > 0) {
    return(paste("The first negative number is at position", negative_positions[1]))
  } else {
    return("There are no negative numbers in the vector")
  }
}
```


```r
test_vector <- c(5, 12, -7, 20, 15)
find_first_negative(test_vector)
```

```
[1] "The first negative number is at position 3"
```

</details>


--------------------------------------------------------------------

## Group Activity 2



```r
musical_instr_reviews <-  read_csv("https://raw.githubusercontent.com/deepbas/statdatasets/main/musicreviews.csv") %>% 
  rename(ratingOverall = overall)
glimpse(musical_instr_reviews)
```

```
Rows: 10,261
Columns: 3
$ reviewerName  <chr> "cassandra tu \"Yeah, well, that's j…
$ reviewText    <chr> "not much to write about here but it…
$ ratingOverall <dbl> 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 4, …
```

### a. Write a function to filter the dataset based on the provided rating:


<details>
<summary class="answer">Click for answer</summary>


```r
filter_reviews_by_rating <- function(data, rating) {
  data %>% filter(ratingOverall == rating)
}
```

</details>

### b. Write a function to process the text and remove stop words:


<details>
<summary class="answer">Click for answer</summary>


```r
process_text <- function(data) {
  data %>%
    select(reviewText) %>%
    unnest_tokens(output = word, input = reviewText) %>%
    anti_join(stop_words)
}
```

</details>

### c. Write a function to join the processed text with sentiment data and create a word count table.


<details>
<summary class="answer">Click for answer</summary>


```r
create_word_count_table <- function(data) {
  data %>%
    inner_join(get_sentiments("bing")) %>%
    count(word, sentiment, sort = TRUE) %>%
    reshape2::acast(word ~ sentiment, value.var = "n", fill = 0)
}
```

</details>


### d. Create the final function that takes the rating and number of words as input arguments and returns a word cloud plot. 



<details>
<summary class="answer">Click for answer</summary>


```r
word_cloud <- function(rating, num.words) {
  rating <- as.numeric(rating)
  num.words <- as.numeric(num.words)
  
  if (rating >= 1 & rating <= 5) {
    filtered_reviews <- filter_reviews_by_rating(musical_instr_reviews, rating)
    processed_reviews <- process_text(filtered_reviews)
    word_count_table <- create_word_count_table(processed_reviews)
    
    comparison.cloud(
      word_count_table,
      colors = c("blue", "purple"),
      scale = c(2, 0.5),
      max.words = num.words,
      title.size = 2
    )
  } else {
    warning(" Please enter a rating from 1 to 5")
  }
}

word_cloud(rating = "4", num.words = 300)
```

<img src="class_activity_14_files/figure-epub3/unnamed-chunk-13-1.png" width="100%" />

</details>

