export const getContractEffectiveDate = () =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

export const contractDraft = {
  agreementTitle: 'Software Service Agreement',
  agreementCode: 'PMS-LIFETIME-SUPPORT',
  providerName: 'KURT RUZELL ESTACION',
  providerRole: 'Freelance Developer',
  providerAddress: 'Masagana A, Brgy. Morales, Koroandal City',
  providerEmail: 'kurtestacion@gmail.com',
  providerLicenseNumber: 'L05-18-003718',
  clientName: 'Client Name',
  designatedSuccessor: 'Designated Successor Freelance Developer',
  scopeSummary:
    'This agreement covers the Patient Management System modules and setup services availed by the Client.',
  supportItems: [
    'Lifetime technical support applies to the availed modules listed in this agreement.',
    'Bug fixing within the availed modules is covered for lifetime support and is free of charge.',
    'Troubleshooting, backup guidance, and minor usability adjustments are included within the delivered scope.',
    'Remote assistance whenever practical, with on-site service to be scheduled when required.',
  ],
  supportLimitations: [
    'Lifetime support applies only to the existing purchased scope.',
    'New modules, major revisions, third-party subscriptions, hardware, and unrelated software work require a separate quotation.',
  ],
  paymentDueOnSigning: 'upon signing of this agreement',
  paymentDueOnTurnover: 'on or before final installation and turnover',
  unpaidBalanceClause:
    'If any balance remains unpaid on its due date, the Provider may pause further work, delivery, deployment, or support until the outstanding balance is settled in full.',
  cancellationClause:
    'If the Client stops, postpones, or abandons the project after work has started, all payments already made shall remain non-refundable to cover work already completed, time reserved, and services already rendered.',
  dataSecurityClause:
    "The Provider shall keep the Client's records, system data, credentials, backups, and all information accessed during setup, support, maintenance, or reinstallation strictly confidential and shall not disclose, share, copy, or expose such data to any unauthorized person, except when required by law or when the Client gives prior written authorization.",
  successorClause:
    "In the event of the Provider's death or permanent incapacity, the Provider's project files, installers, deployment notes, and turnover instructions shall be endorsed to the designated successor freelance developer so ongoing support for the purchased system can continue without an additional turnover fee charged to the Client.",
  reinstallationClause:
    "If the Client requests system reinstallation because of computer reformat, operating system reset, replacement device, or similar device-side issue not caused by a software defect, the Client agrees to pay the Provider's current reinstallation service rate applicable at the time of service.",
  reinstallationNotice:
    'The Client must contact the Provider immediately before any planned reformat, device reset, replacement computer setup, or any situation that may require reinstallation, so the system setup and clinic data can be protected properly.',
} as const
