'use client';

import React, { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/actions/authActions';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '@/app/firebase.config';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const ProfilePage = () => {
  const { userProfile } = useSelector(state => state.user);
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    city: '',
    state: ''
  });

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (userProfile?.uid) {
      fetchAddresses();
    }
  }, [userProfile]);

  const fetchAddresses = async () => {
    try {
      const ref = doc(db, 'users', userProfile.uid);
      const snapshot = await getDoc(ref);
      const data = snapshot.data();
      setAddresses(data?.addresses || []);
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddAddress = async () => {
    try {
      const ref = doc(db, 'users', userProfile.uid);
      await updateDoc(ref, {
        addresses: arrayUnion(formData)
      });
      toast.success('Address added');
      setFormData({ name: '', phone: '', address: '', pincode: '', city: '', state: '' });
      setShowForm(false);
      fetchAddresses();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add address');
    }
  };

  const handleDeleteAddress = async (addressToDelete) => {
    try {
      const ref = doc(db, 'users', userProfile.uid);
      await updateDoc(ref, {
        addresses: arrayRemove(addressToDelete)
      });
      toast.success('Address deleted');
      fetchAddresses();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete address');
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push('/');
      toast.success('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { name: 'My Purchases', link: '/orders' },
    { name: 'My Details', link: '/accountDetails' },
    { name: 'Wishlist', link: '/wishlist' }
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-[40px] mb-6">{userProfile?.displayName}</h2>

      <ul className="space-y-5">
        {menuItems.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center text-sm font-medium text-black hover:opacity-70">
            <Link href={item.link} className="flex justify-between w-full items-center">
              <span className="uppercase">{item.name}</span>
              <FiArrowRight className="text-lg" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <button onClick={handleLogout} className="text-sm hover:underline text-black">Sign out</button>
      </div>

      {/* Address Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Add Your Address</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          {showForm ? 'Close' : 'Add Address'}
        </button>

        {showForm && (
          <div className="space-y-3 mb-6">
            {['name', 'phone', 'address', 'pincode', 'city', 'state'].map(field => (
              <input
                key={field}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            ))}
            <button
              onClick={handleAddAddress}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save Address
            </button>
          </div>
        )}

        {/* Address List */}
        {addresses.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Saved Addresses:</h4>
            {addresses.map((addr, index) => (
              <div key={index} className="border p-3 rounded relative bg-gray-50">
                <p><strong>Name:</strong> {addr.name}</p>
                <p><strong>Phone:</strong> {addr.phone}</p>
                <p><strong>Address:</strong> {addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                <button
                  onClick={() => handleDeleteAddress(addr)}
                  className="absolute top-2 right-2 text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
