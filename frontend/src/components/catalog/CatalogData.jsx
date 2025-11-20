import { 
  FaRecycle, 
  FaBoxOpen, 
  FaCog, 
  FaWineBottle, 
  FaTrash, 
  FaTshirt 
} from 'react-icons/fa';

export const COLORS = {
  darkBlue: "#053774",
  green: "#15A33D",
  bgGray: "#F6F6F6",
  cardBorder: "#0a2760",
};

export const CATEGORIES = ["All", "Recyclable", "Fragile", "Residual", "Special"];

export const CATALOG_DATA = [
  {
    title: "Plastic",
    icon: FaRecycle,
    category: "Recyclable",
    description: "Includes bottles (PET), sachets, and containers.",
    examples: ["Mineral and Shampoo bottles", "Plastic labo / sando bags", "Sachets"],
    disposal: "Rinse and dry. Sell to local junk shops or place in the proper recycling bin.",
    impact: "Plastics often clog drainage systems, causing floods in many areas.",
    tips: "Check for the resin code. 'Kalakal' items like PET bottles have high value in junk shops."
  },
  {
    title: "Paper",
    icon: FaBoxOpen,
    category: "Recyclable",
    description: "Includes cartons, newspapers, and office paper. Wet paper loses quality for recycling.",
    examples: ["Balikbayan boxes", "Newspapers", "School papers", "Cartons"],
    disposal: "Keep dry and flatten boxes. Soiled or wet paper may go to compost.",
    impact: "Recycling paper reduces waste in landfills and helps conserve forest resources in the country.",
    tips: "Avoid mixing wet or greasy paper with recyclables."
  },
  {
    title: "Metal",
    icon: FaCog,
    category: "Recyclable",
    description: "Includes tin cans, aluminum, and roofing sheets.",
    examples: ["Soft drink cans", "Canned sardines", "Roofing sheets", "Metal scraps"],
    disposal: "Rinse to remove food residue. Sell to junk shops for recycling.",
    impact: "Discarded metal scraps in rivers can obstruct water flow, and rusty metals pose tetanus threats.",
    tips: "Crush cans to save space. Separate aluminum from tin for better junk shop value."
  },
  {
    title: "Glass",
    icon: FaWineBottle,
    category: "Fragile",
    description: "Includes beverage bottles and broken glass shards.",
    examples: ["Beer bottles", "Jam jars", "Broken windows", "Perfume bottles"],
    disposal: "Rinse and remove caps. Wrap broken glass in newspaper for safety before disposal.",
    impact: "Glass does not decompose. Broken glass can injure volunteers during river cleanups.",
    tips: "Returnable bottles may have deposits at sari-sari stores. Reuse jars when possible."
  },
  {
    title: "Pile / Mixed",
    icon: FaTrash,
    category: "Residual",
    description: "Accumulated, unsorted or mixed trash commonly found on riverbanks, often entangled with plastics and debris.",
    examples: ["River debris", "Entangled garbage", "Unsorted household waste"],
    disposal: "Segregate immediately and avoid leaving piles of trash in rivers or canals.",
    impact: "Mixed waste is difficult to recycle and usually ends up in landfills or oceans.",
    tips: "Practice segregation at home to avoid creating mixed piles."
  },
  {
    title: "Textile",
    icon: FaTshirt,
    category: "Special",
    description: "Textiles are fabrics made from natural fibers (cotton, silk) or synthetic fibers (polyester, nylon).",
    examples: ["Old clothes", "Rags", "Upholstery scraps", "Bed sheets"],
    disposal: "Donate wearable items. Reuse unusable textiles as cleaning rags.",
    impact: "Textiles absorb water and become heavy, blocking river flow.",
    tips: "Upcycle old clothes into bags or cleaning cloths instead of throwing them away."
  }
];