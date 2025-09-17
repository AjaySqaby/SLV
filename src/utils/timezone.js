import { DateTime } from 'luxon';

// Extended timezone list with more comprehensive coverage
export const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Europe/Berlin", label: "Central European Time (CET)" },
  { value: "Europe/Moscow", label: "Moscow Time (MSK)" },
  { value: "Asia/Dubai", label: "Gulf Standard Time (GST)" },
  { value: "Asia/Kolkata", label: "India Standard Time (IST)" },
  { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Asia/Seoul", label: "Korea Standard Time (KST)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
  { value: "Australia/Perth", label: "Australian Western Time (AWT)" },
  { value: "Pacific/Auckland", label: "New Zealand Time (NZT)" },
];

// Get user's timezone automatically
export const getUserTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.warn('Could not detect user timezone:', error);
    return 'UTC';
  }
};

// Get timezone label from value
export const getTimezoneLabel = (timezoneValue) => {
  const timezone = TIMEZONES.find(tz => tz.value === timezoneValue);
  return timezone ? timezone.label : timezoneValue;
};

// Get short timezone abbreviation (e.g., PDT, EST, CDT) with daylight saving consideration
export const getShortTimezoneAbbreviation = (timezoneValue, dateTime = null) => {
  try {
    // Use provided dateTime or current time
    const time = dateTime || DateTime.now();
    // Set the timezone and get the formatted abbreviation
    const zonedTime = time.setZone(timezoneValue);
    const abbr = zonedTime.toFormat('ZZZZ'); // Returns short abbreviation like PDT, EST, CDT
    return abbr;
  } catch (error) {
    console.error('Error getting short timezone abbreviation:', error);
    // Fallback to extracting abbreviation from timezone label
    const label = getTimezoneLabel(timezoneValue);
    const match = label.match(/\(([A-Z]{2,4})\)/);
    return match ? match[1] : timezoneValue;
  }
};

// Get timezone value from label
export const getTimezoneValue = (timezoneLabel) => {
  const timezone = TIMEZONES.find(tz => tz.label === timezoneLabel);
  return timezone ? timezone.value : timezoneLabel;
};

// Simple test function to debug Luxon conversion
export const debugLuxonConversion = (time, fromTimezone, toTimezone) => {
  try {
    // Check if time is valid
    if (!time || typeof time !== 'string') {
      console.warn('Invalid time provided to debugLuxonConversion:', time);
      return time || '';
    }
    
    console.log('=== DEBUGGING LUXON CONVERSION ===');
    console.log(`Input: ${time} from ${fromTimezone} to ${toTimezone}`);
    
    // Parse time
    const [timeStr, period] = time.split(' ');
    const [hours, minutes] = timeStr.split(':');
    
    let hour = parseInt(hours);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    console.log(`Parsed: ${hour}:${minutes} (24-hour)`);
    
    // Get today's date
    const now = DateTime.now();
    const today = now.startOf('day');
    console.log(`Today: ${today.toISO()}`);
    
    // Create source DateTime
    const sourceDateTime = DateTime.fromObject({
      year: today.year,
      month: today.month,
      day: today.day,
      hour: hour,
      minute: parseInt(minutes)
    }, { zone: fromTimezone });
    
    console.log(`Source DateTime: ${sourceDateTime.toISO()}`);
    console.log(`Source in ${fromTimezone}: ${sourceDateTime.toFormat('h:mm a')}`);
    
    // Convert to target
    const targetDateTime = sourceDateTime.setZone(toTimezone);
    console.log(`Target DateTime: ${targetDateTime.toISO()}`);
    console.log(`Target in ${toTimezone}: ${targetDateTime.toFormat('h:mm a')}`);
    
    const result = targetDateTime.toFormat('h:mm a');
    console.log(`Final result: ${result}`);
    console.log('=== END DEBUG ===');
    
    return result;
  } catch (error) {
    console.error('Debug error:', error);
    return time;
  }
};

