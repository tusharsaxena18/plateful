import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Heart, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [taxId, setTaxId] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [documents, setDocuments] = useState<string[]>([]);
  const [currentDocument, setCurrentDocument] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleAddDocument = () => {
    if (currentDocument && !documents.includes(currentDocument)) {
      setDocuments([...documents, currentDocument]);
      setCurrentDocument('');
    }
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!role) {
      setError('Please select a role');
      return;
    }
    
    if ((role === 'giver' || role === 'sharer') && (!registrationNumber || !taxId)) {
      setError('Please provide all required organization details');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const mockLocation = role === 'donor' ? undefined : {
        lat: 19.076 + (Math.random() * 0.02 - 0.01),
        lng: 72.877 + (Math.random() * 0.02 - 0.01)
      };
      
      const organizationDetails = role === 'donor' ? undefined : {
        registrationNumber,
        taxId,
        bankName,
        accountNumber,
        ifscCode,
        documents
      };
      
      const success = await register(
        {
          name,
          email,
          role,
          address: role !== 'donor' ? address : undefined,
          location: mockLocation,
          organizationDetails
        },
        password
      );
      
      if (success) {
        navigate('/');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-500 hover:text-primary-600">
              Sign in
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">I am a...</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleRoleSelect('giver')}
                className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <ChefHat size={40} className="text-primary-500 mb-3" />
                <span className="font-medium">Plate Giver</span>
                <span className="text-xs text-gray-500 text-center mt-1">
                  Restaurant, grocery store, or caterer with excess food
                </span>
              </button>
              
              <button
                onClick={() => handleRoleSelect('sharer')}
                className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-secondary-500 hover:bg-secondary-50 transition-colors"
              >
                <Heart size={40} className="text-secondary-500 mb-3" />
                <span className="font-medium">Plate Sharer</span>
                <span className="text-xs text-gray-500 text-center mt-1">
                  NGO or organization distributing food to those in need
                </span>
              </button>
              
              <button
                onClick={() => handleRoleSelect('donor')}
                className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
              >
                <Users size={40} className="text-yellow-500 mb-3" />
                <span className="font-medium">Donor</span>
                <span className="text-xs text-gray-500 text-center mt-1">
                  Support NGOs through monetary donations
                </span>
              </button>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {role === 'donor' ? 'Full Name' : 'Organization Name'}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input w-full"
                  placeholder={role === 'donor' ? 'John Doe' : 'Organization Name'}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full"
                  placeholder="Email address"
                />
              </div>
              
              {(role === 'giver' || role === 'sharer') && (
                <>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="input w-full"
                      placeholder="Full address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Number
                    </label>
                    <input
                      id="registrationNumber"
                      name="registrationNumber"
                      type="text"
                      required
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className="input w-full"
                      placeholder="Organization registration number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                      Tax ID / PAN
                    </label>
                    <input
                      id="taxId"
                      name="taxId"
                      type="text"
                      required
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="input w-full"
                      placeholder="Tax ID or PAN number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      id="bankName"
                      name="bankName"
                      type="text"
                      required
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="input w-full"
                      placeholder="Bank name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      id="accountNumber"
                      name="accountNumber"
                      type="text"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="input w-full"
                      placeholder="Bank account number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                      IFSC Code
                    </label>
                    <input
                      id="ifscCode"
                      name="ifscCode"
                      type="text"
                      required
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      className="input w-full"
                      placeholder="Bank IFSC code"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Documents
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={currentDocument}
                        onChange={(e) => setCurrentDocument(e.target.value)}
                        className="input w-full"
                        placeholder="Add document URL"
                      />
                      <button
                        type="button"
                        onClick={handleAddDocument}
                        disabled={!currentDocument}
                        className="ml-2 btn btn-outline"
                      >
                        Add
                      </button>
                    </div>
                    
                    {documents.length > 0 && (
                      <div className="mt-2">
                        <ul className="space-y-2">
                          {documents.map((doc, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <span className="text-sm truncate">{doc}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveDocument(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full"
                  placeholder="Password"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input w-full"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-outline"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default Register;