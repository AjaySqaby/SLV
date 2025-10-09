"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, ZoomControl, useMapEvents, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function RideMap({ pickup, dropoff, status = "In-progress", className = "" }) {
  // Stable scalar coords (avoid object identity churn)
  const pickupLat = typeof pickup?.coords?.lat === 'number' ? pickup.coords.lat : 33.749;
  const pickupLng = typeof pickup?.coords?.lng === 'number' ? pickup.coords.lng : -84.388;
  const dropoffLat = typeof dropoff?.coords?.lat === 'number' ? dropoff.coords.lat : 33.774;
  const dropoffLng = typeof dropoff?.coords?.lng === 'number' ? dropoff.coords.lng : -84.35;

  const [baseLayer, setBaseLayer] = useState('map'); // 'map' | 'sat'

  const [routePath, setRoutePath] = useState([[pickupLat, pickupLng], [dropoffLat, dropoffLng]]);
  const routeKeyRef = useRef('');
  const isDemoDefault = !pickup?.coords && !dropoff?.coords;

  // Fetch a real road route polyline using OSRM (no API key required)
  useEffect(() => {
    let cancelled = false;
    const key = `${pickupLat},${pickupLng}->${dropoffLat},${dropoffLng}`;
    if (routeKeyRef.current === key) return; // already fetched for this pair
    routeKeyRef.current = key;
    const densify = (points, stepMeters = 5) => {
      if (!points || points.length < 2) return points || [];
      const out = [points[0]];
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        const d = distanceMeters(a, b);
        const steps = Math.max(1, Math.floor(d / stepMeters));
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
        }
      }
      return out;
    };
    // Built-in demo route (Atlanta) used only if all network attempts fail
    const getDemoAtlantaRoute = () => {
      const demo = [
        [33.7489, -84.3880],
        [33.7496, -84.3860], [33.7508, -84.3838], [33.7521, -84.3817],
        [33.7532, -84.3799], [33.7544, -84.3781], [33.7555, -84.3762],
        [33.7567, -84.3744], [33.7580, -84.3725], [33.7592, -84.3707],
        [33.7604, -84.3689], [33.7616, -84.3671], [33.7628, -84.3654],
        [33.7640, -84.3636], [33.7651, -84.3619], [33.7663, -84.3601],
        [33.7674, -84.3584], [33.7686, -84.3567], [33.7700, -84.3550],
        [33.7714, -84.3536], [33.7726, -84.3526], [33.7735, -84.3517],
        [33.7740, -84.3510]
      ];
      return demo;
    };

    // If using built-in demo pickup/dropoff, always use the demo road-following path (no network)
    if (isDemoDefault) {
      setRoutePath(densify(getDemoAtlantaRoute()));
      return () => { };
    }

    const fetchRouteWithRetry = async (attempt = 0) => {
      const url = `https://router.project-osrm.org/route/v1/driving/${pickupLng},${pickupLat};${dropoffLng},${dropoffLat}?overview=full&geometries=geojson&steps=true&alternatives=false&continue_straight=true`;
      try {
        const res = await fetch(url);
        const ok = res.ok;
        const data = ok ? await res.json() : null;
        const route = data?.routes?.[0];
        // Prefer step-level geometry for exact turn-by-turn path
        let coords = [];
        if (route?.legs?.length) {
          for (const leg of route.legs) {
            if (leg?.steps?.length) {
              for (const step of leg.steps) {
                if (step?.geometry?.coordinates?.length) {
                  for (const c of step.geometry.coordinates) coords.push(c);
                }
              }
            }
          }
        }
        if (!coords.length) {
          coords = route?.geometry?.coordinates || [];
        }
        if (!cancelled && coords && coords.length) {
          // Convert [lng, lat] -> [lat, lng] and drop duplicate consecutive points
          const latlng = [];
          let prev = null;
          for (const [lng, lat] of coords) {
            if (!prev || prev[0] !== lat || prev[1] !== lng) {
              latlng.push([lat, lng]);
              prev = [lat, lng];
            }
          }
          setRoutePath(densify(latlng));
          return;
        }
        throw new Error('No route');
      } catch (_) {
        if (cancelled) return;
        if (attempt < 3) {
          const delay = 800 * Math.pow(2, attempt); // 800ms, 1600ms, 3200ms
          setTimeout(() => fetchRouteWithRetry(attempt + 1), delay);
        } else {
          // Final fallback to a built-in demo road-like path (or straight line if outside demo area)
          if (Math.abs(pickupLat - 33.7489) < 0.02 && Math.abs(pickupLng + 84.3880) < 0.03 &&
            Math.abs(dropoffLat - 33.7740) < 0.03 && Math.abs(dropoffLng + 84.3510) < 0.03) {
            setRoutePath(densify(getDemoAtlantaRoute()));
          } else {
            setRoutePath(densify([[pickupLat, pickupLng], [dropoffLat, dropoffLng]]));
          }
        }
      }
    };
    fetchRouteWithRetry(0);
    return () => { cancelled = true };
  }, [pickupLat, pickupLng, dropoffLat, dropoffLng]);

  const startIcon = useMemo(() => L.divIcon({
    className: "",
    iconSize: [34, 44],
    iconAnchor: [17, 42],
    html: `
      <div style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35)); display:flex; align-items:center; gap:6px;">
        <div style="width:34px;height:44px;display:flex;align-items:center;justify-content:center;">
          <svg width="34" height="44" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.925 0 1 4.925 1 11c0 7.5 11 21 11 21s11-13.5 11-21C23 4.925 18.075 0 12 0z" fill="#22c55e" stroke="#14532d" stroke-width="1"/>
            <circle cx="12" cy="11" r="4.2" fill="#ffffff"/>
          </svg>
        </div>
        <span style="background:#fff;border:1px solid #d1d5db;border-radius:14px;padding:2px 8px;font-size:11px;font-weight:700;color:#065f46;">PICK</span>
      </div>`
  }), []);

  const dropIcon = useMemo(() => L.divIcon({
    className: "",
    iconSize: [34, 44],
    iconAnchor: [17, 42],
    html: `
      <div style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35)); display:flex; align-items:center; gap:6px;">
        <div style="width:34px;height:44px;display:flex;align-items:center;justify-content:center;">
          <svg width="34" height="44" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.925 0 1 4.925 1 11c0 7.5 11 21 11 21s11-13.5 11-21C23 4.925 18.075 0 12 0z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1"/>
            <circle cx="12" cy="11" r="4.2" fill="#ffffff"/>
          </svg>
        </div>
        <span style="background:#fff;border:1px solid #d1d5db;border-radius:14px;padding:2px 8px;font-size:11px;font-weight:700;color:#7f1d1d;">DROP</span>
      </div>`
  }), []);

  // Fit bounds only once per route (prevents zoom snapping during user interaction)
  const BoundsOnce = ({ points }) => {
    const map = useMap();
    const fittedKeyRef = useRef(null);
    const key = useMemo(() => points && points.length ? `${points.length}:${points[0][0]},${points[0][1]}->${points[points.length - 1][0]},${points[points.length - 1][1]}` : '', [points]);
    useEffect(() => {
      if (!map || !points?.length) return;
      if (fittedKeyRef.current === key) return;
      const bounds = L.latLngBounds(points.map(p => L.latLng(p[0], p[1])));
      map.fitBounds(bounds, { padding: [40, 40] });
      fittedKeyRef.current = key;
    }, [map, key, points]);
    return null;
  };

  const InvalidateSize = () => {
    const map = useMap();
    useEffect(() => {
      const invalidate = () => map.invalidateSize();
      invalidate();
      const t = setTimeout(invalidate, 200);

      // Check if we're in a browser environment
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', invalidate);
        return () => {
          clearTimeout(t);
          window.removeEventListener('resize', invalidate);
        };
      }

      return () => {
        clearTimeout(t);
      };
    }, [map]);
    return null;
  };

  // Interaction helpers
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [followCar, setFollowCar] = useState(true);
  const [progressRatio, setProgressRatio] = useState(0); // 0..1
  const [distanceLeft, setDistanceLeft] = useState(0); // meters
  const [carSpeedMps, setCarSpeedMps] = useState(0); // instantaneous speed

  const MapInteractionWatcher = ({ onUserInteract }) => {
    useMapEvents({
      dragstart: onUserInteract,
      zoomstart: onUserInteract,
      touchstart: onUserInteract,
      wheel: onUserInteract,
    });
    return null;
  };

  // Distance util
  const distanceMeters = (a, b) => {
    const R = 6371000;
    const lat1 = a[0] * Math.PI / 180;
    const lat2 = b[0] * Math.PI / 180;
    const dLat = (b[0] - a[0]) * Math.PI / 180;
    const dLng = (b[1] - a[1]) * Math.PI / 180;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  };

  // Total route distance for progress/ETA
  const totalDistance = useMemo(() => {
    if (!routePath || routePath.length < 2) return 0;
    let d = 0;
    for (let i = 1; i < routePath.length; i++) d += distanceMeters(routePath[i - 1], routePath[i]);
    return d;
  }, [routePath]);

  // Car animation state
  const [carPosition, setCarPosition] = useState([pickupLat, pickupLng]);
  const [carHeading, setCarHeading] = useState(0);
  const pathRef = useRef(routePath);

  useEffect(() => {
    pathRef.current = routePath;
    if (routePath?.length) setCarPosition(routePath[0]);
  }, [routePath]);

  const bearingDegrees = (a, b) => {
    const lat1 = a[0] * Math.PI / 180;
    const lat2 = b[0] * Math.PI / 180;
    const dLng = (b[1] - a[1]) * Math.PI / 180;
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    const brng = Math.atan2(y, x) * 180 / Math.PI;
    return (brng + 360) % 360;
  };

  useEffect(() => {
    const points = pathRef.current;
    if (!points || points.length < 2) return;
    let frameId;
    let lastTs;
    let finished = false;
    let lastPos = null;

    // Constant-speed animation: 80 km/h along the path
    const totalSegments = Math.max(1, points.length - 1);
    const targetSpeedMps = (160 * 1000) / 3600; // 80 km/h
    const incPerSec = totalDistance > 0
      ? (targetSpeedMps * totalSegments) / totalDistance
      : totalSegments / 30; // fallback

    let cursor = 0; // 0 .. totalSegments

    const tick = (ts) => {
      if (lastTs == null) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.1);
      lastTs = ts;
      cursor = Math.min(cursor + incPerSec * dt, totalSegments);

      const i = Math.min(Math.floor(cursor), totalSegments - 1);
      const t = Math.min(1, Math.max(0, cursor - i));
      const a = points[i];
      const b = points[i + 1];
      const lat = a[0] + (b[0] - a[0]) * t;
      const lng = a[1] + (b[1] - a[1]) * t;
      if (Array.isArray(lastPos) && dt > 0) {
        const instSpeed = distanceMeters(lastPos, [lat, lng]) / dt; // m/s
        setCarSpeedMps(instSpeed);
      }
      lastPos = [lat, lng];
      setCarPosition([lat, lng]);
      setCarHeading(bearingDegrees(a, b));

      // Progress and distance left
      const traveledRatio = totalSegments === 0 ? 0 : (i + t) / totalSegments;
      setProgressRatio(traveledRatio);
      if (totalDistance > 0) {
        setDistanceLeft(Math.max(0, totalDistance * (1 - traveledRatio)));
      }

      if (cursor >= totalSegments) {
        // Clamp to drop and finish
        setCarPosition(points[points.length - 1]);
        setCarHeading(bearingDegrees(points[points.length - 2], points[points.length - 1]));
        setProgressRatio(1);
        setDistanceLeft(0);
        finished = true;
        if (frameId) cancelAnimationFrame(frameId);
        return;
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => { if (frameId) cancelAnimationFrame(frameId); finished = true; };
  }, [routePath]);

  const carIcon = useMemo(() => L.divIcon({
    className: "",
    html: `<div style="transform: rotate(${carHeading}deg); width:30px; height:30px; display:flex; align-items:center; justify-content:center; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35));">
      <img src="/car-location.png" alt="car" style="width:28px;height:28px;object-fit:cover;border-radius:4px;" />
    </div>`
  }), [carHeading]);

  const FollowCar = ({ position, enabled }) => {
    const map = useMap();
    useEffect(() => {
      if (!enabled || !Array.isArray(position)) return;
      map.setView(position, map.getZoom(), { animate: false });
    }, [map, position, enabled]);
    return null;
  };

  return (
    <div className={`relative ${className} ${isFullscreen ? 'fixed inset-0 z-[2000] bg-white' : '!h-[92vh]'}`}>
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
        center={[(pickupLat + dropoffLat) / 2, (pickupLng + dropoffLng) / 2]}
        zoom={13}
        scrollWheelZoom={true}
        touchZoom={true}
        doubleClickZoom={true}
        dragging={true}
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

        <Marker position={[pickupLat, pickupLng]} icon={startIcon} />
        <Marker position={[dropoffLat, dropoffLng]} icon={dropIcon} />

        <Polyline positions={routePath} color="#22c55e" weight={5} opacity={0.9} />

        {/* Step dots every ~400m for visual progress */}
        {totalDistance > 0 && routePath.map((p, idx) => (
          idx % 25 === 0 ? <Marker key={`s-${idx}`} position={p} icon={L.divIcon({ className: '', html: '<div style=\'width:6px;height:6px;border-radius:50%;background:#16a34a;border:2px solid #fff;box-shadow:0 0 2px rgba(0,0,0,0.3)\'></div>' })} /> : null
        ))}

        {/* Animated car (render only if valid) */}
        {Array.isArray(carPosition) && carPosition.length === 2 && !Number.isNaN(carPosition[0]) && !Number.isNaN(carPosition[1]) && (
          <Marker position={carPosition} icon={carIcon}>
            <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={false} className="!p-0">
              <div style={{
                background: 'rgba(255,255,255,0.96)',
                border: '1px solid #d1d5db',
                borderRadius: 8,
                padding: '8px 10px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                color: '#111827',
                fontSize: 12,
                lineHeight: 1.15,
                minWidth: 180
              }}>
                <div><strong>Time:</strong> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div style={{ marginTop: 4 }}><strong>Speed:</strong> 80 km/h ({(80 * 0.621371).toFixed(1)} mph)</div>
                <div style={{ marginTop: 4 }}><strong>Battery:</strong> {Math.max(5, Math.round(100 - (progressRatio * 70)))}%</div>
              </div>
            </Tooltip>
          </Marker>
        )}

        <ZoomControl position="bottomleft" />

        <BoundsOnce points={routePath} />
        <InvalidateSize />
        <MapInteractionWatcher onUserInteract={() => setFollowCar(false)} />
        <FollowCar position={carPosition} enabled={followCar} />
      </MapContainer>
      {/* Top progress/ETA overlay */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1100] w-[min(520px,95%)] bg-white/95 backdrop-blur rounded-md border border-gray-300 shadow p-2">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>Live tracking</span>
          <span>{(distanceLeft / 1000).toFixed(1)} km left • ETA ~ {Math.max(1, Math.ceil((distanceLeft / (80 * 1000)) * 60))} min @ 80 km/h</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div className="h-2 bg-emerald-500 rounded" style={{ width: `${Math.round(progressRatio * 100)}%` }} />
        </div>
      </div>
      {/* Actions top-right */}
      <div className="absolute z-[1000] top-2 right-2 bg-white rounded-md shadow border border-gray-300 overflow-hidden flex">
        <button
          onClick={() => setIsFullscreen(v => !v)}
          className="px-3 py-1 text-sm hover:bg-gray-50 border-r border-gray-300"
        >{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</button>
        <button
          onClick={() => setFollowCar(v => !v)}
          className={`px-3 py-1 text-sm ${followCar ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
        >{followCar ? 'Following' : 'Follow Car'}</button>
      </div>
    </div>
  );
}
