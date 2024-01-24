# Class Activity 9


```r
# load the necessary libraries
library(tidyverse)
```


## Your Turn 1

### a) `read_csv()`

Use `read_csv()` to import the `desserts` data set from https://raw.githubusercontent.com/deepbas/statdatasets/main/desserts.csv. Use `glimpse` to see if the data import is alright.


```r
url <- "https://raw.githubusercontent.com/deepbas/statdatasets/main/desserts.csv"
desserts <- read_csv(url)
glimpse(desserts)
```

```
Rows: 549
Columns: 16
$ series                <dbl> 1, 1, 1, 1, 1, 1, 1, 1, 1, 1…
$ episode               <dbl> 1, 1, 1, 1, 1, 1, 1, 1, 1, 1…
$ baker                 <chr> "Annetha", "David", "Edd", "…
$ technical             <chr> "2nd", "3rd", "1st", "N/A", …
$ result                <chr> "IN", "IN", "IN", "IN", "IN"…
$ uk_airdate            <chr> "17 August 2010", "17 August…
$ us_season             <dbl> NA, NA, NA, NA, NA, NA, NA, …
$ us_airdate            <date> NA, NA, NA, NA, NA, NA, NA,…
$ showstopper_chocolate <chr> "chocolate", "chocolate", "n…
$ showstopper_dessert   <chr> "other", "other", "other", "…
$ showstopper_fruit     <chr> "no fruit", "no fruit", "no …
$ showstopper_nut       <chr> "no nut", "no nut", "no nut"…
$ signature_chocolate   <chr> "no chocolate", "chocolate",…
$ signature_dessert     <chr> "cake", "cake", "cake", "cak…
$ signature_fruit       <chr> "no fruit", "fruit", "fruit"…
$ signature_nut         <chr> "no nut", "no nut", "no nut"…
```

### b) Are there any issues with the data import? If so, what are they?

<details>
<summary class="answer">Click for answer</summary>

*Answer:* Based on the output of glimpse, we can see that the 'technical' column should be a numeric column and the 'uk_airdate' column should be a date column. We can also identify any issues with missing values.



```r
# your r-code

desserts <- read_csv(url,
  col_types = list(
    technical = col_number(),
    uk_airdate = col_date()
  )
)

problems(desserts)
```

```
# A tibble: 556 × 5
     row   col expected        actual         file 
   <int> <int> <chr>           <chr>          <chr>
 1     2     6 date in ISO8601 17 August 2010 ""   
 2     3     6 date in ISO8601 17 August 2010 ""   
 3     4     6 date in ISO8601 17 August 2010 ""   
 4     5     4 a number        N/A            ""   
 5     5     6 date in ISO8601 17 August 2010 ""   
 6     6     6 date in ISO8601 17 August 2010 ""   
 7     7     4 a number        N/A            ""   
 8     7     6 date in ISO8601 17 August 2010 ""   
 9     8     6 date in ISO8601 17 August 2010 ""   
10     9     4 a number        N/A            ""   
# ℹ 546 more rows
```

</details>


### c) Import the dataset with correct data types, if needed. Fix the problems, if any.

<details>
<summary class="answer">Click for answer</summary>


```r
desserts <- read_csv(url,
  col_types = list(
    technical = col_number(),
    uk_airdate = col_date()
  )
)

problems(desserts)
```

```
# A tibble: 556 × 5
     row   col expected        actual         file 
   <int> <int> <chr>           <chr>          <chr>
 1     2     6 date in ISO8601 17 August 2010 ""   
 2     3     6 date in ISO8601 17 August 2010 ""   
 3     4     6 date in ISO8601 17 August 2010 ""   
 4     5     4 a number        N/A            ""   
 5     5     6 date in ISO8601 17 August 2010 ""   
 6     6     6 date in ISO8601 17 August 2010 ""   
 7     7     4 a number        N/A            ""   
 8     7     6 date in ISO8601 17 August 2010 ""   
 9     8     6 date in ISO8601 17 August 2010 ""   
10     9     4 a number        N/A            ""   
# ℹ 546 more rows
```




