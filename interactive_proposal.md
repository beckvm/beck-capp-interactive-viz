# Interactive project proposal: "No Arena in Chinatown"
Tori Beck

## Description
Topic: Demographic change in DC and Philadelphia's Chinatown neighborhood

Philadelphia city officials are currently considering a proposal for a $1.3 billion basketball 
arena for the Philadelphia 76ers to be built on the edge of the Chinatown neighborhood.  While the developers
and city officials promise economic growth for the area, Chinatown residents and many others in Philadelphia
believe that the arena will only serve the billionare investors and developers while destroying the vibrant Chinatown community.
Activists have successfully fended off large corporate development projects around Chinatown in the past, including a 
baseball stadium, and are once again working to stop the construction of the 76ers arena.  They assert that there is 
little evidence to support positive growth for the Chinatown community or Philadelphia as a whole (the arena owners will not be paying any property taxes).  Activists point to
Washington DC's Chinatown, a once vibrant neighborhood full of small businesses and Asian immigrants that was
effectively destroyed by similar development projects. Following the construction of a convention center and 
Capital One Arena in the Chinatown area in 1997, residents were rapidly displaced, priced out of their homes 
or evicted, and the proportion of Asian people able to live in the area dwindled. Small businesses could not longer
operate and were replaced by large national corporations.  In this project, I'd like to visualize this
demographic and economic change over time in Washington DC, and then simulate a similarly devastating blow
to Philadelphia's Chinatown community might look like.

More info:
https://apnews.com/article/philadelphia-76ers-arena-chinatown-eb67de1673f5483d4b51762167e63d4f
https://www.historians.org/perspectives-article/the-rise-and-fall-of-dcs-chinatown-december-2017/

## Data
I'll be using US Census data from 1980-2020.  While this time range of data was a bit hard to find on the census website, 
IPUMS National Historical Geographic Information System has made time series tables and geographic data easily 
accessible from all four decennial censuses (1980, 1990, 2000, 2010, 2020) and ACS 5-year surveys (2006-2010, 2011-2015, 2016-2020).
I was able to download this data which is at the census tract level for every time period.  Currently I have data on racial demographics,
income, and median housing values.
https://www.nhgis.org/data-availability#time-series
https://data2.nhgis.org/main

## Example visualizations

Example 1: https://pudding.cool/2017/01/shape-of-slavery/
I want to visualize population change in a similar way here, but it would be on a much smaller scale.
I like the way that the map changes and moves through time as you scroll through the text on the right.  I want to have a similar format where
there is a main data visualization that integrates with the text and other content on the side.  For my visualization, I imagine a main interactive map that changes as the sidebar content changes.  Users can choose which metric they are viewing on the map-- change in racial demographics, change in income, etc.  

Example 2: https://www.270towin.com/2024-simulation/
Similar to this election simulation, I'd like a simulation to run after pressing a button (such as "build arena") that simulates how demographics might shift if the 76ers arena built in Philadelphia's Chinatown.  This would be based off of the changes that DC saw and would show the change on
a map.  Additionally, I like that in this visualization there are statistics about the simulation in a chart below the electoral map.  I like this extra bit of information, so I'd like to incorporate it by displaying the actual demographic numbers in a table alongside the map, in addition to a simple chart like a bar graph that shows something like population proportions.  

Example 3: https://ourworldindata.org/grapher/covid-people-vaccinated-marimekko?time=2023-04-16
I want to use a similar timeline as this visualization where users can scroll through the decades and watch as the data changes.

I think this project fits best with Option A, a core interactive.  I'd like the two changing choropleth maps to be the main focus, with smaller
text and supplementary charts as supporting details.  The first map will be Washington DC's Chinatown.  The user can select between different metrics
and then click through each year.  As they do so, a small table or chart will update in the sidebar, displaying specific statistics.  When the user scrolls down, the map will change to Philadelphia and the user will interact in the same way.  Then, the user can simulate building the arena and see how the map changes in response.  

## Questions
1. Because I'm looking at a specific neighborhood in a city which doesn't have clearly defined borders, are there any best practices when it comes to defining the neighborhood or explaining which census tract I'm looking at?  For example, what is considered Washington DC's Chinatown is contained in tract 58, but the entire tract is not Chinatown.  Should I just make sure to specify this as context?
2. When it comes to simulating what changes might occur in Philadelphia's Chinatown, is there a simple but statistically sound way to do this?  Should I be allowing people to run multiple simulations or just present one hypothetical outcome?  Because this isn't a statistics project I don't want to spend too much time on it, but I also want to make sure I'm not presenting misinformation.
3. Because the US Census changed slightly in the questions asked and how information was collected (i.e. income information), in addition to data availability, in some cases I might be comparing decennial data to ACS 5-year estimates.  The Census website essentially says this can be done with caution, but I wanted to check that this was okay.
4. I haven't done a lot of work with maps before - what format does geographic data need to be in to create interactive choropleth maps?

## Mock-up
![interactive_viz_mockup](https://github.com/user-attachments/assets/9471ab83-1f37-4ff9-a255-08ba238754a9)

