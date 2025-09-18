import React, { useState, useEffect, useRef  } from "react";
import "./index.css";
import {
  Search,
  MessageCircle,
  Bot,
  Menu,
  X,
  ShoppingCart,
  User,
  Bell,
  Flower2,
  Heart,
  Pause,
  ThumbsUp,
  BarChart3,
  Play,
  Star,
  Target,
  Trophy,
  BookOpen,
  CreditCard,
  Check,
  ChevronDown,
  Volume2,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Shield,
  Truck,
  Award,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Clock,
  Calendar,
  Gift,
  Zap,
  AlertTriangle,
  Minus,
  Droplet,
  Copy,
  DollarSign,
  Plus,
  Globe,
  MessageSquare,
  CheckCircle
} from "lucide-react";
import { Sparkles, Apple, Microscope, FlaskConical, TrendingUp, Activity, Moon, AlertCircle, Users } from "lucide-react";

import { motion, AnimatePresence , useAnimation  } from 'framer-motion';


const translations = {
  fr: {
    // Header
    headerTitle: 'Zitalgic®',
    headerSub: 'Confort articulaire, musculaire et nerveux',
    orderNow: 'Commander Maintenant',

    // Hero
    heroTitle: 'Zitalgic®',
    heroSub: 'Dites stop à la douleur.. Naturellement',
    heroDesc: 'Soulagez vos douleurs articulaires, musculaires et nerveuses rapidement avec notre formule 100 % naturelle.',
    choosePack: 'Choisir votre offre',
    ctaButton: 'Commander Maintenant',

    // Sections (shortened for brevity – extend as needed)
    problemTitle: 'Vous en avez assez des douleurs qui vous gâchent la vie ?',
    solutionTitle: 'Zitalgic est votre allié naturel pour un apaisement efficace',
    pricingTitle: 'Profitez de notre Offre Exclusive de Zitalgic®',
    testimonialsTitle: 'Ils nous ont fait confiance',
    faqTitle: 'Questions fréquentes',

    // Footer
    footerRights: '© 2024 BioEkleel. Tous droits réservés.'
  },
  ar: {
    // Header
    headerTitle: 'Zitalgic®',
    headerSub: 'راحة المفاصل والعضلات والأعصاب',
    orderNow: 'اطلب الآن',

    // Hero
    heroTitle: '®Zitalgic',
    heroSub: 'قُل واعًا لآلام المفاصل والعضلات بشكل طبيعي',
    heroDesc: 'تخلص من آلام المفاصل والعضلات والأعصاب بسرعة مع تركيبتنا 100٪ طبيعية.',
    choosePack: 'اغتنم هذه الفرصة',
    ctaButton: 'اطلب الآن',

    // Sections
    problemTitle: 'هل سئمت من الألم الذي يفسد حياتك؟',
    solutionTitle: 'زيتالجيك هو حليفك الطبيعي للراحة الفعالة',
    pricingTitle: 'استفد من عرض زيتالجيك® الحصري',
    testimonialsTitle: 'وثقوا بنا وشاركوا تجربتهم',
    faqTitle: 'الأسئلة الشائعة',

    // Footer
    footerRights: '© 2024 BioEkleel. جميع الحقوق محفوظة.'
  }
};

const LanguageSwitcher = ({ lang, setLang }) => (
  <div className="modern-lang-switch">
    <button
      className={`lang-btn ${lang === "fr" ? "active" : ""}`}
      onClick={() => setLang("fr")}
    >
      FR
    </button>
    <span className="lang-sep" />
    <button
      className={`lang-btn ${lang === "ar" ? "active" : ""}`}
      onClick={() => setLang("ar")}
    >
      عربية
    </button>
  </div>
);

