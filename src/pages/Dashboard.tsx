
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Search, FileText, TrendingUp, Users } from 'lucide-react';
import { UserProfile, Article } from './Index';

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

  const fetchUserRecommendations = async (user: PreloadedUser) => {
    setLoading(true);
    try {
      // Mock API response based on user profile
      const mockArticles: Article[] = [
        {
          id: "1",
          score: 0.95,
          payload: {
            id: "6921",
            title: `Managing ${user.condition}`,
            summary: `Personalized strategies for managing ${user.condition} effectively.`,
            tags: [user.condition.split(' ')[0], "management", "lifestyle"],
            conditions: [user.condition],
            age_group: user.age_group,
            language: user.language,
            literacy_level: user.literacy_level,
            source: "Health Authority"
          }
        },
        {
          id: "2",
          score: 0.88,
          payload: {
            id: "5234",
            title: "Lifestyle Changes for Better Health",
            summary: "Evidence-based lifestyle modifications for chronic conditions.",
            tags: ["lifestyle", "nutrition", "exercise"],
            conditions: [user.condition],
            age_group: user.age_group,
            language: user.language,
            literacy_level: user.literacy_level,
            source: "Medical Institute"
          }
        },
        {
          id: "3",
          score: 0.82,
          payload: {
            id: "7891",
            title: "Understanding Your Treatment Options",
            summary: "Comprehensive guide to available treatments and therapies.",
            tags: ["treatment", "therapy", "options"],
            conditions: [user.condition],
            age_group: user.age_group,
            language: user.language,
            literacy_level: user.literacy_level,
            source: "Treatment Center"
          }
        }
      ];

      setTimeout(() => {
        setUserArticles(mockArticles);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  const handleUserSelect = (user: PreloadedUser) => {
    setSelectedUser(user);
    fetchUserRecommendations(user);
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
