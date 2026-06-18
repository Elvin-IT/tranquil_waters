import { Villa, Experience, Offer, JournalStory, FaqItem } from './types';

export const HERO_IMAGE = "/src/assets/images/hero_lakeside_lodge_1781766592892.jpg";
export const VILLA_IMAGE = "/src/assets/images/lakefront_pool_villa_1781766608565.jpg";
export const SAFARI_IMAGE = "/src/assets/images/safari_nkhotakota_1781766624206.jpg";
export const DHOW_IMAGE = "/src/assets/images/lake_malawi_dhow_1781766640731.jpg";
export const DINING_IMAGE = "/src/assets/images/wellness_dining_1781766657294.jpg";

export const VILLAS: Villa[] = [
  {
    id: 'lakefront-pool-villa',
    name: 'Lakefront Pool Villa',
    type: 'pool-villa',
    tagline: 'Gaze upon the endless blue of Lake Malawi.',
    description: 'Suspended just above the high-water line, our six signature villas offer front-row access to the water with a private rim-flow plunge pool, open-plan stone bathroom, and a generous shaded sunset deck.',
    longDescription: 'Each Lakefront Pool Villa is a celebration of raw tactile materials. Constructed with hand-dressed local granite and reclaimed timber, these 140-square-meter sanctuaries feature floor-to-ceiling glass screens that retract completely, dissolving the boundary between contemporary luxury and the gentle lake breeze. Sleep in high-thread-count Malawian cotton under elegant linen nets, step straight onto sand, or submerge yourself in your private infinity deck pool as fisherman dhows glide past.',
    size: '140 m² / 1,500 ft²',
    capacity: '2 Adults',
    view: 'Direct Lake & Beachfront Panorama',
    rate: 1150,
    amenities: [
      'Private 6m rim-flow plunge pool',
      'Outdoor copper-tub shower',
      'Solar-powered, state-of-the-art silent evening AC',
      'Fully equipped organic honor bar & botanical sodas',
      'Direct private transition to the beach',
      'Handmade artisanal bath salts and oils'
    ],
    features: [
      'Bespoke hand-carved Malawian lounge furniture',
      'Complimentary curated yoga accessories',
      'Personal eco-butler on-call',
      'Locally sourced woven artifacts'
    ],
    image: VILLA_IMAGE
  },
  {
    id: 'hillside-bush-suite',
    name: 'Hillside Bush Suite',
    type: 'bush-suite',
    tagline: 'Where the lake breeze meets the quiet forest.',
    description: 'Set elevated amongst native Baobabs and wild fig trees, our four Bush Suites balance broad sweeps of the lake horizon with the ancient stillness of the hills. Perfect for birding enthusiasts and absolute privacy.',
    longDescription: 'Perched delicately on low-impact timber platforms on the hillside slopes, the Hillside Bush Suites look out through the forest canopy toward Lake Malawi. Ideal for those who seek deep immersion in nature, these suites are frequented by local bushbabies and vibrant sunbirds. Designed with a deep, shaded observation deck, writing nook, and canvas-accented roll-up walls, they provide a distinct modern safari outpost atmosphere coupled with refined solar-powered comforts.',
    size: '110 m² / 1,180 ft²',
    capacity: '2 Adults',
    view: 'Canopy Horizon & Distant Lake Skyline',
    rate: 950,
    amenities: [
      'Elevated wooden panoramic viewing deck',
      'Outdoor sensory rain shower under forest canopy',
      'Bespoke stargazing double daybed',
      'High-zoom wilderness binoculars and birding journal',
      'Gourmet coffee press and single-estate Malawian teas',
      'Organic natural mosquito mitigation system'
    ],
    features: [
      'Unobstructed elevated valley breezes',
      'Daily forest tea & botanicals service',
      'Direct access to our wildlife walking trails',
      'Solar lanterns and luxury wool throws'
    ],
    image: SAFARI_IMAGE
  },
  {
    id: 'residence-villa',
    name: 'Tranquil Waters Family Residence',
    type: 'residence',
    tagline: 'An elegant private estate for multi-generational journeys.',
    description: 'Our double-key Master Residence offers unparalleled luxury. Spanning two private wings connected by an open-concept timber library, it features an 11-meter private pool, kitchen, and dedicated micro-dining deck.',
    longDescription: 'For families, small creative retreats, or groups of friends traveling together, the Residence is a completely self-contained lakeside sanctuary. Spanning 320 square meters of indoor and outdoor space, the home comprises two matching luxury master suites, a central lounge with curated African art, a dining pavilion, and a separate butler\'s pantry. With its high security, completely isolated beach access, and magnificent 11-meter swimming pool, this estate represents Malawian accommodation at its most refined.',
    size: '320 m² / 3,440 ft²',
    capacity: 'Up to 6 Guests',
    view: 'Absolute Private Bay & Forest Blend',
    rate: 2600,
    amenities: [
      '11-meter private rim-flow swimming pool',
      'Dedicated private chef and personalized culinary menu',
      'Two spacious king master suites with en-suite copper tubs',
      'Private library & workspace overlooking Lake Malawi',
      'High-speed low-orbit satellite connectivity',
      'Private motorboat on-call for custom lake excursions'
    ],
    features: [
      'Private cultural fireside storytelling circle',
      'Complimentary custom wellness wellness package',
      'Includes private 4x4 safari vehicle in Nkhotakota Reserve',
      'Daily child-minding and wilderness crafts guides if requested'
    ],
    image: DINING_IMAGE
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'guided-safari-nkhotakota',
    title: 'Nkhotakota Wildlife Reserve Safaris',
    category: 'wildlife',
    tagline: 'Walk or drive through ancient Miombo forests.',
    description: 'Just a short drive from our lakeside gates lies the beautiful, rugged Nkhotakota Wildlife Reserve. Explore a wild sanctuary on foot or on sunset game drives guided by rangers.',
    longDescription: 'Managed by African Parks, Nkhotakota has undergone a massive historic wildlife translocation, transforming it into a flourishing elephant, buffalo, and antelope refuge. Our custom 4x4 safari vehicles provide an open-concept perspective of this wild, untamed wilderness. Alternatively, experience an intimate walking safari, where the rich smells of leaf litter, bird calls, and tracking pugmarks on sand bring the safari to life, concluding with gourmet sundowners under a baobab.',
    highlights: [
      'Behold elephant herds returning to local rivers',
      'Uncover spectacular miombo birds with expert ornithologists',
      'Gourmet wild sundowners overlooking the Bua River bend',
      'Intimate walking safaris looking at medicinal flora'
    ],
    duration: '4 - 6 Hours',
    included: 'Private 4x4, experienced field ranger, artisan bites & premium drinks',
    image: SAFARI_IMAGE
  },
  {
    id: 'lake-and-water-dhow',
    title: 'Lakeside Wind & Dhow Excursions',
    category: 'water',
    tagline: 'Glide along crystal-clear freshwater waters.',
    description: 'Board our bespoke, locally handcrafted wooden dhow boat. Embark on snorkel-safaris, kayak local rock islets, or take an unhurried sunset cruise as the hills turn violet.',
    longDescription: 'Lake Malawi is renowned as the \"Lake of Stars.\" Its waters are exceptionally clear, hosting hundreds of species of colorful cichlid fish found nowhere else on earth. Swim from our shores, board a kayak to paddle the serene shoreline bays, or board our private dhow \"Mvula\" for a slow sailing journey. We provide top-shelf snorkel gear, paddleboards, and a gourmet cooler box to ensure your afternoon on the water is absolute poetry.',
    highlights: [
      'Snorkel alongside sparkling endemic cichlid fish clusters',
      'Quiet guided morning kayak tours along remote coves',
      'Sunset sailing with artisan wines and seasonal appetizers',
      'Guided hand-fabrication lessons with local boat builders'
    ],
    duration: '2 - 4 Hours',
    included: 'Vessel hire, boatman, snorkeling equipment, paddleboards, customized deck refreshments',
    image: DHOW_IMAGE
  },
  {
    id: 'wellness-slow-days',
    title: 'The Sanctuary: Wellness & Yoga',
    category: 'wellness',
    tagline: 'Slow down and breathe to the rhythm of the waves.',
    description: 'An open-air timber platform on Lake Malawi. Experience signature treatments using indigenous oils, active meditation walks, and calming private yoga sessions.',
    longDescription: 'Our wellness philosophy is focused on simple connection. The Sanctuary rises on timber columns with views over Lake Malawi\'s waters. There are no buzzing electrical spa machines; instead, the sounds of gentle lake ripples and birds set the tempo. Our therapists use locally cold-pressed organic marula, baobab, and wild melon oils. Daily sunrise yoga and sound therapy sessions are open to all guests, with customized nutritional programs designed around organic garden harvests.',
    highlights: [
      'Daily sunrise and sunset meditation on the lakeside platform',
      'Marula-infused slow tissue muscle and scalp therapy',
      'Sensory oil-blending masterclasses using home-grown botanicals',
      'Lakeside plunge bath followed by healing herbal teas'
    ],
    duration: '60 - 120 Mins',
    included: 'Personal therapist, custom selection of essential oils, therapeutic cold-pressed elixirs',
    image: HERO_IMAGE
  },
  {
    id: 'culture-artisan-community',
    title: 'Community Craft & Artisan Circles',
    category: 'community',
    tagline: 'A meaningful connection built on mutual respect.',
    description: 'Collaborate with local clay craftswomen and woodworkers. Visit community clinics and organic farming schools funded directly by Tranquil Waters Lodge.',
    longDescription: 'Tranquil Waters is deeply intertwined with the local village of Nkhotakota. Rather than standard passive touring, we offer active, respectful connections. Spend a morning under clay arches learning traditional Malawian clay pot molding from the village craftswomen, or learn sustainable farming practices with our community gardens team. 10% of every villa booking goes directly to community healthcare, solar wells, and scholastic scholarships.',
    highlights: [
      'Hands-on clay pottery sessions with local artisan cooperatives',
      'Tours of the forest nurseries and agricultural school gardens',
      'Fireside oral history storytelling told by local community elders',
      'Transparent site tours of lodge-funded health centers'
    ],
    duration: '2 - 3 Hours',
    included: 'Artisan facilitator, translation ambassador, take-away natural clay keepsake',
    image: VILLA_IMAGE
  }
];

