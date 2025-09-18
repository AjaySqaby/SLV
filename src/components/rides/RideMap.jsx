"use client";

import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function RideMap({ pickup, dropoff, status = "In-progress", className = "" }) {
  // Temporary demo coordinates (Seattle-like path) if none provided
  const pickupCoords = pickup?.coords || { lat: 47.675, lng: -122.302 };
  const dropoffCoords = dropoff?.coords || { lat: 47.642, lng: -122.322 };

  const [baseLayer, setBaseLayer] = useState('map'); // 'map' | 'sat'

  const routePath = useMemo(() => ([
    [pickupCoords.lat, pickupCoords.lng],
    [47.668, -122.302],
    [47.661, -122.314],
    [47.655, -122.314],
    [47.653, -122.31],
    [47.65, -122.312],
    [47.646, -122.318],
    [dropoffCoords.lat, dropoffCoords.lng],
  ]), [pickupCoords, dropoffCoords]);

  const startIcon = useMemo(() => L.divIcon({
    className: "",
    html: `<div style="display:flex;align-items:center;gap:6px;background:#fff;padding:4px 8px;border-radius:18px;border:1px solid #d1d5db;box-shadow:0 1px 2px rgba(0,0,0,0.06)"><span style="width:8px;height:8px;border-radius:50%;background:#16a34a;display:inline-block"></span><span style="font-size:11px;color:#111827;font-weight:600">START</span></div>`
  }), []);

  const dropIcon = useMemo(() => L.divIcon({
    className: "",
    html: `<div style="display:flex;align-items:center;gap:6px;background:#fff;padding:4px 8px;border-radius:18px;border:1px solid #d1d5db;box-shadow:0 1px 2px rgba(0,0,0,0.06)"><span style="width:8px;height:8px;border-radius:50%;background:#dc2626;display:inline-block"></span><span style="font-size:11px;color:#111827;font-weight:700">DROP</span></div>`
  }), []);

  const Bounds = ({ points }) => {
    const map = useMap();
    useEffect(() => {
      if (!map || !points?.length) return;
      const bounds = L.latLngBounds(points.map(p => L.latLng(p[0], p[1])));
      map.fitBounds(bounds, { padding: [40, 40] });
    }, [map, points]);
    return null;
  };

  const InvalidateSize = () => {
    const map = useMap();
    useEffect(() => {
      const invalidate = () => map.invalidateSize();
      invalidate();
      const t = setTimeout(invalidate, 200);
      window.addEventListener('resize', invalidate);
      return () => {
        clearTimeout(t);
        window.removeEventListener('resize', invalidate);
      };
    }, [map]);
    return null;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Map/Satellite toggle */}
      <div className="absolute z-[1000] top-2 left-2 bg-white rounded-md shadow border border-gray-300 overflow-hidden flex">
        <button
          onClick={() => setBaseLayer('map')}
          className={`px-3 py-1 text-sm ${baseLayer === 'map' ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
        >Map</button>
        <button
          onClick={() => setBaseLayer('sat')}
          className={`px-3 py-1 text-sm border-l border-gray-300 ${baseLayer === 'sat' ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
        >Satellite</button>
          </div>
          
      <MapContainer
        className="w-full h-full"
        style={{ minHeight: '100%', height: '100%', background: '#e5e7eb' }}
        center={[ (pickupCoords.lat + dropoffCoords.lat) / 2, (pickupCoords.lng + dropoffCoords.lng) / 2 ]}
        zoom={13}
        scrollWheelZoom
        zoomControl={false}
      >
        {baseLayer === 'map' ? (
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        {/* Optional labels overlay for Satellite */}
        {baseLayer === 'sat' && (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
            attribution='&copy; CARTO &copy; OpenStreetMap contributors'
          />
        )}

        <Marker position={[pickupCoords.lat, pickupCoords.lng]} icon={startIcon} />
        <Marker position={[dropoffCoords.lat, dropoffCoords.lng]} icon={dropIcon} />

        <Polyline positions={routePath} color="#22c55e" weight={5} opacity={0.9} />

        <ZoomControl position="bottomleft" />

        <Bounds points={routePath} />
        <InvalidateSize />
      </MapContainer>
      </div>
  );
}
