
import { Heart } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-teal-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              WOW for Health
            </h1>
            <p className="text-sm text-gray-600 italic">Your Health, Your Way, Every Day. Personalized for You.</p>
          </div>
        </div>
      </div>
    </header>
  );
};
