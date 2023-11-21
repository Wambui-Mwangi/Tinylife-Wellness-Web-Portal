import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function NairobiMap() {
  const [leadPoisoningLocations, setLeadPoisoningLocations] = useState([
    { lat: -1.2400, lng: 36.7688, name: 'Kitisuru', Percentage: '10' },
    { lat: -1.2560, lng: 36.8175, name: 'Parklands/Highridge', Percentage: '12' },
    { lat: -1.250916, lng: 36.845914, name: 'Karura', Percentage: '22' },
    { lat: -1.252794, lng: 36.764977, name: 'Kangemi', Percentage: '33' },
    { lat: -1.2693100, lng: 36.7386300, name: 'Mountain View', Percentage: '76'},
    { lat: -1.283922, lng: 36.798107, name: 'Kilimani', Percentage: '89' },
    { lat: -1.2784631, lng: 36.752321, name: 'Kawangware', Percentage: '12' },
    { lat: -1.277659, lng: 36.752845, name: 'Gatina', Percentage: '39' },
    { lat: -1.278319, lng: 36.784644, name: 'Kileleshwa', Percentage: '19' },
    { lat: -1.28730775, lng: 36.7480163, name: 'Kabiro', Percentage: '45' },
    { lat: -1.3000000, lng: 36.7000000, name: 'Mutu-ini', Percentage: '12' },
    { lat: -1.3041200, lng: 36.7397800, name: 'Ngando', Percentage: '24' },
    { lat: -1.292471, lng: 36.736275, name: 'Riruta', Percentage: '54' },
    { lat: -1.271887, lng: 36.70381, name: 'Uthiru', Percentage: '12' },
    { lat: -1.2820, lng:  36.7140, name: 'Waithaka', Percentage: '34' },
    { lat: -1.320853, lng: 36.684936, name: 'Karen', Percentage: '54' },
    { lat: -1.3, lng: 36.81667, name: 'Nairobi West', Percentage: '12' },
    { lat: -1.317003, lng: 36.796653, name: 'Mugumu-ini', Percentage: '56' },
    { lat: -1.32423, lng: 36.827719, name: 'South C', Percentage: '12' },
    { lat: -1.315817, lng: 36.805836, name: 'Nyayo Highrise', Percentage: '56' },
    { lat: -1.31234835, lng: 36.796114350954, name: 'Laini Saba', Percentage: '19' },
    { lat: -1.312024 , lng: 36.790161, name: 'Lindi Makina', Percentage: '23' },
    { lat: -1.30490661132, lng: 36.7691307156, name: 'Woodley/Kenyatta Golf Course', Percentage: '12' },
    { lat: -1.184392, lng: 36.464872, name: 'Sarangombe', Percentage: '45' },
    { lat: -1.206415, lng: 36.913794, name: 'Githurai', Percentage: '23' },
    { lat: -1.187234, lng: 36.90304, name: 'Kahawa West', Percentage: '76' },
    { lat: -1.210542, lng: 36.897663, name: 'Zimmerman', Percentage: '53' },
    { lat: -1.218459, lng: 36.886906, name: 'Roysambu', Percentage: '12' },
    { lat: -1.1833, lng: 36.9167, name: 'Kahawa', Percentage: '12' },
    { lat: -1.272758, lng: 36.827899, name: 'Clay City', Percentage: '56' },
    { lat: -1.225602, lng: 36.924546, name: 'Mwiki', Percentage: '33' },
    { lat: -1.227841, lng: 36.905729, name: 'Kasarani', Percentage: '43' },
    { lat: -1.2505, lng: 36.9271, name: 'Njiru', Percentage: '12' },
    { lat: -1.253287, lng: 37.007823, name: 'Ruai', percentage: '12' },
    { lat: -1.243926, lng: 36.881712, name: 'Baba Dogo', percentage: '65' },
    { lat: -1.2527, lng: 36.8640, name: 'Utalii', percentage: '34' },
    { lat: -1.1333300, lng: 34.5500000, name: 'Mathare North', percentage: '23' },
    { lat: -1.238604 , lng: 36.899007, name: 'Lucky Summer', percentage: '23' },
    { lat: -1.250364, lng: 36.89094, name: 'Korogocho', percentage: '21' },
    { lat: -1.325051, lng: 36.878502, name: 'Imara Daima', percentage: '23' },
    { lat: -1.3028, lng: 36.8843, name: 'Mukuru Kwa Njenga', percentage: '24' },
    { lat: -1.31833, lng: 36.87250, name: 'Mukuru Kwa Ruben', percentage: '24' },
    { lat: -1.31629833333, lng: 36.8811983333, name: 'Pipeline', percentage: '12' },
    { lat: -1.31043197, lng: 36.8960322, name: 'Kware', percentage: '55' },
    { lat: -1.25501220915, lng: 36.8822600693, name: 'Kariobangi North', percentage: '30' },
    { lat: -1.29816, lng: 36.88927, name: 'Dandora Area I', percentage: '65' },
    { lat: -1.28452, lng: 36.88536, name: 'Dandora Area II', percentage: '77' },
    { lat: -1.2820, lng: 36.7140, name: 'Dandora Area III', percentage: '63' },
    { lat: -1.28097, lng: 36.88233, name: 'Dandora Area IV', percentage: '23' },
    { lat: 1.2660, lng: 36.9219, name: 'Kayole North', percentage: '21' },
    { lat: -1.276162, lng: 36.913794, name: 'Kayole Central', percentage: '56' },
    { lat: -1.26746, lng: 36.91582, name: 'Kayole South', percentage: '45' },
    { lat: -1.250562 , lng: 36.937984, name: 'Komarock', percentage: '34' },
    { lat: -1.2592, lng: 36.9236, name: 'Matopeni/Spring Valley', percentage: '23' },
    { lat: -1.27796, lng: 36.83526, name: 'Upper Savannah', percentage: '24' },
    { lat: -1.2820, lng: 36.83526, name: 'Lower Savannah', percentage: '34' },
    { lat: -1.332686, lng: 36.900351, name: 'Embakasi', percentage: '34' },
    { lat: -1.27496478, lng: 36.96090454, name: 'Utawala', percentage: '67' },
    { lat:  -1.286558, lng: 36.962825, name: 'Mihango', percentage: '43' },
    { lat: -1.2776, lng: 36.8883, name: 'Umoja I', percentage: '76' },
    { lat: -1.28321065001, lng: 36.90048185, name: 'Umoja II', percentage: '34' },
    { lat: -1.2645912, lng: 36.895515, name: 'Mowlem', percentage: '35' },
    { lat:  -1.264884, lng: 36.892285, name: 'Kariobangi South', percentage: '35' },
    { lat: -1.2946400, lng: 36.8651600, name: 'Maringo/Hamza', percentage: '56' },
    { lat: -1.3061, lng: 36.8627, name: 'Industrial Area', percentage: '32' },
    { lat: -1.2891666, lng: 36.8239696, name: 'Harambee', percentage: '24' },
    { lat: -1.056954, lng: 37.107094, name: 'Makongeni', percentage: '24' },
    { lat: -1.2816645, lng: 36.8458837, name: 'Pumwani', percentage: '21' },
    { lat: -1.2731795, lng: 36.8600088, name: 'Eastleigh North', percentage: '45' },
    { lat: -1.2859085, lng: 36.8532829, name: 'Eastleigh South', percentage: '23' },
    { lat: -1.2700900, lng: 36.8603400, name: 'Airbase', percentage: '20' },
    { lat: -1.2820, lng: 36.83526, name: 'California', percentage: '12' },
    { lat: -1.274665, lng: 36.829065, name: 'Ngara', percentage: '34' },
    { lat: -1.2815735 , lng: 36.82233580000002, name: 'Nairobi Central', percentage: '45' },
    { lat: -1.272545 , lng: 36.839829, name: 'Pangani', percentage: '32' },
    { lat: -1.27717, lng: 36.835121, name: 'Ziwani/Kariokor', percentage: '45' },
    { lat: -1.2899, lng: 36.836, name: 'Landmawe', percentage: '23' },
    { lat: -1.2820, lng: 36.83526, name: 'Nairobi South', percentage: '45' },
    { lat: -1.27977509162, lng: 36.8326941433, name: 'Mabatini', percentage: '54' },
    { lat: -1.25649, lng: 36.872114, name: 'Huruma', percentage: '23' },
    { lat: -1.3277100, lng: 36.7836000, name: 'Ngei', percentage: '12' },
    { lat: -1.2668038395293, lng: 36.848135618581, name: 'Mlango Kubwa', percentage: '43' },
    { lat: -1.2525036534071, lng: 36.878572857815, name: 'Kiamaiko', percentage: '23' },
    { lat: -1.312217, lng: 36.791376, name: 'Kibra', percentage: '64' },
    { lat: -1.2619, lng: 36.8585, name: 'Mathare South', percentage: '21' },
    { lat: -1.30332, lng: 36.8315224, name: 'Embakasi Central', percentage: '23' },
    { lat: -1.2997, lng: 36.9167, name: 'Embakasi East', percentage: '45' },
    { lat: -1.2800, lng: 36.9167, name: 'Embakasi North', percentage: '23' },
    { lat: -1.3000, lng: 36.9167, name: 'Embakasi South', percentage: '12' },
    { lat: -1.28478, lng: 36.833774, name: 'Kamukunji', percentage: '13' },
    { lat: -1.2959673, lng: 36.8724832, name: 'Makadara', percentage: '45' },
    { lat: -1.284457, lng: 36.824504, name: 'Starehe', percentage: '65' },
    { lat: -1.268264, lng: 36.811121, name: 'Westlands', percentage: '27' },
    { lat: -1.145703, lng: 36.964853, name: 'Ruiru', percentage: '19' },
    { lat: -1.457725, lng: 36.978503, name: 'Athi River', percentage: '34' },
    { lat: -1.359227, lng: 36.937984, name: 'Syokimau', percentage: '23' },
    { lat: -1.475289, lng:  36.96201, name: 'Kitengela', percentage: '45' },
  ]);

  const [markerColors, setMarkerColors] = useState<string[]>([]);

  useEffect(() => {
    const updatedMarkerColors: string[] = leadPoisoningLocations.map((location) => {
      return getMarkerColor(location.percentage);
    });
    setMarkerColors(updatedMarkerColors);
  }, [leadPoisoningLocations]);

  const getMarkerColor = (percentage: any): string => {
    const maxIntensity = 345;
    const minIntensity = 10;

    const intensity = maxIntensity - (maxIntensity - minIntensity) * (percentage / 100);
    const intensityHex = Math.floor(intensity).toString(16).padStart(2, '0');
    const markerColor = `#${intensityHex}0000`;

    return markerColor;
  };

  return (
    <div style={{ height: '630px', width: '100%' }}>
      <MapContainer center={[-1.286389, 36.817223]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {leadPoisoningLocations.map((location, index) => {
          const markerSize = 20 + parseInt(location.percentage, 10) * 0.4; 

          const icon = divIcon({
            className: 'custom-icon',
            iconSize: [markerSize, markerSize * 2],
            iconAnchor: [markerSize / 2, markerSize * 2],
            html: `<div style="background-color: ${markerColors[index]}; width: ${markerSize}px; height: ${markerSize * 2}px; border-radius: 50%;"></div>`,
            popupAnchor: [0, -30],
          });

          return (
            <Marker key={index} position={[location.lat, location.lng]} icon={icon}>
              <Popup>
                <div>
                  <h2>{location.name}</h2>
                  <p>Average Blood Lead Level: {location.percentage}%</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}