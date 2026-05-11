export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  badge?: string;
  price?: string;
  description?: string;
  features?: string[];
  materialId?: string; // Reference to Material
  sizes?: string[];
}

export interface Partner {
  name: string;
  logo: string;
}

export interface Material {
  id: string;
  name: string;
  image: string;
  specifications: {
    grammage: string;
    composition: string;
    recommendedUse: string;
    technicals: string[];
  };
}

export interface LiveProject {
  id: string;
  title: string;
  status: string;
  progress: number;
  image: string;
}

export interface MajorPartner {
  id: string;
  name: string;
  logo: string;
  status: string;
  progress: number;
}
