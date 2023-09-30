# Class Activity 25


```r
# load the necessary libraries
library(tidyverse) 
library(tidymodels)
library(yardstick) # extra package for getting metrics
library(parsnip) # tidy interface to models
library(ggthemes)
library(vip)
library(ISLR)
library(rpart.plot)
library(janitor)
library(ranger)


fire <- read_csv("https://raw.githubusercontent.com/deepbas/statdatasets/main/Algeriafires.csv")
fire <- fire %>% clean_names() %>% 
  drop_na() %>% 
  mutate_at(c(10,13), as.numeric) %>%
  mutate(classes = as.factor(classes)) %>%
  select(-year, -day, -month)
```



## Group Activity 1

Use the `fire` data set and predict fire using all available predictor variables.

a. Split the dataset into training and test set by the proportion $80$ to $20$, create a 10 fold cross validation object, and a recipe t0 preprocess the data.


<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
set.seed(314) # Remember to always set your seed.

fire_split <- initial_split(fire, prop = 0.80,  strata = classes)

fire_train <- fire_split %>% training()
fire_test <- fire_split %>% testing()

# Create folds for cross validation on the training data set

fire_folds <- vfold_cv(fire_train, v = 10, strata = classes)

fire_recipe <- recipe(classes ~ ., data = fire_train) %>%
 step_dummy(all_nominal(), -all_outcomes()) %>%
 prep()
```


</details>

b. Specify a decision tree classification model with `rpart` computational engine. Prepare the model for tuning (i.e., fitting with a range of parameters for validation purposes).

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
tree_model <- decision_tree(cost_complexity = tune(),
                            tree_depth = tune(),
                            min_n = tune()) %>% 
              set_engine('rpart') %>% 
              set_mode('classification')
```

</details>

c. Combine the model and recipe into a workflow to easily manage the model-building process.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
tree_workflow <- workflow() %>% 
                 add_model(tree_model) %>% 
                 add_recipe(fire_recipe)
```

</details>

d. Create a grid of hyper-parameter values to test

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
tree_grid <- grid_random(cost_complexity(),
                          tree_depth(),
                          min_n(), 
                          size = 10)
```

</details>

e. Tune decision tree workflow

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
set.seed(314)
tree_tuning <- tree_workflow %>% 
               tune_grid(resamples = fire_folds,
                         grid = tree_grid)
```


</details>

f. Show the best models under the accuracy criteria.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
tree_tuning %>% show_best('accuracy')
```

```
# A tibble: 5 × 9
  cost_complexity tree_depth min_n .metric  .estimator  mean
            <dbl>      <int> <int> <chr>    <chr>      <dbl>
1        6.85e- 8          9     2 accuracy binary     0.974
2        1.37e-10          6     3 accuracy binary     0.968
3        5.22e- 3          3    18 accuracy binary     0.963
4        1.03e- 4         11    26 accuracy binary     0.963
5        5.77e- 3          6    33 accuracy binary     0.963
# ℹ 3 more variables: n <int>, std_err <dbl>, .config <chr>
```

</details>

g. Select best model based on accuracy and view the best parameters. What is the corresponding tree depth?

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
best_tree <- tree_tuning %>%  select_best(metric = 'accuracy')
best_tree
```

```
# A tibble: 1 × 4
  cost_complexity tree_depth min_n .config              
            <dbl>      <int> <int> <chr>                
1    0.0000000685          9     2 Preprocessor1_Model04
```

</details>


h. Using the `best_tree` object, finalize the workflow using `finalize_workflow()`. 

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
final_tree_workflow <- tree_workflow %>% finalize_workflow(best_tree)
```

</details>

i. Fit the train data to the finalized workflow and extract the fit.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
tree_wf_fit <- final_tree_workflow %>% fit(data = fire_train)
```


```r
tree_fit <- tree_wf_fit %>%  extract_fit_parsnip()
```

</details>

j. Construct variable importance plot. What can you conclude from this plot?

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
vip(tree_fit)
```

<img src="class_activity_25_files/figure-epub3/unnamed-chunk-12-1.png" width="100%" />

</details>

k. Construct a decision tree. What do you see in this plot?

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
rpart.plot(tree_fit$fit, roundint = FALSE)
```

<img src="class_activity_25_files/figure-epub3/unnamed-chunk-13-1.png" width="100%" />

</details>

-----------------------------------------------------------------

## Group Activity 2

Use the `fire` dataset again to fit a random forest algorithm to produce optimal set of variables used in predicting fire. Use the same recipe defined earlier in group activity 1.

a. Specify a decision tree classification model with `ranger` computational engine and `impurity` for variable importance. Prepare the model for tuning (i.e., fitting with a range of parameters for validation purposes).


<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
rf_model <- rand_forest(mtry = tune(),
                        trees = tune(),
                        min_n = tune()) %>% 
            set_engine('ranger', importance = "impurity") %>% 
            set_mode('classification')
```

</details>

b. Define a workflow object.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 




```r
rf_workflow <- workflow() %>% 
               add_model(rf_model) %>% 
               add_recipe(fire_recipe)
```

</details>

c. Create a grid of hyper parameter values to test. Try different values.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
rf_grid <- grid_random(mtry() %>% range_set(c(1, 8)),
                       trees(),
                       min_n(),
                       size = 10)
```


</details>

d. Tune the random forest workflow. Use the `fire_folds` object from before with 10 cross validation routine.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
rf_tuning <- rf_workflow %>% 
             tune_grid(resamples = fire_folds,
                       grid = rf_grid)
```

</details>

e. Select the best model based on accuracy.


<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
best_rf <- rf_tuning %>% 
           select_best(metric = 'accuracy')
```

</details>


f. Finalize the workflow, fit the model, and extract the parameters.

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 



```r
final_rf_workflow <- rf_workflow %>% 
                     finalize_workflow(best_rf)
rf_wf_fit <- final_rf_workflow %>% 
             fit(data = fire_train)
rf_fit <- rf_wf_fit %>% 
          extract_fit_parsnip()
```

</details>

g. Plot the variable importance. What can you conclude from this plot?

<details>
<summary class="answer">Click for answer</summary>
*Answer:* 




```r
vip(rf_fit)
```

<img src="class_activity_25_files/figure-epub3/unnamed-chunk-20-1.png" width="100%" />


</details>
