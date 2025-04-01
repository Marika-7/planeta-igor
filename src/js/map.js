let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: { lat: 46.482629, lng: 30.729873 },
    zoom: 15,
    mapId: 'DEMO_MAP_ID',
  });

  const markers = [
    { 
      position: { lat: 46.478, lng: 30.730 }, 
      address: "Одеса вул. Новосельского, 100" 
    },
    { 
      position: { lat: 46.486, lng: 30.729 }, 
      address: "Одеса вул. Садова, 9" 
    }
  ];

  markers.forEach(markerData => {
    const markerImg = document.createElement("img");
    markerImg.src = "assets/images/marker.svg";
    markerImg.setAttribute('data-label', markerData.address);

    const marker = new AdvancedMarkerElement({
      map: map,
      position: markerData.position,
      title: markerData.address,
      content: markerImg,
    });

  });

}

initMap();
