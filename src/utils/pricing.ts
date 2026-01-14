export const formatPrice = (value: number) =>
  value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 })
