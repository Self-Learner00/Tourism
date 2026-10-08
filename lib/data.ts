// ─── WanderMaharashtra — Mock Data ────────────────────────────────────────────

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  location: string;
  category: "Mountains" | "Beaches" | "Heritage" | "Adventure" | "Nature" | "Food";
  description: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  highlights: string[];
  bestTime: string;
  image: string; // Unsplash URL
  lat: number;
  lng: number;
  featured?: boolean;
}

export interface Package {
  id: string;
  name: string;
  destination: string;
  subtitle: string;
  days: number;
  nights: number;
  price: number;
  originalPrice: number;
  category: string;
  activities: string[];
  includes: string[];
  description: string;
  image: string;
  badge?: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  review: string;
  destination: string;
  avatar: string;
}

// ─── Destinations ────────────────────────────────────────────────────────────

export const DESTINATIONS: Destination[] = [
  {
    id: "matheran",
    name: "Matheran",
    tagline: "Mountain Escape",
    location: "Raigad District, Maharashtra",
    category: "Mountains",
    description:
      "Asia's only automobile-free hill station. Perched at 800m, Matheran offers misty trails, ancient viewpoints, and a blissful silence broken only by birdsong.",
    duration: "2 Days",
    price: 3499,
    rating: 4.8,
    reviews: 1240,
    highlights: ["Echo Point", "Panorama Point", "Charlotte Lake", "Toy Train Ride"],
    bestTime: "October – March",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    lat: 18.9843,
    lng: 73.2746,
    featured: true,
  },
  {
    id: "lonavala",
    name: "Lonavala",
    tagline: "Valley of Mist",
    location: "Pune District, Maharashtra",
    category: "Nature",
    description:
      "Verdant valleys, cascading waterfalls, and the famous Bhushi Dam. Lonavala transforms into a paradise during monsoons with dramatic cloud-filled gorges.",
    duration: "2 Days",
    price: 2999,
    rating: 4.6,
    reviews: 2180,
    highlights: ["Tiger's Leap", "Bhushi Dam", "Rajmachi Fort", "Karla Caves"],
    bestTime: "June – September",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    lat: 18.7537,
    lng: 73.4126,
    featured: true,
  },
  {
    id: "mahabaleshwar",
    name: "Mahabaleshwar",
    tagline: "Hill Retreat",
    location: "Satara District, Maharashtra",
    category: "Mountains",
    description:
      "The queen of Maharashtra hill stations. Strawberry farms, colonial-era viewpoints, and dense forests make this an idyllic retreat above the Sahyadri plateau.",
    duration: "3 Days",
    price: 5499,
    rating: 4.9,
    reviews: 3450,
    highlights: ["Wilson Point", "Venna Lake", "Pratapgad Fort", "Elephant Head Point"],
    bestTime: "November – June",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    lat: 17.9240,
    lng: 73.6578,
    featured: true,
  },
  {
    id: "alibaug",
    name: "Alibaug",
    tagline: "Coastal Escape",
    location: "Raigad District, Maharashtra",
    category: "Beaches",
    description:
      "Mumbai's favourite beach escape. Ancient Kolaba Fort rising from the sea, black-sand shores, and fresh seafood define this quintessential Konkan gateway.",
    duration: "2 Days",
    price: 3999,
    rating: 4.5,
    reviews: 1890,
    highlights: ["Kolaba Fort", "Alibaug Beach", "Kashid Beach", "Fresh Seafood"],
    bestTime: "October – February",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    lat: 18.6483,
    lng: 72.8720,
    featured: true,
  },
  {
    id: "raigad",
    name: "Raigad",
    tagline: "Heritage & Adventure",
    location: "Raigad District, Maharashtra",
    category: "Heritage",
    description:
      "The capital of Chhatrapati Shivaji Maharaj's empire. This majestic mountain fort crowning a vertical cliff tells the story of the great Maratha warrior king.",
    duration: "2 Days",
    price: 4299,
    rating: 4.7,
    reviews: 980,
    highlights: ["Raigad Fort", "Ropeway Experience", "Tomb of Shivaji", "Market Place Ruins"],
    bestTime: "October – March",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    lat: 18.2396,
    lng: 73.4435,
  },
  {
    id: "igatpuri",
    name: "Igatpuri",
    tagline: "Ghats Gateway",
    location: "Nashik District, Maharashtra",
    category: "Adventure",
    description:
      "A trekker's paradise in the Sahyadri range. Ancient Buddhist caves, the serene Tringalwadi Fort, and the dramatic railway descent through the Kasara Ghats.",
    duration: "2 Days",
    price: 2799,
    rating: 4.4,
    reviews: 760,
    highlights: ["Tringalwadi Fort", "Bhatsa River Valley", "Camel Valley", "Vipassana Centre"],
    bestTime: "July – February",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    lat: 19.7095,
    lng: 73.5495,
  },
  {
    id: "panchgani",
    name: "Panchgani",
    tagline: "Table-Top Plateau",
    location: "Satara District, Maharashtra",
    category: "Nature",
    description:
      "Home to Asia's second-largest volcanic plateau — Table Land. Strawberry fields, colonial bungalows, and sweeping views of five villages across five hills.",
    duration: "2 Days",
    price: 3699,
    rating: 4.6,
    reviews: 1120,
    highlights: ["Table Land", "Sydney Point", "Devil's Kitchen", "Strawberry Farms"],
    bestTime: "September – May",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    lat: 17.9252,
    lng: 73.8019,
  },
  {
    id: "konkan",
    name: "Konkan Coast",
    tagline: "Wild Coastline",
    location: "Sindhudurg, Maharashtra",
    category: "Beaches",
    description:
      "Unspoilt beaches, swaying palm groves, ancient sea forts and the freshest Malvani cuisine. The Konkan coast remains Maharashtra's best-kept secret.",
    duration: "4 Days",
    price: 7499,
    rating: 4.9,
    reviews: 654,
    highlights: ["Sindhudurg Fort", "Tarkarli Beach", "Malvan Snorkelling", "Malvani Thali"],
    bestTime: "October – March",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    lat: 16.0516,
    lng: 73.4764,
    featured: true,
  },
];

