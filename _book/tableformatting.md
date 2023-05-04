# Table Formatting

In this worksheet, we will explore various options for outputting and formatting tables in R using the RMarkdown environment.

### Basic Table Formatting with `kable`

The `kable()` function from the knitr package provides a simple way to output tables in RMarkdown.


```r
library(knitr)
kable(mtcars[1:5, 1:5], caption = "A basic table using kable")
```



Table: (\#tab:unnamed-chunk-1)A basic table using kable

|                  |  mpg| cyl| disp|  hp| drat|
|:-----------------|----:|---:|----:|---:|----:|
|Mazda RX4         | 21.0|   6|  160| 110| 3.90|
|Mazda RX4 Wag     | 21.0|   6|  160| 110| 3.90|
|Datsun 710        | 22.8|   4|  108|  93| 3.85|
|Hornet 4 Drive    | 21.4|   6|  258| 110| 3.08|
|Hornet Sportabout | 18.7|   8|  360| 175| 3.15|

We will also use the `Gapminder` dataset for our examples. This dataset contains information about life expectancy, GDP per capita, and population size for various countries and years.Here's an example of how to display the first 10 rows of the `Gapminder` dataset.


```r
data("gapminder", package = "gapminder")
knitr::kable(head(gapminder, 10), caption = "First 10 rows of the Gapminder dataset.")
```



Table: (\#tab:unnamed-chunk-2)First 10 rows of the Gapminder dataset.

|country     |continent | year| lifeExp|      pop| gdpPercap|
|:-----------|:---------|----:|-------:|--------:|---------:|
|Afghanistan |Asia      | 1952|  28.801|  8425333|  779.4453|
|Afghanistan |Asia      | 1957|  30.332|  9240934|  820.8530|
|Afghanistan |Asia      | 1962|  31.997| 10267083|  853.1007|
|Afghanistan |Asia      | 1967|  34.020| 11537966|  836.1971|
|Afghanistan |Asia      | 1972|  36.088| 13079460|  739.9811|
|Afghanistan |Asia      | 1977|  38.438| 14880372|  786.1134|
|Afghanistan |Asia      | 1982|  39.854| 12881816|  978.0114|
|Afghanistan |Asia      | 1987|  40.822| 13867957|  852.3959|
|Afghanistan |Asia      | 1992|  41.674| 16317921|  649.3414|
|Afghanistan |Asia      | 1997|  41.763| 22227415|  635.3414|

### Formatting Tables with `kableExtra`

To further customize the table appearance, we can use the `kableExtra` package.


```r
#install.packages("kableExtra") 
library(kableExtra)
kable(mtcars[1:5, 1:5], caption = "A formatted table with kableExtra") %>%
  kable_styling("striped", full_width = F)
```

<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto;">
<caption>(\#tab:unnamed-chunk-3)A formatted table with kableExtra</caption>
 <thead>
  <tr>
   <th style="text-align:left;">   </th>
   <th style="text-align:right;"> mpg </th>
   <th style="text-align:right;"> cyl </th>
   <th style="text-align:right;"> disp </th>
   <th style="text-align:right;"> hp </th>
   <th style="text-align:right;"> drat </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> Mazda RX4 </td>
   <td style="text-align:right;"> 21.0 </td>
   <td style="text-align:right;"> 6 </td>
   <td style="text-align:right;"> 160 </td>
   <td style="text-align:right;"> 110 </td>
   <td style="text-align:right;"> 3.90 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Mazda RX4 Wag </td>
   <td style="text-align:right;"> 21.0 </td>
   <td style="text-align:right;"> 6 </td>
   <td style="text-align:right;"> 160 </td>
   <td style="text-align:right;"> 110 </td>
   <td style="text-align:right;"> 3.90 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Datsun 710 </td>
   <td style="text-align:right;"> 22.8 </td>
   <td style="text-align:right;"> 4 </td>
   <td style="text-align:right;"> 108 </td>
   <td style="text-align:right;"> 93 </td>
   <td style="text-align:right;"> 3.85 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Hornet 4 Drive </td>
   <td style="text-align:right;"> 21.4 </td>
   <td style="text-align:right;"> 6 </td>
   <td style="text-align:right;"> 258 </td>
   <td style="text-align:right;"> 110 </td>
   <td style="text-align:right;"> 3.08 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Hornet Sportabout </td>
   <td style="text-align:right;"> 18.7 </td>
   <td style="text-align:right;"> 8 </td>
   <td style="text-align:right;"> 360 </td>
   <td style="text-align:right;"> 175 </td>
   <td style="text-align:right;"> 3.15 </td>
  </tr>
</tbody>
</table>


### Customizing column formats

Use the `column_spec()` function from the `kableExtra` package to customize the appearance of individual columns.


```r
gapminder %>%
  head(10) %>%
  knitr::kable(caption = "Table 3: First 10 rows of the Gapminder dataset with custom column formatting.") %>%
  kableExtra::kable_styling("striped", full_width = F) %>%
  kableExtra::column_spec(2, bold = TRUE, color = "red") %>%
  kableExtra::column_spec(4, monospace = TRUE)
```

<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto;">
<caption>(\#tab:unnamed-chunk-4)Table 3: First 10 rows of the Gapminder dataset with custom column formatting.</caption>
 <thead>
  <tr>
   <th style="text-align:left;"> country </th>
   <th style="text-align:left;"> continent </th>
   <th style="text-align:right;"> year </th>
   <th style="text-align:right;"> lifeExp </th>
   <th style="text-align:right;"> pop </th>
   <th style="text-align:right;"> gdpPercap </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> Afghanistan </td>
   <td style="text-align:left;font-weight: bold;color: red !important;"> Asia </td>
   <td style="text-align:right;"> 1952 </td>
   <td style="text-align:right;font-family: monospace;"> 28.801 </td>
   <td style="text-align:right;"> 8425333 </td>
   <td style="text-align:right;"> 779.4453 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Afghanistan </td>
   <td style="text-align:left;font-weight: bold;color: red !important;"> Asia </td>
   <td style="text-align:right;"> 1957 </td>
   <td style="text-align:right;font-family: monospace;"> 30.332 </td>
   <td style="text-align:right;"> 9240934 </td>
   <td style="text-align:right;"> 820.8530 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Afghanistan </td>
   <td style="text-align:left;font-weight: bold;color: red !important;"> Asia </td>
   <td style="text-align:right;"> 1962 </td>
   <td style="text-align:right;font-family: monospace;"> 31.997 </td>
   <td style="text-align:right;"> 10267083 </td>
   <td style="text-align:right;"> 853.1007 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Afghanistan </td>
   <td style="text-align:left;font-weight: bold;color: red !important;"> Asia </td>
   <td style="text-align:right;"> 1967 </td>
   <td style="text-align:right;font-family: monospace;"> 34.020 </td>
   <td style="text-align:right;"> 11537966 </td>
   <td style="text-align:right;"> 836.1971 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Afghanistan </td>
   <td style="text-align:left;font-weight: bold;color: red !important;"> Asia </td>
   <td style="text-align:right;"> 1972 </td>
   <td style="text-align:right;font-family: monospace;"> 36.088 </td>
   <td style="text-align:right;"> 13079460 </td>
   <td style="text-align:right;"> 739.9811 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Afghanistan </td>
   <td style="text-align:left;font-weight: bold;color: red !important;"> Asia </td>
   <td style="text-align:right;"> 1977 </td>
   <td style="text-align:right;font-family: monospace;"> 38.438 </td>
   <td style="text-align:right;"> 14880372 </td>
   <td style="text-align:right;"> 786.1134 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Afghanistan </td>
   <td style="text-align:left;font-weight: bold;color: red !important;"> Asia </td>
   <td style="text-align:right;"> 1982 </td>
   <td style="text-align:right;font-family: monospace;"> 39.854 </td>
   <td style="text-align:right;"> 12881816 </td>
   <td style="text-align:right;"> 978.0114 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Afghanistan </td>
   <td style="text-align:left;font-weight: bold;color: red !important;"> Asia </td>
   <td style="text-align:right;"> 1987 </td>
   <td style="text-align:right;font-family: monospace;"> 40.822 </td>
   <td style="text-align:right;"> 13867957 </td>
   <td style="text-align:right;"> 852.3959 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Afghanistan </td>
   <td style="text-align:left;font-weight: bold;color: red !important;"> Asia </td>
   <td style="text-align:right;"> 1992 </td>
   <td style="text-align:right;font-family: monospace;"> 41.674 </td>
   <td style="text-align:right;"> 16317921 </td>
   <td style="text-align:right;"> 649.3414 </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Afghanistan </td>
   <td style="text-align:left;font-weight: bold;color: red !important;"> Asia </td>
   <td style="text-align:right;"> 1997 </td>
   <td style="text-align:right;font-family: monospace;"> 41.763 </td>
   <td style="text-align:right;"> 22227415 </td>
   <td style="text-align:right;"> 635.3414 </td>
  </tr>
</tbody>
</table>


### Formatting Tables with flextable

Another option for table formatting is the flextable package.


```r
#install.packages("flextable")
library(flextable)
ft <- flextable(mtcars[1:5, 1:5])
ft <- set_caption(ft, caption = "A table using flextable")
ft
```


### Formatting Tables with gt

The gt package provides another way to create formatted tables in R.


```r
#install.packages("gt")
library(gt)
gt(mtcars[1:5, 1:5]) %>%
  tab_header(title = "A table using gt")
```



### Hiding R commands and R output

As mentioned in the graph formatting handout, adding the chunk option echo=FALSE will display output (like graphs) produced by a chunk but not show the commands used in the chunk. You can stop both R commands and output from being displayed in a document by adding the chunk option include=FALSE.

As you work through a report analysis, you may initially want to see all of your R results as you are writing your report. But after you've summarized results in paragraphs or in tables, you can then use the include=FALSE argument to hide your R commands and output in your final document. If you ever need to rerun or reevaluate your R work for a report, you can easily recreate and edit your analysis since the R chunks used in your original report are still in your R Markdown .Rmd file.



### Summary statistics with pander

We can use the pander package to create summary tables.


```r
#install.packages("pander")
library(pander)
pander(summary(mtcars$mpg), caption = "Summary statistics for miles per gallon")
```


### t-test results with pander

Let's perform a t-test comparing the miles per gallon (mpg) for cars with 4 and 6 cylinders.


```r
t_test_result <- t.test(mpg ~ as.factor(cyl), data = mtcars, subset = cyl %in% c(4, 6))
pander(t_test_result, caption = "Comparing MPG for 4 and 6 cylinder cars")
```

### Chi-square test results with pander
Now let's perform a chi-square test to check for an association between the number of cylinders and the type of transmission (automatic or manual).


```r
my_table <- table(mtcars$cyl, mtcars$am)
chisq_test_result <- chisq.test(my_table)
pander(chisq_test_result, caption = "Chi-square test for cylinders and transmission type")
```

### Linear regression results with pander
Finally, let's fit a linear regression model of miles per gallon (mpg) as a function of weight (wt) and display the results.


```r
lm_result <- lm(mpg ~ wt, data = mtcars)
pander(lm_result, caption = "Linear regression of MPG on weight")
```

