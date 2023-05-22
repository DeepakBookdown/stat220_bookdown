# Class Activity 16


```r
# load the necessary libraries
library(tidyverse)
library(stringr)
library(polite)
library(rvest)
```


## Group Activity 1



```r
url <- 'https://www.imdb.com/search/title/?groups=best_picture_winner&sort=year,desc&count=100&view=advanced'
webpage <- bow(url) %>% scrape()
```


As seen in the slides, we can extract the movie titles using the `.lister-item-header a` css selector.


```r
title_data <- webpage %>% 
  html_nodes(css = ".lister-item-header a") %>% 
  html_text()
```


Now, lets scrape other elements of the webpage one by one using the selector gadget tool.

### a. Use the selector gadget tool to find the CSS for extracting year the movie came out. 

- Tidy the data
  + Using `parse_number()`
  + Using any regex



<details>
<summary class="answer">Click for answer</summary>



```r
year_data <- webpage %>% 
  html_nodes(css = '.text-muted.unbold') %>% 
  html_text() %>%
  parse_number()

year_data1 <- webpage %>% 
  html_nodes(css = '.text-muted.unbold') %>% 
  html_text() %>% 
  str_extract_all("[0-9]+") %>% 
  unlist() %>% 
  as.numeric()
```

</details>

### b. Next, parse the webpage to produce a vector of the descriptions. Tidy the description by removing unwanted regexes.


<details>
<summary class="answer">Click for answer</summary>





```r
description_data <- webpage %>% 
  html_nodes('.ratings-bar+ .text-muted') %>% 
  html_text() %>% 
  str_trim()
head(description_data,3)
```

```
[1] "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led."                                                                      
[2] "As a CODA (Child of Deaf Adults) Ruby is the only hearing person in her deaf family. When the family's fishing business is threatened, Ruby finds herself torn between pursuing her passion at Berklee College of Music and her fear of abandoning her parents."
[3] "A woman in her sixties, after losing everything in the Great Recession, embarks on a journey through the American West, living as a van-dwelling modern-day nomad."                                                                                             
```

</details>


### c. Now, parse the runtime data by following similar tools used for extracting year.


<details>
<summary class="answer">Click for answer</summary>




```r
runtime_data <- webpage %>% 
  html_nodes('.runtime') %>% 
  html_text() %>% 
  parse_number()
head(runtime_data)
```

```
[1] 139 111 107 132 130 123
```

</details>


### d. Do the same for getting the ratings data using an appropriate selector.


<details>
<summary class="answer">Click for answer</summary>




```r
rating_data <- webpage %>% 
  html_nodes('.ratings-imdb-rating') %>% 
  html_text() %>% 
  as.numeric()
```

</details>


### e. Finally, get the number of votes following similar tools


<details>
<summary class="answer">Click for answer</summary>




```r
votes_data <- webpage %>% 
  html_nodes('.sort-num_votes-visible span:nth-child(2)') %>% 
  html_text() %>% 
  parse_number()
```


</details>


We can combine all the information we scraped to produce a nice table that we ca use for further analysis. Please run the following code, once you are done with the prior codes.



<details>
<summary class="answer">Click for answer</summary>




```r
movies_df <- data.frame(Year = year_data,
                      Title = title_data,
                      Description = description_data, 
                      Runtime = runtime_data,
                      Rating = rating_data,
                      Votes = votes_data) %>% as_tibble()
movies_df %>% knitr::kable()
```



