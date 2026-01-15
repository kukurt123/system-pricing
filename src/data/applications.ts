import type { Application } from '../types'

const img = (name: string) => `${import.meta.env.BASE_URL}illustrations/${name}`

export const applications: Application[] = [
  {
    id: 'pms',
    name: 'Patient Management System',
    tagline: 'Core clinic workflow with optional add-ons.',
    features: [
      {
        id: 'core-system',
        name: 'Core Patient Management',
        description: 'Your clinic’s essential workflow in one system.',
        required: true,
        highlights: [
          'Consultations, prescriptions, certificates, referrals',
          'Complete patient records with smart templates',
          'Backup and restore for data safety',
          'Fast search and patient history access',
          'User-friendly interface designed for clinics',
          'Print-ready prescriptions and documents',
        ],
        image: img('core-system.svg'),
        price: 34000,
      },
      {
        id: 'dual-station',
        name: 'Multi-User Access',
        description: 'Use the system on multiple clinic computers with secure logins.',
        highlights: [
          'Multiple users and workstations',
          'Ideal for doctor and secretary setup',
          'Shared patient records for easy collaboration',
        ],
        image: img('dual-station.svg'),
        price: 12000,
      },
      {
        id: 'lab-scanning',
        name: 'Scan & Upload Diagnostic Files',
        description: 'Scan or capture patient diagnostic files/images into the patient record.',
        highlights: [
          'Scan documents or capture images',
          'Compile diagnostics in patient records',
          'Via a Scanner or Mobile Device',
        ],
        image: img('lab-scanning.svg'),
        price: 4500,
      },
      {
        id: 'inventory',
        name: 'Inventory System',
        description: 'Track medicines and clinic supplies linked to prescriptions.',
        highlights: [
          'Stock in, out, and adjustments',
          'Medicine usage deducted from prescriptions',
          'Know when to reorder',
        ],
        image: img('inventory.svg'),
        price: 10000,
      },
      {
        id: 'remote-encoding',
        name: 'Past Records Encoding (Off-Site)',
        description:
          'Encode old patient records on a separate computer outside the clinic and sync them into the main system.',
        highlights: ['Off-site or at-home encoding setup', 'Designed for encoding historical and backlog records'],
        image: img('remote-encoding.svg'),
        price: 8000,
      },
      {
        id: 'dashboard',
        name: 'Clinic Dashboard',
        description: 'View clinic activity and revenues at a glance.',
        highlights: ['Revenues and consultation counts', 'Date-based filters', 'Quick clinic insights'],
        image: img('dashboard.svg'),
        price: 8000,
      },
      {
        id: 'pediatrics-pack',
        name: 'Pediatrics Package',
        description: 'Tools and templates designed for pediatric clinics.',
        highlights: ['Guardian and birth detail fields', 'Child-friendly forms', 'Optimized pediatric workflow'],
        image: img('pediatrics-pack.svg'),
        price: 5000,
      },
      {
        id: 'print-customization',
        name: 'Custom Print Templates',
        description: 'Customize printed prescriptions and certificates.',
        highlights: ['Clinic branding and layout', 'Professional printouts', 'Consistent document formats'],
        image: img('print-customization.svg'),
        price: 4500,
      },
    ],
  },
]
