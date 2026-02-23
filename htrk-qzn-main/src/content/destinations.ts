// Tourism destinations data for Quezon, Bukidnon
// Import all destination images
import sanRoqueFalls1 from "@/assets/san-roque-falls-1.jpg";
import sanRoqueFalls2 from "@/assets/san-roque-falls-2.jpg";
import mtCualaDeJuan1 from "@/assets/mt-cuala-de-juan-1.jpg";
import mtCualaDeJuan2 from "@/assets/mt-cuala-de-juan-2.jpg";
import mtCualaDeJuan3 from "@/assets/mt-cuala-de-juan-3.jpg";
import sagongsongShrine1 from "@/assets/sagongsong-shrine-1.jpg";
import sagongsongShrine2 from "@/assets/sagongsong-shrine-2.jpg";
import sagongsongShrine3 from "@/assets/sagongsong-shrine-3.jpg";
import pulanguiRiverCanyon1 from "@/assets/pulangui-river-canyon-1.jpg";
import pulanguiRiverCanyon2 from "@/assets/pulangui-river-canyon-2.jpg";
import linaboFalls1 from "@/assets/linabo-falls-1.jpg";
import lipaFalls1 from "@/assets/lipa-falls-1.jpg";
import lipaFalls2 from "@/assets/lipa-falls-2.jpg";
import lipaFalls3 from "@/assets/lipa-falls-3.jpg";
import mtTangulang1 from "@/assets/mt-tangulang-1.jpg";
import mtTangulang2 from "@/assets/mt-tangulang-2.jpg";
import mtTangulang3 from "@/assets/mt-tangulang-3.jpg";
import mtTangulang4 from "@/assets/mt-tangulang-4.jpg";
import bluewaterCave1 from "@/assets/bluewater-cave-1.jpg";
import bluewaterCave2 from "@/assets/bluewater-cave-2.jpg";

export interface Destination {
  id: string;
  name: string;
  type: string;
  location: string;
  description: string;
  longDescription: string;
  rating: number;
  reviewCount: number;
  images: string[];
  activities: string[];
  difficulty: string;
  bestTime: string;
  duration: string;
  directions: string;
  coordinates: { lat: number; lng: number };
  fees: string;
  facilities: string[];
  safetyTips: string[];
  highlights: string[];
}