| Year|Title                                           |Description                                                                                                                                                                                                                                                     | Runtime| Rating|   Votes|
|----:|:-----------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------:|------:|-------:|
| 2022|Everything Everywhere All at Once               |A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.                                                                       |     139|    7.8|  445069|
| 2021|CODA                                            |As a CODA (Child of Deaf Adults) Ruby is the only hearing person in her deaf family. When the family's fishing business is threatened, Ruby finds herself torn between pursuing her passion at Berklee College of Music and her fear of abandoning her parents. |     111|    8.0|  145647|
| 2020|Nomadland                                       |A woman in her sixties, after losing everything in the Great Recession, embarks on a journey through the American West, living as a van-dwelling modern-day nomad.                                                                                              |     107|    7.3|  170226|
| 2019|Parasite                                        |Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.                                                                                                                     |     132|    8.5|  852094|
| 2018|Green Book                                      |A working-class Italian-American bouncer becomes the driver for an African-American classical pianist on a tour of venues through the 1960s American South.                                                                                                     |     130|    8.2|  517894|
| 2017|The Shape of Water                              |At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity.                                                                                                       |     123|    7.3|  431758|
| 2016|Moonlight                                       |A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.                                                                                            |     111|    7.4|  317800|
| 2015|Spotlight                                       |The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.                                                                   |     129|    8.1|  481652|
| 2014|Birdman or (The Unexpected Virtue of Ignorance) |A washed-up superhero actor attempts to revive his fading career by writing, directing, and starring in a Broadway production.                                                                                                                                  |     119|    7.7|  644926|
| 2013|12 Years a Slave                                |In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery.                                                                                                                                    |     134|    8.1|  715060|
| 2012|Argo                                            |Acting under the cover of a Hollywood producer scouting a location for a science fiction film, a CIA agent launches a dangerous operation to rescue six Americans in Tehran during the U.S. hostage crisis in Iran in 1979.                                     |     120|    7.7|  624414|
| 2011|The Artist                                      |An egomaniacal film star develops a relationship with a young dancer against the backdrop of Hollywood's silent era.                                                                                                                                            |     100|    7.9|  244734|
| 2010|The King's Speech                               |The story of King George VI, his unexpected ascension to the throne of the British Empire in 1936, and the speech therapist who helped the unsure monarch overcome his stammer.                                                                                 |     118|    8.0|  691438|
| 2008|The Hurt Locker                                 |During the Iraq War, a Sergeant recently assigned to an army bomb squad is put at odds with his squad mates due to his maverick way of handling his work.                                                                                                       |     131|    7.5|  460834|
| 2008|Slumdog Millionaire                             |A Mumbai teenager reflects on his life after being accused of cheating on the Indian version of "Who Wants to be a Millionaire?".                                                                                                                               |     120|    8.0|  858121|
| 2007|No Country for Old Men                          |Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.                                                                                                                    |     122|    8.2| 1000169|
| 2006|The Departed                                    |An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.                                                                                                                                     |     151|    8.5| 1354417|
| 2004|Million Dollar Baby                             |Frankie, an ill-tempered old coach, reluctantly agrees to train aspiring boxer Maggie. Impressed with her determination and talent, he helps her become the best and the two soon form a close bond.                                                            |     132|    8.1|  699397|
| 2004|Crash                                           |Los Angeles citizens with vastly separate lives collide in interweaving stories of race, loss and redemption.                                                                                                                                                   |     112|    7.7|  442206|
| 2003|The Lord of the Rings: The Return of the King   |Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.                                                                                                              |     201|    9.0| 1884757|
| 2002|Chicago                                         |Two death-row murderesses develop a fierce rivalry while competing for publicity, celebrity, and a sleazy lawyer's attention.                                                                                                                                   |     113|    7.2|  235529|
| 2001|A Beautiful Mind                                |After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.                                                                                                                         |     135|    8.2|  949429|
| 2000|Gladiator                                       |A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.                                                                                                                               |     155|    8.5| 1534241|
| 1999|American Beauty                                 |A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.                                                                                                                                          |     122|    8.3| 1172639|
| 1998|Shakespeare in Love                             |The world's greatest ever playwright, William Shakespeare, is young, out of ideas and short of cash, but meets his ideal woman and is inspired to write one of his most famous plays.                                                                           |     123|    7.1|  229214|
| 1997|Titanic                                         |A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.                                                                                                                                       |     194|    7.9| 1217959|
| 1996|The English Patient                             |At the close of World War II, a young nurse tends to a badly-burned plane crash victim. His past is shown in flashbacks, revealing an involvement in a fateful love affair.                                                                                     |     162|    7.4|  194797|
| 1995|Braveheart                                      |Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.                                                                                                                         |     178|    8.4| 1054774|
| 1994|Forrest Gump                                    |The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.                  |     142|    8.8| 2133129|
| 1993|Schindler's List                                |In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.                                                                              |     195|    9.0| 1383459|
| 1992|Unforgiven                                      |Retired Old West gunslinger William Munny reluctantly takes on one last job, with the help of his old partner Ned Logan and a young man, The "Schofield Kid."                                                                                                   |     130|    8.2|  420458|
| 1991|The Silence of the Lambs                        |A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.                                                                                             |     118|    8.6| 1465637|
| 1990|Dances with Wolves                              |Lieutenant John Dunbar, assigned to a remote western Civil War outpost, finds himself engaging with a neighbouring Sioux settlement, causing him to question his own purpose.                                                                                   |     181|    8.0|  276094|
| 1989|Driving Miss Daisy                              |An old Jewish woman and her African-American chauffeur in the American South have a relationship that grows and improves over the years.                                                                                                                        |      99|    7.3|  113522|
| 1988|Rain Man                                        |After a selfish L.A. yuppie learns his estranged father left a fortune to an autistic-savant brother in Ohio that he didn't know existed, he absconds with his brother and sets out across the country, hoping to gain a larger inheritance.                    |     133|    8.0|  526238|
| 1987|The Last Emperor                                |Dramatization of China's last emperor, Puyi.                                                                                                                                                                                                                    |     163|    7.7|  107102|
| 1986|Platoon                                         |Chris Taylor, a neophyte recruit in Vietnam, finds himself caught in a battle of wills between two sergeants, one good and the other evil. A shrewd examination of the brutality of war and the duality of man in conflict.                                     |     120|    8.1|  422892|
| 1985|Out of Africa                                   |In 20th-century colonial Kenya, a Danish baroness/plantation owner has a passionate love affair with a free-spirited big-game hunter.                                                                                                                           |     161|    7.1|   83067|
| 1984|Amadeus                                         |The life, success and troubles of Wolfgang Amadeus Mozart, as told by Antonio Salieri, the contemporaneous composer who was deeply jealous of Mozart's talent and claimed to have murdered him.                                                                 |     160|    8.4|  409335|
| 1983|Terms of Endearment                             |Follows hard-to-please Aurora looking for love and her daughter's family problems.                                                                                                                                                                              |     132|    7.4|   62720|
| 1982|Gandhi                                          |The life of the lawyer who became the famed leader of the Indian revolts against the British rule through his philosophy of nonviolent protest.                                                                                                                 |     191|    8.0|  236125|
| 1981|Chariots of Fire                                |Two British track athletes, one a determined Jew and the other a devout Christian, are driven to win in the 1924 Olympics as they wrestle with issues of pride and conscience.                                                                                  |     125|    7.1|   63389|
| 1980|Ordinary People                                 |The accidental death of the older son of an affluent family deeply strains the relationships among the bitter mother, the good-natured father and the guilt-ridden younger son.                                                                                 |     124|    7.7|   54328|
| 1979|Kramer vs. Kramer                               |After his wife leaves him, a work-obsessed Manhattan advertising executive is forced to learn long-neglected parenting skills, but a heated custody battle over the couple's young son deepens the wounds left by the separation.                               |     105|    7.8|  149361|
| 1978|The Deer Hunter                                 |An in-depth examination of the ways in which the Vietnam War impacts and disrupts the lives of several friends in a small steel mill town in Pennsylvania.                                                                                                      |     183|    8.1|  346402|
| 1977|Annie Hall                                      |Alvy Singer, a divorced Jewish comedian, reflects on his relationship with ex-lover Annie Hall, an aspiring nightclub singer, which ended abruptly just like his previous marriages.                                                                            |      93|    8.0|  270203|
| 1976|Rocky                                           |A small-time Philadelphia boxer gets a supremely rare chance to fight the world heavyweight champion in a bout in which he strives to go the distance for his self-respect.                                                                                     |     120|    8.1|  597477|
| 1975|One Flew Over the Cuckoo's Nest                 |In the Fall of 1963, a Korean War veteran and criminal pleads insanity and is admitted to a mental institution, where he rallies up the scared patients against the tyrannical nurse.                                                                           |     133|    8.7| 1027636|
| 1974|The Godfather Part II                           |The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.                                                                                            |     202|    9.0| 1299217|
| 1973|The Sting                                       |Two grifters team up to pull off the ultimate con.                                                                                                                                                                                                              |     129|    8.3|  269293|
| 1972|The Godfather                                   |Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.                                                                 |     175|    9.2| 1906455|
| 1971|The French Connection                           |A pair of NYPD detectives in the Narcotics Bureau stumble onto a heroin smuggling ring based in Marseilles, but stopping them and capturing their leaders proves an elusive goal.                                                                               |     104|    7.7|  127472|
| 1970|Patton                                          |The World War II phase of the career of controversial American general George S. Patton.                                                                                                                                                                        |     172|    7.9|  104939|
| 1969|Midnight Cowboy                                 |A naive hustler travels from Texas to New York City to seek personal fortune, finding a new friend in the process.                                                                                                                                              |     113|    7.8|  114914|
| 1968|Oliver!                                         |After being sold to a mortician, young orphan Oliver Twist runs away and meets a group of boys trained to be pickpockets by an elderly mentor in 1830s London.                                                                                                  |     153|    7.4|   39960|
| 1967|In the Heat of the Night                        |A black Philadelphia police detective is mistakenly suspected of a local murder while passing through a racially hostile Mississippi town, and after being cleared is reluctantly asked by the police chief to investigate the case.                            |     110|    7.9|   79392|
| 1966|A Man for All Seasons                           |The story of Sir Thomas More, who stood up to King Henry VIII when the King rejected the Roman Catholic Church to obtain a divorce and remarry.                                                                                                                 |     120|    7.7|   35842|
| 1965|The Sound of Music                              |A young novice is sent by her convent in 1930s Austria to become a governess to the seven children of a widowed naval officer.                                                                                                                                  |     172|    8.1|  244263|
| 1964|My Fair Lady                                    |In 1910s London, snobbish phonetics professor Henry Higgins agrees to a wager that he can make crude flower girl, Eliza Doolittle, presentable in high society.                                                                                                 |     170|    7.8|   98365|
| 1963|Tom Jones                                       |The romantic and chivalrous adventures of adopted bastard Tom Jones in 18th-century England.                                                                                                                                                                    |     129|    6.4|   13702|
| 1962|Lawrence of Arabia                              |The story of T.E. Lawrence, the English officer who successfully united and led the diverse, often warring, Arab tribes during World War I in order to fight the Turks.                                                                                         |     218|    8.3|  300784|
| 1961|West Side Story                                 |Two youngsters from rival New York City gangs fall in love, but tensions between their respective friends build toward tragedy.                                                                                                                                 |     153|    7.6|  117342|
| 1960|The Apartment                                   |A Manhattan insurance clerk tries to rise in his company by letting its executives use his apartment for trysts, but complications and a romance of his own ensue.                                                                                              |     125|    8.3|  186391|
| 1959|Ben-Hur                                         |After a Jewish prince is betrayed and sent into slavery by a Roman friend in 1st-century Jerusalem, he regains his freedom and comes back for revenge.                                                                                                          |     212|    8.1|  244946|
| 1958|Gigi                                            |Weary of the conventions of Parisian society, a rich playboy and a youthful courtesan-in-training enjoy a platonic friendship which may not stay platonic for long.                                                                                             |     115|    6.6|   23696|
| 1957|The Bridge on the River Kwai                    |British POWs are forced to build a railway bridge across the river Kwai for their Japanese captors in occupied Burma, not knowing that the allied forces are planning a daring commando raid through the jungle to destroy it.                                  |     161|    8.1|  225444|
| 1956|Around the World in 80 Days                     |A Victorian Englishman bets that with the new steamships and railways he can circumnavigate the globe in eighty days.                                                                                                                                           |     175|    6.7|   28605|
| 1955|Marty                                           |A middle-aged butcher and a school teacher who have given up on the idea of love meet at a dance and fall for each other.                                                                                                                                       |      90|    7.7|   25524|
| 1954|On the Waterfront                               |An ex-prize fighter turned New Jersey longshoreman struggles to stand up to his corrupt union bosses, including his older brother, as he starts to connect with the grieving sister of one of the syndicate's victims.                                          |     108|    8.1|  158372|
| 1953|From Here to Eternity                           |At a U.S. Army base in 1941 Hawaii, a private is cruelly punished for not boxing on his unit's team, while his commanding officer's wife and top aide begin a tentative affair.                                                                                 |     118|    7.6|   48802|
| 1952|The Greatest Show on Earth                      |The dramatic lives of trapeze artists, a clown, and an elephant trainer are told against a background of circus spectacle.                                                                                                                                      |     152|    6.6|   15347|
| 1951|An American in Paris                            |Three friends struggle to find work in Paris. Things become more complicated when two of them fall in love with the same woman.                                                                                                                                 |     114|    7.2|   35236|
| 1950|All About Eve                                   |A seemingly timid but secretly ruthless ingénue insinuates herself into the lives of an aging Broadway star and her circle of theater friends.                                                                                                                  |     138|    8.2|  133937|
| 1949|All the King's Men                              |The rise and fall of a corrupt politician, who makes his friends richer and retains power by dint of a populist appeal.                                                                                                                                         |     110|    7.4|   15768|
| 1948|Hamlet                                          |Prince Hamlet struggles over whether or not he should kill his uncle, whom he suspects has murdered his father, the former king.                                                                                                                                |     154|    7.6|   17667|
| 1947|Gentleman's Agreement                           |A reporter pretends to be Jewish in order to cover a story on anti-Semitism, and personally discovers the true depths of bigotry and hatred.                                                                                                                    |     118|    7.2|   17127|
| 1946|The Best Years of Our Lives                     |Three World War II veterans, two of them traumatized or disabled, return home to the American midwest to discover that they and their families have been irreparably changed.                                                                                   |     170|    8.1|   67012|
| 1945|The Lost Weekend                                |The desperate life of a chronic alcoholic is followed through a four-day drinking bout.                                                                                                                                                                         |     101|    7.9|   38613|
| 1944|Going My Way                                    |When young Father O'Malley arrives at St. Dominic's, old Father Fitzgibbon doesn't think much of the church's newest member.                                                                                                                                    |     126|    7.0|   12593|
| 1942|Casablanca                                      |A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.                                                                                               |     102|    8.5|  582889|
| 1942|Mrs. Miniver                                    |A British family struggles to survive the first months of World War II.                                                                                                                                                                                         |     134|    7.6|   18578|
| 1941|How Green Was My Valley                         |At the turn of the century in a Welsh mining village, the Morgans, he stern, she gentle, raise coal-mining sons and hope their youngest will find a better life.                                                                                                |     118|    7.7|   25310|
| 1940|Rebecca                                         |A self-conscious woman juggles adjusting to her new role as an aristocrat's wife and avoiding being intimidated by his first wife's spectral presence.                                                                                                          |     130|    8.1|  140667|
| 1939|Gone with the Wind                              |American motion picture classic in which a manipulative woman and a roguish man conduct a turbulent romance during the Civil War and Reconstruction periods.                                                                                                    |     238|    8.2|  322131|
| 1938|You Can't Take It with You                      |The son of a snobbish Wall Street banker becomes engaged to a woman from a good-natured but decidedly eccentric family, not realizing that his father is trying to force her family from their home for a real estate development.                              |     126|    7.8|   26770|
| 1937|The Life of Emile Zola                          |The biopic of the famous French muckraking writer and his involvement in fighting the injustice of the Dreyfus Affair.                                                                                                                                          |     116|    7.2|    8619|
| 1936|The Great Ziegfeld                              |The ups and downs of Florenz Ziegfeld Jr., famed producer of extravagant stage revues, are portrayed.                                                                                                                                                           |     176|    6.6|    8602|
| 1935|Mutiny on the Bounty                            |First mate Fletcher Christian leads a revolt against his sadistic commander, Captain Bligh, in this classic seafaring adventure, based on the real-life 1789 mutiny.                                                                                            |     132|    7.6|   23951|
| 1934|It Happened One Night                           |A renegade reporter trailing a young runaway heiress for a big story joins her on a bus heading from Florida to New York, and they end up stuck with each other when the bus leaves them behind at one of the stops.                                            |     105|    8.1|  107150|
| 1933|Cavalcade                                       |A portrayal of the triumphs and tragedies of two English families, the upper-crust Marryots and the working-class Bridgeses, from 1899 to 1933.                                                                                                                 |     112|    5.8|    5562|
| 1932|Grand Hotel                                     |A group of very different individuals staying at a luxurious hotel in Berlin deal with each of their respective dramas.                                                                                                                                         |     112|    7.3|   20126|
| 1931|Cimarron                                        |A newspaper editor settles in an Oklahoma boom town with his reluctant wife at the end of the nineteenth century.                                                                                                                                               |     123|    5.8|    6591|
| 1930|All Quiet on the Western Front                  |A German youth eagerly enters World War I, but his enthusiasm wanes as he gets a firsthand view of the horror.                                                                                                                                                  |     152|    8.1|   65441|
| 1929|The Broadway Melody                             |A pair of sisters from the vaudeville circuit try to make it big time on Broadway, but matters of the heart complicate the attempt.                                                                                                                             |     100|    5.6|    7622|
| 1927|Wings                                           |Two young men, one rich, one middle class, who are in love with the same woman, become fighter pilots in World War I.                                                                                                                                           |     144|    7.6|   13678|
| 1927|Sunrise                                         |A sophisticated city woman seduces a farmer and convinces him to murder his wife and join her in the city, but he ends up rekindling his romance with his wife when he changes his mind at the last moment.                                                     |      94|    8.1|   52305|

