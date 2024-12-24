import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [shipments, setShipments] = useState<Shipment[]>([])

  useEffect(() => {
    const fetchShipments = async () => {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setShipments([])
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
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Recent Shipments</h3>
            <Link 
              to="/create" 
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Create New Shipment
            </Link>
          </div>
          
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
              <div className="text-center py-12">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  No shipments found
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Get started by creating a new shipment
                </p>
                <Link 
                  to="/create"
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent 
                           shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 
                           hover:bg-orange-600 focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-orange-500"
                >
                  Create Shipment
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
