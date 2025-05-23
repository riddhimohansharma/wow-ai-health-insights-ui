
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Tag, User, Globe, GraduationCap } from 'lucide-react';
import { Article, UserProfile } from '@/pages/Index';

interface ArticleListProps {
  articles: Article[];
  userProfile: UserProfile;
  onReset: () => void;
  loading: boolean;
}

export const ArticleList = ({ articles, userProfile, onReset, loading }: ArticleListProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 0.8) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 0.7) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatScore = (score: number) => {
    return `${Math.round(score * 100)}% match`;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Finding personalized health insights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Header with User Profile Summary */}
      <div className="mb-8">
        <Button 
          onClick={onReset}
          variant="outline"
          className="mb-6 border-teal-300 text-teal-700 hover:bg-teal-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          New Search
        </Button>
        
        <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-teal-800">
              <User className="w-5 h-5 mr-2" />
              Your Health Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-teal-600" />
                <span className="font-medium">Condition:</span>
                <span className="ml-1 text-gray-700">{userProfile.condition}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-teal-600" />
                <span className="font-medium">Language:</span>
                <span className="ml-1 text-gray-700">{userProfile.language.toUpperCase()}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-2 text-teal-600" />
                <span className="font-medium">Level:</span>
                <span className="ml-1 text-gray-700 capitalize">{userProfile.literacy_level}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-teal-600" />
                <span className="font-medium">Age:</span>
                <span className="ml-1 text-gray-700 capitalize">{userProfile.age_group}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Insight Results
        </h2>
        <p className="text-gray-600">
          Found {articles.length} personalized health articles based on your profile
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Card 
            key={article.id} 
            className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white border-gray-200 hover:border-teal-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-3">
                <Badge 
                  variant="outline" 
                  className={`${getScoreColor(article.score)} font-medium`}
                >
                  {formatScore(article.score)}
                </Badge>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <CardTitle className="text-lg leading-tight text-gray-900 hover:text-teal-700 transition-colors cursor-pointer">
                {article.payload.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 line-clamp-3">
                {article.payload.summary}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {article.payload.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="secondary" 
                      className="text-xs bg-teal-100 text-teal-700 hover:bg-teal-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {article.payload.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                      +{article.payload.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Source */}
                <div className="text-xs text-gray-500 border-t pt-3">
                  <span className="font-medium">Source:</span> {article.payload.source}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found. Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};
