export const DISEASES = [
  {
    id: 'cmd', name: 'Cassava Mosaic Disease', shortName: 'CMD',
    severity: 'High', sevColor: '#E65100', sevBg: '#FFF3E0', icon: '🍃', confidence: 94,
    color: '#E65100',
    description: 'A viral disease spread by whiteflies causing mosaic yellowing on leaves and stunted growth. One of the most economically damaging cassava diseases in Africa.',
    symptoms: ['Yellow-green mosaic patterns on leaves', 'Leaf distortion and puckering', 'Stunted plant growth', 'Reduced tuber size and yield'],
    treatment: ['Remove and destroy all infected plants immediately to prevent spread', 'Apply FMN BioGuard Fungicide at 2L/ha every 14 days', 'Use FMN WhiteFly Control spray to reduce vector population', 'Plant CMD-resistant varieties next season', 'Sanitise all farm tools with 10% bleach solution after use'],
    prevention: 'Use certified disease-free planting material. Monitor weekly for whitefly infestations. Apply preventive FMN BioGuard spray monthly.',
    fmnProducts: ['fmn-bioguard', 'fmn-whitefly', 'fmn-growboost'],
  },
  {
    id: 'cbsd', name: 'Cassava Brown Streak Disease', shortName: 'CBSD',
    severity: 'Critical', sevColor: '#B71C1C', sevBg: '#FFEBEE', icon: '🌿', confidence: 88,
    color: '#B71C1C',
    description: 'A devastating viral disease causing brown streaks on stems and roots. CBSD can cause total loss of edible roots even when above-ground symptoms appear mild.',
    symptoms: ['Yellow-green feathery chlorosis on leaves', 'Brown necrotic streaks on stems', 'Brown corky rot inside tubers', 'Premature leaf drop'],
    treatment: ['Uproot and burn all infected plants — do not compost', 'Apply FMN StemGuard at 3L/ha to surrounding healthy plants', 'Disinfect all cutting tools between plants', 'Monitor remaining plants daily for 2 weeks', 'Report outbreak to local agricultural extension office'],
    prevention: 'Only plant CBSD-tolerant varieties. Never move planting material from infected fields. Apply FMN StemGuard preventively at season start.',
    fmnProducts: ['fmn-stemguard', 'fmn-rootboost', 'fmn-npk'],
  },
  {
    id: 'nitrogen', name: 'Nitrogen Deficiency', shortName: 'N-Deficiency',
    severity: 'Moderate', sevColor: '#F57F17', sevBg: '#FFF8E1', icon: '🌱', confidence: 91,
    color: '#F57F17',
    description: 'Nitrogen is essential for leaf and shoot growth. Deficiency causes yellowing starting from older leaves and significantly reduces photosynthesis and yield.',
    symptoms: ['Pale green to yellow older leaves', 'Yellowing progressing upwards', 'Reduced leaf size and thin stems', 'Early leaf drop on older growth'],
    treatment: ['Apply FMN NPK 15-15-15 at 200kg/ha immediately', 'Top-dress with FMN Urea (46% N) at 50kg/ha', 'Water adequately after fertilizer application', 'Apply FMN GrowBoost foliar spray for rapid uptake', 'Repeat foliar spray every 21 days until recovery'],
    prevention: 'Conduct soil test before planting. Follow FMN recommended fertilizer schedule. Apply split doses of nitrogen at planting and 6-8 weeks after establishment.',
    fmnProducts: ['fmn-npk', 'fmn-urea', 'fmn-growboost'],
  },
  {
    id: 'healthy', name: 'Healthy Plant', shortName: 'Healthy',
    severity: 'None', sevColor: '#0044B3', sevBg: '#E8EEF8', icon: '✅', confidence: 97,
    color: '#0044B3',
    description: 'Your cassava plant shows no signs of disease or nutrient deficiency. Continue current practices to maintain excellent plant health.',
    symptoms: ['Deep green, uniform leaf colouration', 'No spots, streaks, or distortion', 'Strong upright stem growth', 'Good canopy coverage'],
    treatment: ['Continue current farming practices — plant is healthy!', 'Apply FMN GrowBoost foliar spray monthly', 'Maintain weed-free environment', 'Ensure adequate soil moisture through dry periods', 'Plan harvest at optimal maturity (10-14 months)'],
    prevention: 'Keep applying FMN preventive care schedule. Inspect weekly. Apply FMN Potassium Sulphate at mid-season to boost tuber development.',
    fmnProducts: ['fmn-growboost', 'fmn-potassium', 'fmn-npk'],
  },
];

