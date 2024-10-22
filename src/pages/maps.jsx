import React, { useRef, useLayoutEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Maps = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = 106.827183; // Longitude
  const lat = -6.175394; // Latitude
  const zoom = 15;
  const API_KEY = "eX2wDavS7RwXiaU08uav"; // Ganti dengan API Key yang valid

  const dataMap = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [106.824964, -6.173269],
              [106.829401, -6.173269],
              [106.829401, -6.177402],
              [106.824964, -6.177402],
              [106.824964, -6.173269],
            ],
          ],
        },
        properties: {
          name: "Monas",
          city: "Jakarta",
          description: "Monumen Nasional",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [106.824964, -6.173269],
              [106.829401, -6.173269],
              [106.829401, -6.177402],
              [106.824964, -6.177402],
              [106.824964, -6.173269],
            ],
          ],
        },
        properties: {
          name: "Taman Monas",
          description: "Area sekitar Monas",
        },
      },
    ],
  };

  useLayoutEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      map.current.addSource("monas-area", {
        type: "geojson",
        data: dataMap,
      });

      map.current.addLayer(
        {
          id: "monas-area-fill",
          type: "fill",
          source: "monas-area",
          layout: {},
          paint: {
            "fill-color": "#808080",
            "fill-opacity": 0.4,
          },
        },
        undefined
      );

      map.current.addLayer(
        {
          id: "monas-area-line",
          type: "line",
          source: "monas-area",
          layout: {},
          paint: {
            "line-color": "#f08",
            "line-width": 0.4,
          },
        },
        "monas-area-fill"
      );
    });

    // Menambahkan marker
    new maplibregl.Marker().setLngLat([lng, lat]).addTo(map.current);
  }, [API_KEY, lng, lat, zoom]);

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default Maps;
