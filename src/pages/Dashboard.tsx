import { Article, UserProfile } from './Index';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Search, TrendingUp, User, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PreloadedUser extends UserProfile {
  id: string;
  name: string;
  email: string;
  lastAccess: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<PreloadedUser | null>(null);
  const [userArticles, setUserArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search query

  // Mock pre-loaded users
  const preloadedUsers: PreloadedUser[] = [
    {
      "id": "1",
      "name": "George Allen",
      "email": "george.allen@healthcareportal.com",
      "condition": "COPD",
      "language": "en",
      "literacy_level": "low",
      "age_group": "older adult",
      "summary": "Seeking resources for managing COPD",
      "lastAccess": "2024-02-01",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Honolulu",
      "state": "New Mexico",
      "country": "US"
    },
    {
      "id": "2",
      "name": "Sarah Peterson",
      "email": "sarah.peterson@healthcareportal.com",
      "condition": "chronic pain",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "51-70",
      "summary": "Seeking resources for managing chronic pain",
      "lastAccess": "2024-02-21",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Phoenix",
      "state": "Arizona",
      "country": "US"
    },
    {
      "id": "3",
      "name": "Justin Peterson",
      "email": "justin.peterson@healthcareportal.com",
      "condition": "asthma",
      "language": "en",
      "literacy_level": "high",
      "age_group": "adult",
      "summary": "Seeking resources for managing asthma",
      "lastAccess": "2024-02-17",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Denver",
      "state": "Colorado",
      "country": "US"
    },
    {
      "id": "4",
      "name": "Maria Rodriguez",
      "email": "maria.rodriguez@healthcareportal.com",
      "condition": "diabetes",
      "language": "es",
      "literacy_level": "medium",
      "age_group": "middle-aged",
      "summary": "Seeking resources for managing diabetes",
      "lastAccess": "2024-03-05",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Miami",
      "state": "Florida",
      "country": "US"
    },
    {
      "id": "5",
      "name": "Robert Johnson",
      "email": "robert.johnson@healthcareportal.com",
      "condition": "hypertension",
      "language": "en",
      "literacy_level": "high",
      "age_group": "51-70",
      "summary": "Managing high blood pressure and lifestyle changes",
      "lastAccess": "2024-02-28",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Chicago",
      "state": "Illinois",
      "country": "US"
    },
    {
      "id": "6",
      "name": "Lisa Chen",
      "email": "lisa.chen@healthcareportal.com",
      "condition": "anxiety",
      "language": "en",
      "literacy_level": "high",
      "age_group": "18-30",
      "summary": "Seeking mental health resources for anxiety management",
      "lastAccess": "2024-03-10",
      "visual_aids": true,
      "content_depth": "summary",
      "city": "San Francisco",
      "state": "California",
      "country": "US"
    },
    {
      "id": "7",
      "name": "Michael Brown",
      "email": "michael.brown@healthcareportal.com",
      "condition": "arthritis",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "51-70",
      "summary": "Joint pain management and mobility resources",
      "lastAccess": "2024-02-15",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Atlanta",
      "state": "Georgia",
      "country": "US"
    },
    {
      "id": "8",
      "name": "Jennifer Davis",
      "email": "jennifer.davis@healthcareportal.com",
      "condition": "depression",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "31-50",
      "summary": "Mental health support and therapy resources",
      "lastAccess": "2024-03-02",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Seattle",
      "state": "Washington",
      "country": "US"
    },
    {
      "id": "9",
      "name": "David Wilson",
      "email": "david.wilson@healthcareportal.com",
      "condition": "heart disease",
      "language": "en",
      "literacy_level": "low",
      "age_group": "51-70",
      "summary": "Cardiac care and lifestyle modification guidance",
      "lastAccess": "2024-02-20",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Houston",
      "state": "Texas",
      "country": "US"
    },
    {
      "id": "10",
      "name": "Amanda Martinez",
      "email": "amanda.martinez@healthcareportal.com",
      "condition": "migraine",
      "language": "en",
      "literacy_level": "high",
      "age_group": "31-50",
      "summary": "Headache management and trigger identification",
      "lastAccess": "2024-03-08",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Portland",
      "state": "Oregon",
      "country": "US"
    },
    {
      "id": "11",
      "name": "James Taylor",
      "email": "james.taylor@healthcareportal.com",
      "condition": "COPD",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "51-70",
      "summary": "Respiratory therapy and breathing exercises",
      "lastAccess": "2024-02-25",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Boston",
      "state": "Massachusetts",
      "country": "US"
    },
    {
      "id": "12",
      "name": "Patricia Garcia",
      "email": "patricia.garcia@healthcareportal.com",
      "condition": "fibromyalgia",
      "language": "es",
      "literacy_level": "low",
      "age_group": "31-50",
      "summary": "Pain management and energy conservation techniques",
      "lastAccess": "2024-03-01",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Los Angeles",
      "state": "California",
      "country": "US"
    },
    {
      "id": "13",
      "name": "Christopher Lee",
      "email": "christopher.lee@healthcareportal.com",
      "condition": "asthma",
      "language": "en",
      "literacy_level": "high",
      "age_group": "18-30",
      "summary": "Inhaler technique and asthma action plan development",
      "lastAccess": "2024-02-18",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Nashville",
      "state": "Tennessee",
      "country": "US"
    },
    {
      "id": "14",
      "name": "Karen White",
      "email": "karen.white@healthcareportal.com",
      "condition": "chronic pain",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "51-70",
      "summary": "Non-pharmacological pain management strategies",
      "lastAccess": "2024-03-06",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Dallas",
      "state": "Texas",
      "country": "US"
    },
    {
      "id": "15",
      "name": "Daniel Thompson",
      "email": "daniel.thompson@healthcareportal.com",
      "condition": "diabetes",
      "language": "en",
      "literacy_level": "high",
      "age_group": "31-50",
      "summary": "Blood glucose monitoring and dietary planning",
      "lastAccess": "2024-02-22",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Philadelphia",
      "state": "Pennsylvania",
      "country": "US"
    },
    {
      "id": "16",
      "name": "Nancy Anderson",
      "email": "nancy.anderson@healthcareportal.com",
      "condition": "osteoporosis",
      "language": "en",
      "literacy_level": "low",
      "age_group": "51-70",
      "summary": "Bone health and fall prevention strategies",
      "lastAccess": "2024-03-04",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Phoenix",
      "state": "Arizona",
      "country": "US"
    },
    {
      "id": "17",
      "name": "Mark Jackson",
      "email": "mark.jackson@healthcareportal.com",
      "condition": "sleep apnea",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "31-50",
      "summary": "CPAP therapy and sleep hygiene improvement",
      "lastAccess": "2024-02-27",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Las Vegas",
      "state": "Nevada",
      "country": "US"
    },
    {
      "id": "18",
      "name": "Susan Harris",
      "email": "susan.harris@healthcareportal.com",
      "condition": "anxiety",
      "language": "en",
      "literacy_level": "high",
      "age_group": "18-30",
      "summary": "Cognitive behavioral therapy techniques for anxiety",
      "lastAccess": "2024-03-09",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Minneapolis",
      "state": "Minnesota",
      "country": "US"
    },
    {
      "id": "19",
      "name": "Paul Clark",
      "email": "paul.clark@healthcareportal.com",
      "condition": "hypertension",
      "language": "en",
      "literacy_level": "low",
      "age_group": "51-70",
      "summary": "Medication adherence and blood pressure monitoring",
      "lastAccess": "2024-02-16",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Tampa",
      "state": "Florida",
      "country": "US"
    },
    {
      "id": "20",
      "name": "Linda Lewis",
      "email": "linda.lewis@healthcareportal.com",
      "condition": "depression",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "31-50",
      "summary": "Mood tracking and support group resources",
      "lastAccess": "2024-03-07",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Milwaukee",
      "state": "Wisconsin",
      "country": "US"
    },
    {
      "id": "21",
      "name": "Steven Rodriguez",
      "email": "steven.rodriguez@healthcareportal.com",
      "condition": "heart disease",
      "language": "es",
      "literacy_level": "medium",
      "age_group": "51-70",
      "summary": "Cardiac rehabilitation and exercise programs",
      "lastAccess": "2024-02-24",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "San Antonio",
      "state": "Texas",
      "country": "US"
    },
    {
      "id": "22",
      "name": "Betty Walker",
      "email": "betty.walker@healthcareportal.com",
      "condition": "arthritis",
      "language": "en",
      "literacy_level": "low",
      "age_group": "51-70",
      "summary": "Joint protection and adaptive equipment",
      "lastAccess": "2024-03-03",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Cleveland",
      "state": "Ohio",
      "country": "US"
    },
    {
      "id": "23",
      "name": "Kevin Hall",
      "email": "kevin.hall@healthcareportal.com",
      "condition": "migraine",
      "language": "en",
      "literacy_level": "high",
      "age_group": "31-50",
      "summary": "Migraine prevention and acute treatment options",
      "lastAccess": "2024-02-19",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Salt Lake City",
      "state": "Utah",
      "country": "US"
    },
    {
      "id": "24",
      "name": "Helen Young",
      "email": "helen.young@healthcareportal.com",
      "condition": "COPD",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "51-70",
      "summary": "Pulmonary rehabilitation and oxygen therapy",
      "lastAccess": "2024-03-11",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Richmond",
      "state": "Virginia",
      "country": "US"
    },
    {
      "id": "25",
      "name": "Edward King",
      "email": "edward.king@healthcareportal.com",
      "condition": "fibromyalgia",
      "language": "en",
      "literacy_level": "high",
      "age_group": "31-50",
      "summary": "Multidisciplinary pain management approach",
      "lastAccess": "2024-02-26",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Charlotte",
      "state": "North Carolina",
      "country": "US"
    },
    {
      "id": "26",
      "name": "Dorothy Wright",
      "email": "dorothy.wright@healthcareportal.com",
      "condition": "asthma",
      "language": "en",
      "literacy_level": "low",
      "age_group": "18-30",
      "summary": "Environmental trigger avoidance strategies",
      "lastAccess": "2024-03-12",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Kansas City",
      "state": "Missouri",
      "country": "US"
    },
    {
      "id": "27",
      "name": "Brian Lopez",
      "email": "brian.lopez@healthcareportal.com",
      "condition": "chronic pain",
      "language": "es",
      "literacy_level": "medium",
      "age_group": "51-70",
      "summary": "Physical therapy and movement strategies",
      "lastAccess": "2024-02-29",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Albuquerque",
      "state": "New Mexico",
      "country": "US"
    },
    {
      "id": "28",
      "name": "Sandra Hill",
      "email": "sandra.hill@healthcareportal.com",
      "condition": "diabetes",
      "language": "en",
      "literacy_level": "high",
      "age_group": "31-50",
      "summary": "Insulin management and carbohydrate counting",
      "lastAccess": "2024-03-13",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Oklahoma City",
      "state": "Oklahoma",
      "country": "US"
    },
    {
      "id": "29",
      "name": "Gary Green",
      "email": "gary.green@healthcareportal.com",
      "condition": "hypertension",
      "language": "en",
      "literacy_level": "low",
      "age_group": "51-70",
      "summary": "Dietary modifications for blood pressure control",
      "lastAccess": "2024-02-23",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Louisville",
      "state": "Kentucky",
      "country": "US"
    },
    {
      "id": "30",
      "name": "Lisa Adams",
      "email": "lisa.adams@healthcareportal.com",
      "condition": "anxiety",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "18-30",
      "summary": "Mindfulness and relaxation techniques",
      "lastAccess": "2024-03-14",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Memphis",
      "state": "Tennessee",
      "country": "US"
    },
    {
      "id": "31",
      "name": "Frank Baker",
      "email": "frank.baker@healthcareportal.com",
      "condition": "sleep apnea",
      "language": "en",
      "literacy_level": "high",
      "age_group": "31-50",
      "summary": "Alternative sleep apnea treatments and devices",
      "lastAccess": "2024-03-01",
      "visual_aids": true,
      "content_depth": "summary",
      "city": "Baltimore",
      "state": "Maryland",
      "country": "US"
    },
    {
      "id": "32",
      "name": "Ruth Gonzalez",
      "email": "ruth.gonzalez@healthcareportal.com",
      "condition": "depression",
      "language": "es",
      "literacy_level": "low",
      "age_group": "31-50",
      "summary": "Community mental health resources and support",
      "lastAccess": "2024-02-21",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Tucson",
      "state": "Arizona",
      "country": "US"
    },
    {
      "id": "33",
      "name": "Gregory Nelson",
      "email": "gregory.nelson@healthcareportal.com",
      "condition": "heart disease",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "51-70",
      "summary": "Heart-healthy cooking and meal planning",
      "lastAccess": "2024-03-15",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Buffalo",
      "state": "New York",
      "country": "US"
    },
    {
      "id": "34",
      "name": "Deborah Carter",
      "email": "deborah.carter@healthcareportal.com",
      "condition": "osteoporosis",
      "language": "en",
      "literacy_level": "high",
      "age_group": "51-70",
      "summary": "Calcium and vitamin D supplementation guidance",
      "lastAccess": "2024-02-28",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Rochester",
      "state": "New York",
      "country": "US"
    },
    {
      "id": "35",
      "name": "Raymond Mitchell",
      "email": "raymond.mitchell@healthcareportal.com",
      "condition": "arthritis",
      "language": "en",
      "literacy_level": "low",
      "age_group": "51-70",
      "summary": "Heat and cold therapy for joint pain",
      "lastAccess": "2024-03-16",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Newark",
      "state": "New Jersey",
      "country": "US"
    },
    {
      "id": "36",
      "name": "Helen Perez",
      "email": "helen.perez@healthcareportal.com",
      "condition": "migraine",
      "language": "es",
      "literacy_level": "medium",
      "age_group": "31-50",
      "summary": "Lifestyle modifications for migraine prevention",
      "lastAccess": "2024-02-25",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Fresno",
      "state": "California",
      "country": "US"
    },
    {
      "id": "37",
      "name": "Jack Roberts",
      "email": "jack.roberts@healthcareportal.com",
      "condition": "COPD",
      "language": "en",
      "literacy_level": "high",
      "age_group": "51-70",
      "summary": "Smoking cessation programs and resources",
      "lastAccess": "2024-03-17",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Columbus",
      "state": "Ohio",
      "country": "US"
    },
    {
      "id": "38",
      "name": "Diane Cook",
      "email": "diane.cook@healthcareportal.com",
      "condition": "fibromyalgia",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "31-50",
      "summary": "Sleep hygiene and fatigue management",
      "lastAccess": "2024-02-22",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Jacksonville",
      "state": "Florida",
      "country": "US"
    },
    {
      "id": "39",
      "name": "Jerry Bailey",
      "email": "jerry.bailey@healthcareportal.com",
      "condition": "asthma",
      "language": "en",
      "literacy_level": "low",
      "age_group": "18-30",
      "summary": "Exercise-induced asthma management",
      "lastAccess": "2024-03-18",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Indianapolis",
      "state": "Indiana",
      "country": "US"
    },
    {
      "id": "40",
      "name": "Joyce Rivera",
      "email": "joyce.rivera@healthcareportal.com",
      "condition": "chronic pain",
      "language": "es",
      "literacy_level": "high",
      "age_group": "51-70",
      "summary": "Integrative pain management approaches",
      "lastAccess": "2024-02-27",
      "visual_aids": true,
      "content_depth": "summary",
      "city": "San Diego",
      "state": "California",
      "country": "US"
    },
    {
      "id": "41",
      "name": "Walter Cooper",
      "email": "walter.cooper@healthcareportal.com",
      "condition": "diabetes",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "31-50",
      "summary": "Continuous glucose monitoring systems",
      "lastAccess": "2024-03-19",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Fort Worth",
      "state": "Texas",
      "country": "US"
    },
    {
      "id": "42",
      "name": "Jean Richardson",
      "email": "jean.richardson@healthcareportal.com",
      "condition": "hypertension",
      "language": "en",
      "literacy_level": "low",
      "age_group": "51-70",
      "summary": "Home blood pressure monitoring techniques",
      "lastAccess": "2024-02-24",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Charlotte",
      "state": "North Carolina",
      "country": "US"
    },
    {
      "id": "43",
      "name": "Arthur Cox",
      "email": "arthur.cox@healthcareportal.com",
      "condition": "anxiety",
      "language": "en",
      "literacy_level": "high",
      "age_group": "18-30",
      "summary": "Workplace anxiety management strategies",
      "lastAccess": "2024-03-20",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Detroit",
      "state": "Michigan",
      "country": "US"
    },
    {
      "id": "44",
      "name": "Frances Ward",
      "email": "frances.ward@healthcareportal.com",
      "condition": "sleep apnea",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "31-50",
      "summary": "CPAP machine maintenance and troubleshooting",
      "lastAccess": "2024-02-26",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "El Paso",
      "state": "Texas",
      "country": "US"
    },
    {
      "id": "45",
      "name": "Albert Torres",
      "email": "albert.torres@healthcareportal.com",
      "condition": "depression",
      "language": "es",
      "literacy_level": "low",
      "age_group": "31-50",
      "summary": "Bilingual mental health support resources",
      "lastAccess": "2024-03-21",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Denver",
      "state": "Colorado",
      "country": "US"
    },
    {
      "id": "46",
      "name": "Gloria Peterson",
      "email": "gloria.peterson@healthcareportal.com",
      "condition": "heart disease",
      "language": "en",
      "literacy_level": "high",
      "age_group": "51-70",
      "summary": "Women's heart health awareness and prevention",
      "lastAccess": "2024-02-23",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Washington",
      "state": "Washington",
      "country": "US"
    },
    {
      "id": "47",
      "name": "Ralph Gray",
      "email": "ralph.gray@healthcareportal.com",
      "condition": "osteoporosis",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "51-70",
      "summary": "Weight-bearing exercises for bone health",
      "lastAccess": "2024-03-22",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Boston",
      "state": "Massachusetts",
      "country": "US"
    },
    {
      "id": "48",
      "name": "Theresa James",
      "email": "theresa.james@healthcareportal.com",
      "condition": "arthritis",
      "language": "en",
      "literacy_level": "low",
      "age_group": "51-70",
      "summary": "Arthritis-friendly home modifications",
      "lastAccess": "2024-02-20",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Portland",
      "state": "Oregon",
      "country": "US"
    },
    {
      "id": "49",
      "name": "Jose Watson",
      "email": "jose.watson@healthcareportal.com",
      "condition": "migraine",
      "language": "es",
      "literacy_level": "high",
      "age_group": "31-50",
      "summary": "Migraine tracking and pattern identification",
      "lastAccess": "2024-03-23",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Las Vegas",
      "state": "Nevada",
      "country": "US"
    },
    {
      "id": "50",
      "name": "Evelyn Brooks",
      "email": "evelyn.brooks@healthcareportal.com",
      "condition": "COPD",
      "language": "en",
      "literacy_level": "medium",
      "age_group": "51-70",
      "summary": "Energy conservation techniques for daily activities",
      "lastAccess": "2024-02-18",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Nashville",
      "state": "Tennessee",
      "country": "US"
    },
    {
      "id": "51",
      "name": "Harold Kelly",
      "email": "harold.kelly@healthcareportal.com",
      "condition": "fibromyalgia",
      "language": "en",
      "literacy_level": "low",
      "age_group": "31-50",
      "summary": "Gentle exercise routines for fibromyalgia",
      "lastAccess": "2024-03-24",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Oklahoma City",
      "state": "Oklahoma",
      "country": "US"
    },
    {
      "id": "52",
      "name": "Shirley Sanders",
      "email": "shirley.sanders@healthcareportal.com",
      "condition": "asthma",
      "language": "en",
      "literacy_level": "high",
      "age_group": "18-30",
      "summary": "Peak flow monitoring and asthma control",
      "lastAccess": "2024-02-17",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Louisville",
      "state": "Kentucky",
      "country": "US"
    },
    {
      "id": "53",
      "name": "Carl Price",
      "email": "carl.price@healthcareportal.com",
      "condition": "chronic pain",
      "language": "en",
      "literacy_level": "middle-aged",
      "age_group": "older adult",
      "summary": "Alternative pain management therapies",
      "lastAccess": "2024-02-21",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Memphis",
      "state": "Tennessee",
      "country": "US"
    },
    {
      "id": "54",
      "name": "Pierre Dubois",
      "email": "pierre.dubois@healthcareportal.com",
      "condition": "diabetes",
      "language": "fr",
      "literacy_level": "high",
      "age_group": "middle-aged",
      "summary": "Gestion du diabète et surveillance glycémique",
      "lastAccess": "2024-03-15",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Montreal",
      "state": "Quebec",
      "country": "Canada"
    },
    {
      "id": "55",
      "name": "Hans Mueller",
      "email": "hans.mueller@healthcareportal.com",
      "condition": "hypertension",
      "language": "de",
      "literacy_level": "medium",
      "age_group": "older adult",
      "summary": "Blutdruckmanagement und Lebensstiländerungen",
      "lastAccess": "2024-03-10",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Berlin",
      "state": "Berlin",
      "country": "Germany"
    },
    {
      "id": "56",
      "name": "Akiko Tanaka",
      "email": "akiko.tanaka@healthcareportal.com",
      "condition": "anxiety",
      "language": "ja",
      "literacy_level": "high",
      "age_group": "adult",
      "summary": "不安管理とマインドフルネステクニック",
      "lastAccess": "2024-03-08",
      "visual_aids": true,
      "content_depth": "summary",
      "city": "Tokyo",
      "state": "Tokyo",
      "country": "Japan"
    },
    {
      "id": "57",
      "name": "Sophie Martin",
      "email": "sophie.martin@healthcareportal.com",
      "condition": "migraine",
      "language": "fr",
      "literacy_level": "medium",
      "age_group": "middle-aged",
      "summary": "Prévention des migraines et gestion des déclencheurs",
      "lastAccess": "2024-03-12",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Paris",
      "state": "Île-de-France",
      "country": "France"
    },
    {
      "id": "58",
      "name": "Giovanni Rossi",
      "email": "giovanni.rossi@healthcareportal.com",
      "condition": "heart disease",
      "language": "it",
      "literacy_level": "low",
      "age_group": "older adult",
      "summary": "Riabilitazione cardiaca e stile di vita sano",
      "lastAccess": "2024-03-06",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Rome",
      "state": "Lazio",
      "country": "Italy"
    },
    {
      "id": "59",
      "name": "Chen Wei",
      "email": "chen.wei@healthcareportal.com",
      "condition": "asthma",
      "language": "zh",
      "literacy_level": "high",
      "age_group": "adult",
      "summary": "哮喘管理和吸入器使用技巧",
      "lastAccess": "2024-03-14",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Beijing",
      "state": "Beijing",
      "country": "China"
    },
    {
      "id": "60",
      "name": "Isabella Silva",
      "email": "isabella.silva@healthcareportal.com",
      "condition": "fibromyalgia",
      "language": "pt",
      "literacy_level": "medium",
      "age_group": "middle-aged",
      "summary": "Gestão da dor da fibromialgia e técnicas de relaxamento",
      "lastAccess": "2024-03-09",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "São Paulo",
      "state": "São Paulo",
      "country": "Brazil"
    },
    {
      "id": "61",
      "name": "Raj Patel",
      "email": "raj.patel@healthcareportal.com",
      "condition": "diabetes",
      "language": "hi",
      "literacy_level": "medium",
      "age_group": "older adult",
      "summary": "मधुमेह प्रबंधन और आहार योजना",
      "lastAccess": "2024-03-11",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India"
    },
    {
      "id": "62",
      "name": "Emma Thompson",
      "email": "emma.thompson@healthcareportal.com",
      "condition": "COPD",
      "language": "en",
      "literacy_level": "high",
      "age_group": "older adult",
      "summary": "COPD management and breathing exercises",
      "lastAccess": "2024-03-07",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "London",
      "state": "England",
      "country": "United Kingdom"
    },
    {
      "id": "63",
      "name": "Carlos Mendez",
      "email": "carlos.mendez@healthcareportal.com",
      "condition": "chronic pain",
      "language": "es",
      "literacy_level": "low",
      "age_group": "older adult",
      "summary": "Manejo del dolor crónico y terapias alternativas",
      "lastAccess": "2024-03-13",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Mexico City",
      "state": "Mexico City",
      "country": "Mexico"
    },
    {
      "id": "64",
      "name": "Olga Petrov",
      "email": "olga.petrov@healthcareportal.com",
      "condition": "arthritis",
      "language": "ru",
      "literacy_level": "medium",
      "age_group": "older adult",
      "summary": "Управление артритом и защита суставов",
      "lastAccess": "2024-03-05",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Moscow",
      "state": "Moscow",
      "country": "Russia"
    },
    {
      "id": "65",
      "name": "Ahmed Hassan",
      "email": "ahmed.hassan@healthcareportal.com",
      "condition": "hypertension",
      "language": "ar",
      "literacy_level": "medium",
      "age_group": "middle-aged",
      "summary": "إدارة ضغط الدم العالي والنظام الغذائي الصحي",
      "lastAccess": "2024-03-16",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Cairo",
      "state": "Cairo",
      "country": "Egypt"
    },
    {
      "id": "66",
      "name": "Ingrid Larsson",
      "email": "ingrid.larsson@healthcareportal.com",
      "condition": "depression",
      "language": "sv",
      "literacy_level": "high",
      "age_group": "middle-aged",
      "summary": "Hantering av depression och mental hälsa",
      "lastAccess": "2024-03-18",
      "visual_aids": true,
      "content_depth": "summary",
      "city": "Stockholm",
      "state": "Stockholm",
      "country": "Sweden"
    },
    {
      "id": "67",
      "name": "Fatima Al-Zahra",
      "email": "fatima.alzahra@healthcareportal.com",
      "condition": "migraine",
      "language": "ar",
      "literacy_level": "low",
      "age_group": "adult",
      "summary": "الوقاية من الصداع النصفي وإدارة المحفزات",
      "lastAccess": "2024-03-17",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Dubai",
      "state": "Dubai",
      "country": "UAE"
    },
    {
      "id": "68",
      "name": "Lars Hansen",
      "email": "lars.hansen@healthcareportal.com",
      "condition": "sleep apnea",
      "language": "da",
      "literacy_level": "medium",
      "age_group": "middle-aged",
      "summary": "Behandling af søvnapnø og CPAP-terapi",
      "lastAccess": "2024-03-19",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Copenhagen",
      "state": "Capital Region",
      "country": "Denmark"
    },
    {
      "id": "69",
      "name": "Yuki Yamamoto",
      "email": "yuki.yamamoto@healthcareportal.com",
      "condition": "anxiety",
      "language": "ja",
      "literacy_level": "high",
      "age_group": "adult",
      "summary": "不安障害の管理と認知行動療法",
      "lastAccess": "2024-03-20",
      "visual_aids": true,
      "content_depth": "summary",
      "city": "Osaka",
      "state": "Osaka",
      "country": "Japan"
    },
    {
      "id": "70",
      "name": "Anastasia Volkov",
      "email": "anastasia.volkov@healthcareportal.com",
      "condition": "osteoporosis",
      "language": "ru",
      "literacy_level": "medium",
      "age_group": "older adult",
      "summary": "Профилактика остеопороза и здоровье костей",
      "lastAccess": "2024-03-21",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "St. Petersburg",
      "state": "St. Petersburg",
      "country": "Russia"
    },
    {
      "id": "71",
      "name": "Klaus Weber",
      "email": "klaus.weber@healthcareportal.com",
      "condition": "heart disease",
      "language": "de",
      "literacy_level": "low",
      "age_group": "older adult",
      "summary": "Herzgesundheit und kardiale Rehabilitation",
      "lastAccess": "2024-03-22",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Munich",
      "state": "Bavaria",
      "country": "Germany"
    },
    {
      "id": "72",
      "name": "Priya Sharma",
      "email": "priya.sharma@healthcareportal.com",
      "condition": "asthma",
      "language": "hi",
      "literacy_level": "high",
      "age_group": "adult",
      "summary": "दमा प्रबंधन और श्वसन तकनीकें",
      "lastAccess": "2024-03-23",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Delhi",
      "state": "Delhi",
      "country": "India"
    },
    {
      "id": "73",
      "name": "Marie Dubois",
      "email": "marie.dubois@healthcareportal.com",
      "condition": "fibromyalgia",
      "language": "fr",
      "literacy_level": "medium",
      "age_group": "middle-aged",
      "summary": "Gestion de la fibromyalgie et thérapies complémentaires",
      "lastAccess": "2024-03-24",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Quebec City",
      "state": "Quebec",
      "country": "Canada"
    },
    {
      "id": "74",
      "name": "Roberto Santos",
      "email": "roberto.santos@healthcareportal.com",
      "condition": "diabetes",
      "language": "pt",
      "literacy_level": "low",
      "age_group": "older adult",
      "summary": "Controle do diabetes e monitoramento glicêmico",
      "lastAccess": "2024-03-25",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Rio de Janeiro",
      "state": "Rio de Janeiro",
      "country": "Brazil"
    },
    {
      "id": "75",
      "name": "Elena Popov",
      "email": "elena.popov@healthcareportal.com",
      "condition": "chronic pain",
      "language": "ru",
      "literacy_level": "high",
      "age_group": "middle-aged",
      "summary": "Комплексное лечение хронической боли",
      "lastAccess": "2024-03-26",
      "visual_aids": false,
      "content_depth": "summary",
      "city": "Kiev",
      "state": "Kiev",
      "country": "Ukraine"
    },
    {
      "id": "76",
      "name": "Marco Bianchi",
      "email": "marco.bianchi@healthcareportal.com",
      "condition": "COPD",
      "language": "it",
      "literacy_level": "medium",
      "age_group": "older adult",
      "summary": "Gestione della BPCO e riabilitazione polmonare",
      "lastAccess": "2024-03-27",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Milan",
      "state": "Lombardy",
      "country": "Italy"
    },
    {
      "id": "77",
      "name": "Li Ming",
      "email": "li.ming@healthcareportal.com",
      "condition": "hypertension",
      "language": "zh",
      "literacy_level": "medium",
      "age_group": "middle-aged",
      "summary": "高血压管理和生活方式调整",
      "lastAccess": "2024-03-28",
      "visual_aids": true,
      "content_depth": "detailed",
      "city": "Shanghai",
      "state": "Shanghai",
      "country": "China"
    },
    {
      "id": "78",
      "name": "Sarah Mitchell",
      "email": "sarah.mitchell@healthcareportal.com",
      "condition": "arthritis",
      "language": "en",
      "literacy_level": "high",
      "age_group": "older adult",
      "summary": "Arthritis management and joint protection strategies",
      "lastAccess": "2024-03-29",
      "visual_aids": false,
      "content_depth": "detailed",
      "city": "Sydney",
      "state": "New South Wales",
      "country": "Australia"
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

  // Utility function to calculate the average match score
  const calculateAverageScore = () => {
    if (userArticles.length === 0) return 0;
    const totalScore = userArticles.reduce((sum, article) => sum + article.score, 0);
    return Math.round((totalScore / userArticles.length) * 100); // Convert to percentage
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Health Insights Dashboard
            </h1>
            <p className="text-gray-600">Manage user profiles and view personalized health recommendations</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Home
          </button>
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
                    {userArticles.length > 0 ? Math.round(calculateAverageScore()) : 0}%
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
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-teal-50 ${selectedUser?.id === user.id ? 'bg-teal-50 border-l-4 border-l-teal-500' : ''
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
