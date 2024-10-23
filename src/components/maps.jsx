import React, { useRef, useLayoutEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useNavigate } from "react-router-dom";

const Maps = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const hoveredStateId = useRef(null);
  const popup = useRef(
    new maplibregl.Popup({ closeButton: false, closeOnClick: false })
  );
  const lng = 106.827183;
  const lat = -6.175394;
  const zoom = 15;
  const API_KEY = "eX2wDavS7RwXiaU08uav";
  const navigate = useNavigate();

  const dataMap = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [106.82655747054005, -6.174781027648756],
              [106.82775024639915, -6.174800603845597],
              [106.82773081082435, -6.175970554483995],
              [106.82655111864877, -6.175955470266439],
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
              [106.82673532876214, -6.17765827888882],
              [106.82749128769673, -6.177683648170296],
              [106.82747534024132, -6.17887],
              [106.82675852681517, -6.17887],
              [106.82673532876214, -6.17765827888882],
            ],
          ],
        },
        properties: {
          name: "Kolam Depan Monumen Nasional",
          city: "Jakarta",
          description: "Kolam",
        },
      },
    ],
  };

  useLayoutEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.dragRotate.disable();

    map.current.keyboard.disable();

    map.current.touchZoomRotate.disableRotation();

    map.current.on("load", () => {
      map.current.addSource("monas-area", {
        type: "geojson",
        data: dataMap,
      });

      map.current.addLayer({
        id: "monas-area-fill",
        type: "fill",
        source: "monas-area",
        layout: {},
        paint: {
          "fill-color": "#808080",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.5,
          ],
        },
      });

      map.current.on("mousemove", "monas-area-fill", (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId.current !== null) {
            map.current.setFeatureState(
              { source: "monas-area", id: hoveredStateId.current },
              { hover: false }
            );
          }
          hoveredStateId.current = e.features[0].id;
          map.current.setFeatureState(
            { source: "monas-area", id: hoveredStateId.current },
            { hover: true }
          );

          const feature = e.features[0];
          popup.current
            .setLngLat(e.lngLat)
            .setHTML(
              `<strong>${feature.properties.name}</strong><br>${feature.properties.description}`
            )
            .addTo(map.current);
        }
      });

      map.current.on("mouseleave", "monas-area-fill", () => {
        if (hoveredStateId.current !== null) {
          map.current.setFeatureState(
            { source: "monas-area", id: hoveredStateId.current },
            { hover: false }
          );
        }
        hoveredStateId.current = null;
        popup.current.remove();
      });

      map.current.on("click", "monas-area-fill", (e) => {
        navigate("/information");
      });
    });
  }, [API_KEY, lng, lat, zoom, navigate]);

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default Maps;
