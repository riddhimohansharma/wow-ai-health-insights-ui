import { Article, UserProfile } from './Index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Search, TrendingUp, User, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PreloadedUser extends UserProfile {
  id: string;
  name: string;
  email: string;
  lastAccess: string;
}

const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState<PreloadedUser | null>(null);
  const [userArticles, setUserArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search query

  // Mock pre-loaded users
  const preloadedUsers: PreloadedUser[] = [
    {
      id: "1",
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      condition: "type 2 diabetes",
      language: "en",
      literacy_level: "medium",
      age_group: "adult",
      summary: "Looking for diabetes management resources",
      lastAccess: "2024-01-15"
    },
    {
      id: "2",
      name: "John Smith",
      email: "john.smith@email.com",
      condition: "hypertension",
      language: "en",
      literacy_level: "high",
      age_group: "middle-aged",
      summary: "Seeking heart health information",
      lastAccess: "2024-01-14"
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      condition: "chronic fatigue",
      language: "en",
      literacy_level: "low",
      age_group: "older adult",
      summary: "Need energy management strategies",
      lastAccess: "2024-01-13"
    },
    {
      id: "4",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      condition: "multiple sclerosis",
      language: "en",
      literacy_level: "medium",
      age_group: "adult",
      summary: "Looking for MS symptom management",
      lastAccess: "2024-01-12"
    }
  ];

  // Filter users based on the search query
  const filteredUsers = preloadedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchUserRecommendations = async (user: PreloadedUser, retry: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/recommend?use_filters=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          condition: user.condition,
          language: user.language,
          literacy_level: user.literacy_level,
          age_group: user.age_group,
          summary: user.summary,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
      }

      const articles: Article[] = await response.json();
      setUserArticles(articles);
      setLoading(false);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
      setError('Failed to fetch recommendations. Please try again.');

      // Implement exponential backoff for retries
      if (retry && retryCount < 3) {
        const backoffDelay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          fetchUserRecommendations(user, true);
        }, backoffDelay);
      }
    }
  };

  const handleRetry = () => {
    if (selectedUser) {
      setRetryCount(0);
      fetchUserRecommendations(selectedUser, true);
    }
  };

  const handleUserSelect = (user: PreloadedUser) => {
    setSelectedUser(user);
    setError(null);
    fetchUserRecommendations(user, true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 0.8) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 0.7) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatScore = (score: number) => {
    return `${Math.round(score * 100)}% match`;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Health Insights Dashboard
          </h1>
          <p className="text-gray-600">Manage user profiles and view personalized health recommendations</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{preloadedUsers.length}</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userArticles.length}</p>
                  <p className="text-sm text-gray-600">Recommendations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {userArticles.length > 0 ? Math.round(userArticles[0]?.score * 100) : 0}%
                  </p>
                  <p className="text-sm text-gray-600">Avg Match Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Search className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                  <p className="text-sm text-gray-600">Conditions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-teal-800">
                  <Users className="w-5 h-5 mr-2" />
                  User Profiles
                </CardTitle>
                <CardDescription>Select a user to view their recommendations</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {preloadedUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-teal-50 ${
                        selectedUser?.id === user.id ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
                      }`}
                      onClick={() => handleUserSelect(user)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700">
                              {user.condition}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Last access: {user.lastAccess}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredUsers.length === 0 && (
                    <p className="text-gray-500 text-sm text-center">No users found.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Display */}
          <div className="lg:col-span-2">
            {!selectedUser ? (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a User</h3>
                  <p className="text-gray-500">Choose a user from the list to view their personalized health recommendations</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="text-red-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-900 mb-4">{error}</p>
                  <Button
                    onClick={handleRetry}
                    disabled={loading}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {loading ? 'Retrying...' : 'Retry'}
                  </Button>
                </CardContent>
              </Card>
            ) : loading ? (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg text-gray-600">Loading recommendations...</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* User Profile Summary */}
                <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-teal-800">
                      <User className="w-5 h-5 mr-2" />
                      {selectedUser.name} - Health Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Condition:</span>
                        <p className="text-gray-700 capitalize">{selectedUser.condition}</p>
                      </div>
                      <div>
                        <span className="font-medium">Age Group:</span>
                        <p className="text-gray-700 capitalize">{selectedUser.age_group}</p>
                      </div>
                      <div>
                        <span className="font-medium">Literacy Level:</span>
                        <p className="text-gray-700 capitalize">{selectedUser.literacy_level}</p>
                      </div>
                      <div>
                        <span className="font-medium">Language:</span>
                        <p className="text-gray-700 uppercase">{selectedUser.language}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Personalized Recommendations ({userArticles.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {userArticles.map((article, index) => (
                      <Card
                        key={article.id}
                        className="hover:shadow-lg transition-all duration-200 bg-white border-gray-200 hover:border-teal-300"
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-3">
                            <Badge
                              variant="outline"
                              className={`${getScoreColor(article.score)} font-medium`}
                            >
                              {formatScore(article.score)}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg leading-tight text-gray-900">
                            {article.payload.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600">
                            {article.payload.summary}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {article.payload.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="secondary"
                                  className="text-xs bg-teal-100 text-teal-700"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="text-xs text-gray-500 border-t pt-3">
                              <span className="font-medium">Source:</span> {article.payload.source}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
