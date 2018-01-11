ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init(){
        myMap = new ymaps.Map("map", {
            center: [59.93627589, 30.32139139],
            zoom: 16
        });

        myPlacemark = new ymaps.Placemark([59.93627589, 30.32139139]);

        myMap.geoObjects.add(myPlacemark);
    }
