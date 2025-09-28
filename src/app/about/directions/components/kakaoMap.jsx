"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  z-index: 100;
`;

export default function KakaoMap({ address, onLoad }) {
  const containerRef = useRef(null); // div container
  const mapInstanceRef = useRef(null); // kakao map instance
  const markerRef = useRef(null); // marker reference
  const [latLng, setLatLng] = useState(null);

  // Fetch coordinates
  useEffect(() => {
    const fetchLatLng = async () => {
      const response = await fetch(
        `/api/getLatLng?address=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data.latitude && data.longitude) {
        setLatLng({ lat: data.latitude, lng: data.longitude });
      }
    };
    fetchLatLng();
  }, [address]);

  // Initialize map once latLng is set and Kakao SDK is ready
  useEffect(() => {
    if (latLng && window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(
          Number(latLng.lat),
          Number(latLng.lng)
        );

        const options = {
          center,
          level: 3,
        };

        const map = new window.kakao.maps.Map(containerRef.current, options);
        mapInstanceRef.current = map;

        // Add Marker
        const marker = new window.kakao.maps.Marker({
          position: center,
          map,
        });
        markerRef.current = marker;

        // Notify parent that map is loaded
        if (typeof onLoad === "function") {
          onLoad();
        }
      });
    }
  }, [latLng, onLoad]);

  // Resize handling (zoom + re-center)
  useEffect(() => {
    const handleResize = () => {
      if (!mapInstanceRef.current || !latLng) return;

      const map = mapInstanceRef.current;
      const center = new window.kakao.maps.LatLng(latLng.lat, latLng.lng);

      // Zoom based on screen width
      if (window.innerWidth < 600) {
        map.setLevel(5); // further in
      } else if (window.innerWidth < 900) {
        map.setLevel(4);
      } else {
        map.setLevel(3); // default desktop zoom
      }

      // Keep marker in center
      map.setCenter(center);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [latLng]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "350px" }}
      id="map"
    />
  );
}
