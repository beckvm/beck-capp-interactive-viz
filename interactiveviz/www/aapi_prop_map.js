function generate_aapi_prop_map() {
    function getColorPop(p) {
        return p >= 0.8 ? "#800026":
            p > 0.7 ? "#bd0026":
            p > 0.6 ? "#e31a1c":
            p > 0.5 ? "#fc4e2a":
            p > 0.4 ? "#fd8d3c":
            p > 0.3 ? "#feb24c":
            p > 0.2 ? "#fed976":
            p > 0.1 ? "#ffeda0":
                        "#ffffcc" ;
    };
    function popStyle (feature) {
        return {
            fillColor: getColorPop(feature.properties.PROP_AAPI),
            fillOpacity: 0.8,
            weight: 3,
            opacity: 1,
            color: "#FFFAE3",
            dashArray: "3"
        };
    };
    var geojsonDC;
    var geojsonPhl;
    function highlightFeatureDC(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 5,
            color: "#4D2C00",
            dashArray: '',
            fillOpacity: 0.7
        });
        infoDC.update(layer.feature.properties);
        dcCTBound.bringToFront();
    }

    function highlightFeaturePhl(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 5,
            color: "#4D2C00",
            dashArray: '',
            fillOpacity: 0.7
        });
        infoPhl.update(layer.feature.properties);
        phlCTBound.bringToFront()
    }

    function resetHighlightDC(e) {
        geojsonDC.resetStyle(e.target);
        infoDC.update();;
    }

    function resetHighlightPhl(e) {
        geojsonPhl.resetStyle(e.target);
        infoPhl.update();
    }

    function onEachFeatureDC(feature, layer) {
        layer.on({
            mouseover: highlightFeatureDC,
            mouseout: resetHighlightDC,
        });
    };

    function onEachFeaturePhl(feature, layer) {
        layer.on({
            mouseover: highlightFeaturePhl,
            mouseout: resetHighlightPhl,
        });
    };

    var infoDC = L.control();
    infoDC.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); 
        this.update();
        return this._div;
    };
    infoDC.update = function (props, prop_name) {
        this._div.innerHTML = '<h4>AAPI Population</h4>' + (props ?
                    props.PROP_AAPI * 100 + "% of pop." : "Hover on Tract");
    };

    var infoPhl = L.control();
    infoPhl.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); 
        this.update();
        return this._div;
    };
    infoPhl.update = function (props) {
        this._div.innerHTML = '<h4>AAPI Population</h4>' + (props ?
                    props.PROP_AAPI * 100 + "% of pop." : "Hover on Tract");
    };



    var legendDC = L.control({position: 'bottomright'});
    legendDC.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades= [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
            labels = [];
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColorPop(grades[i]) + '"></i> ' +
                grades[i] * 100 + (grades[i + 1] * 100 ? '&ndash;' + grades[i + 1] * 100 +"%" + '<br>' : '%+');
        }
        return div;
    };
    legendDC.addTo(DCmap);

    var legendPhl = L.control({position: 'bottomright'});
    legendPhl.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'legend'),
        grades= [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
            labels = [];
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColorPop(grades[i]) + '"></i> ' +
                grades[i] * 100 + (grades[i + 1] * 100 ? '&ndash;' + grades[i + 1] * 100 +"%" + '<br>' : '%+');
        }
        return div;
    };
    legendPhl.addTo(phlmap);

    let allYears = {
        "1980": data1980,
        "1990": data1990,
        "2000": data2000,
        "2010": data2010,
        "2020": data2020
    };
    var slider = document.getElementById("yearSlider");
    geojsonDC = L.geoJson(data1980, {style: popStyle, 
        onEachFeature: onEachFeatureDC}).addTo(DCmap)
    geojsonPhl = L.geoJson(data1980, {style: popStyle,
        onEachFeature: onEachFeaturePhl
    }).addTo(phlmap)
    infoDC.addTo(DCmap);
    infoPhl.addTo(phlmap);
    slider.oninput = function() {
        DCmap.removeLayer(geojsonDC);
        phlmap.removeLayer(geojsonPhl);
        year = this.value
        geojsonDC = L.geoJson(allYears[year], {style: popStyle,
            onEachFeature: onEachFeatureDC
        }).addTo(DCmap);
        geojsonPhl = L.geoJson(allYears[year], {style: popStyle,
            onEachFeature: onEachFeaturePhl
        }).addTo(phlmap);
        dcCTBound.bringToFront();
        phlCTBound.bringToFront();
    };
    dcCTBound.bringToFront();
    phlCTBound.bringToFront();
}