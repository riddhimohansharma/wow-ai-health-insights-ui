
import { Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-teal-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* WOW Logo */}
              <div className="relative">
                <div className="flex items-center text-4xl font-bold">
                  <span className="text-teal-600">W</span>
                  <div className="relative mx-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center relative">
                      <Heart className="w-6 h-6 text-white fill-white" />
                      {/* Radiating lines */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-0.5 h-3 bg-teal-400"></div>
                      </div>
                      <div className="absolute -top-1 -right-1 transform rotate-45">
                        <div className="w-0.5 h-2 bg-teal-400"></div>
                      </div>
                      <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                        <div className="w-3 h-0.5 bg-teal-400"></div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 transform -rotate-45">
                        <div className="w-0.5 h-2 bg-teal-400"></div>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-0.5 h-3 bg-teal-400"></div>
                      </div>
                      <div className="absolute -bottom-1 -left-1 transform rotate-45">
                        <div className="w-0.5 h-2 bg-teal-400"></div>
                      </div>
                      <div className="absolute top-1/2 -left-2 transform -translate-y-1/2">
                        <div className="w-3 h-0.5 bg-teal-400"></div>
                      </div>
                      <div className="absolute -top-1 -left-1 transform -rotate-45">
                        <div className="w-0.5 h-2 bg-teal-400"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-teal-600">W</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-teal-700 leading-none">
                  Insights for Health
                </h1>
              </div>
            </div>
            <div className="border-l border-gray-300 pl-4 ml-2">
              <p className="text-sm text-orange-600 italic font-medium">
                Your Health, Your Way, Every Day.
              </p>
              <p className="text-sm text-orange-500 italic">
                — Personalized for You.
              </p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                className={location.pathname === '/' ? 'bg-teal-600 hover:bg-teal-700' : 'hover:bg-teal-50 hover:text-teal-700'}
              >
                Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}
                className={location.pathname === '/dashboard' ? 'bg-teal-600 hover:bg-teal-700' : 'hover:bg-teal-50 hover:text-teal-700'}
              >
                Dashboard
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