export const destinations: Destination[] = [
  {
    id: "san-roque-falls",
    name: "San Roque Falls",
    type: "Waterfall",
    location: "Brgy. San Roque, Quezon, Bukidnon",
    description: "A stunning three-tiered waterfall surrounded by lush vegetation, perfect for swimming and nature photography.",
    longDescription: "San Roque Falls is one of Quezon's most visited natural attractions, featuring three cascading levels of crystal-clear water. The falls are nestled in a pristine forest environment, offering visitors a refreshing escape from the tropical heat. The main pool is ideal for swimming, while the surrounding rocks provide perfect spots for picnicking and photography. The trek to the falls takes you through scenic trails lined with native flora, making the journey as rewarding as the destination itself.",
    rating: 4.7,
    reviewCount: 128,
    images: [sanRoqueFalls1, sanRoqueFalls2],
    activities: ["Swimming", "Photography", "Picnicking", "Nature trekking"],
    difficulty: "Easy",
    bestTime: "November to April (dry season)",
    duration: "Half day (3-4 hours)",
    directions: "From Quezon town proper, take a habal-habal or tricycle to Brgy. San Roque. A 20-minute trek from the drop-off point leads to the falls.",
    coordinates: { lat: 7.7333, lng: 125.1000 },
    fees: "₱50 environmental fee per person",
    facilities: ["Changing rooms", "Picnic tables", "Parking area", "Local guides available"],
    safetyTips: [
      "Wear appropriate footwear for slippery rocks",
      "Bring insect repellent",
      "Stay in designated swimming areas",
      "Follow Leave No Trace principles"
    ],
    highlights: [
      "Three-tiered cascading waterfall",
      "Natural swimming pools",
      "Surrounded by tropical forest",
      "Great for photography"
    ]
  },
  {
    id: "mt-cuala-de-juan",
    name: "Mt. Cuala de Juan",
    type: "Mountain",
    location: "Quezon, Bukidnon",
    description: "A challenging mountain climb offering breathtaking views of Bukidnon's landscape and diverse flora and fauna.",
    longDescription: "Mt. Cuala de Juan stands as one of the prominent peaks in Quezon, Bukidnon, attracting adventure seekers and nature enthusiasts. The mountain features well-established trails that wind through mossy forests, bamboo groves, and open grasslands. At the summit, hikers are rewarded with panoramic views of the surrounding mountains and valleys. The biodiversity along the trail is remarkable, with chances to spot endemic bird species and unique plant life. This mountain is perfect for experienced hikers looking for a rewarding challenge.",
    rating: 4.8,
    reviewCount: 96,
    images: [mtCualaDeJuan1, mtCualaDeJuan2, mtCualaDeJuan3],
    activities: ["Hiking", "Mountain climbing", "Bird watching", "Camping", "Photography"],
    difficulty: "Moderate to Difficult",
    bestTime: "December to May",
    duration: "Full day to overnight (6-8 hours ascent)",
    directions: "From Quezon town center, coordinate with local guides for transportation to the jump-off point. Registration at the barangay hall is required.",
    coordinates: { lat: 7.7500, lng: 125.1200 },
    fees: "₱100 registration + ₱500 guide fee (per group)",
    facilities: ["Registration office", "Camping sites", "Trail markers", "Emergency contact stations"],
    safetyTips: [
      "Hire a local guide",
      "Start early morning",
      "Bring sufficient water and food",
      "Check weather conditions before climbing",
      "Register with local authorities"
    ],
    highlights: [
      "Panoramic summit views",
      "Diverse ecosystems",
      "Endemic bird species",
      "Camping under the stars"
    ]
  },
  {
    id: "sagongsong-shrine",
    name: "Sagongsong Shrine",
    type: "Cultural Site",
    location: "Quezon, Bukidnon",
    description: "A sacred site with historical significance, featuring stunning rock formations and peaceful surroundings.",
    longDescription: "The Sagongsong Shrine holds deep cultural and historical importance for the local community. This sacred site features impressive natural rock formations that have been revered for generations. The shrine area is characterized by towering limestone cliffs, natural caves, and serene forest settings. Visitors can explore the grounds while learning about the indigenous beliefs and traditions associated with this mystical place. The peaceful atmosphere makes it ideal for meditation and cultural appreciation.",
    rating: 4.6,
    reviewCount: 82,
    images: [sagongsongShrine1, sagongsongShrine2, sagongsongShrine3],
    activities: ["Cultural tours", "Photography", "Meditation", "Cave exploration"],
    difficulty: "Easy",
    bestTime: "Year-round",
    duration: "2-3 hours",
    directions: "Located within Quezon municipality. Accessible by tricycle from the town center.",
    coordinates: { lat: 7.7400, lng: 125.1100 },
    fees: "₱30 entrance fee",
    facilities: ["Visitor information center", "Paved walkways", "Prayer areas", "Parking"],
    safetyTips: [
      "Respect sacred spaces",
      "Follow site guidelines",
      "Keep noise levels down",
      "No littering"
    ],
    highlights: [
      "Sacred limestone formations",
      "Cultural significance",
      "Natural caves",
      "Peaceful meditation spots"
    ]
  },
  {
    id: "pulangui-river-canyon",
    name: "Pulangui River Canyon",
    type: "River & Canyon",
    location: "Quezon, Bukidnon",
    description: "A dramatic river canyon with towering rock walls and emerald waters, perfect for adventure seekers.",
    longDescription: "The Pulangui River Canyon is a spectacular natural wonder featuring steep canyon walls that rise dramatically from the emerald-green waters below. This hidden gem offers a unique landscape where the Pulangui River has carved through ancient rock formations over millennia. The canyon provides opportunities for kayaking, swimming, and cliff diving (for experienced adventurers). The geological formations tell a story of millions of years of natural processes, making it a fascinating destination for nature lovers and geology enthusiasts alike.",
    rating: 4.9,
    reviewCount: 104,
    images: [pulanguiRiverCanyon1, pulanguiRiverCanyon2],
    activities: ["Kayaking", "Swimming", "Cliff diving", "Photography", "Geological tours"],
    difficulty: "Moderate",
    bestTime: "March to June (low water levels)",
    duration: "Half to full day",
    directions: "Accessible via 4x4 vehicle from Quezon town. Best to join organized tours for safety and convenience.",
    coordinates: { lat: 7.7200, lng: 125.0900 },
    fees: "₱150 per person (includes guide and safety gear)",
    facilities: ["Safety equipment rental", "Professional guides", "Basic amenities", "Emergency response team"],
    safetyTips: [
      "Always use safety equipment",
      "Book with licensed operators",
      "Check water levels before visiting",
      "Strong swimming skills required for water activities"
    ],
    highlights: [
      "Towering canyon walls",
      "Emerald river waters",
      "Unique geological formations",
      "Adventure water sports"
    ]
  },
  {
    id: "linabo-falls",
    name: "Linabo Falls",
    type: "Waterfall",
    location: "Quezon, Bukidnon",
    description: "A hidden gem featuring pristine cascading waters in a secluded forest setting, ideal for nature lovers seeking tranquility.",
    longDescription: "Linabo Falls is one of Quezon's best-kept secrets, offering visitors an intimate encounter with nature's beauty. The falls cascade gracefully over moss-covered rocks, creating a mesmerizing curtain of water that flows into a pristine pool below. The surrounding forest provides a cool, shaded environment perfect for relaxation and meditation. The relatively untouched nature of this site makes it ideal for those seeking a more peaceful, less crowded waterfall experience. The journey to the falls takes you through lush vegetation and across small streams, adding to the adventure.",
    rating: 4.7,
    reviewCount: 67,
    images: [linaboFalls1],
    activities: ["Swimming", "Nature photography", "Bird watching", "Forest bathing", "Picnicking"],
    difficulty: "Easy to Moderate",
    bestTime: "November to May",
    duration: "3-4 hours",
    directions: "From Quezon town center, take a motorcycle or tricycle to the barangay road. A 30-minute trek through forest trails leads to the falls.",
    coordinates: { lat: 7.7450, lng: 125.1150 },
    fees: "₱40 environmental fee",
    facilities: ["Basic changing area", "Trail markers", "Resting benches"],
    safetyTips: [
      "Wear water-friendly footwear",
      "Bring drinking water",
      "Respect the natural environment",
      "Visit in groups for safety"
    ],
    highlights: [
      "Secluded natural setting",
      "Crystal-clear waters",
      "Pristine forest surroundings",
      "Peaceful atmosphere"
    ]
  },
  {
    id: "lipa-falls",
    name: "Lipa Falls",
    type: "Waterfall",
    location: "Quezon, Bukidnon",
    description: "A multi-tiered waterfall with turquoise pools set against dramatic layered rock formations, offering a photographer's paradise.",
    longDescription: "Lipa Falls showcases nature's architectural prowess with its stunning layered limestone formations and cascading turquoise waters. The falls feature multiple levels, each with its own unique character and swimming area. The distinctive horizontal striations in the rock walls create a dramatic backdrop that seems almost painted. These sedimentary layers tell the geological history of the region, formed over millions of years. The crystal-clear water pools at each level are perfect for swimming and wading. The site's natural beauty and unique rock formations make it one of the most photogenic destinations in Quezon, Bukidnon.",
    rating: 4.9,
    reviewCount: 143,
    images: [lipaFalls1, lipaFalls2, lipaFalls3],
    activities: ["Swimming", "Photography", "Geology tours", "Nature appreciation", "Picnicking"],
    difficulty: "Easy",
    bestTime: "December to April",
    duration: "Half day (4-5 hours)",
    directions: "Located 45 minutes from Quezon town proper by motorcycle. Trail from parking area to falls is well-maintained and takes 15 minutes.",
    coordinates: { lat: 7.7380, lng: 125.1050 },
    fees: "₱60 entrance fee including environmental charge",
    facilities: ["Parking area", "Changing rooms", "Picnic shelters", "Toilets", "Safety railings"],
    safetyTips: [
      "Be cautious on wet rocks",
      "Supervise children at all times",
      "Avoid visiting during heavy rain",
      "Use designated swimming areas only"
    ],
    highlights: [
      "Dramatic layered rock formations",
      "Multiple turquoise pools",
      "Excellent photography opportunities",
      "Geological significance"
    ]
  },
  {
    id: "mt-tangulang",
    name: "Mt. Tangulang",
    type: "Mountain",
    location: "Quezon, Bukidnon",
    description: "A mossy forest paradise offering challenging trails through mystical landscapes and breathtaking summit views.",
    longDescription: "Mt. Tangulang rises majestically in the Bukidnon highlands, offering one of the most enchanting hiking experiences in the region. The mountain is renowned for its extensive mossy forest ecosystem, where trees are draped in thick carpets of moss and epiphytes create an otherworldly atmosphere. As you ascend through different elevation zones, you'll encounter diverse flora including endemic orchids, ferns, and towering hardwood trees. The summit provides spectacular 360-degree views of the surrounding mountain ranges and valleys. On clear days, you can see as far as the coastal plains. The cool climate and mystical ambiance make this a favorite among serious hikers and nature photographers.",
    rating: 4.8,
    reviewCount: 89,
    images: [mtTangulang1, mtTangulang2, mtTangulang3, mtTangulang4],
    activities: ["Mountain trekking", "Camping", "Bird watching", "Photography", "Botanical tours", "Stargazing"],
    difficulty: "Moderate to Difficult",
    bestTime: "January to April (dry months)",
    duration: "1-2 days (overnight camping recommended)",
    directions: "Coordinate with local tourism office in Quezon for guide arrangements. 4x4 vehicle needed to reach the jump-off point. Registration required at barangay hall.",
    coordinates: { lat: 7.7600, lng: 125.1300 },
    fees: "₱150 registration + ₱600-800 guide fee (per group) + ₱100 camping permit",
    facilities: ["Registration office", "Designated camping areas", "Trail markers", "Water sources", "Emergency shelter"],
    safetyTips: [
      "Mandatory guide requirement",
      "Bring warm clothing (temperatures can drop significantly)",
      "Pack sufficient food and water",
      "Register with local authorities before ascent",
      "Check weather forecast",
      "Bring headlamps and spare batteries"
    ],
    highlights: [
      "Enchanting mossy forest ecosystem",
      "Endemic flora and fauna",
      "360-degree summit views",
      "Pristine mountain wilderness",
      "Spectacular sunrise/sunset views"
    ]
  },
  {
    id: "bluewater-cave",
    name: "Bluewater Cave",
    type: "Cave",
    location: "Quezon, Bukidnon",
    description: "A mysterious underground cavern featuring stunning turquoise pools and unique limestone formations, truly one of Mindanao's hidden treasures.",
    longDescription: "The Bluewater Cave is a geological masterpiece and one of the most mysterious natural attractions in Bukidnon. This spectacular cave system features crystal-clear turquoise waters that glow with an ethereal blue light, created by the interaction of sunlight filtering through openings in the limestone ceiling and the mineral-rich water. The cave's interior reveals stunning rock formations including stalactites, stalagmites, and unique flowstone curtains formed over thousands of years. The main chamber houses a large pool of pristine blue water, perfect for swimming (with proper safety equipment). The cave maintains a cool temperature year-round, providing a refreshing escape. Local legends and stories add to the mystique of this natural wonder, making it a must-visit for adventure seekers and nature enthusiasts.",
    rating: 4.9,
    reviewCount: 112,
    images: [bluewaterCave1, bluewaterCave2],
    activities: ["Cave exploration", "Swimming", "Photography", "Geology study", "Adventure tours"],
    difficulty: "Moderate (requires some scrambling)",
    bestTime: "March to June (dry season for safer cave access)",
    duration: "3-4 hours",
    directions: "From Quezon town center, travel via Davao-Bukidnon National Highway. Requires 4x4 vehicle or motorcycle for the last portion. Cave entrance is a 20-minute walk from the parking area.",
    coordinates: { lat: 7.7250, lng: 125.0950 },
    fees: "₱80 entrance fee + ₱400 guide fee (required) + ₱100 for swimming gear rental",
    facilities: ["Parking area", "Guide service", "Safety equipment rental", "Basic amenities", "Emergency assistance"],
    safetyTips: [
      "Professional guide is mandatory",
      "Wear helmets and proper footwear",
      "Bring waterproof bags for electronics",
      "Life jackets required for swimming",
      "Never visit during heavy rain or flooding",
      "Stay with your group at all times"
    ],
    highlights: [
      "Mystical turquoise cave pools",
      "Stunning limestone formations",
      "Underground swimming experience",
      "Unique geological features",
      "Local folklore and legends"
    ]
  }
];