export const OFFERS: Offer[] = [
  {
    id: 'water-wildlife-escape',
    title: 'Water & Wildlife Escape',
    subtitle: 'The ultimate 5-night integration of lake and reserve',
    description: 'Designed to offer the perfect rhythm of physical exploration and slow luxury, this package blends the deep wilderness of Nkhotakota with the soothing waters of Lake Malawi.',
    inclusionList: [
      '3 Nights in a Lakefront Pool Villa & 2 Nights in a Hillside Bush Suite',
      'All gourmet meals, private beach dinners, and locally sourced beverages',
      'Two private full-day 4x4 safaris in Nkhotakota Wildlife Reserve',
      'Half-day private sunset dhow sailing excursion with bespoke wine pairing',
      '60-minute signature Marula body massage per guest',
      'Roundtrip luxury airport transfers from Lilongwe International Airport'
    ],
    validity: 'Valid throughout the current year (Excludes December 20 - January 5)',
    priceDetails: 'From $4,950 per adult (Double occupancy)'
  },
  {
    id: 'long-stay-narrative',
    title: 'The Slow Narrative Stay',
    subtitle: '7 Nights for the price of 5 - A tribute to slow travel',
    description: 'For those who wish to settle, create, write, or find profound silence. Immerse yourself deeply in our local community, finish your manuscript, or indulge in daily wellness.',
    inclusionList: [
      '7 Nights in any selection of Villa or Suite (Pay for 5 nights only)',
      'Complimentary upgrade to personal eco-butler assistance',
      'Unlimited private access to kayaks, stand-up paddleboarding, and snorkel gears',
      'Daily personal yoga or core health check consultation with our resident coach',
      'Complimentary artisanal pottery workshops and wood carving interaction',
      'Full premium open-bar privileges (except ultra-rare vintage reserves)'
    ],
    validity: 'Applicable for stays during April - June and September - November',
    priceDetails: 'From $4,750 per villa (Value savings of up to $2,300)'
  }
];

