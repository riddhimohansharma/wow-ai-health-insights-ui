import { toast } from '@/components/ui/use-toast';
import { UserProfile } from '@/pages/Index';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface ApiError extends Error {
  status?: number;
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchRecommendations(userProfile: UserProfile, retryCount = 0): Promise<any> {
  try {
    const response = await fetch('http://localhost:8000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userProfile),
    });

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`) as ApiError;
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      toast({
        title: "Connection failed",
        description: `Retrying... Attempt ${retryCount + 1} of ${MAX_RETRIES}`,
        variant: "destructive",
      });

      await delay(RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
      return fetchRecommendations(userProfile, retryCount + 1);
    }

    // If all retries failed, throw the error
    toast({
      title: "Error",
      description: "Failed to fetch recommendations. Please try again later.",
      variant: "destructive",
    });

    throw error;
  }
}