// ─── Packages ────────────────────────────────────────────────────────────────

export const PACKAGES: Package[] = [
  {
    id: "konkan-escape",
    name: "Konkan Escape",
    destination: "Sindhudurg & Tarkarli",
    subtitle: "Waves, Forts & Malvani Feasts",
    days: 3,
    nights: 2,
    price: 8999,
    originalPrice: 12000,
    category: "Beaches",
    activities: ["Beach Hopping", "Snorkelling", "Fort Tour", "Malvani Cooking Class"],
    includes: ["Accommodation", "Meals", "Transport", "Guide", "Snorkel Kit"],
    description:
      "Three perfect days on the untouched Konkan coast. Sea-kayak to Sindhudurg Fort, snorkel in Tarkarli's crystal waters, and feast on authentic Malvani seafood every evening.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    badge: "Best Seller",
  },
  {
    id: "matheran-weekend",
    name: "Matheran Weekend",
    destination: "Matheran Hill Station",
    subtitle: "Digital Detox in the Clouds",
    days: 2,
    nights: 1,
    price: 4799,
    originalPrice: 6500,
    category: "Mountains",
    activities: ["Nature Walks", "Viewpoint Trails", "Toy Train", "Sunrise Trek"],
    includes: ["Heritage Hotel", "Breakfast", "Train Tickets", "Trail Guide"],
    description:
      "Escape to India's only car-free hill station. Wake to mist-wrapped peaks, walk red-earth trails through dense forest, and watch the sunset paint the Sahyadris in gold.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    badge: "Weekend Favourite",
  },
  {
    id: "mahabaleshwar-retreat",
    name: "Mahabaleshwar Retreat",
    destination: "Mahabaleshwar & Panchgani",
    subtitle: "Strawberries, Valleys & Forts",
    days: 3,
    nights: 2,
    price: 7499,
    originalPrice: 10000,
    category: "Mountains",
    activities: ["Strawberry Picking", "Boat Ride", "Fort Trek", "Viewpoint Walks"],
    includes: ["Resort Stay", "All Meals", "Cab", "Fort Entry", "Boat Ride"],
    description:
      "The complete Western Ghats experience. Pick strawberries at dawn, explore Pratapgad Fort at golden hour, and drift across Venna Lake as mist rolls through the valley.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    badge: "Premium",
  },
  {
    id: "raigad-adventure",
    name: "Raigad Adventure",
    destination: "Raigad Fort",
    subtitle: "History, Ropeway & Wilderness",
    days: 2,
    nights: 1,
    price: 5299,
    originalPrice: 7000,
    category: "Heritage",
    activities: ["Fort Exploration", "Ropeway Ride", "History Walk", "Jungle Trail"],
    includes: ["Camp Stay", "Dinner & Breakfast", "Ropeway", "Expert Historian Guide"],
    description:
      "Walk the ramparts where history was forged. Ascend to Raigad Fort by ropeway, explore the ancient capital of the Maratha empire, and camp beneath a star-filled sky.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
  },
];