export const PRODUCTS = [
  { id: 'fmn-bioguard', name: 'FMN BioGuard Pro', category: 'Fungicide', price: '₦4,500', desc: 'Broad-spectrum biological fungicide for control of fungal and viral diseases.', dosage: '2L/ha every 14 days', icon: '🧪', color: '#003087' },
  { id: 'fmn-whitefly', name: 'FMN WhiteFly Control', category: 'Insecticide', price: '₦3,200', desc: 'Systemic insecticide for effective control of whiteflies — primary CMD vector.', dosage: '1.5L/ha', icon: '🐛', color: '#4527A0' },
  { id: 'fmn-stemguard', name: 'FMN StemGuard', category: 'Fungicide', price: '₦5,800', desc: 'Systemic fungicide providing stem and root protection against brown streak.', dosage: '3L/ha at planting', icon: '🌿', color: '#BF360C' },
  { id: 'fmn-npk', name: 'FMN NPK 15-15-15', category: 'Fertilizer', price: '₦18,500/50kg', desc: 'Balanced compound fertilizer providing equal N, P, K for strong crop establishment.', dosage: '200kg/ha', icon: '⚗️', color: '#E65100' },
  { id: 'fmn-urea', name: 'FMN Urea (46% N)', category: 'Fertilizer', price: '₦14,000/50kg', desc: 'High-nitrogen fertilizer for rapid correction of nitrogen deficiency.', dosage: '50kg/ha top-dress', icon: '💊', color: '#1565C0' },
  { id: 'fmn-growboost', name: 'FMN GrowBoost', category: 'Foliar', price: '₦2,800', desc: 'Micronutrient-rich foliar spray for rapid plant recovery and vigour.', dosage: '500ml/ha monthly', icon: '🌱', color: '#2E7D32' },
  { id: 'fmn-rootboost', name: 'FMN RootBoost', category: 'Root Stimulant', price: '₦3,600', desc: 'Root development stimulant to strengthen tuber formation and disease resistance.', dosage: '1L/ha at planting', icon: '🥬', color: '#558B2F' },
  { id: 'fmn-potassium', name: 'FMN Potassium Sulphate', category: 'Fertilizer', price: '₦16,200/50kg', desc: 'High-purity potassium for tuber bulking and improved starch content.', dosage: '100kg/ha mid-season', icon: '🧂', color: '#F57F17' },
];

export const DEALERS = [
  { id: 1, name: 'FMN AgriStore Ibadan', address: 'Ring Road, Ibadan, Oyo State', phone: '+234 802 345 6789', distance: '1.2km', inStock: true, lat: 7.3775, lng: 3.9470 },
  { id: 2, name: 'FMN Agro Depot Lagos', address: 'Agege Motor Road, Lagos', phone: '+234 803 456 7890', distance: '3.4km', inStock: true, lat: 6.5244, lng: 3.3792 },
  { id: 3, name: 'FMN Farm Inputs Abeokuta', address: 'Oke-Mosan, Abeokuta, Ogun', phone: '+234 704 567 8901', distance: '5.7km', inStock: false, lat: 7.1557, lng: 3.3451 },
  { id: 4, name: 'FMN AgriHub Ilorin', address: 'Tanke Road, Ilorin, Kwara State', phone: '+234 805 678 9012', distance: '8.1km', inStock: true, lat: 8.4966, lng: 4.5421 },
  { id: 5, name: 'FMN Rural Inputs Ondo', address: 'Akure Road, Ondo Town', phone: '+234 706 789 0123', distance: '12.3km', inStock: true, lat: 7.0847, lng: 4.8352 },
];

export const REMINDERS = [
  { id: '1', title: 'Apply FMN BioGuard Spray', time: '07:00 AM', days: 'Mon, Thu', category: 'spray', enabled: true, nextDue: 'Today' },
  { id: '2', title: 'Inspect for Whitefly', time: '06:30 AM', days: 'Wed, Sat', category: 'inspect', enabled: true, nextDue: 'Tomorrow' },
  { id: '3', title: 'Apply FMN NPK Fertilizer', time: '08:00 AM', days: 'Mon', category: 'fertilize', enabled: true, nextDue: 'Mon, Mar 18' },
  { id: '4', title: 'Soil Moisture Check', time: '05:30 PM', days: 'Tue, Fri, Sun', category: 'water', enabled: false, nextDue: 'Fri, Mar 14' },
  { id: '5', title: 'Weed Control', time: '07:30 AM', days: 'Sat', category: 'weed', enabled: true, nextDue: 'Sat, Mar 15' },
];

export const HISTORY = [
  { id: 'h1', date: 'Mar 10, 2026', diseaseId: 'cmd', field: 'North Field A', treated: true },
  { id: 'h2', date: 'Mar 5, 2026', diseaseId: 'healthy', field: 'South Field B', treated: false },
  { id: 'h3', date: 'Feb 28, 2026', diseaseId: 'nitrogen', field: 'East Plots', treated: true },
  { id: 'h4', date: 'Feb 20, 2026', diseaseId: 'cbsd', field: 'North Field A', treated: true },
  { id: 'h5', date: 'Feb 14, 2026', diseaseId: 'cbb', field: 'West Farm', treated: false },
];
