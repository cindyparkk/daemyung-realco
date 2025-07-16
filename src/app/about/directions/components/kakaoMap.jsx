"use client"; // if you're in the app directory

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  z-index: 100;
`;

export default function KakaoMap({ address }) {
  const mapRef = useRef(null);
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

  // Initialize map once latLng is set and the Kakao SDK is ready
  useEffect(() => {
    if (latLng && window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(
            Number(latLng.lat),
            Number(latLng.lng)
          ),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // Add Marker
        const markerPosition = new window.kakao.maps.LatLng(
          Number(latLng.lat),
          Number(latLng.lng)
        );
        new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });
      });
    }
  }, [latLng]);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "350px" }} id="map" />
  );
}
