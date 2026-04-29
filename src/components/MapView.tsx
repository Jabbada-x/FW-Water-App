'use client';

import { MapContainer, Marker, Popup, TileLayer, Polyline, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { WaterSource } from '@/lib/types';

export function ClickSelector({ onPick }: { onPick: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

export default function MapView({
  incident,
  sources,
  line,
  onPick
}: {
  incident: LatLngExpression;
  sources: WaterSource[];
  line?: LatLngExpression[];
  onPick: (lat: number, lon: number) => void;
}) {
  return (
    <MapContainer center={incident} zoom={14} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={incident}><Popup>Einsatzstelle</Popup></Marker>
      {sources.map((s) => (
        <Marker key={s.id} position={[s.latitude, s.longitude]}>
          <Popup>{s.name} ({s.capacity_l_min} l/min)</Popup>
        </Marker>
      ))}
      {line ? <Polyline positions={line} /> : null}
      <ClickSelector onPick={onPick} />
    </MapContainer>
  );
}
