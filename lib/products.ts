import type { Category, Product } from "./types";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

// Verified image pool
const IMG = {
  greenBottle: u("1602143407151-7111542de6e8"),
  moodyCandle: u("1603006905003-be475563bc59"),
  perfumeTrio: u("1615634260167-c8cdede054de"),
  pillarCandles: u("1601479604588-68d9e6d386b5"),
  bergamotCandle: u("1596433809252-260c2745dfdd"),
  livingRoomBoho: u("1556228453-efd6c1ff04f6"),
  skincareFlatlay: u("1598440947619-2c35fc9aa908"),
  whiteTube: u("1620916566398-39f1143ab7be"),
  darkApothecary: u("1611930022073-b7a4ba5fcccd"),
  whiteBottles: u("1631729371254-42c2892f0e6e"),
  apothecaryFlatlay: u("1612817288484-6f916006741a"),
  amberDropper: u("1617897903246-719242758050"),
  amberPerfume: u("1622618991746-fe6004db3a47"),
  guaSha: u("1600428877878-1a0fd85beda8"),
  marbledSoap: u("1607006344380-b6775a0824a7"),
  wrappedSoap: u("1584305574647-0cc949a2bb9f"),
  reedDiffuser: u("1620733723572-11c53f73a416"),
  tanSofa: u("1578500494198-246f612d3b3d"),
  planters: u("1610701596007-11502861dcfa"),
  greenInterior: u("1616046229478-9901c5536a45"),
  giftBoxes: u("1595246140625-573b715d11dc"),
  seedlings: u("1466692476868-aef1dfb1e735"),
  teapot: u("1564890369478-c89ca6d9cde9"),
  teaOverhead: u("1571934811356-5cc061b6821f"),
  haworthia: u("1509423350716-97f9360b4e09"),
  handsRitual: u("1519823551278-64ac92734fb1"),
  flowerShop: u("1487070183336-b863922373d4"),
  creamSkincare: u("1585652757141-8837d676fac8"),
};

export const EDITORIAL_IMAGES = {
  hero: u("1617897903246-719242758050", 1600),
  story: IMG.flowerShop,
  seedlings: IMG.seedlings,
  ritual: IMG.handsRitual,
  interior: IMG.greenInterior,
  apothecary: u("1612817288484-6f916006741a", 1600),
};

export const CATEGORIES: { name: Category; image: string; blurb: string }[] = [
  { name: "Candles", image: IMG.pillarCandles, blurb: "Slow-burning, small-batch" },
  { name: "Skincare", image: IMG.creamSkincare, blurb: "Botanical, clinically kind" },
  { name: "Fragrance", image: IMG.amberPerfume, blurb: "Composed in small editions" },
  { name: "Bath & Body", image: IMG.wrappedSoap, blurb: "Cold-pressed and gentle" },
  { name: "Home", image: IMG.planters, blurb: "Objects for quiet rooms" },
  { name: "Botanicals", image: IMG.teaOverhead, blurb: "Steeped, dried, alive" },
];

