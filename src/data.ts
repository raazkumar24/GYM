const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`

export const BRAND = {
  name: 'Aayam',
  city: 'Indiranagar, Bengaluru',
  address: '14, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
  // Replace with the client's WhatsApp number (country code, no + or spaces)
  whatsapp: '919876543210',
  phone: '+91 98765 43210',
  email: 'hello@aayam.fit',
  hours: 'Mon–Sat 5:30 AM – 11:00 PM · Sun 7:00 AM – 1:00 PM',
}

export const IMG = {
  hero: u('photo-1605296867724-fa87a8ef53fd', 2000),
  heroInset: u('photo-1601422407692-ec4eeec1d9b3', 800),
  runner: u('photo-1648249590658-ad7761bb9329', 1200),
  interior: u('photo-1770513649465-2c60c8039806', 1200),
}

export const stats = [
  { value: 60, suffix: '', label: 'Members per hour — a hard cap, never crowded' },
  { value: 380, suffix: '+', label: 'Body transformations tracked every quarter' },
  { value: 17, suffix: 'h', label: 'Open daily, from 5:30 AM sharp' },
  { value: 4.9, suffix: '', label: 'Average rating across 1,200+ Google reviews', decimals: 1 },
]

export const programs = [
  {
    title: 'Strength & Conditioning',
    text: 'Barbell-led programming in small pods of six. Technique first, load second, progress logged every session.',
    img: u('photo-1734668485281-c1d03fee6023', 900),
  },
  {
    title: 'Personal Training',
    text: 'One coach, one plan, one goal. Weekly check-ins, body-composition scans and a coach who answers on WhatsApp.',
    img: u('photo-1745851211804-409acbb4b597', 900),
  },
  {
    title: 'Boxing & MMA',
    text: 'Pad work, footwork and conditioning rounds led by ex-national-level fighters. No ego, all craft.',
    img: u('photo-1517438322307-e67111335449', 900),
  },
  {
    title: 'Yoga & Mobility',
    text: 'Hatha and vinyasa foundations blended with modern mobility work to undo long hours at a desk.',
    img: u('photo-1599447332412-6bc6830c815a', 900),
  },
  {
    title: 'Functional Training',
    text: 'Kettlebells, sleds and carries. Strength that shows up when you lift your kid or your suitcase.',
    img: u('photo-1632077804406-188472f1a810', 900),
  },
  {
    title: 'Swimming',
    text: 'A 25m heated indoor pool with coached lap sessions, stroke correction and adult learn-to-swim batches.',
    img: u('photo-1792704757031-552974c4057a', 900),
  },
  {
    title: 'Women-only Batches',
    text: 'Dedicated morning and evening slots with women coaches, for those who prefer a quieter floor.',
    img: u('photo-1591504771094-a1ca4de142d7', 900),
  },
  {
    title: 'Recovery & Physio',
    text: 'In-house sports physiotherapist for niggles, rehab and return-to-training plans.',
    img: u('photo-1757940556610-a114be4733bf', 900),
  },
]

export const rituals = [
  {
    title: 'Infrared Sauna',
    text: 'Twenty minutes at 55°C to loosen tight tissue and calm the nervous system after a hard session.',
    img: '/images/infrared-sauna.jpg',
    meta: '20 min · 55°C',
  },
  {
    title: 'Cold Plunge',
    text: 'Controlled 4°C immersion, coached breathing included. Reduces soreness and sharpens the mind.',
    img: '/images/cold-plunge.jpg',
    meta: '3 min · 4°C',
  },
  {
    title: 'Sports Massage',
    text: 'Deep-tissue work by certified therapists who understand training loads, not just knots.',
    img: '/images/sports-massage.jpg',
    meta: '45 / 60 min',
  },
  {
    title: 'Breathwork Room',
    text: 'A quiet, dim room for guided pranayama and down-regulation. Phones stay outside.',
    img: '/images/breathwork-room.jpg',
    meta: 'Daily 7 PM',
  },
  {
    title: 'Recovery Lounge',
    text: 'Compression boots, percussion tools and cold-pressed juice. Stay as long as you need.',
    img: '/images/recovery-lounge.jpg',
    meta: 'Members only',
  },
]

export type Billing = 'monthly' | 'quarterly' | 'annual'

export const billingOptions: { id: Billing; label: string; months: number; off: number }[] = [
  { id: 'monthly', label: 'Monthly', months: 1, off: 0 },
  { id: 'quarterly', label: 'Quarterly', months: 3, off: 0.1 },
  { id: 'annual', label: 'Annual', months: 12, off: 0.25 },
]

export const plans = [
  {
    name: 'Align',
    tagline: 'Find your rhythm',
    price: 2999,
    features: [
      'Full gym floor access',
      'All group classes',
      'Access 5:30 AM – 11 PM',
      '1 guest pass / month',
      'Locker & towel service',
    ],
  },
  {
    name: 'Transit',
    tagline: 'Turn a habit into change',
    price: 4999,
    popular: true,
    features: [
      'Everything in Align',
      '4 personal sessions / month',
      'Sauna & cold plunge daily',
      '1 nutritionist consult / month',
      'Priority class booking',
      '2 guest passes / month',
    ],
  },
  {
    name: 'Evolve',
    tagline: 'Unlock your potential',
    price: 7999,
    features: [
      'Everything in Transit',
      '8 personal sessions / month',
      'Individual training plan',
      'Monthly body-composition scan',
      'Sports massage (1 / month)',
      '3 guest passes / month',
    ],
  },
  {
    name: 'Continuum',
    tagline: 'No ceiling',
    price: 12999,
    features: [
      'Everything in Evolve',
      'Dedicated coach, 3× / week',
      'Physio & rehab on call',
      'Personal locker',
      'Members-only events',
      'Unlimited guest passes',
    ],
  },
]

export const team = [
  {
    name: 'Arjun Mehta',
    role: 'Head of Strength',
    bio: 'Former state-level powerlifter. Twelve years coaching barbell technique, with a soft spot for first-time lifters.',
    img: u('photo-1686781483909-a5fb625ca043', 900),
  },
  {
    name: 'Kavya Nair',
    role: 'Yoga & Mobility Lead',
    bio: 'RYT-500 certified. Blends traditional hatha with modern mobility science for stiff backs and stiffer schedules.',
    img: u('photo-1532617157703-6767b6415b14', 900),
  },
  {
    name: 'Rohan D’Souza',
    role: 'Boxing Coach',
    bio: 'Ex-national circuit boxer. Teaches footwork and composure before power, for fighters and office-goers alike.',
    img: u('photo-1567877383455-b2e3cb3cc8e1', 900),
  },
  {
    name: 'Ishita Rao',
    role: 'Performance Coach',
    bio: 'MSc Sports Science. Builds data-led programs for runners, cricketers and anyone chasing a number.',
    img: u('photo-1658537642992-f0cddaa9cbc4', 900),
  },
  {
    name: 'Vikram Sethi',
    role: 'Functional Training',
    bio: 'Kettlebell specialist and mobility nerd. Believes strength should make everyday life feel easier.',
    img: u('photo-1610997519153-d572d10899ea', 900),
  },
]

export const reviews = [
  {
    name: 'Priya Sharma',
    meta: 'Product Manager · 31',
    since: 'Member since 2023',
    quote: 'I had joined and quit four gyms. Here, my coach actually knows my knees, my schedule and my excuses.',
    focus: 'Strength & posture',
    img: u('photo-1749700332031-cf99864959ea', 200),
  },
  {
    name: 'Aditya Kulkarni',
    meta: 'Founder · 36',
    since: 'Member since 2022',
    quote: 'Lost 14 kg in eight months without a single crash diet. The 6 AM pod is the best part of my day.',
    focus: 'Body recomposition',
    img: u('photo-1782323709687-43675cbddd46', 200),
  },
  {
    name: 'Neha Iyer',
    meta: 'Doctor · 29',
    since: 'Member since 2024',
    quote: 'The women-only evening batch made me comfortable from day one. Now I deadlift more than my brother.',
    focus: 'Confidence',
    img: u('photo-1725033489648-a819750348eb', 200),
  },
  {
    name: 'Karan Malhotra',
    meta: 'Architect · 41',
    since: 'Member since 2023',
    quote: 'Physio fixed a shoulder I had ignored for years. The sauna and cold plunge are now non-negotiable.',
    focus: 'Rehab & longevity',
    img: u('photo-1644966486873-39171635ab43', 200),
  },
  {
    name: 'Sameer Khan',
    meta: 'Engineer · 27',
    since: 'Member since 2024',
    quote: 'Never crowded, never loud. I come in with headphones and leave with a clear head.',
    focus: 'Mental balance',
    img: u('photo-1790575188867-56dcef696938', 200),
  },
]

export const events = [
  {
    date: '07 Jun',
    day: 'Sat',
    title: 'Cubbon Park Run Club',
    text: '5K easy pace followed by mobility and filter coffee. Open to members and one friend.',
    img: u('photo-1758798458635-f01402b40919', 900),
  },
  {
    date: '14 Jun',
    day: 'Sat',
    title: 'Sound & Breath Night',
    text: 'Singing bowls, guided pranayama and a long, quiet savasana in the breathwork room.',
    img: u('photo-1741601272384-7150b6e6b842', 900),
  },
  {
    date: '22 Jun',
    day: 'Sun',
    title: 'Aayam Strength Open',
    text: 'Our in-house powerlifting meet. Every level welcome, every PR celebrated.',
    img: u('photo-1734668485281-c1d03fee6023', 900),
  },
  {
    date: '28 Jun',
    day: 'Sat',
    title: 'Eat for Training — Talk',
    text: 'Our nutritionist on vegetarian protein, Indian meals and sustainable fat loss.',
    img: u('photo-1632077804406-188472f1a810', 900),
  },
]

export const faqs = [
  {
    q: 'Can I try Aayam before I join?',
    a: 'Yes. Your first visit is a free 60-minute session: a movement assessment, a short workout with a coach and a tour of the recovery floor. Book it below or on WhatsApp.',
  },
  {
    q: 'Which plan is right for me?',
    a: 'If you train independently, Align is enough. If you want guidance and accountability, Transit is where most members start. Evolve and Continuum suit specific goals like fat loss, sport or rehab.',
  },
  {
    q: 'Is GST included in the prices?',
    a: 'Prices shown are exclusive of 18% GST, which is added at billing. Quarterly and annual plans are already discounted by 10% and 25%.',
  },
  {
    q: 'Can I pause my membership?',
    a: 'Quarterly members can freeze for up to 15 days and annual members for up to 45 days — for travel, exams, weddings or illness. Just message the front desk.',
  },
  {
    q: 'Do you have separate batches for women?',
    a: 'Yes. Women-only batches run 7–9 AM and 6–8 PM on weekdays, led by women coaches. All other slots are mixed.',
  },
  {
    q: 'How can I pay?',
    a: 'UPI, all major cards, net banking and no-cost EMI on annual plans through select banks. Corporate memberships are invoiced monthly.',
  },
]
