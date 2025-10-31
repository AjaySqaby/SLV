// Centralized equipment types and helpers

export const EQUIPMENT_TYPES = [
  'Car Seat',
  'Booster Seat',
  'Monitor',
  'Wheelchair',
  'Walker',
  'Harness',
  'Buckle Guard',
];

export function countEquipmentFromStudents(students) {
  const counts = Object.create(null);
  for (const type of EQUIPMENT_TYPES) counts[type] = 0;
  if (!Array.isArray(students)) return counts;
  for (const student of students) {
    const list = Array.isArray(student?.equipment)
      ? student.equipment
      : Object.entries(student || {})
          .filter(([k, v]) => typeof v === 'boolean' && v === true && EQUIPMENT_TYPES.includes(normalizeKeyToLabel(k)))
          .map(([k]) => normalizeKeyToLabel(k));
    for (const item of list) {
      if (counts[item] != null) counts[item] += 1;
    }
  }
  return counts;
}

export function formatEquipmentCounts(counts) {
  if (!counts) return '';
  const parts = [];
  for (const type of EQUIPMENT_TYPES) {
    const n = counts[type] || 0;
    if (n > 0) parts.push(`${type} x${n}`);
  }
  return parts.join(', ');
}

export function labelToKey(label) {
  return String(label).toLowerCase().replace(/[^a-z]+/g, '_').replace(/^_|_$/g, '');
}

export function keyToLabel(key) {
  return normalizeKeyToLabel(key);
}

function normalizeKeyToLabel(key) {
  const map = {
    car_seat: 'Car Seat',
    booster_seat: 'Booster Seat',
    monitor: 'Monitor',
    wheelchair: 'Wheelchair',
    walker: 'Walker',
    harness: 'Harness',
    buckle_guard: 'Buckle Guard',
  };
  return map[key] || (EQUIPMENT_TYPES.includes(key) ? key : key);
}