export const BRANDS = [
  "Rosée Atelier",
  "Aster & Oak",
  "Common Ground",
  "Terra Luma",
  "Wildstem",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "bergamot-cedar-candle",
    name: "Bergamot & Cedar Candle",
    tagline: "Citrus peel over warm woods",
    description:
      "Our signature candle opens with sun-bitter bergamot and settles into cedarwood and a whisper of smoked vanilla. Poured by hand into a reusable amber glass vessel, it burns clean for over 50 hours.",
    details: [
      "100% soy-coconut wax blend",
      "50+ hour burn time · 240 g",
      "Cotton wick, phthalate-free perfume",
      "Hand-poured in small batches",
    ],
    ingredients: "Soy wax, coconut wax, bergamot peel oil, cedarwood atlas, vanilla absolute.",
    price: 38,
    category: "Candles",
    brand: "Rosée Atelier",
    tags: ["signature", "gift", "woody", "citrus"],
    images: [IMG.bergamotCandle, IMG.moodyCandle, IMG.pillarCandles],
    rating: 4.9,
    reviewCount: 214,
    reviews: [
      {
        author: "Maya R.",
        rating: 5,
        date: "2026-05-14",
        title: "The scent of a good morning",
        body: "Bright without being sharp. It fills the room within ten minutes and the amber jar looks beautiful on the shelf long after.",
      },
      {
        author: "Tom H.",
        rating: 5,
        date: "2026-04-02",
        title: "Third repurchase",
        body: "I've gone through two already. Burns perfectly even, no tunneling, and the throw is exceptional for the size.",
      },
      {
        author: "Priya S.",
        rating: 4,
        date: "2026-02-19",
        title: "Lovely, slightly subtle",
        body: "Gorgeous scent, though I'd love a larger size for bigger rooms. The packaging is gift-ready as-is.",
      },
    ],
    inStock: true,
    isBestseller: true,
    popularity: 98,
    createdAt: "2025-03-10",
  },
  {
    id: "p02",
    slug: "amber-noir-candle",
    name: "Amber Noir Candle",
    tagline: "For evenings that linger",
    description:
      "A low-lit, resinous blend of labdanum, black amber and tonka. Amber Noir is the candle we light when the day is done and the conversation isn't.",
    details: [
      "100% soy-coconut wax blend",
      "45 hour burn time · 220 g",
      "Smoked glass vessel, reusable",
      "Best enjoyed after dusk",
    ],
    ingredients: "Soy wax, coconut wax, labdanum resin, amber accord, tonka bean.",
    price: 42,
    category: "Candles",
    brand: "Terra Luma",
    tags: ["evening", "resinous", "moody"],
    images: [IMG.moodyCandle, IMG.bergamotCandle],
    rating: 4.7,
    reviewCount: 96,
    reviews: [
      {
        author: "Elena V.",
        rating: 5,
        date: "2026-03-30",
        title: "Like velvet",
        body: "Deep and warm without any sweetness. My whole reading corner smells like a library in the best way.",
      },
      {
        author: "Jordan K.",
        rating: 4,
        date: "2026-01-12",
        title: "Rich and slow",
        body: "Takes a little while to open up, but once it does it's unmatched. Would buy again.",
      },
    ],
    inStock: true,
    lowStock: true,
    popularity: 82,
    createdAt: "2025-06-22",
  },
  {
    id: "p03",
    slug: "fig-grove-pillar-trio",
    name: "Fig Grove Pillar Trio",
    tagline: "Three heights, one quiet flame",
    description:
      "A sculptural trio of unscented pillar candles in graduated heights, made from pure vegetable wax. Designed to gather light at the center of a table.",
    details: [
      "Set of three: 10, 14 and 18 cm",
      "Pure vegetable wax, dripless",
      "Unscented — dinner-table safe",
      "Approx. 20h burn per pillar",
    ],
    price: 29,
    compareAtPrice: 36,
    category: "Candles",
    brand: "Common Ground",
    tags: ["set", "table", "unscented", "sale"],
    images: [IMG.pillarCandles, IMG.moodyCandle],
    rating: 4.5,
    reviewCount: 58,
    reviews: [
      {
        author: "Amara D.",
        rating: 5,
        date: "2026-02-07",
        title: "Dinner party essential",
        body: "They burn slowly and evenly, and the three heights look intentional rather than fussy.",
      },
    ],
    inStock: true,
    popularity: 66,
    createdAt: "2025-09-15",
  },
  {
    id: "p04",
    slug: "damask-rose-recovery-serum",
    name: "Damask Rose Recovery Serum",
    tagline: "Overnight repair, botanical first",
    description:
      "Our most-loved formula. Cold-pressed rosehip and damask rose extract in a fast-absorbing squalane base, balanced with 2% bakuchiol — a gentle, plant-derived alternative to retinol. Wake to visibly calmer, softer skin.",
    details: [
      "30 ml · UV-protective amber glass",
      "2% bakuchiol, 12% rosehip CO2 extract",
      "Suitable for sensitive skin",
      "Vegan, fragrance from botanicals only",
    ],
    ingredients:
      "Squalane (olive), rosa damascena extract, rosehip seed CO2, bakuchiol, vitamin E, jojoba seed oil.",
    price: 64,
    category: "Skincare",
    brand: "Rosée Atelier",
    tags: ["signature", "serum", "night", "sensitive-skin"],
    images: [IMG.amberDropper, IMG.apothecaryFlatlay, IMG.skincareFlatlay],
    rating: 4.8,
    reviewCount: 342,
    reviews: [
      {
        author: "Sofia L.",
        rating: 5,
        date: "2026-06-02",
        title: "Replaced my retinol",
        body: "Three months in: redness down, texture smoother, zero irritation. This is the first 'gentle' product that actually performs.",
      },
      {
        author: "Hana K.",
        rating: 5,
        date: "2026-05-21",
        title: "Worth every penny",
        body: "A little goes a long way — the dropper gives exactly one dose. Smells faintly of real roses, not perfume.",
      },
      {
        author: "Claire B.",
        rating: 4,
        date: "2026-03-08",
        title: "Lovely texture",
        body: "Absorbs quickly and layers well under moisturizer. I wish the bottle were bigger, which says it all.",
      },
    ],
    inStock: true,
    isBestseller: true,
    popularity: 100,
    createdAt: "2025-01-20",
  },
  {
    id: "p05",
    slug: "cloud-cream-moisturizer",
    name: "Cloud Cream Moisturizer",
    tagline: "Weightless, all-day water",
    description:
      "A gel-cream that drapes skin in moisture without a trace of heaviness. Oat ceramides and snow mushroom hold hydration through the day; nothing sits on the surface.",
    details: [
      "50 ml · airless pump",
      "Oat-derived ceramides + snow mushroom",
      "Non-comedogenic, fragrance-free",
      "Morning and evening use",
    ],
    ingredients:
      "Aqua, tremella fuciformis extract, oat ceramides, glycerin, panthenol, allantoin.",
    price: 52,
    category: "Skincare",
    brand: "Aster & Oak",
    tags: ["moisturizer", "fragrance-free", "daily"],
    images: [IMG.whiteBottles, IMG.whiteTube],
    rating: 4.6,
    reviewCount: 127,
    reviews: [
      {
        author: "Dev P.",
        rating: 5,
        date: "2026-06-18",
        title: "Finally, no residue",
        body: "Sits perfectly under sunscreen. My combination skin has never been this consistent.",
      },
      {
        author: "Ines M.",
        rating: 4,
        date: "2026-05-30",
        title: "Great daily cream",
        body: "Light but genuinely hydrating. The airless pump means no waste at the end.",
      },
    ],
    inStock: true,
    isNew: true,
    popularity: 88,
    createdAt: "2026-05-01",
  },
  {
    id: "p06",
    slug: "gentle-body-exfoliant",
    name: "Gentle Body Exfoliant",
    tagline: "Polish, never scratch",
    description:
      "Bamboo powder and lactic acid resurface in tandem — one physical, one chemical, both gentle. Skin is left soft enough to skip lotion.",
    details: [
      "180 ml tube",
      "5% lactic acid + fine bamboo powder",
      "Use 2–3× weekly in the shower",
      "pH balanced at 4.5",
    ],
    ingredients:
      "Aqua, lactic acid, bambusa arundinacea powder, coconut-derived surfactants, aloe leaf juice.",
    price: 34,
    category: "Skincare",
    brand: "Aster & Oak",
    tags: ["body", "exfoliant", "shower"],
    images: [IMG.whiteTube, IMG.creamSkincare],
    rating: 4.4,
    reviewCount: 73,
    reviews: [
      {
        author: "Ravi N.",
        rating: 4,
        date: "2026-04-11",
        title: "Does what it says",
        body: "Noticeably smoother after two uses. Subtle, pleasant, and the tube lasts ages.",
      },
    ],
    inStock: true,
    popularity: 61,
    createdAt: "2025-08-05",
  },
  {
    id: "p07",
    slug: "morning-ritual-set",
    name: "The Morning Ritual Set",
    tagline: "Four steps, five quiet minutes",
    description:
      "Everything for an unhurried morning: cleansing balm, botanical toner, vitamin serum and cloud cream, arranged in order of use. Wrapped in our signature linen-textured box.",
    details: [
      "Full-size cleanser, toner, serum, cream",
      "Saves 22% vs. buying separately",
      "Linen gift box, recyclable",
      "Routine card included",
    ],
    price: 88,
    compareAtPrice: 112,
    category: "Skincare",
    brand: "Rosée Atelier",
    tags: ["set", "gift", "routine", "sale"],
    images: [IMG.creamSkincare, IMG.skincareFlatlay, IMG.apothecaryFlatlay],
    rating: 4.7,
    reviewCount: 89,
    reviews: [
      {
        author: "Louise F.",
        rating: 5,
        date: "2026-06-25",
        title: "Bought as a gift, kept it",
        body: "Ordered for my sister's birthday and ended up ordering a second for myself. The unboxing alone is worth it.",
      },
      {
        author: "Anna T.",
        rating: 5,
        date: "2026-04-19",
        title: "Perfect starter set",
        body: "I knew nothing about skincare and this made it effortless. The routine card is a thoughtful touch.",
      },
    ],
    inStock: true,
    isBestseller: true,
    popularity: 92,
    createdAt: "2025-11-12",
  },
  {
    id: "p08",
    slug: "jade-rose-quartz-facial-kit",
    name: "Jade & Rose Quartz Facial Kit",
    tagline: "Cool stone, warm skin",
    description:
      "A hand-carved gua sha and rose quartz roller, paired with a mini facial oil. Five minutes of lymphatic massage that reads as self-respect, not self-indulgence.",
    details: [
      "Genuine jade gua sha + rose quartz roller",
      "15 ml facial oil included",
      "Linen storage pouch",
      "Technique guide with QR video",
    ],
    price: 46,
    category: "Skincare",
    brand: "Wildstem",
    tags: ["tools", "ritual", "gift", "massage"],
    images: [IMG.guaSha, IMG.skincareFlatlay],
    rating: 4.5,
    reviewCount: 64,
    reviews: [
      {
        author: "Mira J.",
        rating: 5,
        date: "2026-03-14",
        title: "Beautiful and useful",
        body: "The stones are cool, heavy, clearly real. The video guide made the technique easy to learn.",
      },
    ],
    inStock: true,
    popularity: 70,
    createdAt: "2025-10-02",
  },
  {
    id: "p09",
    slug: "apothecary-tincture-collection",
    name: "Apothecary Tincture Collection",
    tagline: "Three drops of the old ways",
    description:
      "Ashwagandha, elderberry and chamomile tinctures, extracted slowly in small copper stills. A modern take on the herbalist's cabinet — matte black glass, plain-spoken labels.",
    details: [
      "3 × 30 ml tinctures",
      "Double-extracted, alcohol base",
      "Small-batch, third-party tested",
      "Not intended as medical treatment",
    ],
    price: 58,
    category: "Skincare",
    brand: "Terra Luma",
    tags: ["wellness", "herbal", "set"],
    images: [IMG.darkApothecary, IMG.apothecaryFlatlay],
    rating: 4.3,
    reviewCount: 41,
    reviews: [
      {
        author: "Noah W.",
        rating: 4,
        date: "2026-05-09",
        title: "Handsome and calming",
        body: "The chamomile one has become part of my evening tea. Bottles look great on open shelving.",
      },
    ],
    inStock: true,
    isNew: true,
    popularity: 55,
    createdAt: "2026-04-14",
  },
  {
    id: "p10",
    slug: "eau-de-rosee-no1",
    name: "Eau de Rosée №1",
    tagline: "Dew on rose petals, bottled at dawn",
    description:
      "Our first fragrance and still our north star. Damask rose over green fig leaf, grounded in white musk and blond woods. Composed in Grasse, bottled in editions of one thousand.",
    details: [
      "50 ml eau de parfum",
      "Numbered edition bottle",
      "6–8 hour longevity",
      "Notes: rose, fig leaf, white musk",
    ],
    price: 120,
    category: "Fragrance",
    brand: "Rosée Atelier",
    tags: ["signature", "floral", "edition", "gift"],
    images: [IMG.amberPerfume, IMG.perfumeTrio],
    rating: 4.9,
    reviewCount: 186,
    reviews: [
      {
        author: "Gabrielle M.",
        rating: 5,
        date: "2026-06-20",
        title: "My signature now",
        body: "Rose without the powder, green without the sharpness. I get asked what I'm wearing weekly.",
      },
      {
        author: "Wren A.",
        rating: 5,
        date: "2026-05-03",
        title: "Extraordinary depth",
        body: "Evolves beautifully over the day — bright in the morning, warm by evening. The numbered bottle is a lovely detail.",
      },
    ],
    inStock: true,
    isBestseller: true,
    popularity: 95,
    createdAt: "2025-02-14",
  },
  {
    id: "p11",
    slug: "santal-dusk-eau-de-parfum",
    name: "Santal Dusk Eau de Parfum",
    tagline: "Sandalwood at golden hour",
    description:
      "Creamy Australian sandalwood wrapped in cardamom and dried amber. Quietly magnetic — the kind of scent people lean closer to place.",
    details: [
      "50 ml eau de parfum",
      "8+ hour longevity",
      "Unisex composition",
      "Notes: sandalwood, cardamom, amber",
    ],
    price: 98,
    compareAtPrice: 125,
    category: "Fragrance",
    brand: "Terra Luma",
    tags: ["woody", "unisex", "evening", "sale"],
    images: [IMG.perfumeTrio, IMG.amberPerfume],
    rating: 4.6,
    reviewCount: 112,
    reviews: [
      {
        author: "Marcus O.",
        rating: 5,
        date: "2026-04-27",
        title: "Compliment magnet",
        body: "Warm, soft, never loud. Lasts from my morning commute through dinner.",
      },
    ],
    inStock: true,
    popularity: 84,
    createdAt: "2025-07-08",
  },
  {
    id: "p12",
    slug: "neroli-reed-diffuser",
    name: "Neroli Reed Diffuser",
    tagline: "A room that smells like an orchard",
    description:
      "Orange blossom and petitgrain diffused through black rattan reeds. Scent that arrives the way daylight does — evenly, and without announcement.",
    details: [
      "200 ml · lasts 3–4 months",
      "10 natural rattan reeds",
      "Alcohol-free base oil",
      "Refills available",
    ],
    price: 44,
    category: "Fragrance",
    brand: "Common Ground",
    tags: ["home", "citrus", "diffuser"],
    images: [IMG.reedDiffuser, IMG.bergamotCandle],
    rating: 4.4,
    reviewCount: 67,
    reviews: [
      {
        author: "Yuki S.",
        rating: 4,
        date: "2026-02-22",
        title: "Subtle done right",
        body: "Fills the entryway without ever being cloying. Three months in and still going.",
      },
    ],
    inStock: true,
    popularity: 62,
    createdAt: "2025-05-19",
  },
  {
    id: "p13",
    slug: "wildflower-soap-duo",
    name: "Wildflower Soap Duo",
    tagline: "Cut by hand, cured for weeks",
    description:
      "Two cold-process bars — calendula-oat and lavender-clay — cured for six weeks until they lather like cream. Wrapped in seeded paper you can plant.",
    details: [
      "2 × 110 g bars",
      "Cold-process, 6-week cure",
      "Palm-oil free",
      "Plantable seeded paper wrap",
    ],
    ingredients:
      "Saponified olive, coconut and shea oils, calendula petals, oat milk, lavender essential oil, french clay.",
    price: 18,
    category: "Bath & Body",
    brand: "Wildstem",
    tags: ["soap", "gift", "natural"],
    images: [IMG.wrappedSoap, IMG.marbledSoap],
    rating: 4.7,
    reviewCount: 154,
    reviews: [
      {
        author: "Beth C.",
        rating: 5,
        date: "2026-06-08",
        title: "The lather!",
        body: "Rich, creamy, and my skin doesn't feel stripped. I planted the wrapper and got actual flowers.",
      },
      {
        author: "Omar F.",
        rating: 5,
        date: "2026-03-27",
        title: "Great stocking gift",
        body: "Bought six duos for the holidays. Everyone asked where they were from.",
      },
    ],
    inStock: true,
    isBestseller: true,
    popularity: 90,
    createdAt: "2025-04-03",
  },
  {
    id: "p14",
    slug: "charcoal-oat-soap-stack",
    name: "Charcoal & Oat Soap Stack",
    tagline: "Detox for people who dislike the word",
    description:
      "Activated charcoal draws, colloidal oat soothes — a marbled stack of three bars that treats deep cleansing as a texture, not a punishment.",
    details: [
      "3 × 100 g marbled bars",
      "Activated bamboo charcoal",
      "Colloidal oatmeal 8%",
      "Suitable for face and body",
    ],
    price: 22,
    category: "Bath & Body",
    brand: "Wildstem",
    tags: ["soap", "charcoal", "set"],
    images: [IMG.marbledSoap, IMG.wrappedSoap],
    rating: 4.5,
    reviewCount: 82,
    reviews: [
      {
        author: "Dana R.",
        rating: 4,
        date: "2026-01-30",
        title: "Balanced, not drying",
        body: "Was skeptical of charcoal bars but the oat keeps it gentle. The marbling is different on every bar.",
      },
    ],
    inStock: true,
    lowStock: true,
    popularity: 74,
    createdAt: "2025-12-01",
  },
  {
    id: "p15",
    slug: "verdant-body-oil",
    name: "Verdant Body Oil",
    tagline: "Green as in growing",
    description:
      "A dry-touch body oil of hemp seed, rosemary leaf and cypress, in a matte forest-green bottle you'll keep. Absorbs before you've finished your coffee.",
    details: [
      "250 ml pump bottle",
      "Dry-touch, fast-absorbing",
      "Herbaceous scent, unisex",
      "Bottle designed for refills",
    ],
    ingredients:
      "Hemp seed oil, jojoba oil, rosemary leaf extract, cypress essential oil, vitamin E.",
    price: 36,
    category: "Bath & Body",
    brand: "Aster & Oak",
    tags: ["body-oil", "herbal", "refillable"],
    images: [IMG.greenBottle, IMG.whiteTube],
    rating: 4.6,
    reviewCount: 59,
    reviews: [
      {
        author: "Cass H.",
        rating: 5,
        date: "2026-06-29",
        title: "Actually dry-touch",
        body: "I can dress two minutes after applying. Smells like a herb garden after rain.",
      },
    ],
    inStock: true,
    isNew: true,
    popularity: 68,
    createdAt: "2026-06-10",
  },
  {
    id: "p16",
    slug: "stoneware-planter-cup-set",
    name: "Stoneware Planter & Cup Set",
    tagline: "Thrown, glazed, gathered",
    description:
      "A speckled stoneware planter with four matching cups, each thrown by hand and dipped in a quiet two-tone glaze. Imperfections are the point.",
    details: [
      "1 planter + 4 cups (220 ml)",
      "Hand-thrown stoneware",
      "Dishwasher-safe cups",
      "Each set subtly unique",
    ],
    price: 56,
    category: "Home",
    brand: "Common Ground",
    tags: ["ceramics", "handmade", "set"],
    images: [IMG.planters, IMG.tanSofa],
    rating: 4.8,
    reviewCount: 47,
    reviews: [
      {
        author: "Freya L.",
        rating: 5,
        date: "2026-05-16",
        title: "Heavier than expected — in a good way",
        body: "Substantial, beautifully glazed, and the speckle is lovelier in person. The planter drains properly too.",
      },
    ],
    inStock: true,
    popularity: 64,
    createdAt: "2025-10-25",
  },
  {
    id: "p17",
    slug: "haworthia-ceramic-pot",
    name: "Haworthia in Ceramic Pot",
    tagline: "A plant that forgives you",
    description:
      "A nursery-raised haworthia in our matte white vessel. Thrives on neglect, tolerates shade, asks for water twice a month. The right first plant, or fortieth.",
    details: [
      "Live plant, 12–15 cm tall",
      "Matte ceramic pot included",
      "Water every 2–3 weeks",
      "Ships in plastic-free packaging",
    ],
    price: 24,
    category: "Botanicals",
    brand: "Wildstem",
    tags: ["plant", "easy-care", "desk"],
    images: [IMG.haworthia, IMG.greenInterior],
    rating: 4.6,
    reviewCount: 91,
    reviews: [
      {
        author: "Sam T.",
        rating: 5,
        date: "2026-04-04",
        title: "Arrived thriving",
        body: "Packed beautifully with zero plastic. Six weeks on my dim desk and it's pushed out two new leaves.",
      },
    ],
    inStock: true,
    popularity: 77,
    createdAt: "2025-05-30",
  },
  {
    id: "p18",
    slug: "calm-blend-loose-leaf-tea",
    name: "Calm Blend Loose-Leaf Tea",
    tagline: "Chamomile, lemon balm, quiet",
    description:
      "A caffeine-free evening blend of chamomile, lemon balm, lavender and rose petals, dried slowly to keep the oils intact. Brews the color of late afternoon.",
    details: [
      "80 g loose leaf · ~40 cups",
      "Caffeine-free, organic",
      "Resealable kraft pouch",
      "Steep 5 min at 95°C",
    ],
    ingredients: "Chamomile flowers, lemon balm, lavender buds, rose petals.",
    price: 26,
    category: "Botanicals",
    brand: "Rosée Atelier",
    tags: ["tea", "evening", "caffeine-free"],
    images: [IMG.teaOverhead, IMG.teapot],
    rating: 4.7,
    reviewCount: 103,
    reviews: [
      {
        author: "Lena G.",
        rating: 5,
        date: "2026-06-14",
        title: "Part of my wind-down",
        body: "Floral but not perfumey. I sleep noticeably better on nights I have a cup.",
      },
    ],
    inStock: true,
    popularity: 79,
    createdAt: "2025-08-20",
  },
  {
    id: "p19",
    slug: "clay-teapot-ritual-set",
    name: "Clay Teapot Ritual Set",
    tagline: "Slow tea for fast weeks",
    description:
      "An unglazed clay teapot with two sipping cups and a bamboo tray. Clay seasons with every brew, developing a patina — and a memory — of your favorite teas.",
    details: [
      "350 ml teapot + 2 cups + tray",
      "Unglazed, hand-finished clay",
      "Seasons with use",
      "Hand-wash, water only",
    ],
    price: 72,
    category: "Botanicals",
    brand: "Terra Luma",
    tags: ["tea", "ceramics", "ritual", "gift"],
    images: [IMG.teapot, IMG.teaOverhead],
    rating: 4.8,
    reviewCount: 36,
    reviews: [
      {
        author: "Kenji M.",
        rating: 5,
        date: "2026-03-02",
        title: "Heirloom quality",
        body: "The pour is precise, the clay smells faintly of rain. This will outlive my other kitchenware.",
      },
    ],
    inStock: false,
    popularity: 58,
    createdAt: "2025-11-28",
  },
  {
    id: "p20",
    slug: "the-rosee-gift-box",
    name: "The Rosée Gift Box",
    tagline: "Our house, in one parcel",
    description:
      "The bergamot candle, wildflower soaps, calm blend tea and a mini recovery serum — our four most-loved pieces in a letterpressed kraft box, tied and ready to give.",
    details: [
      "4 full/travel-size favorites",
      "Letterpressed gift box",
      "Handwritten note card on request",
      "Ships gift-ready",
    ],
    price: 95,
    category: "Home",
    brand: "Rosée Atelier",
    tags: ["gift", "set", "signature"],
    images: [IMG.giftBoxes, IMG.apothecaryFlatlay, IMG.creamSkincare],
    rating: 4.9,
    reviewCount: 71,
    reviews: [
      {
        author: "Isabel R.",
        rating: 5,
        date: "2026-06-30",
        title: "The safest great gift",
        body: "Sent three this year — new mother, retirement, thank-you. Every recipient messaged me about the box itself before the contents.",
      },
    ],
    inStock: true,
    isBestseller: true,
    popularity: 86,
    createdAt: "2025-12-15",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelated(product: Product, count = 4): Product[] {
  const scored = PRODUCTS.filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (p.category === product.category) score += 3;
      if (p.brand === product.brand) score += 2;
      score += p.tags.filter((t) => product.tags.includes(t)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || b.p.popularity - a.p.popularity);
  return scored.slice(0, count).map((s) => s.p);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.map((p) => {
    let score = 0;
    const name = p.name.toLowerCase();
    if (name.startsWith(q)) score += 5;
    else if (name.includes(q)) score += 3;
    if (p.category.toLowerCase().includes(q)) score += 2;
    if (p.brand.toLowerCase().includes(q)) score += 2;
    if (p.tags.some((t) => t.includes(q))) score += 1;
    if (p.tagline.toLowerCase().includes(q)) score += 1;
    return { p, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.p.popularity - a.p.popularity)
    .map((s) => s.p);
}

export const BESTSELLERS = PRODUCTS.filter((p) => p.isBestseller);
export const NEW_ARRIVALS = [...PRODUCTS].sort(
  (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
);
export const PRICE_BOUNDS = { min: 18, max: 120 };
