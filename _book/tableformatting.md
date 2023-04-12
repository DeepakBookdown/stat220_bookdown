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

```{=html}
<div class="tabwid"><style>.cl-cb6cff7a{}.cl-cb61f6ca{font-family:'DejaVu Sans';font-size:11pt;font-weight:normal;font-style:normal;text-decoration:none;color:rgba(0, 0, 0, 1.00);background-color:transparent;}.cl-cb66aa1c{margin:0;text-align:right;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);padding-bottom:5pt;padding-top:5pt;padding-left:5pt;padding-right:5pt;line-height: 1;background-color:transparent;}.cl-cb66c498{width:0.75in;background-color:transparent;vertical-align: middle;border-bottom: 1.5pt solid rgba(102, 102, 102, 1.00);border-top: 1.5pt solid rgba(102, 102, 102, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-cb66c499{width:0.75in;background-color:transparent;vertical-align: middle;border-bottom: 0 solid rgba(0, 0, 0, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}.cl-cb66c4a2{width:0.75in;background-color:transparent;vertical-align: middle;border-bottom: 1.5pt solid rgba(102, 102, 102, 1.00);border-top: 0 solid rgba(0, 0, 0, 1.00);border-left: 0 solid rgba(0, 0, 0, 1.00);border-right: 0 solid rgba(0, 0, 0, 1.00);margin-bottom:0;margin-top:0;margin-left:0;margin-right:0;}</style><table data-quarto-disable-processing='true' class='cl-cb6cff7a'>

```

