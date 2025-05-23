
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, User } from 'lucide-react';
import { UserProfile } from '@/pages/Index';

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  loading: boolean;
}

export const UserProfileForm = ({ onSubmit, loading }: UserProfileFormProps) => {
  const [formData, setFormData] = useState<UserProfile>({
    condition: '',
    language: 'en',
    literacy_level: 'medium',
    age_group: 'adult',
    summary: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.condition && formData.summary) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose a User Profile</h2>
        <p className="text-gray-600">Tell us about your health needs to get personalized recommendations.</p>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl text-teal-700">Health Profile Information</CardTitle>
          <CardDescription>
            We'll use this information to find the most relevant health articles for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="condition" className="text-sm font-medium text-gray-700">
                  Primary Health Condition *
                </Label>
                <Input
                  id="condition"
                  type="text"
                  placeholder="e.g., diabetes, hypertension"
                  value={formData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                  className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="text-sm font-medium text-gray-700">
                  Preferred Language
                </Label>
                <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                  <SelectTrigger className="border-gray-200 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                    <SelectItem value="ur">Urdu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="literacy_level" className="text-sm font-medium text-gray-700">
                  Reading Level
                </Label>
                <Select value={formData.literacy_level} onValueChange={(value: any) => handleInputChange('literacy_level', value)}>
                  <SelectTrigger className="border-gray-200 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basic</SelectItem>
                    <SelectItem value="medium">Intermediate</SelectItem>
                    <SelectItem value="high">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age_group" className="text-sm font-medium text-gray-700">
                  Age Group
                </Label>
                <Select value={formData.age_group} onValueChange={(value: any) => handleInputChange('age_group', value)}>
                  <SelectTrigger className="border-gray-200 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="child">Child (0-17)</SelectItem>
                    <SelectItem value="adult">Adult (18-39)</SelectItem>
                    <SelectItem value="middle-aged">Middle-aged (40-59)</SelectItem>
                    <SelectItem value="older adult">Older Adult (60-74)</SelectItem>
                    <SelectItem value="geriatric">Senior (75+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary" className="text-sm font-medium text-gray-700">
                What are you looking for? *
              </Label>
              <Textarea
                id="summary"
                placeholder="Describe what kind of health information or support you're seeking..."
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                className="border-gray-200 focus:border-teal-500 focus:ring-teal-500 min-h-[100px]"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
              disabled={loading || !formData.condition || !formData.summary}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Finding Articles...
                </>
              ) : (
                'Get Health Insights'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