export const JOURNAL_STORIES: JournalStory[] = [
  {
    id: 'pottery-of-nkhotakota',
    title: 'Earth and Fire: Molding the Nkhotakota Clay',
    category: 'culture',
    date: 'May 12, 2026',
    author: 'Elena Chisiza',
    readTime: '4 min read',
    excerpt: 'Deep in the valley, local clay is mined by hand and sculpted into contemporary pieces. Discover the artisans who shape our lodge tableware.',
    content: [
      'When compiling the design details of Tranquil Waters Lodge, we knew we had to source materials that spoke directly to the ground beneath us. In Nkhotakota, pottery isn’t merely a hobby; it is a complex language of ancestry, lineage, and survival.',
      'We collaborated with the Chitsime Women\'s pottery cooperative to shape over two thousand custom items. From the rustic, earth-hued coffee tumblers in your villa cabinet to the heavy basalt-textured plates at the dinner table, each piece is born from clay harvested near local riverbeds and fired in open wood kilns.',
      'We invite our guests to participate. Slipping your hands into wet clay and centering a block on a foot-pedal wheel connects you to the earth under the African sun in a way that words rarely can.'
    ],
    image: VILLA_IMAGE
  },
  {
    id: 'saving-the-miombo-forest',
    title: 'Protecting the Miombo: Our Forest Partnerships',
    category: 'conservation',
    date: 'April 28, 2026',
    author: 'Daniel Phiri',
    readTime: '6 min read',
    excerpt: 'An inside look at our active preservation efforts safeguarding Nkhotakota’s dense forest, protecting endangered corridors.',
    content: [
      'The Miombo woodland is the green lung of Central Africa. Dominated by trees of Brachystegia, this ecosystem is a sanctuary for elephants, baboons, leopards, and over 280 bird species. However, high demands for local firewood often threaten these forests.',
      'At Tranquil Waters Lodge, our presence is built entirely on ecological preservation. Powered by a high-capacity solar tracking grid, we emit zero carbon during lodge operations. Furthermore, we pay a forest easement fee of $25 per night per bed directly to local communities to guarantee the canopy is not cleared for charcoal burn houses.',
      'We also support community reforestation programs. Guests can co-plant indigenous Mahogany seedlings in our buffer forestry reserves, placing down physical roots that will outlive us for generations.'
    ],
    image: SAFARI_IMAGE
  },
  {
    id: 'cichlids-of-lake-malawi',
    title: 'Jewels of the Freshwater: The Cichlid Phenomenon',
    category: 'nature',
    date: 'March 15, 2026',
    author: 'Dr. Joseph Gondwe',
    readTime: '5 min read',
    excerpt: 'With over 800 endemic fish species, Lake Malawi is a living evolutionary marvel. Learn how we snorkel with these sparkling populations.',
    content: [
      'To slide into Lake Malawi with a diving mask is to enter a tropical aquarium of spectacular proportions. Unlike ocean waters, there is no salt sting, and the visibility is crystal-clear, revealing a landscape of giant rounded granite boulders.',
      'The star residents are the Cichlids. These tiny, hyper-colorful fish are famous among evolutionary scientists worldwide. Lake Malawi holds more species of fish than the lakes of North America and Europe combined, showing spectacular colors of electric sapphire, neon tangerine, and iridescent purple.',
      'Tranquil Waters Lodge supports marine protection zones around our islet systems. By encouraging sustainable fishing zones and teaching snorkeling to local youth, we ensure this incredible natural wonderland remains pristine for lifetimes to come.'
    ],
    image: DHOW_IMAGE
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'how-to-get-here',
    question: 'How do we reach Tranquil Waters Lodge?',
    answer: 'Most guests land at Lilongwe International Airport (LLW). From there, you can choose a scenic 3.5-hour road transfer in our luxury 4x4 vehicles, or schedule a scenic 45-minute light-aircraft charter flight straight to the Nkhotakota Airstrip, located just a 20-minute drive from our reception desk. We manage and coordinate all transfer logistics.',
    category: 'getting-here'
  },
  {
    id: 'best-time-to-visit',
    question: 'When is the best season to explore?',
    answer: 'Lake Malawi and Nkhotakota Wildlife Reserve are highly rewarding year-round. The dry, cool winter season from May to October is ideal for safari elephant tracking as they gather near rivers, with skies that are bright and clear. The emerald, warm summer season from November to April is spectacular for bird-watching and stunning, dramatic sunset storm clouds over the lake hills.',
    category: 'general'
  },
  {
    id: 'children-policy',
    question: 'Are children welcome at the lodge?',
    answer: 'Yes. To retain our absolute serene quiet luxury, we welcome children of age 8 and upwards in our standard Hillside Bush Suites and Lakefront pool villas. For families with younger children, our double-key Family Residence Villa provides a spacious estate, absolute isolation, private pool access, and custom security to accommodate children of all ages without reservation limits.',
    category: 'stay'
  },
  {
    id: 'malaria-safety',
    question: 'What wellness and safety measures are in place?',
    answer: 'Nkhotakota is located in a malaria zone, so we recommend consulting your travel physician regarding preventative tablets. The lodge is equipped with deep mosquito nets, organic cooling botanical sprays, and has a registered physician on call 24/7. Our food is washed in triple-filtered mountain spring water, and the entire property is highly secured.',
    category: 'general'
  },
  {
    id: 'sustainability-overview',
    question: 'How is the lodge integrated with conservation?',
    answer: 'We operate on a 100% solar power grid with low-consumption evening battery cooling. We have a zero single-use plastic policy, our own water filtration system tapping into mountain wells, and we employ over 85% of our staff from the immediate surrounding village of Nkhotakota, paying fair luxury wages with medical support.',
    category: 'general'
  }
];
