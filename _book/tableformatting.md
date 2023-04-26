# Table Formatting

In this worksheet, we will explore various options for outputting and formatting tables in R using the RMarkdown environment.

### Basic Table Formatting with `kable`

The `kable()` function from the knitr package provides a simple way to output tables in RMarkdown.


```r
library(knitr)
kable(mtcars[1:5, 1:5], caption = "A basic table using kable")
```

\begin{table}

\caption{(\#tab:unnamed-chunk-1)A basic table using kable}
\centering
\begin{tabular}[t]{l|r|r|r|r|r}
\hline
  & mpg & cyl & disp & hp & drat\\
\hline
Mazda RX4 & 21.0 & 6 & 160 & 110 & 3.90\\
\hline
Mazda RX4 Wag & 21.0 & 6 & 160 & 110 & 3.90\\
\hline
Datsun 710 & 22.8 & 4 & 108 & 93 & 3.85\\
\hline
Hornet 4 Drive & 21.4 & 6 & 258 & 110 & 3.08\\
\hline
Hornet Sportabout & 18.7 & 8 & 360 & 175 & 3.15\\
\hline
\end{tabular}
\end{table}

We will also use the `Gapminder` dataset for our examples. This dataset contains information about life expectancy, GDP per capita, and population size for various countries and years.Here's an example of how to display the first 10 rows of the `Gapminder` dataset.


```r
data("gapminder", package = "gapminder")
knitr::kable(head(gapminder, 10), caption = "First 10 rows of the Gapminder dataset.")
```

\begin{table}

\caption{(\#tab:unnamed-chunk-2)First 10 rows of the Gapminder dataset.}
\centering
\begin{tabular}[t]{l|l|r|r|r|r}
\hline
country & continent & year & lifeExp & pop & gdpPercap\\
\hline
Afghanistan & Asia & 1952 & 28.801 & 8425333 & 779.4453\\
\hline
Afghanistan & Asia & 1957 & 30.332 & 9240934 & 820.8530\\
\hline
Afghanistan & Asia & 1962 & 31.997 & 10267083 & 853.1007\\
\hline
Afghanistan & Asia & 1967 & 34.020 & 11537966 & 836.1971\\
\hline
Afghanistan & Asia & 1972 & 36.088 & 13079460 & 739.9811\\
\hline
Afghanistan & Asia & 1977 & 38.438 & 14880372 & 786.1134\\
\hline
Afghanistan & Asia & 1982 & 39.854 & 12881816 & 978.0114\\
\hline
Afghanistan & Asia & 1987 & 40.822 & 13867957 & 852.3959\\
\hline
Afghanistan & Asia & 1992 & 41.674 & 16317921 & 649.3414\\
\hline
Afghanistan & Asia & 1997 & 41.763 & 22227415 & 635.3414\\
\hline
\end{tabular}
\end{table}

### Formatting Tables with `kableExtra`

To further customize the table appearance, we can use the `kableExtra` package.


```r
#install.packages("kableExtra") 
library(kableExtra)
kable(mtcars[1:5, 1:5], caption = "A formatted table with kableExtra") %>%
  kable_styling("striped", full_width = F)
```

\begin{table}

\caption{(\#tab:unnamed-chunk-3)A formatted table with kableExtra}
\centering
\begin{tabular}[t]{l|r|r|r|r|r}
\hline
  & mpg & cyl & disp & hp & drat\\
\hline
Mazda RX4 & 21.0 & 6 & 160 & 110 & 3.90\\
\hline
Mazda RX4 Wag & 21.0 & 6 & 160 & 110 & 3.90\\
\hline
Datsun 710 & 22.8 & 4 & 108 & 93 & 3.85\\
\hline
Hornet 4 Drive & 21.4 & 6 & 258 & 110 & 3.08\\
\hline
Hornet Sportabout & 18.7 & 8 & 360 & 175 & 3.15\\
\hline
\end{tabular}
\end{table}


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

\begin{table}

\caption{(\#tab:unnamed-chunk-4)Table 3: First 10 rows of the Gapminder dataset with custom column formatting.}
\centering
\begin{tabular}[t]{l|>{}l|r|>{}r|r|r}
\hline
country & continent & year & lifeExp & pop & gdpPercap\\
\hline
Afghanistan & \textcolor{red}{\textbf{Asia}} & 1952 & \ttfamily{28.801} & 8425333 & 779.4453\\
\hline
Afghanistan & \textcolor{red}{\textbf{Asia}} & 1957 & \ttfamily{30.332} & 9240934 & 820.8530\\
\hline
Afghanistan & \textcolor{red}{\textbf{Asia}} & 1962 & \ttfamily{31.997} & 10267083 & 853.1007\\
\hline
Afghanistan & \textcolor{red}{\textbf{Asia}} & 1967 & \ttfamily{34.020} & 11537966 & 836.1971\\
\hline
Afghanistan & \textcolor{red}{\textbf{Asia}} & 1972 & \ttfamily{36.088} & 13079460 & 739.9811\\
\hline
Afghanistan & \textcolor{red}{\textbf{Asia}} & 1977 & \ttfamily{38.438} & 14880372 & 786.1134\\
\hline
Afghanistan & \textcolor{red}{\textbf{Asia}} & 1982 & \ttfamily{39.854} & 12881816 & 978.0114\\
\hline
Afghanistan & \textcolor{red}{\textbf{Asia}} & 1987 & \ttfamily{40.822} & 13867957 & 852.3959\\
\hline
Afghanistan & \textcolor{red}{\textbf{Asia}} & 1992 & \ttfamily{41.674} & 16317921 & 649.3414\\
\hline
Afghanistan & \textcolor{red}{\textbf{Asia}} & 1997 & \ttfamily{41.763} & 22227415 & 635.3414\\
\hline
\end{tabular}
\end{table}


### Formatting Tables with flextable

Another option for table formatting is the flextable package.


```r
#install.packages("flextable")
library(flextable)
ft <- flextable(mtcars[1:5, 1:5])
ft <- set_caption(ft, caption = "A table using flextable")
ft
```

```{=latex}
\global\setlength{\Oldarrayrulewidth}{\arrayrulewidth}

\global\setlength{\Oldtabcolsep}{\tabcolsep}

\setlength{\tabcolsep}{0pt}

\renewcommand*{\arraystretch}{1.5}



\providecommand{\ascline}[3]{\noalign{\global\arrayrulewidth #1}\arrayrulecolor[HTML]{#2}\cline{#3}}

\begin{longtable}[c]{|p{0.75in}|p{0.75in}|p{0.75in}|p{0.75in}|p{0.75in}}

\caption{A\ table\ using\ flextable}(\#tab:unnamed-chunk-5)\\

\ascline{1.5pt}{666666}{1-5}

\multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{mpg}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{cyl}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{disp}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{hp}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{drat}}}} \\

\ascline{1.5pt}{666666}{1-5}\endhead



\multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{21.0}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{6}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{160}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{110}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{3.90}}}} \\





\multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{21.0}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{6}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{160}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{110}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{3.90}}}} \\





\multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{22.8}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{4}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{108}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{93}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{3.85}}}} \\





\multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{21.4}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{6}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{258}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{110}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{3.08}}}} \\





\multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{18.7}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{8}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{360}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{175}}}} & \multicolumn{1}{>{\raggedleft}m{\dimexpr 0.75in+0\tabcolsep}}{\textcolor[HTML]{000000}{\fontsize{11}{11}\selectfont{\global\setmainfont{DejaVu Sans}{3.15}}}} \\

\ascline{1.5pt}{666666}{1-5}



\end{longtable}



\arrayrulecolor[HTML]{000000}

\global\setlength{\arrayrulewidth}{\Oldarrayrulewidth}

\global\setlength{\tabcolsep}{\Oldtabcolsep}

\renewcommand*{\arraystretch}{1}
```


### Formatting Tables with gt

The gt package provides another way to create formatted tables in R.


```r
#install.packages("gt")
library(gt)
gt(mtcars[1:5, 1:5]) %>%
  tab_header(title = "A table using gt")
```

\begin{longtable}{rrrrr}
\caption*{
{\large A table using gt}
} \\ 
\toprule
mpg & cyl & disp & hp & drat \\ 
\midrule
21.0 & 6 & 160 & 110 & 3.90 \\ 
21.0 & 6 & 160 & 110 & 3.90 \\ 
22.8 & 4 & 108 & 93 & 3.85 \\ 
21.4 & 6 & 258 & 110 & 3.08 \\ 
18.7 & 8 & 360 & 175 & 3.15 \\ 
\bottomrule
\end{longtable}



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


--------------------------------------------------
 Min.   1st Qu.   Median   Mean    3rd Qu.   Max. 
------ --------- -------- ------- --------- ------
 10.4    15.43     19.2    20.09    22.8     33.9 
--------------------------------------------------

Table: Summary statistics for miles per gallon


### t-test results with pander

Let's perform a t-test comparing the miles per gallon (mpg) for cars with 4 and 6 cylinders.


```r
t_test_result <- t.test(mpg ~ as.factor(cyl), data = mtcars, subset = cyl %in% c(4, 6))
pander(t_test_result, caption = "Comparing MPG for 4 and 6 cylinder cars")
```


-------------------------------------------------------------------
 Test statistic    df         P value       Alternative hypothesis 
---------------- ------- ----------------- ------------------------
     4.719        12.96   0.0004048 * * *         two.sided        
-------------------------------------------------------------------

Table: Comparing MPG for 4 and 6 cylinder cars (continued below)

 
-----------------------------------
 mean in group 4   mean in group 6 
----------------- -----------------
      26.66             19.74      
-----------------------------------

### Chi-square test results with pander
Now let's perform a chi-square test to check for an association between the number of cylinders and the type of transmission (automatic or manual).


```r
my_table <- table(mtcars$cyl, mtcars$am)
chisq_test_result <- chisq.test(my_table)
pander(chisq_test_result, caption = "Chi-square test for cylinders and transmission type")
```


---------------------------------
 Test statistic   df    P value  
---------------- ---- -----------
     8.741        2    0.01265 * 
---------------------------------

Table: Chi-square test for cylinders and transmission type

### Linear regression results with pander
Finally, let's fit a linear regression model of miles per gallon (mpg) as a function of weight (wt) and display the results.


```r
lm_result <- lm(mpg ~ wt, data = mtcars)
pander(lm_result, caption = "Linear regression of MPG on weight")
```


---------------------------------------------------------------
     &nbsp;        Estimate   Std. Error   t value   Pr(>|t|)  
----------------- ---------- ------------ --------- -----------
 **(Intercept)**    37.29       1.878       19.86    8.242e-19 

     **wt**         -5.344      0.5591     -9.559    1.294e-10 
---------------------------------------------------------------

Table: Linear regression of MPG on weight

