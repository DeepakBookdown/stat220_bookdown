# Class Activity 27


```r
# load the necessary libraries
library(tidyverse) 
library(parsnip) # tidy interface to models
library(ggthemes)
library(tidymodels)
library(vip)
library(readxl)

theme_set(theme_stata(base_size = 10))

select <- dplyr::select

# Load the data
street_address <- read_csv("https://raw.githubusercontent.com/deepbas/statdatasets/main/street_address.csv") %>%  select(-1)
```



## Group Activity 1


## Group Activity 1: Address Classification using Random Forest in R

In this tutorial, we will use a Random Forest model to classify whether a given address is correctly formatted. The dataset consists of synthetic examples generated by chatgpt, with certain cases based on various features extracted from the address. The outcome variable is the Label, which indicates if the address is correctly formatted.



```r
glimpse(street_address)
```

```
Rows: 102
Columns: 16
$ Address                   <chr> "\"123 collin ave, 44045…
$ Length                    <dbl> 27, 26, 30, 28, 27, 21, …
$ `Number of Words`         <dbl> 5, 5, 5, 5, 5, 4, 4, 4, …
$ `State Code`              <dbl> 1, 1, 1, 1, 1, 1, 1, 0, …
$ `Zip Code`                <dbl> 1, 1, 1, 1, 1, 1, 0, 1, …
$ `Levenshtein Distance`    <dbl> 0, 1, 3, 1, 1, 4, 6, 3, …
$ `Presence of apt no`      <dbl> 0, 0, 0, 0, 0, 0, 0, 0, …
$ `Presence of street no`   <dbl> 1, 1, 1, 1, 1, 1, 1, 1, …
$ `Presence of street name` <dbl> 1, 1, 1, 1, 1, 1, 1, 1, …
$ `Presence of city`        <dbl> 1, 1, 1, 1, 1, 1, 0, 0, …
$ `Presence of state`       <dbl> 1, 1, 1, 1, 1, 1, 1, 0, …
$ `Presence of zip code`    <dbl> 1, 1, 1, 1, 1, 1, 0, 1, …
$ `State code correctness`  <dbl> 1, 1, 1, 1, 1, 1, 1, 0, …
$ `Zip code correctness`    <dbl> 1, 1, 1, 1, 1, 1, 0, 1, …
$ `Typo in street name`     <dbl> 0, 1, 1, 1, 1, 1, 1, 1, …
$ Label                     <chr> "Correct", "Incorrect", …
```



### Splitting the Data

The first step is to split our data into a training set and a testing set. We will use 75% of the data for training and reserve 25% for testing.


```r
# Set random seed for reproducibility
set.seed(314)

# Split data into training and testing set
db_split <- initial_split(street_address %>% select(-1) %>% janitor::clean_names(), prop = 0.75)
db_train <- training(db_split)
db_test <- testing(db_split)
```

### Preprocessing

Our data contains categorical variables, so we need to convert them into numerical form using dummy variables. We define a recipe to do this preprocessing.


```r
# Create a recipe for preprocessing
db_recipe <- recipe(label ~ ., data = db_train) %>%
  step_dummy(all_nominal(), -all_outcomes()) %>%
  prep()
```

### Defining the Model

We will use a Random Forest model for our classification task. Random Forest is a powerful machine learning algorithm that can handle both regression and classification problems. It works well with both categorical and numerical data.


```r
# Define the model specification
rf_model <- rand_forest(mtry = tune(),
                        trees = 1000,
                        min_n = tune()) %>% 
  set_engine('ranger', importance = "impurity") %>% 
  set_mode('classification')
```


We then combine our model and preprocessing recipe into a workflow.




```r
# Combine the model and recipe into a workflow 
rf_workflow <- workflow() %>% 
  add_model(rf_model) %>% 
  add_recipe(db_recipe)
```

### Cross Validation

Next, we will perform cross-validation on our training data to avoid overfitting. This will also help us tune our model parameters.


```r
# Create folds for cross validation on the training data set
db_folds <- vfold_cv(db_train, v = 5)
```


### Hyperparameter Tuning

We define a grid of parameters for tuning our model. We will use a random search strategy for our grid, which is more efficient than an exhaustive grid search.


```r
# Define the grid for tuning
rf_grid <- grid_random(
  mtry(range = c(1, 10)), 
  min_n(range = c(1, 10)), 
  size = 10
)
```


We then use this grid to tune our model.


```r
# Tune the model
rf_tuning <- tune_grid(
  rf_workflow,
  resamples = db_folds,
  grid = rf_grid
)
```

After tuning, we select the best model based on accuracy, finalize the workflow with the best parameters, and then fit the model on the training data.


```r
# Select the best model based on accuracy
best_rf <- select_best(rf_tuning, metric = "accuracy")

# Finalize the workflow with the best parameters
final_rf_workflow <- finalize_workflow(rf_workflow, best_rf)

# Fit the model on the training data
rf_fit <- fit(final_rf_workflow, data = db_train)
```


We can also plot the importance of each feature in our model. This tells us which features have the greatest impact on the model's decision-making process.


```r
# Extract the fitted model and plot feature importance
library(vip)
rf_fit_parsnip <- extract_fit_parsnip(rf_fit)
vip(rf_fit_parsnip) + theme(axis.text.y = element_text(angle = 0))
```

<img src="class_activity_27_files/figure-epub3/unnamed-chunk-11-1.png" width="100%" />


### Making Predictions

Now that our model is trained, we can use it to make predictions on our test data.


```r
# Make predictions on the test data
predictions <- predict(rf_fit, new_data = db_test)

# Compare predictions to true outcomes
db_results <- db_test %>% bind_cols(predictions) %>% select(label, .pred_class)

# Print confusion matrix
conf_mat(db_results %>% mutate(label = factor(label)), truth = label, estimate = .pred_class)
```

