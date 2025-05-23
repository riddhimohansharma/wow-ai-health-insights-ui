
import { useState } from 'react';
import { UserProfileForm } from '@/components/UserProfileForm';
import { ArticleList } from '@/components/ArticleList';
import { Header } from '@/components/Header';

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

  const handleProfileSubmit = async (profile: UserProfile) => {
    setLoading(true);
    try {
      // In a real app, you'd use your actual API endpoint
      // For demo purposes, we'll simulate the API call with mock data
      const mockArticles: Article[] = [
        {
          id: "1",
          score: 0.95,
          payload: {
            id: "6921",
            title: "Managing Type 2 Diabetes",
            summary: "Understand how lifestyle changes can help manage diabetes effectively.",
            tags: ["diabetes", "lifestyle", "nutrition"],
            conditions: ["type 2 diabetes"],
            age_group: "adult",
            language: "en",
            literacy_level: "medium",
            source: "American Diabetes Association"
          }
        },
        {
          id: "2",
          score: 0.88,
          payload: {
            id: "5234",
            title: "Understanding High Blood Pressure",
            summary: "Learn the causes and treatments for hypertension.",
            tags: ["hypertension", "heart health", "treatment"],
            conditions: ["high blood pressure"],
            age_group: "adult",
            language: "en",
            literacy_level: "medium",
            source: "American Heart Association"
          }
        },
        {
          id: "3",
          score: 0.82,
          payload: {
            id: "7891",
            title: "Heart Attack: Warning Signs",
            summary: "Recognize early signs of a heart attack and when to call 911.",
            tags: ["heart attack", "emergency", "symptoms"],
            conditions: ["heart disease"],
            age_group: "adult",
            language: "en",
            literacy_level: "medium",
            source: "Mayo Clinic"
          }
        }
      ];

      // Simulate API delay
      setTimeout(() => {
        setArticles(mockArticles);
        setUserProfile(profile);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching articles:', error);
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