```r
desserts <- read_csv(url,
    col_types = list(
    technical = col_number(), 
    uk_airdate = col_date(format = "%d %B %Y")
  ) 
)

problems(desserts)
```

```
# A tibble: 7 × 5
    row   col expected actual file 
  <int> <int> <chr>    <chr>  <chr>
1     5     4 a number N/A    ""   
2     7     4 a number N/A    ""   
3     9     4 a number N/A    ""   
4    11     4 a number N/A    ""   
5    35     4 a number N/A    ""   
6    36     4 a number N/A    ""   
7    37     4 a number N/A    ""   
```




```r
desserts <- read_csv(url,
  col_types = list(
    technical = col_number(), 
    uk_airdate = col_date(format = "%d %B %Y")
  ),
  na = c("", "NA", "N/A")
)

problems(desserts)
```

```
# A tibble: 0 × 5
# ℹ 5 variables: row <int>, col <int>, expected <chr>,
#   actual <chr>, file <chr>
```

</details>


## Your Turn 2

Use the appropriate `read_<type>()` function to import the following data sets:

- `https://deepbas.io/data/simple-1.dat`

- `https://deepbas.io/data/mild-1.csv`

- `https://deepbas.io/data/tricky-1.csv`

- `https://deepbas.io/data/tricky-2.csv`


Identify and fix any issues you encounter.

### a)  Importing simple data:

<details>
<summary class="answer">Click for answer</summary>


```r
simple1 <- readr::read_csv("https://deepbas.io/data/simple-1.dat")
problems(simple1)
```

```
# A tibble: 0 × 5
# ℹ 5 variables: row <int>, col <int>, expected <chr>,
#   actual <chr>, file <chr>
```

</details>

### b) Importing mildly tricky data:

<details>
<summary class="answer">Click for answer</summary>


```r
mild1 <- readr::read_delim("https://deepbas.io/data/mild-1.csv", delim = "|")
problems(mild1)
```

```
# A tibble: 0 × 5
# ℹ 5 variables: row <int>, col <int>, expected <chr>,
#   actual <chr>, file <chr>
```

</details>

### c) Importing tricky data 1:

<details>
<summary class="answer">Click for answer</summary>


```r
tricky1 <-  read_csv("https://deepbas.io/data/tricky-1.csv")
problems(tricky1)
```

```
# A tibble: 2 × 5
    row   col expected  actual    file 
  <int> <int> <chr>     <chr>     <chr>
1     4     4 5 columns 4 columns ""   
2     7     4 5 columns 4 columns ""   
```

```r
# Fix missing values
tricky1[3, ] <- c(tricky1[3, 1:2], NA, tricky1[3, 3:4])
tricky1[6, ] <- c(tricky1[4, 1], NA, tricky1[4, 3:5])
```

</details>


### d) Importing tricky data 2:

<details>
<summary class="answer">Click for answer</summary>



```r
tricky2 <- read_csv("https://deepbas.io/data/tricky-2.csv")
problems(tricky2)
```

```
# A tibble: 0 × 5
# ℹ 5 variables: row <int>, col <int>, expected <chr>,
#   actual <chr>, file <chr>
```

```r
# Fix missing values
tricky2_part1 <- read_csv("https://deepbas.io/data/tricky-2.csv", n_max = 7) %>%
  separate(city, c("city", "state"), sep = ",") %>%
  select(-c(7))

tricky2_part2 <- read_csv(
  "https://deepbas.io/data/tricky-2.csv",
  skip = 8, 
  col_names = c("iata", "airport", "city", "state",  "latitude", "longitude")
)

# Combine parts
data_combined <- full_join(tricky2_part1, tricky2_part2)
```



</details>
