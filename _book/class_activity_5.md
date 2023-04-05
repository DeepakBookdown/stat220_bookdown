# Class Activity 5


```r
# Load the required libraries
library(tidyverse)
library(ggplot2)
library(ggthemes)
```




## Problem 1: Changing color and shape scales

In this problem, you will learn about the effects of changing colors, scales, and shapes in `ggplot2` for both gradient and discrete color choices. You will be given a series of questions and examples to enhance your understanding. Consider the following scatter plot


```r
# Generate sample data
set.seed(42)
data <- data.frame(
  Category = factor(sample(1:3, 50, replace = TRUE), labels = c("A", "B", "C")),
  X = 10 ^ rnorm(50, mean = 2, sd = 1),
  Y = rnorm(50, mean = 0, sd = 1)
)

p <- ggplot(data, aes(x = X, y = Y, color = Category)) +
  geom_point(size = 3)

p
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-2-1.png" width="100%" />

a. Modify the scatter plot to use custom colors for each category using `scale_color_manual()`. What is the effect of changing the colors on the plot's readability?

<details>
<summary class="answer">Click for answer</summary>
*Answer:* Changing colors using `scale_color_manual()` allows for better distinction between categories and enhances the plot's readability.


```r
p <- ggplot(data, aes(x = X, y = Y, color = Category)) +
  geom_point(size = 3) +
  scale_color_manual(values = c("A" = "red", "B" = "blue", "C" = "green"))
p
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-3-1.png" width="100%" />

</details>


b. Modify the scatter plot to use custom shapes for each category using `scale_shape_manual()`. What is the effect of changing the shapes on the plot's readability?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*  Changing the shapes using scale_shape_manual() helps to distinguish between categories and improves the plot's readability


```r
p <- ggplot(data, aes(x = X, y = Y, shape = Category)) +
  geom_point(size = 3) +
  scale_shape_manual(values = c("A" = 16, "B" = 17, "C" = 18))

p
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-4-1.png" width="100%" />

</details>

## Problem 2: US maps


Now, let's learn about the effect of changing various coordinate systems in `ggplot2` using a map example from the `usmap` package. We will explore the different types of coordinate systems available in ggplot2 and how they can be applied to the map visualization.


```r
#install.packages("usmap")   #uncomment to install
library(usmap)
```


### a. Plot a simple map of the United States using `ggplot2` and the `usmap` package.

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
us <- plot_usmap()
us
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-6-1.png" width="100%" />

</details>

### b. Apply the `coord_flip()` function to the map to flip the x and y axes.

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
us_flipped <- us + coord_flip()
us_flipped
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-7-1.png" width="100%" />

</details>


### c.  Apply the `coord_polar()` function to the map to transform the plot to a polar coordinate system

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
us_polar <- us + coord_polar()
us_polar
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-8-1.png" width="100%" />

</details>

### d. Apply the `coord_quickmap()` function to the map to provide an approximation for a map projection.

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
us_quickmap <- us + coord_quickmap()
us_quickmap
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-9-1.png" width="100%" />

</details>


## Problem 3: Chloropeth map

In today's class we created `cloropleth` maps of states in the US based on ACS data. 


```r
states <- map_data("state")
ACS <- ACS <- read.csv("https://raw.githubusercontent.com/deepbas/statdatasets/main/ACS.csv")
ACS <- dplyr::filter(ACS, !(region  %in% c("Alaska", "Hawaii"))) # only 48+D.C.
ACS$region <- tolower(ACS$region)  # lower case (match states regions)
```

### (a) Mapping median income

Create a `cloropleth` plot that uses color to create a `MedianIncome`  map of the US.

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# map median income
ggplot(data=ACS) + coord_map() + 
  geom_map(aes(map_id = region, fill = MedianIncome), map = states) +
  expand_limits(x=states$long, y=states$lat) + ggtitle("Median Income")
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-11-1.png" width="100%" />

</details>

### (b) Mapping deviations from national median income

The median income in the US in 2016 was estimated to be $27,000. Redraw your map in (a) to visualize each state's deviation from national median income. 

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# compare state income to national income
ggplot(data=ACS) + coord_map() + 
  geom_map(aes(map_id = region, fill = MedianIncome - 27000), map = states) +
  expand_limits(x=states$long, y=states$lat) + ggtitle("Deviation from national median income")
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-12-1.png" width="100%" />

</details>

### (c) Changing numerically scaled color

You should use a *diverging* color for (b) to highlight larger deviations from the national median. Add `scale_fill_distiller` to the map from (b) and select a diverging palette.   

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# change to a diverging color
ggplot(data=ACS) + coord_map() + 
  geom_map(aes(map_id = region, fill = MedianIncome - 27000), map = states) +
  expand_limits(x=states$long, y=states$lat) + ggtitle("Deviation from national median income") + 
  scale_fill_distiller(type = "div")
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-13-1.png" width="100%" />

</details>

### (d) Fixing a midpoint on a diverging scale

Use `scale_fill_gradient2` to fix a midpoint scale value at white color, with diverging colors for larger positive and negative values. Apply these colors to your map in (b) and fix the `midpoint` at an appropriate value. 

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# change to a gradient fill color
ggplot(data=ACS) + coord_map() + 
  geom_map(aes(map_id = region, fill = MedianIncome - 27000), map = states) +
  expand_limits(x=states$long, y=states$lat) + ggtitle("Deviation from national median income") + 
  scale_fill_gradient2(
    low = "lightblue",    # Set the low color to red
    mid = "white", # Set the mid color to yellow
    high = "maroon", # Set the high color to green
    midpoint = 0
  )
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-14-1.png" width="100%" />


</details>

## (Optional) 

Let's learn how to create a polar bar plot with custom colors.



```r
data <- data.frame(
  Category = factor(1:12, labels = month.abb),
  Value = c(30, 28, 50, 45, 60, 75, 80, 77, 60, 48, 32, 20)
)
```


<details>
<summary class="answer">Click for answer</summary>

```r
p <- ggplot(data, aes(x = Category, y = Value, fill = Category)) +
  geom_bar(stat = "identity", width = 1) +
  coord_polar(theta = "y") +
  scale_fill_brewer(palette = "Set3") +
  labs(title = "Polar Bar Plot Example", x = "Month", y = "Value")
p
```

<img src="class_activity_5_files/figure-epub3/unnamed-chunk-16-1.png" width="100%" />


</details>
