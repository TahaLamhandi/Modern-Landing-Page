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
    heroDesc: 'Soulagez vos douleurs articulaires, musculaires et nerveuses en seulement 15-30 minutes avec notre formule 100 % naturelle.',
    choosePack: 'Choisir votre pack',
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
    headerTitle: 'زيتالجيك®',
    headerSub: 'راحة المفاصل والعضلات والأعصاب',
    orderNow: 'اطلب الآن',

    // Hero
    heroTitle: 'زيتالجيك®',
    heroSub: 'قُل وداعًا للألم.. بشكل طبيعي',
    heroDesc: 'تخلص من آلام المفاصل والعضلات والأعصاب في 15-30 دقيقة فقط مع تركيبتنا 100٪ طبيعية.',
    choosePack: 'اختر باقتك',
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

// 1.  NEW  LanguageSwitcher (drop-in replacement)
const LanguageSwitcher = ({ lang, setLang }) => (
  <div className="modern-lang-switch">
    <button
      className={`lang-btn ${lang === 'fr' ? 'active' : ''}`}
      onClick={() => setLang('fr')}
    >
      FR
    </button>
    <div className="lang-sep"></div>
    <button
      className={`lang-btn ${lang === 'ar' ? 'active' : ''}`}
      onClick={() => setLang('ar')}
    >
      ع
    </button>
  </div>
);

const App = ({ onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState('1-flacon');
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    ville: '',
  });
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
    "/images/Miniature 01.png",
    "/images/Miniature 02.png",
    "/images/Miniature 03.png",
    "/images/Miniature 04.png",
    "/images/Miniature 05.png",
    "/images/Miniature 06.png",
    "/images/Miniature 07.png",
    "/images/Miniature 08.png",
    "/images/Miniature 09.png",
    "/images/Miniature 10.png",
    "/images/Miniature 11.png",
    "/images/Miniature 12.png",
    "/images/Miniature 13.png",
    "/images/Miniature 14.png",
    "/images/Miniature 15.png"
  ];

  // Arabic image files
