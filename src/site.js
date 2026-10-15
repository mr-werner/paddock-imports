import { CalendarCheck, Car, Clock, Cog, Coffee, Disc3, Facebook, Gauge, Linkedin, MapPin, Search, ShieldCheck, Snowflake, Star, Thermometer, Wind, Wrench, Zap, Package, Flag } from "lucide-react";

const COMPANY = "Paddock Imports";
const MAPS_QUERY = "Paddock Imports, 2400 W 7th Ave, Denver, CO 80204";

export default {
  COMPANY,
  ABBR: "pi",
  NOUN: "shop",
  PHONE: "3038255700",
  PHONE_DISPLAY: "(303) 825-5700",
  EMAIL: "service@paddockimports.com",
  ADDRESS: "2400 W 7th Ave",
  CITY: "Denver, CO 80204",
  MAPS_QUERY,
  FOUNDED: null,
  GOOGLE_PLACE_ID: "",
  // Shown until live Google data loads. From a third-party listing on 2026-10-14; confirm before launch.
  FALLBACK_RATING: { rating: 4.8, userRatingCount: 1182 },
  END_DATE: "2026-11-20T23:59:59-07:00",

  BRAND: { name: "Paddock", sub: "IMPORTS · DENVER", icon: Flag },
  ANNOUNCE: "BMW · MINI · Audi · Volkswagen · Mercedes-Benz specialists for 30+ years · Better Service. Better Value.",

  HOURS: [
    ["Monday – Friday", "7:30 am – 5:30 pm"],
    ["Drop-off", "7:30 – 9:00 am on appointment day"],
    ["Saturday & Sunday", "Closed"],
  ],
  HOURS_SHORT: "Mon–Fri 7:30 am – 5:30 pm",

  HERO: {
    eyebrow: "GERMAN & EUROPEAN SPECIALISTS · DENVER",
    title: ["Dealer-level expertise. ", "Independent-shop value."],
    text: "BMW, MINI, Audi, Volkswagen and Mercedes-Benz service from a team led by Doug Paddock, who has been working on these cars for nearly 30 years. Better service, better value.",
    cta: "Schedule Service",
    card: [
      { icon: Clock, title: "Drop-off 7:30 – 9:00 am", text: "Mon–Fri, open until 5:30 pm" },
      { icon: Coffee, title: "Wait in the lobby", text: "8 or 9 am for quick services" },
      { icon: MapPin, title: "2400 W 7th Ave", text: "Denver, CO 80204" },
    ],
  },

  STATS: (rating) => [
    ["30+ yrs", "High-performance experience"],
    [rating ? `${rating.rating.toFixed(1)} ★` : "5 ★", "Google rating"],
    [rating ? rating.userRatingCount.toLocaleString() : "1,000+", "Google reviews"],
    ["5", "German marques"],
  ],

  SERVICES: {
    eyebrow: "WHAT WE DO",
    title: ["Everything your German car needs, ", "without the dealer markup."],
    text: "Factory-level diagnostics and repair, scheduled maintenance and performance upgrades.",
    cta: "Schedule this service",
    items: [
      { title: "Repair & Servicing", desc: "Scheduled maintenance and repairs to factory standards.", icon: Wrench },
      { title: "Diagnostics", desc: "Dealer-grade diagnostic testing and inspections.", icon: Search },
      { title: "Brake Repair", desc: "Pads, rotors, sensors and fluid flushes for all five marques.", icon: Disc3 },
      { title: "Engine Repair", desc: "Minor repairs through rebuilds and replacements.", icon: Cog },
      { title: "A/C Repair", desc: "Climate control diagnosis, recharge and repair.", icon: Thermometer },
      { title: "Electrical", desc: "Batteries, alternators, ignition and lighting faults.", icon: Zap },
      { title: "Wheels & Tires", desc: "Tires, balancing, alignment, repair and seasonal storage.", icon: Gauge },
      { title: "BimmerTech & Upgrades", desc: "BimmerTech parts installation and performance upgrades.", icon: Package },
    ],
  },

  FEATURE: {
    id: "marques",
    nav: "Marques",
    eyebrow: "THE MARQUES WE KNOW",
    title: ["German engineering ", "deserves a specialist."],
    text: "We focus on a short list of brands so we know them deeply: their quirks, their common failures and how to fix them right.",
    cards: [
      { name: "BMW & MINI", icon: Car, lead: "Our longest specialty.", items: ["Scheduled service and repair", "Electrical and diagnostics", "Wheels, tires and BimmerTech"] },
      { name: "Audi & Volkswagen", icon: Car, lead: "Nearly 30 years of Audi work.", items: ["Engine and A/C repair", "Brakes and maintenance", "Diagnostics and inspections"] },
      { name: "Mercedes-Benz", icon: Car, lead: "Precision service, fair pricing.", items: ["Repair and servicing", "Brakes and engine work", "A/C and climate control"] },
    ],
  },

  PROCESS: {
    eyebrow: "HOW IT WORKS",
    title: ["Four steps. ", "Zero guesswork."],
    text: "You'll always know where your car is and what it needs.",
    steps: [
      ["Get in touch", "Schedule online or call, and receive estimates up front."],
      ["Service and repair", "Our technicians do the work to factory standards."],
      ["Final test drive", "Every car is road-tested before we call you."],
      ["Follow-up", "A repair summary with warranty details for your records."],
    ],
  },

  ABOUT: {
    nav: "About",
    eyebrow: "30 YEARS IN HIGH-PERFORMANCE MECHANICS",
    title: ["Built on one mechanic's ", "lifelong obsession."],
    text: [
      "Doug Paddock has worked on cars since his teens and has serviced BMWs and Audis for nearly 30 years. He built Paddock Imports by recruiting a team of automotive professionals who share that passion, combining certified expertise with the drive to keep your car running the way its engineers intended.",
    ],
    badge: ["30+", "Years of experience"],
    tiles: [
      { label: "BMW & MINI", icon: Car },
      { label: "Audi & VW", icon: Car },
      { label: "Mercedes-Benz", icon: Car },
      { label: "Tire storage", icon: Snowflake },
    ],
    credentials: [
      { title: "German-car specialists", desc: "BMW, MINI, Audi, Volkswagen and Mercedes-Benz." },
      { title: "Seasonal tire storage", desc: "We store your winter or summer set." },
      { title: "In-lobby waiting", desc: "8 and 9 am slots for oil, tires, A/C and brake fluid service." },
      { title: "Repair summaries", desc: "Every visit ends with a written summary and warranty status." },
    ],
  },

  REVIEWS: {
    title: ["Trusted by Denver's ", "European car owners."],
    text: "Read what customers say about the shop on Google.",
    quoteSource: "",
    quotes: [],
  },

  BOOK: {
    nav: "Schedule Service",
    eyebrow: "SCHEDULE SERVICE",
    title: ["Request your appointment ", "online."],
    text: "Choose drop-off or an in-lobby wait for quick services. We'll confirm your time and send an estimate.",
    points: ["Drop-off 7:30 – 9:00 am", "In-lobby waiting at 8 or 9 am for quick services", "Seasonal tire storage available"],
    submit: "Request Appointment",
    note: "We'll confirm by phone or email. Need it sooner? Call",
    fields: [
      [{ name: "name", label: "Name", required: true, autoComplete: "name" }, { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" }],
      [{ name: "email", label: "Email", type: "email", autoComplete: "email" }, { name: "vehicle", label: "Vehicle", placeholder: "Year, make, model" }],
      [{ name: "service", label: "Service", type: "select", placeholder: "Choose a service…", options: ["Not sure / diagnosis", "Repair & Servicing", "Diagnostics", "Brake Repair", "Engine Repair", "A/C Repair", "Electrical", "Wheels & Tires", "Tire storage swap", "BimmerTech & Upgrades"] }, { name: "timing", label: "Visit type", type: "select", placeholder: "Choose…", options: ["Drop off (7:30–9:00 am)", "Wait in lobby (8 am)", "Wait in lobby (9 am)"] }],
      [{ name: "date", label: "Preferred day", type: "date" }, { name: "mileage", label: "Mileage", placeholder: "Approximate miles" }],
      { name: "notes", label: "What's going on?", type: "textarea", placeholder: "Symptoms, warning lights, service due…" },
    ],
  },

  VISIT: {
    nav: "Visit",
    eyebrow: "VISIT THE SHOP",
    title: ["Find us on ", "West 7th Avenue."],
    areas: "Serving Denver and the surrounding area.",
  },

  FOOTER_BLURB: "Independent BMW, MINI, Audi, Volkswagen and Mercedes-Benz specialists in Denver. Better Service. Better Value.",
  SOCIAL_LINKS: [
    { name: "Facebook", url: "https://www.facebook.com/PaddockImports", icon: Facebook },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/paddock-imports", icon: Linkedin },
    { name: "Google", url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`, icon: Star },
  ],
};