// Convert time between timezones using Luxon
export const convertTimeBetweenTimezones = (time, fromTimezone, toTimezone) => {
  try {
    // Check if time is valid
    if (!time || typeof time !== 'string') {
      console.warn('Invalid time provided to convertTimeBetweenTimezones:', time);
      return time || '';
    }
    
    console.log(`Luxon conversion: ${time} from ${fromTimezone} to ${toTimezone}`);
    
    // Parse the time string (assuming format like "08:30 AM")
    const [timeStr, period] = time.split(' ');
    const [hours, minutes] = timeStr.split(':');
    
    let hour = parseInt(hours);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    // Get current date
    const now = DateTime.now();
    const today = now.startOf('day');
    
    // Create a DateTime object directly in the source timezone
    const sourceDateTime = DateTime.fromObject({
      year: today.year,
      month: today.month,
      day: today.day,
      hour: hour,
      minute: parseInt(minutes)
    }, { zone: fromTimezone });
    
    console.log(`Source DateTime: ${sourceDateTime.toISO()}`);
    console.log(`Source DateTime in ${fromTimezone}: ${sourceDateTime.toFormat('h:mm a')}`);
    
    // Convert to target timezone
    const targetDateTime = sourceDateTime.setZone(toTimezone);
    console.log(`Target DateTime in ${toTimezone}: ${targetDateTime.toFormat('h:mm a')}`);
    
    // Format the result
    const convertedTime = targetDateTime.toFormat('h:mm a');
    
    console.log(`Converted time: ${convertedTime}`);
    
    return convertedTime;
  } catch (error) {
    console.error('Error converting time with Luxon:', error);
    return time; // Return original time if conversion fails
  }
};

// Get current time in a specific timezone
export const getCurrentTimeInTimezone = (timezone) => {
  try {
    const now = DateTime.now().setZone(timezone);
    return now.toFormat('h:mm a');
  } catch (error) {
    console.error('Error getting current time in timezone:', error);
    return DateTime.now().toFormat('h:mm a');
  }
};

