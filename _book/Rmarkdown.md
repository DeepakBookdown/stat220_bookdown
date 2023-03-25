# R Markdown

This is a R Markdown document. Markdown is a simple formatting syntax for authoring HTML, PDF, and MS Word documents. For more details on using R Markdown see <http://rmarkdown.rstudio.com>.

You can use asterisk mark to provide emphasis, such as `*italics* or **bold**`.

You can create lists with a dash:

```r
- Item 1
- Item 2
- Item 3
  + Subitem 1
* Item 4
```

- Item 1
- Item 2
- Item 3
  + Subitem 1
* Item 4


You can embed Latex equations in-line, $\frac{1}{n} \sum_{i=1}^{n} x_{i}$ or in a new line as

$$\text{Var}(X) = \frac{1}{n-1}\sum_{i-1}^{n} (x_{i} - \bar{x})^2 $$
## Embed an R code chunk:

Use

````
```r
Use back ticks to 
create a block of code
```
````

to produce:

```
Use back ticks to 
create a block of code
```

You can also evaluate and display the results of R code. Each tasks can be accomplished in a suitably labeled chunk like the following:


```r
summary(cars)
#>      speed           dist       
#>  Min.   : 4.0   Min.   :  2.00  
#>  1st Qu.:12.0   1st Qu.: 26.00  
#>  Median :15.0   Median : 36.00  
#>  Mean   :15.4   Mean   : 42.98  
#>  3rd Qu.:19.0   3rd Qu.: 56.00  
#>  Max.   :25.0   Max.   :120.00
fit <- lm(dist ~ speed, data = cars)
fit
#> 
#> Call:
#> lm(formula = dist ~ speed, data = cars)
#> 
#> Coefficients:
#> (Intercept)        speed  
#>     -17.579        3.932
```


## Including Plots

You can also embed plots. See Figure \@ref(fig:pie) for example:


```r
par(mar = c(0, 1, 0, 1))
pie(
  c(280, 60, 20),
  c('Sky', 'Sunny side of pyramid', 'Shady side of pyramid'),
  col = c('#0292D8', '#F7EA39', '#C4B632'),
  init.angle = -50, border = NA
)
```

<div class="figure">
<img src="Rmarkdown_files/figure-epub3/pie-1.png" alt="A fancy pie chart."  />
<p class="caption">(\#fig:pie)A fancy pie chart.</p>
</div>

(Credit: Yihui Xie)

## Read in data files


```r
simple_data <- read.csv("https://deepbas.io/data/simple-1.dat", )
summary(simple_data) 
#>    initials            state                age      
#>  Length:3           Length:3           Min.   :45.0  
#>  Class :character   Class :character   1st Qu.:47.5  
#>  Mode  :character   Mode  :character   Median :50.0  
#>                                        Mean   :52.0  
#>                                        3rd Qu.:55.5  
#>                                        Max.   :61.0  
#>      time          
#>  Length:3          
#>  Class :character  
#>  Mode  :character  
#>                    
#>                    
#> 
```



```r
knitr::kable(simple_data)
```



|initials |state | age|time |
|:--------|:-----|---:|:----|
|vib      |MA    |  61|6:01 |
|adc      |TX    |  45|5:45 |
|kme      |CT    |  50|4:19 |

## Hide the code

If we enter the `echo = FALSE` option in the R chunk (see the .Rmd file). This prevents the R code from being printed to your document; you just see the results.



|initials |state | age|time |
|:--------|:-----|---:|:----|
|vib      |MA    |  61|6:01 |
|adc      |TX    |  45|5:45 |
|kme      |CT    |  50|4:19 |

