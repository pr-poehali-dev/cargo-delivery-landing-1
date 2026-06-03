import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/4d8c6f52-ca50-4c05-bb8b-ea419ab1e3a1/files/7f1d6344-4acc-4db0-bf5d-9f626fa8d9a4.jpg";

const NAV_LINKS = [
  { label: "Как работает", href: "#how" },
  { label: "Калькулятор", href: "#calc" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const STEPS = [
  {
    num: "01",
    icon: "MessageSquare",
    title: "Оставьте заявку",
    desc: "Опишите груз: вес, объём, категорию товара. Мы свяжемся с вами в течение 2 часов.",
  },
  {
    num: "02",
    icon: "FileText",
    title: "Получите расчёт",
    desc: "Подготовим точную стоимость с учётом таможни, налогов и всех сборов. Никаких скрытых платежей.",
  },
  {
    num: "03",
    icon: "Package",
    title: "Груз доставлен",
    desc: "Отслеживайте посылку в реальном времени. Доставим «под ключ» — до вашего склада или адреса.",
  },
];

const STATS = [
  { value: "7+", label: "лет на рынке" },
  { value: "2 400+", label: "клиентов" },
  { value: "15 дней", label: "средний срок доставки" },
  { value: "99%", label: "грузов без потерь" },
];

const FAQS = [
  {
    q: "Какие виды товаров вы доставляете?",
    a: "Доставляем любые товары из Китая: электронику, одежду, промышленное оборудование, сырьё и многое другое. Исключение — товары, запрещённые к ввозу российским законодательством.",
  },
  {
    q: "Сколько стоит доставка?",
    a: "Стоимость зависит от веса, объёма и типа груза. Минимальный тариф — от 220 ₽/кг авиа и от 80 ₽/кг морем. Используйте калькулятор для быстрой оценки.",
  },
  {
    q: "Как вы работаете с таможней?",
    a: "Берём на себя полное таможенное оформление: подбор кода ТН ВЭД, подготовку декларации, уплату пошлин. Вы получаете уже растаможенный груз.",
  },
  {
    q: "Какой минимальный объём груза?",
    a: "Принимаем заказы от 1 кг. Для мелких грузов используем сборные перевозки — объединяем с другими заказами для снижения стоимости.",
  },
  {
    q: "Можно ли отследить груз?",
    a: "Да, после отправки вы получаете трек-номер и ссылку на личный кабинет, где видны все этапы движения груза в реальном времени.",
  },
];

const DELIVERY_TYPES = [
  { id: "sea", label: "Морем", days: "25–45 дней", rate: 80 },
  { id: "air", label: "Авиа", days: "7–15 дней", rate: 220 },
  { id: "auto", label: "Авто", days: "15–25 дней", rate: 130 },
];

const Index = () => {
  const [weight, setWeight] = useState(100);
  const [volume, setVolume] = useState(0.5);
  const [deliveryType, setDeliveryType] = useState("sea");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const selected = DELIVERY_TYPES.find((d) => d.id === deliveryType)!;
  const weightCost = weight * selected.rate;
  const volumeCost = volume * selected.rate * 167;
  const totalCost = Math.round(Math.max(weightCost, volumeCost));

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[hsl(var(--foreground))]">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[hsl(var(--border))]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("top")} className="font-display text-xl font-bold tracking-wide text-[hsl(var(--primary))] uppercase">
            КитайГруз
          </button>
          <nav className="hidden md:flex gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href.slice(1))}
                className="text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:flex items-center gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-semibold px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Получить расчёт
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-[hsl(var(--border))] bg-white px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href.slice(1))}
                className="text-sm font-medium text-left text-[hsl(var(--foreground))]"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="pt-16 min-h-screen flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Доставка грузов из Китая"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
          />
          <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20">
            <div className="max-w-2xl animate-[fade-up_0.6s_ease-out_both]">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[hsl(213,90%,54%)] mb-6 border border-[hsl(213,90%,54%)] px-3 py-1 rounded-full">
                Доставка из Китая под ключ
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] text-[hsl(var(--primary))] uppercase mb-6">
                Доставим<br />
                <span className="text-[hsl(213,90%,54%)]">любой груз</span><br />
                из Китая
              </h1>
              <p className="text-lg text-[hsl(var(--muted-foreground))] mb-10 leading-relaxed max-w-lg">
                Морем, авиа или автотранспортом. Таможенное оформление, страховка и отслеживание включены.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollTo("contacts")}
                  className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold px-8 py-4 rounded hover:opacity-90 transition-all hover:scale-[1.02] text-base"
                >
                  Рассчитать стоимость
                </button>
                <button
                  onClick={() => scrollTo("how")}
                  className="border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-semibold px-8 py-4 rounded hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors text-base"
                >
                  Как это работает
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[hsl(var(--border))] rounded-lg overflow-hidden">
              {STATS.map((s) => (
                <div key={s.value} className="bg-white px-6 py-5">
                  <div className="font-display text-3xl font-bold text-[hsl(var(--primary))]">{s.value}</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 bg-[hsl(var(--secondary))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(213,90%,54%)]">Процесс</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] uppercase mt-2">
              Как мы работаем
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.num} className="bg-white rounded-lg p-8 relative group hover:shadow-lg transition-shadow">
                <div className="font-display text-5xl font-bold text-[hsl(var(--border))] absolute top-6 right-8 select-none">
                  {step.num}
                </div>
                <div className="w-12 h-12 rounded-lg bg-[hsl(213,100%,97%)] flex items-center justify-center mb-6">
                  <Icon name={step.icon} fallback="Package" size={22} className="text-[hsl(var(--primary))]" />
                </div>
                <h3 className="font-semibold text-lg text-[hsl(var(--foreground))] mb-3">{step.title}</h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {DELIVERY_TYPES.map((d) => (
              <div key={d.id} className="bg-white border border-[hsl(var(--border))] rounded-lg p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[hsl(213,100%,97%)] flex items-center justify-center shrink-0">
                  <Icon name={d.id === "sea" ? "Ship" : d.id === "air" ? "Plane" : "Truck"} size={18} className="text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <div className="font-semibold text-[hsl(var(--foreground))]">{d.label}</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">{d.days}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(213,90%,54%)]">Стоимость</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] uppercase mt-2">
              Калькулятор доставки
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold mb-3 text-[hsl(var(--foreground))]">Способ доставки</label>
                <div className="grid grid-cols-3 gap-3">
                  {DELIVERY_TYPES.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDeliveryType(d.id)}
                      className={`border rounded-lg p-3 text-center transition-all ${
                        deliveryType === d.id
                          ? "border-[hsl(var(--primary))] bg-[hsl(213,100%,97%)] text-[hsl(var(--primary))]"
                          : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]"
                      }`}
                    >
                      <Icon
                        name={d.id === "sea" ? "Ship" : d.id === "air" ? "Plane" : "Truck"}
                        size={20}
                        className="mx-auto mb-1"
                      />
                      <div className="text-xs font-semibold">{d.label}</div>
                      <div className="text-[10px] mt-0.5 opacity-70">{d.days}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-[hsl(var(--foreground))]">Вес груза</label>
                  <span className="text-sm font-bold text-[hsl(var(--primary))]">{weight} кг</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5000}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 cursor-pointer accent-[hsl(var(--primary))]"
                />
                <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  <span>1 кг</span><span>5 000 кг</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-[hsl(var(--foreground))]">Объём груза</label>
                  <span className="text-sm font-bold text-[hsl(var(--primary))]">{volume.toFixed(1)} м³</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={50}
                  step={0.1}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 cursor-pointer accent-[hsl(var(--primary))]"
                />
                <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  <span>0.1 м³</span><span>50 м³</span>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-xl p-8 sticky top-24">
              <div className="text-sm font-semibold opacity-70 uppercase tracking-wider mb-2">Предварительная стоимость</div>
              <div className="font-display text-5xl font-bold mb-1">
                {totalCost.toLocaleString("ru-RU")} ₽
              </div>
              <div className="text-xs opacity-60 mb-8">*Окончательная стоимость рассчитывается менеджером</div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm border-b border-white/20 pb-3">
                  <span className="opacity-70">Способ доставки</span>
                  <span className="font-semibold">{selected.label}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-white/20 pb-3">
                  <span className="opacity-70">Тариф</span>
                  <span className="font-semibold">от {selected.rate} ₽/кг</span>
                </div>
                <div className="flex justify-between text-sm border-b border-white/20 pb-3">
                  <span className="opacity-70">Срок доставки</span>
                  <span className="font-semibold">{selected.days}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Включено</span>
                  <span className="font-semibold">Таможня, страховка</span>
                </div>
              </div>

              <button
                onClick={() => scrollTo("contacts")}
                className="w-full bg-white text-[hsl(var(--primary))] font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Оформить заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[hsl(var(--secondary))]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(213,90%,54%)]">Вопросы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] uppercase mt-2">
              Частые вопросы
            </h2>
          </div>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-white border border-[hsl(var(--border))] rounded-lg px-6 data-[state=open]:border-[hsl(var(--primary))]"
                >
                  <AccordionTrigger className="text-left font-semibold text-[hsl(var(--foreground))] hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(213,90%,54%)]">Контакты</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] uppercase mt-2 mb-8">
                Свяжитесь<br />с нами
              </h2>

              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67", href: "tel:+74951234567" },
                  { icon: "Mail", label: "Email", value: "info@kitaygruz.ru", href: "mailto:info@kitaygruz.ru" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–18:00 МСК" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Ленинградская, 45" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-[hsl(213,100%,97%)] flex items-center justify-center shrink-0">
                      <Icon name={c.icon} fallback="Circle" size={18} className="text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                      <div className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="font-semibold text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">{c.value}</a>
                      ) : (
                        <div className="font-semibold text-[hsl(var(--foreground))]">{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 bg-[hsl(213,100%,97%)] rounded-lg border border-[hsl(var(--primary))]/20">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="MessageCircle" size={16} className="text-[hsl(var(--primary))]" />
                  <span className="text-sm font-semibold text-[hsl(var(--primary))]">Мессенджеры</span>
                </div>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Пишите в WhatsApp или Telegram — ответим быстрее!</p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-[hsl(var(--secondary))] rounded-xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[hsl(var(--primary))] uppercase mb-2">Заявка отправлена!</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm">Наш менеджер свяжется с вами в течение 2 часов.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold text-[hsl(var(--primary))] uppercase mb-6">
                    Оставить заявку
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1.5">Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-[hsl(var(--border))] rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[hsl(var(--primary))] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1.5">Телефон</label>
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-[hsl(var(--border))] rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[hsl(var(--primary))] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1.5">Описание груза</label>
                      <textarea
                        rows={4}
                        placeholder="Опишите товар, вес, объём..."
                        value={form.comment}
                        onChange={(e) => setForm({ ...form, comment: e.target.value })}
                        className="w-full border border-[hsl(var(--border))] rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[hsl(var(--primary))] transition-colors resize-none"
                      />
                    </div>
                    <button
                      onClick={() => { if (form.name && form.phone) setSubmitted(true); }}
                      className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold py-3.5 rounded-lg hover:opacity-90 transition-all hover:scale-[1.01] text-sm uppercase tracking-wide"
                    >
                      Отправить заявку
                    </button>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-display text-xl font-bold uppercase tracking-wide mb-1">КитайГруз</div>
            <div className="text-xs opacity-60">© 2024 Все права защищены</div>
          </div>
          <div className="flex gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href.slice(1))}
                className="text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                {l.label}
              </button>
            ))}
          </div>
          <a href="tel:+74951234567" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
            +7 (495) 123-45-67
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;