<caption style="margin:0pt;text-align:center;border-bottom: 0.00pt solid transparent;border-top: 0.00pt solid transparent;border-left: 0.00pt solid transparent;border-right: 0.00pt solid transparent;padding-top:3pt;padding-bottom:3pt;padding-left:3pt;padding-right:3pt;line-height: 1;background-color:transparent;">(\#tab:unnamed-chunk-5)<span>A table using flextable</span></caption>

```{=html}

<thead><tr style="overflow-wrap:break-word;"><th class="cl-cb66c498"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">mpg</span></p></th><th class="cl-cb66c498"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">cyl</span></p></th><th class="cl-cb66c498"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">disp</span></p></th><th class="cl-cb66c498"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">hp</span></p></th><th class="cl-cb66c498"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">drat</span></p></th></tr></thead><tbody><tr style="overflow-wrap:break-word;"><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">21.0</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">6</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">160</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">110</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">3.90</span></p></td></tr><tr style="overflow-wrap:break-word;"><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">21.0</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">6</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">160</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">110</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">3.90</span></p></td></tr><tr style="overflow-wrap:break-word;"><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">22.8</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">4</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">108</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">93</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">3.85</span></p></td></tr><tr style="overflow-wrap:break-word;"><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">21.4</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">6</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">258</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">110</span></p></td><td class="cl-cb66c499"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">3.08</span></p></td></tr><tr style="overflow-wrap:break-word;"><td class="cl-cb66c4a2"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">18.7</span></p></td><td class="cl-cb66c4a2"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">8</span></p></td><td class="cl-cb66c4a2"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">360</span></p></td><td class="cl-cb66c4a2"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">175</span></p></td><td class="cl-cb66c4a2"><p class="cl-cb66aa1c"><span class="cl-cb61f6ca">3.15</span></p></td></tr></tbody></table></div>
```


### Formatting Tables with gt

The gt package provides another way to create formatted tables in R.


```r
#install.packages("gt")
library(gt)
gt(mtcars[1:5, 1:5]) %>%
  tab_header(title = "A table using gt")
```

```{=html}
<div id="dxpbycpqad" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', 'Fira Sans', 'Droid Sans', Arial, sans-serif;
}

#dxpbycpqad .gt_table {
  display: table;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  color: #333333;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  background-color: #FFFFFF;
  width: auto;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #A8A8A8;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #A8A8A8;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
}

#dxpbycpqad .gt_heading {
  background-color: #FFFFFF;
  text-align: center;
  border-bottom-color: #FFFFFF;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
}

#dxpbycpqad .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}

#dxpbycpqad .gt_title {
  color: #333333;
  font-size: 125%;
  font-weight: initial;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-color: #FFFFFF;
  border-bottom-width: 0;
}

#dxpbycpqad .gt_subtitle {
  color: #333333;
  font-size: 85%;
  font-weight: initial;
  padding-top: 0;
  padding-bottom: 6px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-color: #FFFFFF;
  border-top-width: 0;
}

#dxpbycpqad .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}

#dxpbycpqad .gt_col_headings {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
}

#dxpbycpqad .gt_col_heading {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: normal;
  text-transform: inherit;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 6px;
  padding-left: 5px;
  padding-right: 5px;
  overflow-x: hidden;
}

#dxpbycpqad .gt_column_spanner_outer {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: normal;
  text-transform: inherit;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 4px;
  padding-right: 4px;
}

#dxpbycpqad .gt_column_spanner_outer:first-child {
  padding-left: 0;
}

#dxpbycpqad .gt_column_spanner_outer:last-child {
  padding-right: 0;
}

#dxpbycpqad .gt_column_spanner {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 5px;
  overflow-x: hidden;
  display: inline-block;
  width: 100%;
}

#dxpbycpqad .gt_group_heading {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: middle;
  text-align: left;
}

#dxpbycpqad .gt_empty_group_heading {
  padding: 0.5px;
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  vertical-align: middle;
}

#dxpbycpqad .gt_from_md > :first-child {
  margin-top: 0;
}

#dxpbycpqad .gt_from_md > :last-child {
  margin-bottom: 0;
}

#dxpbycpqad .gt_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 10px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: middle;
  overflow-x: hidden;
}

#dxpbycpqad .gt_stub {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  padding-left: 5px;
  padding-right: 5px;
}

#dxpbycpqad .gt_stub_row_group {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  padding-left: 5px;
  padding-right: 5px;
  vertical-align: top;
}

#dxpbycpqad .gt_row_group_first td {
  border-top-width: 2px;
}

#dxpbycpqad .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}

#dxpbycpqad .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}

#dxpbycpqad .gt_first_summary_row.thick {
  border-top-width: 2px;
}

#dxpbycpqad .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}

#dxpbycpqad .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}

#dxpbycpqad .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}

#dxpbycpqad .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}

#dxpbycpqad .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}

#dxpbycpqad .gt_footnotes {
  color: #333333;
  background-color: #FFFFFF;
  border-bottom-style: none;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
}

#dxpbycpqad .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-left: 4px;
  padding-right: 4px;
  padding-left: 5px;
  padding-right: 5px;
}

#dxpbycpqad .gt_sourcenotes {
  color: #333333;
  background-color: #FFFFFF;
  border-bottom-style: none;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
}

#dxpbycpqad .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}

#dxpbycpqad .gt_left {
  text-align: left;
}

#dxpbycpqad .gt_center {
  text-align: center;
}

#dxpbycpqad .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

#dxpbycpqad .gt_font_normal {
  font-weight: normal;
}

#dxpbycpqad .gt_font_bold {
  font-weight: bold;
}

#dxpbycpqad .gt_font_italic {
  font-style: italic;
}

#dxpbycpqad .gt_super {
  font-size: 65%;
}

#dxpbycpqad .gt_footnote_marks {
  font-style: italic;
  font-weight: normal;
  font-size: 75%;
  vertical-align: 0.4em;
}

#dxpbycpqad .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}

#dxpbycpqad .gt_indent_1 {
  text-indent: 5px;
}

#dxpbycpqad .gt_indent_2 {
  text-indent: 10px;
}

#dxpbycpqad .gt_indent_3 {
  text-indent: 15px;
}

#dxpbycpqad .gt_indent_4 {
  text-indent: 20px;
}

#dxpbycpqad .gt_indent_5 {
  text-indent: 25px;
}
</style>
<table class="gt_table">
  <thead class="gt_header">
    <tr>
      <td colspan="5" class="gt_heading gt_title gt_font_normal gt_bottom_border" style>A table using gt</td>
    </tr>
    
  </thead>
  <thead class="gt_col_headings">
    <tr>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="mpg">mpg</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="cyl">cyl</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="disp">disp</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="hp">hp</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="drat">drat</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr><td headers="mpg" class="gt_row gt_right">21.0</td>
<td headers="cyl" class="gt_row gt_right">6</td>
<td headers="disp" class="gt_row gt_right">160</td>
<td headers="hp" class="gt_row gt_right">110</td>
<td headers="drat" class="gt_row gt_right">3.90</td></tr>
    <tr><td headers="mpg" class="gt_row gt_right">21.0</td>
<td headers="cyl" class="gt_row gt_right">6</td>
<td headers="disp" class="gt_row gt_right">160</td>
<td headers="hp" class="gt_row gt_right">110</td>
<td headers="drat" class="gt_row gt_right">3.90</td></tr>
    <tr><td headers="mpg" class="gt_row gt_right">22.8</td>
<td headers="cyl" class="gt_row gt_right">4</td>
<td headers="disp" class="gt_row gt_right">108</td>
<td headers="hp" class="gt_row gt_right">93</td>
<td headers="drat" class="gt_row gt_right">3.85</td></tr>
    <tr><td headers="mpg" class="gt_row gt_right">21.4</td>
<td headers="cyl" class="gt_row gt_right">6</td>
<td headers="disp" class="gt_row gt_right">258</td>
<td headers="hp" class="gt_row gt_right">110</td>
<td headers="drat" class="gt_row gt_right">3.08</td></tr>
    <tr><td headers="mpg" class="gt_row gt_right">18.7</td>
<td headers="cyl" class="gt_row gt_right">8</td>
<td headers="disp" class="gt_row gt_right">360</td>
<td headers="hp" class="gt_row gt_right">175</td>
<td headers="drat" class="gt_row gt_right">3.15</td></tr>
  </tbody>
  
  
</table>
</div>
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

