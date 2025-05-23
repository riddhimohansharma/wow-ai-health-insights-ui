import { ArticleList } from '@/components/ArticleList';
import { Header } from '@/components/Header';
import { UserProfileForm } from '@/components/UserProfileForm';
import { fetchRecommendations } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface UserProfile {
  condition: string;
  language: string;
  literacy_level: 'low' | 'medium' | 'high';
  age_group: 'child' | 'adult' | 'middle-aged' | 'older adult' | 'geriatric';
  summary: string;
}

export interface Article {
  id: string;
  score: number;
  payload: {
    id: string;
    title: string;
    summary: string;
    tags: string[];
    conditions: string[];
    age_group: string;
    language: string;
    literacy_level: string;
    source: string;
  };
}

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleProfileSubmit = async (profile: UserProfile) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchRecommendations(profile);
      setArticles(response);
      setUserProfile(profile);

      toast({
        title: "Success",
        description: "Recommendations fetched successfully",
      });
    } catch (error) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserProfile(null);
    setArticles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
          Go to Dashboard
        </button>

        {!userProfile ? (
          <UserProfileForm onSubmit={handleProfileSubmit} loading={loading} />
        ) : (
          <ArticleList
            articles={articles}
            userProfile={userProfile}
            onReset={handleReset}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