// Detect user's location and suggest appropriate timezone
export const detectUserLocation = async () => {
  try {
    // Try to get location from browser
    const position = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        enableHighAccuracy: false
      });
    });
    
    const { latitude, longitude } = position.coords;
    
    // Use reverse geocoding to get timezone
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${Math.floor(Date.now() / 1000)}&key=YOUR_GOOGLE_API_KEY`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get timezone from coordinates');
    }
    
    const data = await response.json();
    return data.timeZoneId;
  } catch (error) {
    console.warn('Could not detect user location:', error);
    // Fallback to browser timezone
    return getUserTimezone();
  }
};

// Get timezone offset in hours
export const getTimezoneOffset = (timezone) => {
  try {
    const now = DateTime.now();
    const target = now.setZone(timezone);
    return target.offset / 60; // Convert minutes to hours
  } catch (error) {
    console.error('Error calculating timezone offset:', error);
    return 0;
  }
};

// Format time with timezone information
export const formatTimeWithTimezone = (time, timezone) => {
  try {
    const timezoneLabel = getTimezoneLabel(timezone);
    const offset = getTimezoneOffset(timezone);
    const offsetStr = offset >= 0 ? `+${offset}` : `${offset}`;
    return `${time} (${timezoneLabel} UTC${offsetStr})`;
  } catch (error) {
    console.error('Error formatting time with timezone:', error);
    return time;
  }
};

// Test function to debug timezone conversion with Luxon
export const testTimezoneConversionWithLuxon = (time, fromTimezone, toTimezone) => {
  try {
    console.log(`Testing Luxon conversion: ${time} from ${fromTimezone} to ${toTimezone}`);
    
    const result = convertTimeBetweenTimezones(time, fromTimezone, toTimezone);
    console.log(`Result: ${result}`);
    
    return result;
  } catch (error) {
    console.error('Error in Luxon test:', error);
    return time;
  }
};

// Automatic timezone conversion - converts ride time to user's timezone
export const convertRideTimeToUserTimezone = (rideTime, rideTimezone, userTimezone = null) => {
  try {
    // Check if rideTime is valid
    if (!rideTime || typeof rideTime !== 'string') {
      console.warn('Invalid rideTime provided:', rideTime);
      return rideTime || '';
    }
    
    // If no user timezone provided, detect it automatically
    const detectedUserTimezone = userTimezone || getUserTimezone();
    
    console.log(`Auto-converting: ${rideTime} from ${rideTimezone} to ${detectedUserTimezone}`);
    
    // Parse the time string (assuming format like "08:30 AM")
    const [timeStr, period] = rideTime.split(' ');
    const [hours, minutes] = timeStr.split(':');
    
    let hour = parseInt(hours);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    // Get current date
    const now = DateTime.now();
    const today = now.startOf('day');
    
    // Create a DateTime object in the ride's timezone
    const rideDateTime = DateTime.fromObject({
      year: today.year,
      month: today.month,
      day: today.day,
      hour: hour,
      minute: parseInt(minutes)
    }, { zone: rideTimezone });
    
    console.log(`Ride DateTime in ${rideTimezone}: ${rideDateTime.toFormat('h:mm a')}`);
    
    // Convert to user's timezone
    const userDateTime = rideDateTime.setZone(detectedUserTimezone);
    console.log(`User DateTime in ${detectedUserTimezone}: ${userDateTime.toFormat('h:mm a')}`);
    
    // Format the result
    const convertedTime = userDateTime.toFormat('h:mm a');
    
    console.log(`Auto-converted time: ${convertedTime}`);
    
    return convertedTime;
  } catch (error) {
    console.error('Error auto-converting time:', error);
    return rideTime; // Return original time if conversion fails
  }
};

// Get timezone for a specific location (ride location)
export const getTimezoneForLocation = (location) => {
  // Map of locations to timezones
  const locationTimezones = {
    'Atlanta': 'America/New_York',
    'Georgia': 'America/New_York',
    'New York': 'America/New_York',
    'Los Angeles': 'America/Los_Angeles',
    'Chicago': 'America/Chicago',
    'Denver': 'America/Denver',
    'Mumbai': 'Asia/Kolkata',
    'Delhi': 'Asia/Kolkata',
    'Bangalore': 'Asia/Kolkata',
    'Chennai': 'Asia/Kolkata',
    'Kolkata': 'Asia/Kolkata',
    'Hyderabad': 'Asia/Kolkata',
    'Pune': 'Asia/Kolkata',
    'Ahmedabad': 'Asia/Kolkata',
    'Jaipur': 'Asia/Kolkata',
    'Lucknow': 'Asia/Kolkata',
    'Kanpur': 'Asia/Kolkata',
    'Nagpur': 'Asia/Kolkata',
    'Indore': 'Asia/Kolkata',
    'Thane': 'Asia/Kolkata',
    'Bhopal': 'Asia/Kolkata',
    'Visakhapatnam': 'Asia/Kolkata',
    'Pimpri-Chinchwad': 'Asia/Kolkata',
    'Patna': 'Asia/Kolkata',
    'Vadodara': 'Asia/Kolkata',
    'Ghaziabad': 'Asia/Kolkata',
    'Ludhiana': 'Asia/Kolkata',
    'Agra': 'Asia/Kolkata',
    'Nashik': 'Asia/Kolkata',
    'Faridabad': 'Asia/Kolkata',
    'Meerut': 'Asia/Kolkata',
    'Rajkot': 'Asia/Kolkata',
    'Kalyan-Dombivali': 'Asia/Kolkata',
    'Vasai-Virar': 'Asia/Kolkata',
    'Varanasi': 'Asia/Kolkata',
    'Srinagar': 'Asia/Kolkata',
    'Aurangabad': 'Asia/Kolkata',
    'Dhanbad': 'Asia/Kolkata',
    'Amritsar': 'Asia/Kolkata',
    'Allahabad': 'Asia/Kolkata',
    'Ranchi': 'Asia/Kolkata',
    'Howrah': 'Asia/Kolkata',
    'Coimbatore': 'Asia/Kolkata',
    'Jabalpur': 'Asia/Kolkata',
    'Gwalior': 'Asia/Kolkata',
    'Vijayawada': 'Asia/Kolkata',
    'Jodhpur': 'Asia/Kolkata',
    'Madurai': 'Asia/Kolkata',
    'Raipur': 'Asia/Kolkata',
    'Kota': 'Asia/Kolkata',
    'Guwahati': 'Asia/Kolkata',
    'Chandigarh': 'Asia/Kolkata',
    'Solapur': 'Asia/Kolkata',
    'Hubballi-Dharwad': 'Asia/Kolkata',
    'Bareilly': 'Asia/Kolkata',
    'Moradabad': 'Asia/Kolkata',
    'Mysore': 'Asia/Kolkata',
    'Gurgaon': 'Asia/Kolkata',
    'Aligarh': 'Asia/Kolkata',
    'Jalandhar': 'Asia/Kolkata',
    'Tiruchirappalli': 'Asia/Kolkata',
    'Bhubaneswar': 'Asia/Kolkata',
    'Salem': 'Asia/Kolkata',
    'Warangal': 'Asia/Kolkata',
    'Mira-Bhayandar': 'Asia/Kolkata',
    'Thiruvananthapuram': 'Asia/Kolkata',
    'Bhiwandi': 'Asia/Kolkata',
    'Saharanpur': 'Asia/Kolkata',
    'Gorakhpur': 'Asia/Kolkata',
    'Guntur': 'Asia/Kolkata',
    'Bikaner': 'Asia/Kolkata',
    'Amravati': 'Asia/Kolkata',
    'Noida': 'Asia/Kolkata',
    'Jamshedpur': 'Asia/Kolkata',
    'Bhilai': 'Asia/Kolkata',
    'Cuttack': 'Asia/Kolkata',
    'Firozabad': 'Asia/Kolkata',
    'Kochi': 'Asia/Kolkata',
    'Nellore': 'Asia/Kolkata',
    'Bhavnagar': 'Asia/Kolkata',
    'Dehradun': 'Asia/Kolkata',
    'Durgapur': 'Asia/Kolkata',
    'Asansol': 'Asia/Kolkata',
    'Rourkela': 'Asia/Kolkata',
    'Nanded': 'Asia/Kolkata',
    'Kolhapur': 'Asia/Kolkata',
    'Ajmer': 'Asia/Kolkata',
    'Akola': 'Asia/Kolkata',
    'Gulbarga': 'Asia/Kolkata',
    'Jamnagar': 'Asia/Kolkata',
    'Ujjain': 'Asia/Kolkata',
    'Loni': 'Asia/Kolkata',
    'Siliguri': 'Asia/Kolkata',
    'Jhansi': 'Asia/Kolkata',
    'Ulhasnagar': 'Asia/Kolkata',
    'Jammu': 'Asia/Kolkata',
    'Sangli-Miraj & Kupwad': 'Asia/Kolkata',
    'Mangalore': 'Asia/Kolkata',
    'Erode': 'Asia/Kolkata',
    'Belgaum': 'Asia/Kolkata',
    'Ambattur': 'Asia/Kolkata',
    'Tirunelveli': 'Asia/Kolkata',
    'Malegaon': 'Asia/Kolkata',
    'Gaya': 'Asia/Kolkata',
    'Jalgaon': 'Asia/Kolkata',
    'Udaipur': 'Asia/Kolkata',
    'Maheshtala': 'Asia/Kolkata',
    'Tirupur': 'Asia/Kolkata',
    'Davanagere': 'Asia/Kolkata',
    'Kozhikode': 'Asia/Kolkata',
    'Akron': 'America/New_York',
    'Albuquerque': 'America/Denver',
    'Anchorage': 'America/Anchorage',
    'Arlington': 'America/Chicago',
    'Austin': 'America/Chicago',
    'Baltimore': 'America/New_York',
    'Boston': 'America/New_York',
    'Charlotte': 'America/New_York',
    'Cincinnati': 'America/New_York',
    'Cleveland': 'America/New_York',
    'Colorado Springs': 'America/Denver',
    'Columbus': 'America/New_York',
    'Dallas': 'America/Chicago',
    'Detroit': 'America/New_York',
    'El Paso': 'America/Denver',
    'Fort Worth': 'America/Chicago',
    'Fresno': 'America/Los_Angeles',
    'Houston': 'America/Chicago',
    'Indianapolis': 'America/New_York',
    'Jacksonville': 'America/New_York',
    'Kansas City': 'America/Chicago',
    'Las Vegas': 'America/Los_Angeles',
    'Long Beach': 'America/Los_Angeles',
    'Memphis': 'America/Chicago',
    'Mesa': 'America/Denver',
    'Miami': 'America/New_York',
    'Milwaukee': 'America/Chicago',
    'Minneapolis': 'America/Chicago',
    'Nashville': 'America/Chicago',
    'New Orleans': 'America/Chicago',
    'Oakland': 'America/Los_Angeles',
    'Oklahoma City': 'America/Chicago',
    'Omaha': 'America/Chicago',
    'Phoenix': 'America/Denver',
    'Portland': 'America/Los_Angeles',
    'Raleigh': 'America/New_York',
    'Sacramento': 'America/Los_Angeles',
    'San Antonio': 'America/Chicago',
    'San Diego': 'America/Los_Angeles',
    'San Francisco': 'America/Los_Angeles',
    'San Jose': 'America/Los_Angeles',
    'Seattle': 'America/Los_Angeles',
    'Tucson': 'America/Denver',
    'Tulsa': 'America/Chicago',
    'Virginia Beach': 'America/New_York',
    'Washington': 'America/New_York',
    'Wichita': 'America/Chicago',
  };
  
  // Try to find exact match first
  if (locationTimezones[location]) {
    return locationTimezones[location];
  }
  
  // Try to find partial match
  for (const [city, timezone] of Object.entries(locationTimezones)) {
    if (location.toLowerCase().includes(city.toLowerCase()) || 
        city.toLowerCase().includes(location.toLowerCase())) {
      return timezone;
    }
  }
  
  // Default to user's timezone if no match found
  return getUserTimezone();
};
