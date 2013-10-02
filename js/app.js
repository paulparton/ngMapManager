var app = angular.module('mapManager', ['ngRoute', 'ui.map']);

app.controller('MapCtrl', ['$scope', function ($scope) {

    var markersArray = [],
        arrPlaces = [
            {
                title: 'Marker 1',
                description: 'Marker 1 content',
                lat: '-34.0329',
                lng: '151.0531'
            },
            {
                title: 'Marker 2',
                description: 'Marker 2 content',
                lat: '-34.033030037903906',
                lng: '151.05962991714478'
            },
            {
                title: 'Marker 3',
                description: 'Marker 3 content',
                lat: '-34.03274552068691',
                lng: '151.06533765792847'
            },
            {
                title: 'Marker 4',
                description: 'Marker 4 content',
                lat: '-34.03267439123358',
                lng: '151.07061624526978'
            },
            {
                title: 'Marker 5',
                description: 'Marker 5 content',
                lat: '-34.03448817366513',
                lng: '151.07598066329956'
            }
        ];

    $scope.markers = [];

    $scope.triggerMarkerOpen = function(arg){

        google.maps.event.trigger(arg, 'click');


    };

    $scope.mapOptions = {
        center: new google.maps.LatLng(-34.0329, 151.0655),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var infoContent = document.createElement("div");
    infoContent.id = "infoWindowContent";

    var infoWindow = new google.maps.InfoWindow({
        content: infoContent
    });

    var displayInfo = function(message, marker){
        infoWindow.close();

        infoContent.innerHTML = message;

        infoWindow.open($scope.myMap, marker);

    };

    var prepMarker = function(marker){

        $scope.markers.push(marker);

        google.maps.event.addListener(marker, "click", function(e){

              displayInfo(marker.title, marker);

        });


    };

    $scope.markers = [];

    $scope.$watch('myMap', function(map) {
        if (map) {

            var i, o;

            for (i=0,o=arrPlaces.length;i<o;i+=1){
                console.log(arrPlaces[i].lat + ", " + arrPlaces[i].lng);

                var position = {};
                position.lat = parseFloat(arrPlaces[i].lat);
                position.lng = parseFloat(arrPlaces[i].lng);

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(position.lat, position.lng),
                    title: arrPlaces[i].title,
                    description:arrPlaces[i].description

                });

                prepMarker(marker);

                marker.setMap($scope.myMap);
                marker.setAnimation(google.maps.Animation.DROP);

                //$scope.markers.push(marker);

                console.log($scope.markers);
            }



        }
    });

    $scope.addMarker = function($event, $params){

        console.log($params[0].latLng);

        marker = new google.maps.Marker({
            position: $params[0].latLng,
            title: "work dammit"
        });

        marker.setMap($scope.myMap);

    };

    function showOverlays() {
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap($scope.myMap);
            }
        }
    }

    var myPosition = new google.maps.LatLng(-34.032926,151.065515);


}]);


