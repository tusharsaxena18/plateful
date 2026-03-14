import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  Package, 
  Clock, 
  MapPin, 
  Camera, 
  Trash2, 
  AlertCircle, 
  Info
} from 'lucide-react';
import { useNotification } from '../../../contexts/NotificationContext';
import { FoodType, FoodUnit } from '../../../types/food';

const AddFoodListing: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    foodType: 'cooked' as FoodType,
    quantity: 1,
    unit: 'servings' as FoodUnit,
    expiryTime: '',
    address: '',
    dietaryInfo: [] as string[],
    allergensInfo: [] as string[],
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    
    if (!isNaN(numValue) && numValue > 0) {
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    }
  };

  const handleDietaryChange = (item: string) => {
    setFormData((prev) => {
      const current = [...prev.dietaryInfo];
      
      if (current.includes(item)) {
        return { ...prev, dietaryInfo: current.filter(i => i !== item) };
      } else {
        return { ...prev, dietaryInfo: [...current, item] };
      }
    });
  };

  const handleAllergensChange = (item: string) => {
    setFormData((prev) => {
      const current = [...prev.allergensInfo];
      
      if (current.includes(item)) {
        return { ...prev, allergensInfo: current.filter(i => i !== item) };
      } else {
        return { ...prev, allergensInfo: [...current, item] };
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files) return;
    
    // In a real app, this would upload to a storage service
    // For demo purposes, we're using local URLs
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, imageUrl]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.expiryTime || !formData.address) {
      addNotification('Please fill in all required fields', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      addNotification('Food listing created successfully!', 'success');
      navigate('/provider/listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      addNotification('Failed to create food listing. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-800 mb-2">Add New Food Listing</h1>
        <p className="text-neutral-600">
          Share details about your surplus food to help NGOs decide if they can use it.
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                  Title <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Leftover Pasta from Lunch Service"
                />
              </div>
              
              <div>
                <label htmlFor="foodType" className="block text-sm font-medium text-neutral-700 mb-1">
                  Food Type <span className="text-error-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, foodType: 'cooked' }))}
                    className={`flex items-center justify-center p-2 rounded-lg border ${
                      formData.foodType === 'cooked'
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <Utensils size={20} className="mr-2" />
                    Cooked Food
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, foodType: 'raw' }))}
                    className={`flex items-center justify-center p-2 rounded-lg border ${
                      formData.foodType === 'raw'
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <Package size={20} className="mr-2" />
                    Raw Materials
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                Description <span className="text-error-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Provide details about the food, how it's packaged, etc."
              ></textarea>
            </div>
          </div>

          {/* Quantity and Timing */}
          <div>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Quantity and Timing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700 mb-1">
                  Quantity <span className="text-error-500">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleNumberChange}
                  min="1"
                  required
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-neutral-700 mb-1">
                  Unit <span className="text-error-500">*</span>
                </label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="servings">Servings</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="expiryTime" className="block text-sm font-medium text-neutral-700 mb-1">
                  Expiry Time <span className="text-error-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="expiryTime"
                  name="expiryTime"
                  value={formData.expiryTime}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Pickup Location</h2>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                Address <span className="text-error-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter the pickup address"
                />
              </div>
              <p className="text-sm text-neutral-500 mt-1">
                This is where NGOs will pick up the food. Make sure it's accurate.
              </p>
            </div>
          </div>

          {/* Dietary and Allergen Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Dietary & Allergen Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Dietary Information
                </label>
                <div className="space-y-2">
                  {['vegetarian', 'vegan', 'gluten-free', 'halal', 'kosher'].map((item) => (
                    <label key={item} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.dietaryInfo.includes(item)}
                        onChange={() => handleDietaryChange(item)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <span className="ml-2 text-neutral-700 capitalize">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Allergen Information
                </label>
                <div className="space-y-2">
                  {['nuts', 'dairy', 'eggs', 'soy', 'wheat', 'shellfish'].map((item) => (
                    <label key={item} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.allergensInfo.includes(item)}
                        onChange={() => handleAllergensChange(item)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <span className="ml-2 text-neutral-700 capitalize">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Photos */}
          <div>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Photos</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                <div className="space-y-2">
                  <div className="mx-auto flex justify-center">
                    <Camera size={32} className="text-neutral-400" />
                  </div>
                  <div className="text-sm text-neutral-600">
                    Upload photos of the food to help NGOs see what's available
                  </div>
                  <div>
                    <label className="btn btn-secondary cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      Select Photos
                    </label>
                  </div>
                </div>
              </div>
              
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Uploaded food ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} className="text-error-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notice */}
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 flex items-start">
            <div className="text-primary-600 mr-3 mt-1">
              <Info size={20} />
            </div>
            <div>
              <h3 className="text-primary-800 font-medium">Important Note</h3>
              <p className="text-primary-700 text-sm">
                By creating this listing, you confirm that the food is safe for consumption 
                and has been handled according to food safety guidelines. You are responsible 
                for ensuring the accuracy of the information provided.
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/provider')}
              className="btn bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Listing'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddFoodListing;