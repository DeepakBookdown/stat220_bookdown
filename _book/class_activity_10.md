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
 1     5 9th   Europe           78 9th      
 2    10 9th   Asia             61 9th      
 3    15 9th   South America    80 9th      
 4    16 9th   Middle East      70 9th      
 5    17 9th   North America    87 9th      
 6    23 9th   Europe           65 9th      
 7    24 9th   North America    97 9th      
 8     4 10th  Middle East      69 10th     
 9     7 10th  Middle East      85 10th     
10    12 10th  Africa           73 10th     
11    19 10th  Middle East      76 10th     
12     1 11th  Middle East      78 11th     
13     2 11th  Middle East      77 11th     
14     3 11th  Africa           80 11th     
15     6 11th  Europe           66 11th     
16     8 11th  Africa           90 11th     
17     9 11th  Europe           91 11th     
18    11 11th  Middle East      82 11th     
19    13 11th  Middle East      67 11th     
20    14 11th  Middle East      69 11th     
21    18 11th  Middle East      68 11th     
22    20 11th  Middle East      88 11th     
23    21 11th  Middle East      98 11th     
24    22 11th  Africa           79 11th     
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
1 EMEA                20
2 Asia                 1
3 Americas             3
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
[1] "11th" "9th"  "10th"
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
# A tibble: 2 × 2
  grade_lumped     n
  <fct>        <int>
1 11th            13
2 Others          11
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
# ℹ 21,473 more rows
# ℹ 1 more variable: tvhours <int>
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