// ─── Experiences ─────────────────────────────────────────────────────────────

export const EXPERIENCES: Experience[] = [
  { id: "adventure", title: "Adventure", description: "Trek, climb, rappel and push your limits across the Sahyadris", icon: "⛰️", color: "#C4622D", count: 24 },
  { id: "mountains", title: "Mountains", description: "Misty hill stations and Ghats ridge walks above the clouds", icon: "🏔️", color: "#2A7A6F", count: 18 },
  { id: "beaches", title: "Beaches", description: "Hidden coves, black-sand shores and aquamarine Konkan waters", icon: "🏖️", color: "#E8A84C", count: 15 },
  { id: "heritage", title: "Heritage", description: "Maratha forts, ancient caves and colonial-era bungalows", icon: "🏰", color: "#8B4513", count: 32 },
  { id: "nature", title: "Nature", description: "Tiger reserves, waterfalls and misty Western Ghat forests", icon: "🌿", color: "#1A3A2A", count: 28 },
  { id: "food", title: "Food & Culture", description: "Vada Pav, Misal, Malvani curries and authentic village feasts", icon: "🍛", color: "#C4622D", count: 40 },
  { id: "culture", title: "Culture", description: "Ganesh festivals, Warli art villages and tribal communities", icon: "🎭", color: "#2A7A6F", count: 22 },
  { id: "weekend", title: "Weekend Getaways", description: "Perfect 2-day escapes from Mumbai and Pune", icon: "🚂", color: "#E8A84C", count: 35 },
];

// ─── Testimonials ────────────────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Kulkarni",
    city: "Mumbai",
    rating: 5,
    review:
      "WanderMaharashtra completely changed how I see my home state. The Konkan trip was flawlessly organised — every meal, every beach, every moment felt curated just for us.",
    destination: "Konkan Escape",
    avatar: "PK",
  },
  {
    id: "t2",
    name: "Arjun Deshmukh",
    city: "Pune",
    rating: 5,
    review:
      "Raigad was on my bucket list for years. The historian guide they arranged was phenomenal — standing on Shivaji's capital watching the sunset was unforgettable.",
    destination: "Raigad Adventure",
    avatar: "AD",
  },
  {
    id: "t3",
    name: "Sneha Joshi",
    city: "Nashik",
    rating: 5,
    review:
      "The Matheran weekend was exactly what my family needed. No cars, no noise — just the toy train, misty trails, and the kids discovering nature. Pure magic.",
    destination: "Matheran Weekend",
    avatar: "SJ",
  },
  {
    id: "t4",
    name: "Rahul Patil",
    city: "Aurangabad",
    rating: 4,
    review:
      "Mahabaleshwar Retreat exceeded expectations. Picking strawberries at sunrise and the boat ride on Venna Lake — these aren't experiences you find on typical travel sites.",
    destination: "Mahabaleshwar Retreat",
    avatar: "RP",
  },
  {
    id: "t5",
    name: "Kavya Nair",
    city: "Mumbai",
    rating: 5,
    review:
      "Finally, a travel company that truly knows Maharashtra. The local guides, the offbeat spots, the authentic food — everything felt genuine, not touristy.",
    destination: "Alibaug",
    avatar: "KN",
  },
];

