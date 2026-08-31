/**
 * Single source of truth for contact details and outbound links.
 *
 * These strings previously sat inline in five components, which is how the
 * hotline and the WhatsApp number drifted apart in the past. Change them here.
 */

export const PHONE_PRIMARY = "+8801727437077";
export const PHONE_SECONDARY = "+8801333321801";
export const EMAIL = "hello@galacticosbd.com";

export const ADDRESS = "Diyabari Mor, Uttara — west of metro rail pillar no. 5, Dhaka 1230";
export const MAP_POSITION = [23.875024, 90.366943];
export const DIRECTIONS_URL = "https://maps.app.goo.gl/ycjZrnznTU8zuAWM7";

const whatsappLink = (phone) =>
  `https://api.whatsapp.com/send/?phone=${encodeURIComponent(phone)}&text&type=phone_number&app_absent=0`;

export const WHATSAPP_URL = whatsappLink(PHONE_PRIMARY);

/**
 * Booking runs through WhatsApp. The Quiket storefront
 * (https://quiket.me/activities/gsp/) has been swapped in and out before, so it
 * is kept here rather than as a commented-out line inside a component.
 */
export const BOOKING_URL = WHATSAPP_URL;

export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61558750037723",
  instagram: "https://www.instagram.com/galacticos.gsp/",
  whatsapp: WHATSAPP_URL,
  email: `mailto:${EMAIL}`,
};

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "facilities", label: "Facilities" },
  { id: "slot_time", label: "Slot Time" },
  { id: "academy", label: "Academy" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ academy */

/**
 * Galacticos Sports Academy. All copy lives here rather than inside the JSX so
 * it can be edited without touching layout.
 */
export const ACADEMY = {
  name: "Galacticos Sports Academy",
  short: "GSA",
  tagline: "Developing Players. Building Character. Creating Opportunities.",

  intro: [
    "Galacticos Sports Academy (GSA) is the youth development wing of Galacticos Sports Pavilion, established with a simple but powerful vision: to keep young people on the ground, develop their potential, and create a pathway for the next generation of footballers in Bangladesh.",
    "Based in Dhaka, GSA provides a structured and professional football training environment for young players of different ages and skill levels. With 120+ active students, we are building a growing community of young footballers who share a passion for the game and a desire to improve.",
    "Our training goes beyond learning how to play football — helping our players grow both as footballers and as individuals.",
  ],

  stats: [
    { value: "120+", label: "Active students" },
    { value: "3", label: "Specialist coaches" },
    { value: "U15", label: "Competitive football" },
  ],

  /** Rendered as pills; reads far better than the original comma-separated run. */
  attributes: [
    "Technical development",
    "Tactical understanding",
    "Physical fitness",
    "Game intelligence",
    "Discipline",
    "Teamwork",
    "Confidence",
    "Leadership",
    "Sportsmanship",
  ],

  vision: {
    title: "Our Vision",
    body: [
      "To build the next generation of footballers in Bangladesh by creating an environment where every young player has the opportunity to learn, compete, grow, and believe in their potential.",
      "We want to create a football culture where young people choose the ground, embrace an active lifestyle, and understand that becoming a sportsperson can be a meaningful and achievable ambition.",
    ],
  },

  mission: {
    title: "Our Mission",
    body: [
      "To develop young players both on and off the pitch through professional coaching, structured training, competitive opportunities, and a positive sporting environment.",
      "We are committed to providing talented players with opportunities to compete, gain valuable match experience, and progress towards higher levels of football — while ensuring that every player, regardless of their current ability, has the opportunity to improve.",
    ],
  },

  coachesIntro:
    "GSA brings together a coaching team with a combination of international coaching experience, professional football management, and specialised goalkeeping expertise.",

  /**
   * `photo` is intentionally absent: no headshots exist yet, so the cards fall
   * back to an initials monogram. Add `photo: "/media/coaches/<file>.jpg"` to a
   * coach and the card renders the portrait instead — no layout change needed.
   */
  coaches: [
    {
      name: "Stephen Kadogo",
      role: "Head Coach",
      bio: "Our foreign Head Coach brings international football experience and a structured approach to player development. His training focuses on developing players' technical ability, tactical understanding, discipline, and overall football intelligence.",
    },
    {
      name: "Sharif Islam",
      role: "Manager, Shyamoli FC",
      bio: "Sharif brings valuable experience from the professional football environment in Bangladesh. His expertise in team management, competitive football, and player development gives our young players insight into the demands and pathways of higher-level football.",
    },
    {
      name: "Shaiyan Ahmed",
      role: "Goalkeeping Trainer",
      bio: "Our dedicated Goalkeeping Trainer specialises in developing young goalkeepers. His training focuses on positioning, handling, footwork, reflexes, decision-making, distribution, and goalkeeper confidence.",
    },
  ],

  beyond: {
    title: "More Than Football",
    lead: "At GSA, winning is not our only measure of success.",
    body: [
      "Our young teams have already started making their mark in competitive youth football tournaments in Dhaka, including U15 tournaments such as CUBE, sponsored by Shah Cement. These achievements give our players valuable competitive experience and demonstrate the progress they are making.",
      "But our bigger mission is much more than collecting trophies. We want to give young people a reason to come to the ground, be active, make friends, learn teamwork, develop discipline, and believe in themselves.",
      "Success is measured not only by the trophies we win, but by the players we develop, the confidence we build, and the young lives we positively influence.",
    ],
    closing: "From the first touch to the big dream.",
  },
};

/**
 * Academy clips. Files live in public/media/video/academy/ rather than being
 * imported, so they are never bundled or re-hashed — a redeploy uploads code
 * only. Regenerate them with:
 *
 *   ./scripts/encode-videos.sh src/assets/_originals/academy-videos academy
 *
 * Tiles are a uniform 3:4 regardless of the source orientation (three are
 * vertical phone clips, one is landscape) so the row reads as one set; the
 * lightbox plays each at its own aspect.
 */
export const ACADEMY_VIDEOS = [
  { id: "img-1581", title: "Match day walkout" },
  { id: "img-0158", title: "Training session" },
  { id: "img-0142", title: "Warm-up drills" },
  { id: "img-1751", title: "Young squad" },
].map((v) => ({
  ...v,
  src: `/media/video/academy/${v.id}.mp4`,
  poster: `/media/video/academy/${v.id}-poster.jpg`,
}));

/** 90-minute slots, on the half hour, around the clock. */
export const SLOT_TIMES = [
  "06:00 AM – 07:30 AM",
  "07:30 AM – 09:00 AM",
  "09:00 AM – 10:30 AM",
  "10:30 AM – 12:00 PM",
  "12:00 PM – 01:30 PM",
  "01:30 PM – 03:00 PM",
  "03:00 PM – 04:30 PM",
  "04:30 PM – 06:00 PM",
  "06:00 PM – 07:30 PM",
  "07:30 PM – 09:00 PM",
  "09:00 PM – 10:30 PM",
  "10:30 PM – 12:00 AM",
  "12:00 AM – 01:30 AM",
  "01:30 AM – 03:00 AM",
  "03:00 AM – 04:30 AM",
  "04:30 AM – 06:00 AM",
];