</details>

-----------------------------------------------------------

## Group Activity 2

### a. Scrape the names, scores, and years of most popular TV shows on IMDB:
[www.imdb.com/chart/tvmeter](http://www.imdb.com/chart/tvmeter). Create a data frame called `tvshows` with four variables 
(`rank`, `name`, `score`, `year`)  

Note: 

It's easier to use the `SelectorGadget` and choose the CSS selectors wisely. Otherwise, you'll have more cleaning to do after scraping.


<details>
<summary class="answer">Click for answer</summary>




```r
page <- read_html("http://www.imdb.com/chart/tvmeter")
name <- page %>%
  html_nodes(".titleColumn a") %>%
  html_text()

ranks <- page %>%
  html_nodes(".velocity") %>%
  html_text() %>%
  str_extract("\\d+") %>%
  as.numeric()

scores <-  page %>%
  html_nodes(".imdbRating") %>%
  html_text() %>%
  str_extract("\\d+.\\d+") %>%
  as.numeric()

# If you don't use the gadget selector carefully, 
# more string manipulation is needed here

years <- page %>%
  html_nodes("a+ .secondaryInfo") %>%
  html_text() %>%
  str_extract("\\d+") %>%
  as.numeric()
```



```r
tvshows <- tibble(
  rank = ranks,
  name = name,
  score = scores,
  year = years
)

tvshows
```

```
# A tibble: 100 × 4
    rank name                                score  year
   <dbl> <chr>                               <dbl> <dbl>
 1     1 Queen Charlotte: A Bridgerton Story   7    2023
 2     2 Silo                                  8.3  2023
 3     3 Succession                            8.8  2018
 4     4 Ted Lasso                             8.8  2020
 5     5 The Diplomat                          8.1  2023
 6     6 Love & Death                          7.6  2023
 7     7 Citadel                               6.2  2023
 8     8 Queen Cleopatra                       1    2023
 9     9 Barry                                 8.4  2018
10    10 The Marvelous Mrs. Maisel             8.7  2017
# … with 90 more rows
```


</details>




-----------------------------------------------------------

## Group Activity 3


### a. Scrape the first table in `List_of_NASA_missions` wiki page. Additionally, use `janitor::clean_names()` to clean the column names and store the resulting table as `NASA_missions.csv` in your working folder.



<details>
<summary class="answer">Click for answer</summary>





```r
# extract data from 
# the first table on the page
wiki_NASA <- "https://en.wikipedia.org/wiki/List_of_NASA_missions"
NASA_missions <- bow(wiki_NASA) %>%scrape() %>% 
  html_nodes("table") %>% 
  .[[1]] %>% 
  html_table() %>% 
  janitor::clean_names()
```



```r
# Exporting data to CSV
readr::write_csv(NASA_missions, "NASA_missions.csv")
```

</details>




### b. Now, write a code snippet to scrape all the URLs from the anchor tags `(<a>)` on a given Wikipedia page, convert the relative URLs to absolute URLs, and store the results in a tibble and save it as `websites.csv` in your working folder.



<details>
<summary class="answer">Click for answer</summary>





```r
# extract URLs
websites <-  bow(wiki_NASA) %>% scrape() %>% 
  html_nodes("a") %>%
  html_attr("href") %>% 
  url_absolute("https://en.wikipedia.org/") 
```




```r
# Exporting data to CSV
readr::write_csv(websites, "websites.csv")
```


</details>



