# Class Activity 2

Let's practice some common data assignments and manipulations in R.

a. Create a vector of all integers from 4 to 10, and save it as `a1`. 

<details>
<summary class="answer">Click for answer</summary>

```r
a1 <- 4:10
a1
```

```
[1]  4  5  6  7  8  9 10
```
</details>



b. Create a vector of _even_ integers from 4 to 10, and save it as `a2`. 

<details>
<summary class="answer">Click for answer</summary>

```r
a2 <- seq(4, 10, by=2)
a2
```

```
[1]  4  6  8 10
```
</details>

c. What do you get when you add `a1` to `a2`? 

<details>
<summary class="answer">Click for answer</summary>

```r
a1_plus_a2 <- a1 + a2
a1_plus_a2
```

```
[1]  8 11 14 17 12 15 18
```

**Answer:** When you add `a1` to `a2`, you get a vector containing the element-wise sum: 8, 11, 14, 17, 12, 15, 18.
</details>

d. What does the command `sum(a1)` do?

<details>
<summary class="answer">Click for answer</summary>

```r
sum_a1 <- sum(a1)
sum_a1
```

```
[1] 49
```

**Answer:** The command `sum(a1)` calculates the sum of all elements in the vector `a1`. In this case, it returns 49.
</details>

e. What does the command `length(a1)` do?

<details>
<summary class="answer">Click for answer</summary>

```r
length_a1 <- length(a1)
length_a1
```

```
[1] 7
```

**Answer:** The command `length(a1)` returns the number of elements in the vector `a1`. In this case, there are 7 elements.
</details>

f. Use the `sum` and `length` commands to calculate the average of the values in `a1`.

<details>
<summary class="answer">Click for answer</summary>

```r
average_a1 <- sum(a1) / length(a1)
average_a1
```

```
[1] 7
```

**Answer:** The average of the values in `a1` is 7.
</details>

## Extras (Optional)

In this worksheet, you will learn how to use the `write_csv()` function from the `readr` package to save a data object from your R session to a file in your working directory.

First, let's load the necessary package.


```r
library(readr)
```

Suppose we have a simple data frame called `my_data`, with three columns: `Name`, `Age`, and `City`.


```r
my_data <- data.frame(Name = c("Alice", "Bob", "Charlie", "David"),
                      Age = c(25, 30, 22, 35),
                      City = c("New York", "Los Angeles", "Chicago", "San Francisco"))
my_data
```

```
     Name Age          City
1   Alice  25      New York
2     Bob  30   Los Angeles
3 Charlie  22       Chicago
4   David  35 San Francisco
```

Now we want to save this data frame as a CSV file in our working directory. To do this, we will use the `write_csv()` function. The first argument is the data object you want to save, and the second argument is the file name (including the .csv extension).


```r
write_csv(my_data, "my_data.csv")
```

This command will save `my_data` as a file called `my_data.csv` in your working directory.

**Question 1:** What is the purpose of the `write_csv()` function?

<details>
<summary class="answer">Click for answer</summary>
**Answer:** 

The `write_csv()` function is used to save a data object from an R session to a CSV file in your working directory.

</details>


**Question 2:** How do you save a data frame called `my_data` as a file named "example_data.csv"?


```r
# Your code here
```

<details>
<summary class="answer">Click for answer</summary>
**Answer:**


```r
write_csv(my_data, "example_data.csv")
```
</details>

**Question 3:** If you want to save a data frame called `students` as a file named "student_data.csv", what would be the appropriate command?


```r
# Your code here
```


<details>
<summary class="answer">Click for answer</summary>
**Answer:**


```r
write_csv(students, "student_data.csv")
```
</details>

