import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Sunset, 
  Map, 
  Grid, 
  Calendar, 
  FileText, 
  PhoneCall, 
  Plus, 
  X, 
  Menu, 
  Waves, 
  TrendingUp, 
  Check, 
  ArrowRight,
  Info,
  ChevronDown,
  Mail,
  Moon,
  Sun,
  Award,
  Sparkles,
  MapPin
} from 'lucide-react';

import { 
  VILLAS, 
  EXPERIENCES, 
  OFFERS, 
  JOURNAL_STORIES, 
  FAQS, 
  HERO_IMAGE, 
  VILLA_IMAGE, 
  SAFARI_IMAGE, 
  DHOW_IMAGE, 
  DINING_IMAGE 
} from './data';

import AvailabilityForm from './components/AvailabilityForm';
import AIConcierge from './components/AIConcierge';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'lodge' | 'stay' | 'experiences' | 'dining' | 'retreats' | 'rates' | 'gallery' | 'travel' | 'journal' | 'contact'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedRoomId, setPreselectedRoomId] = useState('lakefront-pool-villa');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'villa' | 'nature' | 'food' | 'wildlife' | 'wellness'>('all');
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [faqCategory, setFaqCategory] = useState<'all' | 'getting-here' | 'stay' | 'excursions' | 'general'>('all');
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  // Monitor page scroll to apply compact header styles
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump scroll to top on page switches to mimic standard routing
  const navigateTo = (tabName: 'home' | 'lodge' | 'stay' | 'experiences' | 'dining' | 'retreats' | 'rates' | 'gallery' | 'travel' | 'journal' | 'contact') => {
    setCurrentTab(tabName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerBookingForRoom = (roomId: string) => {
    setPreselectedRoomId(roomId);
    setIsBookingOpen(true);
  };

  // Define navigation layout items
  const NAV_ITEMS = [
    { id: 'lodge', label: 'The Lodge' },
    { id: 'stay', label: 'Stay' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'dining', label: 'Dining' },
    { id: 'retreats', label: 'Retreats' },
    { id: 'rates', label: 'Rates & Offers' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'travel', label: 'Travel Info' },
    { id: 'journal', label: 'Journal' },
    { id: 'contact', label: 'Reservations' }
  ] as const;

  // Filtered gallery mock list combining beautiful generated assets and captions
  const GALLERY_ITEMS = [
    { url: HERO_IMAGE, category: 'nature', title: 'Lodge dusk horizon over Lake Malawi' },
    { url: VILLA_IMAGE, category: 'villa', title: 'Lakefront Pool Villa private plunge pool' },
    { url: SAFARI_IMAGE, category: 'wildlife', title: 'Game observation in Nkhotakota Reserve' },
    { url: DHOW_IMAGE, category: 'nature', title: 'Sailing of Mvula wooden dhow' },
    { url: DINING_IMAGE, category: 'food', title: 'Candlelit dining deck under direct starlight' },
    { url: VILLA_IMAGE, category: 'villa', title: 'Contemporary master interior and local cottons' },
    { url: SAFARI_IMAGE, category: 'nature', title: 'Elevated canopy and native Miombo forests' },
    { url: DINING_IMAGE, category: 'wellness', title: 'Sensory Marula massage room at The Sanctuary' }
  ];

  const filteredGallery = galleryFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

  const filteredFaqs = faqCategory === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === faqCategory);

  return (
    <div className="min-h-screen bg-earth-50 text-charcoal-900 selection:bg-earth-200" id="lodge-app">
      
      {/* 1. Global Navigation Bar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled || currentTab !== 'home'
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-earth-100/60 py-4' 
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6 text-white'
        }`}
        id="main-nav"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Identity / Home Anchor */}
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-2 group pointer-events-auto cursor-pointer text-left"
            id="logo-anchor"
          >
            <span className={`font-serif text-xl md:text-2xl tracking-widest uppercase font-medium transition-all ${
              scrolled || currentTab !== 'home' ? 'text-earth-900 group-hover:text-earth-700' : 'text-white group-hover:text-earth-200'
            }`}>
              Tranquil Waters
            </span>
            <span className={`hidden sm:inline font-sans text-[10px] tracking-[0.2em] uppercase font-light border-l pl-2 transition-colors ${
              scrolled || currentTab !== 'home' ? 'border-earth-300 text-earth-600' : 'border-white/30 text-white/75'
            }`}>
              Lake Malawi
            </span>
          </button>

          {/* Desktop Links (10 items) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-light tracking-widest uppercase" id="desktop-links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`relative py-1 border-b border-transparent transition-all pointer-events-auto cursor-pointer ${
                  currentTab === item.id 
                    ? scrolled || currentTab !== 'home'
                      ? 'text-earth-800 border-earth-800 font-normal outline-none'
                      : 'text-white border-white font-normal'
                    : scrolled || currentTab !== 'home'
                      ? 'text-earth-700 hover:text-earth-900'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {item.id === 'contact' && <span className="pr-2"></span>}
              </button>
            ))}
          </nav>

          {/* Action Call / Toggle Button */}
          <div className="flex items-center gap-4">


            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 focus:outline-none rounded pointer-events-auto cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-hamburger"
            >
              <Menu size={24} className={scrolled || currentTab !== 'home' ? 'text-charcoal-900' : 'text-white'} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-earth-100 shadow-md p-6 flex flex-col gap-4 text-sm uppercase tracking-widest text-earth-800 font-light"
              id="mobile-drawer"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-left py-2 border-b border-earth-50 hover:text-earth-950 pointer-events-auto cursor-pointer ${
                    currentTab === item.id ? 'text-earth-950 font-normal border-earth-400' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="w-full bg-earth-800 text-white text-center py-3.5 mt-2 rounded uppercase font-light text-xs tracking-widest pointer-events-auto cursor-pointer"
              >
                Enquire Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* 2. Main Tab router section wrapper */}
      <main className="pt-0 select-none pb-12">
        
        {/* ==================== SCREEN: HOME ==================== */}
        {currentTab === 'home' && (
          <div id="section-home">
            {/* Cinematic Large Screen Hero */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden" id="hero-banner">
              {/* Background cover generated high res graphic reference */}
              <div className="absolute inset-0 bg-black/35 z-10" />
              <img 
                src={HERO_IMAGE} 
                alt="Tranquil Waters sunset" 
                className="absolute inset-0 w-full h-full object-cover select-none scale-105 animate-[pulse_10s_infinite_alternate]"
                referrerPolicy="no-referrer"
                id="hero-img-node"
              />
              
              <div className="relative z-20 max-w-4xl mx-auto text-center px-6 pt-16 text-white space-y-6">
                <motion.span 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="font-sans text-xs tracking-[0.4em] uppercase text-earth-200/90 font-light block"
                >
                  Contemporary Eco-Lodge, Malawi
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="font-serif text-4xl sm:text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-2"
                >
                  Where the lake meets the wild.
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  className="font-sans text-sm sm:text-lg md:text-xl font-light text-earth-100 max-w-2xl mx-auto leading-relaxed tracking-wide"
                >
                  A contemporary eco-lodge on the shores of Lake Malawi, balancing quiet luxury with untamed wilderness.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="pt-6 flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <button 
                    onClick={() => navigateTo('stay')}
                    className="bg-white text-earth-900 border border-white hover:bg-earth-100 font-light text-xs uppercase tracking-widest px-8 py-4 px-10 transition-colors pointer-events-auto cursor-pointer"
                  >
                    View Villas
                  </button>
                  <button 
                    onClick={() => setIsBookingOpen(true)}
                    className="bg-transparent text-white border border-white/60 hover:bg-white/10 hover:border-white font-light text-xs uppercase tracking-widest px-8 py-4 px-10 transition-colors pointer-events-auto cursor-pointer"
                  >
                    Plan Your Stay
                  </button>
                </motion.div>
              </div>

              {/* Scroll guide bottom bar subtle indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-25 text-center hidden md:block">
                <span className="text-[10px] tracking-[0.25em] text-white/60 uppercase block mb-1">Explore</span>
                <ChevronDown size={14} className="text-white/60 mx-auto animate-bounce" />
              </div>
            </div>

            {/* Elegant Poetic Welcome Intro Block */}
            <section className="py-24 max-w-5xl mx-auto px-6 text-center" id="home-introduction">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block mb-3 font-semibold">The Core Philosophy</span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 tracking-tight leading-tight max-w-3xl mx-auto mb-6">
                A sanctuary carved from wilderness, powered by the central sun.
              </h2>
              <p className="font-sans text-base md:text-lg text-earth-800 font-light leading-relaxed max-w-4xl mx-auto tracking-wide">
                Tranquil Waters Lodge is a 12-key luxury hideaway overlooking Lake Malawi, a place where soft architecture, solar-powered comfort, and warm Malawian hospitality come together. Here, sunrise over the water and starlight above the hills bookend days filled with safaris, slow meals, and time to breathe.
              </p>
              
              <div className="mt-12 w-20 h-px bg-earth-300 mx-auto" />
            </section>

            {/* Quick links features grid (Bento preview layout) */}
            <section className="bg-earth-100/40 border-y border-earth-100 py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block mb-2">Our Worlds</span>
                  <h3 className="font-serif text-3xl text-charcoal-900">Experience Tranquil Waters</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1: Accommodation */}
                  <div className="bg-white border border-earth-100 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group">
                    <div className="h-64 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                      <img src={VILLA_IMAGE} alt="Lodge room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-serif text-xl mb-2 text-charcoal-900 group-hover:text-earth-700 transition-colors">Tactile Sanctuary stay</h4>
                        <p className="text-xs text-earth-700 font-light leading-relaxed">6 beachfront pool villas, 4 canopy bush suites, and the matching double-master family estate. Crafted entirely of local timber, stone, and cottons.</p>
                      </div>
                      <button 
                        onClick={() => navigateTo('stay')}
                        className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-earth-800 focus:outline-none pointer-events-auto cursor-pointer"
                      >
                        Browse Suites <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Wild Adventures */}
                  <div className="bg-white border border-earth-100 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group">
                    <div className="h-64 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                      <img src={SAFARI_IMAGE} alt="Safari view" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-serif text-xl mb-2 text-charcoal-900 group-hover:text-earth-700 transition-colors">The Lake and Forest Wilderness</h4>
                        <p className="text-xs text-earth-700 font-light leading-relaxed">Combine guided game drives inside Nkhotakota Wildlife Reserve with custom sailing cruises, clear snorkel treks, and community clay sessions.</p>
                      </div>
                      <button 
                        onClick={() => navigateTo('experiences')}
                        className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-earth-800 focus:outline-none pointer-events-auto cursor-pointer"
                      >
                        Explore outings <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Conservation Legacy */}
                  <div className="bg-white border border-earth-100 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group">
                    <div className="h-64 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                      <img src={DINING_IMAGE} alt="Dining starlight" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-serif text-xl mb-2 text-charcoal-900 group-hover:text-earth-700 transition-colors">Eart-Grown Slow Dining</h4>
                        <p className="text-xs text-earth-700 font-light leading-relaxed">Unhurried dishes designed about local village farms, organic lakeside herb nursery beds, and fresh morning lake catches.</p>
                      </div>
                      <button 
                        onClick={() => navigateTo('dining')}
                        className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-earth-800 focus:outline-none pointer-events-auto cursor-pointer"
                      >
                        Explore Dining <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Luxury Stat Callouts - Social proof of eco */}
            <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center" id="stat-indicators">
              <div>
                <div className="font-serif text-4xl text-earth-700 mb-1 font-light">12</div>
                <div className="text-[10px] uppercase font-light tracking-widest text-earth-800">Bespoke Suites</div>
              </div>
              <div>
                <div className="font-serif text-4xl text-earth-700 mb-1 font-light">100%</div>
                <div className="text-[10px] uppercase font-light tracking-widest text-earth-800">Solar tracker grid</div>
              </div>
              <div>
                <div className="font-serif text-4xl text-earth-700 mb-1 font-light">10%</div>
                <div className="text-[10px] uppercase font-light tracking-widest text-earth-800">Revenue Direct to Village</div>
              </div>
              <div>
                <div className="font-serif text-4xl text-earth-700 mb-1 font-light">850&#43;</div>
                <div className="text-[10px] uppercase font-light tracking-widest text-earth-800 font-light">Endemic fish cichlids</div>
              </div>
            </section>

            {/* Interactive AI Butler Teaser on Home */}
            <section className="bg-earth-100/50 py-16 px-6 border-t border-earth-100">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <span className="inline-flex items-center gap-1.5 bg-earth-200 text-earth-900 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium">
                  <Sparkles size={11} /> Smart Concierge
                </span>
                <h3 className="font-serif text-3xl text-charcoal-900 font-light">Discuss your Malawi stay with Mphatso</h3>
                <p className="text-sm font-light text-earth-800 max-w-xl mx-auto leading-relaxed">
                  Our interactive lodge butler can draft 5-night flight transfer combinations, explain our rain filtration systems, and suggest items to pack for the Miombo forest walks.
                </p>
                <div className="text-left max-w-2xl mx-auto mt-6">
                  <AIConcierge />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== SCREEN: THE LODGE ==================== */}
        {currentTab === 'lodge' && (
          <div id="section-lodge" className="max-w-6xl mx-auto px-6 pt-32 space-y-20">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block">Our Sanctuary</span>
              <h2 className="font-serif text-4xl text-charcoal-900 leading-none">The Story of Tranquil Waters</h2>
              <p className="text-sm text-earth-800 font-light leading-relaxed">We stand gently on Malawian earth, preserving the ancient woods and honoring the blue horizon.</p>
            </div>

            {/* Article Block 1: The Story */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-earth-700 block mb-2">Our Origins</span>
                <h3 className="font-serif text-2xl text-charcoal-900 mb-4">Crafted, Not Fabricated</h3>
                <p className="text-sm text-earth-700 font-light leading-relaxed mb-4">
                  Tranquil Waters was founded on a simple realization: that luxury could become a medium of absolute restoration. In designing our spaces, we ignored standard blueprint ideas, preferring local Malawian materials and hands-on methods.
                </p>
                <p className="text-sm text-earth-700 font-light leading-relaxed">
                  We employed local stone artisans from Nkhotakota to lay each stone without heavy diesel equipment. Reclaimed local railroad ties form our stairways, slate floors hold our washbasins, and we strictly preserve all indigenous Baobab and wild fig canopies.
                </p>
              </div>
              <div className="h-96 rounded-xl overflow-hidden relative border border-earth-100">
                <img src={HERO_IMAGE} alt="Building materials" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Article Block 2: Land & Lake */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse md:grid-flow-col-dense">
              <div className="md:col-start-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-earth-700 block mb-2">Lake Malawi &amp; Forest</span>
                <h3 className="font-serif text-2xl text-charcoal-900 mb-4">A Double Wilderness Connection</h3>
                <p className="text-sm text-earth-700 font-light leading-relaxed mb-4">
                  Lake Malawi is unique—it is a tropical freshwater ocean filled with crystal-clear water and thousands of endemic cichlid species. Immediately behind us rises Nkhotakota Reserve: a vast green wilderness of miombo woodlands, rolling high plains, and rivers.
                </p>
                <p className="text-sm text-earth-700 font-light leading-relaxed">
                  Nowhere else in Southern Africa can you combine pristine morning freshwater snorkels alongside glowing turquoise fish complexes with afternoon 4x4 elephant tracking in a thriving protected conservation sanctuary.
                </p>
              </div>
              <div className="h-96 rounded-xl overflow-hidden relative col-start-1 border border-earth-100">
                <img src={DHOW_IMAGE} alt="Dhow water" className="w-full h-full object-cover animate-pulse" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Core Values / Sustainability Panel */}
            <section className="bg-white border border-earth-100 rounded-xl p-8 md:p-12 space-y-8 shadow-sm">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-[10px] uppercase tracking-[0.25em] text-earth-800 font-medium">True Eco-Integration</span>
                <h4 className="font-serif text-2xl text-charcoal-900 mt-2">Active Stewardship Programs</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center text-earth-700"><Sun size={18} /></div>
                  <h5 className="font-serif text-lg text-charcoal-900 font-medium">Solar Tracking Grid</h5>
                  <p className="text-xs text-earth-600 font-light leading-relaxed">
                    Our entire 130kW tracker photovoltaic grid fuels 100% of lodge lighting, kitchen utilities, and our customized evening silent sleeping climate grids, operating off-grid with zero carbon emissions.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center text-earth-700"><Waves size={18} /></div>
                  <h5 className="font-serif text-lg text-charcoal-900 font-medium">Closed-Loop Aquifer</h5>
                  <p className="text-xs text-earth-600 font-light leading-relaxed">
                    We tap pure deep mountain well aquifers, triple-filtering with ceramic sand filters to generate clean mineral drinking water in each suite, banning single-use plastic entirely.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center text-earth-700"><Award size={18} /></div>
                  <h5 className="font-serif text-lg text-charcoal-900 font-medium">Fair Luxury Wages</h5>
                  <p className="text-xs text-earth-600 font-light leading-relaxed">
                    85% of our hospitality, culinary, and guiding teams are recruited from our closest neighborhood village. We support the village clinics, farming cooperatives and scholastic scholarships.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== SCREEN: STAY ==================== */}
        {currentTab === 'stay' && (
          <div id="section-stay" className="max-w-6xl mx-auto px-6 pt-32 space-y-16">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block">Sanctuary Suites</span>
              <h2 className="font-serif text-4xl text-charcoal-900">Sensory Accommodations</h2>
              <p className="text-sm text-earth-800 font-light">With just 12 keys, Tranquil Waters ensures absolute deep silence, raw natural textures, and unhurried lake vistas.</p>
            </div>

            {/* List of Villa Suites */}
            <div className="space-y-16">
              {VILLAS.map((v, index) => (
                <div 
                  key={v.id} 
                  className={`border border-earth-100 bg-white rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12`}
                >
                  <div className={`lg:col-span-6 h-80 lg:h-auto overflow-hidden relative ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-earth-700 block">{v.size}</span>
                          <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 mt-1">{v.name}</h3>
                        </div>
                        <span className="font-serif text-xl text-earth-800">${v.rate}<span className="text-xs uppercase font-sans font-light tracking-wide text-earth-600 block text-right mt-1">per night</span></span>
                      </div>

                      <p className="text-xs text-earth-800 italic leading-snug">{v.tagline}</p>
                      <p className="text-xs text-earth-700 font-light leading-relaxed">{v.longDescription}</p>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-earth-100 text-xs text-earth-800 font-light">
                        <div><strong>Capacity:</strong> {v.capacity}</div>
                        <div><strong>Horizon view:</strong> {v.view}</div>
                      </div>

                      <div>
                        <strong className="block text-xs uppercase tracking-wider text-earth-900 mb-2">Sanctuary Amenities</strong>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-earth-700 font-light" id={`amenities-list-${v.id}`}>
                          {v.amenities.map((am, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-earth-600 rounded-full" />
                              {am}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-8 flex gap-4">
                      <button 
                        onClick={() => triggerBookingForRoom(v.id)}
                        className="flex-1 bg-earth-800 hover:bg-earth-950 text-white text-xs uppercase tracking-widest py-4 rounded font-light cursor-pointer pointer-events-auto transition-colors align-middle"
                        id={`btn-book-villa-${v.id}`}
                      >
                        Enquire Booking
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SCREEN: EXPERIENCES ==================== */}
        {currentTab === 'experiences' && (
          <div id="section-experiences" className="max-w-6xl mx-auto px-6 pt-32 space-y-16">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block font-semibold">Our Excursions</span>
              <h2 className="font-serif text-4xl text-charcoal-900">Water, Woods, and Shared Wisdom</h2>
              <p className="text-sm text-earth-800 font-light">We offer slow, meaningful experiences that bring you into direct respect with Malawi&apos;s wild landscapes and residents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="bg-white border border-earth-100 rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <div className="h-64 relative overflow-hidden">
                      <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-earth-850 rounded">
                        {exp.category}
                      </span>
                    </div>
                    <div className="p-6 md:p-8 space-y-4">
                      <div>
                        <span className="text-[10px] text-earth-700 uppercase font-bold tracking-wider block">{exp.duration} &bull; {exp.included}</span>
                        <h3 className="font-serif text-xl md:text-2xl text-charcoal-900 mt-1 font-medium">{exp.title}</h3>
                      </div>
                      <p className="text-xs text-earth-800 italic leading-snug">{exp.tagline}</p>
                      <p className="text-xs text-earth-700 font-light leading-relaxed">{exp.longDescription}</p>

                      <div className="space-y-2 pt-2 border-t border-earth-100">
                        <strong className="block text-xs uppercase tracking-widest text-earth-900">Highlights</strong>
                        <ul className="space-y-1 text-xs text-earth-700 font-light">
                          {exp.highlights.map((hl, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-earth-600 font-bold mt-0.5">&#10003;</span>
                              {hl}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-earth-100 bg-earth-50">
                    <button 
                      onClick={() => {
                        setIsBookingOpen(true);
                      }}
                      className="w-full border border-earth-700 text-earth-800 hover:bg-earth-800 hover:text-white transition-colors text-xs uppercase tracking-widest py-3 rounded pointer-events-auto cursor-pointer"
                    >
                      Enquire For Experience
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SCREEN: DINING ==================== */}
        {currentTab === 'dining' && (
          <div id="section-dining" className="max-w-5xl mx-auto px-6 pt-32 space-y-16">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block">Nourishment</span>
              <h2 className="font-serif text-4xl text-charcoal-900">The Kitchen Narrative</h2>
              <p className="text-sm text-earth-800 font-light">Fresh local ingredients, unhurried meals, and starlight dining on Lake Malawi.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-[450px] rounded-xl overflow-hidden relative border border-earth-100">
                <img src={DINING_IMAGE} alt="Lakeside dining" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-earth-700 block">Slow Organic Harvest</span>
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 leading-snug font-medium">No rigid schedules, only sensory stories.</h3>
                <p className="text-sm text-earth-750 font-light leading-relaxed">
                  We have no buzzing buffets or static reservation hours. Dinner at Tranquil Waters is an unhurried dialog between our local Malawian chefs and your preferred mood. Dine under the grand canopy of a giant Baobab tree on the sands, on your private deck over looking the water, or floating on our traditional dhow.
                </p>
                <p className="text-sm text-earth-750 font-light leading-relaxed">
                  Our food is centered around our estate nursery garden. We grow sweet basil, lemon verbena, habanero peppers, micro-greens, and wild spinach. Fish is freshly delivered each morning by Nkhotakota canoe fishermen, and we roast single-estate fair-trade Arabica beans from the northern Viphya mountains.
                </p>
                <div className="pt-2 border-t border-earth-150 flex flex-wrap gap-4 text-xs font-semibold text-earth-800">
                  <span>&bull; Fresh Lake Tilapia &amp; Kampango</span>
                  <span>&bull; Hand-Pressed Mountain Olive Oils</span>
                  <span>&bull; Organic Farm Spinach Curry</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SCREEN: RETREATS ==================== */}
        {currentTab === 'retreats' && (
          <div id="section-retreats" className="max-w-5xl mx-auto px-6 pt-32 space-y-16">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block font-semibold">Gatherings</span>
              <h2 className="font-serif text-4xl text-charcoal-900">Quiet Sanctuary Retreats</h2>
              <p className="text-sm text-earth-800 font-light">With our absolute 12-key limit, we offer a dedicated sanctuary for selective creative squads, family reunions, and core yoga groups.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-earth-700 block">Exclusive Haven Hire</span>
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 mt-1 leading-snug font-medium">Bespoke Journeys for Creators &amp; Seekers</h3>
                <p className="text-sm text-earth-750 font-light leading-relaxed">
                  Tranquil Waters accommodates up to 24 guests in absolute private isolation. Our open forest canopy, crystal blue freshwater swimming holes, and beachfront timber spaces are tailored for slow reflective work, yoga workshops, or small executive retreats seeking authentic stillness.
                </p>
                <p className="text-sm text-earth-750 font-light leading-relaxed">
                  Our retreat team works directly with group leaders to construct balanced programs, including customized botanical menus, sunrise silent treks in Nkhotakota Wildlife Reserve, and sound meditations alongside Lake Malawi&apos;s rhythmic wave beats.
                </p>
                <button 
                  onClick={() => {
                    setIsBookingOpen(true);
                  }}
                  className="bg-earth-800 hover:bg-earth-950 text-white rounded text-xs uppercase tracking-widest px-6 py-4 cursor-pointer transition-colors"
                >
                  Request Retreat Design Consultation
                </button>
              </div>
              <div className="h-[400px] rounded-xl overflow-hidden relative border border-earth-100">
                <img src={HERO_IMAGE} alt="Yoga terrace" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        )}

        {/* ==================== SCREEN: RATES & OFFERS ==================== */}
        {currentTab === 'rates' && (
          <div id="section-rates" className="max-w-5xl mx-auto px-6 pt-32 space-y-16">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block">Pricing &amp; Value</span>
              <h2 className="font-serif text-4xl text-charcoal-900">Rates &amp; Curated Stays</h2>
              <p className="text-sm text-earth-800 font-light">Honest transparent luxury value. Standard inclusions and designed pathways combining water, wildlife, and wellness.</p>
            </div>

            {/* Inclusions Card */}
            <div className="bg-white border border-earth-100 rounded-xl p-8 shadow-sm">
              <h3 className="font-serif text-xl text-charcoal-900 mb-4 font-medium border-b border-earth-100 pb-2">The Absolute Luxury Inclusion</h3>
              <p className="text-xs text-earth-800 font-light leading-relaxed mb-6">
                Our rates are highly inclusive, shielding you from arbitrary billings. Every reserved stay at Tranquil Waters Lodge includes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-earth-700 font-light">
                <div className="flex gap-2">
                  <span className="text-earth-600 font-bold">&#10003;</span>
                  <span>Three daily organic meals &amp; house spirits</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-earth-600 font-bold">&#10003;</span>
                  <span>Complimentary daily mountain aquifer bottled waters</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-earth-600 font-bold">&#10003;</span>
                  <span>Self-guided shoreline kayaking, paddleboarding &amp; snorkel gear</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-earth-600 font-bold">&#10003;</span>
                  <span>Daily sunrise guided meditation and core yoga assemblies</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-earth-600 font-bold">&#10003;</span>
                  <span>Daily room steward service with cooling botanical sprays</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-earth-600 font-bold">&#10003;</span>
                  <span>Fair luxury wages &amp; active local clinic donations</span>
                </div>
              </div>
            </div>

            {/* Curated Offers Selection */}
            <div className="space-y-8 pt-8">
              <h3 className="font-serif text-2xl text-charcoal-900 border-b border-earth-100 pb-3 font-medium">Seasonal Escapes &amp; Packages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {OFFERS.map((of) => (
                  <div key={of.id} className="bg-earth-100/30 border border-earth-200 rounded-xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-earth-700 block">{of.validity}</span>
                        <h4 className="font-serif text-xl md:text-2xl text-charcoal-900 mt-1 font-medium">{of.title}</h4>
                      </div>
                      <p className="text-xs text-earth-800 leading-snug">{of.subtitle}</p>
                      <p className="text-xs text-earth-700 font-light leading-relaxed">{of.description}</p>

                      <div className="pt-4 border-t border-earth-200">
                        <strong className="block text-xs uppercase tracking-widest text-earth-900 mb-2">Package Inclusions</strong>
                        <ul className="space-y-1.5 text-xs text-earth-700 font-light">
                          {of.inclusionList.map((inc, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-earth-700 font-bold">&#8250;</span>
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-earth-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-earth-600 uppercase">Valuation</span>
                        <div className="font-serif text-lg text-earth-800 leading-none">{of.priceDetails}</div>
                      </div>
                      <button 
                        onClick={() => setIsBookingOpen(true)}
                        className="bg-earth-800 hover:bg-earth-950 text-white text-xs uppercase tracking-widest px-4 py-2.5 rounded transition-colors pointer-events-auto cursor-pointer"
                      >
                        Enquire Package
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== SCREEN: GALLERY ==================== */}
        {currentTab === 'gallery' && (
          <div id="section-gallery" className="max-w-6xl mx-auto px-6 pt-32 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block font-semibold">Visual Diary</span>
              <h2 className="font-serif text-4xl text-charcoal-900">Quiet Beauty of Lake Malawi</h2>
              <p className="text-sm text-earth-800 font-light">A visual record of starlight decks, crystal clear freshwater, and green Miombo trees.</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2" id="gallery-filters">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'villa', label: 'Suites &amp; Villas' },
                { id: 'nature', label: 'Lake &amp; Forest' },
                { id: 'wildlife', label: 'Wild Reserve' },
                { id: 'food', label: 'Slow Food' },
                { id: 'wellness', label: 'Wellness Platform' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setGalleryFilter(btn.id as any)}
                  className={`text-xs px-4 py-2 rounded-full border transition-all pointer-events-auto cursor-pointer font-light ${
                    galleryFilter === btn.id
                      ? 'bg-earth-800 border-earth-800 text-white'
                      : 'bg-white border-earth-200 text-earth-800 hover:border-earth-400'
                  }`}
                  dangerouslySetInnerHTML={{ __html: btn.label }}
                />
              ))}
            </div>

            {/* Photo Grid Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="gallery-image-grid">
              {filteredGallery.map((img, idx) => (
                <div key={idx} className="bg-white border border-earth-100 rounded-lg overflow-hidden flex flex-col hover:shadow-sm transition-all group">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={img.url} 
                      alt={img.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-[11px] text-earth-700 tracking-wide leading-tight">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SCREEN: TRAVEL INFO ==================== */}
        {currentTab === 'travel' && (
          <div id="section-travel-faq" className="max-w-5xl mx-auto px-6 pt-32 space-y-16">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block">Voyage Logistics</span>
              <h2 className="font-serif text-4xl text-charcoal-900">How to Reach Us</h2>
              <p className="text-sm text-earth-800 font-light">Scenic 4x4 safaris or direct light aircraft lines. Rest easy, we manage each step of your transfers.</p>
            </div>

            {/* Path Guide cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-earth-100 p-8 rounded-xl shadow-sm space-y-4">
                <h3 className="font-serif text-xl text-charcoal-900 font-medium">Scenic Road Transfer</h3>
                <p className="text-xs text-earth-700 font-light leading-relaxed">
                  Most travelers arrive at Lilongwe International Airport (LLW). From there, you will be met by a Tranquil Waters driver in a luxury air-conditioned 4x4 vehicle stocked with refreshing single-estate forest cold-brews and organic snacks.
                </p>
                <div className="p-4 bg-earth-50 rounded text-xs text-earth-800 space-y-1 font-light border border-earth-100/60">
                  <div><strong>Route:</strong> Lilongwe Int Airport to Lake Malawi, Nkhotakota</div>
                  <div><strong>Time duration:</strong> approximately 3.5 hours</div>
                  <div><strong>Included:</strong> Complementary on-board refreshments, snacks &amp; low-orbit satellite WiFi</div>
                </div>
              </div>

              <div className="bg-white border border-earth-100 p-8 rounded-xl shadow-sm space-y-4">
                <h3 className="font-serif text-xl text-charcoal-900 font-medium">Scenic Light Air Charter</h3>
                <p className="text-xs text-earth-700 font-light leading-relaxed">
                  Avoid driving and admire Central Malawi&apos;s beautiful high plains and lake views from above. We schedule private light aircraft flights (such as Cessna Caravan 208) on your behalf, dropping you directly at the Nkhotakota airstrip.
                </p>
                <div className="p-4 bg-earth-50 rounded text-xs text-earth-800 space-y-1 font-light border border-earth-100/60">
                  <div><strong>Route:</strong> Lilongwe airstrip to Nkhotakota airstrip</div>
                  <div><strong>Time duration:</strong> approximately 45 minutes</div>
                  <div><strong>Included:</strong> Quick priority baggage boarding &amp; a swift 20-minute land shuttle to our reception</div>
                </div>
              </div>
            </div>

            {/* Travel FAQs segment */}
            <div className="space-y-8 pt-8" id="faq-section">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-wider text-earth-800 font-semibold mb-2 block">Quick Reference</span>
                <h3 className="font-serif text-2xl text-charcoal-900 font-medium">Frequently Discussed</h3>
              </div>

              {/* Categorization controls */}
              <div className="flex flex-wrap justify-center gap-2 mb-6" id="faq-category-filters">
                {[
                  { id: 'all', label: 'All FAQs' },
                  { id: 'getting-here', label: 'Travel &amp; Arrival' },
                  { id: 'stay', label: 'Lodge Accommodations' },
                  { id: 'general', label: 'Sustainability &amp; Safety' }
                ].map((tc) => (
                  <button
                    key={tc.id}
                    onClick={() => setFaqCategory(tc.id as any)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all pointer-events-auto cursor-pointer font-light ${
                      faqCategory === tc.id
                        ? 'bg-earth-800 border-earth-800 text-white'
                        : 'bg-white border-earth-200 text-earth-800 hover:border-earth-400'
                    }`}
                    dangerouslySetInnerHTML={{ __html: tc.label }}
                  />
                ))}
              </div>

              {/* Collapsible FAQ Panels */}
              <div className="max-w-3xl mx-auto space-y-3">
                {filteredFaqs.map((faq) => {
                  const isOpen = activeFaqId === faq.id;
                  return (
                    <div key={faq.id} className="bg-white border border-earth-100 rounded-lg overflow-hidden shadow-sm">
                      <button
                        onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                        className="w-full text-left p-5 flex items-center justify-between pointer-events-auto cursor-pointer"
                        id={`faq-trigger-${faq.id}`}
                      >
                        <span className="font-serif text-sm md:text-base text-charcoal-900 font-medium">{faq.question}</span>
                        <ChevronDown 
                          size={16} 
                          className={`text-earth-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden bg-earth-50/50"
                          >
                            <p className="p-5 pt-0 text-xs md:text-sm text-earth-800 font-light leading-relaxed border-t border-earth-100">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== SCREEN: JOURNAL ==================== */}
        {currentTab === 'journal' && (
          <div id="section-journal" className="max-w-4xl mx-auto px-6 pt-32 space-y-16">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block font-semibold">The Chronicle</span>
              <h2 className="font-serif text-4xl text-charcoal-900">Journal &amp; Stories</h2>
              <p className="text-sm text-earth-800 font-light">Sensory records of conservation corridors, Malawian clay art, and evolutionary cichlids.</p>
            </div>

            {/* List of Journal Stories */}
            <div className="space-y-16">
              {JOURNAL_STORIES.map((st) => {
                const isExpanded = activeStoryId === st.id;
                return (
                  <article key={st.id} className="bg-white border border-earth-100 rounded-xl overflow-hidden shadow-sm">
                    <div className="h-80 relative overflow-hidden">
                      <img src={st.image} alt={st.title} className="w-full h-full object-cover select-none" referrerPolicy="no-referrer" />
                      <span className="absolute bottom-4 left-4 bg-white/95 px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-earth-800 rounded shadow-sm">
                        {st.category}
                      </span>
                    </div>

                    <div className="p-6 md:p-8 space-y-4">
                      <div className="flex items-center gap-3 text-xs text-earth-600 font-light">
                        <span>{st.date}</span>
                        <span>&bull;</span>
                        <span>By {st.author}</span>
                        <span>&bull;</span>
                        <span>{st.readTime}</span>
                      </div>

                      <h3 className="font-serif text-2xl text-charcoal-900 font-medium">{st.title}</h3>
                      <p className="text-xs md:text-sm text-earth-800 font-light leading-relaxed italic border-l-2 border-earth-300 pl-3">
                        {st.excerpt}
                      </p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 pt-4 border-t border-earth-100"
                          >
                            {st.content.map((p, idx) => (
                              <p key={idx} className="text-xs md:text-sm text-earth-750 font-light leading-relaxed">
                                {p}
                              </p>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={() => setActiveStoryId(isExpanded ? null : st.id)}
                          className="text-xs uppercase tracking-widest font-semibold text-earth-700 hover:text-earth-900 focus:outline-none pointer-events-auto cursor-pointer"
                        >
                          {isExpanded ? "Close Narrative" : "Continue Reading"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== SCREEN: CONTACT & RESERVATIONS ==================== */}
        {currentTab === 'contact' && (
          <div id="section-contact" className="max-w-5xl mx-auto px-6 pt-32 space-y-16">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-earth-800 block">Plan Your Voyage</span>
              <h2 className="font-serif text-4xl text-charcoal-900 font-semibold">Contact &amp; Reservations</h2>
              <p className="text-sm text-earth-800 font-light">Join us on Lake Malawi. File a secure direct booking quote or address custom requests instantly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Direct Inquiries */}
              <div className="lg:col-span-7">
                <AvailabilityForm initialRoomId={preselectedRoomId} />
              </div>

              {/* Right Column: Contact Registry & Butler Concierge */}
              <div className="lg:col-span-5 space-y-8">
                {/* Registry cards */}
                <div className="bg-white border border-earth-100 p-6 md:p-8 rounded-xl shadow-sm space-y-6 font-light text-xs text-earth-800 leading-relaxed">
                  <h3 className="font-serif text-lg text-charcoal-900 border-b border-earth-100 pb-2 font-medium">Lodge Contacts</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-earth-700 shrink-0" />
                      <div>
                        <strong>Physical Location:</strong><br />
                        Nkhotakota Wildlife Reserve Buffer Corridors,<br />
                        Shores of Lake Malawi, Central Region, Malawi
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <PhoneCall size={16} className="text-earth-700 shrink-0" />
                      <div>
                        <strong>Direct Telephone:</strong><br />
                        +265 (0) 1 454 8201 / +265 (0) 9 992 5050
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail size={16} className="text-earth-700 shrink-0" />
                      <div>
                        <strong>Reservations &amp; Retreats:</strong><br />
                        concierge@tranquilwaterslodge.com
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-earth-650 bg-earth-50 p-3 rounded leading-snug border-l-2 border-earth-700">
                    *Our active reservations desk acts under Greenwich Mean Time (GMT+2) and provides structured responses to standard emails within 12 hours max.
                  </p>
                </div>

                {/* AI Concierge Box inside reserves tab */}
                <div className="space-y-4">
                  <h4 className="font-serif text-lg text-charcoal-900 font-medium pl-1">Instant Butler Consultation</h4>
                  <AIConcierge />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 3. Global Footer (Warm earth minimal design) */}
      <footer className="bg-water-950 text-white border-t border-earth-900 py-16 px-6 select-none" id="site-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 font-light text-xs tracking-wider text-water-200/80">
          
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl tracking-widest text-white uppercase block">Tranquil Waters</span>
            <p className="leading-relaxed max-w-sm text-[11px] text-water-100/70 font-light">
              A contemporary 12-key carbon-neutral eco-lodge on Lake Malawi, balancing quiet luxury, solar energy, and untamed Nkhotakota Wildlife.
            </p>
            <div className="text-[10px] text-water-200/50 uppercase tracking-[0.1em]">
              &bull; 100% solar tracker grid &bull; Zero single-use plastic
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <strong className="block text-white uppercase text-[11px] tracking-widest">Sitemap Explorer</strong>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              <li><button onClick={() => navigateTo('lodge')} className="hover:text-white transition-colors text-left pointer-events-auto cursor-pointer block">The Lodge</button></li>
              <li><button onClick={() => navigateTo('stay')} className="hover:text-white transition-colors text-left pointer-events-auto cursor-pointer block">Our Suites</button></li>
              <li><button onClick={() => navigateTo('experiences')} className="hover:text-white transition-colors text-left pointer-events-auto cursor-pointer block">Experiences</button></li>
              <li><button onClick={() => navigateTo('dining')} className="hover:text-white transition-colors text-left pointer-events-auto cursor-pointer block">Dining</button></li>
              <li><button onClick={() => navigateTo('retreats')} className="hover:text-white transition-colors text-left pointer-events-auto cursor-pointer block">Retreats</button></li>
              <li><button onClick={() => navigateTo('rates')} className="hover:text-white transition-colors text-left pointer-events-auto cursor-pointer block">Rates</button></li>
              <li><button onClick={() => navigateTo('gallery')} className="hover:text-white transition-colors text-left pointer-events-auto cursor-pointer block">Gallery</button></li>
              <li><button onClick={() => navigateTo('travel')} className="hover:text-white transition-colors text-left pointer-events-auto cursor-pointer block">Travel Info</button></li>
              <li><button onClick={() => navigateTo('journal')} className="hover:text-white transition-colors text-left pointer-events-auto cursor-pointer block">Journal</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors text-left pointer-events-auto cursor-pointer block">Reservations</button></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <strong className="block text-white uppercase text-[11px] tracking-widest">Village Conservation Direct</strong>
            <p className="leading-relaxed text-[11px] text-water-100/70 font-light">
              10% of each night&apos;s booking fee goes directly to our local Nkhotakota community fund, financing secondary school scholarships and medical solar refrigerators.
            </p>
            <div className="text-earth-200 uppercase text-[10px] font-medium tracking-widest flex items-center gap-1">
              <Award size={13} /> Active African Parks Partner
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <strong className="block text-white uppercase text-[11px] tracking-widest">Join our journal</strong>
            <p className="text-[11px] leading-relaxed mb-2 text-water-100/70">Enter your email and receive slow stories of the lake and animals.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Welcome to our Slow Narratives chronicle. Direct stories will write to your harbor.") }} className="flex border border-water-800 rounded overflow-hidden">
              <input 
                type="email" 
                placeholder="E-mail" 
                className="bg-transparent text-white px-3 py-2 text-xs w-full focus:outline-none" 
                required
              />
              <button type="submit" className="bg-earth-800 p-2 text-white hover:bg-earth-700 pointer-events-auto cursor-pointer">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-water-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-water-200/40 tracking-wider">
          <div>
            &copy; {new Date().getFullYear()} Tranquil Waters Lodge Ltd. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>License: Eco-Safari Lodge LLW-12</span>
            <span>&bull;</span>
            <span>Quiet Sustainable Luxury Malawi</span>
          </div>
        </div>
      </footer>


      {/* 4. Global Floating Slider Booking Drawer Overlay */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end" id="booking-drawer-overlay">
            {/* Backdrop click closer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto cursor-pointer"
              id="booking-backdrop"
            />
            {/* Drawer container */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-lg h-full bg-white shadow-2xl flex flex-col z-10 border-l border-earth-100 pointer-events-auto"
              id="booking-drawer-content"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-earth-100 bg-earth-50">
                <div>
                  <h3 className="font-serif text-xl text-charcoal-900">Custom Lodge Booking Inquiry</h3>
                  <p className="text-[10px] uppercase tracking-wider text-earth-700 font-light">Direct and honest eco-safari reservation</p>
                </div>
                <button 
                  onClick={() => setIsBookingOpen(false)}
                  className="p-2 hover:bg-earth-100 rounded text-charcoal-900 pointer-events-auto cursor-pointer"
                  aria-label="Close booking drawer"
                  id="btn-close-drawer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Form Body content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <AvailabilityForm 
                    initialRoomId={preselectedRoomId} 
                    onSuccess={() => {
                      // Optionally wait a bit then close drawer, but let them read success invoice inside drawer
                    }} 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Sticky "Enquire Now" quick bubble for mobile views */}
      <div className="fixed bottom-6 right-6 md:hidden z-30 pointer-events-auto">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="bg-earth-800 text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
          aria-label="Enquire now"
          id="btn-mobile-sticky-trigger"
        >
          <Calendar size={20} />
        </button>
      </div>

    </div>
  );
}
