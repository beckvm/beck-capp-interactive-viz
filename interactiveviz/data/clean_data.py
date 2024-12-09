import pandas as pd
import geopandas as gpd

# Load tract data for DC and Philadelphia
tract_data = gpd.read_file("dc_phl_tracts_2020.geojson")

# Load demographic and economic data
demographic_data = pd.read_csv("interactive_viz_data.csv")

# Extract only the tracts needed
GISJOINDC1 = "G1100010005801"
GISJOINDC2 = "G1100010005802"
GISJOINPHL = "G4201010000200"

tract_data = tract_data[tract_data["GISJOIN"].isin([GISJOINDC1, GISJOINDC2, 
                                                    GISJOINPHL])]

# Extract only the variables needed and normalize dollars to 2020 using the
# Bureau of Labor Statistics CPI for Housing
# https://data.bls.gov/pdq/SurveyOutputServlet
demographic_data = demographic_data.loc[:, ["GISJOIN2020", "YEAR", "TOTAL_POP", 
                                            "RACE_WHITE", "RACE_AAPI", "PROP_AAPI", 
                                            "MED_HH_INCOME", "COLLEGE_DEGREE"]]

demographic_data["PROP_WHITE"] = demographic_data["RACE_WHITE"]/demographic_data["TOTAL_POP"]
demographic_data["PROP_DEGREE"] = demographic_data["COLLEGE_DEGREE"]/demographic_data["TOTAL_POP"]

demographic_data = demographic_data.round({"PROP_AAPI": 4, "PROP_WHITE": 4, 
                                           "PROP_DEGREE": 4})

CPI_1980 = 81.1
CPI_1990 = 128.5
CPI_2000 = 169.6
CPI_2012 = 222.715
CPI_2022 = 300.803
CPI_2023 = 320.172

def adjust_inflation(original_value, year):
    current_CPI = CPI_2023
    if (year == "1980"):
        original_CPI = CPI_1990
    elif (year == "1990"):
        original_CPI = CPI_1990
    elif (year == "2000"):
        original_CPI = CPI_2000
    elif (year == "2008-2012"):
        original_CPI = CPI_2012
    else:
        original_CPI = CPI_2022
    
    adjusted_value = original_value * (current_CPI / original_CPI)

    return adjusted_value

demographic_data["MED_INCOME_ADJ"] = demographic_data.apply(lambda x: adjust_inflation(x["MED_HH_INCOME"], x["YEAR"]), axis=1)
demographic_data = demographic_data.round({"MED_INCOME_ADJ": 2})
demographic_data = demographic_data.rename(columns = {"GISJOIN2020": "GISJOIN"})

# Split data into separate years
dem_data_1980 = demographic_data[demographic_data["YEAR"] == "1980"]
dem_data_1990 = demographic_data[demographic_data["YEAR"] == "1990"]
dem_data_2000 = demographic_data[demographic_data["YEAR"] == "2000"]

temp_2010 = demographic_data[demographic_data["YEAR"] == "2010"]
temp_2010 = temp_2010.dropna(axis = "columns")
temp_2020 = demographic_data[demographic_data["YEAR"] == "2020"]
temp_2020 = temp_2020.dropna(axis = "columns")
temp_2008 = demographic_data[demographic_data["YEAR"] == "2008-2012"]
temp_2008 = temp_2008.dropna(axis = "columns")
temp_2008 = temp_2008[["GISJOIN", "TOTAL_POP","MED_HH_INCOME", "COLLEGE_DEGREE", 
                       "PROP_DEGREE", "MED_INCOME_ADJ"]]
temp_2018 = demographic_data[demographic_data["YEAR"] == "2018-2022"]
temp_2018 = temp_2018.dropna(axis = "columns")
temp_2018 = temp_2018[["GISJOIN", "TOTAL_POP","MED_HH_INCOME", "COLLEGE_DEGREE", 
                       "PROP_DEGREE", "MED_INCOME_ADJ"]]

dem_data_2010 = pd.merge(temp_2010, temp_2008, on = "GISJOIN", how = "outer", suffixes = (None, "_ACS"))
dem_data_2020 = pd.merge(temp_2020, temp_2018, on = "GISJOIN", how = "outer", suffixes = (None, "_ACS"))

# Merge demographic/economic and geographic data
data_1980 = tract_data.merge(dem_data_1980, on = "GISJOIN")
data_1990 = tract_data.merge(dem_data_1990, on = "GISJOIN")
data_2000 = tract_data.merge(dem_data_2000, on = "GISJOIN")
data_2010 = tract_data.merge(dem_data_2010, on = "GISJOIN")
data_2020 = tract_data.merge(dem_data_2020, on = "GISJOIN")

# Extract only Chinatown neighborhood boundary from Philadelphia neighborhood
# boundaries data

# Load Philadelphia neighborhoods
phl_neighborhood_boundaries = gpd.read_file("phl_neighborhood_boundaries.geojson")
phl_chinatown_boundary = phl_neighborhood_boundaries[phl_neighborhood_boundaries["NAME"] == "CHINATOWN"]

# Write out files to geojson
data_1980.to_file("final_data_1980.geojson", driver = "GeoJSON")
data_1990.to_file("final_data_1990.geojson", driver = "GeoJSON")
data_2000.to_file("final_data_2000.geojson", driver = "GeoJSON")
data_2010.to_file("final_data_2010.geojson", driver = "GeoJSON")
data_2020.to_file("final_data_2020.geojson", driver = "GeoJSON")
phl_chinatown_boundary.to_file("phl_chinatown_boundary.geojson", driver = "GeoJSON")