const productImagesAR = [
  "/images/Miniature 01 AR.png",
  "/images/Miniature 02 AR.png",
  "/images/Miniature 03 AR.png",
  "/images/Miniature 04 AR.png",
  "/images/Miniature 05 AR.png",
  "/images/Miniature 06 AR.png",
  "/images/Miniature 07 AR.png",
  "/images/Miniature 08 AR.png",
  "/images/Miniature 09 AR.png",
  "/images/Miniature 10 AR.png",
  "/images/Miniature 11 AR.png",
  "/images/Miniature 12 AR.png",
  "/images/Miniature 13 AR.png",
  "/images/Miniature 14 AR.png",
  "/images/Miniature 15 AR.png"
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
        satisfaction: 94,
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

  const faqData = [
    {
      question: "Comment utiliser Zitalgic® ?",
      question_ar: "كيفية استخدام زيتالجيك®؟",
      answer: "Appliquez quelques gouttes de Zitalgic® sur la zone douloureuse et massez délicatement. L'effet se ressent généralement dans les 15-30 minutes. Utilisez 2-3 fois par jour selon vos besoins.",
      answer_ar: "ضع بضع قطرات من زيتالجيك® على المنطقة المؤلمة ودلك بلطف. يظهر التأثير عادةً خلال 15-30 دقيقة. استخدم 2-3 مرات يومياً حسب الحاجة."
    },
    {
      question: "Zitalgic® convient-il à tous les types de douleurs ?",
      question_ar: "هل زيتالجيك® مناسب لجميع أنواع الألم؟",
      answer: "Oui, Zitalgic® est efficace contre les douleurs articulaires, musculaires et nerveuses. Sa formule brevetée agit sur l'inflammation et procure un soulagement ciblé pour différents types de douleurs chroniques.",
      answer_ar: "نعم، زيتالجيك® فعال ضد آلام المفاصل والعضلات والأعصاب. تركيبته المرخّصة تعمل على الالتهاب وتوفّر راحة موجّهة لأنواع مختلفة من الألم المزمن."
    },
    {
      question: "Y a-t-il des effets secondaires ?",
      question_ar: "هل توجد آثار جانبية؟",
      answer: "Zitalgic® est 100% naturel et ne présente aucun effet secondaire connu. Cependant, nous recommandons un test sur une petite zone de peau avant la première utilisation, surtout si vous avez des allergies connues aux huiles essentielles.",
      answer_ar: "زيتالجيك® طبيعي 100٪ ولا يُعرف له أي آثار جانبية. مع ذلك، نوصي باختبار على مساحة صغيرة من الجلد قبل أول استخدام، خاصةً إذا كنت تعاني من حساسية معروفة للزيوت الأساسية."
    },
    {
      question: "Combien de temps dure un flacon de 30ml ?",
      question_ar: "كم يدوم عبوة 30 مل؟",
      answer: "Un flacon de 30ml dure environ 10-15 jours avec une utilisation régulière (2-3 applications par jour). Grâce à sa formule concentrée, quelques gouttes suffisent pour chaque application.",
      answer_ar: "عبوة 30 مل تكفي حوالي 10-15 يوم مع الاستخدام المنتظم (2-3 مرات يومياً). بفضل التركيبة المركزة، تكفي بضع قطرات في كل مرة."
    },
    {
      question: "Puis-je utiliser Zitalgic® avec d'autres médicaments ?",
      question_ar: "هل يمكنني استخدام زيتالجيك® مع أدوية أخرى؟",
      answer: "Zitalgic® étant un produit naturel à usage externe, il n'y a généralement pas d'interactions médicamenteuses. Cependant, consultez votre médecin si vous suivez un traitement spécifique.",
      answer_ar: "بما أن زيتالجيك® منتج طبيعي للاستخدام الخارجي، فعادةً لا توجد تداخلات دوائية. مع ذلك، استشر طبيبك إذا كنت تتبع علاجاً محدداً."
    },
    {
      question: "Livrez-vous partout au Maroc ?",
      question_ar: "هل تُوصلون في جميع أنحاء المغرب؟",
      answer: "Oui, nous livrons gratuitement dans tout le Maroc. La livraison prend généralement 24-48h dans les grandes villes et 2-4 jours dans les zones rurales. Paiement à la livraison disponible.",
      answer_ar: "نعم، نوصل مجاناً في جميع أنحاء المغرب. التوصيل يستغرق عادةً 24-48 ساعة في المدن الكبرى و2-4 أيام في المناطق الريفية. الدفع عند الاستلام متاح."
    },
    {
      question: "Que faire si le produit ne me convient pas ?",
      question_ar: "ماذا لو لم يناسبني المنتج؟",
      answer: "Nous offrons une garantie satisfait ou remboursé de 30 jours. Si Zitalgic® ne vous convient pas, contactez notre service client pour un remboursement complet, sans questions.",
      answer_ar: "نقدم ضمان رضا أو استرداد الأموال خلال 30 يوم. إذا لم يناسبك زيتالجيك®، تواصل مع خدمة العملاء لاسترداد كامل، بدون أسئلة."
    },
    {
      question: "Zitalgic® est-il certifié ?",
      question_ar: "هل زيتالجيك® معتمد؟",
      answer: "Oui, Zitalgic® est développé par BioEkeel Laboratory, un laboratoire certifié au Maroc. Notre formule est brevetée et tous nos produits respectent les standards internationaux de qualité.",
      answer_ar: "نعم، زيتالجيك® طوّره BioEkeel Laboratory، مختبر معتمد في المغرب. تركيبتنا مرخّصة وجميع منتجاتنا تلتزم بالمعايير الدولية للجودة."
    }
  ];

  const packs = {
    '1-flacon': { price: 220, original: 250, savings: 30, quantity: '1 Flacon (30ml)' },
    '3-flacons': { price: 600, original: 750, savings: 150, quantity: '3 Flacons (3x30ml)' },
    '5-flacons': { price: 900, original: 1250, savings: 350, quantity: '5 Flacons (5x30ml)' },
  };

  const audioTestimonials = [
    {
      name: 'Fatima, 52 ans',
      name_ar: 'فاطمة، 52 سنة',
      location: 'Casablanca',
      location_ar: 'الدار البيضاء',
      audioSrc: '/audios/testimonial-fatima.mp3',
    },
    {
      name: 'Mohammed, 45 ans',
      name_ar: 'محمد، 45 سنة',
      location: 'Rabat',
      location_ar: 'الرباط',
      audioSrc: '/audios/testimonial-mohammed.mp3',
    },
    {
      name: 'Amina, 60 ans',
      name_ar: 'أمينة، 60 سنة',
      location: 'Marrakech',
      location_ar: 'مراكش',
      audioSrc: '/audios/testimonial-amina.mp3',
    }
  ];

  useEffect(() => {
    const sections = ['hero', 'problem', 'solution', 'composition', 'scientific', 'benefits', 'testimonials', 'audio-testimonials', 'pricing', 'order-form', 'faq', 'how-it-works', 'why-choose'];
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const formspreeResponse = await fetch('https://formspree.io/f/xpwlgwag', {
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

  const handlePlayAudio = (index) => {
    if (!audioElements[index]) {
      const audio = new Audio(process.env.PUBLIC_URL + audioTestimonials[index].audioSrc);
      setAudioElements((prev) => ({ ...prev, [index]: audio }));
    }
    const audio = audioElements[index] || new Audio(process.env.PUBLIC_URL + audioTestimonials[index].audioSrc);
    if (isPlaying === index) {
      audio.pause();
      setIsPlaying(null);
    } else {
      if (isPlaying !== null && audioElements[isPlaying]) {
        audioElements[isPlaying].pause();
      }
      audio.play();
      setIsPlaying(index);
      audio.onended = () => setIsPlaying(null);
    }
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
    '1-flacon': '/images/pack-1-flacons.png',
    '3-flacons': '/images/pack-3-flacons.png',
    '5-flacons': '/images/pack-5-flacons.png'
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

const [lang, setLang] = useState('fr');    // NEW
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
                  <button className="popup-button" onClick={closePopup}>
                    {lang === 'ar' ? 'إغلاق' : 'Fermer'}
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
                  <button className="popup-button" onClick={closePopup}>
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
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>{t.headerTitle}</h1>
            <p>{t.headerSub}</p>
          </div>
          <LanguageSwitcher lang={lang} setLang={setLang} /> {/* NEW */}
          <div className="header-cta">
            <button className="cta-button" onClick={scrollToForm}>{t.orderNow}</button>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* HERO  -  replaced static text with t.*               */}
      {/* ---------------------------------------------------- */}
<section id="hero" className={`hero ${isVisible.hero ? 'animate' : ''}`}>
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
          <div className="hero-content">
            {/* LEFT GALLERY */}
            <div className="hero-gallery-section">
              <div className="gallery-container-vertical">
                <div className="vertical-thumbnails-container">
                  <button
                    className="nav-arrow-vertical nav-up"
                    onClick={() => scrollThumbnails('up')}
                  >
                    <ChevronUp size={20} />
                  </button>

                  <div className="vertical-thumbnails-wrapper" ref={thumbnailsRef}>
                  {(lang === 'ar' ? productImagesAR : productImages).map((img, idx) => (
                    <div
                      key={idx}
                      className={`vertical-thumbnail-item ${selectedImage === idx ? 'active' : ''}`}
                      onClick={() => handleImageChange(idx)}
                    >
                      <img src={img} alt={`Zitalgic ${idx + 1}`} />
                    </div>
                  ))}
                  </div>

                  <button
                    className="nav-arrow-vertical nav-down"
                    onClick={() => scrollThumbnails('down')}
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>

                <div className="main-image-wrapper-vertical">
                  <img
                    src={(lang === 'ar' ? productImagesAR : productImages)[selectedImage]}
                    alt="ZITALGIC"
                    className={`hero-main-image-vertical ${imageTransition ? 'transitioning' : ''}`}
                    onClick={() => handleImageChange((selectedImage + 1) % (lang === 'ar' ? productImagesAR : productImages).length)}
                  />
                  <div className="image-indicators-vertical">
                  {(lang === 'ar' ? productImagesAR : productImages).map((_, idx) => (
                    <button
                      key={idx}
                      className={`indicator-vertical ${selectedImage === idx ? 'active' : ''}`}
                      onClick={() => handleImageChange(idx)}
                    />
                  ))}
                  </div>
                </div>
              </div>

              <div className="quick-info-grid">
                <div className="info-card">
                  <div className="info-icon"><Truck size={20} /></div>
                  <span>{lang === 'ar' ? 'توصيل خلال 24-48 ساعة' : 'Livraison 24-48h'}</span>
                </div>
                <div className="info-card">
                  <div className="info-icon"><MapPin size={20} /></div>
                  <span>{lang === 'ar' ? 'في جميع أنحاء المغرب' : 'Partout au Maroc'}</span>
                </div>
                <div className="info-card">
                  <div className="info-icon"><CreditCard size={20} /></div>
                  <span>{lang === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}</span>
                </div>
                <div className="info-card">
                  <div className="info-icon"><Leaf size={20} /></div>
                  <span>{lang === 'ar' ? '100٪ طبيعي' : '100% Naturel'}</span>
                </div>
              </div>
            </div>

            {/* RIGHT INFO */}
            <div className="hero-info-section">
              <h1 className="hero-title">{t.heroTitle}</h1>
              <p className="hero-subtitle">{t.heroSub}</p>
              <div className="hero-description">{t.heroDesc}</div>

              <div className="rating-section">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#f97316" color="#f97316" />
                  ))}
                </div>
                <span className="rating-text">
                  {lang === 'ar' ? '4.8/5 من 3600+ تقييم' : '4.8/5 (3,600+ avis)'}
                </span>
              </div>

              <div className="benefits-list">
                <div className="benefit-item">
                  <CheckCircle size={18} color="#f97316" />
                  <span>
                    {lang === 'ar'
                      ? 'يسكّن بسرعة آلام المفاصل والعضلات والأعصاب.'
                      : 'Soulage rapidement les douleurs articulaires, musculaires et nerveuses.'}
                  </span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={18} color="#f97316" />
                  <span>
                    {lang === 'ar'
                      ? 'يقلل الالتهاب بعمق لراحة طويلة الأمد.'
                      : 'Réduit l\'inflammation en profondeur pour un confort durable'}
                  </span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={18} color="#f97316" />
                  <span>
                    {lang === 'ar'
                      ? 'يرخّي التوتر ويزيد مرونة العضلات.'
                      : 'Relâche les tensions et assouplit les muscles.'}
                  </span>
                </div>
                <div className="benefit-item">
                  <CheckCircle size={18} color="#f97316" />
                  <span>
                    {lang === 'ar'
                      ? 'يساعد في منع وعلاج التقلصات والتشنجات.'
                      : 'Aide à prévenir et à traiter les courbatures et les Crampes.'}
                  </span>
                </div>
              </div>

              <div className="package-selection">
                <h3 className="package-title">{t.choosePack}</h3>
                <div className="package-list">
                  {Object.entries(packs).map(([key, pack]) => (
                    <div key={key} className="package-item">
                      <label className="package-label">
                        <input
                          type="radio"
                          name="package"
                          checked={selectedPack === key}
                          onChange={() => setSelectedPack(key)}
                          className="package-radio"
                        />
                        <span className={`radio-custom ${selectedPack === key ? 'selected' : ''}`}></span>
                        <div className="package-content">
                          <div className="package-name">{pack.quantity}</div>
                          <div className="package-pricing">
                            <span className="package-price">{pack.price} DH</span>
                            <span className="package-old">{pack.original} DH</span>
                            {pack.savings > 0 && (
                              <span className="package-save-black">
                                {lang === 'ar' ? `توفير ${pack.savings} درهم` : `Économisez ${pack.savings} DH`}
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
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
                  <span>{lang === 'ar' ? 'فعالية مضمونة' : 'Efficacité garantie'}</span>
                </div>
                <div className="trust-item">
                  <Users size={16} />
                  <span>{lang === 'ar' ? '3600+ عميل راضٍ' : '3,600+ clients satisfaits'}</span>
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
        <span>{lang === 'ar' ? 'آراء العملاء' : 'Témoignages Client'}</span>
      </div>

      <h2 className="audio-testimonials-title green-title-underline">
        {lang === 'ar' ? 'استمع إلى قصصهم عن' : 'Écoutez leurs histoires de'}{' '}
        <span className="green-text">{lang === 'ar' ? 'الراحة' : 'Soulagement'}</span>
      </h2>

      <p className="section-desc">
        {lang === 'ar'
          ? 'عملاء زيتالجيك® يشهدون برضاهم وينصحون الآخرين بحلنا الطبيعي.'
          : 'Les utilisateurs de Zitalgic® témoignent de leur satisfaction et recommandent naturellement notre solution autour d\'eux.'}
      </p>
    </div>

    <div className="audio-grid">
    {audioTestimonials.map((testimonial, index) => (
  <div key={index} className="audio-card">
    <div className="audio-player-container">
      <div className="audio-player">
        <div className="audio-controls">
          <button
            className={`play-pause-btn ${isPlaying === index ? 'playing' : ''}`}
            onClick={() => handlePlayAudio(index)}
          >
            {isPlaying === index ? <Pause className="play-icon" /> : <Play className="play-icon" />}
          </button>

          <div className="progress-container">
            <div className="progress-bar"></div>
          </div>

          <div className="time-display">0:00</div>
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
        <h3>{lang === 'ar' ? 'انضم إلى مجتمع زيتالجيك®' : 'Rejoignez la communauté Zitalgic®'}</h3>
        <p>{lang === 'ar' ? 'آلاف المغاربة غيّروا حياتهم. حان دورك الآن!' : 'Des milliers de Marocains ont déjà transformé leur vie. À votre tour !'}</p>
        <button className="audio-section-cta-button" onClick={scrollToForm}>
          {lang === 'ar' ? 'اختر زيتالجيك الآن' : 'Je choisis Zitalgic Maintenant'}
        </button>
      </div>
    </div>
  </div>
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
        <img src="/images/zitalgic_feel_better.png" alt={lang === 'ar' ? 'شخص يعاني من الألم' : 'Person experiencing pain'} />
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
            ? 'جربت الكثير من المنتجات... لا شيء يعمل فعلاً. أريد فقط استعادة حركتي القديمة وأستمتع بعائلتي بدون ألم مستمر.'
            : 'J\'ai essayé tellement de produits différents... Rien ne marche vraiment. Je veux juste retrouver ma mobilité d\'avant et pouvoir profiter de ma famille sans ces douleurs constantes.'}
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
        <span className="black-text">{lang === 'ar' ? 'هو حليفك الطبيعي لراحة' : 'est votre allié naturel pour un'}</span>{' '}
        <span className="orange-text">{lang === 'ar' ? 'فعّالة' : 'apaisement efficace'}</span>
      </h2>
      <p className="solution-desc">
        {lang === 'ar'
          ? 'تركيبة ثورية طورتها Authentic Laboratory، تجمع بين التقليد والابتكار لتقدم لك أفضل ما في الطبيعة.'
          : 'Une formule révolutionnaire développée par Authentic Laboratory, alliant tradition et innovation pour vous offrir le meilleur de la nature.'}
      </p>
    </div>

    <div className="solution-content">
      <div className="solution-image">
        <img src="/images/dds.png" alt={lang === 'ar' ? 'تطبيق زيتالجيك' : 'Application de Zitalgic'} />
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
              {lang === 'ar'
                ? 'يرخّي التوتر ويزيد مرونة العضلات.'
                : 'Relâche les tensions et assouplit les muscles.'}
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
              {lang === 'ar'
                ? 'مزيج من الزيوت الأساسية النقية، صديقة للجسم.'
                : 'Synergie d\'huiles essentielles pures, respectueuses de l\'organisme.'}
            </p>
          </div>

          <div className="solution-card">
            <Award size={28} className="solution-card-icon formula-icon" />
            <h3>{lang === 'ar' ? 'تركيبة مرخّصة' : 'Formule Brevetée'}</h3>
            <p>
              {lang === 'ar'
                ? 'ثمرة الابتكار العلمي وخبرة المختبر.'
                : 'Fruit d\'une innovation scientifique et du savoir-faire du laboratoire.'}
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
        <span>{lang === 'ar' ? 'عرض محدود' : 'Offre limitée'}</span>
      </div>
      <h2 className="pricing-title">
        <span className="orange-text">{lang === 'ar' ? 'استفد' : 'Profitez'}</span>{' '}
        <span className="black-text">{lang === 'ar' ? 'من عرضنا الحصري' : 'de notre Offre Exclusive'}</span>{' '}
        <span className="orange-text">Zitalgic®</span>
      </h2>
      <p className="pricing-desc">
        {lang === 'ar'
          ? 'الطلب مرتفع والمخزون ينفد بسرعة، استغل العرض واحصل على باقتك من زيتالجيك®.'
          : 'La demande est élevée et les stocks s\'épuisent rapidement, profitez de cette offre et commandez rapidement votre Pack de Zitalgic®.'}
      </p>
    </div>

    <div className="pricing-grid">
      {Object.entries(packs).map(([key, pack]) => (
        <div key={key} className={`pricing-card ${selectedPack === key ? 'selected' : ''}`}>
          <div className="pricing-image-container">
            <img src={pricingImages[key]} alt={`Pack ${pack.quantity}`} />
            {key === '3-flacons' && (
              <div className="popular-badge">{lang === 'ar' ? 'الأكثر مبيعًا' : 'le plus populaire'}</div>
            )}
          </div>

          <div className="pricing-header">
            <h3>{pack.quantity}</h3>
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
            <span className="original-price">{pack.original} DH</span>
            <span className="current-price">{pack.price} DH</span>
            {pack.savings > 0 && (
              <span className="savings">
                {lang === 'ar' ? `وفّر ${pack.savings} درهم` : `Économisez ${pack.savings} DH`}
              </span>
            )}
          </div>

          <button className="pricing-button" onClick={() => setSelectedPack(key)}>
            {lang === 'ar' ? 'اختر هذا العرض' : 'choisir cette offre'}
          </button>
        </div>
      ))}
    </div>

    <div className="urgent-cta-banner">
      <div className="container">
        <div className="urgent-cta-content">
          <h3>{lang === 'ar' ? 'لا تفوّت الفرصة!' : 'Ne Laissez Pas Passer Cette Chance !'}</h3>
          <p>
            {lang === 'ar'
              ? 'هذا العرض الاستثنائي لن يدوم. اطلب الآن واحصل على راحتك غداً!'
              : 'Cette offre exceptionnelle ne durera pas. Commandez maintenant et retrouvez votre confort dès demain !'}
          </p>
          <button className="cta-button" onClick={scrollToForm}>
            {lang === 'ar' ? 'اطلب الآن' : 'Commander maintenant'}
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
          ? 'اكتشف مزايا حلنا الطبيعي مقارنة بالبدائل التقليدية'
          : 'Découvrez les avantages de notre solution naturelle comparée aux alternatives traditionnelles'}
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
          <li>✓ {lang === 'ar' ? 'تركيبة مرخّصة مثبتة علمياً' : 'Formule brevetée scientifiquement prouvée'}</li>
          <li>✓ {lang === 'ar' ? 'راحة سريعة' : 'Soulagement rapide'}</li>
          <li>✓ {lang === 'ar' ? '100٪ طبيعي – مزيج زيوت أساسية' : '100% naturel - Synergie d\'huiles essentielles'}</li>
          <li>✓ {lang === 'ar' ? 'لا آثار جانبية' : 'Aucun effet secondaire'}</li>
          <li>✓ {lang === 'ar' ? 'عمل موجّه: مفصلي، عضلي، عصبي' : 'Action ciblée : Articulaire, Musculaire & Nerveux'}</li>
          <li>✓ {lang === 'ar' ? 'تركيز عالي 30 مل – كفاءة عالية' : 'Format 30ml concentré - Haute efficacité'}</li>
          <li>✓ {lang === 'ar' ? 'موصى به من المحترفين' : 'Recommandé par les professionnels'}</li>
          <li>✓ {lang === 'ar' ? 'ضمان الرضا أو استرداد المال' : 'Garantie satisfait ou remboursé'}</li>
        </ul>
      </div>

      <div className="comparison-column home-remedies-column">
        <div className="comparison-header">
          <div className="warning-icon">⚠️</div>
          <h3>{lang === 'ar' ? 'العلاجات المنزلية' : 'Remèdes Maison'}</h3>
        </div>
        <ul className="comparison-features">
          <li>⚠️ {lang === 'ar' ? 'فعالية محدودة وغير متوقعة' : 'Efficacité limitée et imprévisible'}</li>
          <li>⛔ {lang === 'ar' ? 'راحة مؤقتة فقط' : 'Soulagement temporaire seulement'}</li>
          <li>⛔ {lang === 'ar' ? 'مكونات غير موحّدة' : 'Ingrédients non standardisés'}</li>
          <li>⚠️ {lang === 'ar' ? 'خطر الحساسية أو التهيج' : 'Risque d\'allergies ou irritations'}</li>
          <li>⛔ {lang === 'ar' ? 'عمل عام غير موجّه' : 'Action générale non ciblée'}</li>
          <li>⛔ {lang === 'ar' ? 'تحضير طويل وممل' : 'Préparation longue et fastidieuse'}</li>
          <li>⛔ {lang === 'ar' ? 'بلا توثيق علمي' : 'Pas de validation scientifique'}</li>
          <li>⛔ {lang === 'ar' ? 'بلا ضمان للنتائج' : 'Aucune garantie de résultat'}</li>
        </ul>
      </div>

      <div className="comparison-column chemical-column">
        <div className="comparison-header">
          <div className="stop-icon">⛔</div>
          <h3>{lang === 'ar' ? 'العلاجات الكيميائية' : 'Traitements Chimiques'}</h3>
        </div>
        <ul className="comparison-features">
          <li>⛔ {lang === 'ar' ? 'آثار جانبية متعددة' : 'Effets secondaires nombreux'}</li>
          <li>⚠️ {lang === 'ar' ? 'راحة مع خطر على المعدة' : 'Soulagement mais risques pour l\'estomac'}</li>
          <li>⛔ {lang === 'ar' ? 'مواد كيميائية صناعية' : 'Substances chimiques synthétiques'}</li>
          <li>⛔ {lang === 'ar' ? 'إمكانية الإدمان' : 'Accoutumance possible'}</li>
          <li>⛔ {lang === 'ar' ? 'يُخفي الأعراض بدون علاج' : 'Masque les symptômes sans traiter'}</li>
          <li>⛔ {lang === 'ar' ? 'تكلفة عالية على المدى الطويل' : 'Coût élevé sur le long terme'}</li>
          <li>⛔ {lang === 'ar' ? 'موانع استعمال متعددة' : 'Contre-indications multiples'}</li>
          <li>⚠️ {lang === 'ar' ? 'مراقبة طبية إجبارية' : 'Surveillance médicale obligatoire'}</li>
        </ul>
      </div>
    </div>

    <div className="beautiful-choice-cta">
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
          <p>{lang === 'ar' ? 'زيتالجيك يجمع بين فعالية العلم الحديث ونعومة الطبيعة' : 'Zitalgic combine l\'efficacité de la science moderne avec la douceur de la nature'}</p>
          <div className="choice-benefits">
            <div className="choice-benefit"><Zap size={20} /><span>{lang === 'ar' ? 'فعالية علمية' : 'Efficacité Scientifique'}</span></div>
            <div className="choice-benefit"><Leaf size={20} /><span>{lang === 'ar' ? 'نعومة طبيعية' : 'Douceur Naturelle'}</span></div>
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
        <span>{lang === 'ar' ? 'دليل علمي' : 'Preuve Scientifique'}</span>
      </div>
      <h2>
        <span className="highlight-blue">{lang === 'ar' ? 'العلم في قلب' : 'La Science au'}</span>{' '}
        {lang === 'ar' ? 'تركيبتنا المرخّصة' : 'Cœur de Notre Formule Brevetée'}
      </h2>
      <p className="scientific-description">
        {lang === 'ar'
          ? 'زيتالجيك® ليس مجرد خليط من الزيوت، بل هو ثمرة أبحاث معمقة وخبرة علمية متقدمة.'
          : 'Zitalgic® n\'est pas un simple mélange d\'huiles. C\'est le fruit de recherches approfondies et d\'une expertise scientifique avancée.'}
      </p>
    </div>

    <div className="scientific-image-section">
      <div className="scientific-image-container">
        <img src="/images/labo.jpg" alt={lang === 'ar' ? 'مختبر BioEkeel' : 'Laboratoire BioEkeel'} className="scientific-main-image" />
      </div>
    </div>

    <div className="scientific-cards-container">
      <div className="scientific-cards-row-1">
        <div className="scientific-card-new">
          <div className="scientific-card-icon"><FlaskConical size={32} /></div>
          <h4>{lang === 'ar' ? 'مختبر أصيل' : 'Authentic Laboratory'}</h4>
          <p>{lang === 'ar' ? 'مختبر مغربي متخصص في تطوير حلول الصحة.' : 'Un laboratoire Marocain spécialisé dans le développement de solutions de santé.'}</p>
        </div>

        <div className="scientific-card-new featured">
          <div className="scientific-card-icon"><Award size={32} /></div>
          <h4>{lang === 'ar' ? 'تركيبة مرخّصة' : 'Formule Brevetée'}</h4>
          <p>{lang === 'ar' ? 'تركيبة علمية مبتكرة محمية و100٪ مغربية.' : 'Une formule scientifique innovante protégée et 100% Marocaine.'}</p>
        </div>

        <div className="scientific-card-new">
          <div className="scientific-card-icon"><CheckCircle size={32} /></div>
          <h4>{lang === 'ar' ? 'فعالية مثبتة' : 'Efficacité Accrue'}</h4>
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
        <span>{lang === 'ar' ? 'آراء العملاء' : 'Témoignages Clients'}</span>
      </div>
      <h2>
        {lang === 'ar'
          ? 'وثقوا بنا وشاركوا'
          : 'Ils nous ont fait'}{' '}
        <span className="highlight-green">{lang === 'ar' ? 'تجربتهم' : 'confiance'}</span>
      </h2>
      <p>
        {lang === 'ar'
          ? 'اكتشف شهادات صادقة من عملائنا المغاربة الذين استعادوا راحتهم وحركتهم بفضل زيتالجيك®.'
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
              <img src={item.img} alt={item.name} />
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
          <span className="brand-glow">Zitalgic®</span>
        </h3>
        <p className="banner-sub">
          {lang === 'ar'
            ? 'آلاف المغاربة غيّروا حياتهم. حان دورك الآن!'
            : 'Des milliers de Marocains ont déjà transformé leur vie. À votre tour !'}
        </p>

        <div className="green-feature-grid">
          <div className="g-feature">
            <div className="icon-ring"><Award className="g-icon" /></div>
            <span>{lang === 'ar' ? 'رائد في المغرب' : 'Leader au Maroc'}</span>
          </div>
          <div className="g-feature">
            <div className="icon-ring"><Leaf className="g-icon" /></div>
            <span>{lang === 'ar' ? '100٪ طبيعي' : '100 % Naturel'}</span>
          </div>
          <div className="g-feature">
            <div className="icon-ring"><FlaskConical className="g-icon" /></div>
            <span>{lang === 'ar' ? 'تركيبة مرخّصة' : 'Formule Brevetée'}</span>
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
<section id="order-form" ref={formRef} className={`order-form ${isVisible['order-form'] ? 'animate' : ''}`}>
  <div className="container">
    <div className="section-header">
      <h2 className="form-main-title" style={{ color: 'black' }}>
        {lang === 'ar' ? 'اطلب' : 'Commandez'}{' '}
        <span className="orange-text">Zitalgic®</span> {lang === 'ar' ? 'الآن' : 'maintenant'}
      </h2>
      <p className="form-subtitle">{lang === 'ar' ? 'املأ النموذج أدناه واستعد راحتك ابتداءً من الغد. الدفع آمن 100٪ عند الاستلام' : 'Remplissez le formulaire ci-dessous et retrouver votre confort dès demain. Paiement 100 % sécurisé à la livraison'}</p>
    </div>

    <div className="order-content-modern">
      <form onSubmit={handleSubmit} className="form-card-gray">
        <h3 className="form-title-black">{lang === 'ar' ? 'اختر باقتك' : 'Choisissez votre pack'}</h3>
        <div className="pack-selector-animated">
          {Object.entries(packs).map(([key, pack]) => (
            <label key={key} className={`pack-option-animated ${selectedPack === key ? 'selected-orange' : ''}`}>
              <input
                type="radio"
                name="pack"
                checked={selectedPack === key}
                onChange={() => setSelectedPack(key)}
              />
              <div className="pack-visual">
                <span className="pack-name-black">{pack.quantity}</span>
                <div className="pack-price-group">
                  <span className="price-current">{pack.price} DH</span>
                  <span className="price-old">{pack.original} DH</span>
                  {pack.savings > 0 && (
                    <span className="price-save">
                      {lang === 'ar' ? `وفّر ${pack.savings} درهم` : `économisez ${pack.savings} DH`}
                    </span>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>

        <h3 className="form-title-black">{lang === 'ar' ? 'بياناتك' : 'Vos informations'}</h3>
        <div className="input-grid-animated">
          <input
            className="input-gray-border"
            name="nom"
            placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
            value={formData.nom}
            onChange={handleInputChange}
            required
          />
          <input
            className="input-gray-border"
            name="telephone"
            placeholder={lang === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
            value={formData.telephone}
            onChange={handleInputChange}
            required
            pattern="[0-9]{10}"
          />
          <input
            className="input-gray-border"
            name="adresse"
            type="text"
            placeholder={lang === 'ar' ? 'العنوان' : 'Adresse'}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="input-gray-border"
            name="ville"
            placeholder={lang === 'ar' ? 'المدينة' : 'Ville'}
            value={formData.ville}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn-orange" disabled={isSubmitting}>
          {isSubmitting ? (lang === 'ar' ? 'جارٍ الإرسال...' : 'Envoi...') : (lang === 'ar' ? 'أؤكد طلبي' : 'Je confirme ma commande')}
        </button>
      </form>

      <div className="sidebar-animated">
        <div className="summary-card-gray">
          <h3 className="summary-title-black">{lang === 'ar' ? 'ملخص الطلب' : 'Résumé de la commande'}</h3>
          <div className="summary-item">
            <div>
              <strong className="pack-name-black">{packs[selectedPack].quantity}</strong>
              <br />
              <span className="price-large">{packs[selectedPack].price + 25} DH</span>
            </div>
          </div>
          {packs[selectedPack].savings > 0 && (
            <div className="summary-item">
              <span>{lang === 'ar' ? 'توفّر' : 'Économisé'}: <strong>{packs[selectedPack].savings} DH</strong></span>
            </div>
          )}
          <div className="summary-item">
            <span>{lang === 'ar' ? 'التوصيل 25 درهم' : 'Livraison 25DH'}</span>
          </div>
        </div>

        <div className="contact-banner-gray">
          <div className="contact-text">
            <span className="contact-title-black">{lang === 'ar' ? 'أسئلة؟' : 'Des Questions ?'}</span>
            <div className="phone-copy-container">
            <span className="contact-phone">
              {lang === 'ar' ? '00 10 56 53 06' : '06 53 56 10 00'}
            </span>
              <button type="button" className="copy-btn" onClick={() => copyToClipboard('0653561000')}>
                {copySuccess ? <span className="gray-check">✓</span> : <Copy size={16} className="copy-icon" />}
              </button>
            </div>
            <span className="contact-hours">{lang === 'ar' ? '7 أيام / 9 ص-8 م' : '7j/7j 9h-20h'}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* FAQ */}
<section id="faq" className={`faq ${isVisible.faq ? 'animate' : ''}`}>
  <div className="container">
    <div className="section-header">
      <h2>{lang === 'ar' ? 'الأسئلة الشائعة' : 'Questions fréquentes'}</h2>
      <p>{lang === 'ar' ? 'أجوبة لأكثر الأسئلة تكراراً حول زيتالجيك®' : 'Trouvez les réponses à vos questions sur Zitalgic®'}</p>
    </div>

    <div className="faq-list">
      {faqData.map((faq, index) => (
        <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
          <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
            {lang === 'ar' ? faq.question_ar : faq.question}
            <ChevronDown className={`faq-icon ${openFaq === index ? 'open' : ''}`} />
          </button>
          {openFaq === index && (
            <div className="faq-answer">
              <p>{lang === 'ar' ? faq.answer_ar : faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

<footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <h1>{t.headerTitle}</h1>
                <p>{lang === 'ar' ? 'راحة المفاصل والعضلات والأعصاب' : 'Confort Articulaire, musculaire et Nerveux'}</p>
              </div>
              <p>{lang === 'ar' ? 'منتج مطوّر بواسطة Authentic Laboratory' : 'Produit Développé par Authentic Laboratory'}</p>
            </div>
            <div className="footer-section">
              <h3>{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</h3>
              <p><Phone className="icon" /> 06 53 56 10 00</p>
              <p>{lang === 'ar' ? 'متاح 7 أيام في الأسبوع من 9 ص إلى 8 م' : 'Disponible 7j/7 de 9h à 20h'}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;