import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface FormData {
  productName: string
  description: string
  senderName: string
  senderEmail: string
  senderPhone: string
  receiverName: string
  receiverEmail: string
  receiverPhone: string
  pickupAddress: string
  deliveryAddress: string
  weight: string
  dimensions: string
  isFragile: boolean
  specialInstructions: string
}

export default function CreateShipment() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    description: '',
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    receiverName: '',
    receiverEmail: '',
    receiverPhone: '',
    pickupAddress: '',
    deliveryAddress: '',
    weight: '',
    dimensions: '',
    isFragile: false,
    specialInstructions: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Shipment created:', formData)
      setIsSuccess(true)
      
      // Redirect to dashboard after successful creation
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Failed to create shipment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Create New Shipment
          </h1>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded">
              Shipment created successfully! Redirecting to dashboard...
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Information */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Product Information
              </h2>
              
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product Name
                </label>
                <input 
                  type="text" 
                  id="productName" 
                  value={formData.productName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea 
                  id="description" 
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Weight (kg)
                  </label>
                  <input 
                    type="text" 
                    id="weight" 
                    value={formData.weight}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dimensions (LxWxH cm)
                  </label>
                  <input 
                    type="text" 
                    id="dimensions" 
                    value={formData.dimensions}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFragile"
                  checked={formData.isFragile}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isFragile" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Fragile Package
                </label>
              </div>
            </div>

            {/* Sender Information */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Sender Information
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="senderName" 
                    value={formData.senderName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="senderEmail" 
                    value={formData.senderEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="senderPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <input 
                  type="tel" 
                  id="senderPhone" 
                  value={formData.senderPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Pickup Address
                </label>
                <textarea 
                  id="pickupAddress" 
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Receiver Information */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Receiver Information
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="receiverName" 
                    value={formData.receiverName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="receiverEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="receiverEmail" 
                    value={formData.receiverEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="receiverPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <input 
                  type="tel" 
                  id="receiverPhone" 
                  value={formData.receiverPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Delivery Address
                </label>
                <textarea 
                  id="deliveryAddress" 
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Additional Information
              </h2>
              
              <div>
                <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Special Instructions
                </label>
                <textarea 
                  id="specialInstructions" 
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-orange-500 text-white p-4 rounded-lg font-bold 
                       hover:bg-orange-600 transition-colors disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Shipment...' : 'Create Shipment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
