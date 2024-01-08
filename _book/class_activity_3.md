# Class Activity 3



```r
# some interesting data objects
x <- c(3,6,9,5,10)
x.mat <- cbind(x, 2*x)
x.df <- data.frame(x=x,double.x=x*2)
my.list <- list(myVec=x, myDf=x.df, myString=c("hi","bye"))
```

## Question 1: data types

- What data type is `x`?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
typeof(x)
```

```
[1] "double"
```
</details>

- What data type is `c(x, x/2)`?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
typeof(c(x, x/2))
```

```
[1] "double"
```
</details>

- What data type is `c(x,NA)`?  What data type is `c(x,"NA")`?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
typeof(c(x, NA))
```

```
[1] "double"
```

```r
typeof(c(x, "NA"))
```

```
[1] "character"
```
</details>


## Question 2: Subsetting and coercion

- How can we reverse the order of entries in `x`?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
rev(x)
```

```
[1] 10  5  9  6  3
```

```r
x[length(x):1]
```

```
[1] 10  5  9  6  3
```
</details>

- What does `which(x < 5)` equal?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
which(x<5)
```

```
[1] 1
```
</details>


- Extract the element of x that corresponds to the location in the preceding question.

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
x[which(x<5)]
```

```
[1] 3
```
</details>



- What does `sum(c(TRUE,FALSE,TRUE,FALSE))` equal?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
sum(c(TRUE,FALSE,TRUE,FALSE))
```

```
[1] 2
```
</details>

- What does `sum(x[c(TRUE,FALSE,TRUE,FALSE)])` equal?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
sum(x[c(TRUE,FALSE,TRUE,FALSE, TRUE)])
```

```
[1] 22
```
</details>

- What does `sum(x < 5)` equal?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
sum(x < 5)
```

```
[1] 1
```
</details>

- What does `sum(x[x < 5])` equal?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
sum(x[x < 5])
```

```
[1] 3
```
</details>

- Why `dim(x.mat[1:2,1])` return `NULL` while `dim(x.mat[1:2,1:2])` returns a dimension?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
dim(x.mat[1:2,1])
```

```
NULL
```

```r
dim(x.mat[1:2,1:2])
```

```
[1] 2 2
```
</details>


## Question 3: Lists

- Using `my.list`, show three ways to write one command that gives the 3rd entry of variable `x` in data frame `myDf`

<!--

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
my.list[[1]][3]
```

```
[1] 9
```

```r
my.list[["myVec"]][3]
```

```
[1] 9
```

```r
my.list[1]$myVec[3]
```

```
[1] 9
```

```r
my.list$myVec[3]
```

```
[1] 9
```
</details>

-->

- What class of object does the command `my.list[3]` return?


<!--

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
class(my.list[3])
```

```
[1] "list"
```
</details>

-->

- What class of object does the command `my.list[[3]]` return?

<!--

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
class(my.list[[3]])
```

```
[1] "character"
```
</details>

-->


- What class of object does the command `unlist(my.list)` return? Why are all the entries `characters`?


<!--

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# code
class(unlist(my.list))
```

```
[1] "character"
```
</details>

-->
