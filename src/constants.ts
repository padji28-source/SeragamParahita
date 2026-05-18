import { Product, Partner, Material, LiveProject, MajorPartner } from './types';

export const PARTNERS: Partner[] = [
  { name: 'Pertamina', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Pertamina_Logo.svg' },
  { name: 'Alfamart', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/ALFAMART_LOGO_BARU.png' },
  { name: 'Bridgestone', logo: 'https://bpando.org/wp-content/uploads/New-Bridgestone-Logo-Design-2011-BPO.jpg' },
  { name: 'Shell', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Shell_logo.svg' },
  { name: 'Hankook', logo: 'https://1000logos.net/wp-content/uploads/2020/08/Hankook-Logo-1990s.png' },
  { name: 'Superindo', logo: 'https://www.superindo.co.id/korporasi-keberlanjutan/upload/images/LOGO%20SUPER%20INDO%20PNG.PNG' },
  { name: 'Dan+Dan', logo: 'https://e7.pngegg.com/pngimages/235/773/png-clipart-logo-indonesia-alfamart-service-health-and-beauty-miscellaneous-blue.png' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Seragam Waralaba',
    category: 'Waralaba',
    image: '/alfa3.jpg',
    images: ['/alfa1.png', '/alfa2.png', '/alfa3.jpg'],
    badge: 'Best Seller',
    description: 'Produk seragam unggulan kami, yang hampir seluruhnya berjenis kemeja & polo shirt. Untuk kebutuhan seragam Waralaba anda yang bergerak dibidan barang atau jasa.',
    features: ['Kualitas Premium', 'Nyaman Dipakai', 'Desain Custom'],
    materialId: '1',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: '2',
    name: 'Seragam Otomotif',
    category: 'Otomotif',
    image: '/shell.jpg',
    images: ['/shell1.png', '/shell2.jpg', '/shell.jpg'],
    badge: 'Durable',
    description: 'Kami siap membantu anda dalam pembuatan seragam Otomotif dengan berbagai jenis model & desain. Yang dimana dalam pemakaiannya menuntut kualitas , daya tahan & kenyamanan.',
    features: ['Tahan Lama', 'Kualitas Tinggi', 'Desain Sporty'],
    materialId: '2',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: '3',
    name: 'Seragam Tambang',
    category: 'Tambang',
    image: '/pertamina1.jpg',
    images: ['/pertamina2.jpg', '/pertamina1.jpg', '/pertamina3.png'],
    badge: 'Safety First',
    description: 'Seragam lapangan untuk perusahaan minyak bumi, konstruksi & pekerjaan umum yang selalu kami kembangkan agar terlihat menarik, tanpa mengurangi fungsinya sebagai seragam lapangan.',
    features: ['Reflective Tape', 'Bahan Kuat', 'Fungsional'],
    materialId: '2',
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
  {
    id: '4',
    name: 'Seragam F&B',
    category: 'Food & Beverage',
    image: '/langham3.jpg',
    images: ['/langham1.png', '/langham2.png'],
    badge: 'Hygienic',
    description: 'Untuk pembuatan seragam seperti Apron, Baju & Topi Koki untuk keperluan perusahaan F&B anda, kami pun siap membantu.',
    features: ['Mudah Dibersihkan', 'Bahan Nyaman', 'Set Lengkap'],
    materialId: '1',
    sizes: ['All Size', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '5',
    name: 'Seragam Event',
    category: 'Event',
    image: '/dandan.jpg',
    images: ['/dandan1.jpg', '/dandan2.jpg', '/dandan.jpg'],
    badge: 'Fast Production',
    description: 'Perusahaan anda membutuhkan seragam untuk keperluan Gathering & Promosi yang di tuntun cepat & berkualitas? Parahita dapat membantu anda.',
    features: ['Produksi Cepat', 'Harga Kompetitif', 'Desain Menarik'],
    materialId: '1',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: '6',
    name: 'Seragam Kantor',
    category: 'Kantor',
    image: '/transmart.jpg',
    images: ['/transmart1.jpg', '/transmart2.jpg', '/transmart.jpg'],
    badge: 'Exclusive',
    description: 'Formal, Exclusive, & Nyaman adalah salah satu syarat seragam Kantor atau Staff dalam perusahaan anda? Kami berpengalaman dalam pembuatannya.',
    features: ['Formal & Eksklusif', 'Bahan Premium', 'Jahitan Rapi'],
    materialId: '1',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom'],
  },
  {
    id: '7',
    name: 'Merchandise',
    category: 'Merchandise',
    image: '/bd.png',
    images: ['/bg.png'],['/tb.jpg'],
    badge: 'Accessories',
    description: 'Accessories seperti Topi dan Goodie bag, adalah salah satu dari sekian banyak produk yang dapat kami produksi.',
    features: ['Custom Logo', 'Berbagai Pilihan', 'Kualitas Terjamin'],
    materialId: '1',
    sizes: ['All Size'],
  },
];

export const MATERIALS: Material[] = [
  {
    id: '1',
    name: 'Premium Cotton Pique',
    image: '/images.jpeg',
    specifications: {
      grammage: '230g',
      composition: '100% Cotton',
      recommendedUse: 'Uniforms & Polo Shirts',
      technicals: ['Breathable', 'Soft Touch', 'Durable Color'],
    },
  },
  {
    id: '2',
    name: 'Heavy Duty Drill',
    image: '/product-1.jpg',
    specifications: {
      grammage: '280g',
      composition: '65% Poly, 35% Cotton',
      recommendedUse: 'Safety Wear & Field Uniforms',
      technicals: ['Tear Resistant', 'Easy Care', 'Industrial Wash'],
    },
  },
  {
    id: '3',
    name: 'Lacoste CVC',
    image: '/images-1.jpeg',
    specifications: {
      grammage: '210g',
      composition: '60% Cotton, 40% Polyester',
      recommendedUse: 'Premium Polo Shirts',
      technicals: ['Absorbent', 'Shape Retention', 'Less Wrinkle'],
    },
  },
  {
    id: '4',
    name: 'Oxford Tropical',
    image: '/images.jpeg',
    specifications: {
      grammage: '180g',
      composition: 'Polyester Cotton Blend',
      recommendedUse: 'Formal Office Shirts',
      technicals: ['Cool Feel', 'Formal Look', 'Easy Iron'],
    },
  },
];

export const HERO_IMAGES = [
  '/product-1.jpg',
  '/product-2.jpg',
];

export const LIVE_PROJECTS: LiveProject[] = [
  {
    id: '1',
    title: 'Pattern Cutting',
    status: 'Sewing 75k complete',
    progress: 75,
    image: '/images.jpeg',
  },
  {
    id: '2',
    title: 'Sewing & Assembly',
    status: 'Sewing 75% complete',
    progress: 98,
    image: '/images-1.jpeg',
  },
  {
    id: '3',
    title: 'Quality Control & Finishing',
    status: 'Quality 70k complete',
    progress: 55,
    image: '/images-2.jpeg',
  },
];

export const MAJOR_PARTNERS: MajorPartner[] = [
  {
    id: '1',
    name: 'Alfamart',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/ALFAMART_LOGO_BARU.png',
    status: 'Live Order',
    progress: 85,
  },
  {
    id: '2',
    name: 'Hankook',
    logo: 'https://1000logos.net/wp-content/uploads/2020/08/Hankook-Logo-1990s.png',
    status: 'Live Order',
    progress: 60,
  },
  {
    id: '3',
    name: 'Dan+Dan',
    logo: 'https://e7.pngegg.com/pngimages/235/773/png-clipart-logo-indonesia-alfamart-service-health-and-beauty-miscellaneous-blue.png',
    status: 'Live Order',
    progress: 45,
  },
  {
    id: '4',
    name: 'Bridgestone',
    logo: 'https://bpando.org/wp-content/uploads/New-Bridgestone-Logo-Design-2011-BPO.jpg',
    status: 'Live Order',
    progress: 90,
  },
];
