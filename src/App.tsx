/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { 
  Car, 
  Calendar, 
  ShieldCheck, 
  Percent, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Fuel, 
  Sliders, 
  Wind, 
  Check, 
  X, 
  Star, 
  TrendingUp, 
  ChevronRight, 
  Menu, 
  Send,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces for Vehicles and Booking
interface Vehicle {
  id: string;
  name: string;
  category: '4x4' | 'SUV';
  price: number; // in FCFA
  image: string;
  specs: {
    seats: number;
    fuel: 'Essence' | 'Diesel';
    transmission: 'Automatique' | 'Manuelle';
    ac: boolean;
  };
  features: string[];
  available: boolean;
}

// 15 Premium Vehicles Data
const VEHICLES_DATA: Vehicle[] = [
  {
    id: 'toyota-land-cruiser',
    name: 'Toyota Land Cruiser Prado',
    category: '4x4',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    specs: {
      seats: 7,
      fuel: 'Diesel',
      transmission: 'Automatique',
      ac: true
    },
    features: ['Tout-terrain robuste', 'Idéal provinces & pistes', 'Confort Royal'],
    available: true
  },
  {
    id: 'bmw-x3-f25',
    name: 'BMW X3 F25 (Fini-2017)',
    category: 'SUV',
    price: 42000,
    image: 'https://i.imgur.com/eYOk0rp.jpeg',
    specs: {
      seats: 5,
      fuel: 'Diesel',
      transmission: 'Automatique',
      ac: true
    },
    features: ['Gris / Beige élégant', 'Moteur TwinPower Turbo', 'Parfait prestige professionnel'],
    available: true
  },
  {
    id: 'range-rover-sport-2013',
    name: 'Range Rover Sport (Phase 2)',
    category: 'SUV',
    price: 75000,
    image: 'https://i.imgur.com/0qUur0T.jpeg',
    specs: {
      seats: 5,
      fuel: 'Diesel',
      transmission: 'Automatique',
      ac: true
    },
    features: ['Rouge vif somptueux', 'Luxe suprême britannique', 'Climatisation multi-zone intégrée'],
    available: true
  },
  {
    id: 'nissan-armada-massif',
    name: 'Nissan Armada (V8 Massif)',
    category: 'SUV',
    price: 65000,
    image: 'https://i.imgur.com/vFiv7Vz.jpeg',
    specs: {
      seats: 8,
      fuel: 'Essence',
      transmission: 'Automatique',
      ac: true
    },
    features: ['Noir profond impérial', 'Volume intérieur gigantesque', 'Stature routière imposante'],
    available: true
  },
  {
    id: 'mercedes-ml-w166',
    name: 'Mercedes-Benz Classe ML W166',
    category: 'SUV',
    price: 55000,
    image: 'https://i.imgur.com/T00zslH.jpeg',
    specs: {
      seats: 5,
      fuel: 'Diesel',
      transmission: 'Automatique',
      ac: true
    },
    features: ['Blanc pur premium', 'Suspension Airmatic grand luxe', 'Technologie d\'assistance active'],
    available: true
  },
  {
    id: 'mercedes-gl-x166',
    name: 'Mercedes-Benz Classe GL 7 Places',
    category: 'SUV',
    price: 80000,
    image: 'https://i.imgur.com/3szRGCE.jpeg',
    specs: {
      seats: 7,
      fuel: 'Diesel',
      transmission: 'Automatique',
      ac: true
    },
    features: ['Bordeaux / Rouge foncé spirituel', 'Version allongée Grand Confort', 'Climatisation arrière indépendante'],
    available: true
  },
  {
    id: 'ford-explorer-5',
    name: 'Ford Explorer V (Grand SUV)',
    category: 'SUV',
    price: 45000,
    image: 'https://i.imgur.com/9QOiRo5.jpeg',
    specs: {
      seats: 7,
      fuel: 'Essence',
      transmission: 'Automatique',
      ac: true
    },
    features: ['Gris foncé baroudeur', 'Système audio premium Sync', 'Grand coffre modulable'],
    available: true
  },
  {
    id: 'toyota-prado-150',
    name: 'Toyota Land Cruiser Prado 150',
    category: '4x4',
    price: 50000,
    image: 'https://i.imgur.com/7GAFqcs.jpeg',
    specs: {
      seats: 7,
      fuel: 'Diesel',
      transmission: 'Automatique',
      ac: true
    },
    features: ['Beige / Argenté aventurier', 'Double réservoir carburant', 'Fiabilité éprouvée au Sahel'],
    available: true
  },
  {
    id: 'ford-edge-facelift',
    name: 'Ford Edge (Phase 2)',
    category: 'SUV',
    price: 35000,
    image: 'https://i.imgur.com/poizTe6.jpeg',
    specs: {
      seats: 5,
      fuel: 'Essence',
      transmission: 'Automatique',
      ac: true
    },
    features: ['Bleu foncé moderne', 'Conduite silencieuse & agile', 'Consommation maîtrisée'],
    available: true
  },
  {
    id: 'toyota-rav4-highlander',
    name: 'Toyota RAV4 / Highlander',
    category: 'SUV',
    price: 28000,
    image: 'https://i.imgur.com/OEwQwmo.jpeg',
    specs: {
      seats: 5,
      fuel: 'Essence',
      transmission: 'Automatique',
      ac: true
    },
    features: ['Échantillon varié', 'Entretien simple & pièces d\'origine', 'Idéal trafic quotidien Ouaga'],
    available: true
  }
];

export default function App() {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sticky header state
  const [isScrolled, setIsScrolled] = useState(false);

  // Active filter state
  const [activeFilter, setActiveFilter] = useState<string>('Tous');

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    vehicleId: 'toyota-land-cruiser',
    startDate: '',
    endDate: '',
    pickupLocation: 'Ouagadougou centre',
    driverType: 'Sans chauffeur',
    message: ''
  });

  // Mobile-compatible Date dropdown states
  const [startDay, setStartDay] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');

  const [endDay, setEndDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');

  // Sync start and end select components to bookingForm dates
  useEffect(() => {
    if (startDay && startMonth && startYear) {
      setBookingForm(prev => ({ ...prev, startDate: `${startYear}-${startMonth}-${startDay}` }));
    } else {
      setBookingForm(prev => ({ ...prev, startDate: '' }));
    }
  }, [startDay, startMonth, startYear]);

  useEffect(() => {
    if (endDay && endMonth && endYear) {
      setBookingForm(prev => ({ ...prev, endDate: `${endYear}-${endMonth}-${endDay}` }));
    } else {
      setBookingForm(prev => ({ ...prev, endDate: '' }));
    }
  }, [endDay, endMonth, endYear]);

  // Submitted / Success Modal State
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Computed details
  const [durationInDays, setDurationInDays] = useState<number>(0);
  const [estimatedTotalPrice, setEstimatedTotalPrice] = useState<number>(0);

  // Calculate duration and price total when Dates or Vehicle changes
  useEffect(() => {
    if (startDay && startMonth && startYear && endDay && endMonth && endYear) {
      const start = new Date(parseInt(startYear), parseInt(startMonth) - 1, parseInt(startDay));
      const end = new Date(parseInt(endYear), parseInt(endMonth) - 1, parseInt(endDay));
      
      // Calculate difference in milliseconds
      const differenceMs = end.getTime() - start.getTime();
      
      if (differenceMs >= 0) {
        // Convert to days (include minimum 1 day if dates are same day)
        const days = Math.max(1, Math.ceil(differenceMs / (1000 * 60 * 60 * 24)));
        setDurationInDays(days);
        
        // Find selected vehicle price
        const selectedVehicle = VEHICLES_DATA.find(v => v.id === bookingForm.vehicleId);
        if (selectedVehicle) {
          let basePrice = selectedVehicle.price * days;
          // Small extra if with driver
          if (bookingForm.driverType === 'Avec chauffeur') {
            basePrice += 10000 * days; // Extra 10,000 FCFA/day for professional drivers in Ouaga
          }
          setEstimatedTotalPrice(basePrice);
        }
      } else {
        setDurationInDays(0);
        setEstimatedTotalPrice(0);
      }
    } else {
      setDurationInDays(0);
      setEstimatedTotalPrice(0);
    }
  }, [startDay, startMonth, startYear, endDay, endMonth, endYear, bookingForm.vehicleId, bookingForm.driverType]);

  // Track scroll position for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  // Close mobile menu when hash links are clicked
  useEffect(() => {
    const handleHashLinkClick = () => {
      setMobileMenuOpen(false);
    };
    
    const hashLinks = document.querySelectorAll('a[href^="#"]');
    hashLinks.forEach(link => {
      link.addEventListener('click', handleHashLinkClick);
    });
    
    return () => {
      hashLinks.forEach(link => {
        link.removeEventListener('click', handleHashLinkClick);
      });
    };
  }, []);

  // Smooth scroll helper with layout shift guard
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80); // Small 80ms delay to let mobile menu toggle collapse first, avoiding layout shift
  };

  // Action: "Demander ce véhicule"
  const handleRequestVehicle = (vehicleId: string) => {
    setBookingForm(prev => ({
      ...prev,
      vehicleId: vehicleId
    }));
    scrollToSection('reservation');
  };

  // Helper to build WhatsApp booking message URL
  const getWhatsAppBookingUrl = () => {
    const vehicleName = VEHICLES_DATA.find(v => v.id === bookingForm.vehicleId)?.name || bookingForm.vehicleId;
    const durDays = durationInDays > 0 ? durationInDays : 0;
    const estPrice = durationInDays > 0 ? formatPrice(estimatedTotalPrice) : "À définir";
    const startDateFormatted = startDay && startMonth && startYear ? `${startDay}/${startMonth}/${startYear}` : "À définir";
    const endDateFormatted = endDay && endMonth && endYear ? `${endDay}/${endMonth}/${endYear}` : "À définir";

    const msgText = `Bonjour ALAS Véhicule 👋

Nouvelle demande de location :

👤 Nom : ${bookingForm.fullName}
📞 Téléphone : +226 ${bookingForm.phone}
🚗 Véhicule souhaité : ${vehicleName}
📅 Date de départ : ${startDateFormatted}
📅 Date de retour : ${endDateFormatted}
⏱️ Durée : ${durDays} jour(s)
💰 Devis estimé : ${estPrice} FCFA
📍 Lieu de prise en charge : ${bookingForm.pickupLocation}
🧑✈️ Type : ${bookingForm.driverType}
📝 Message : ${bookingForm.message || 'Aucun message particulier'}`;

    return `https://wa.me/22670642294?text=${encodeURIComponent(msgText)}`;
  };

  // Handle Form Submission
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!bookingForm.fullName || !bookingForm.phone || !bookingForm.startDate || !bookingForm.endDate) {
      alert("Veuillez remplir les champs de saisie obligatoires (*) s'il vous plaît.");
      return;
    }

    // Trigger Success State
    setIsSubmitted(true);

    // Open WhatsApp URL automatically
    const whatsappUrl = getWhatsAppBookingUrl();
    window.open(whatsappUrl, '_blank');
  };

  // Filter vehicle data of the catalog
  const filteredVehicles = activeFilter === 'Tous' 
    ? VEHICLES_DATA 
    : VEHICLES_DATA.filter(v => v.category === activeFilter);

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans antialiased selection:bg-brand-red selection:text-white">
      
      {/* 1. STICKY HEADER / NAVIGATION */}
      <header 
        id="main-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-brand-dark/95 backdrop-blur-md py-4 border-b border-white/10 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo with structured brand detail */}
          <div 
            id="brand-logo" 
            className="flex flex-col cursor-pointer"
            onClick={() => scrollToSection('accueil')}
          >
            <span className="font-display text-2xl md:text-3xl font-bold tracking-wider text-white">
              ALAS <span className="text-brand-red">VÉHICULE</span>
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-medium font-display leading-none">
              Location & Vente — Ouagadougou
            </span>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            <a href="#accueil" onClick={(e) => { e.preventDefault(); scrollToSection('accueil'); }} className="text-sm font-medium hover:text-brand-red transition-colors cursor-pointer text-gray-300">Accueil</a>
            <a href="#vehicules" onClick={(e) => { e.preventDefault(); scrollToSection('vehicules'); }} className="text-sm font-medium hover:text-brand-red transition-colors cursor-pointer text-gray-300">Nos Véhicules</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-sm font-medium hover:text-brand-red transition-colors cursor-pointer text-gray-300">Services</a>
            <a href="#reservation" onClick={(e) => { e.preventDefault(); scrollToSection('reservation'); }} className="text-sm font-medium hover:text-brand-red transition-colors cursor-pointer text-gray-300">Réservation</a>
            <a href="#pourquoi" onClick={(e) => { e.preventDefault(); scrollToSection('pourquoi'); }} className="text-sm font-medium hover:text-brand-red transition-colors cursor-pointer text-gray-300">Pourquoi nous</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-sm font-medium hover:text-brand-red transition-colors cursor-pointer text-gray-300">Contact</a>
          </nav>

          {/* Desktop Call to Action CTA Button */}
          <div className="hidden lg:block">
            <button
              id="btn-header-cta"
              onClick={() => scrollToSection('reservation')}
              className="px-6 py-2.5 bg-brand-red hover:bg-brand-red-dark text-white font-display text-sm uppercase tracking-wider font-semibold rounded-sm transition-all duration-300 transform active:scale-95 cursor-pointer shadow-md hover:shadow-brand-red/20"
            >
              Réserver maintenant
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button 
            id="btn-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-brand-red transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile slide-out nav panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden w-full bg-brand-charcoal border-b border-white/10 absolute top-full left-0 overflow-hidden shadow-2xl"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                <a href="#accueil" onClick={(e) => { e.preventDefault(); scrollToSection('accueil'); }} className="text-left py-2 border-b border-white/5 text-gray-300 hover:text-brand-red">Accueil</a>
                <a href="#vehicules" onClick={(e) => { e.preventDefault(); scrollToSection('vehicules'); }} className="text-left py-2 border-b border-white/5 text-gray-300 hover:text-brand-red">Nos Véhicules</a>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-left py-2 border-b border-white/5 text-gray-300 hover:text-brand-red">Services</a>
                <a href="#reservation" onClick={(e) => { e.preventDefault(); scrollToSection('reservation'); }} className="text-left py-2 border-b border-white/5 text-gray-300 hover:text-brand-red">Réservation</a>
                <a href="#pourquoi" onClick={(e) => { e.preventDefault(); scrollToSection('pourquoi'); }} className="text-left py-2 border-b border-white/5 text-gray-300 hover:text-brand-red">Pourquoi nous</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-left py-2 border-b border-white/5 text-gray-300 hover:text-brand-red">Contact</a>
                <button
                  onClick={() => scrollToSection('reservation')}
                  className="w-full mt-2 py-3 bg-brand-red hover:bg-brand-red-dark text-white font-display uppercase tracking-widest font-semibold text-center rounded-sm text-sm cursor-pointer"
                >
                  Réserver maintenant
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* 2. HERO SECTION */}
      <section 
        id="accueil" 
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image of premium vehicle with overlay dark gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600')",
            backgroundPosition: '50% 40%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/45 z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12">
          
          {/* Google Review Badge */}
          <motion.div 
            id="badge-google-rating"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-brand-red/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-6 backdrop-blur-md"
          >
            <span className="flex items-center text-yellow-400 gap-0.5">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </span>
            <span className="text-xs md:text-sm text-yellow-400 font-semibold tracking-wide">
              ⭐ 5,0 / 5 — Note Google
            </span>
          </motion.div>

          {/* Luxury display Heading of Hero Section */}
          <motion.h1 
            id="hero-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-4xl sm:text-6xl md:text-8xl font-extrabold uppercase tracking-tight text-white mb-6 leading-none"
          >
            Votre Véhicule Idéal <br />
            <span className="text-brand-red text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-400">à Ouagadougou</span>
          </motion.h1>

          <motion.p 
            id="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-sans tracking-wide leading-relaxed font-light"
          >
            Location et vente de véhicules toutes marques — Fiabilité, Disponibilité, Confiance pour tous vos trajets au Burkina Faso.
          </motion.p>

          {/* Call to action action array buttons */}
          <motion.div 
            id="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection('vehicules')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-red hover:bg-brand-red-dark text-white font-display uppercase tracking-widest font-bold text-sm rounded-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl hover:shadow-brand-red/30 cursor-pointer"
            >
              <span>Voir nos véhicules</span>
              <Car size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/20 font-display uppercase tracking-widest font-bold text-sm rounded-sm transition-all duration-300 cursor-pointer"
            >
              Nous contacter
            </button>
          </motion.div>

        </div>

        {/* Decorative subtle overlay indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1 cursor-pointer" onClick={() => scrollToSection('confiance')}>
            <div className="w-1.5 h-2.5 bg-brand-red rounded-full animate-ping" />
          </div>
        </div>
      </section>


      {/* 3. BANDE DE CONFIANCE (4 cartes horizontales) */}
      <section 
        id="confiance" 
        className="py-16 bg-brand-charcoal border-y border-white/5 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Easy Reservation */}
            <div 
              id="trust-card-reservation"
              className="bg-brand-dark/50 p-6 rounded-md border border-white/5 hover:border-brand-red/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center rounded-sm mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                <Calendar size={22} />
              </div>
              <h3 className="font-display text-lg uppercase font-bold tracking-wide text-white mb-2">
                🗓️ Réservation facile
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Plus besoin de se déplacer pour vérifier la disponibilité de nos voitures. Tout se gère en ligne ou en appel direct en moins de 2h.
              </p>
            </div>

            {/* Card 2: Tarifs Transparents */}
            <div 
              id="trust-card-tarifs"
              className="bg-brand-dark/50 p-6 rounded-md border border-white/5 hover:border-brand-red/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center rounded-sm mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                <Percent size={22} />
              </div>
              <h3 className="font-display text-lg uppercase font-bold tracking-wide text-white mb-2">
                💰 Tarifs transparents
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Prix clairs affichés publiquement. Vous savez exactement combien vous payez, sans aucun frais surprise ni majoration à la restitution.
              </p>
            </div>

            {/* Card 3: Flotte Vérifiée */}
            <div 
              id="trust-card-flotte"
              className="bg-brand-dark/50 p-6 rounded-md border border-white/5 hover:border-brand-red/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center rounded-sm mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-display text-lg uppercase font-bold tracking-wide text-white mb-2">
                📋 Flotte vérifiée
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Chaque véhicule fait l'objet d'un contrôle mécanique et de nettoyage minutieux avant chaque location pour assurer votre sécurité.
              </p>
            </div>

            {/* Card 4: Quick Response */}
            <div 
              id="trust-card-response"
              className="bg-brand-dark/50 p-6 rounded-md border border-white/5 hover:border-brand-red/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center rounded-sm mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                <Clock size={22} />
              </div>
              <h3 className="font-display text-lg uppercase font-bold tracking-wide text-white mb-2">
                ✅ Réponse rapide
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Confirmation directe de votre devis ou demande en moins de 2 heures par notre équipe commerciale attentive à Ouaga.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* 4. CATALOGUE VÉHICULES (6 cartes en grille filtrable) */}
      <section id="vehicules" className="py-24 bg-brand-dark relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Section title header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red uppercase tracking-widest text-xs md:text-sm font-semibold font-display">Choisissez votre trajet</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">Notre Flotte de Véhicules</h2>
            <p className="text-gray-400 text-sm md:text-base mt-3 font-light leading-relaxed">
              Explorez nos solutions de transports adaptées : 4x4 robustes pour les pistes des provinces et SUV de prestige et d'affaires.
            </p>
          </div>

          {/* Filtering buttons row */}
          <div 
            id="filters-row" 
            className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-white/5 pb-6"
          >
            {['Tous', '4x4', 'SUV'].map((category) => (
              <button
                key={category}
                id={`btn-filter-${category.toLowerCase()}`}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 text-sm uppercase font-display tracking-wider font-semibold border rounded-none transition-all duration-300 cursor-pointer ${
                  activeFilter === category 
                    ? 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20' 
                    : 'bg-brand-charcoal hover:bg-brand-charcoal-light text-gray-400 hover:text-white border-white/10'
                }`}
              >
                {category}
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({category === 'Tous' ? VEHICLES_DATA.length : VEHICLES_DATA.filter(v => v.category === category).length})
                </span>
              </button>
            ))}
          </div>

          {/* Vehicles Grid list with AnimatePresence */}
          <motion.div 
            id="vehicles-grid" 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredVehicles.map((vehicle) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={vehicle.id}
                  id={`card-${vehicle.id}`}
                  className="bg-brand-charcoal rounded-sm overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col group justify-between hover:shadow-2xl hover:shadow-brand-red/5"
                >
                  
                  {/* Photo with zoom and category badge */}
                  <div className="relative aspect-video overflow-hidden bg-brand-dark/40">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Badge availability */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-emerald-500/10 backdrop-blur-md text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider">
                        ● Libre
                      </span>
                    </div>

                    {/* Category badge */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <span className="bg-brand-dark/80 backdrop-blur-md text-brand-red border border-brand-red/30 px-3 py-1 text-xs uppercase font-display font-medium tracking-widest">
                        {vehicle.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-2xl uppercase font-bold tracking-wide text-white group-hover:text-brand-red transition-colors mb-2">
                        {vehicle.name}
                      </h3>

                      {/* Specs Row */}
                      <div className="grid grid-cols-2 gap-y-3 gap-x-1 py-4 border-y border-white/5 my-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Users size={16} className="text-gray-500" />
                          <span className="text-xs">{vehicle.specs.seats} places</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Fuel size={16} className="text-gray-500" />
                          <span className="text-xs">{vehicle.specs.fuel}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Sliders size={16} className="text-gray-500" />
                          <span className="text-xs">{vehicle.specs.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Wind size={16} className="text-gray-500" />
                          <span className="text-xs">{vehicle.specs.ac ? "Climatisation active" : "Ventilé"}</span>
                        </div>
                      </div>

                      {/* Unique Selling highlights */}
                      <ul className="space-y-1 my-4">
                        {vehicle.features.map((feat, index) => (
                          <li key={index} className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price & CTA action button */}
                    <div className="mt-6 pt-4 border-t border-white/5">
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-xs uppercase text-gray-400 tracking-wider">Tarif par jour</span>
                        <div className="text-right">
                          <span className="text-xl md:text-2xl font-display font-black text-brand-red">
                            {formatPrice(vehicle.price)}
                          </span>
                          <span className="text-[10px] text-gray-500 block uppercase tracking-tight">Assurance comprise</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRequestVehicle(vehicle.id)}
                        className="w-full py-3 bg-brand-charcoal-light hover:bg-brand-red text-white hover:text-white border border-white/10 hover:border-brand-red font-display text-sm uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer transform active:scale-[0.98]"
                      >
                        Demander ce véhicule
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
        </div>
      </section>


      {/* 5. NOS SERVICES (3 blocs) */}
      <section id="services" className="py-24 bg-brand-charcoal border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red uppercase tracking-widest text-xs md:text-sm font-semibold font-display">Notre expertise</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">Prestations de Confiance</h2>
            <p className="text-gray-400 text-sm md:text-base mt-3 font-light leading-relaxed">
              Une gamme de services professionnels conçus pour répondre à toutes vos exigences de mobilité à Ouagadougou et à l'intérieur du pays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1: Short Term */}
            <div 
              id="service-courte-duree"
              className="bg-brand-dark p-8 rounded-sm border border-white/5 hover:border-brand-red/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-brand-red group-hover:h-full transition-all duration-500" />
              <div className="text-brand-red mb-6 flex items-center justify-between">
                <span className="font-display text-5xl font-black text-white/5 select-none leading-none">01</span>
                <Car size={32} />
              </div>
              <h3 className="font-display text-2xl uppercase font-bold tracking-wide text-white mb-4">
                Location courte durée
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
                À la journée, au week-end ou à la semaine, profitez d'une liberté totale pour vos démarches professionnelles, affaires privées, mariages ou déplacements de transit à Ouagadougou.
              </p>
              <button 
                onClick={() => scrollToSection('reservation')}
                className="text-xs uppercase font-display tracking-widest text-brand-red group-hover:text-white font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Faire une demande</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Service 2: Long term */}
            <div 
              id="service-longue-duree"
              className="bg-brand-dark p-8 rounded-sm border border-white/5 hover:border-brand-red/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-brand-red group-hover:h-full transition-all duration-500" />
              <div className="text-brand-red mb-6 flex items-center justify-between">
                <span className="font-display text-5xl font-black text-white/5 select-none leading-none">02</span>
                <Users size={32} />
              </div>
              <h3 className="font-display text-2xl uppercase font-bold tracking-wide text-white mb-4">
                Location longue durée
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
                Formules très avantageuses destinées aux entreprises, institutions internationales, coopérants et ONG. Maintenance intégrée, assistance routière complète, et remplacement rapide du véhicule sous 24h.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-xs uppercase font-display tracking-widest text-brand-red group-hover:text-white font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Demander un devis fleet</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Service 3: Car Sales */}
            <div 
              id="service-vente"
              className="bg-brand-dark p-8 rounded-sm border border-white/5 hover:border-brand-red/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-brand-red group-hover:h-full transition-all duration-500" />
              <div className="text-brand-red mb-6 flex items-center justify-between">
                <span className="font-display text-5xl font-black text-white/5 select-none leading-none">03</span>
                <TrendingUp size={32} />
              </div>
              <h3 className="font-display text-2xl uppercase font-bold tracking-wide text-white mb-4">
                Vente de véhicules
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
                Achat serein de véhicules neufs ou d'occasion soigneusement sélectionnés, testés sur l'ensemble de nos critères techniques et dédouanés. Garantie légale et accompagnement aux démarches administratives.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-xs uppercase font-display tracking-widest text-brand-red group-hover:text-white font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Consulter notre catalogue ventes</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* 6. POURQUOI CHOISIR ALAS ? (2 colonnes) */}
      <section id="pourquoi" className="py-24 bg-brand-dark relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red uppercase tracking-widest text-xs md:text-sm font-semibold font-display">La différence ALAS</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">Donner Confiance & Transparence</h2>
            <p className="text-gray-400 text-sm md:text-base mt-3 font-light leading-relaxed">
              Nous portons haut les standards de l'industrie automobile burkinabè pour vous éviter l'incertitude.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Left Column: Traditional Market issues */}
            <div 
              id="market-problems-box" 
              className="bg-red-500/5 rounded-sm p-8 md:p-10 border border-red-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500/10 text-brand-red flex items-center justify-center rounded-sm">
                  <X className="stroke-[3]" size={20} />
                </div>
                <h3 className="font-display text-2xl uppercase font-bold tracking-wide text-white">
                  Les pannes récurrentes du marché
                </h3>
              </div>

              <p className="text-sm text-gray-400 mb-8 font-light">
                Le marché de location de voiture à Ouagadougou réserve souvent de fâcheuses surprises :
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3.5">
                  <X size={18} className="text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm block font-semibold">Incertitude logistique permanente</strong>
                    <span className="text-xs text-gray-400">Impossible de savoir si un véhicule est disponible sans se déplacer directement à l'agence.</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3.5">
                  <X size={18} className="text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm block font-semibold">Tarification obscure dite &quot;à la tête&quot;</strong>
                    <span className="text-xs text-gray-400">Prix variables selon le client, frais occultes rajoutés arbitrairement à la restitution.</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3.5">
                  <X size={18} className="text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm block font-semibold">Engagements flous et insécurisés</strong>
                    <span className="text-xs text-gray-400">Contrats flous, litiges systématiques sur l'état du véhicule au retour faute de fiche d'état.</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3.5">
                  <X size={18} className="text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm block font-semibold">Sécurité routière négligée</strong>
                    <span className="text-xs text-gray-400">Véhicules mal entretenus, pannes de climatisation ou mécaniques fréquentes.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <X size={18} className="text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm block font-semibold">Aucun support client sérieux</strong>
                    <span className="text-xs text-gray-400">Aucun recours, interlocuteurs indisponibles ou agences fantômes sans aucun avis clients certifiés.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column: ALAS Solutions */}
            <div 
              id="alas-solutions-box" 
              className="bg-emerald-500/5 rounded-sm p-8 md:p-10 border border-emerald-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 flex items-center justify-center rounded-sm">
                    <Check className="stroke-[3]" size={20} />
                  </div>
                  <h3 className="font-display text-2xl uppercase font-bold tracking-wide text-white">
                    La Garantie Premium ALAS
                  </h3>
                </div>

                <p className="text-sm text-gray-400 mb-8 font-light">
                  ALAS Véhicule est né pour professionnaliser l'automobile burkinabè et proposer un service d'excellence :
                </p>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3.5">
                    <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block font-semibold">Flotte numérisée à jour</strong>
                      <span className="text-xs text-gray-400">Consultez notre catalogue détaillé en ligne avec disponibilité garantie en temps réel.</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3.5">
                    <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block font-semibold">Transparence totale et chiffrée</strong>
                      <span className="text-xs text-gray-400">Tarifs affichés publiquement, fiche d'état du véhicule détaillée contradictoire signée au départ.</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3.5">
                    <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block font-semibold">Contrats rigoureux et clairs</strong>
                      <span className="text-xs text-gray-400">Règles claires, pas d'ambiguïté. Un cadre fiable pour les professionnels et les particuliers.</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3.5">
                    <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block font-semibold">Flotte rigoureusement entretenue</strong>
                      <span className="text-xs text-gray-400">Véhicules passés au banc d'essai et révisés avant chaque départ. Climatisation d'origine garantie.</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block font-semibold">Assistance continue & WhatsApp</strong>
                      <span className="text-xs text-gray-400">Service client réactif, réponse en moins de 2h. Avis Google parfaits (note 5/5) de nos clients.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-500/10">
                <button
                  onClick={() => scrollToSection('reservation')}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-brand-dark font-display uppercase tracking-widest font-extrabold text-sm rounded-none w-full transition-all duration-300 cursor-pointer text-center"
                >
                  Découvrir l'expérience maintenant
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 7. FORMULAIRE DE RÉSERVATION (Sans paiement) */}
      <section id="reservation" className="py-24 bg-brand-charcoal border-y border-white/5 relative z-20">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-16">
            <span className="text-brand-red uppercase tracking-widest text-xs md:text-sm font-semibold font-display">Devis Express Instantané</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">Formulaire de Demande de Réservation</h2>
            <p className="text-gray-400 text-sm md:text-base mt-3 font-light max-w-xl mx-auto leading-relaxed">
              Estimez le montant de votre location en renseignant vos dates de voyage. Notre équipe prend contact dans les 2 heures pour finaliser !
            </p>
          </div>

          {/* Core Reservation Form Box */}
          <div id="booking-form-box" className="bg-brand-dark p-6 md:p-10 rounded-sm border border-white/5 relative overflow-hidden">
            
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full name input */}
                <div id="form-group-fullname">
                  <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    placeholder="Ex: Abdoul Kader Kaboré"
                    value={bookingForm.fullName}
                    onChange={(e) => setBookingForm({...bookingForm, fullName: e.target.value})}
                    className="w-full bg-brand-charcoal border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>

                {/* Burkina Phone input */}
                <div id="form-group-phone">
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Téléphone ( Burkina Faso ) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-xs text-gray-400 font-bold border-r border-white/10 pr-2">
                      +226
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="Ex: 50 12 34 56"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      className="w-full bg-brand-charcoal border border-white/10 rounded-none pl-18 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>

                {/* Email input optional */}
                <div id="form-group-email">
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Email ( optionnel )
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="votre-email@adresse.com"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    className="w-full bg-brand-charcoal border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>

                {/* Vehicle Choice selection dropdown */}
                <div id="form-group-vehicle">
                  <label htmlFor="vehicleId" className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Sélectionner le Véhicule *
                  </label>
                  <select
                    id="vehicleId"
                    value={bookingForm.vehicleId}
                    onChange={(e) => setBookingForm({...bookingForm, vehicleId: e.target.value})}
                    className="w-full bg-brand-charcoal border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                  >
                    {VEHICLES_DATA.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.category} — {formatPrice(v.price)}/jr)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div id="form-group-startdate">
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Date de début de location *
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="debut-jour"
                      required
                      value={startDay}
                      onChange={(e) => setStartDay(e.target.value)}
                      className="flex-1 bg-brand-charcoal border border-brand-red/50 focus:border-brand-red text-white rounded-md px-3 py-3 text-sm focus:outline-none transition-colors"
                    >
                      <option value="">Jour</option>
                      {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>

                    <select
                      id="debut-mois"
                      required
                      value={startMonth}
                      onChange={(e) => setStartMonth(e.target.value)}
                      className="flex-1 bg-brand-charcoal border border-brand-red/50 focus:border-brand-red text-white rounded-md px-3 py-3 text-sm focus:outline-none transition-colors"
                    >
                      <option value="">Mois</option>
                      <option value="01">Janvier</option>
                      <option value="02">Février</option>
                      <option value="03">Mars</option>
                      <option value="04">Avril</option>
                      <option value="05">Mai</option>
                      <option value="06">Juin</option>
                      <option value="07">Juillet</option>
                      <option value="08">Août</option>
                      <option value="09">Septembre</option>
                      <option value="10">Octobre</option>
                      <option value="11">Novembre</option>
                      <option value="12">Décembre</option>
                    </select>

                    <select
                      id="debut-annee"
                      required
                      value={startYear}
                      onChange={(e) => setStartYear(e.target.value)}
                      className="flex-1 bg-brand-charcoal border border-brand-red/50 focus:border-brand-red text-white rounded-md px-3 py-3 text-sm focus:outline-none transition-colors"
                    >
                      <option value="">Année</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  </div>
                </div>

                {/* End Date */}
                <div id="form-group-enddate">
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Date de fin de location *
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="fin-jour"
                      required
                      value={endDay}
                      onChange={(e) => setEndDay(e.target.value)}
                      className="flex-1 bg-brand-charcoal border border-brand-red/50 focus:border-brand-red text-white rounded-md px-3 py-3 text-sm focus:outline-none transition-colors"
                    >
                      <option value="">Jour</option>
                      {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>

                    <select
                      id="fin-mois"
                      required
                      value={endMonth}
                      onChange={(e) => setEndMonth(e.target.value)}
                      className="flex-1 bg-brand-charcoal border border-brand-red/50 focus:border-brand-red text-white rounded-md px-3 py-3 text-sm focus:outline-none transition-colors"
                    >
                      <option value="">Mois</option>
                      <option value="01">Janvier</option>
                      <option value="02">Février</option>
                      <option value="03">Mars</option>
                      <option value="04">Avril</option>
                      <option value="05">Mai</option>
                      <option value="06">Juin</option>
                      <option value="07">Juillet</option>
                      <option value="08">Août</option>
                      <option value="09">Septembre</option>
                      <option value="10">Octobre</option>
                      <option value="11">Novembre</option>
                      <option value="12">Décembre</option>
                    </select>

                    <select
                      id="fin-annee"
                      required
                      value={endYear}
                      onChange={(e) => setEndYear(e.target.value)}
                      className="flex-1 bg-brand-charcoal border border-brand-red/50 focus:border-brand-red text-white rounded-md px-3 py-3 text-sm focus:outline-none transition-colors"
                    >
                      <option value="">Année</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  </div>
                </div>

                {/* Pickup Location selection dropdown */}
                <div id="form-group-pickup">
                  <label htmlFor="pickupLocation" className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Lieu de prise en charge *
                  </label>
                  <select
                    id="pickupLocation"
                    value={bookingForm.pickupLocation}
                    onChange={(e) => setBookingForm({...bookingForm, pickupLocation: e.target.value})}
                    className="w-full bg-brand-charcoal border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                  >
                    <option value="Ouagadougou centre">Ouagadougou centre ville</option>
                    <option value="Aéroport">Aéroport de Ouagadougou ( OUA )</option>
                    <option value="Autre">Autre lieu à préciser</option>
                  </select>
                </div>

                {/* Driver Type Option */}
                <div id="form-group-driver">
                  <label htmlFor="driverType" className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Option chauffeur *
                  </label>
                  <select
                    id="driverType"
                    value={bookingForm.driverType}
                    onChange={(e) => setBookingForm({...bookingForm, driverType: e.target.value})}
                    className="w-full bg-brand-charcoal border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red transition-colors"
                  >
                    <option value="Sans chauffeur">Sans Chauffeur ( Autonome )</option>
                    <option value="Avec chauffeur">Avec Chauffeur Pro burkinabè (+10 000 FCFA/jr)</option>
                  </select>
                </div>

              </div>

              {/* Message / Remarks text */}
              <div id="form-group-remarks">
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                  Message / Remarques de livraison
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Précisez votre itinéraire prévisionnel ou vos besoins spécifiques (ex: siège bébé, etc.)..."
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                  className="w-full bg-brand-charcoal border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red transition-colors resize-none"
                />
              </div>

              {/* ESTIMATION BOX ENGINE CONTAINER */}
              <div id="estimation-box" className="p-6 bg-brand-charcoal-light/60 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 text-brand-red flex items-center justify-center rounded-sm">
                    <Car size={24} />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-gray-400 block tracking-wider">Estimation détaillée de votre loyer</span>
                    {durationInDays > 0 ? (
                      <span className="text-sm font-semibold text-white">
                        Durée calculée : <span className="text-brand-red font-bold">{durationInDays} {durationInDays > 1 ? 'jours' : 'jour'}</span>
                      </span>
                    ) : (
                      <span className="text-xs text-brand-red flex items-center gap-1.5 mt-0.5">
                        <AlertCircle size={12} /> Renseignez vos dates de début et fin
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right flex flex-col items-center md:items-end w-full md:w-auto">
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider">TOTAL ESTIMÉ</span>
                  <span className="text-2xl md:text-3xl font-display font-black text-white leading-none">
                    {durationInDays > 0 ? formatPrice(estimatedTotalPrice) : "0 FCFA"}
                  </span>
                  {durationInDays > 0 && (
                    <span className="text-[10px] text-gray-400 mt-1 block tracking-tight font-light">
                      ({formatPrice(VEHICLES_DATA.find(v => v.id === bookingForm.vehicleId)?.price || 0)}/jr + {bookingForm.driverType === 'Avec chauffeur' ? '10 000 FCFA chauffeur' : '0 Chauffeur'})
                    </span>
                  )}
                </div>
              </div>

              {/* Warning/Notes */}
              <div className="flex items-center gap-2 p-3 bg-brand-red/5 border border-brand-red/20 text-xs text-gray-300 leading-relaxed font-light">
                <AlertCircle size={16} className="text-brand-red shrink-0" />
                <span>
                  <strong>⚠️ Aucun paiement en ligne requis.</strong> La validation définitive s'effectue directement par téléphone ou sur WhatsApp après réception de votre devis gratuit.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-submit-booking font-display"
                className="w-full py-4 bg-brand-red hover:bg-brand-red-dark text-white font-display text-sm uppercase tracking-widest font-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:shadow-brand-red/10 group active:scale-[0.99]"
              >
                <span>Envoyer ma demande sans frais</span>
                <Send size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

            </form>

          </div>

        </div>
      </section>


      {/* 8. TÉMOIGNAGES (3 avis réels) */}
      <section id="temoignages" className="py-24 bg-brand-dark relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red uppercase tracking-widest text-xs md:text-sm font-semibold font-display">Témoignages</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">Avis de nos clients à Ouagadougou</h2>
            <p className="text-gray-400 text-sm md:text-base mt-3 font-light leading-relaxed">
              Découvrez les retours authentiques de clients locaux, d'expatriés et de responsables d'ONG qui nous font confiance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review 1 */}
            <div 
              id="testimonial-card-1"
              className="bg-brand-charcoal p-8 border border-white/5 relative flex flex-col justify-between"
            >
              <div className="text-yellow-400 flex items-center gap-0.5 mb-4">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>

              <p className="text-sm text-gray-300 mb-6 italic leading-relaxed font-light">
                &quot;J'ai loué un Land Cruiser pour une mission de terrain de 10 jours en province. Le véhicule était dans un état impeccable, la climatisation puissante indispensable sous la chaleur de Ouaga. Prix clair, aucune mauvaise surprise à la remise. Je recommande ALAS.&quot;
              </p>

              <div>
                <strong className="text-white font-semibold text-sm block">Kofi A.</strong>
                <span className="text-xs text-brand-red uppercase tracking-wider font-display font-medium">Cadre d'ONG africaine</span>
              </div>
            </div>

            {/* Review 2 */}
            <div 
              id="testimonial-card-2"
              className="bg-brand-charcoal p-8 border border-white/5 relative flex flex-col justify-between"
            >
              <div className="text-yellow-400 flex items-center gap-0.5 mb-4">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>

              <p className="text-sm text-gray-300 mb-6 italic leading-relaxed font-light">
                &quot;Enfin une agence professionnelle à Ouaga où on peut voir les voitures en ligne réelles et disponibles avant de se déplacer. J'ai configuré la réservation pour ma petite citadine sur le site, tout a été confirmé en moins d'une heure. Rapide, correct.&quot;
              </p>

              <div>
                <strong className="text-white font-semibold text-sm block">Marie-Claire O.</strong>
                <span className="text-xs text-brand-red uppercase tracking-wider font-display font-medium">Consultante internationale</span>
              </div>
            </div>

            {/* Review 3 */}
            <div 
              id="testimonial-card-3"
              className="bg-brand-charcoal p-8 border border-white/5 relative flex flex-col justify-between"
            >
              <div className="text-yellow-400 flex items-center gap-0.5 mb-4">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>

              <p className="text-sm text-gray-300 mb-6 italic leading-relaxed font-light">
                &quot;Service impeccable pour notre ONG. Contrats clairs, états contradictoires hyper minutieux, et voiture Toyota livrée pile à l'heure à notre siège. Nous travaillons exclusivement avec ALAS depuis 6 mois pour tous nos besoins logistiques au Burkina.&quot;
              </p>

              <div>
                <strong className="text-white font-semibold text-sm block">Ibrahim S.</strong>
                <span className="text-xs text-brand-red uppercase tracking-wider font-display font-medium">Coordinateur Logistique</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 9. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-brand-charcoal border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Contact Panel text details */}
            <div id="contact-info-panel" className="space-y-8">
              <div>
                <span className="text-brand-red uppercase tracking-widest text-xs md:text-sm font-semibold font-display">Disponible 6j/7</span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">Prenons contact aujourd'hui</h2>
                <p className="text-gray-400 text-sm md:text-base mt-3 font-light leading-relaxed">
                  Notre service d'accompagnement commercial est à votre écoute pour organiser un déplacement exceptionnel ou répondre à vos requêtes d'achat.
                </p>
              </div>

              {/* Contact detail cards with specific requested placeholders */}
              <div className="space-y-4">
                
                 {/* Phone detail card */}
                 <div className="flex items-center gap-4 bg-brand-dark p-4 border border-white/5">
                   <div className="w-11 h-11 text-brand-red bg-brand-red/10 flex items-center justify-center shrink-0 rounded-sm">
                     <Phone size={18} />
                   </div>
                   <div>
                     <span className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider">Téléphone d'urgence</span>
                     <a href="tel:+22670642294" className="text-white hover:text-brand-red transition-colors block text-sm font-bold">
                       +226 70 64 22 94
                     </a>
                   </div>
                 </div>
 
                 {/* WhatsApp call button */}
                 <div className="flex items-center gap-4 bg-brand-dark p-4 border border-white/5">
                   <div className="w-11 h-11 text-emerald-400 bg-emerald-500/10 flex items-center justify-center shrink-0 rounded-sm animate-pulse">
                     <MessageCircle size={18} />
                   </div>
                   <div>
                     <span className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider">Chat WhatsApp Direct</span>
                     <a 
                       href="https://wa.me/22670642294" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-emerald-400 hover:underline block text-sm font-bold flex items-center gap-1.5"
                     >
                       Échanger en un clic avec un conseiller (+226 70 64 22 94)
                     </a>
                   </div>
                 </div>

                {/* Email detail card */}
                <div className="flex items-center gap-4 bg-brand-dark p-4 border border-white/5">
                  <div className="w-11 h-11 text-brand-red bg-brand-red/10 flex items-center justify-center shrink-0 rounded-sm">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider">Adresse mail générale</span>
                    <a href="mailto:contact@alas-vehicule.com" className="text-white hover:text-brand-red transition-colors block text-sm font-bold">
                      contact@alas-vehicule.com [EMAIL]
                    </a>
                  </div>
                </div>

                {/* Address detail card */}
                <div className="flex items-center gap-4 bg-brand-dark p-4 border border-white/5">
                  <div className="w-11 h-11 text-brand-red bg-brand-red/10 flex items-center justify-center shrink-0 rounded-sm">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider">Notre agence centrale</span>
                    <span className="text-white block text-sm font-bold leading-tight">
                      Avenue de la Nation, Secteur 15, Ouagadougou, Burkina Faso [ADRESSE]
                    </span>
                  </div>
                </div>

                {/* Opening Hours card */}
                <div className="flex items-center gap-4 bg-brand-dark p-4 border border-white/5">
                  <div className="w-11 h-11 text-brand-red bg-brand-red/10 flex items-center justify-center shrink-0 rounded-sm">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider">Horaires de service</span>
                    <span className="text-white block text-sm font-bold">
                      Lundi – Samedi : 08h00 – 18h00 / Dimanche : Sur demande
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Remplacement carte Maps */}
            <div style={{
              background: '#1C1C1C',
              border: '2px solid #E63329',
              borderRadius: '12px',
              padding: '40px 20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '16px' }}>📍</div>
              <h3 style={{ color: '#FFFFFF', fontSize: '22px', marginBottom: '8px' }}>
                ALAS Véhicule — Ouagadougou
              </h3>
              <p style={{ color: '#AAAAAA', marginBottom: '24px' }}>
                Ouagadougou, Burkina Faso<br />
                Lun – Sam : 08h00 – 18h00
              </p>
              <a 
                href="https://www.google.com/maps/search/ALAS+Vehicule+Ouagadougou+Burkina+Faso"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#E63329',
                  color: '#FFFFFF',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                📍 Voir sur Google Maps
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* 10. FOOTER SECTION */}
      <footer className="bg-brand-dark border-t border-white/10 py-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-light">
            
            {/* Left Box */}
            <div id="footer-branding" className="space-y-4">
              <div className="flex flex-col">
                <span className="font-display text-2xl md:text-3xl font-bold tracking-wider text-white leading-none">
                  ALAS <span className="text-brand-red">VÉHICULE</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium font-display mt-1">
                  Ouagadougou, Burkina Faso
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                ALAS Véhicule est le partenaire idéal de vos déplacements au Burkina Faso. Location courte ou longue durée pour professionnels, ONG et vacanciers. Garantie de fiabilité et service client disponible.
              </p>
            </div>

            {/* Middle Quick links */}
            <div id="footer-links" className="space-y-4">
              <h4 className="font-display text-lg uppercase font-bold tracking-wide text-white">Liens rapides</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <button onClick={() => scrollToSection('accueil')} className="hover:text-brand-red transition-colors text-left cursor-pointer">Accueil principal</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('vehicules')} className="hover:text-brand-red transition-colors text-left cursor-pointer">Nos Véhicules en stock</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="hover:text-brand-red transition-colors text-left cursor-pointer">Nos Solutions d'Acquisitions</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('reservation')} className="hover:text-brand-red transition-colors text-left cursor-pointer">Faire un devis instantané</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('pourquoi')} className="hover:text-brand-red transition-colors text-left cursor-pointer">Pourquoi choisir ALAS ?</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-brand-red transition-colors text-left cursor-pointer">Nous trouver & Horaires</button>
                </li>
              </ul>
            </div>

            {/* Right Social box & contact placeholders again */}
            <div id="footer-social" className="space-y-4">
              <h4 className="font-display text-lg uppercase font-bold tracking-wide text-white">Suivez-nous</h4>
              <p className="text-xs text-gray-400">
                Rejoignez-nous sur nos réseaux sociaux pour découvrir nos nouveaux arrivages et promotions régulières.
              </p>
              
              <div className="flex items-center space-x-3 mt-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 border border-white/10 hover:border-brand-red rounded-none flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-red transition-all cursor-pointer"
                  aria-label="Facebook ALAS"
                >
                  F
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 border border-white/10 hover:border-brand-red rounded-none flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-red transition-all cursor-pointer"
                  aria-label="Instagram ALAS"
                >
                  I
                </a>
                <a 
                  href="https://wa.me/22670642294" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 border border-white/10 hover:border-brand-red rounded-none flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-500 transition-all cursor-pointer font-bold"
                  aria-label="WhatsApp ALAS"
                >
                  W
                </a>
              </div>

              <div className="pt-4 border-t border-white/5 text-[10px] text-gray-500">
                <span>Note Google certifiée : ⭐ 5,0/5 sur plus de 100 avis clients à Ouagadougou.</span>
              </div>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4 font-light">
            <span>
              &copy; 2025 ALAS Véhicule — Ouagadougou, Burkina Faso. Tous droits réservés.
            </span>
            <div className="flex space-x-4">
              <span className="hover:text-white cursor-pointer transition-colors">Mentions légales</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">Politique de confidentialité</span>
            </div>
          </div>

        </div>
      </footer>


      {/* 11. PERSISTENT FLOATING WHATSAPP BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <a 
          href="https://wa.me/22670642294" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 cursor-pointer"
          id="whatsapp-floating-btn"
        >
          {/* Radar ripple rings */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping -z-10" />
          
          <MessageCircle size={24} className="fill-white text-[#25D366]" />
          
          {/* Expanding Tooltip */}
          <span className="hidden sm:inline-block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-sm font-semibold tracking-wide whitespace-nowrap">
            Réservation WhatsApp Rapide
          </span>
        </a>
      </div>


      {/* SUCCESS POPUP BOOKING MODAL */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            id="success-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/90 backdrop-blur-md"
          >
            <motion.div
              id="success-modal-content"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-brand-charcoal border border-emerald-500/20 max-w-lg w-full p-8 md:p-10 text-center rounded-sm shadow-2xl relative"
            >
              {/* Giant checkmark */}
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="stroke-[3]" />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mb-2">
                Demande transmise avec succès !
              </h3>
              
              <div className="text-sm text-gray-300 mb-6 space-y-4 font-light">
                <p>
                  Merci <span className="text-white font-semibold">{bookingForm.fullName}</span>, votre demande d'évaluation pour le véhicule <span className="text-white font-semibold">
                    {VEHICLES_DATA.find(v => v.id === bookingForm.vehicleId)?.name}
                  </span> a bien été reçue par notre agence.
                </p>
                
                <div className="bg-brand-dark p-4 rounded-none space-y-2 text-xs border border-white/5">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date de départ :</span>
                    <span className="text-white">{startDay}/{startMonth}/{startYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date de retour :</span>
                    <span className="text-white">{endDay}/{endMonth}/{endYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Durée réelle :</span>
                    <span className="text-emerald-400 font-bold">{durationInDays} jours avant examen</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2 mt-1">
                    <span className="text-gray-400 font-semibold">Devis indicatif :</span>
                    <span className="text-brand-red font-bold text-sm">{formatPrice(estimatedTotalPrice)}</span>
                  </div>
                </div>

                <p className="text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                  ✅ Notre équipe commerciale vous contacte dans les 2 heures par téléphone ({bookingForm.phone}) ou via WhatsApp.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-display text-sm uppercase tracking-widest font-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl rounded-sm decoration-none"
                >
                  <span>Continuer vers WhatsApp 💬</span>
                </a>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    // Reset dropdown date states
                    setStartDay('');
                    setStartMonth('');
                    setStartYear('');
                    setEndDay('');
                    setEndMonth('');
                    setEndYear('');
                    // Reset form details safely
                    setBookingForm({
                      fullName: '',
                      phone: '',
                      email: '',
                      vehicleId: 'toyota-land-cruiser',
                      startDate: '',
                      endDate: '',
                      pickupLocation: 'Ouagadougou centre',
                      driverType: 'Sans chauffeur',
                      message: ''
                    });
                  }}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-display text-sm uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer rounded-sm text-center"
                >
                  Fermer & Réinitialiser
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