// ─── Culture Highlights ───────────────────────────────────────────────────────

export const CULTURE_ITEMS = [
  {
    title: "Maratha Forts",
    description: "350+ hill forts built by Chhatrapati Shivaji Maharaj dot the Sahyadris — each a story of guerrilla warfare, architectural genius, and mountain strategy.",
    emoji: "🏯",
    tag: "Heritage",
  },
  {
    title: "Malvani Cuisine",
    description: "Fiery coconut-based curries, sol kadhi, and the freshest catch from the Arabian Sea. Konkan's food is a cuisine unlike any other in India.",
    emoji: "🦞",
    tag: "Food",
  },
  {
    title: "Ganesh Festival",
    description: "Maharashtra's soul. The 10-day Ganesh Chaturthi transforms every town into an ocean of music, colour, art and community celebration.",
    emoji: "🪘",
    tag: "Festival",
  },
  {
    title: "Warli Art",
    description: "Ancient tribal paintings from the Palghar forests — white geometric patterns on red clay walls depicting nature, harvest and village life.",
    emoji: "🎨",
    tag: "Art",
  },
  {
    title: "Sahyadri Wildlife",
    description: "Leopards, Indian bison, hornbills and firefly meadows across Bhimashankar, Radhanagari and the Western Ghats biodiversity corridor.",
    emoji: "🐆",
    tag: "Nature",
  },
  {
    title: "Koli Fishing Villages",
    description: "The original Mumbaikars. Visit active fishing communities, watch the early-morning catch, and taste fish curry cooked on wood fire.",
    emoji: "⛵",
    tag: "Culture",
  },
];

// ─── Trip Planner Logic ───────────────────────────────────────────────────────

export interface TripRecommendation {
  title: string;
  destination: string;
  duration: string;
  category: string;
  description: string;
  price: number;
  packageId: string;
}

