# Class Activity 10


```r
# load the necessary libraries
library(tidyverse)
library(tidyr)
```

## Your Turn 1



```r
students <- tibble(
  id = 1:24,
  grade = sample(c("9th", "10th", "11th"), 24, replace = TRUE),
  region = sample(c("North America", "Europe", "Asia", "South America", "Middle East", "Africa"), 24, replace = TRUE),
  score = round(runif(24,50, 100))
)
```


### a. Create a new column `grade_fac` by converting the grade column into a factor. Reorder the levels of `grade_fac` to be "9th", "10th", and "11th". Sort the dataset based on the `grade_fac` column.

<details>
<summary class="answer">Click for answer</summary>

*Answer:* 


```r
students_a <- students %>%
  mutate(grade_fac = factor(grade)) %>%
  mutate(grade_fac = fct_relevel(grade_fac, c("9th", "10th", "11th"))) %>%
  arrange(grade_fac) 
print(students_a, n = 24)
```

```
# A tibble: 24 × 5
      id grade region        score grade_fac
   <int> <chr> <chr>         <dbl> <fct>    
 1     5 9th   Europe           95 9th      
 2     7 9th   Asia             59 9th      
 3    12 9th   Middle East      89 9th      
 4    15 9th   Middle East      58 9th      
 5    16 9th   Asia             71 9th      
 6    20 9th   North America    56 9th      
 7    22 9th   South America    84 9th      
 8    24 9th   South America    84 9th      
 9     6 10th  Africa           97 10th     
10     8 10th  Europe           57 10th     
11     9 10th  Europe           70 10th     
12    11 10th  North America    67 10th     
13    13 10th  Asia             74 10th     
14    17 10th  South America    71 10th     
15    18 10th  Asia             93 10th     
16    21 10th  South America    95 10th     
17     1 11th  South America    51 11th     
18     2 11th  Asia             51 11th     
19     3 11th  South America    72 11th     
20     4 11th  South America    81 11th     
21    10 11th  Europe           70 11th     
22    14 11th  Africa           94 11th     
23    19 11th  North America    86 11th     
24    23 11th  Asia             55 11th     
```

</details>


### b. Create a new column `region_fac` by converting the `region` column into a factor. Collapse the `region_fac` levels into three categories: "Americas", "EMEA" and "Asia". Count the number of students in each collapsed region category.

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
students_b <- students_a %>%
  mutate(region_fac = factor(region)) %>%
  mutate(region_collapsed = fct_collapse(region_fac, 
                                         Americas = c("North America", "South America"), 
                                         EMEA = c("Europe", "Middle East", "Africa"), 
                                         Asia = "Asia")) %>%
  count(region_collapsed)
print(students_b)
```

```
# A tibble: 3 × 2
  region_collapsed     n
  <fct>            <int>
1 EMEA                 8
2 Asia                 6
3 Americas            10
```

</details>


### c. Create a new column `grade_infreq` that is a copy of the `grade_fac` column. Reorder the levels of `grade_infreq` based on their frequency in the dataset. Print the levels of `grade_infreq` to check the ordering.

<details>
<summary class="answer">Click for answer</summary>
*Answer:*

```r
students_c <- students_a %>%
  mutate(grade_infreq = grade_fac) %>%
  mutate(grade_infreq = fct_infreq(grade_infreq))

levels(students_c$grade_infreq)
```

```
[1] "9th"  "10th" "11th"
```

</details>


### d. Create a new column `grade_lumped` by lumping the least frequent level of the `grade_fac` column into an 'Others' category. Count the number of students in each of the categories of the `grade_lumped` column.

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
students_d <- students_a %>%
  mutate(grade_lumped = fct_lump(grade_fac, n = 1, other_level = "Others")) %>%
  count(grade_lumped)
students_d
```

```
# A tibble: 3 × 2
  grade_lumped     n
  <fct>        <int>
1 9th              8
2 10th             8
3 11th             8
```

</details>

## Your Turn 2

Lets import the `gss_cat` dataset from the `forcats` library. This datast contains a sample of categorical variables from the General Social survey.


```r
# import gss_cat dataset from forcats library
forcats::gss_cat
```

```
# A tibble: 21,483 × 9
    year marital       age race  rincome partyid relig denom
   <int> <fct>       <int> <fct> <fct>   <fct>   <fct> <fct>
 1  2000 Never marr…    26 White $8000 … Ind,ne… Prot… Sout…
 2  2000 Divorced       48 White $8000 … Not st… Prot… Bapt…
 3  2000 Widowed        67 White Not ap… Indepe… Prot… No d…
 4  2000 Never marr…    39 White Not ap… Ind,ne… Orth… Not …
 5  2000 Divorced       25 White Not ap… Not st… None  Not …
 6  2000 Married        25 White $20000… Strong… Prot… Sout…
 7  2000 Never marr…    36 White $25000… Not st… Chri… Not …
 8  2000 Divorced       44 White $7000 … Ind,ne… Prot… Luth…
 9  2000 Married        44 White $25000… Not st… Prot… Other
10  2000 Married        47 White $25000… Strong… Prot… Sout…
# … with 21,473 more rows, and 1 more variable:
#   tvhours <int>
```

Use `gss_cat` to answer the following questions.

### a. Which religions watch the least TV?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*

```r
# your r-code
gss_cat %>%
  drop_na(tvhours) %>%
  group_by(relig) %>%
  summarize(tvhours = mean(tvhours)) %>%
  ggplot(aes(tvhours, fct_reorder(relig, tvhours))) +
    geom_point()
```

<img src="class_activity_10_files/figure-epub3/unnamed-chunk-8-1.png" width="100%" />

</details>


### b. Do married people watch more or less TV than single people?

<details>
<summary class="answer">Click for answer</summary>
*Answer:*

```r
# your r-code
gss_cat %>%
  drop_na(tvhours) %>%
  group_by(marital) %>%
  summarize(tvhours = mean(tvhours)) %>%
  ggplot(aes(tvhours, fct_reorder(marital, tvhours))) +
    geom_point()
```

<img src="class_activity_10_files/figure-epub3/unnamed-chunk-9-1.png" width="100%" />

</details>


### c. Collapse the `marital` variable to have levels `married`, `not_married`, and `no_answer`. Include `"Never married"`, `"Divorced"`, and "`Widowed"` in `not_married`

<details>
<summary class="answer">Click for answer</summary>
*Answer:*


```r
# your r-code
gss_cat %>%
  drop_na(tvhours) %>%
  select(marital, tvhours) %>%
  mutate(
    maritalStatus =
      fct_collapse(
        marital,
        married = c("Married",
                    "Separated"),
        not_married = c("Never married",
                        "Divorced",
                        "Widowed"),
        no_answer = c("No answer")) 
  ) -> marital_c

levels(marital_c$maritalStatus)
```

```
[1] "no_answer"   "not_married" "married"    
```

</details>

