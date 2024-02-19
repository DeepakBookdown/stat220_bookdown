# Class Activity 4


```r
# Load the required libraries
library(tidyverse)
library(ggplot2)
library(datasauRus)
```


## Your turn 1

This worksheet will guide you through creating various plots using the `ggplot2` package in R. We will be using the `datasaurus`_dozen dataset from the `datasauRus` package for demonstration purposes. The dataset contains 13 different datasets, and we'll use them to create a variety of plots.

### Scatterplot



a. Run the following code.


```r
ggplot(data = dino_data, mapping = aes(x = x, y = y)) +
  geom_point()
```


\includegraphics[width=1\linewidth]{class_activity_4_files/figure-latex/unnamed-chunk-3-1} 

b. You _must_ remember to put the aesthetic mappings in the `aes()` function! What happens if you forget? 

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 

If you forget to put the aesthetic mappings inside the aes() function, ggplot2 will not be able to map the variables to the aesthetics correctly, and you might encounter an error or unexpected behavior in your plot.


```r
# Add a layer and see what happens
ggplot(data = dino_data , x = x , y = y)
```


\includegraphics[width=1\linewidth]{class_activity_4_files/figure-latex/unnamed-chunk-4-1} 

</details>

c. The aesthetic mappings can be specified in the geom layer if you prefer, instead of the main `ggplot()` call. Give it a try:

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
# Rebuild the scatterplot with your aesthetic mapping in the geom layer
ggplot(data = dino_data) +
   geom_point(aes(x = x, y = y)) 
```


\includegraphics[width=1\linewidth]{class_activity_4_files/figure-latex/unnamed-chunk-5-1} 

</details>

### Bar Plot

In this problem, we'll explore creating a bar plot using the `datasaurus`_dozen dataset.

a. Create a new data frame containing the count of observations in each dataset.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
dataset_counts <- datasaurus_dozen %>%
  group_by(dataset) %>%
  summarise(count = n())
```

</details>

b. Create a bar plot showing the number of observations in each dataset.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
ggplot(data = dataset_counts, aes(x = dataset, y = count)) +
  geom_bar(stat = "identity") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) 
```


\includegraphics[width=1\linewidth]{class_activity_4_files/figure-latex/unnamed-chunk-7-1} 

</details>

### Histogram

a. Create a histogram of the `x` variable for the `dino` dataset.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
ggplot(data = dino_data, aes(x = x)) +
  geom_histogram(binwidth = 1) 
```


\includegraphics[width=1\linewidth]{class_activity_4_files/figure-latex/unnamed-chunk-8-1} 

</details>

b. Overlay a density curve on the histogram.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
ggplot(data = dino_data, aes(x = x)) +
  geom_histogram(aes(y = after_stat(density)), binwidth = 2, fill = "lightblue") +
  geom_density(color = "red")
```


\includegraphics[width=1\linewidth]{class_activity_4_files/figure-latex/unnamed-chunk-9-1} 

</details>

### Boxplot


a. Create a boxplot of the x variable for each dataset in datasaurus_dozen.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
ggplot(data = datasaurus_dozen, aes(x = dataset, y = x)) +
  geom_boxplot() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
```


\includegraphics[width=1\linewidth]{class_activity_4_files/figure-latex/unnamed-chunk-10-1} 

</details>

### Faceting

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 

a. Create a scatterplot of `x` vs. `y` for each dataset in `datasaurus_dozen` using `facet_wrap()`.


```r
ggplot(data = datasaurus_dozen, aes(x = x, y = y)) +
  geom_point() +
  facet_wrap(~ dataset) +
  theme_minimal()
```


\includegraphics[width=1\linewidth]{class_activity_4_files/figure-latex/unnamed-chunk-11-1} 

</details>

### Variable Transformation

a. The scatterplot of the `dino` dataset without any transformations is given below.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
ggplot(data = dino_data, aes(x = x, y = y)) +
  geom_point() +
  theme_minimal() -> p1
```

</details>

b. Now, apply the square root transformation to both the `x` and `y` axes using the `scale_x_sqrt()` and `scale_y_sqrt()` functions in the `dino` dataset.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
ggplot(data = dino_data, aes(x = x, y = y)) +
  geom_point() +
  scale_x_sqrt() +
  scale_y_sqrt() +
  theme_minimal() -> p2
```

</details>

c. Finally, use `grid.arrange()` function from `gridExtra` package to plot the above two plots side-by-side. Which plot do you prefer and why?

<details>
<summary class="answer">Click for answer</summary>
*Answer:* The second plot is more revealing of a dinosaur than the first plot. 


```r
library(gridExtra)
grid.arrange(p1, p2, nrow = 1)
```


\includegraphics[width=1\linewidth]{class_activity_4_files/figure-latex/unnamed-chunk-14-1} 

</details>

### (Optional) Lne plot

a. Create a line plot of the `x` variable over the `y` variable for the `dino` dataset. To make it more interesting, let's first calculate the rolling mean of the `y` variable.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
dino_data <- dino_data %>%
  arrange(x) %>%
  mutate(rolling_mean_y = zoo::rollmean(y, k = 5, fill = NA))

# Line plot
ggplot(data = dino_data, aes(x = x, y = rolling_mean_y)) +
  geom_line(color = "blue") +
  theme_minimal()
```


\includegraphics[width=1\linewidth]{class_activity_4_files/figure-latex/unnamed-chunk-15-1} 

</details>

