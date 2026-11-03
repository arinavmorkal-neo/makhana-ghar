export interface FallbackBlog {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  featured: boolean;
  readTime: string;
  views: number;
  content: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    primaryKeywords?: string;
  };
}

export const fallbackBlogs: FallbackBlog[] = [
  {
    id: 'dummy-1',
    slug: 'health-benefits-of-makhana-fox-nuts',
    title: '10 Proven Health Benefits of Makhana (Fox Nuts): The Ultimate Superfood',
    date: '28 Oct 2026',
    author: 'Makhana Ghar Editorial',
    category: 'Health & Nutrition',
    image: '/banner1.webp',
    featured: true,
    readTime: '6 min read',
    views: 1420,
    excerpt:
      'Discover why Makhana (popped lotus seed) is celebrated globally as an antioxidant-rich, low-calorie powerhouse packed with plant protein, calcium, and heart-friendly minerals.',
    seo: {
      metaTitle: '10 Proven Health Benefits of Makhana (Fox Nuts) | Makhana Ghar',
      metaDescription:
        'Explore the science-backed health benefits of makhana (fox nuts). From weight loss and diabetes management to anti-aging antioxidants and heart health.',
      primaryKeywords: 'makhana health benefits, fox nuts nutrition, lotus seeds benefits, makhana for weight loss',
    },
    content: `Makhana, scientifically named *Euryale ferox* and popularly known across international markets as fox nuts or gorgon nuts, has evolved from a revered traditional Indian fasting food into one of the most sought-after functional superfoods worldwide.

Harvested primarily from the freshwater wetland ecosystems of Bihar, India, these popped edible seeds are not only naturally gluten-free and cholesterol-free, but they also boast an exceptionally high nutrient density that fits seamlessly into modern healthy lifestyles.

### 1. Exceptionally Rich in Plant-Based Protein
For vegetarians, vegans, and fitness enthusiasts, makhana provides an outstanding plant-based protein source. A 100g serving of makhana contains approximately 9.7 grams of clean, bioavailable protein, making it an ideal pre-workout snack or post-exercise replenishment.

### 2. Low Glycemic Index & Diabetes-Friendly
Makhana has a significantly low glycemic index (GI), which means it releases glucose gradually into the bloodstream rather than triggering rapid insulin spikes. Combined with its high magnesium and low sodium profile, it is an exceptional snacking choice for individuals managing blood sugar levels or diabetes.

### 3. Supports Healthy Weight Management
Unlike fried or carb-heavy packaged snacks, roasted makhana is naturally low in calories and saturated fats. Its high dietary fiber content promotes satiety and curbs unnecessary hunger pangs, assisting individuals in maintaining calorie deficits without sacrificing crunch or flavor.

### 4. Rich in Anti-Aging Antioxidants
Makhana is loaded with potent polyphenols and flavonoids such as kaempferol, renowned for their anti-inflammatory and free-radical-scavenging capabilities. These antioxidants help protect skin cells from oxidative stress, helping slow cellular aging and promote youthful skin vitality.

### 5. Promotes Heart & Cardiovascular Health
With an advantageous potassium-to-sodium ratio and notable quantities of magnesium, makhana supports balanced blood pressure and optimal oxygen and blood flow throughout the cardiovascular system.

### 6. Strengthens Bones & Teeth
Makhana contains ample amounts of calcium (approx. 60mg per 100g), an indispensable mineral required for bone mineral density, joint flexibility, and dental strength.

### 7. Gluten-Free & Easy to Digest
Because it is naturally 100% gluten-free and soothing to the digestive tract, makhana is gentle on sensitive stomachs, non-allergenic, and suitable for all age groups from toddlers to senior citizens.

At Makhana Ghar, we preserve all these natural micronutrients through gentle, traditional sun-drying and hygienic grade classification, ensuring your family receives nothing short of pure, unadulterated nourishment direct from Bihar's harvest ponds.`,
  },
  {
    id: 'dummy-2',
    slug: 'complete-guide-to-makhana-grading-and-sutta',
    title: 'The Complete Makhana Grading Guide: 4+, 5+, and 6+ Sutta Explained',
    date: '15 Oct 2026',
    author: 'Arinav Morkal',
    category: 'Wholesale & Sourcing',
    image: '/banner2.webp',
    featured: true,
    readTime: '5 min read',
    views: 980,
    excerpt:
      'Understanding commercial makhana sizing and quality metrics. Learn how the traditional Sutta grading system works, moisture thresholds, and export specifications.',
    seo: {
      metaTitle: 'Makhana Grading Guide: 4+, 5+, 6+ Sutta Explained | Makhana Ghar',
      metaDescription:
        'A comprehensive guide to makhana grading standards in India. Understand what 4+ sutta, 5+ sutta, and 6+ sutta jumbo makhana mean for bulk buyers.',
      primaryKeywords: 'makhana grading system, 4 sutta makhana, 5 sutta makhana, 6 sutta jumbo makhana, bulk makhana specifications',
    },
    content: `When sourcing wholesale or commercial bulk quantities of makhana from Bihar, one of the most critical factors that determines pricing, texture, and application is the grading standard.

In India's primary trade markets like Katihar, Purnea, and Darbhanga, makhana is classified using the traditional **"Sutta"** measurement system. Understanding this grading system is vital for distributors, exporters, and private-label brands.

### What is the "Sutta" System?
"Sutta" is a traditional Indian unit of linear measurement roughly equivalent to one-eighth of an inch (1/8 inch or approximately 3.175 mm). In the context of popped makhana, the grade indicates the average spherical diameter and popping uniformity of each kernel:

1. **4 Sutta / 4+ Sutta (Standard / Compact Grade):**
   - Diameter: ~12mm to 14mm
   - Characteristics: Smaller, dense, extremely crunchy kernel.
   - Best For: Industrial namkeen mixes, spiced roasted snack pouches, and blended food formulations where smaller bite sizes are preferred.

2. **5 Sutta / 5+ Sutta (Export / Premium Grade):**
   - Diameter: ~15mm to 18mm
   - Characteristics: Well-expanded, bright white, fluffy kernel with minimal black seed coat remnants.
   - Best For: Gourmet consumer retail packaging, premium flavored snacks, and international export consignments.

3. **6 Sutta / 6+ Sutta (Jumbo / Super Premium Grade):**
   - Diameter: ~19mm and above
   - Characteristics: Massive expansion, cloud-like puffiness, pristine aesthetic appearance, and tender crunch.
   - Best For: Luxury gifting boxes, wedding hampers, high-end organic supermarket shelves, and flagship retail offerings.

### Essential Quality Parameters Beyond Size
While kernel size is the most visible criterion, commercial buyers must inspect three additional parameters:
- **Moisture Content:** Must be strictly below 10-12% to guarantee prolonged crispness and prevent microbial spoilage.
- **Popping Efficiency & Cleanliness:** Absence of hard unpopped shells (thuri) and dark seed hulls.
- **Color & Whiteness:** Naturally bright ivory-white without artificial sulfur bleaches or chemical enhancements.

At Makhana Ghar, every lot undergoes precision mechanical grading followed by manual hand-sorting, ensuring zero adulteration, uniform sutta compliance, and international food safety benchmarks.`,
  },
  {
    id: 'dummy-3',
    slug: 'from-mithila-ponds-to-global-pantries-bihar-makhana',
    title: 'From Wetland Ponds to Global Pantries: The Story of Bihar Fox Nuts',
    date: '02 Oct 2026',
    author: 'Makhana Ghar Editorial',
    category: 'Origin & Heritage',
    image: '/banner1.webp',
    featured: false,
    readTime: '4 min read',
    views: 870,
    excerpt:
      'Explore the unique geographical conditions and timeless harvesting heritage of Mithila and North Bihar that make it the undisputed epicenter of global makhana production.',
    seo: {
      metaTitle: 'The Story of Bihar Makhana: From Mithila Ponds to Global Pantries',
      metaDescription:
        'Discover how Bihar produces over 90% of the world’s makhana. Learn about Mithila’s unique ecosystem, traditional hand-popping, and GI tag recognition.',
      primaryKeywords: 'bihar makhana history, mithila makhana gi tag, makhana harvesting process, bihar lotus seed farmers',
    },
    content: `Over 85% to 90% of the entire world's makhana supply originates from a concentrated belt in North Bihar, spanning the districts of Katihar, Darbhanga, Madhubani, Purnea, and Saharsa.

This geographical exclusivity is not accidental — it is the result of thousands of years of natural wetland ecology, monsoon floodplains, and the generational expertise of local Mallah harvesting communities.

### The Sacred Aquatic Ecosystem
Makhana is an aquatic crop cultivated in perennial ponds, oxbow lakes (mauns), and low-lying swampy floodplains of the Kosi and Gandak river basins. The plant flourishes in stagnant, nutrient-rich shallow waters where its gigantic prickly leaves spread across the water surface like green blankets.

### The Painstaking Harvest
Harvesting makhana is one of the most labor-intensive agricultural processes known:
- In late summer, experienced harvesters wade into muddy ponds, holding their breath to dive underwater and scoop up thorny seeds gathered at the pond floor using traditional bamboo baskets called *Ganja*.
- The collected black seeds are thoroughly washed, cleaned of silt, and spread across vast open yards for natural sun-drying.

### The Art of Hand-Popping (Phutna)
After sun-drying, the seeds are roasted in earthen or cast-iron pans over high flames. Once the hard outer shell reaches the critical popping temperature, it is placed on a wooden anvil and struck instantaneously with a wooden mallet. In a fraction of a second, the hard black shell splits open, and the pristine white puffed makhana bursts forth!

In recognition of this unique regional heritage and unparalleled quality, **Mithila Makhana** was officially awarded the prestigious **Geographical Indication (GI) Tag** by the Government of India.

Makhana Ghar takes immense pride in preserving this direct link between our local farmer clusters and international buyers, championing fair trade practices, farmer livelihoods, and sustainable agricultural stewardship.`,
  },
];

