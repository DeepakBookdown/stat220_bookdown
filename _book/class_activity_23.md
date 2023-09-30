# Class Activity 23


```r
# load the necessary libraries
library(tidyverse) 
library(tidymodels)
library(mlbench)     # for PimaIndiansDiabetes2 dataset
library(janitor)
library(yardstick) # extra package for getting metrics
library(parsnip) # tidy interface to models
library(ggthemes)
library(forcats)
library(probably)
library(yardstick)
```


## Group Activity 1

Load the `mlbench` package to get `PimaIndiansDiabetes2` dataset.


```r
# Load the data - diabetes
data(PimaIndiansDiabetes2)
db <- PimaIndiansDiabetes2
db <- db %>% drop_na() 
db_raw <- db %>% select(glucose, insulin, diabetes)

db_split <- initial_split(db_raw, prop = 0.80)
# Create training data
db_train <- db_split %>% training()
# Create testing data
db_test <- db_split %>% testing()
```

a. Creating the recipe

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
db_recipe <- recipe(diabetes ~  glucose + insulin, data = db_train) %>%
  step_scale(all_predictors()) %>%
  step_center(all_predictors()) %>% 
  prep()
```

</details>

b. Create your model specification and use `tune()` as a placeholder for the number of neighbors

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
knn_spec <- nearest_neighbor(weight_func = "rectangular", 
                             engine = "kknn",
                             mode = "classification",
                             neighbors = tune())
```

</details>

c. Split the `db_train` data set into `v = 10` folds, stratified by `diabetes`

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
db_vfold <- vfold_cv(db_train, v = 10, strata = diabetes)
```

</details>

d. Create a grid of `K` values, the number of neighbors and run 10-fold CV on the `k_vals` grid, storing four performance metrics. The vizualization code is provided for your reference.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
k_vals <- tibble(neighbors = seq(from = 1, to = 40, by = 1))
```



```r
knn_fit <- workflow() %>%
  add_recipe(db_recipe) %>%
  add_model(knn_spec) %>%
  tune_grid(
    resamples = db_vfold, 
    grid = k_vals,
    metrics = metric_set(yardstick::ppv, yardstick::accuracy, sens, spec),
    control = control_resamples(save_pred = TRUE))
```



```r
cv_metrics <- collect_metrics(knn_fit) 
cv_metrics %>% group_by(.metric) %>% slice_max(mean) 
```

```
# A tibble: 10 × 7
# Groups:   .metric [4]
   neighbors .metric  .estimator  mean     n std_err .config
       <dbl> <chr>    <chr>      <dbl> <int>   <dbl> <chr>  
 1        29 accuracy binary     0.773    10  0.0164 Prepro…
 2        30 accuracy binary     0.773    10  0.0164 Prepro…
 3        29 ppv      binary     0.796    10  0.0158 Prepro…
 4        30 ppv      binary     0.796    10  0.0158 Prepro…
 5        29 sens     binary     0.895    10  0.0198 Prepro…
 6        30 sens     binary     0.895    10  0.0198 Prepro…
 7        27 spec     binary     0.525    10  0.0425 Prepro…
 8        28 spec     binary     0.525    10  0.0425 Prepro…
 9        29 spec     binary     0.525    10  0.0425 Prepro…
10        30 spec     binary     0.525    10  0.0425 Prepro…
```

</details>

### Extra: Plot the metrics

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
final.results <- cv_metrics %>%  mutate(.metric = as.factor(.metric)) %>%
  select(neighbors, .metric, mean)

final.results %>%
  ggplot(aes(x = neighbors, y = mean, color = forcats::fct_reorder2(.metric, neighbors, mean))) +
  geom_line(size = 1) +
  geom_point(size = 2) +
  theme_minimal() +
  scale_color_wsj() + 
  scale_x_continuous(breaks = k_vals[[1]]) +
  theme(panel.grid.minor.x = element_blank())+
  labs(color='Metric', y = "Estimate", x = "K")
```

<img src="class_activity_23_files/figure-epub3/unnamed-chunk-9-1.png" width="100%" />

</details>

---------------------------------------------------------

## Group Activity 2

a. Let's fit the logistic regression model.


```r
set.seed(12345)
db_single <- db %>% select(diabetes, glucose)
db_split <- initial_split(db_single, prop = 0.80)

# Create training data
db_train <- db_split %>% training()

# Create testing data
db_test <- db_split %>% testing()

fitted_logistic_model <- logistic_reg() %>% # Call the model function
        # Set the engine/family of the model
        set_engine("glm") %>%
        # Set the mode
        set_mode("classification") %>%
        # Fit the model
        fit(diabetes~., data = db_train)

tidy(fitted_logistic_model)
```

```
# A tibble: 2 × 5
  term        estimate std.error statistic  p.value
  <chr>          <dbl>     <dbl>     <dbl>    <dbl>
1 (Intercept)  -5.61     0.678       -8.28 1.20e-16
2 glucose       0.0392   0.00514      7.62 2.55e-14
```

</details>

b. We are interested in predicting the diabetes status of patients depending on the amount of glucose. Verify that the glucose value of 143.11 gives the probability of having diabetes as 1/2.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



$$log\left(\frac{p}{1-p}\right)  = \beta_0 + \beta_1x$$



```r
(p <- round(exp(-5.61 + 0.0392* 143.11) / (1 + exp(-5.61 + 0.0392* 143.11)),2))
```

```
[1] 0.5
```

</details>

c. What value of glucose is needed to have a probability of diabetes of 0.75?

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 


```r
p <- 0.75
(x <- (log(p/(1-p)) - (-5.61))/0.0392)	
```

```
[1] 171.1381
```

</details>

d. Make a classifier that classifies the diabetes status of new patients with a threshold of 0.75, i.e, a new patient is classified as negative if the estimated class probability is less than 0.75. Also, create a confusion matrix of the resulting predictions.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 




```r
# Prediction Probabilities
library(probably)
pred_prob <- predict(fitted_logistic_model,  new_data = db_test,   type = "prob")

db_results <- db_test %>% bind_cols(pred_prob) %>%
  mutate(.pred_class = make_two_class_pred(.pred_neg, levels(diabetes), threshold = .75)) %>%
  select(diabetes, glucose, contains(".pred"))


db_results %>%  
  conf_mat(diabetes,.pred_class) %>% 
  autoplot(type = "heatmap")
```

<img src="class_activity_23_files/figure-epub3/unnamed-chunk-13-1.png" width="100%" />


</details>
