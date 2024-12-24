import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { MapLoading, MapError, MapNoData } from '../../components/shared/MapLoading'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom marker icons
const originIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

enum ShipmentStatus {
  Created,
  QualityChecked,
  InTransit,
  Delayed,
  Disputed,
  ResolvingDispute,
  Delivered,
  Rejected,
  Cancelled
}

interface Location {
  name: string
  latitude: string
  longitude: string
  timestamp: number
}

interface Shipment {
  id: string
  productName: string
  status: ShipmentStatus
  origin: Location
  destination: Location
  estimatedDeliveryDate: number
}

// Mock shipment data
const mockShipment: Shipment = {
  id: "123",
  productName: "Electronics Package",
  status: ShipmentStatus.InTransit,
  origin: {
    name: "New York Warehouse",
    latitude: "40.7128",
    longitude: "-74.0060",
    timestamp: Date.now() - 86400000 // 24 hours ago
  },
  destination: {
    name: "Los Angeles Distribution Center",
    latitude: "34.0522",
    longitude: "-118.2437",
    timestamp: Date.now() + 86400000 * 2 // 48 hours from now
  },
  estimatedDeliveryDate: Date.now() + 86400000 * 2 // 48 hours from now
}

// Map bounds adjuster component
function MapBounds({ coordinates }: { coordinates: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    if (coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates.map(coord => L.latLng(coord[0], coord[1])))
      map.fitBounds(bounds, { padding: [50, 50] })

      // Draw the route line
      const routeLine = L.polyline(coordinates, {
        color: '#f97316', // orange-500
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 10' // Creates a dashed line
      }).addTo(map)

      return () => {
        map.removeLayer(routeLine)
      }
    }
  }, [coordinates, map])

  return null
}

export default function TrackShipment() {
  const [shipmentId, setShipmentId] = useState('')
  const [isTracking, setIsTracking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shipment, setShipment] = useState<Shipment | null>(null)

  const handleTrackShipment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsTracking(true)
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (shipmentId === mockShipment.id) {
        setShipment(mockShipment)
      } else {
        setError('Shipment not found')
        setShipment(null)
      }
    } catch {
      setError('Failed to fetch shipment data')
      setShipment(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setIsTracking(false)
    setShipmentId('')
    setShipment(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {!isTracking ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
              <h1 className="text-2xl font-bold text-orange-400 mb-6 text-center">
                Track Your Shipment
              </h1>

              {error && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded">
                  Error: {error}
                </div>
              )}

              <form onSubmit={handleTrackShipment} className="space-y-6">
                <div>
                  <label htmlFor="shipmentId" className="block text-sm font-medium mb-2">
                    Shipment ID
                  </label>
                  <input
                    type="text"
                    id="shipmentId"
                    value={shipmentId}
                    onChange={(e) => setShipmentId(e.target.value)}
                    className="w-full p-3 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 
                             text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your shipment ID (try: 123)"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white p-3 rounded font-bold 
                           hover:bg-orange-600 transition-colors disabled:bg-gray-400"
                >
                  Track Shipment
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex flex-col">
          {/* Shipment Info Bar */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Shipment #{shipmentId}</h2>
                {shipment && (
                  <>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Status: {ShipmentStatus[shipment.status]}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Product: {shipment.productName}
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={handleReset}
                className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600"
              >
                Track Another
              </button>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-grow relative">
            <div className="absolute inset-0">
              {shipment && (
                <MapContainer
                  key={`map-${shipmentId}`}
                  className="h-full w-full"
                  center={[0, 0]}
                  zoom={2}
                  scrollWheelZoom={true}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  {/* Origin Marker */}
                  <Marker 
                    position={[
                      parseFloat(shipment.origin.latitude),
                      parseFloat(shipment.origin.longitude)
                    ]}
                    icon={originIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold">Origin</h3>
                        <p>{shipment.origin.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(shipment.origin.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Destination Marker */}
                  <Marker 
                    position={[
                      parseFloat(shipment.destination.latitude),
                      parseFloat(shipment.destination.longitude)
                    ]}
                    icon={destinationIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold">Destination</h3>
                        <p>{shipment.destination.name}</p>
                        <p className="text-sm text-gray-500">
                          ETA: {new Date(shipment.estimatedDeliveryDate).toLocaleString()}
                        </p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Map bounds adjuster and route line */}
                  <MapBounds coordinates={[
                    [parseFloat(shipment.origin.latitude), parseFloat(shipment.origin.longitude)],
                    [parseFloat(shipment.destination.latitude), parseFloat(shipment.destination.longitude)]
                  ]} />
                </MapContainer>
              )}
            </div>
            {isLoading && <MapLoading />}
            {error && <MapError message={error} />}
            {!isLoading && !shipment && !error && <MapNoData />}
          </div>
        </div>
      )}
    </div>
  )
}
