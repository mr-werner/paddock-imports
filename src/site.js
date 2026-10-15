import { Clock, Coffee, MapPin, Star } from "lucide-react";
import { FacebookIcon, LinkedInIcon, YelpIcon } from "./social-icons.jsx";
import logo from "./assets/paddock-logo-white.png";
import yelpBadge from "./assets/badge-yelp.png";
import bbbBadge from "./assets/badge-bbb.png";
import angiBadge from "./assets/badge-angies.png";
import bimmertechBadge from "./assets/badge-bimmertech.png";

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

  // White version of the logo on the current site (wp-content/uploads/2026/04/new-logo1.jpg), cut out of its navy plate.
  BRAND: { name: "Paddock", logo, logoAlt: "Paddock Imports" },
  ANNOUNCE: "By appointment · Mon–Fri 7:30 am – 5:30 pm · Drop-off 7:30 – 9:00 am",

  HOURS: [
    ["Monday – Friday", "7:30 am – 5:30 pm"],
    ["Drop-off", "7:30 – 9:00 am"],
    ["Saturday & Sunday", "Closed"],
  ],
  HOURS_SHORT: "Mon–Fri 7:30 am – 5:30 pm",

  HERO: {
    eyebrow: "Denver's import specialists · 30+ years",
    title: ["Better service.", "Better value."],
    text: "Dealer-level diagnostics and repair for BMW, MINI, Audi, Volkswagen and Mercedes-Benz, from an ASE-certified crew that has been wrenching on European imports in Denver for over 30 years.",
    cta: "Schedule Service",
    photo: { src: "/photos/hero-engine.webp", alt: "A Paddock Imports technician working on a German engine in the shop" },
    pit: [
      { icon: Clock, title: "Drop-off 7:30 – 9:00 am", text: "Mon–Fri, open until 5:30 pm" },
      { icon: Coffee, title: "Wait in the lobby", text: "8 or 9 am slots for simple services" },
      { icon: MapPin, title: "2400 W 7th Ave", text: "Denver, CO 80204" },
    ],
  },

  STATS: (rating) => [
    ["30+", "Years servicing imports"],
    ["8", "Full-time technicians"],
    ["100+", "Years of combined experience"],
    rating ? [`${rating.rating.toFixed(1)}★`, `${rating.userRatingCount.toLocaleString()} Google reviews`] : ["ASE", "Certified, WorldPAC trained"],
  ],

  MARQUES: ["BMW", "MINI", "Audi", "Volkswagen", "Mercedes-Benz"],
  MARQUES_NOTE: "Porsche and Range Rover welcome too. Cars and SUVs only, no trucks or diesels.",

  SERVICES: {
    eyebrow: "The service list",
    title: ["Everything your import needs, ", "under one roof."],
    text: "Factory-level work on the cars we know best, with OEM parts and dealer-grade diagnostic equipment.",
    cta: "Book this",
    items: [
      { title: "Maintenance & Repair", desc: "Oil, fluids, filters, tune-ups and scheduled service to factory standards.", photo: "/photos/under-car.webp", alt: "Technicians inspecting the underside of a car on a lift" },
      { title: "Diagnostics", desc: "Dealer-level scan tools to trace a fault to its root cause. First half hour free.", photo: "/photos/diagnostics.webp", alt: "Technician running a diagnostic tablet inside a car" },
      { title: "Engine Repair", desc: "Minor repairs through full rebuilds and replacements.", photo: "/photos/engine-bay.webp", alt: "Technician working in an open engine bay" },
      { title: "Brakes", desc: "Pads, rotors, sensors and brake-fluid flushes on every car we service.", photo: "/photos/mini-brakes.webp", alt: "Technician working on the brakes of a MINI Cooper" },
      { title: "Wheels & Tires", desc: "Touchless mount and balance, alignment, rotation, repair and seasonal tire storage.", photo: "/photos/tires.webp", alt: "Doug Paddock beside a stack of tires" },
      { title: "A/C & Climate", desc: "Leaks, condensers and recharges with R134a or R1234yf.", photo: "/photos/dash-work.webp", alt: "Technician working under a dashboard" },
      { title: "Auto Electrical", desc: "Batteries, alternators, ignition, lighting and module coding.", photo: "/photos/electrical.webp", alt: "Gloved hands working on wiring under the hood" },
      { title: "Exhaust", desc: "Mufflers, pipes and catalytic converters diagnosed and repaired.", photo: "/photos/cockpit.webp", alt: "Technician testing a car from the driver's seat" },
      { title: "BimmerTech & Performance", desc: "BimmerTech retrofits, CarPlay, cameras, coding, Noelle tunes and performance parts.", photo: "/photos/honeycomb.webp", alt: "Technician seen through a honeycomb grille" },
    ],
  },

  PROCESS: {
    eyebrow: "How a visit works",
    title: ["One lap. ", "Four turns."],
    text: "You approve every repair before we start, and you leave with a written summary.",
    steps: [
      ["Get in touch", "Call or request a time. We inspect and diagnose, then a service advisor gives you an estimate and options. You decide."],
      ["Service & repair", "Parts are ordered, the car goes on a lift, and faulty parts are replaced and inspected."],
      ["Test drive", "We re-check the diagnostics and road-test the car to make sure the problem is fixed, then call you."],
      ["The follow-up", "A thorough repair summary, answers to your questions and your warranty details."],
    ],
  },

  // From the FAQ page on the current website. Confirm before launch.
  PRICES: {
    eyebrow: "Straight answers",
    title: ["Know the numbers ", "before you come in."],
    text: "Common prices from our FAQ. Anything custom is quoted in person with the car.",
    note: "Prices as listed on the current paddockimports.com FAQ. A/C recharge is one hour of labor plus refrigerant (R134a or R1234yf).",
    groups: [
      {
        name: "Labor & diagnosis",
        rows: [
          ["Labor rate", "$198 / hr"],
          ["Diagnosis", "First 30 min free"],
          ["Pre-purchase inspection", "$198 / hr"],
        ],
      },
      {
        name: "Oil changes",
        rows: [
          ["BMW & Porsche 4-cyl", "$160"],
          ["BMW & Porsche 6-cyl", "$195"],
          ["BMW & Porsche 8-cyl", "$217"],
          ["M3 / M5", "$200 / $250"],
          ["Audi", "$145 – $190"],
        ],
      },
      {
        name: "Wheels & tires",
        rows: [
          ["Tire rotation", "$85"],
          ["Mount & balance", "from $140"],
          ["Alignment", "$180"],
          ["Tire storage", "$100 / season"],
        ],
      },
      {
        name: "Common jobs",
        rows: [
          ["Brake-fluid flush", "$187"],
          ["A/C recharge", "$198 – $250"],
          ["Battery (installed & registered)", "$400 – $550"],
          ["Keys & fobs", "$200 – $450"],
        ],
      },
    ],
    tip: "Snow tires: we suggest swapping them on around Halloween and off around Mother's Day.",
  },

  ABOUT: {
    nav: "About",
    eyebrow: "The crew",
    title: ["One mechanic's obsession, ", "a whole crew's craft."],
    text: [
      "Owner Doug Paddock has been working on cars since his teens, and his passion for high-performance machines turned into a specialty: he has been servicing BMWs and Audis for nearly 30 years.",
      "He built a team to match. Our technicians are the hands of the shop; our service advisors and parts tech are the heart, booking appointments, ordering parts and keeping you informed. Stop by the counter and grab a candy. Doug says it's the best in town.",
    ],
    portrait: { src: "/photos/doug-portrait.webp", alt: "Doug Paddock, owner of Paddock Imports", caption: "Doug Paddock, owner" },
    credentials: [
      ["8", "Full-time techs"],
      ["100+", "Years combined experience"],
      ["ASE", "Certified technicians"],
      ["WorldPAC", "Trained"],
    ],
  },

  GALLERY: {
    eyebrow: "In the bays",
    title: ["Real cars. ", "Real crew."],
    items: [
      { src: "/photos/cylinder-head.webp", alt: "Technician holding a cylinder head over an engine bay" },
      { src: "/photos/part-inspection.webp", alt: "Technician inspecting a part at the bench" },
      { src: "/photos/tech-cap.webp", alt: "Technician at work in the shop" },
      { src: "/photos/team-talk.webp", alt: "Doug Paddock talking with a technician on the shop floor" },
    ],
  },

  REVIEWS: {
    eyebrow: "Reputation",
    title: ["What Denver ", "is saying."],
    text: "Read what Denver drivers say about us on Google, Yelp, the BBB and Angi.",
    // Review badges shown on the current homepage, with the same links.
    badges: [
      { img: yelpBadge, name: "Find us on Yelp", url: "https://www.yelp.com/biz/paddock-imports-denver", w: 600, h: 300 },
      { img: bbbBadge, name: "Better Business Bureau: write and read customer reviews", url: "https://www.bbb.org/us/co/denver/profile/auto-services/paddocks-imports-inc-0885-90005126", w: 405, h: 125 },
      { img: angiBadge, name: "Review us on Angie's List", url: "https://www.angieslist.com/companylist/us/co/denver/paddock-imports-inc-reviews-2305902.htm", w: 399, h: 554 },
    ],
    partner: { img: bimmertechBadge, name: "BimmerTech", text: "BimmerTech parts installer" },
  },

  BOOK: {
    nav: "Schedule Service",
    eyebrow: "Schedule service",
    title: ["Request your ", "appointment."],
    text: "Tell us about the car and pick drop-off or an in-lobby wait. We'll call to confirm your time, usually within 24 hours.",
    points: ["Drop-off 7:30 – 9:00 am", "Lobby waits at 8 or 9 am: oil change, tire swap or rotation, A/C service, brake-fluid flush (2 slots a day)", "Seasonal tire storage available"],
    submit: "Request Appointment",
    note: "We'll confirm by phone or email. Need it sooner? Call",
    fields: [
      [{ name: "name", label: "Name", required: true, autoComplete: "name" }, { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" }],
      [{ name: "email", label: "Email", type: "email", autoComplete: "email" }, { name: "vehicle", label: "Vehicle", placeholder: "Year, make, model" }],
      [{ name: "service", label: "Service", type: "select", placeholder: "Choose a service…", options: ["Not sure / diagnosis", "Maintenance & Repair", "Diagnostics", "Engine Repair", "Brakes", "Wheels & Tires", "Tire storage swap", "A/C & Climate", "Auto Electrical", "Exhaust", "BimmerTech & Performance", "Pre-purchase inspection"] }, { name: "timing", label: "Visit type", type: "select", placeholder: "Choose…", options: ["Drop off (7:30–9:00 am)", "Wait in lobby (8 am)", "Wait in lobby (9 am)"] }],
      [{ name: "date", label: "Preferred day", type: "date" }, { name: "mileage", label: "Mileage", placeholder: "Approximate miles" }],
      { name: "notes", label: "What's going on?", type: "textarea", placeholder: "Symptoms, warning lights, service due…" },
    ],
  },

  VISIT: {
    nav: "Visit",
    eyebrow: "Visit the shop",
    title: ["Find us on ", "West 7th Avenue."],
    areas: "Serving Denver and the whole metro area.",
    // Listed on the current contact page.
    tow: { name: "New Age Towing", phone: "3035218473", display: "(303) 521-8473" },
  },

  FOOTER_BLURB: "Independent BMW, MINI, Audi, Volkswagen and Mercedes-Benz specialists in Denver. Better Service. Better Value.",
  // `top` links also show in the bar above the header.
  SOCIAL_LINKS: [
    { name: "Facebook", url: "https://www.facebook.com/PaddockImports", icon: FacebookIcon, top: true },
    { name: "Yelp", url: "https://www.yelp.com/biz/paddock-imports-denver", icon: YelpIcon, top: true },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/paddock-imports", icon: LinkedInIcon, top: true },
    { name: "Google", url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`, icon: Star },
  ],
};
