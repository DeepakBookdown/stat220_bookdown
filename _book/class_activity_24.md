# Class Activity 24


```r
# load the necessary libraries
library(tidyverse) 
library(ggthemes)
library(factoextra)
library(janitor)
library(broom)

select <- dplyr::select
theme_set(theme_stata(base_size = 10))


standardize <- function(x, na.rm = FALSE) {
  (x - mean(x, na.rm = na.rm)) / sd(x, na.rm = na.rm)
}
```



## Group Activity 1

Let's look at the following data tibble that randomly creates some `x-` and `y-` coordinates around the cluster centroids that we just saw in class. Please answer the questions based on this data.



```r
set.seed(1234)

my_df <- tibble(
  X1 = rnorm(n = 120, mean = rep(c(2, 4, 7.33), each = 40)),
  X2 = rnorm(n = 120, mean = rep(c(6.33, 3, 6), each = 40))
)

my_df %>%
  ggplot(aes(X1, X2)) +
  geom_point() 
```

<img src="class_activity_24_files/figure-epub3/unnamed-chunk-2-1.png" width="100%" />


a. How many clusters can you identify in the data?


<details>
<summary class="answer">Click for answer</summary>
*Answer:* Answers may vary

</details>

b. Fit `kmeans` algorithm to the data picking the number of clusters you previously identified in part `a`.


<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
set.seed(1234)
res_kmeans <- kmeans(my_df, centers = 3, nstart = 25)
```

</details>

c.  Add the cluster association to the dataset and make a scatter plot color-coded by the cluster association.


<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
augment(res_kmeans, data = my_df) %>%
  ggplot(aes(X1, X2, color = .cluster)) +
  geom_point()
```

<img src="class_activity_24_files/figure-epub3/unnamed-chunk-4-1.png" width="100%" />

</details>

d. Repeat parts `b-c` for identifying more number of clusters than what you picked in part a.



<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
set.seed(1234)
res_kmeans <- kmeans(my_df, centers = 5, nstart = 25)
```



```r
augment(res_kmeans, data = my_df) %>%
  ggplot(aes(X1, X2, color = .cluster)) +
  geom_point()
```

<img src="class_activity_24_files/figure-epub3/unnamed-chunk-6-1.png" width="100%" />

</details>

## Group Activity 2

a. Aggregate the total within sum of squares for each k to the data table `multi_kmeans`.


<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
multi_kmeans <- tibble(k = 1:10) %>%
  mutate(
    model = purrr::map(k, ~ kmeans(my_df, centers = .x, nstart = 25)),
    tot.withinss = purrr::map_dbl(model, ~ glance(.x)$tot.withinss)
  )
```

</details>

b. Make an elbow plot modifying the code below:


<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
multi_kmeans %>%
  ggplot(aes(k, tot.withinss)) +
  geom_point() +
  geom_line()+
  scale_x_continuous(breaks = 1:15) 
```

<img src="class_activity_24_files/figure-epub3/unnamed-chunk-8-1.png" width="100%" />

</details>

c. After picking an optimal number of cluster, use the in-built function in the `factoextra` package to construct the final cluster plot.


<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
set.seed(1234)
kmeans.final <- kmeans(my_df, 5, nstart = 25)
fviz_cluster(kmeans.final, data = my_df, ggtheme = theme_stata())
```

<img src="class_activity_24_files/figure-epub3/unnamed-chunk-9-1.png" width="100%" />

</details>


## (Extra) Group Activity 3

Let's look at the following data tibble that randomly creates some `x-` and `y-` coordinates around the cluster centroids. Now, there are more clusters and the data points are closer to each other. Please repeat the analysis as seen above to find the optimal number of clusters.


```r
set.seed(1234)

my_df <- tibble(
  X1 = rnorm(n = 240, mean = rep(c(2, 4, 7.33, 2.5, 5, 6), each = 40)),
  X2 = rnorm(n = 240, mean = rep(c(6.33, 3, 6, 3.5, 4.5, 5.5), each = 40))
)

my_df %>%
  ggplot(aes(X1, X2)) +
  geom_point() 
```

<img src="class_activity_24_files/figure-epub3/unnamed-chunk-10-1.png" width="100%" />


<!--

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 

a. How many clusters can you identify in the data?

Answer: Answers may vary!

b. Fit `kmeans` algorithm to the data picking the number of clusters you previously identified in part a.


```r
set.seed(1234)
res_kmeans <- kmeans(my_df, centers = 6, nstart = 25)
```

c. Add the cluster association to the dataset and make a scatter plot color-coded by the cluster association.



```r
augment(res_kmeans, data = my_df) %>%
  ggplot(aes(X1, X2, color = .cluster)) +
  geom_point()
```

<img src="class_activity_24_files/figure-epub3/unnamed-chunk-12-1.png" width="100%" />

d. Repeat parts b-c for identifying more number of clusters than what you picked in part a.



```r
set.seed(1234)
res_kmeans <- kmeans(my_df, centers = 8, nstart = 25)
```



```r
augment(res_kmeans, data = my_df) %>%
  ggplot(aes(X1, X2, color = .cluster)) +
  geom_point()
```

<img src="class_activity_24_files/figure-epub3/unnamed-chunk-14-1.png" width="100%" />

e. Aggregate the total within sum of squares for each k to the data table `multi_kmeans.`



```r
multi_kmeans <- tibble(k = 1:15) %>%
  mutate(
    model = purrr::map(k, ~ kmeans(my_df, centers = .x, nstart = 25)),
    tot.withinss = purrr::map_dbl(model, ~ glance(.x)$tot.withinss)
  )
```

</details>

b. Make an elbow plot modifying the code below:


```r
multi_kmeans %>%
  ggplot(aes(k, tot.withinss)) +
  geom_point() +
  geom_line() +
  scale_x_continuous(breaks = 1:15)
```

<img src="class_activity_24_files/figure-epub3/unnamed-chunk-16-1.png" width="100%" />



g. After picking an optimal number of cluster, use the in-built function in the `factoextra` package to construct the final cluster plot.


```r
set.seed(1234)
kmeans.final <- kmeans(my_df, 8, nstart = 25)
fviz_cluster(kmeans.final, data = my_df, ggtheme = theme_stata())
```

<img src="class_activity_24_files/figure-epub3/unnamed-chunk-17-1.png" width="100%" />


-->
