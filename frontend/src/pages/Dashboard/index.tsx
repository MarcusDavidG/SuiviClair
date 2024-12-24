import { useState, useEffect } from 'react'

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

interface Shipment {
  id: number
  productName: string
  supplier: string
  receiver: string
  status: ShipmentStatus
}

function getStatusColor(status: ShipmentStatus): string {
  switch (status) {
    case ShipmentStatus.Created:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case ShipmentStatus.QualityChecked:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case ShipmentStatus.InTransit:
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case ShipmentStatus.Delayed:
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case ShipmentStatus.Disputed:
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case ShipmentStatus.ResolvingDispute:
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case ShipmentStatus.Delivered:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case ShipmentStatus.Rejected:
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case ShipmentStatus.Cancelled:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

// Mock data
const mockShipments: Shipment[] = [
  {
    id: 1,
    productName: "Electronics Package",
    supplier: "Tech Supplies Inc",
    receiver: "Digital Store",
    status: ShipmentStatus.InTransit
  },
  {
    id: 2,
    productName: "Medical Supplies",
    supplier: "HealthCare Ltd",
    receiver: "City Hospital",
    status: ShipmentStatus.Delivered
  },
  {
    id: 3,
    productName: "Food Products",
    supplier: "Fresh Foods Co",
    receiver: "Supermarket Chain",
    status: ShipmentStatus.QualityChecked
  },
  {
    id: 4,
    productName: "Construction Materials",
    supplier: "Build Supply Co",
    receiver: "Construction Site",
    status: ShipmentStatus.Created
  },
  {
    id: 5,
    productName: "Textile Goods",
    supplier: "Fabric World",
    receiver: "Fashion Outlet",
    status: ShipmentStatus.InTransit
  }
]

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [shipments, setShipments] = useState<Shipment[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchShipments = async () => {
      setIsLoading(true)
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setShipments(mockShipments)
      } catch (error) {
        console.error('Error fetching shipments:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchShipments()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Shipments</h3>
            <p className="text-3xl font-bold text-orange-500">{shipments.length}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">In Transit</h3>
            <p className="text-3xl font-bold text-orange-500">
              {shipments.filter(s => s.status === ShipmentStatus.InTransit).length}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Delivered</h3>
            <p className="text-3xl font-bold text-orange-500">
              {shipments.filter(s => s.status === ShipmentStatus.Delivered).length}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Pending</h3>
            <p className="text-3xl font-bold text-orange-500">
              {shipments.filter(s => s.status === ShipmentStatus.Created).length}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Recent Shipments</h3>
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading shipments...</p>
              </div>
            ) : shipments.length > 0 ? (
              shipments.map((shipment) => (
                <div 
                  key={shipment.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold">{shipment.productName}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      From: {shipment.supplier} To: {shipment.receiver}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(shipment.status)}`}>
                    {ShipmentStatus[shipment.status]}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No recent shipments</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
