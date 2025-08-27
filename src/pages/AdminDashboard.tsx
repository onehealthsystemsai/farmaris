import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Mail, Phone, LogOut, Download, BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  attendees: number;
  accessibility: string;
  mealPreference: string;
  beveragePreference: string;
  timestamp: string;
  confirmationId: string;
}

function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalAttendees: 0,
    mealStats: {} as Record<string, number>,
    beverageStats: {} as Record<string, number>
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin');
      return;
    }

    // Load registrations from localStorage
    const savedRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    setRegistrations(savedRegistrations);

    // Calculate statistics
    const totalRegistrations = savedRegistrations.length;
    const totalAttendees = savedRegistrations.reduce((sum: number, reg: Registration) => sum + reg.attendees, 0);
    
    const mealStats: Record<string, number> = {};
    const beverageStats: Record<string, number> = {};
    
    savedRegistrations.forEach((reg: Registration) => {
      if (reg.mealPreference) {
        mealStats[reg.mealPreference] = (mealStats[reg.mealPreference] || 0) + 1;
      }
      if (reg.beveragePreference) {
        beverageStats[reg.beveragePreference] = (beverageStats[reg.beveragePreference] || 0) + 1;
      }
    });

    setStats({ totalRegistrations, totalAttendees, mealStats, beverageStats });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  const exportData = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Attendees', 'Meal Preference', 'Beverage Preference', 'Special Requirements', 'Registration Date', 'Confirmation ID'],
      ...registrations.map(reg => [
        reg.fullName,
        reg.email,
        reg.phone,
        reg.attendees.toString(),
        reg.mealPreference,
        reg.beveragePreference,
        reg.accessibility,
        new Date(reg.timestamp).toLocaleDateString(),
        reg.confirmationId
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aris-farm-registrations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-800">Aris Farm Admin</h1>
            <p className="text-gray-600">Event Registration Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-green-600 hover:text-green-800"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Registrations</p>
                <p className="text-3xl font-bold text-green-800">{stats.totalRegistrations}</p>
              </div>
              <Users className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Attendees</p>
                <p className="text-3xl font-bold text-blue-800">{stats.totalAttendees}</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Meal Preferences</p>
                <p className="text-3xl font-bold text-yellow-800">{Object.keys(stats.mealStats).length}</p>
              </div>
              <PieChart className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Beverage Types</p>
                <p className="text-3xl font-bold text-purple-800">{Object.keys(stats.beverageStats).length}</p>
              </div>
              <BarChart3 className="w-12 h-12 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Meal Preferences</h3>
            <div className="space-y-3">
              {Object.entries(stats.mealStats).map(([meal, count]) => (
                <div key={meal} className="flex items-center justify-between">
                  <span className="capitalize text-gray-700">{meal.replace(/([A-Z])/g, ' $1')}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(count / stats.totalRegistrations) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Beverage Preferences</h3>
            <div className="space-y-3">
              {Object.entries(stats.beverageStats).map(([beverage, count]) => (
                <div key={beverage} className="flex items-center justify-between">
                  <span className="capitalize text-gray-700">{beverage.replace(/([A-Z])/g, ' $1')}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / stats.totalRegistrations) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="mb-6">
          <button
            onClick={exportData}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            <Download className="w-5 h-5" />
            <span>Export Registrations (CSV)</span>
          </button>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">All Registrations</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferences</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confirmation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{registration.fullName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{registration.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{registration.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {registration.attendees} {registration.attendees === 1 ? 'person' : 'people'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div>Meal: {registration.mealPreference || 'Not specified'}</div>
                      <div>Drink: {registration.beveragePreference || 'Not specified'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(registration.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {registration.confirmationId}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {registrations.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No registrations yet</h3>
            <p className="text-gray-600">Registrations will appear here as people sign up for the event.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;