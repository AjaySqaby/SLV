export const STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  IN_PROGRESS: 'In Progress',
  CANCELLED: 'Cancelled',
  SCHEDULED: 'Scheduled',
};

export const VEHICLE_TYPES = {
  SEDAN: 'Sedan',
  SUV: 'SUV',
  BUS: 'Bus',
  VAN: 'Van',
};

export const CAMPUS_TYPES = {
  ELEMENTARY: 'Elementary',
  MIDDLE: 'Middle',
  HIGH: 'High',
  SPECIAL: 'Special Education',
};

export const SERVICE_TYPES = {
  REGULAR: 'Regular',
  SPECIAL: 'Special Education',
  FIELD_TRIP: 'Field Trip',
  ATHLETIC: 'Athletic',
};

export const TIME_SLOTS = [
  '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM',
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM',
];

export const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

export const GRADES = [
  'Pre-K', 'K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th',
  '9th', '10th', '11th', '12th',
];

export const TABLE_PAGE_SIZES = [10, 25, 50, 100];

export const DEFAULT_PAGE_SIZE = 10;

export const DATE_FORMAT = 'MMM DD, YYYY';

export const TIME_FORMAT = 'hh:mm A';

export const PHONE_FORMAT = '(XXX) XXX-XXXX';

export const ZIP_CODE_FORMAT = 'XXXXX-XXXX';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const ZIP_CODE_REGEX = /^\d{5}(-\d{4})?$/; 