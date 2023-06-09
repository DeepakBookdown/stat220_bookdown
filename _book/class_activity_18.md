# Class Activity 18


```r
# load the necessary libraries
library(tidyverse)
library(shiny)
library(readr)
library(janitor)
library(purrr)
library(lubridate)
library(plotly)
library(DT)
library(ggthemes)
library(rvest)
library(polite)
```


## Shiny App Structure

## User Interface (UI)

UI is just a web document that the user gets to see, it’s HTML that you write using Shiny’s functions. The UI is responsible for creating the layout of the app and telling Shiny exactly where things go. The server is responsible for the logic of the app; it’s the set of instructions that tell the web page what to show when the user interacts with the page.

### Hello World!


```r
ui <- fluidPage("Hello World!")
server <- function(input, output) {}
shinyApp(ui = ui, server = server, options = list(height = 200))
```

### Add more information


```r
fluidPage(
  titlePanel("Tracking Covid in Minnesota"),
  h1("Some nice header"),
  "elements1",
  "elements2",
  br(),
  "things1",
  strong("things2")
)
```

<br>

### Add a layout


```r
sidebarLayout(
  sidebarPanel("our inputs will go here"),
  mainPanel("the results will go here")
)
```

## Read Data



```r
table_usafacts <- bow(url = "https://usafacts.org/visualizations/coronavirus-covid-19-spread-map/state/minnesota") %>%
  scrape() %>%  html_nodes("a") %>%       # find all links
  html_attr("href") %>%     # get the url
  str_subset(".csv")        # find those that end in csv
```






```r
library(lubridate)
covid_data <- read_csv(table_usafacts[2]) %>% filter(State == "MN") %>% 
  select(-countyFIPS, -StateFIPS, -State) %>% 
  filter(!row_number() %in% c(1)) %>% 
  pivot_longer(-1, names_to = "Dates", values_to = "Cases") %>% 
  janitor::clean_names() %>% 
  mutate(county_name = str_remove(county_name, " County"), 
         dates = ymd(dates), 
         counties = as.factor(str_remove(county_name, " County")), 
         month = month(dates), 
         year = year(dates)) %>%
  select(-county_name)
head(covid_data)
```




```r
# County level data
county_names <- covid_data %>% pull(counties) %>% unique()
county_data <- lapply(1:length(county_names), function(i) filter(covid_data, counties == county_names[i]))
county_data %>% pluck(which(county_names == "Dakota"))
```

### A complete skeleton app


```r
ui <- fluidPage(
  titlePanel("Tracking Covid in Minnesota"),
  sidebarLayout(
    sidebarPanel("our inputs will go here"),
    mainPanel("the results will go here")
  )
)

server <- function(input, output) {}

shinyApp(ui = ui, server = server)
```

### Add inputs to the UI


```r
ui <- fluidPage(
  titlePanel("Tracking Covid in Minnesota"),
  sidebarLayout(
    sidebarPanel(
      sliderInput("monthInput", "Month", 0, 12, c(3, 6)),
      radioButtons("yearInput", "Year",
                  choices = c("2020", "2021", "2022", "2023"),
                  selected = "2022"),
       selectInput(inputId = "dv", label = "County",
                        choices = levels(covid_data$counties),
                        selected = c("Aitkin"))
    ),
    mainPanel("the results will go here")
  )
)

server <- function(input, output) {}

shinyApp(ui = ui, server = server, options = list(height = 800))
```


### Add placeholders for outputs



```r
ui <- fluidPage(
  titlePanel("Tracking Covid in Minnesota"),
  sidebarLayout(
    sidebarPanel(
      sliderInput("monthInput", "Month", 0, 12, c(3, 6)),
      radioButtons("yearInput", "Year",
                  choices = c("2020", "2021", "2022", "2023"),
                  selected = "2022"),
       selectInput(inputId = "dv", label = "County",
                        choices = levels(covid_data$counties),
                        selected = c("Aitkin"))
    ),
    mainPanel(
      plotOutput("coolplot"),
      br(), br(),
      tableOutput("results")
    )
  )
)

server <- function(input, output) {}

shinyApp(ui = ui, server = server, options = list(height = 800))
```


## Server Function

`Server` function will be responsible for listening to changes to the inputs and creating outputs to show in the app.

### Implementation 1


```r
ui1 <- fluidPage(
    titlePanel("Tracking Covid in Minnesota"),
    sidebarLayout(
        sidebarPanel(
          sliderInput("monthInput", "Month", 0, 12, c(3, 6)),
          radioButtons("yearInput", "Year",
                  choices = c("2020", "2021", "2022", "2023"),
                  selected = "2020"),
          selectInput(inputId = "dv", label = "County",
                        choices = levels(covid_data$counties),
                        selected = c("Aitkin"))
    ),
        mainPanel(
            plotOutput(outputId = "plot"), br(),
            DT::dataTableOutput(outputId = "table")
        )
    )
)
```




```r
server1 <- function(input, output) {
    filtered_data <- reactive({
        subset(covid_data,
               counties %in% input$dv &
               month >= input$monthInput[1] & month <= input$monthInput[2] & 
          year == input$yearInput) })

    output$plot <- renderPlot({
        ggplot(filtered_data(), aes(x=dates, y=cases, color=counties)) + theme_economist_white()+
                geom_point(alpha=0.5, color = "blue") + theme(legend.position = "none") +
                    ylab("Number of Cases") + xlab("Date")})

    output$table <- DT::renderDataTable({
        filtered_data()})
        
}
```




```r
app1 <- shinyApp(ui = ui1, server = server1, options = list(height = 1200))
app1
```
