export const blogPosts = [
  {
    id: 'skincare-routine-juba-climate',
    title: 'Building a Skincare Routine for Juba’s Climate',
    excerpt:
      'How heat, dust, and humidity affect your skin — and the simple luxury routine that keeps it balanced.',
    content: `Living in Juba means your skin faces unique challenges: intense sun, dry seasons, and urban dust. At Olive Spa, we see these effects daily — and the good news is that a thoughtful routine can keep your skin radiant year-round.

Start with a gentle cleanser morning and evening. Avoid harsh scrubs that strip your skin’s natural barrier. Follow with a hydrating toner and a serum rich in antioxidants such as vitamin C.

During the day, SPF is non-negotiable. Reapply if you spend long hours outdoors. At night, nourish with a richer moisturizer or facial oil to repair what the day has taken away.

Visit us for a Deep Cleansing Facial monthly to reset your pores and give your home routine a professional boost.`,
    author: 'Olive Spa Team',
    date: '2026-06-15',
    category: 'Skincare Tips',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1000&q=80',
    readTime: 5,
  },
  {
    id: 'massage-benefits-beyond-relaxation',
    title: 'Massage Benefits Beyond Relaxation',
    excerpt:
      'From better sleep to reduced anxiety — why regular massage is an investment in your whole self.',
    content: `Massage is often seen as an indulgence, but the science tells a different story. Regular bodywork supports circulation, eases muscle tension, and helps regulate stress hormones.

Deep Tissue Massage can relieve chronic pain from desk work. Swedish Massage improves lymphatic flow. Hot Stone therapy warms tight fascia and encourages profound calm.

At Olive Spa, we recommend starting with a monthly massage and adjusting frequency based on your lifestyle. Professionals under high pressure often benefit from bi-weekly sessions.

Your body carries the weight of your days. Give it a place to release.`,
    author: 'Olive Spa Team',
    date: '2026-05-28',
    category: 'Massage Benefits',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1000&q=80',
    readTime: 4,
  },
  {
    id: 'bridal-beauty-timeline',
    title: 'Your Bridal Beauty Timeline: 8 Weeks to Glow',
    excerpt:
      'A step-by-step beauty plan so you look and feel your best on the wedding day.',
    content: `Your wedding day deserves more than last-minute makeup. Start eight weeks out with a consultation — we assess skin, brows, and nails to build your personal plan.

Weeks 8–6: Begin facial treatments and address any skin concerns. Week 4: Trial makeup and finalize brow shape. Week 2: Manicure and pedicure with a soft polish. Week 1: Final facial (gentle, no aggressive peels). Wedding day: Full bridal beauty package.

Our Bridal Beauty Package bundles everything into one seamless experience. Book early — peak wedding seasons fill quickly.`,
    author: 'Olive Spa Team',
    date: '2026-04-20',
    category: 'Beauty Advice',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80',
    readTime: 6,
  },
  {
    id: 'wellness-rituals-busy-professionals',
    title: 'Wellness Rituals for Busy Professionals',
    excerpt:
      'Small, luxurious habits that fit into a demanding schedule — and actually restore you.',
    content: `You do not need a free weekend to feel restored. Micro-rituals matter: five minutes of breathwork before meetings, a weekly massage, an evening facial oil massage.

Our Executive Reset package was designed for this exact life — deep tissue work, hydrating facial, and a detox treatment that resets your body after travel or long weeks.

Membership at Olive Spa removes the friction of booking. Priority slots mean self-care stops being something you cancel when work gets busy.`,
    author: 'Olive Spa Team',
    date: '2026-03-10',
    category: 'Wellness Tips',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80',
    readTime: 5,
  },
  {
    id: 'spa-lifestyle-self-care-essential',
    title: 'Why Self-Care Is Essential, Not Optional',
    excerpt:
      'Reframing spa visits as health maintenance — the Olive Spa philosophy.',
    content: `At Olive Spa, we believe self-care is essential. It is not vanity. It is how you sustain energy, presence, and resilience for the people and work you love.

A spa visit is a pause — a deliberate choice to listen to your body. Over time, those pauses compound into better sleep, clearer skin, softer shoulders, and a calmer mind.

Whether you are a tourist discovering Juba, a bride preparing for your day, or a professional reclaiming balance, there is a place for you here.`,
    author: 'Olive Spa Team',
    date: '2026-02-14',
    category: 'Spa Lifestyle',
    image: 'https://images.unsplash.com/photo-1596178060883-df480d500b3f?w=1000&q=80',
    readTime: 4,
  },
]

export const getPostById = (id) => blogPosts.find((p) => p.id === id)
