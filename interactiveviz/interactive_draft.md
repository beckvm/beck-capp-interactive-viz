# "No Arena in Chinatown": Learning from a Lost Community

Tori Beck

## What is your current goal? Has it changed since the proposal?
My current goal is to show the demographic and economic changes from 1980-2020 in the  
DC Chinatown area and Philadelphia Chinatown to demonstrate effects of building  
large stadiums on nearby communities.  My overall goal hasn't changed, but I've decided  
to focus more on displaying data I have rather than a simulation for Philadelphia, as  
I haven't figured out a reasonable and meaningful way to simulate future change.  

## Are there data challenges you are facing? Are you currently depending on mock data?
I am not using mock data and did not have issues retrieving data.  
However, I have been having a little trouble fully understanding geojson integration 
with javascript and leaflet.  I have a geojson feature collection with census tracts and a csv with  
population, housing, and rent data, but I've had trouble figuring out how to  
combine them.  Right now, I manually pulled out the geographic data for the tracts I'm  
looking at for each year and added properties, and it is directly in my html file, but this seems  
like very bad practice.  Also, I might want to add data for surrounding tracts to  
give a little context, but this would be very difficult with my current set up.  

## Walk us through an interaction, either in words or you can record a quick 2-3 minute video.
Right now, the main interaction is a timeline that changes two different leaflet choropleth  
maps.  We can see the change in proportion of Asian residents in both DC and Philadelphia's  
Chinatown area over five decades.  The tract is highlighted as you hover over it and the  
percentage shows up in an info box.  There is a dropdown menu to choose between population,  
median housing value, and median gross rent, but this doesn't currently work, as I'm  
still trying to figure out how to integrate it with leaflet.  When someone chooses an option  
the map will change and two charts will change to show the overall 1980-2020 change  
in that variable for a higher level look at the data.  This is taking longer than expected  
as I had trouble with the timeline and quirks with leaflet that took me a while to learn.  

## Include a _numbered_ list of questions for us to respond to.

1. What code should be included in the index.html vs in separate javascript files that are  
later referenced?  

2. Should geojson files that need to be extended with more property information just be  
edited like a dictionary?  Can I loop through each feature and add another property or  
is there a better way to do that?

3. Leaflet doesn't really like that there are two maps and currently I have to write two  
different functions for each map, even though they do the exact same thing which seems redundant.  I tried making one map and just setting the view differently, but I couldn't  
get this to work either.  Is there a way to avoid this redundancy?