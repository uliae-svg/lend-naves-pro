import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Check, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  PenTool, 
  Zap, 
  Award,
  ArrowRight,
  MessageSquare,
  Send
} from 'lucide-react';

// --- Components ---

const QuizModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    size: '',
    material: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    timerRef.current = setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setStep(1);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-xl bg-[#161920] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">Шаг {step} из 4</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1 w-8 rounded-full ${i <= step ? 'bg-gold-500' : 'bg-gray-700'}`} />
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {step === 1 && "Какой тип навеса вам нужен?"}
                  {step === 2 && "Примерная площадь навеса?"}
                  {step === 3 && "Предпочтительный материал кровли?"}
                  {step === 4 && "Куда прислать расчет стоимости?"}
                </h3>
              </div>

              <div className="space-y-3">
                {step === 1 && (
                  <>
                    {['Для автомобиля', 'Для террасы', 'Над входом', 'Для бассейна'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setFormData({...formData, type: opt}); nextStep(); }}
                        className="w-full text-left p-4 rounded-lg border border-gray-700 hover:border-gold-500 hover:bg-gold-500/5 text-gray-300 transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </>
                )}

                {step === 2 && (
                  <>
                    {['До 20 м²', '20 - 40 м²', '40 - 60 м²', 'Более 60 м²'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setFormData({...formData, size: opt}); nextStep(); }}
                        className="w-full text-left p-4 rounded-lg border border-gray-700 hover:border-gold-500 hover:bg-gold-500/5 text-gray-300 transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </>
                )}

                {step === 3 && (
                  <>
                    {['Поликарбонат', 'Закаленное стекло', 'Профнастил', 'Мягкая кровля'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setFormData({...formData, material: opt}); nextStep(); }}
                        className="w-full text-left p-4 rounded-lg border border-gray-700 hover:border-gold-500 hover:bg-gold-500/5 text-gray-300 transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </>
                )}

                {step === 4 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      required
                      type="tel" 
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-[#0d0f14] border border-gray-700 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-gold-500"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <button type="submit" className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                      Получить расчет <Send size={18} />
                    </button>
                  </form>
                )}
              </div>

              {step > 1 && step < 4 && (
                <button onClick={prevStep} className="mt-6 text-gray-500 hover:text-white text-sm font-medium">
                  ← Назад
                </button>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-gold-500" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Заявка принята!</h3>
              <p className="text-gray-400">Наш инженер свяжется с вами в течение 15 минут для уточнения деталей.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const CallbackModal = ({ onClose }: { onClose: () => void }) => {
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    timerRef.current = setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setPhone('');
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-[#161920] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          {!isSubmitted ? (
            <>
              <h3 className="text-2xl font-bold text-white mb-2 font-serif">Заказать звонок</h3>
              <p className="text-gray-400 mb-6 text-sm">Оставьте ваш номер телефона, и мы перезвоним вам в течение 15 минут.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  required
                  type="tel" 
                  autoFocus
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-[#0d0f14] border border-gray-700 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit" className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                  Перезвоните мне <Phone size={18} />
                </button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-gold-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Заявка принята!</h3>
              <p className="text-gray-400 text-sm">Ожидайте звонка в ближайшее время.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ onCallbackOpen }: { onCallbackOpen: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.getElementById('root');
    const handleScroll = () => setIsScrolled((root?.scrollTop ?? 0) > 50);
    root?.addEventListener('scroll', handleScroll, { passive: true });
    return () => root?.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Преимущества', href: '#advantages' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'Контакты', href: '#contacts' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-[background-color,padding,box-shadow] duration-300 ${isScrolled ? 'bg-[#0a0c10] md:backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-gold-400 tracking-tight">НавесПро</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Contact Info & CTA */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <a href="tel:+78001234567" className="text-white font-bold hover:text-gold-400 transition-colors">
              +7 (800) 123-45-67
            </a>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Пн-Сб: 9:00 — 20:00</span>
          </div>
          <button 
            onClick={onCallbackOpen}
            className="px-6 py-2.5 bg-gold-500 hover:bg-gold-600 text-gold-950 text-xs font-bold rounded-md transition-all uppercase tracking-wider"
          >
            Перезвоните мне
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0a0c10] border-t border-gray-800 py-6 px-6 flex flex-col gap-4 lg:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-lg font-medium text-gray-300 hover:text-gold-400"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-800 flex flex-col gap-4">
              <a href="tel:+78001234567" className="text-xl font-bold text-gold-400">+7 (800) 123-45-67</a>
              <button 
                onClick={() => { setIsMenuOpen(false); onCallbackOpen(); }}
                className="w-full py-4 bg-gold-500 text-gold-950 font-bold rounded-md"
              >
                Заказать звонок
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onQuizOpen }: { onQuizOpen: () => void }) => {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-start md:items-center justify-center bg-hero-gradient overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center z-10 pt-28 md:pt-0">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold-400 font-medium tracking-[0.3em] uppercase text-sm mb-6"
        >
          Премиум решения
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight"
        >
          Навесы <span className="text-gold-400">под ключ</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Проектируем и устанавливаем навесы премиум-класса для вашего дома. 
          Индивидуальный дизайн, надёжные материалы, безупречный монтаж.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={onQuizOpen}
            className="w-full sm:w-auto px-10 py-4 bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold rounded-md transition-all transform hover:scale-105"
          >
            Рассчитать стоимость
          </button>
          <button 
            onClick={scrollToPortfolio}
            className="w-full sm:w-auto px-10 py-4 bg-transparent border border-gray-600 hover:border-gold-400 text-white font-bold rounded-md transition-all"
          >
            Наши работы
          </button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-400 animate-bounce"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const Advantages = () => {
  const items = [
    {
      icon: <PenTool className="text-gold-400" size={28} />,
      title: "Индивидуальный проект",
      description: "Каждый навес проектируется с учётом архитектуры вашего дома и ландшафта участка"
    },
    {
      icon: <ShieldCheck className="text-gold-400" size={28} />,
      title: "Гарантия 10 лет",
      description: "Используем только сертифицированные материалы с долгим сроком службы"
    },
    {
      icon: <Zap className="text-gold-400" size={28} />,
      title: "Монтаж за 3-5 дней",
      description: "Быстрая установка профессиональной бригадой без повреждения участка"
    },
    {
      icon: <Award className="text-gold-400" size={28} />,
      title: "Премиум качество",
      description: "Алюминий, нержавеющая сталь, закалённое стекло и поликарбонат высшего класса"
    }
  ];

  return (
    <section id="advantages" className="py-24 bg-[#0d0f14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-xs mb-4">Преимущества</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Почему выбирают <span className="text-gold-400">нас</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="p-8 bg-[#161920] border border-gray-800 rounded-xl hover:border-gold-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-[#1c212b] rounded-full flex items-center justify-center mb-6 group-hover:bg-gold-500/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
      title: "Современный навес для террасы"
    },
    {
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
      title: "Автомобильный навес на 2 машины"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
      title: "Навес над бассейном"
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-[#0a0c10]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-xs mb-4">Портфолио</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Наши <span className="text-gold-400 text-serif italic">работы</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium text-lg">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 text-gold-400 font-bold hover:text-gold-300 transition-colors">
            Смотреть все проекты <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ onOrder }: { onOrder: () => void }) => {
  const plans = [
    {
      name: "Стандарт",
      price: "от 120 000 ₽",
      features: [
        "Навес до 20 м²",
        "Поликарбонат 8 мм",
        "Стальной каркас",
        "Монтаж 3 дня",
        "Гарантия 5 лет"
      ]
    },
    {
      name: "Премиум",
      price: "от 250 000 ₽",
      popular: true,
      features: [
        "Навес до 40 м²",
        "Закалённое стекло",
        "Алюминиевый каркас",
        "LED-подсветка",
        "Гарантия 10 лет"
      ]
    },
    {
      name: "Эксклюзив",
      price: "по запросу",
      features: [
        "Любая площадь",
        "Премиум материалы",
        "3D-визуализация",
        "Дизайн-проект",
        "Гарантия 15 лет"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#0d0f14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-xs mb-4">Тарифы</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Выберите <span className="text-gold-400">решение</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`p-10 rounded-2xl border transition-all relative ${plan.popular ? 'bg-[#1c212b] border-gold-500 shadow-2xl shadow-gold-500/10 scale-105 z-10' : 'bg-[#161920] border-gray-800'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-gold-950 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Популярный
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-3xl font-serif font-bold text-gold-400 mb-8">{plan.price}</p>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-gray-400 text-sm">
                    <Check size={16} className="text-gold-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={onOrder}
                className={`w-full py-4 rounded-md font-bold transition-all ${plan.popular ? 'bg-gold-500 hover:bg-gold-600 text-gold-950' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
              >
                Заказать
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contacts = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contacts" className="py-24 bg-[#0a0c10]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold-400 font-medium tracking-[0.3em] uppercase text-xs mb-4">Контакты</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Оставьте <span className="text-gold-400">заявку</span></h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-[#161920] rounded-full flex items-center justify-center shrink-0 border border-gray-800">
                <Phone className="text-gold-400" size={20} />
              </div>
              <div>
                <p className="text-white font-bold mb-1">Телефон</p>
                <a href="tel:+78001234567" className="text-gray-400 hover:text-gold-400 transition-colors text-lg">+7 (800) 123-45-67</a>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-[#161920] rounded-full flex items-center justify-center shrink-0 border border-gray-800">
                <MapPin className="text-gold-400" size={20} />
              </div>
              <div>
                <p className="text-white font-bold mb-1">Адрес</p>
                <p className="text-gray-400 text-lg">г. Москва, ул. Строителей, д. 15</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-[#161920] rounded-full flex items-center justify-center shrink-0 border border-gray-800">
                <Clock className="text-gold-400" size={20} />
              </div>
              <div>
                <p className="text-white font-bold mb-1">Режим работы</p>
                <p className="text-gray-400 text-lg">Пн-Сб: 9:00 — 20:00</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-[#161920] p-8 md:p-10 rounded-2xl border border-gray-800 shadow-xl"
                >
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <input 
                        required
                        type="text" 
                        placeholder="Ваше имя" 
                        className="w-full bg-[#0d0f14] border border-gray-700 rounded-md px-4 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        required
                        type="tel" 
                        placeholder="Телефон" 
                        className="w-full bg-[#0d0f14] border border-gray-700 rounded-md px-4 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                    <div>
                      <textarea 
                        rows={4} 
                        placeholder="Опишите ваш проект..." 
                        className="w-full bg-[#0d0f14] border border-gray-700 rounded-md px-4 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      ></textarea>
                    </div>
                    <button className="w-full py-5 bg-gold-500 hover:bg-gold-600 text-gold-950 font-bold rounded-md transition-all shadow-lg shadow-gold-500/20">
                      Отправить заявку
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#161920] p-12 rounded-2xl border border-gold-500/50 shadow-2xl text-center"
                >
                  <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="text-gold-500" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Спасибо!</h3>
                  <p className="text-gray-400">Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-[#0a0c10] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm">
          © 2026 <span className="text-gold-400 font-bold">НавесПро</span>. Все права защищены.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Политика конфиденциальности</a>
          <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Оферта</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar onCallbackOpen={() => setIsCallbackOpen(true)} />
      <Hero onQuizOpen={() => setIsQuizOpen(true)} />
      <Advantages />
      <Portfolio />
      <Pricing onOrder={() => setIsCallbackOpen(true)} />
      <Contacts />
      <Footer />

      <AnimatePresence>
        {isQuizOpen && (
          <QuizModal onClose={() => setIsQuizOpen(false)} />
        )}
        {isCallbackOpen && (
          <CallbackModal onClose={() => setIsCallbackOpen(false)} />
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button (Desktop) */}
      <a 
        href="https://wa.me/78001234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="hidden md:flex fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full items-center justify-center shadow-2xl z-40 hover:scale-110 transition-transform"
      >
        <MessageSquare size={32} />
      </a>

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#161920] border-t border-gray-800 p-3 flex gap-3 z-50">
        <button 
          onClick={() => setIsCallbackOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 bg-gold-500 text-gold-950 py-3 rounded-lg font-bold text-sm"
        >
          <Phone size={18} /> Позвонить
        </button>
        <a 
          href="https://wa.me/78001234567" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-bold text-sm"
        >
          <MessageSquare size={18} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