export function generateTripRecommendation(
  destination: string,
  style: string,
  duration: string
): TripRecommendation {
  const map: Record<string, Record<string, TripRecommendation>> = {
    Mountains: {
      Adventure: {
        title: "Matheran Trail Escape",
        destination: "Matheran",
        duration: "2 Days / 1 Night",
        category: "Mountains + Adventure",
        description: "Trek misty red-earth trails, summit Echo Point at sunrise and ride the heritage toy train through dense jungle canopy.",
        price: 4799,
        packageId: "matheran-weekend",
      },
      Relaxation: {
        title: "Mahabaleshwar Retreat",
        destination: "Mahabaleshwar",
        duration: "3 Days / 2 Nights",
        category: "Mountains + Relaxation",
        description: "Strawberry farms, misty viewpoints, boating on Venna Lake — the ultimate slow-travel hill station escape.",
        price: 7499,
        packageId: "mahabaleshwar-retreat",
      },
      Culture: {
        title: "Panchgani Explorer",
        destination: "Panchgani",
        duration: "2 Days / 1 Night",
        category: "Mountains + Culture",
        description: "Walk Asia's second-largest volcanic plateau, explore colonial-era schools and taste wild strawberries.",
        price: 3699,
        packageId: "matheran-weekend",
      },
    },
    Beaches: {
      Adventure: {
        title: "Konkan Deep Dive",
        destination: "Tarkarli & Malvan",
        duration: "3 Days / 2 Nights",
        category: "Beaches + Adventure",
        description: "Snorkel the coral gardens of Tarkarli, sea-kayak to Sindhudurg Fort, and camp on the beach under a blanket of stars.",
        price: 8999,
        packageId: "konkan-escape",
      },
      Relaxation: {
        title: "Alibaug Coastal Unwind",
        destination: "Alibaug",
        duration: "2 Days / 1 Night",
        category: "Beaches + Relaxation",
        description: "Black-sand beaches, a floating sea fort, fresh coconut water and the finest Malvani fish thali on the Maharashtra coast.",
        price: 3999,
        packageId: "konkan-escape",
      },
      Culture: {
        title: "Koli Village Experience",
        destination: "Alibaug Coast",
        duration: "2 Days / 1 Night",
        category: "Beaches + Culture",
        description: "Spend a night with a Koli fishing family, pull nets at dawn, cook the catch for lunch and learn Marathi coastal traditions.",
        price: 4299,
        packageId: "konkan-escape",
      },
    },
    Heritage: {
      Adventure: {
        title: "Raigad Fort Expedition",
        destination: "Raigad",
        duration: "2 Days / 1 Night",
        category: "Heritage + Adventure",
        description: "Ascend to Shivaji's capital by ropeway, trek the fort ramparts and camp beneath a sky full of stars above the Western Ghats.",
        price: 5299,
        packageId: "raigad-adventure",
      },
      Relaxation: {
        title: "Raigad Heritage Walk",
        destination: "Raigad",
        duration: "1 Day",
        category: "Heritage + Relaxation",
        description: "A curated walk through Raigad Fort with an expert historian — Diwan-i-Am, market ruins, Shivaji's Samadhi and the Jagdishwar Temple.",
        price: 2299,
        packageId: "raigad-adventure",
      },
      Culture: {
        title: "Karla & Bhaja Caves",
        destination: "Lonavala",
        duration: "2 Days / 1 Night",
        category: "Heritage + Culture",
        description: "Explore 2000-year-old Buddhist rock-cut caves carved from living basalt, then trek to Rajmachi Fort through monsoon greenery.",
        price: 2999,
        packageId: "raigad-adventure",
      },
    },
    Nature: {
      Adventure: {
        title: "Igatpuri Wild Trek",
        destination: "Igatpuri",
        duration: "2 Days / 1 Night",
        category: "Nature + Adventure",
        description: "Trek the untouched Sahyadri trails to Tringalwadi Fort, camp by Camel Valley and catch the early mist rolling over the Ghats.",
        price: 2799,
        packageId: "matheran-weekend",
      },
      Relaxation: {
        title: "Lonavala Valley Retreat",
        destination: "Lonavala",
        duration: "2 Days / 1 Night",
        category: "Nature + Relaxation",
        description: "Waterfalls, valley viewpoints, fresh mountain air and the perfect chikki. Lonavala in monsoon is Maharashtra at its most dramatic.",
        price: 2999,
        packageId: "matheran-weekend",
      },
      Culture: {
        title: "Bhimashankar Forest Walk",
        destination: "Bhimashankar",
        duration: "2 Days / 1 Night",
        category: "Nature + Culture",
        description: "Trek to one of Maharashtra's 12 Jyotirlingas through dense shola forest, home to the endangered giant Indian squirrel.",
        price: 3299,
        packageId: "matheran-weekend",
      },
    },
  };

  const destMap: Record<string, string> = {
    "Matheran": "Mountains",
    "Lonavala / Khandala": "Nature",
    "Mahabaleshwar": "Mountains",
    "Alibaug": "Beaches",
    "Raigad Fort": "Heritage",
    "Konkan Coast": "Beaches",
    "Igatpuri": "Nature",
    "Panchgani": "Mountains",
  };

  const terrainKey = destMap[destination] || destination;
  const terrainData = map[terrainKey] || map["Mountains"];
  const result = terrainData[style] || terrainData["Adventure"];

  return {
    ...result,
    duration: duration === "Weekend (2 Days)"
      ? "2 Days / 1 Night"
      : duration === "Short Trip (3-4 Days)"
      ? "3 Days / 2 Nights"
      : "5 Days / 4 Nights",
  };
}