```
           Truth
Prediction  Correct Incorrect
  Correct         3         0
  Incorrect       1        22
```


### Feature Extraction


```r
# Define function to extract features
extract_features <- function(address, correct_address) {
  
  # Split the addresses into components
  components <- str_split(address, ",\\s*")[[1]]
  correct_components <- str_split(correct_address, ",\\s*")[[1]]
  
  # Extract specific components from the input and correct addresses
  street_apt <- components[1]
  city <- components[2]
  state_zip <- components[3]
  
  correct_street_apt <- correct_components[1]
  correct_city <- correct_components[2]
  correct_state_zip <- correct_components[3]
  
  # Further split specific components
  street_apt_split <- str_split(street_apt, "\\s+")[[1]]
  state_zip_split <- str_split(state_zip, "\\s+")[[1]]
  
  correct_state_zip_split <- str_split(correct_state_zip, "\\s+")[[1]]
  
  # Identify each component
  street_number <- str_extract(street_apt, "^\\d+")
  street_name <- str_replace(street_apt, "^\\d+\\s?", "") # remove the street number
  apt_number <- ifelse(str_detect(street_apt, "(?i)apt"), 1, 0)
  state <- state_zip_split[1]
  
  # Get the last occurrence of a number sequence, likely to be the zip code
  zip_code <- tail(str_extract_all(address, "\\d+")[[1]], n = 1)
  
  correct_state <- correct_state_zip_split[1]
  correct_zip_code <- tail(str_extract_all(correct_address, "\\d+")[[1]], n = 1)
  
  # Calculate features
  length <- str_length(address)
  num_words <- str_count(address, "\\w+")
  state_code <- ifelse(state == correct_state, 1, 0)
  zip_code_present <- ifelse(!is.na(zip_code), 1, 0)
  zip_code_correctness <- ifelse(zip_code == correct_zip_code, 1, 0)
  
  # Calculate the Levenshtein distance between the provided and correct address
  levenshtein_distance <- stringdist::stringdist(address, correct_address)

  # Return as a data frame
  tibble(
    length = length,
    number_of_words = num_words,
    state_code = state_code,
    zip_code = zip_code_present,
    levenshtein_distance = levenshtein_distance,
    presence_of_apt_no = apt_number,
    presence_of_street_no = as.integer(!is.na(street_number)),
    presence_of_street_name = as.integer(!is.na(street_name)),
    presence_of_city = as.integer(!is.na(city)),
    presence_of_state = as.integer(!is.na(state)),
    presence_of_zip_code = as.integer(zip_code_present),
    state_code_correctness = state_code,
    zip_code_correctness = zip_code_correctness,
    typo_in_street_name = as.integer(levenshtein_distance > 0)
  )
}
```


Here's how we can use this function:


```r
# Use the function
new_address1 <- "505 6th St,  Northfield, MN, 55057"
new_address_features1 <- extract_features(new_address1, "505 6th St,  Northfield, MN, 55057")
new_address_features1
```

```
# A tibble: 1 × 14
  length number_of…¹ state…² zip_c…³ leven…⁴ prese…⁵ prese…⁶
   <int>       <int>   <dbl>   <dbl>   <dbl>   <dbl>   <int>
1     34           6       1       1       0       0       1
# … with 7 more variables: presence_of_street_name <int>,
#   presence_of_city <int>, presence_of_state <int>,
#   presence_of_zip_code <int>,
#   state_code_correctness <dbl>,
#   zip_code_correctness <dbl>, typo_in_street_name <int>,
#   and abbreviated variable names ¹​number_of_words,
#   ²​state_code, ³​zip_code, ⁴​levenshtein_distance, …
```

```r
new_address2 <- "505 6th st E, Apt 1Z, Northfield, MN, 5557"
new_address_features2 <- extract_features(new_address2, "505 6th St,  Northfield, MN, 55057")
new_address_features2
```

```
# A tibble: 1 × 14
  length number_of…¹ state…² zip_c…³ leven…⁴ prese…⁵ prese…⁶
   <int>       <int>   <dbl>   <dbl>   <dbl>   <dbl>   <int>
1     42           9       0       1      11       0       1
# … with 7 more variables: presence_of_street_name <int>,
#   presence_of_city <int>, presence_of_state <int>,
#   presence_of_zip_code <int>,
#   state_code_correctness <dbl>,
#   zip_code_correctness <dbl>, typo_in_street_name <int>,
#   and abbreviated variable names ¹​number_of_words,
#   ²​state_code, ³​zip_code, ⁴​levenshtein_distance, …
```



Now we have extracted the features from the new addresses, let's use our trained Random Forest model to predict whether the address formatting is correct or not.



```r
# Predict the class for the new data
new_data_predictions1 <- predict(rf_fit, new_data = new_address_features1)
new_data_predictions2 <- predict(rf_fit, new_data = new_address_features2)

# View the predictions
new_data_predictions1
```

```
# A tibble: 1 × 1
  .pred_class
  <fct>      
1 Correct    
```

```r
new_data_predictions2
```

```
# A tibble: 1 × 1
  .pred_class
  <fct>      
1 Incorrect  
```

This will give us the predicted class (correctly formatted or not) for each of the new addresses.

In this tutorial, we walked through the steps of splitting data into training and testing sets, pre-processing the data, defining the model specification, creating folds for cross validation, tuning the model, selecting the best model, fitting the model on the training data, extracting feature importance, making predictions on the test data and finally, making predictions on new data.

We hope this tutorial helped you understand how to build a Random Forest model for address formatting correctness prediction. Happy coding!


