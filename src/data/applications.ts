import { featureVideos } from './featureVideos'
import type { Application } from '../types'

const img = (name: string) => `${import.meta.env.BASE_URL}illustrations/${name}`

export const applications: Application[] = [
  {
    id: 'pms',
    name: 'Options',
    tagline: 'Choose only what you need',
    features: [
      {
        id: 'core-system',
        video: featureVideos['core-system'],
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
          'For single user (one device) only'
        ],
        image: img('core-system.svg'),
        price: 34000,
      },
      {
        id: 'cloud-backup',
        video: featureVideos['cloud-backup'],
        name: 'Cloud Backup',
        description: 'Keep an off-site copy of your clinic data for extra protection.',
        highlights: [
          'Secure cloud copy of your clinic records',
          'Extra protection against device loss or damage',
          'Supports recovery alongside your local backup',
        ],
        image: img('cloud-backup.svg'),
        price: 3500,
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
        price: 8000,
      },
      {
        id: 'remote-access',
        video: featureVideos['remote-access'],
        name: 'Remote Access',
        description: 'Open your clinic system from outside the clinic through a remote access link.',
        highlights: [
          'Access through a browser on another computer or mobile device',
          'Clinic laptop controls when remote access starts and stops',
          'Share the access link or scan its QR code',
          'Uses existing system accounts and permissions',
          'Separate from off-site encoding of old patient records',
        ],
        pricingNote: 'The clinic server must stay powered on and connected to the internet while remote access is in use.',
        image: img('remote-encoding.svg'),
        price: 8000,
      },
      {
        id: 'ai-assistant',
        video: featureVideos['ai-assistant'],
        name: 'AI Assistant',
        description: 'Helpful suggestions for everyday consultations.',
        highlights: [
          'Works offline after setup',
          'High and Max include patient summaries',
        ],
        pricingNote: 'We check your computer before setup.',
        localModels: [
          { name: 'Medium', memory: '8 GB RAM', capability: 'Helpful suggestions for daily consultations', recommended: true },
          { name: 'High', memory: '16 GB RAM', capability: 'Adds patient summaries' },
          { name: 'Max', memory: '16 GB RAM + 12 GB GPU memory, or 28 GB shared memory', capability: 'Reviews more patient history' },
        ],
        image: img('ai-assistant.svg'),
        price: 12000,
      },
      {
        id: 'lab-scanning',
        video: featureVideos['lab-scanning'],
        name: 'Scan & Store Diagnostic Files',
        description: 'Scan or capture patient diagnostic files/images into the patient record.',
        highlights: [
          'Save lab results and diagnostic images per patient',
          'Everything stays in one place',
          'Via a Scanner or Mobile Device',
        ],
        image: img('lab-scanning.svg'),
        price: 4500,
      },
      {
        id: 'inventory',
        video: featureVideos['inventory'],
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
        video: featureVideos['remote-encoding'],
        name: 'Old Patient Records Encoding (Off-Site)',
        description:
          'Encode old patient records on a separate computer outside the clinic and sync them into the main system.',
        highlights: ['Off-site or at-home encoding setup', 'Designed for encoding historical and backlog records'],
        image: img('remote-encoding.svg'),
        price: 5000,
      },
      {
        id: 'dashboard',
        video: featureVideos['dashboard'],
        name: 'Clinic Dashboard',
        description: 'View clinic activity and revenues at a glance.',
        highlights: ['Revenues and consultation counts', 'Date-based filters', 'Quick clinic insights'],
        image: img('dashboard.svg'),
        price: 5000,
      },
      {
        id: 'pediatrics-pack',
        video: featureVideos['pediatrics-pack'],
        name: 'Vaccination Package',
        description: 'Tools and templates for recording vaccines and managing immunization visits.',
        highlights: [
          'Vaccination history and immunization records',
          'Visit templates for vaccine administration',
          'Faster documentation during immunization visits',
        ],
        image: img('pediatrics-pack.svg'),
        price: 5000,
      },
      {
        id: 'print-customization',
        name: 'Personalized Print Templates',
        description: 'Customize printed prescriptions and certificates.',
        highlights: ['Clinic branding and layout', 'Professional printouts', 'Consistent document formats'],
        image: img('print-customization.svg'),
        price: 4500,
      },
    ],
  },
]
