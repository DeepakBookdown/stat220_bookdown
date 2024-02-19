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
# A tibble: 24 x 5
      id grade region        score grade_fac
   <int> <chr> <chr>         <dbl> <fct>    
 1     4 9th   Asia             68 9th      
 2     5 9th   North America    79 9th      
 3     6 9th   South America    85 9th      
 4     7 9th   Europe           56 9th      
 5    12 9th   Asia             96 9th      
 6    14 9th   Asia             75 9th      
 7    18 9th   Asia             97 9th      
 8    19 9th   South America    92 9th      
 9    20 9th   Europe           62 9th      
10     3 10th  Asia             96 10th     
11     9 10th  South America    91 10th     
12    13 10th  South America   100 10th     
13    16 10th  Africa           59 10th     
14    23 10th  North America    74 10th     
15     1 11th  Middle East      87 11th     
16     2 11th  Asia             58 11th     
17     8 11th  Africa           73 11th     
18    10 11th  Europe           98 11th     
19    11 11th  Asia             70 11th     
20    15 11th  Europe           89 11th     
21    17 11th  South America    74 11th     
22    21 11th  North America    94 11th     
23    22 11th  Africa           81 11th     
24    24 11th  Asia             89 11th     
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
# A tibble: 3 x 2
  region_collapsed     n
  <fct>            <int>
1 EMEA                 8
2 Asia                 8
3 Americas             8
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
# A tibble: 2 x 2
  grade_lumped     n
  <fct>        <int>
1 11th            10
2 Others          14
```

</details>


## Your Turn 2

Lets import the `gss_cat` dataset from the `forcats` library. This datast contains a sample of categorical variables from the General Social survey.


```r
# import gss_cat dataset from forcats library
forcats::gss_cat
```

```
# A tibble: 21,483 x 9
    year marital       age race  rincome partyid relig denom
   <int> <fct>       <int> <fct> <fct>   <fct>   <fct> <fct>
 1  2000 Never marr~    26 White $8000 ~ Ind,ne~ Prot~ Sout~
 2  2000 Divorced       48 White $8000 ~ Not st~ Prot~ Bapt~
 3  2000 Widowed        67 White Not ap~ Indepe~ Prot~ No d~
 4  2000 Never marr~    39 White Not ap~ Ind,ne~ Orth~ Not ~
 5  2000 Divorced       25 White Not ap~ Not st~ None  Not ~
 6  2000 Married        25 White $20000~ Strong~ Prot~ Sout~
 7  2000 Never marr~    36 White $25000~ Not st~ Chri~ Not ~
 8  2000 Divorced       44 White $7000 ~ Ind,ne~ Prot~ Luth~
 9  2000 Married        44 White $25000~ Not st~ Prot~ Other
10  2000 Married        47 White $25000~ Strong~ Prot~ Sout~
# i 21,473 more rows
# i 1 more variable: tvhours <int>
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


\includegraphics[width=1\linewidth]{class_activity_10_files/figure-latex/unnamed-chunk-8-1} 

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


\includegraphics[width=1\linewidth]{class_activity_10_files/figure-latex/unnamed-chunk-9-1} 

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