const App = ({ onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState('1-flacon');
 const [formData, setFormData] = useState({
  nom: '',
  telephone: '',
  adresse: '',
  ville: '',
});
const [formErrors, setFormErrors] = useState({});
  const [isVisible, setIsVisible] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [counters, setCounters] = useState({
    clients: 0,
    satisfaction: 0,
    recommendation: 0,
    rating: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(null);
  const [audioElements, setAudioElements] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [imageTransition, setImageTransition] = useState(false);
  const formRef = useRef(null);
  const thumbnailsRef = useRef(null);

  const productImages = [
    "/images/Miniature Zitalgic FR-01.webp",
    "/images/Miniature Zitalgic FR-02.webp",
    "/images/Miniature Zitalgic FR-03.webp",
    "/images/Miniature Zitalgic FR-04.webp",
    "/images/Miniature Zitalgic FR-05.webp",
    "/images/Miniature Zitalgic FR-06.webp",
    "/images/Miniature Zitalgic FR-07.webp",
    "/images/Miniature Zitalgic FR-08.webp",
    "/images/Miniature Zitalgic FR-09.webp",
    "/images/Miniature Zitalgic FR-10.webp",
    "/images/Miniature Zitalgic FR-11.webp",
    "/images/Miniature Zitalgic FR-12.webp",
    "/images/Miniature Zitalgic FR-13.webp",
    "/images/Miniature Zitalgic FR-14.webp",
    "/images/Miniature Zitalgic FR-15.webp"
  ];

  // Arabic image files
const productImagesAR = [
  "/images/Miniature Zitalgic AR-01.webp",
  "/images/Miniature Zitalgic AR-02.webp",
  "/images/Miniature Zitalgic AR-03.webp",
  "/images/Miniature Zitalgic AR-04.webp",
  "/images/Miniature Zitalgic AR-05.webp",
  "/images/Miniature Zitalgic AR-06.webp",
  "/images/Miniature Zitalgic AR-07.webp",
  "/images/Miniature Zitalgic AR-08.webp",
  "/images/Miniature Zitalgic AR-09.webp",
  "/images/Miniature Zitalgic AR-10.webp",
  "/images/Miniature Zitalgic AR-11.webp",
  "/images/Miniature Zitalgic AR-12.webp",
  "/images/Miniature Zitalgic AR-13.webp",
  "/images/Miniature Zitalgic AR-14.webp",
  "/images/Miniature Zitalgic AR-15.webp"
];

// Update handleImageChange for smoother transitions
const handleImageChange = (newIndex) => {
  setImageTransition(true);
  setTimeout(() => {
    setSelectedImage(newIndex);
    setImageTransition(false);
  }, 100);
};

// Add these packages for the pricing section
const [selectedPackage, setSelectedPackage] = useState('1-flacon');

const packages = [
  {
    id: '1-flacon',
    name: '1 Flacon',
    price: 219,
    oldPrice: 249,
    save: 30,
    label: null
  },
  {
    id: '3-flacons',
    name: '3 Flacons',
    price: 599,
    oldPrice: 747,
    save: 148,
    label: 'Meilleur Vente'
  },
  {
    id: '5-flacons',
    name: '5 Flacons',
    price: 899,
    oldPrice: 1245,
    save: 346,
    label: null
  }
];
  

  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      const scrollAmount = 100;
      thumbnailsRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Add useEffect for automatic image rotation
useEffect(() => {
  const interval = setInterval(() => {
    handleImageChange((selectedImage + 1) % productImages.length);
  }, 5000);
  
  return () => clearInterval(interval);
}, [selectedImage, productImages.length]);

  useEffect(() => {
    if (isVisible.testimonials && !hasAnimated) {
      const targetValues = {
        clients: 3600,
        satisfaction: 96,
        recommendation: 98,
        rating: 4.8,
      };

      const interval = setInterval(() => {
        setCounters((prev) => {
          const newCounters = {
            clients: prev.clients >= targetValues.clients ? targetValues.clients : prev.clients + 120,
            satisfaction: prev.satisfaction >= targetValues.satisfaction ? targetValues.satisfaction : Math.floor(prev.satisfaction + 3),
            recommendation: prev.recommendation >= targetValues.recommendation ? targetValues.recommendation : Math.floor(prev.recommendation + 3),
            rating: prev.rating >= targetValues.rating ? targetValues.rating : prev.rating + 0.15,
          };

          // Check if all targets are reached
          if (newCounters.clients >= targetValues.clients &&
              newCounters.satisfaction >= targetValues.satisfaction &&
              newCounters.recommendation >= targetValues.recommendation &&
              newCounters.rating >= targetValues.rating) {
            clearInterval(interval);
            setHasAnimated(true);
            return targetValues; // Ensure exact final values
          }

          return newCounters;
        });
      }, 15);

      return () => clearInterval(interval);
    }
  }, [isVisible.testimonials, hasAnimated]);

  const packs = {
  '1-flacon': { 
    price: 220, 
    original: 250, 
    savings: 30, 
    quantity: '1 Flacon',
    quantity_ar: '1 عبوة',
    treatment: 'Traitement 20 jours',
    treatment_ar: 'علاج 20 يوم'
  },
  '3-flacons': { 
    price: 600, 
    original: 750, 
    savings: 150, 
    quantity: '3 Flacons',
    quantity_ar: '3 عبوات',
    treatment: 'Traitement 2 mois',
    treatment_ar: 'علاج شهرين'
  },
  '5-flacons': { 
    price: 900, 
    original: 1250, 
    savings: 350, 
    quantity: '5 Flacons',
    quantity_ar: '5 عبوات',
    treatment: 'Traitement 3 mois 1/2',
    treatment_ar: 'علاج 3 أشهر ونصف'
  },
};

  const audioTestimonials = [
  {
    name: 'Loubna, 42 ans',
    name_ar: 'لبنى، 42 سنة',
    location: 'Rabat',
    location_ar: 'الرباط',
    audioSrc: '/audios/Loubna-42-Rabat.wav',
  },
  {
    name: 'Mariam, 35 ans',
    name_ar: 'مريم، 35 سنة',
    location: 'Oujda',
    location_ar: 'وجدة',
    audioSrc: '/audios/Mariam-35ans-Oujda.wav',
  },
  {
    name: 'Mohamed, 33 ans',
    name_ar: 'محمد، 33 سنة',
    location: 'Casablanca',
    location_ar: 'الدار البيضاء',
    audioSrc: '/audios/Mohamed 33ans-Casablanca.wav',
  },
  {
    name: 'Rajae, 35 ans',
    name_ar: 'رجاء، 35 سنة',
    location: 'Temara',
    location_ar: 'تمارة',
    audioSrc: '/audios/Rajae 35 ans Temara.wav',
  },
  {
    name: 'Tawfiq, 47 ans',
    name_ar: 'توفيق، 47 سنة',
    location: 'Casablanca',
    location_ar: 'الدار البيضاء',
    audioSrc: '/audios/Tawfiq-47ans-Casablanca.wav',
  },
  {
    name: 'Yassir, 50 ans',
    name_ar: 'ياسر، 50 سنة',
    location: 'Rabat',
    location_ar: 'الرباط',
    audioSrc: '/audios/Yassir-50ans-Rabat.wav',
  }
];

  useEffect(() => {
    const sections = ['hero', 'problem', 'solution', 'composition', 'scientific', 'benefits', 'testimonials', 'audio-testimonials', 'conversations' , 'pricing', 'order-form', 'faq', 'how-it-works', 'why-choose'];
    const handleScroll = () => {
      const newVisibility = {};
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          newVisibility[section] = rect.top <= window.innerHeight * 0.8;
        }
      });
      setIsVisible(newVisibility);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const handleInputChange = (e) => {
     const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      // Clear error when user starts typing
      if (formErrors[name]) {
        setFormErrors((prev) => ({ ...prev, [name]: '' }));
      }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate inputs
  // Validate inputs
  const errors = {};
  
  if (!formData.nom.trim()) {
    errors.nom = true;
  }
  
  if (!formData.telephone.trim()) {
    errors.telephone = true;
  } else if (!/^[0-9]{10}$/.test(formData.telephone.replace(/\s/g, ''))) {
    errors.telephone = true;
  }
  
  if (!formData.adresse.trim()) {
    errors.adresse = true;
  }
  
  if (!formData.ville.trim()) {
    errors.ville = true;
  }
  
  setFormErrors(errors);
  
  // If there are errors, show popup and stop submission
  if (Object.keys(errors).length > 0) {
    setSubmissionError(lang === 'ar' 
      ? 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح' 
      : 'Veuillez remplir tous les champs obligatoires correctement');
    setShowPopup(true);
    return;
  }
  
  // If there are errors, show popup and stop submission
  if (Object.keys(errors).length > 0) {
    setSubmissionError(lang === 'ar' 
      ? 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح' 
      : 'Veuillez remplir tous les champs obligatoires correctement');
    setShowPopup(true);
    return;
  }
  
  // Continue with form submission if no errors...
  setIsSubmitting(true);
  setSubmissionError(null);
    try {
      const submissionPayload = {
        nom: formData.nom,
        telephone: formData.telephone,
        email: formData.email,
        ville: formData.ville,
        pack: packs[selectedPack].quantity,
        prix: packs[selectedPack].price,
        date: new Date().toLocaleString('fr-FR')
      };
      const formspreeResponse = await fetch('https://formspree.io/f/xjkelaqj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nom: submissionPayload.nom,
          telephone: submissionPayload.telephone,
          email: submissionPayload.email,
          ville: submissionPayload.ville,
          pack: submissionPayload.pack,
          prix: submissionPayload.prix,
          date: submissionPayload.date,
          _subject: 'Nouvelle commande Zitalgic®',
          _replyto: submissionPayload.email
        })
      });
      if (formspreeResponse.ok) {
        setShowPopup(true);
        setFormData({ nom: '', telephone: '', email: '', ville: '' });
      } else {
        throw new Error(`Formspree submission failed with status: ${formspreeResponse.status}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError(`Erreur technique. Deux solutions :
        1. Réessayez dans 2 minutes
        2. Appelez-nous au 0655.89.53.75
        (Dites que vous venez du site web)`);
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
  setShowPopup(false);
  // Only clear form if success popup
  if (!submissionError) {
    setFormData({ nom: '', telephone: '', email: '', ville: '', adresse: '' });
  }
  setSubmissionError(null);
  };

  // Add this new function for horizontal scrolling
const scrollThumbnailsHorizontal = (direction) => {
  const container = thumbnailsRef.current;
  if (container) {
    const scrollAmount = 65; // Width of thumbnail + gap
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
};
 // Add these state variables for audio functionality
  const [audioDurations, setAudioDurations] = useState({});
  const [currentTimes, setCurrentTimes] = useState({});
  const [progressPercentages, setProgressPercentages] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const audioRefs = useRef({});

  // Define audio sources with direct paths
  const audioSources = [
    "/audios/Loubna-42-Rabat.wav",
    "/audios/Mariam-35ans-Oujda.wav",
    "/audios/Mohamed 33ans-Casablanca.wav",
    "/audios/Rajae 35 ans Temara.wav",
    "/audios/Tawfiq-47ans-Casablanca.wav",
    "/audios/Yassir-50ans-Rabat.wav"
  ];

// Replace your useEffect for loading audio durations with this improved version
useEffect(() => {
  const loadAudioDurations = async () => {
    const durations = {};
    
    for (let i = 0; i < audioSources.length; i++) {
      try {
        setIsLoading(prev => ({...prev, [i]: true}));
        
        // Create a new audio element for each file
        const audio = new Audio();
        audio.src = audioSources[i];
        audio.preload = "metadata";
        
        // Wait for metadata to load to get duration
        const duration = await new Promise((resolve) => {
          let isResolved = false;
          
          const onLoaded = () => {
            if (isResolved) return;
            isResolved = true;
            audio.removeEventListener('loadedmetadata', onLoaded);
            audio.removeEventListener('error', onError);
            console.log(`Audio ${i} loaded successfully: ${audio.duration} seconds`);
            resolve(audio.duration);
          };
          
          const onError = (err) => {
            if (isResolved) return;
            isResolved = true;
            audio.removeEventListener('loadedmetadata', onLoaded);
            audio.removeEventListener('error', onError);
            console.error(`Error loading audio ${i}:`, err);
            resolve(null); // Return null instead of a default value
          };
          
          audio.addEventListener('loadedmetadata', onLoaded);
          audio.addEventListener('error', onError);
          
          // Try to load the audio
          audio.load().catch(err => {
            console.error(`Load error for audio ${i}:`, err);
          });
          
          // Set a timeout in case the audio fails to load
          setTimeout(() => {
            if (isResolved) return;
            isResolved = true;
            audio.removeEventListener('loadedmetadata', onLoaded);
            audio.removeEventListener('error', onError);
            console.warn(`Timeout loading audio ${i}`);
            resolve(null); // Return null instead of a default value
          }, 8000); // Increased timeout to 8 seconds
        });
        
        durations[i] = duration;
      } catch (error) {
        console.error(`Unexpected error loading audio ${i}:`, error);
        durations[i] = null;
      } finally {
        setIsLoading(prev => ({...prev, [i]: false}));
      }
    }
    
    setAudioDurations(durations);
  };

  loadAudioDurations();
}, []);

  // Update the handlePlayAudio function
  const handlePlayAudio = async (index) => {
    // If already playing, pause it
    if (isPlaying === index) {
      if (audioRefs.current[index]) {
        audioRefs.current[index].pause();
      }
      setIsPlaying(null);
      return;
    }

    // Pause any currently playing audio
    if (isPlaying !== null && audioRefs.current[isPlaying]) {
      audioRefs.current[isPlaying].pause();
    }

    // Create audio element if it doesn't exist
    if (!audioRefs.current[index]) {
      try {
        setIsLoading(prev => ({...prev, [index]: true}));
        
        const audio = new Audio();
        audio.src = audioSources[index];
        audio.preload = "auto";
        
        // Set up event listeners for this audio
        audio.addEventListener('timeupdate', () => {
          setCurrentTimes(prev => ({...prev, [index]: audio.currentTime}));
          
          const percentage = audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;
          setProgressPercentages(prev => ({...prev, [index]: percentage}));
        });
        
        audio.addEventListener('ended', () => {
          setIsPlaying(null);
          setCurrentTimes(prev => ({...prev, [index]: 0}));
          setProgressPercentages(prev => ({...prev, [index]: 0}));
        });
        
        audio.addEventListener('error', (e) => {
          console.error("Audio error:", e);
          setIsLoading(prev => ({...prev, [index]: false}));
        });
        
        audio.addEventListener('canplaythrough', () => {
          setIsLoading(prev => ({...prev, [index]: false}));
        });
        
        audioRefs.current[index] = audio;
        
        // Wait for audio to be ready
        await new Promise((resolve) => {
          if (audio.readyState >= 3) {
            resolve();
          } else {
            audio.addEventListener('canplay', resolve, { once: true });
            setTimeout(resolve, 3000);
          }
        });
      } catch (error) {
        console.error("Error setting up audio:", error);
        setIsLoading(prev => ({...prev, [index]: false}));
        return;
      }
    }
    
    const audio = audioRefs.current[index];
    
    try {
      await audio.play();
      setIsPlaying(index);
    } catch (error) {
      console.error("Audio playback failed:", error);
      try {
        audio.load();
        await audio.play();
        setIsPlaying(index);
      } catch (err) {
        console.error("Fallback audio playback also failed:", err);
      }
    }
  };

  // Helper function to format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };


// Add this CSS to your styles
const audioPlayerStyles = `
.audio-testimonials {
  padding: 80px 0;
  background: white !important;
}

.audio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.audio-card {
  background: #f9fafb;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.audio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.audio-player-container {
  margin-bottom: 16px;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.play-pause-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #10B981;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;
}

.play-pause-btn:hover:not(:disabled) {
  background: #0D966C;
}

.play-pause-btn.playing {
  background: #10B981 !important;
}

.play-pause-btn.playing:hover:not(:disabled) {
  background: #0D966C !important;
}

.play-pause-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.play-pause-btn.loading {
  background: #6B7280;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.play-icon {
  width: 20px;
  height: 20px;
}

.progress-container {
  flex-grow: 1;
  height: 6px;
  background-color: #E5E7EB;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #10B981;
  border-radius: 3px;
  transition: width 0.1s linear;
}

.time-display {
  min-width: 90px;
  text-align: center;
  font-size: 0.85rem;
  color: #6B7280;
  font-variant-numeric: tabular-nums;
}

.audio-info h4 {
  margin: 0 0 4px 0;
  color: #1F2937;
  font-size: 1.1rem;
}

.audio-info p {
  margin: 0;
  color: #6B7280;
  font-size: 0.9rem;
}

.community-cta {
  margin-top: 60px;
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.choice-cta-content h3 {
  margin: 0 0 12px 0;
  color: #1F2937;
  font-size: 1.5rem;
}

.choice-cta-content p {
  margin: 0 0 24px 0;
  color: #6B7280;
  font-size: 1.1rem;
}

.audio-section-cta-button {
  background: #10B981;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 14px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.audio-section-cta-button:hover {
  background: #0D966C;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .audio-grid {
    grid-template-columns: 1fr;
  }
  
  .audio-controls {
    flex-wrap: wrap;
  }
  
  .time-display {
    width: 100%;
    text-align: left;
    margin-top: 8px;
  }
}
`;

// Add the style tag to the document head
useEffect(() => {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = audioPlayerStyles;
  document.head.appendChild(styleTag);
  
  return () => {
    document.head.removeChild(styleTag);
  };
}, []);

const manualDurations = {
  0: 25, // Loubna-42-Rabat.wav - 42 seconds
  1: 56, // Mariam-35ans-Oujda.wav - 38 seconds
  2: 12, // Mohamed 33ans-Casablanca.wav - 45 seconds
  3: 37, // Rajae 35 ans Temara.wav - 40 seconds
  4: 10, // Tawfiq-47ans-Casablanca.wav - 50 seconds
  5: 42  // Yassir-50ans-Rabat.wav - 55 seconds
};



const [copySuccess, setCopySuccess] = useState(false);

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
};

  const scrollToForm = () => {
    const formSection = document.getElementById('order-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pricingImages = {
    '1-flacon': '/images/Zitalgic 1 Bottle.png',
    '3-flacons': '/images/Zitalgic 3 Bottles.png',
    '5-flacons': '/images/Zitalgic 5 Bottles.png'
  };

  // Add these new functions to handle thumbnail scrolling
const scrollThumbs = (direction) => {
  const container = document.getElementById('thumb-row') || thumbnailsRef.current;
  if (container) {
    const scrollAmount = 100;
    container.scrollBy({
      [window.innerWidth > 768 ? 'top' : 'left']: direction === 'up' || direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
};

/* bottom-header visibility */
const [showBottomHeader,setShowBottomHeader]=useState(false);
useEffect(()=>{
  const onScroll=()=>{
    const hero=document.getElementById('hero');
    if(!hero)return;
    setShowBottomHeader(hero.getBoundingClientRect().bottom<0);
  };
  window.addEventListener('scroll',onScroll);
  return()=>window.removeEventListener('scroll',onScroll);
},[]);

useEffect(() => {
  const handleResizeAndMoveGallery = () => {
    const isMobile = window.innerWidth <= 768;
    const heroGallery = document.querySelector(".hero-gallery-section");
    const heroInfo = document.querySelector(".hero-info-section");
    const heroContent = document.querySelector(".hero-content");
    const subtitle = heroInfo?.querySelector(".hero-subtitle");

    if (!heroGallery || !heroInfo || !heroContent) return;

    if (isMobile) {
      // move gallery inside infos, after subtitle
      if (subtitle && heroGallery.parentNode !== heroInfo) {
        heroInfo.insertBefore(heroGallery, subtitle.nextSibling);
      }
    } else {
      // move gallery back to the left of hero-info
      if (heroGallery.parentNode !== heroContent) {
        heroContent.insertBefore(heroGallery, heroInfo);
      }
    }
  };

  // run once and on resize
  handleResizeAndMoveGallery();
  window.addEventListener("resize", handleResizeAndMoveGallery);

  return () => {
    window.removeEventListener("resize", handleResizeAndMoveGallery);
  };
}, []);


// Add this CSS for mobile styling
const mobileStyles = `
@media (max-width: 768px) {
  .hero-info-section .hero-gallery-section {
    width: 100%;
    margin: 20px 0;
  }
  
  .gallery-container-vertical {
    flex-direction: column;
    align-items: center;
  }
  
  .vertical-thumbnails-container {
    flex-direction: row;
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 10px 0;
    gap: 8px;
  }
  
  .vertical-thumbnails-wrapper {
    flex-direction: row;
    max-height: none;
    gap: 8px;
    padding: 5px;
  }
  
  .vertical-thumbnail-item {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }
  
  .nav-arrow-vertical {
    display: none;
  }
  
  .hero-main-image-vertical {
    height: 280px;
    margin-bottom: 10px;
  }
  
  .image-indicators-vertical {
    position: static;
    transform: none;
    justify-content: center;
    margin: 10px 0;
    flex-wrap: wrap;
  }
  
  .main-image-wrapper-vertical {
    order: -1;
  }
  
  /* Horizontal line for unselected images */
  .vertical-thumbnails-wrapper {
    border-top: 2px solid #f0f0f0;
    padding-top: 15px;
    display: flex;
    justify-content: center;
  }
}
`;

// Add the style tag to the document head
useEffect(() => {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = mobileStyles;
  document.head.appendChild(styleTag);
  
  return () => {
    document.head.removeChild(styleTag);
  };
}, []);


const [currentSlide, setCurrentSlide] = useState(0);

const nextSlide = () => setCurrentSlide((c) => (c + 1) % conversationImages.length);
const prevSlide = () => setCurrentSlide((c) => (c - 1 + conversationImages.length) % conversationImages.length);

const conversationImages = [
            "/images/Tem 01.webp",
            "/images/Tem 02.webp",
            "/images/Tem 03.webp",
            "/images/Tem 04.webp",
            "/images/Tem 05.webp",
            "/images/Tem 06.webp",
            "/images/Tem 07.webp",
            "/images/Tem 08.webp",
            "/images/Tem 09.webp",
            "/images/Tem 10.webp"
        ];

const phoneSliderCSS = `
.conversations{position:relative;background:linear-gradient(135deg,#dcfce7 0%,#bbf7d0 100%);padding:100px 0;z-index:2}
.phone-green-wrapper{max-width:320px;margin:0 auto}
.phone-frame{background:#111;border-radius:36px;padding:8px;box-shadow:0 20px 50px rgba(0,0,0,.25)}
.phone-speaker{width:60px;height:6px;background:#333;border-radius:3px;margin:8px auto 12px}
.phone-screen{border-radius:24px;width:100%;display:block}
.phone-cta-space{text-align:center;margin-top:60px;margin-bottom:40px}
@media (max-width:768px){.phone-frame{border-radius:28px}.phone-speaker{width:50px;height:5px}.phone-green-wrapper{max-width:260px}}
`;
useEffect(() => {
  const s = document.createElement('style');
  s.innerHTML = phoneSliderCSS;
  document.head.appendChild(s);
  return () => s.remove();
}, []);

useEffect(() => {
  const auto = setInterval(nextSlide, 4000);   // change every 2s
  return () => clearInterval(auto);            // clean on unmount
}, [currentSlide]);   // restart if slide changes manually


const [lang, setLang] = useState('ar');    // NEW
const t = translations[lang]; 

// ------------------------------------------------------------------
// 1.  ADD THIS JUST ABOVE THE TESTIMONIALS SECTION (or near the top)
// ------------------------------------------------------------------
const testimonials = [
  {
    name: 'Fatima',
    city: 'Casablanca',
    img: '/images/testimonial-1.jpeg',
    quote: 'Après des années de douleurs aux genoux, Zitalgic m\'a redonné ma mobilité. Je recommande !',
    quote_ar: 'بعد سنوات من آلام الركبة، أعادتني زيتالجيك إلى حركتي. أنصح بها!'
  },
  {
    name: 'Mohammed',
    city: 'Rabat',
    img: '/images/testimonial-2.png',
    quote: 'Les douleurs musculaires ont disparu en quelques minutes. Un produit miracle !',
    quote_ar: 'اختفت آلام العضلات في دقائق. منتج معجزة!'
  },
  {
    name: 'Amina',
    city: 'Marrakech',
    img: '/images/testimonial-3.jpeg',
    quote: 'Naturel et efficace, je ne peux plus m\'en passer. Merci Zitalgic !',
    quote_ar: 'طبيعي وفعّال، لا أستطيع الاستغناء عنه. شكراً زيتالجيك!'
  },
  {
    name: 'Khalid',
    city: 'Marrakech',
    img: '/images/testimonial-4.jpeg',
    quote: 'Grâce à Zitalgic, mes douleurs au dos ont diminué et je peux enfin profiter de mes promenades.',
    quote_ar: 'بفضل زيتالجيك، تقلّصت آلام ظهري وأصبحت أستمتع بنزهاتي أخيراً.'
  },
  {
    name: 'Halima',
    city: 'Rabat',
    img: '/images/testimonial-5.jpeg',
    quote: 'J\'étais sceptique au début, mais après quelques semaines j\'ai vraiment ressenti un soulagement.',
    quote_ar: 'كنت متشككة في البداية، لكن بعد أسابيع شعرت فعلاً بالراحة.'
  },
  {
    name: 'Youssef',
    city: 'Tanger',
    img: '/images/testimonial-6.jpeg',
    quote: 'Zitalgic m\'a aidé à retrouver mon énergie et à reprendre mes activités sportives doucement mais sûrement.',
    quote_ar: 'ساعدني زيتالجيك على استعادة طاقتي واستئناف أنشطتي الرياضية بثبات.'
  }
];

  return (
    <div className="zitalgic-landing" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Popup unchanged */}
      {showPopup && (
  <div className="popup-overlay" onClick={closePopup}>
    <div className="popup-container" onClick={(e) => e.stopPropagation()}>
      <button className="popup-close" onClick={closePopup}><X size={24} /></button>
      <div className="popup-content">
        {submissionError ? (
          <>
            <div className="popup-icon error"><AlertCircle size={48} /></div>
            <h3>{lang === 'ar' ? 'خطأ في الإرسال' : 'Erreur lors de l\'envoi'}</h3>
            <p>{submissionError}</p>
            <button className="popup-button error-btn" onClick={closePopup}>
              {lang === 'ar' ? 'حاول مرة أخرى' : 'Réessayer'}
            </button>
          </>
        ) : (
          <>
            <div className="popup-icon success"><CheckCircle size={48} /></div>
            <h3>{lang === 'ar' ? 'تم تسجيل الطلب!' : 'Commande Enregistrée !'}</h3>
            <p>
              {lang === 'ar'
                ? 'شكرًا لطلبك! سيتصل بك موظفنا خلال 24 ساعة.'
                : 'Merci pour votre commande ! Notre commercial vous contactera dans les 24h.'}
            </p>
            <button className="popup-button success-btn" onClick={closePopup}>
              {lang === 'ar' ? 'إغلاق' : 'Fermer'}
            </button>
          </>
        )}
      </div>
    </div>
  </div>
)}

      {/* ---------------------------------------------------- */}
      {/* HEADER  -  added language switcher                   */}
      {/* ---------------------------------------------------- */}
      {/* bottom copy of the header */}
{/*  bottom copy of the header  –  LEFT  |  CENTER  |  RIGHT  */}
{/* bottom copy of header – slides up after hero */}
<div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
  <div className={`bottom-header ${showBottomHeader ? 'show' : ''}`}>
    <header className="header">
      <div className="bar">
        <div className="cell logo">
          <h1>{t.headerTitle}</h1>
          <p>{t.headerSub}</p>
        </div>

        <div className="cell lang">
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>

        <div className="cell cta">
          <button className="cta-button" onClick={scrollToForm}>
            {t.orderNow}
          </button>
        </div>
      </div>
    </header>
  </div>
</div>


      {/* ---------------------------------------------------- */}
      {/* HERO  -  replaced static text with t.*               */}
      {/* ---------------------------------------------------- */}
<section id="hero" className={`hero ${isVisible.hero ? "animate" : ""}`}>
        <div className="hero-background">
          <div className="floating-elements">
            <div className="floating-leaf leaf-1"></div>
            <div className="floating-leaf leaf-2"></div>
            <div className="floating-leaf leaf-3"></div>
            <div className="floating-circle circle-1"></div>
            <div className="floating-circle circle-2"></div>
          </div>
        </div>

        <div className="container">
          <div className="hero-content mobile-centered">
            {/* LEFT GALLERY */}
            <div className="hero-gallery-section">
              <div className="gallery-container-vertical">
                <div className="vertical-thumbnails-container">
                  <button className="nav-arrow-vertical nav-up" onClick={() => scrollThumbnails("up")}>
                    <ChevronUp size={20} />
                  </button>

                  <div className="vertical-thumbnails-wrapper" ref={thumbnailsRef}>
                    {(lang === "ar" ? productImagesAR : productImages).map((img, idx) => (
                      <div
                        key={idx}
                        className={`vertical-thumbnail-item ${selectedImage === idx ? "active" : ""}`}
                        onClick={() => handleImageChange(idx)}
                      >
                        <img src={img || "/placeholder.svg"} alt={`Zitalgic ${idx + 1}`} loading="lazy" decoding="async" />
                      </div>
                    ))}
                  </div>

                  <button className="nav-arrow-vertical nav-down" onClick={() => scrollThumbnails("down")}>
                    <ChevronDown size={20} />
                  </button>
                </div>

                <div className="main-image-wrapper-vertical">
                  <img
                    src={(lang === "ar" ? productImagesAR : productImages)[selectedImage]}
                    alt="ZITALGIC"
                    className={`hero-main-image-vertical ${imageTransition ? "transitioning" : ""}`}
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    onClick={() =>
                      handleImageChange((selectedImage + 1) % (lang === "ar" ? productImagesAR : productImages).length)
                    }
                  />
                  <div className="image-indicators-vertical">
                    {(lang === "ar" ? productImagesAR : productImages).map((_, idx) => (
                      <button
                        key={idx}
                        className={`indicator-vertical ${selectedImage === idx ? "active" : ""}`}
                        onClick={() => handleImageChange(idx)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="quick-info-grid">
                <div className="info-card">
                  <div className="info-icon">
                    <Truck size={20} />
                  </div>
                  <span>{lang === "ar" ? "توصيل خلال 24-48 ساعة" : "Livraison 24-48h"}</span>
                </div>
                <div className="info-card">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <span>{lang === "ar" ? "في جميع أنحاء المغرب" : "Partout au Maroc"}</span>
                </div>
                <div className="info-card">
                  <div className="info-icon">
                    <CreditCard size={20} />
                  </div>
                  <span>{lang === "ar" ? "الدفع عند الاستلام" : "Paiement à la livraison"}</span>
                </div>
                <div className="info-card">
                  <div className="info-icon">
                    <Leaf size={20} />
                  </div>
                  <span>{lang === "ar" ? "خدمة العملاء على مدار الساعة " : "Service client 24h/24"}</span>
                </div>
              </div>
            </div>

            {/* RIGHT INFO */}
            <div className="hero-info-section">
              <h1 className="hero-title">{t.heroTitle}</h1>
              <p className="hero-subtitle">{t.heroSub}</p>

              <div className="mobile-gallery-image">
                <img
                  src={(lang === "ar" ? productImagesAR : productImages)[selectedImage]}
                  alt="ZITALGIC"
                  className="mobile-product-image"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>


              <div className="rating-section">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#f97316" color="#f97316" />
                  ))}
                </div>
                <span className="rating-text">{lang === "ar" ? "4.8/5 من 3600+ تقييم" : "4.8/5 (3,600+ avis)"}</span>
              </div>

              <div className="benefits-list">
                <div className="benefit-item">
                  <CheckCircle size={18} color="#f97316" />
                  <span>
                    {lang === "ar"
                      ? "يسكّن بسرعة آلام المفاصل والعضلات والأعصاب."
                      : "Soulage rapidement les douleurs articulaires, musculaires et nerveuses."}
                  </span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={18} color="#f97316" />
                  <span>
                    {lang === "ar"
                      ? "يُقلِّّل اللتهابات في العمق ليمنح راحة طويلة الأمد"
                      : "Réduit l'inflammation en profondeur pour un confort durable"}
                  </span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={18} color="#f97316" />
                  <span>
                    {lang === "ar"
                      ? "يُزيل التشنجات ويُعيد الليونة للعضلات."
                      : "Relâche les tensions et assouplit les muscles."}
                  </span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={18} color="#f97316" />
                  <span>
                    {lang === "ar"
                      ? "يُساعد على الوقاية من آالم التقلصات والشد ّ العضلي ."
                      : "Aide à prévenir et à traiter les courbatures et les Crampes."}
                  </span>
                </div>
              </div>

              <div className="package-selection">
                <h3 className="package-title">{t.choosePack}</h3>
                <div className="package-list">
                  <div className="package-item">
                    <label className="package-label">
                      <input
                        type="radio"
                        name="package"
                        checked={selectedPack === '1-flacon'}
                        onChange={() => setSelectedPack('1-flacon')}
                        className="package-radio"
                      />
                      <span className="radio-custom selected"></span>
                      <div className="package-content">
                        <div className="package-name">
                          {lang === "ar" ? packs['1-flacon'].quantity_ar : packs['1-flacon'].quantity}
                        </div>
                        <div className="package-treatment">
                          {lang === "ar" ? packs['1-flacon'].treatment_ar : packs['1-flacon'].treatment}
                        </div>
                        <div className="package-pricing">
                          <span className="package-price">{packs['1-flacon'].price} DH</span>
                          <span className="package-old">{packs['1-flacon'].original} DH</span>
                          <span className="package-save-black">
                            {lang === "ar" ? `توفير ${packs['1-flacon'].savings} درهم` : `Économisez ${packs['1-flacon'].savings} DH`}
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <button className="hero-cta-button" onClick={scrollToForm}>
                <ShoppingCart size={24} />
                <span>{t.ctaButton}</span>
                <div className="button-shine"></div>
              </button>

              <div className="trust-indicators">
                <div className="trust-item">
                  <Shield size={16} />
                  <span>{lang === "ar" ? "فعالية مضمونة" : "Efficacité garantie"}</span>
                </div>
                <div className="trust-item">
                  <Users size={16} />
                  <span>{lang === "ar" ? "3600+ عميل راضٍ" : "3,600+ clients satisfaits"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* ---------------------------------------------------- */}
{/* ALL OTHER SECTIONS – same code, just add `t.` where  */}
{/* you want text swapped (already done for main ones). */}
{/* ---------------------------------------------------- */}

{/* AUDIO TESTIMONIALS */}
<section id="audio-testimonials" className={`audio-testimonials ${isVisible['audio-testimonials'] ? 'animate' : ''}`}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Volume2 className="audio-icon" />
              <span>{lang === 'ar' ? 'آراء الزبناء' : 'Témoignages Clients'}</span>
            </div>

            <h2 className="audio-testimonials-title green-title-underline">
              {lang === 'ar' ? 'استمع كيف استعادوا راحتهم بفضل ' : 'Écoutez comment ils ont retrouvé leur confort grâce à '}{' '}
              <span className="green-text">{lang === 'ar' ? 'Zitalgic®' : 'Zitalgic®'}</span>
            </h2>

            <p className="section-desc">
              {lang === "ar"
                ? ". قصص حقيقية وتجارب ملهمة من أناس وجدوا في Zitalgic® الحل الطبيعي الذي كانوا يبحثون عنه، استمع إلى شهاداتهم واكتشف كيف استعادوا السيطرة على حياتهم واستمتعوا بالراحة التي يستحقونها."
                : "Des histoires réelles et des témoignages inspirants de personnes ayant trouvé dans Zitalgic® la solution naturelle qu’elles recherchaient. Écoutez leurs récits et découvrez comment elles ont repris le contrôle de leur vie et retrouvé le confort qu’elles méritent."}
            </p>

          </div>

          <div className="audio-grid">
            {audioTestimonials.map((testimonial, index) => (
              <div key={index} className="audio-card">
                <div className="audio-player-container">
                  <div className="audio-player">
                    <div className="audio-controls">
                      <button
                        className={`play-pause-btn ${isPlaying === index ? 'playing' : ''} ${isLoading[index] ? 'loading' : ''}`}
                        onClick={() => handlePlayAudio(index)}
                        disabled={isLoading[index]}
                      >
                        {isLoading[index] ? (
                          <div className="loading-spinner"></div>
                        ) : isPlaying === index ? (
                          <Pause className="play-icon" />
                        ) : (
                          <Play className="play-icon" />
                        )}
                      </button>

                      <div className="progress-container">
                        <div 
                          className="progress-bar"
                          style={{ width: `${progressPercentages[index] || 0}%` }}
                        ></div>
                      </div>

                      <div className="time-display">
                        {formatTime(currentTimes[index] || 0)} / {
                          audioDurations[index] !== null && audioDurations[index] !== undefined 
                            ? formatTime(audioDurations[index]) 
                            : formatTime(manualDurations[index] || 0)
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="audio-info">
                  <h4>{lang === 'ar' ? testimonial.name_ar : testimonial.name}</h4>
                  <p>{lang === 'ar' ? testimonial.location_ar : testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="community-cta">
            <div className="choice-cta-content">
              <h3>{lang === 'ar' ? 'انضم إلى مجتمع Zitalgic®' : 'Rejoignez la communauté Zitalgic®'}</h3>
              <p>{lang === 'ar' ? 'آلاف المغاربة غيّروا حياتهم. حان دورك الآن!' : 'Des milliers de Marocains ont déjà transformé leur vie. À votre tour !'}</p>
              <button className="audio-section-cta-button" onClick={scrollToForm}>
                {lang === 'ar' ? 'اختر Zitalgic® الآن' : 'Je choisis Zitalgic Maintenant'}
              </button>
            </div>
          </div>
        </div>
      </section>

<section
  id="conversations"
  className={`conversations ${isVisible.conversations ? 'animate' : ''}`}
  style={{ 
    backgroundColor: '#ffffff',
    padding: '40px 0',
    position: 'relative'
  }}
>
  <div className="container" style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px'
  }}>
    
    {/* Section Header */}
    <div className="section-header" style={{ 
      marginBottom: '30px', 
      textAlign: 'center',
      width: '100%'
    }}>
      <div className="section-badge" style={{ 
        background: 'linear-gradient(135deg,#10B981,#047857)', 
        color: '#ffffff',
        display: 'inline-flex',
        padding: '12px 24px',
        marginBottom: '15px',
        borderRadius: '50px'
      }}>
        <MessageCircle size={20} style={{ color: '#ffffff', marginRight: '8px' }} />
        <span style={{ color: '#ffffff', fontSize: '1rem' }}>
          {lang === 'ar' ? 'رسائل العملاء' : 'Messages Clients'}
        </span>
      </div>
      <h2 className="pricing-title" style={{ 
        fontSize: '2rem', 
        margin: '10px 0',
        color: '#333'
      }}>
        <span style={{ color: '#10B981' }}>{lang === 'ar' ? 'شهادات حقيقية' : 'Témoignages'}</span>
        <span> {lang === 'ar' ? 'من' : 'de nos'} </span>
        <span style={{ color: '#10B981' }}>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
      </h2>
      <p className="pricing-desc" style={{ 
        fontSize: '1rem', 
        maxWidth: '600px', 
        margin: '0 auto',
        lineHeight: '1.5',
        color: '#666'
      }}>
        {lang === 'ar'
          ? 'اطلع على ما يقوله مستخدموا زيتالجيك® فعلاً.'
          : 'Lisez ce que racontent les utilisateurs de Zitalgic®.'}
      </p>
    </div>

    {/* Phone Slider Container — Shorter height */}
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      margin: '0 auto 30px auto',
      maxWidth: '100%',
      position: 'relative'
    }}>
      
      {/* LEFT ARROW — Far from container */}
      <button 
        className="nav-arrow-green nav-left-green" 
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '-80px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: '#10B981',
          border: 'none',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          transition: 'all 0.3s ease',
          outline: 'none' // Remove focus outline
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#047857';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#10B981';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
        onFocus={(e) => {
          e.target.style.outline = 'none'; // Remove focus outline
        }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* PHONE IMAGE CONTAINER — Shorter height */}
      <div style={{ 
        width: '340px', 
        height: '520px', // Shorter height
        maxWidth: '90%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          background: '#111',
          borderRadius: '24px',
          padding: '15px',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            width: '60px',
            height: '6px',
            background: '#333',
            borderRadius: '3px',
            margin: '10px auto 15px'
          }} />
          
          {/* Image container with exact dimensions to match image */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: '16px',
            backgroundColor: '#f5f5f5',
            width: '100%',
            height: '100%'
          }}>
            <img
              src={conversationImages[currentSlide]}
              alt={`Conversation ${currentSlide + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
              loading="lazy" decoding="async"
            />
          </div>
        </div>
      </div>

      {/* RIGHT ARROW — Far from container */}
      <button 
        className="nav-arrow-green nav-right-green" 
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '-80px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: '#10B981',
          border: 'none',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          transition: 'all 0.3s ease',
          outline: 'none' // Remove focus outline
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#047857';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#10B981';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
        onFocus={(e) => {
          e.target.style.outline = 'none'; // Remove focus outline
        }}
      >
        <ChevronRight size={20} />
      </button>
    </div>

    {/* Slide Indicators */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '20px'
    }}>
      {conversationImages.map((_, index) => (
        <div
          key={index}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: currentSlide === index ? '#10B981' : '#ccc',
            transition: 'background-color 0.3s ease'
          }}
        />
      ))}
    </div>

    {/* Mobile Arrows (Hidden on Desktop) - Moved above CTA button */}
    <div className="mobile-arrows" style={{ 
      display: 'none',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '20px'
    }}>
      <button 
        onClick={prevSlide}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#10B981',
          border: 'none',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 3px 10px rgba(16, 185, 129, 0.3)',
          transition: 'all 0.3s ease',
          outline: 'none' // Remove focus outline
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#0d9665';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#10B981';
          e.target.style.transform = 'scale(1)';
        }}
        onFocus={(e) => {
          e.target.style.outline = 'none'; // Remove focus outline
        }}
      >
        <ChevronLeft size={18} />
      </button>
      
      <button 
        onClick={nextSlide}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#10B981',
          border: 'none',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 3px 10px rgba(16, 185, 129, 0.3)',
          transition: 'all 0.3s ease',
          outline: 'none' // Remove focus outline
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#0d9665';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#10B981';
          e.target.style.transform = 'scale(1)';
        }}
        onFocus={(e) => {
          e.target.style.outline = 'none'; // Remove focus outline
        }}
      >
        <ChevronRight size={18} />
      </button>
    </div>

    {/* CTA Button — Simple & Centered */}
    <div style={{ textAlign: 'center' }}>
      <button 
        onClick={scrollToForm} 
        style={{ 
          background: '#10B981', 
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 32px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
          transition: 'all 0.3s ease',
          outline: 'none' // Remove focus outline
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#0d9665';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#10B981';
          e.target.style.transform = 'translateY(0)';
        }}
        onFocus={(e) => {
          e.target.style.outline = 'none'; // Remove focus outline
        }}
      >
        {lang === 'ar' ? 'أطلب الآن' : 'Je commande maintenant'}
      </button>
    </div>
  </div>

  {/* Responsive Styles */}
  <style jsx>{`
    @media (max-width: 768px) {
      .container > div:first-child {
        padding: 0 10px;
      }
      .pricing-title {
        font-size: 1.6rem !important;
      }
      .pricing-desc {
        font-size: 0.95rem !important;
        padding: 0 15px;
      }
      
      /* Hide desktop arrows on mobile */
      .nav-left-green, .nav-right-green {
        display: none !important;
      }
      
      /* Show mobile arrows */
      .mobile-arrows {
        display: flex !important;
        justify-content: center;
        gap: 20px;
        margin: 20px 0;
      }
      
      /* Adjust phone size for mobile */
      #conversations > div > div:nth-child(2) > div:last-child {
        width: 300px !important;
        height: 460px !important;
      }
    }
    
    @media (max-width: 480px) {
      .pricing-title {
        font-size: 1.4rem !important;
      }
      .section-badge {
        padding: 8px 16px !important;
      }
      .section-badge span {
        font-size: 0.9rem !important;
      }
      
      /* Further adjust phone size for small mobile */
      #conversations > div > div:nth-child(2) > div:last-child {
        width: 280px !important;
        height: 420px !important;
      }
      
      .mobile-arrows {
        margin: 15px 0;
      }
    }
  `}</style>
</section>

{/* PROBLEM */}
<section id="problem" className={`problem ${isVisible.problem ? 'animate' : ''}`}>
  <div className="container">
    <div className="section-header">
      <h2>
        <span className="red-text">{lang === 'ar' ? 'هل سئمت' : 'Vous en avez assez'}</span>{' '}
        <span className="black-text">{lang === 'ar' ? 'من الألم الذي' : 'des douleurs qui vous'}</span>{' '}
        <span className="red-text">{lang === 'ar' ? 'يفسد حياتك؟' : 'gâchent la vie ?'}</span>
      </h2>
      <p>
        {lang === 'ar'
          ? 'نحن نفهم معاناتك. كل يوم، آلاف الأشخاص مثلك يبحثون عن حل طبيعي وفعّال لاستعادة راحتهم.'
          : 'Nous comprenons votre souffrance. Chaque jour, des milliers de personnes comme vous cherchent une solution naturelle et efficace pour retrouver leur bien-être.'}
      </p>
    </div>

    <div className="problem-content">
      <div className="problem-image">
        <img src="/images/zitalgic_feel_better.webp" alt={lang === 'ar' ? 'شخص يعاني من الألم' : 'Person experiencing pain'} loading="lazy" decoding="async" />
      </div>
      <div className="problem-cards-container">
        <div className="problem-cards">
          <div className="problem-card">
            <div className="problem-card-icon"><Activity size={24} /></div>
            <h3>{lang === 'ar' ? 'صعوبة في التنقل؟' : 'Difficulté à vous déplacer ?'}</h3>
            <p>{lang === 'ar' ? 'كل حركة تصبح تحدياً، مما يحد من أنشطتك اليومية.' : 'Chaque mouvement devient un défi, limitant vos activités quotidiennes'}</p>
          </div>
          <div className="problem-card">
            <div className="problem-card-icon"><Moon size={24} /></div>
            <h3>{lang === 'ar' ? 'ليالٍ مضطربة؟' : 'Nuits agitées ?'}</h3>
            <p>{lang === 'ar' ? 'الآلام تمنعك من النوم الجيد والاستعادة.' : 'Les douleurs vous empêchent de bien dormir et récupérer'}</p>
          </div>
          <div className="problem-card">
            <div className="problem-card-icon"><AlertCircle size={24} /></div>
            <h3>{lang === 'ar' ? 'آلام مزمنة؟' : 'Douleurs chroniques ?'}</h3>
            <p>{lang === 'ar' ? 'آلام تستمر وتؤثر على جودة حياتك.' : 'Des souffrances qui durent et impactent votre qualité de vie'}</p>
          </div>
          <div className="problem-card">
            <div className="problem-card-icon"><FlaskConical size={24} /></div>
            <h3>{lang === 'ar' ? 'حلول غير فعّالة؟' : 'Solutions inefficaces ?'}</h3>
            <p>{lang === 'ar' ? 'أدوية ذات آثار جانبية بدون نتائج دائمة.' : 'Médicaments avec effets secondaires sans résultats durables'}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="beautiful-testimonial-quote">
      <div className="quote-content">
        <p>
          {lang === 'ar'
            ? 'جربت الكثير من المنتجات... لا شيء يعمل فعلاً. أريد فقط استعادة حركتي وأستمتع بعائلتي بدون ألم مستمر.'
            : 'J\'ai essayé tellement de produits différents... Rien ne marche vraiment. Je veux juste retrouver ma mobilité et pouvoir profiter de ma famille sans ces douleurs constantes.'}
        </p>
        <span className="quote-author">
          — {lang === 'ar' ? 'شهادة شخص يعاني من آلام مزمنة' : 'Témoignage d\'une personne souffrant de douleurs chroniques'}
        </span>
      </div>
    </div>

    <div className="red-banner">
      <h3>{lang === 'ar' ? 'حان وقت التغيير!' : 'Il est temps de tourner la page !'}</h3>
      <p>
        {lang === 'ar'
          ? 'اكتشف كيف استعاد آلاف الأشخاص راحتهم وحركتهم بفضل حل 100٪ طبيعي ومثبت علمياً.'
          : 'Découvrez comment des milliers de personnes ont retrouvé leur confort et leur mobilité grâce à une solution 100 % naturelle et scientifiquement prouvée.'}
      </p>
      <button className="cta-button-red" onClick={scrollToForm}>
        {lang === 'ar' ? 'اطلب الآن' : 'Commander maintenant'}
      </button>
    </div>
  </div>
</section>

{/* SOLUTION */}
<section id="solution" className={`solution ${isVisible.solution ? 'animate' : ''}`} style={{ backgroundColor: '#ffffff' }}>
  <div className="container">
    <div className="section-header">
      <div className="section-badge orange-badge">
        <Leaf className="solution-icon" />
        <span>{lang === 'ar' ? 'الحل الطبيعي' : 'La Solution Naturelle'}</span>
      </div>
      <h2 className="solution-title">
        <span className="orange-text">Zitalgic</span>{' '}
        <span className="black-text">{lang === 'ar' ? 'حليفك الطبيعي للتخلص من الألم واستعادة ' : 'Votre allié naturel pour vous débarrasser de la douleur et retrouver'}</span>{' '}
        <span className="orange-text">{lang === 'ar' ? 'راحتك' : 'votre confort'}</span>
      </h2>
      <p className="solution-desc">
        {lang === "ar"
          ? "تركيبة متميزة طورها مختبر Authentic Laboratory، تجمع بين الفعالية والتأثير السريع لتقدم لك أفضل ما في الطبيعة."
          : "Une formule unique développée par Authentic Laboratory, alliant efficacité et action rapide pour vous offrir le meilleur de la nature."}
      </p>

    </div>

    <div className="solution-content">
      <div className="solution-image">
        <img src={lang === 'ar' ? "/images/ZitalgicMen.jpg" : "/images/ZitalgicMen.jpg"} alt={lang === 'ar' ? 'تطبيق زيتالجيك' : 'Application de Zitalgic'} loading="lazy" decoding="async" />
      </div>

      <div className="solution-cards-container">
        <div className="solution-cards">
          <div className="solution-card">
            <Heart size={28} className="solution-card-icon heart-icon" />
            <h3>{lang === 'ar' ? 'مسكّن طبيعي' : 'Antidouleur Naturel'}</h3>
            <p>
              {lang === 'ar'
                ? 'يسكّن بسرعة آلام المفاصل والعضلات والأعصاب.'
                : 'Soulage rapidement les douleurs articulaires, musculaires et nerveuses.'}
            </p>
          </div>

          <div className="solution-card">
            <Zap size={28} className="solution-card-icon flash-icon" />
            <h3>{lang === 'ar' ? 'مضاد للالتهاب' : 'Anti-inflammatoire'}</h3>
            <p>
              {lang === 'ar'
                ? 'يقلل الالتهاب بعمق لراحة طويلة الأمد.'
                : 'Réduit l\'inflammation en profondeur pour un confort durable.'}
            </p>
          </div>

          <div className="solution-card">
            <Activity size={28} className="solution-card-icon relax-icon" />
            <h3>{lang === 'ar' ? 'مرخٍ للعضلات' : 'Décontractant Musculaire'}</h3>
            <p>
              {lang === "ar"
                ? "يُزيل التشنجات ويزيد من مرونة العضلات."
                : "Élimine les crampes et améliore la souplesse des muscles."}
            </p>
          </div>

          <div className="solution-card">
            <Shield size={28} className="solution-card-icon prevent-icon" />
            <h3>{lang === 'ar' ? 'يمنع التقلصات' : 'Prévient les Courbatures'}</h3>
            <p>
              {lang === 'ar'
                ? 'يساعد على منع وعلاج التقلصات والتشنجات المرتبطة بالجهد.'
                : 'Aide à éviter et à traiter les courbatures et les crampes liées à l\'effort.'}
            </p>
          </div>

          <div className="solution-card">
            <Leaf size={28} className="solution-card-icon natural-icon" />
            <h3>{lang === 'ar' ? '100٪ طبيعي' : '100% Naturel'}</h3>
            <p>
              {lang === "ar"
                ? "تركيبة من الزيوت الأساسية النقية وعالية الجودة."
                : "Une synergie d'huiles essentielles pures et de haute qualité."}
            </p>
          </div>

          <div className="solution-card">
            <Award size={28} className="solution-card-icon formula-icon" />
            <h3>{lang === 'ar' ? 'تركيبة مرخّصة' : 'Formule Brevetée'}</h3>
            <p>
              {lang === "ar"
                ? "ثمرة البحث والتطوير وخبرة مختبر Authentic Laboratory®."
                : "Le fruit de la recherche, du développement et de l'expertise d'Authentic Laboratory®."}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* PRICING */}
<section id="pricing" className={`pricing orange-section ${isVisible.pricing ? 'animate' : ''}`}>
  <div className="container">
    <div className="section-header">
      <div className="pricing-badge">
        <Gift size={24} />
        <span>{lang === "ar" ? "عرض محدود" : "Offre limitée"}</span>
      </div>
      <h2 className="pricing-title">
        <span className="orange-text">{lang === "ar" ? "استفد" : "Profitez"}</span>{" "}
        <span className="black-text">{lang === "ar" ? "من عرضنا الحصري" : "de notre offre exclusive"}</span>{" "}
        <span className="orange-text">Zitalgic®</span>
      </h2>
      <p className="pricing-desc">
        {lang === "ar"
          ? "الطلب مرتفع والمخزون ينفد بسرعة، استغل العرض واحصل على باقتك من زيتالجيك®."
          : "La demande est forte et les stocks s’épuisent rapidement. Profitez de cette offre et commandez votre pack Zitalgic® dès maintenant."}
      </p>
    </div>

    <div className="pricing-grid">
      {Object.entries(packs).map(([key, pack]) => (
        <div key={key} className={`pricing-card ${selectedPack === key ? "selected" : ""}`}>
          <div className="pricing-image-container">
            <img src={pricingImages[key]} alt={`Pack ${pack.quantity}`} loading="lazy" decoding="async" />
            {key === "3-flacons" && (
              <div className="popular-badge">{lang === "ar" ? "الأكثر مبيعًا" : "Le plus populaire"}</div>
            )}
          </div>

          <div className="pricing-header">
  <h3>
    {lang === 'ar'
      ? key === '1-flacon'
        ? 'عبوة واحدة'
        : key === '3-flacons'
        ? 'ثلاثة عبوات  '
        : key === '5-flacons'
        ? 'خمسة عبوات  '
        : ''
      : key === '1-flacon'
      ? '1 Flacon'
      : key === '3-flacons'
      ? '3 Flacons'
      : key === '5-flacons'
      ? '5 Flacons'
      : ''}
  </h3>
  <p>
    {lang === 'ar'
      ? key === '1-flacon'
        ? 'علاج 20 يوم'
        : key === '3-flacons'
        ? 'علاج شهرين'
        : key === '5-flacons'
        ? 'علاج 3 أشهر ونصف'
        : ''
      : key === '1-flacon'
      ? 'Traitement 20 jours'
      : key === '3-flacons'
      ? 'Traitement 2 mois'
      : key === '5-flacons'
      ? 'Traitement 3 mois 1/2'
      : ''}
  </p>
          </div>


          <div className="pricing-price">
            <span className="original-price">
              {pack.original} {lang === "ar" ? "درهم" : "DH"}
            </span>
            <span className="current-price">
              {pack.price} {lang === "ar" ? "درهم" : "DH"}
            </span>
            {pack.savings > 0 && (
              <span className="savings">
                {lang === "ar" ? `وفّر ${pack.savings} درهم` : `Économisez ${pack.savings} DH`}
              </span>
            )}
          </div>

          <button className="pricing-button" onClick={() => setSelectedPack(key)}>
            {lang === "ar" ? "اختر هذا العرض" : "Choisir cette offre"}
          </button>
        </div>
      ))}
    </div>

    <div className="urgent-cta-banner">
      <div className="container">
        <div className="urgent-cta-content">
          <h3>{lang === "ar" ? "لا تفوّت الفرصة!" : "Ne laissez pas passer cette chance !"}</h3>
          <p>
            {lang === "ar"
              ? "هذا العرض الاستثنائي لن يدوم. اطلب الآن و تخلص من آلامك بطريقة فعالة وطبيعية"
              : "Cette offre exceptionnelle ne durera pas. Commandez maintenant et libérez-vous de vos douleurs de manière efficace et naturelle."}
          </p>

          <button className="cta-button" onClick={scrollToForm}>
            {lang === "ar" ? "اطلب الآن" : "Commander maintenant"}
          </button>
        </div>
      </div>
    </div>
  </div>
</section>


{/* WHY CHOOSE */}
<section id="why-choose" className={`why-choose ${isVisible['why-choose'] ? 'animate' : ''}`} style={{ backgroundColor: '#ffffff' }}>
  <div className="container">
    <div className="section-header">
      <h2>{lang === 'ar' ? 'لماذا تختار زيتالجيك®؟' : 'Pourquoi Choisir Zitalgic® ?'}</h2>
      <p>
        {lang === 'ar'
          ? 'تعرف على مزايا Zitalgic® التي تجعل منه الخيار والأمثل لمن يبحث عن الفعالية والأمان '
          : 'Découvrez les avantages de Zitalgic®, le choix optimal pour ceux qui recherchent efficacité et sécurité'}
      </p>

    </div>

    <div className="comparison-grid">
    <div
        className="comparison-column zitalgic-column"
        style={{
          backgroundColor: '#dcfce7', // light green
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid #bbf7d0'
        }}
      >
        <div className="comparison-header">
          <div
            className="check-icon"
            style={{
              color: '#16a34a', // green tick
              fontSize: '1.5rem'
            }}
          >
            ✓
          </div>
          <h3 style={{ color: '#16a34a' }}>Zitalgic®</h3>
        </div>
         <ul className="comparison-features" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li><span className="styled-check">✓</span> {lang === 'ar' ? 'تركيبة حاصلة على براءة اختراع' : 'Formule brevetée'}</li>
          <li><span className="styled-check">✓</span> {lang === 'ar' ? 'مكونات طبيعية 100% وعالية الجودة' : 'Ingrédients 100% naturels et de haute qualité'}</li>
          <li><span className="styled-check">✓</span> {lang === 'ar' ? 'بدون آثار جانبية' : 'Sans effets secondaires'}</li>
          <li><span className="styled-check">✓</span> {lang === 'ar' ? 'تأثير موجه: المفاصل، العضلات، الأعصاب' : 'Action ciblée : articulations, muscles et nerfs'}</li>
          <li><span className="styled-check">✓</span> {lang === 'ar' ? 'تأثير فوري بالبرودة والحرارة' : 'Effet froid-chaud immédiat'}</li>
          <li><span className="styled-check">✓</span> {lang === 'ar' ? 'راحة تدوم طويلاً' : 'Soulagement durable'}</li>
          <li><span className="styled-check">✓</span> {lang === 'ar' ? 'تركيبة مطوّرة من طرف صيادلة متخصصين' : 'Formule développée par des pharmaciens spécialisés'}</li>
          <li><span className="styled-check">✓</span> {lang === 'ar' ? 'فعالية مضمونة' : 'Efficacité garantie'}</li>
        </ul>

      </div>

      <div className="comparison-column home-remedies-column">
        <div className="comparison-header">
          <div className="warning-icon">⚠️</div>
          <h3>{lang === 'ar' ? 'العلاجات المنزلية' : 'Remèdes Maison'}</h3>
        </div>
        <ul className="comparison-features">
          <li>⚠️ {lang === 'ar' ? 'فعالية محدودة وغير موثوقة' : 'Efficacité limitée et peu fiable'}</li>
          <li>⛔ {lang === 'ar' ? 'راحة مؤقتة فقط' : 'Soulagement temporaire seulement'}</li>
          <li>⛔ {lang === 'ar' ? 'مكونات غير موحّدة المعايير' : 'Ingrédients non standardisés'}</li>
          <li>⚠️ {lang === 'ar' ? 'خطر الحساسية أو التهيج' : 'Risque d’allergies ou irritations'}</li>
          <li>⛔ {lang === 'ar' ? 'تأثير عام غير موجّه' : 'Action générale non ciblée'}</li>
          <li>⛔ {lang === 'ar' ? 'تحضير طويل ومرهق' : 'Préparation longue et fastidieuse'}</li>
          <li>⛔ {lang === 'ar' ? 'غياب الإثبات العلمي' : 'Pas de validation scientifique'}</li>
          <li>⛔ {lang === 'ar' ? 'لا يوجد ضمان للنتائج' : 'Aucune garantie de résultat'}</li>
        </ul>

      </div>

      <div className="comparison-column chemical-column">
        <div className="comparison-header">
          <div className="stop-icon">⛔</div>
          <h3>{lang === 'ar' ? 'العلاجات الكيميائية' : 'Traitements Chimiques'}</h3>
        </div>
        <ul className="comparison-features">
          <li>⛔ {lang === 'ar' ? 'آثار جانبية متعددة' : 'Effets secondaires nombreux'}</li>
          <li>⚠️ {lang === 'ar' ? 'راحة مع خطورة عالية على المعدة' : 'Soulagement mais risque élevé pour l’estomac'}</li>
          <li>⛔ {lang === 'ar' ? 'مواد كيميائية صناعية' : 'Substances chimiques synthétiques'}</li>
          <li>⛔ {lang === 'ar' ? 'تأثير متناقص يتطلب تغيير الدواء' : 'Effet décroissant nécessitant un changement de médicament'}</li>
          <li>⛔ {lang === 'ar' ? 'يُخفي الأعراض بدون علاج' : 'Masque les symptômes sans traiter'}</li>
          <li>⛔ {lang === 'ar' ? 'تكلفة عالية على المدى الطويل' : 'Coût élevé sur le long terme'}</li>
          <li>⛔ {lang === 'ar' ? 'موانع استعمال متعددة' : 'Contre-indications multiples'}</li>
          <li>⚠️ {lang === 'ar' ? 'مراقبة طبية إجبارية' : 'Surveillance médicale obligatoire'}</li>
        </ul>

      </div>
    </div>

    <div className="beautiful-choice-cta mobile-wide-banner">
      <div className="choice-cta-background">
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>
        <div className="choice-cta-content">
          <div className="choice-icon"><Award size={48} /></div>
          <h3>{lang === 'ar' ? 'الاختيار واضح!' : 'Le Choix Est Évident !'}</h3>
          <p>{lang === 'ar' ? 'زيتالجيك يجمع بين فعالية البحث العلمي وقوة الطبيعة' : 'Zitalgic combine l\'efficacité de la science moderne avec la douceur de la nature'}</p>
          <div className="choice-benefits">
            <div className="choice-benefit"><Zap size={20} /><span>{lang === 'ar' ? 'فعالية علمية' : 'Efficacité Scientifique'}</span></div>
            <div className="choice-benefit"><Leaf size={20} /><span>{lang === 'ar' ? 'مكونات طبيعية' : 'Douceur Naturelle'}</span></div>
            <div className="choice-benefit"><CheckCircle size={20} /><span>{lang === 'ar' ? 'نتائج مضمونة' : 'Résultats Garantis'}</span></div>
          </div>
          <button className="cta-button premium-button" onClick={scrollToForm}>
            {lang === 'ar' ? 'اختر زيتالجيك الآن' : 'Je choisis Zitalgic Maintenant'}
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

{/* SCIENTIFIC */}
<section id="scientific" className={`scientific ${isVisible.scientific ? 'animate' : ''}`}>
  <div className="container">
    <div className="scientific-section-header">
      <div className="scientific-badge-simple">
        <CheckCircle size={24} />
        <span>{lang === 'ar' ? 'القوة العلمية' : 'Preuve Scientifique'}</span>
      </div>
      <h2>
        <span className="highlight-blue">{lang === 'ar' ? 'العلم في قلب' : 'La Science au'}</span>{' '}
        {lang === 'ar' ? 'تركيبتنا المبتكرة' : 'Cœur de Notre Formule Brevetée'}
      </h2>
      <p className="scientific-description">
        {lang === 'ar'
          ? 'زيتالجيك® ليس مجرد خليط من الزيوت، بل هو ثمرة أبحاث معمقة وخبرة علمية متقدمة.'
          : 'Zitalgic® n\'est pas un simple mélange d\'huiles. C\'est le fruit de recherches approfondies et d\'une expertise scientifique avancée.'}
      </p>
    </div>

    <div className="scientific-image-section">
      <div className="scientific-image-container">
        <img src="/images/labo.webp" alt={lang === 'ar' ? 'مختبر BioEkeel' : 'Laboratoire BioEkeel'} className="scientific-main-image" loading="lazy" decoding="async" />
      </div>
    </div>

    <div className="scientific-cards-container">
      <div className="scientific-cards-row-1">
        <div className="scientific-card-new">
          <div className="scientific-card-icon"><FlaskConical size={32} /></div>
          <h4>{lang === 'ar' ? 'مختبر Authentic Laboratory®' : 'Authentic Laboratory®'}</h4>
          <p>{lang === 'ar' ? 'مختبر مغربي متخصص في تطوير حلول الصحة.' : 'Un laboratoire Marocain spécialisé dans le développement de solutions de santé.'}</p>
        </div>

        <div className="scientific-card-new featured">
          <div className="scientific-card-icon"><Award size={32} /></div>
          <h4>{lang === 'ar' ? 'تركيبة حاصلة على براءة اختراع' : 'Formule Brevetée'}</h4>
          <p>{lang === 'ar' ? 'تركيبة علمية مبتكرة محمية و100٪ مغربية.' : 'Une formule scientifique innovante protégée et 100% Marocaine.'}</p>
        </div>

        <div className="scientific-card-new">
          <div className="scientific-card-icon"><CheckCircle size={32} /></div>
          <h4>{lang === 'ar' ? 'فعالية مضمونة' : 'Efficacité Accrue'}</h4>
          <p>{lang === 'ar' ? '96٪ رضا العملاء حسب دراساتنا الداخلية.' : '96% de satisfaction client selon nos études internes.'}</p>
        </div>
      </div>

      <div className="scientific-cards-row-2">
        <div className="scientific-card-new">
          <div className="scientific-card-icon"><Leaf size={32} /></div>
          <h4>{lang === 'ar' ? 'جودة عالية' : 'Qualité Supérieure'}</h4>
          <p>{lang === 'ar' ? 'مكونات طبيعية نقية مختارة بعناية لفعاليتها.' : 'Des ingrédients naturels purs, soigneusement sélectionnés pour leur efficacité.'}</p>
        </div>

        <div className="scientific-card-new">
          <div className="scientific-card-icon"><Zap size={32} /></div>
          <h4>{lang === 'ar' ? 'خبرة متقدمة' : 'Expertise Avancée'}</h4>
          <p>{lang === 'ar' ? 'أكثر من 15 عامًا من الخبرة في البحث وتطوير المنتجات الطبيعية.' : 'Plus de 15 ans d\'expérience en recherche et développement de produits naturels.'}</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* TESTIMONIALS */}
<section id="testimonials" className={`testimonials ${isVisible.testimonials ? 'animate' : ''}`}>
  <div className="container">
    <div className="testimonials-section-header">
      <div className="testimonials-badge-simple">
        <CheckCircle size={24} />
        <span>{lang === 'ar' ? 'آراء الزبناء' : 'Témoignages Clients'}</span>
      </div>
      <h2>
        {lang === 'ar'
          ? 'وثقوا بنا وشاركوا'
          : 'Ils nous ont fait'}{' '}
        <span className="highlight-green">{lang === 'ar' ? 'تجربتهم' : 'confiance'}</span>
      </h2>
      <p>
        {lang === 'ar'
          ? 'اكتشف شهادات صادقة للعديد من المغاربة الذين استعادوا راحتهم وحركتهم بفضل ®Zitalgic.'
          : 'Découvrez les témoignages authentiques de nos clients marocains qui ont retrouvé leur confort et leur mobilité grâce à Zitalgic®.'}
      </p>
    </div>

    <div className="testimonial-stats">
      <div className="stat-item">
        <div className="stat-number">{counters.clients}+</div>
        <div className="stat-label">{lang === 'ar' ? 'مغاربة راضون' : 'Marocains Satisfaits'}</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">{counters.satisfaction}%</div>
        <div className="stat-label">{lang === 'ar' ? 'نسبة الرضا' : 'Taux de Satisfaction'}</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">{counters.recommendation}%</div>
        <div className="stat-label">{lang === 'ar' ? 'ينصحون أقاربهم' : 'Recommandent à leurs Proches'}</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">{counters.rating.toFixed(1)}/5</div>
        <div className="stat-label">{lang === 'ar' ? 'متوسط التقييم' : 'Note Moyenne'}</div>
      </div>
    </div>

    <div className="testimonials-grid">
      {Object.values(testimonials).map((item, idx) => (
        <div key={idx} className="testimonial-card animated-card">
          <div className="testimonial-quote">
            <div className="quote-icon">"</div>
            <p>{lang === 'ar' ? item.quote_ar : item.quote}</p>
          </div>
          <div className="testimonial-author">
            <div className="author-image">
              <img src={item.img} alt={item.name} loading="lazy" decoding="async" />
              <div className="image-overlay"></div>
            </div>
            <div className="author-info">
              <h4>{item.name}</h4>
              <p>{item.city}</p>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#10B981" color="#10B981" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="final-green-banner">
      <div className="banner-bg-animated">
        <div className="floating-leaf leaf-1"></div>
        <div className="floating-leaf leaf-2"></div>
        <div className="floating-leaf leaf-3"></div>
      </div>

      <div className="banner-content">
        <h3>
          {lang === 'ar' ? 'انضم إلى مجتمع' : 'Rejoignez la communauté'}{' '}
          <span className="brand-glow">®Zitalgic</span>
        </h3>
        <p className="banner-sub">
          {lang === 'ar'
            ? 'آلاف المغاربة غيّروا حياتهم. حان دورك الآن!'
            : 'Des milliers de Marocains ont déjà transformé leur vie. À votre tour !'}
        </p>

        <div className="green-feature-grid">
          <div className="g-feature">
            <div className="icon-ring"><Award className="g-icon" /></div>
            <span>{lang === 'ar' ? 'فعالية مضمونة' : 'Efficacité garantie'}</span>
          </div>
          <div className="g-feature">
            <div className="icon-ring"><Leaf className="g-icon" /></div>
            <span>{lang === 'ar' ? '100٪ طبيعي' : '100 % Naturel'}</span>
          </div>
          <div className="g-feature">
            <div className="icon-ring"><FlaskConical className="g-icon" /></div>
            <span>{lang === 'ar' ? 'تركيبة حاصلة على براءة اختراع' : 'Formule Brevetée'}</span>
          </div>
          <div className="g-feature">
            <div className="icon-ring"><Truck className="g-icon" /></div>
            <span>{lang === 'ar' ? 'توصيل مجاني' : 'Livraison Gratuite'}</span>
          </div>
        </div>

        <button className="giant-green-cta" onClick={scrollToForm}>
          {lang === 'ar' ? 'اختر زيتالجيك الآن' : 'Je choisis Zitalgic Maintenant'}
          <div className="cta-ripple"></div>
        </button>
      </div>
    </div>
  </div>
</section>

{/* ORDER FORM */}
<section
  id="order-form"
  ref={formRef}
  className={`order-form ${isVisible['order-form'] ? 'animate' : ''}`}
>
  <div className="container">
    <div className="section-header">
      <h2 className="form-main-title" style={{ color: 'black' }}>
        {lang === 'ar' ? 'اطلب' : 'Commandez'}{' '}
        <span className="orange-text">Zitalgic®</span>{' '}
        {lang === 'ar' ? 'الآن' : 'maintenant'}
      </h2>
      <p className="form-subtitle">
        {lang === 'ar'
          ? 'املأ النموذج أدناه واستعد راحتك ابتداءً من الغد. الدفع آمن 100٪ عند الاستلام'
          : 'Remplissez le formulaire ci-dessous et retrouvez votre confort dès demain. Paiement 100 % sécurisé à la livraison'}
      </p>
    </div>

    <div className="order-content-modern">
      <form onSubmit={handleSubmit} className="form-card-gray">
        <h3 className="form-title-black">
          {lang === 'ar' ? 'اختر باقتك' : 'Choisissez votre pack'}
        </h3>
        <div className="pack-selector-animated">
          {Object.entries(packs).map(([key, pack]) => {
            const packLabel =
            lang === 'ar'
              ? key === '1-flacon'
                ? 'عبوة واحدة'
                : key === '3-flacons'
                ? 'ثلاثة عبوات  '
                : key === '5-flacons'
                ? 'خمسة عبوات  '
                : ''
              : key === '1-flacon'
              ? '1 Flacon'
              : key === '3-flacons'
              ? '3 Flacons'
              : key === '5-flacons'
              ? '5 Flacons'
              : '';
            return (
              <label
                key={key}
                className={`pack-option-animated ${
                  selectedPack === key ? 'selected-orange' : ''
                }`}
              >
                <input
                  type="radio"
                  name="pack"
                  checked={selectedPack === key}
                  onChange={() => setSelectedPack(key)}
                />
                <div className="pack-visual">
                  <span className="pack-name-black">{packLabel}</span>
                  <div className="pack-price-group">
                    <span className="price-current">
                      {lang === 'ar' ? `${pack.price} درهم` : `${pack.price} DH`}
                    </span>
                    <span className="price-old">
                      {lang === 'ar' ? `${pack.original} درهم` : `${pack.original} DH`}
                    </span>
                    {pack.savings > 0 && (
                      <span className="price-save">
                        {lang === 'ar'
                          ? `وفّر ${pack.savings} درهم`
                          : `Économisez ${pack.savings} DH`}
                      </span>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        <h3 className="form-title-black">{lang === 'ar' ? 'بياناتك' : 'Vos informations'}</h3>
        <div className="input-grid-animated">
<input
  className={`input-gray-border ${formErrors.nom ? 'error' : ''}`}
  name="nom"
  placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
  value={formData.nom}
  onChange={handleInputChange}
  required
/>
{formErrors.nom && <div className="error-message">{formErrors.nom}</div>}

<input
  className={`input-gray-border ${formErrors.telephone ? 'error' : ''}`}
  name="telephone"
  placeholder={lang === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
  value={formData.telephone}
  onChange={handleInputChange}
  required
/>
{formErrors.telephone && <div className="error-message">{formErrors.telephone}</div>}

<input
  className={`input-gray-border ${formErrors.adresse ? 'error' : ''}`}
  name="adresse"
  type="text"
  placeholder={lang === 'ar' ? 'العنوان' : 'Adresse'}
  value={formData.adresse}
  onChange={handleInputChange}
  required
/>
{formErrors.adresse && <div className="error-message">{formErrors.adresse}</div>}

<input
  className={`input-gray-border ${formErrors.ville ? 'error' : ''}`}
  name="ville"
  placeholder={lang === 'ar' ? 'المدينة' : 'Ville'}
  value={formData.ville}
  onChange={handleInputChange}
  required
/>
{formErrors.ville && <div className="error-message">{formErrors.ville}</div>}
        </div>

        <button type="submit" className="submit-btn-orange" disabled={isSubmitting}>
          {isSubmitting
            ? lang === 'ar'
              ? 'جارٍ الإرسال...'
              : 'Envoi...'
            : lang === 'ar'
            ? 'أؤكد طلبي'
            : 'Je confirme ma commande'}
        </button>
      </form>

      <div className="sidebar-animated">
        <div className="summary-card-gray">
          <h3 className="summary-title-black">
            {lang === 'ar' ? 'ملخص الطلب' : 'Résumé de la commande'}
          </h3>
          <div className="summary-item">
            <div>
              <strong className="pack-name-black">
                {lang === 'ar'
                  ? selectedPack === '1-flacon'
                    ? 'عبوة واحدة'
                    : selectedPack === '3-flacons'
                    ? 'ثلاثة عبوات  '
                    : selectedPack === '5-flacons'
                    ? 'خمسة عبوات  '
                    : ''
                  : selectedPack === '1-flacon'
                  ? '1 Flacon'
                  : selectedPack === '3-flacons'
                  ? '3 Flacons'
                  : selectedPack === '5-flacons'
                  ? '5 Flacons'
                  : ''}
              </strong>
              <br />
              <span className="black-text">
                {lang === 'ar'
                  ? `${packs[selectedPack].price} درهم`
                  : `${packs[selectedPack].price} DH`}
              </span>
            </div>
          </div>
          <div className="summary-item">
            <span>{lang === 'ar' ? 'التوصيل 25 درهم' : 'Livraison 25 DH'}</span>
          </div>
          <div className="summary-item">
            <span>
              {lang === 'ar' ? 'المجموع' : 'Total'}:{' '}
              <strong className="price-large">
                {lang === 'ar'
                  ? `${packs[selectedPack].price + 25} درهم`
                  : `${packs[selectedPack].price + 25} DH`}
              </strong>
            </span>
          </div>
        </div>

        <div className="contact-banner-gray">
          <div className="contact-text">
            <span className="contact-title-black">{lang === 'ar' ? 'أسئلة؟' : 'Des Questions ?'}</span>
            <div className="phone-copy-container">
              <span className="contact-phone">{lang === 'ar' ? '00 10 56 53 06' : '06 53 56 10 00'}</span>
              <button type="button" className="copy-btn" onClick={() => copyToClipboard('0653561000')}>
                {copySuccess ? <span className="gray-check">✓</span> : <Copy size={16} className="copy-icon" />}
              </button>
            </div>
            <span className="contact-hours">{lang === 'ar' ? '7 أيام / 9 ص-8 م' : '7j/7 9h-20h'}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



<footer className={`footer ${lang === 'ar' ? 'ar' : ''}`}>
  <div className="container">
    <div className="footer-content">
      {/* Left Section - Zitalgic Info */}
      <div className="footer-section">
        <div className="logo">
          <h1>Zitalgic®</h1>
          <p>{lang === 'ar' ? 'راحة المفاصل والعضلات والأعصاب' : 'Confort Articulaire, musculaire et Nerveux'}</p>
        </div>
        <p>{lang === 'ar' ? 'منتج مطوّر بواسطة Authentic Laboratory' : 'Produit Développé par Authentic Laboratory'}</p>
      </div>
      
      {/* Right Section - Contact Info */}
      <div className="footer-section">
        <h3>{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</h3>
        <p>
          <Phone className="icon" /> 
          <span className="phone-number">06 53 56 10 00</span>
        </p>
        <p>{lang === 'ar' ? 'متاح 7 أيام في الأسبوع من 9 ص إلى 8 م' : 'Disponible 7j/7 de 9h à 20h'}</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2023 Zitalgic. {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'Tous droits réservés'}</p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default App;