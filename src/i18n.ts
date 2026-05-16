import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        products: 'Products',
        partner: 'Partner',
        about: 'About',
        contact: 'Contact',
        language: 'Language'
      },
      hero: {
        title: 'Excellence in Garment Manufacturing',
        subtitle: 'Providing high-quality uniforms and corporate wear for Indonesia\'s leading industries since 1990.',
        cta: 'Explore Products'
      },
      footer: {
        description: 'Leading garment manufacturer specializing in high-quality uniforms, corporate wear, and safety gear.',
        quickLinks: 'Quick Links',
        products: 'Products',
        contact: 'Contact',
        rights: '© 2024 Parahita Garment. All rights reserved.',
        privacy: 'Privacy Policy',
        terms: 'Terms & Conditions'
      },
      products: {
        title: 'Our Product',
        subtitle: 'High-quality garment solutions tailored for your industry needs.',
        categories: {
          all: 'All Products',
          franchise: 'Franchise',
          automotive: 'Automotive',
          mining: 'Mining',
          office: 'Office',
          media: 'Media',
          fnb: 'Food & Beverage',
          event: 'Event',
          merchandise: 'Merchandise'
        },
        items: {
          1: { name: 'Franchise Uniform', category: 'Franchise', desc: 'Our flagship uniform products, mostly shirts & polo shirts. For your franchise uniform needs.', features: ['Premium Quality', 'Comfortable', 'Custom Design'] },
          2: { name: 'Automotive Uniform', category: 'Automotive', desc: 'We are ready to help you create Automotive uniforms demanding durability and comfort.', features: ['Durable', 'High Quality', 'Sporty Design'] },
          3: { name: 'Mining Uniform', category: 'Mining', desc: 'Field uniforms for oil, construction, and public works companies developed to look attractive and functional.', features: ['Reflective Tape', 'Strong Material', 'Functional'] },
          4: { name: 'Media Uniform', category: 'Media', desc: 'We are experienced in creating uniforms for Electronic & Print Media with guaranteed quality.', features: ['Elegant Look', 'Quality Material', 'Guaranteed Quality'] },
          5: { name: 'F&B Uniform', category: 'Food & Beverage', desc: 'We are ready to help with F&B uniforms like Aprons, Chef Coats & Hats for your company.', features: ['Easy to Clean', 'Comfortable', 'Complete Set'] },
          6: { name: 'Event Uniform', category: 'Event', desc: 'Need uniforms for Gathering & Promotion demanding fast & quality production? Parahita can help.', features: ['Fast Production', 'Competitive Price', 'Attractive Design'] },
          7: { name: 'Office Uniform', category: 'Office', desc: 'Formal, Exclusive, & Comfortable office uniforms. We are experienced in making them.', features: ['Formal & Exclusive', 'Premium Material', 'Neat Stitching'] },
          8: { name: 'Merchandise', category: 'Merchandise', desc: 'Accessories like Hats and Goodie bags are among the many products we can produce.', features: ['Custom Logo', 'Various Choices', 'Guaranteed Quality'] }
        },
        inquiry: 'Inquiry This Product',
        viewDetails: 'View Details'
      },
      partner: {
        title: 'Our Trusted',
        subtitle: 'We take pride in collaborating with Indonesia\'s leading companies to provide high-quality garment solutions.',
        liveProduction: 'Live Production',
        activeStatus: 'Active Project Status',
        monitoring: 'Real-time monitoring of our ongoing manufacturing commitments for our major strategic partners.',
        capacity: 'Current Capacity',
        trackOrder: 'Track Order',
        strategicPartnerships: 'Strategic Partnerships',
        distinguished: 'OUR DISTINGUISHED PARTNERS',
        projectId: 'Project ID',
        efficiency: 'Efficiency',
        howItWorks: 'How It Works',
        simpleProcess: 'Simple Partnership Process',
        simpleProcessDesc: 'Getting started with Parahita is easy. We streamline our onboarding process to get your production running fast.',
        whyPartner: 'Why Choose Us?',
        whyPartnerDesc: 'We provide strategic advantages for your brand through quality, punctuality, and experience.',
        feedback: 'Partner Feedback',
        successStories: 'Success Stories',
        readyToScale: 'Ready to scale your',
        yourProduction: 'production?',
        joinNetwork: 'Join our network of successful partners and experience the future of apparel manufacturing.',
        becomePartner: 'Become a Partner',
        viewCaseStudies: 'View Case Studies',
        liveStatus: 'Live Status',
        productionTimeline: 'Production Timeline',
        processing: 'In Progress',
        completedDesc: 'Successfully completed and verified.',
        currentDesc: 'Currently at completion.',
        upcomingDesc: 'Scheduled for upcoming production phase.',
        estDelivery: 'Est. Delivery',
        viewDetails: 'View Details',
        benefits: {
          quality: {
            title: 'Quality',
            desc: 'We only use the best materials and threads. Every uniform goes through a strict Quality Control (QC) process to ensure neat and durable stitching.'
          },
          fast: {
            title: 'Time',
            desc: 'We understand that your time is valuable. Our production process is structured and efficient so that your uniform orders are always completed on time according to the deadline.'
          },
          scalable: {
            title: 'Experienced',
            desc: 'Supported by a team of tailors and management who have for years handled various uniform projects, ranging from small to large-scale corporations.'
          }
        },
        steps: {
          inquiry: 'Consultation & Design',
          inquiryDesc: 'Discuss your requirements and design concepts with our expert team.',
          sampling: 'Sampling Process',
          samplingDesc: 'We create prototypes for your approval to ensure quality and specifications.',
          production: 'Efficient Production',
          productionDesc: 'Large-scale manufacturing with real-time quality monitoring systems.',
          delivery: 'On-time Delivery',
          deliveryDesc: 'Quality-checked products delivered securely to your doorstep.'
        }
      },
      contact: {
        title: 'Contact',
        subtitle: 'Have a project you want to discuss? We are ready to hear from you.',
        contactInfo: 'Contact Information',
        contactDesc: 'Reach out to us through any of the following channels or visit our office.',
        phone: 'Phone',
        email: 'Email',
        office: 'Office',
        viewOnMaps: 'View on Google Maps',
        openMap: 'Open in Google Maps',
        waTitle: 'Direct Consultation via WhatsApp',
        waDesc: 'Our Sales team is ready to help you provide price estimates, materials, and design consultations quickly.',
        chatNow: 'Chat Now',
        form: {
          name: 'Full Name',
          email: 'Email Address',
          subject: 'Subject',
          message: 'Message',
          send: 'Send Message'
        }
      },
      about: {
        title: 'About',
        subtitle: 'Crafting excellence in every stitch since 1990.',
        vision: 'Our Vision',
        mission: 'Our Mission',
        visionStatement: 'To become a trusted and leading garment company in quality and service.',
        missionStatements: [
          'Provide high quality products at competitive prices.',
          'Provide fast and timely service.',
          'Continuous innovation in design and production processes.',
          'Build mutually beneficial long-term relationships with partners.'
        ],
        features: ['Premium Materials', 'Timely Delivery', 'Custom Designs', 'Quality Control'],
        yearsExcellence: 'Years of Excellence',
        companyProfile: 'Download Company Profile',
        story: {
          title: 'About Parahita',
          p1: 'Parahita Prima Sentosa was founded in 1990 with a simple yet strong foundation: delivering quality products and building lasting relationships. What started as a retail store gradually evolved alongside market demands and industry opportunities.',
          p2: 'In 2008, we strategically expanded into the garment industry, marking a significant milestone in our journey. Since then, we have focused on producing uniforms across various sectors, including the Food & Beverage (F&B), Retail, and Mining industries. This transition has allowed us to incorporate expertise, operational discipline, and industry-specific requirements into every product we manufacture.',
          p3: 'Today, Parahita Prima Sentosa operates with a production capacity of up to 20,000 pieces per month, serving clients across Indonesia and internationally. Our products have reached various regions nationwide and extended overseas, reflecting the trust our clients have placed in us.',
          p4: 'We believe that a uniform represents more than just clothing — it embodies identity, professionalism, and brand values. With decades of experience, a dedicated team, and a commitment to consistent quality, we continue to deliver reliable solutions tailored to each client\'s needs.',
          p5: 'At Parahita Prima Sentosa, we grow together with our partners, maintain high standards in every process, and remain committed to excellence — delivered professionally, with a personal touch.'
        },
        stats: {
          capacity: 'Production Capacity',
          workers: 'Skilled Workers',
          experience: 'Years Experience'
        }
      },
      productDetail: {
        notFound: 'Product not found',
        backToHome: 'Please return to home page',
        highQualityMaterial: 'High Quality Material, Professional Stitching',
        capacity: 'Production Capacity',
        minPcs: 'Min. 24 Pcs',
        warranty: 'Warranty',
        returnGuarantee: '100% Return',
        specialFeatures: 'Special Features:',
        requestQuote: 'Request Quote',
        priorityMaterials: 'Our Priority Materials',
        compositionSpecs: 'Composition & Specifications',
        grammage: 'Grammage',
        sizeOptions: 'Size Options',
        technicalFeatures: 'Technical Features',
        readyToMake: 'Ready to Make',
        contactExperts: 'Contact our expert team to consult about design, materials, and pricing estimation specifically for your needs.',
        contactUsNow: 'Contact Us Now'
      },
      productsPage: {
        heroTitle1: 'Parahita',
        heroTitle2: ' Products',
        heroSubtitle: 'High-quality garment collections designed for your industry needs.',
        searchPlaceholder: 'Search products...',
        materialCatalog: {
          title: 'Material Catalog',
          subtitle: 'Take a closer look at the details and specifications of our premium materials.',
          composition: 'Composition',
          recommendedUse: 'Recommended Use',
          technical: 'Technical'
        },
        productModal: {
          description: 'Description',
          mainFeatures: 'Main Features',
          availableSizes: 'Available Sizes',
          usedMaterial: 'Material Used',
          suitableFor: 'Suitable For',
          orderThisProduct: 'Order This Product'
        }
      },
      orderFlow: {
        howToOrder: 'How to Order',
        title: 'Our Production Flow',
        subtitle: 'From consultation to delivery, we ensure a transparent, easy, and high-quality process.',
        steps: {
          step1: {
            title: 'Design & Pattern',
            desc: 'Precision pattern making by experts to ensure accurate sizing and wearing comfort.'
          },
          step2: {
            title: 'Material Cutting',
            desc: 'Cutting process using industry standard tools for material efficiency and piece consistency.'
          },
          step3: {
            title: 'Logo Application',
            desc: 'High quality screen printing and precision computer embroidery options to showcase your corporate identity.'
          },
          step4: {
            title: 'Sewing',
            desc: 'Worked on by experienced sewing operators to produce strong and neat stitches.'
          },
          step5: {
            title: 'Quality Control (QC)',
            desc: 'Every garment passes through strict inspection to ensure no defects before shipping.'
          },
          step6: {
            title: 'Packing',
            desc: 'Steam iron process and neat packaging so uniforms are ready for immediate use upon receipt.'
          }
        },
        inquiry: {
          startNow: 'Start Now',
          title1: 'Make Your ',
          titleDream: 'Dream Uniform ',
          title2: 'A Reality',
          desc: 'Fill out the form to get a price estimate and production schedule. Our clothing consultant will respond in ',
          descBold: 'less than 24 hours',
          specs: {
            title: 'Detailed Specifications',
            desc: 'Choose materials and customize according to budget.'
          },
          design: {
            title: 'Custom Design',
            desc: 'Upload design references or let us help.'
          },
          noCommitment: {
            title: 'No Commitment',
            desc: 'Get an initial quote for free.'
          },
          btnAsk: 'Want to Send a Quote Request?',
          formTitle: 'Quote Request',
          contactInfo: 'Contact Information',
          form: {
            name: 'Full Name',
            company: 'Company/Institution',
            email: 'Email',
            whatsapp: 'WhatsApp No.',
            orderDetails: 'Order Details',
            productType: 'Product Type',
            industryCategory: 'Industry Category',
            estQuantity: 'Estimated Quantity',
            uploadDesign: 'Upload Design (Optional)',
            additionalNotes: 'Additional Notes',
            sendQuote: 'Send Quote Request',
            privacyNote: 'Your data is safe. We do not share your information with third parties.'
          }
        }
      }
    }
  },
  id: {
    translation: {
      nav: {
        home: 'Beranda',
        products: 'Produk',
        partner: 'Mitra',
        about: 'Tentang Kami',
        contact: 'Kontak',
        language: 'Bahasa'
      },
      hero: {
        title: 'Keunggulan dalam Manufaktur Garmen',
        subtitle: 'Menyediakan seragam berkualitas tinggi dan pakaian korporat untuk industri terkemuka di Indonesia sejak 1990.',
        cta: 'Jelajahi Produk'
      },
      footer: {
        description: 'Produsen garmen terkemuka yang berspesialisasi dalam seragam berkualitas tinggi, pakaian korporat, dan perlengkapan keselamatan.',
        quickLinks: 'Tautan Cepat',
        products: 'Produk',
        contact: 'Kontak',
        rights: '© 2024 Parahita Garment. Hak cipta dilindungi undang-undang.',
        privacy: 'Kebijakan Privasi',
        terms: 'Syarat & Ketentuan'
      },
      products: {
        title: 'Produk Kami',
        subtitle: 'Solusi garmen berkualitas tinggi yang disesuaikan untuk kebutuhan industri Anda.',
        categories: {
          all: 'Semua Produk',
          franchise: 'Waralaba',
          automotive: 'Otomotif',
          mining: 'Pertambangan',
          office: 'Kantor',
          media: 'Media',
          fnb: 'Food & Beverage',
          event: 'Event',
          merchandise: 'Merchandise'
        },
        items: {
          1: { name: 'Seragam Waralaba', category: 'Waralaba', desc: 'Produk seragam unggulan kami, yang hampir seluruhnya berjenis kemeja & polo shirt. Untuk kebutuhan seragam Waralaba anda yang bergerak dibidan barang atau jasa.', features: ['Kualitas Premium', 'Nyaman Dipakai', 'Desain Custom'] },
          2: { name: 'Seragam Otomotif', category: 'Otomotif', desc: 'Kami siap membantu anda dalam pembuatan seragam Otomotif dengan berbagai jenis model & desain. Yang dimana dalam pemakaiannya menuntut kualitas , daya tahan & kenyamanan.', features: ['Tahan Lama', 'Kualitas Tinggi', 'Desain Sporty'] },
          3: { name: 'Seragam Tambang', category: 'Tambang', desc: 'Seragam lapangan untuk perusahaan minyak bumi, konstruksi & pekerjaan umum yang selalu kami kembangkan agar terlihat menarik, tanpa mengurangi fungsinya sebagai seragam lapangan.', features: ['Reflective Tape', 'Bahan Kuat', 'Fungsional'] },
          4: { name: 'Seragam Media', category: 'Media', desc: 'Kami juga berpengalaman dalam pembuatan seragam untuk Media Elektronik & Media Cetak dengan jaminan mutu & kualitas.', features: ['Tampilan Elegan', 'Bahan Berkualitas', 'Jaminan Mutu'] },
          5: { name: 'Seragam F&B', category: 'Food & Beverage', desc: 'Untuk pembuatan seragam seperti Apron, Baju & Topi Koki untuk keperluan perusahaan F&B anda, kami pun siap membantu.', features: ['Mudah Dibersihkan', 'Bahan Nyaman', 'Set Lengkap'] },
          6: { name: 'Seragam Event', category: 'Event', desc: 'Perusahaan anda membutuhkan seragam untuk keperluan Gathering & Promosi yang di tuntun cepat & berkualitas? Parahita dapat membantu anda.', features: ['Produksi Cepat', 'Harga Kompetitif', 'Desain Menarik'] },
          7: { name: 'Seragam Kantor', category: 'Kantor', desc: 'Formal, Exclusive, & Nyaman adalah salah satu syarat seragam Kantor atau Staff dalam perusahaan anda? Kami berpengalaman dalam pembuatannya.', features: ['Formal & Eksklusif', 'Bahan Premium', 'Jahitan Rapi'] },
          8: { name: 'Merchandise', category: 'Merchandise', desc: 'Accessories seperti Topi dan Goodie bag, adalah salah satu dari sekian banyak produk yang dapat kami produksi.', features: ['Custom Logo', 'Berbagai Pilihan', 'Kualitas Terjamin'] }
        },
        inquiry: 'Tanyakan Produk Ini',
        viewDetails: 'Lihat Detail'
      },
      partner: {
        title: 'Mitra Terpercaya',
        subtitle: 'Kami bangga berkolaborasi dengan perusahaan terkemuka di Indonesia untuk menyediakan solusi garmen berkualitas tinggi.',
        liveProduction: 'Produksi Langsung',
        activeStatus: 'Status Proyek Aktif',
        monitoring: 'Pemantauan real-time dari komitmen manufaktur kami yang sedang berlangsung untuk mitra strategis utama kami.',
        capacity: 'Kapasitas Saat Ini',
        trackOrder: 'Lacak Pesanan',
        strategicPartnerships: 'Kemitraan Strategis',
        distinguished: 'MITRA TERPERCAYA KAMI',
        projectId: 'ID Proyek',
        efficiency: 'Efisiensi',
        howItWorks: 'Cara Kerjanya',
        simpleProcess: 'Proses Kemitraan yang Sederhana',
        simpleProcessDesc: 'Memulai dengan Parahita sangat gampang. Kami menyederhanakan proses onboarding agar produksi Anda berjalan cepat.',
        whyPartner: 'Mengapa Memilih Kami',
        whyPartnerDesc: 'Kami memberikan keunggulan strategis untuk merek Anda melalui kualitas, ketepatan waktu, dan pengalaman.',
        feedback: 'Tanggapan Mitra',
        successStories: 'Kisah Sukses',
        readyToScale: 'Siap meningkatkan',
        yourProduction: 'produksi Anda?',
        joinNetwork: 'Bergabunglah dengan jaringan mitra sukses kami dan rasakan masa depan manufaktur pakaian.',
        becomePartner: 'Menjadi Mitra',
        viewCaseStudies: 'Lihat Studi Kasus',
        liveStatus: 'Status Langsung',
        productionTimeline: 'Timeline Produksi',
        processing: 'Sedang Proses',
        completedDesc: 'Berhasil diselesaikan dan diverifikasi.',
        currentDesc: 'Saat ini mencapai penyelesaian.',
        upcomingDesc: 'Dijadwalkan untuk fase produksi mendatang.',
        estDelivery: 'Perkiraan Pengiriman',
        viewDetails: 'Lihat Detail',
        benefits: {
          quality: {
            title: 'Kualitas',
            desc: 'Kami hanya menggunakan material bahan dan benang terbaik. Setiap seragam melewati proses Quality Control (QC) yang ketat untuk memastikan jahitan rapi dan awet.'
          },
          fast: {
            title: 'Waktu',
            desc: 'Kami mengerti bahwa waktu Anda berharga. Proses produksi kami terstruktur dan efisien sehingga pesanan seragam Anda selalu selesai tepat waktu sesuai tenggat (deadline).'
          },
          scalable: {
            title: 'Berpengalaman',
            desc: 'Didukung oleh tim penjahit dan manajemen yang telah bertahun-tahun menangani berbagai proyek seragam, mulai dari skala kecil hingga perusahaan besar.'
          }
        },
        steps: {
          inquiry: 'Konsultasi & Desain',
          inquiryDesc: 'Diskusikan kebutuhan dan konsep desain Anda dengan tim ahli kami.',
          sampling: 'Pembuatan Sampel',
          samplingDesc: 'Kami membuat produk sampel untuk memastikan kualitas dan spesifikasi sebelum produksi.',
          production: 'Produksi Efisien',
          productionDesc: 'Proses manufaktur skala besar dengan sistem pemantauan kualitas real-time.',
          delivery: 'Pengiriman Tepat Waktu',
          deliveryDesc: 'Produk yang telah lolos QC dikirimkan dengan aman langsung ke alamat Anda.'
        }
      },
      about: {
        title: 'Tentang',
        subtitle: 'Menciptakan keunggulan dalam setiap jahitan sejak 1990.',
        vision: 'Visi',
        mission: 'Misi',
        visionStatement: 'Menjadi perusahaan garmen yang terpercaya dan terdepan dalam kualitas serta pelayanan.',
        missionStatements: [
          'Memberikan produk berkualitas tinggi dengan harga kompetitif.',
          'Memberikan pelayanan yang cepat dan tepat waktu.',
          'Inovasi berkelanjutan dalam desain dan proses produksi.',
          'Membangun hubungan jangka panjang yang saling menguntungkan dengan mitra kerja.'
        ],
        features: ['Material Premium', 'Pengiriman Tepat Waktu', 'Desain Kustom', 'Kontrol Kualitas'],
        yearsExcellence: 'Tahun Keunggulan',
        companyProfile: 'Unduh Profil Perusahaan',
        story: {
          title: 'Tentang Parahita',
          p1: 'Parahita Prima Sentosa didirikan pada tahun 1990 dengan fondasi yang sederhana namun kuat: menghadirkan produk berkualitas dan membangun hubungan yang langgeng. Apa yang dimulai sebagai toko ritel secara bertahap berkembang seiring dengan tuntutan pasar dan peluang industri.',
          p2: 'Pada tahun 2008, kami secara strategis berekspansi ke industri garmen, menandai tonggak penting dalam perjalanan kami. Sejak saat itu, kami fokus pada produksi seragam di berbagai sektor, termasuk industri Makanan & Minuman (F&B), Ritel, dan Pertambangan. Transisi ini memungkinkan kami untuk menggabungkan keahlian, disiplin operasional, dan persyaratan khusus industri ke dalam setiap produk yang kami hasilkan.',
          p3: 'Saat ini, Parahita Prima Sentosa beroperasi dengan kapasitas produksi hingga 20.000 buah per bulan , melayani klien di seluruh Indonesia dan internasional. Produk kami telah menjangkau berbagai wilayah di seluruh negeri dan meluas hingga ke luar negeri, mencerminkan kepercayaan yang diberikan klien kepada kami.',
          p4: 'Kami percaya bahwa seragam mewakili lebih dari sekadar pakaian — seragam mewujudkan identitas, profesionalisme, dan nilai-nilai merek. Dengan pengalaman puluhan tahun, tim yang berdedikasi, dan komitmen terhadap kualitas yang konsisten, kami terus memberikan solusi andal yang disesuaikan dengan kebutuhan setiap klien.',
          p5: 'Di Parahita Prima Sentosa, kami tumbuh bersama mitra kami, mempertahankan standar tinggi dalam setiap proses, dan tetap berkomitmen pada keunggulan — yang disampaikan secara profesional, dengan sentuhan pribadi.'
        },
        stats: {
          capacity: 'Kapasitas Produksi',
          workers: 'Tenaga Ahli',
          experience: 'Tahun Pengalaman'
        }
      },
      contact: {
        title: 'Kontak',
        subtitle: 'Punya proyek yang ingin didiskusikan? Kami siap mendengar dari Anda.',
        contactInfo: 'Informasi Kontak',
        contactDesc: 'Hubungi kami melalui salah satu saluran berikut atau kunjungi kantor kami.',
        phone: 'Telepon',
        email: 'Email',
        office: 'Kantor',
        viewOnMaps: 'Lihat di Google Maps',
        openMap: 'Buka di Google Maps',
        waTitle: 'Konsultasi Langsung via WhatsApp',
        waDesc: 'Tim Sales kami siap membantu Anda memberikan estimasi harga, material, dan konsultasi desain secara cepat.',
        chatNow: 'Chat Sekarang',
        form: {
          name: 'Nama Lengkap',
          email: 'Alamat Email',
          subject: 'Subjek',
          message: 'Pesan',
          send: 'Kirim Pesan'
        }
      },
      productDetail: {
        notFound: 'Produk tidak ditemukan',
        backToHome: 'Silakan kembali ke beranda',
        highQualityMaterial: 'Bahan Berkualitas Tinggi, Jahitan Professional',
        capacity: 'Kapasitas Produksi',
        minPcs: 'Min. 24 Pcs',
        warranty: 'Garansi',
        returnGuarantee: '100% Retur',
        specialFeatures: 'Fitur Khusus:',
        requestQuote: 'Minta Penawaran',
        priorityMaterials: 'Material Prioritas Kami',
        compositionSpecs: 'Komposisi & Spesifikasi',
        grammage: 'Gramasi',
        sizeOptions: 'Pilihan Size',
        technicalFeatures: 'Fitur Teknis Bahan',
        readyToMake: 'Siap Membuat',
        contactExperts: 'Hubungi tim ahli kami untuk berkonsultasi mengenai desain, bahan, dan estimasi harga khusus untuk kebutuhan Anda.',
        contactUsNow: 'Kontak Kami Sekarang'
      },
      productsPage: {
        heroTitle1: 'Produk ',
        heroTitle2: 'Parahita',
        heroSubtitle: 'Koleksi garmen berkualitas tinggi yang dirancang untuk kebutuhan industri Anda.',
        searchPlaceholder: 'Cari produk...',
        materialCatalog: {
          title: 'Katalog Material',
          subtitle: 'Lihat lebih dekat detail dan spesifikasi dari bahan premium kami.',
          composition: 'Komposisi',
          recommendedUse: 'Rekomendasi Penggunaan',
          technical: 'Teknis'
        },
        productModal: {
          description: 'Deskripsi',
          mainFeatures: 'Fitur Utama',
          availableSizes: 'Ukuran Tersedia',
          usedMaterial: 'Bahan yang Digunakan',
          suitableFor: 'Cocok Untuk',
          orderThisProduct: 'Pesan Produk Ini'
        }
      },
      orderFlow: {
        howToOrder: 'Cara Pemesanan',
        title: 'Alur Produksi Kami',
        subtitle: 'Mulai dari konsultasi hingga barang sampai di tangan Anda, kami memastikan proses yang transparan, mudah, dan berkualitas tinggi.',
        steps: {
          step1: {
            title: 'Desain & Pola',
            desc: 'Pembuatan pola presisi oleh tenaga ahli untuk memastikan ukuran yang akurat dan nyaman dipakai.'
          },
          step2: {
            title: 'Pemotongan Bahan',
            desc: 'Proses cutting menggunakan alat standar industri untuk efisiensi bahan dan konsistensi potongan.'
          },
          step3: {
            title: 'Aplikasi Logo',
            desc: 'Pilihan aplikasi sablon berkualitas tinggi dan bordir komputer presisi untuk menampilkan identitas perusahaan Anda.'
          },
          step4: {
            title: 'Penjahitan',
            desc: 'Dikerjakan oleh operator jahit berpengalaman untuk menghasilkan jahitan yang kuat dan rapi.'
          },
          step5: {
            title: 'Quality Control (QC)',
            desc: 'Setiap helai pakaian melewati inspeksi ketat untuk memastikan tidak ada cacat sebelum dikirim.'
          },
          step6: {
            title: 'Pengemasan (Packing)',
            desc: 'Proses setrika uap dan pengemasan rapi agar seragam siap langsung digunakan saat diterima.'
          }
        },
        inquiry: {
          startNow: 'Mulai Sekarang',
          title1: 'Wujudkan Seragam ',
          titleDream: 'Impian Anda',
          title2: '',
          desc: 'Isi formulir untuk mendapatkan estimasi harga dan jadwal produksi. Konsultan pakaian kami akan merespon dalam waktu ',
          descBold: 'kurang dari 24 jam',
          specs: {
            title: 'Spesifikasi Detail',
            desc: 'Pilih material dan kostumisasi sesuai budget.'
          },
          design: {
            title: 'Desain Kustom',
            desc: 'Unggah referensi desain atau biarkan kami membantu.'
          },
          noCommitment: {
            title: 'Tanpa Komitmen',
            desc: 'Dapatkan penawaran awal secara gratis.'
          },
          btnAsk: 'Mau Kirim Permintaan Penawaran?',
          formTitle: 'Permintaan Penawaran',
          contactInfo: 'Informasi Kontak',
          form: {
            name: 'Nama Lengkap',
            company: 'Perusahaan/Instansi',
            email: 'Email',
            whatsapp: 'No. WhatsApp',
            orderDetails: 'Detail Pesanan',
            productType: 'Tipe Produk',
            industryCategory: 'Kategori Industri',
            estQuantity: 'Estimasi Jumlah',
            uploadDesign: 'Upload Desain (Opsional)',
            additionalNotes: 'Catatan Tambahan',
            sendQuote: 'Kirim Permintaan Penawaran',
            privacyNote: 'Data Anda aman. Kami tidak membagikan informasi Anda kepada pihak ketiga.'
          }
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id',
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
