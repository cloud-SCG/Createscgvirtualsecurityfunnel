import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { LogOut, Construction, RefreshCw, Mail, Phone, DollarSign, Briefcase, Calendar, CheckCircle } from 'lucide-react';
import logo from 'figma:asset/da23dae556a7184af66fd88b59c6d1866dc2cc68.png';
import { toast } from 'sonner@2.0.3';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  submittedAt: string;
  status: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [diagnostics, setDiagnostics] = useState<any>({});

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      setUserEmail(session.user.email || '');
      setAccessToken(session.access_token);
      setLoading(false);
      
      // Fetch leads
      fetchLeads(session.access_token);
      
      // Also test the debug endpoint
      testDebugEndpoint();
    };

    checkAuth();
  }, [navigate]);

  const testDebugEndpoint = async () => {
    try {
      console.log('🔍 Testing debug endpoint...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7e40671b/debug/leads`
      );
      const data = await response.json();
      console.log('✅ Debug endpoint response:', data);
      setDebugInfo(`Debug: ${data.count} leads found in KV store`);
      setDiagnostics(prev => ({ ...prev, debugLeads: data.leads, debugCount: data.count }));
    } catch (error) {
      console.error('❌ Debug endpoint error:', error);
      setDebugInfo('Debug endpoint error: ' + error.message);
      setDiagnostics(prev => ({ ...prev, debugError: error.message }));
    }
  };

  const fetchLeads = async (token: string) => {
    try {
      setRefreshing(true);
      console.log('🔍 Fetching leads from backend...');
      console.log('📍 Using token:', token ? 'Token present' : 'NO TOKEN');
      console.log('📍 API URL:', `https://${projectId}.supabase.co/functions/v1/make-server-7e40671b/leads`);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7e40671b/leads`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('📡 Response status:', response.status);
      const data = await response.json();
      console.log('📦 Response data:', data);

      if (!response.ok) {
        console.error('❌ Failed to fetch leads - Status:', response.status, 'Error:', data.error);
        toast.error(`Failed to load leads: ${data.error || 'Unknown error'}`);
        setDiagnostics(prev => ({ 
          ...prev, 
          authFetchError: data.error,
          authFetchStatus: response.status 
        }));
        setRefreshing(false);
        return;
      }

      console.log('✅ Leads loaded successfully:', data.leads?.length || 0, 'leads');
      console.log('📊 Leads data structure:', data.leads);
      setLeads(data.leads || []);
      setDiagnostics(prev => ({ 
        ...prev, 
        authLeads: data.leads,
        authLeadsCount: data.leads?.length || 0 
      }));
      setRefreshing(false);
    } catch (error) {
      console.error('❌ Network error fetching leads:', error);
      toast.error('Network error while loading leads');
      setDiagnostics(prev => ({ ...prev, networkError: error.message }));
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    console.log('Manually refreshing leads...');
    fetchLeads(accessToken);
    toast.success('Refreshing leads...');
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Logout failed');
      return;
    }
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <img src={logo} alt="SCG Virtual Security" className="h-14 w-auto" />
              <div className="text-xs text-gray-600">PPO#119767</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-700">
                {userEmail}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and track your incoming leads</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 bg-[#F5B84A] text-black px-4 py-2 rounded-lg hover:bg-[#e5a839] transition-colors font-medium disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900">{leads.length}</p>
              </div>
              <div className="bg-[#F5B84A]/20 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-[#F5B84A]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New Leads</p>
                <p className="text-3xl font-bold text-gray-900">
                  {leads.filter(l => l.status === 'new').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Week</p>
                <p className="text-3xl font-bold text-gray-900">
                  {leads.filter(l => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(l.submittedAt) > weekAgo;
                  }).length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
          </div>

          {leads.length === 0 ? (
            <div className="p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-100 p-6 rounded-full">
                  <Briefcase className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Leads Yet</h3>
              <p className="text-gray-600">
                Leads submitted through your website will appear here
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <a 
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1 text-sm text-gray-900 hover:text-[#F5B84A]"
                          >
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </a>
                          {lead.email && (
                            <a 
                              href={`mailto:${lead.email}`}
                              className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#F5B84A]"
                            >
                              <Mail className="w-3 h-3" />
                              {lead.email}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{lead.service}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {lead.budget || '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{formatDate(lead.submittedAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Debug Info */}
        <div className="mt-8 bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">{debugInfo}</p>
        </div>

        {/* Comprehensive Diagnostics Panel */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4">🔍 System Diagnostics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Debug Endpoint (No Auth):</p>
              <p className="text-gray-600">Leads in KV Store: <span className="font-bold">{diagnostics.debugCount ?? '...'}</span></p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Auth Endpoint (With Token):</p>
              <p className="text-gray-600">Leads Retrieved: <span className="font-bold">{diagnostics.authLeadsCount ?? '...'}</span></p>
            </div>
          </div>
          
          {diagnostics.authFetchError && (
            <div className="mt-4 bg-red-100 border border-red-300 p-3 rounded">
              <p className="font-medium text-red-800">Auth Error:</p>
              <p className="text-red-700 text-xs">{diagnostics.authFetchError}</p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-xs text-gray-500">
              💡 If debug count is higher than auth count, there may be an authentication issue.
              <br />
              💡 Check browser console (F12) for detailed logs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}