# Timezone Features Implementation

## Overview
This implementation provides comprehensive timezone support for the SLV Ride application, including automatic location detection and timezone conversion capabilities.

## Features Implemented

### 1. Automatic Location Detection
- **Browser Timezone Detection**: Automatically detects user's timezone using `Intl.DateTimeFormat().resolvedOptions().timeZone`
- **Location-based Detection**: Uses browser geolocation API to detect user's physical location and determine appropriate timezone
- **Fallback Mechanism**: Falls back to UTC if detection fails

### 2. Comprehensive Timezone Support
- **Extended Timezone List**: Supports 18 major timezones including:
  - US Timezones (Eastern, Central, Mountain, Pacific, Alaska, Hawaii)
  - European Timezones (GMT, CET, Moscow)
  - Asian Timezones (Dubai, India, China, Japan, Korea)
  - Australian Timezones (Eastern, Western)
  - New Zealand Timezone

### 3. Timezone Conversion
- **Real-time Conversion**: Converts times between different timezones using `date-fns-tz`
- **Accurate Calculations**: Handles daylight saving time and timezone offsets correctly
- **User-friendly Display**: Shows original time, converted time, and timezone information

### 4. User Interface Components

#### DualTimeDisplay (NEW - Automatic Timezone Conversion)
- **Automatic Display**: Shows both ride time and user's local time when they're in different timezones
- **No Manual Interaction**: No buttons to press - system automatically detects and converts
- **Smart Display**: Only shows both times when they're different; shows single time when same timezone
- **Primary/Secondary Layout**: Ride time (where ride happens) shown as primary, user's time as secondary
- **Used in**: Rides table, Eagle Eye components, ride detail modals

#### TimezoneIndicator
- Located in the header
- Shows current user timezone and local time
- Allows users to change their timezone
- Updates time automatically every minute

#### TimezoneSelect
- Dropdown component with comprehensive timezone list
- Highlights user's detected timezone
- Shows "Your timezone" indicator
- Auto-detection feature with "Use This" button

#### TimezoneModal
- Enhanced modal for timezone conversion
- Shows original time with source timezone
- Displays converted time with target timezone
- Provides helpful notes about conversion

### 5. Context Management
- **TimezoneContext**: Global state management for timezone settings
- **Provider Pattern**: Wraps entire application for consistent timezone access
- **Automatic Initialization**: Detects and sets user timezone on app load

## Technical Implementation

### Libraries Used
- `date-fns`: Date manipulation and formatting
- `date-fns-tz`: Timezone-aware date operations
- `@headlessui/react`: UI components for dropdowns

### Key Functions

#### `getUserTimezone()`
```javascript
// Automatically detects user's timezone
const timezone = getUserTimezone(); // Returns "America/New_York" etc.
```

#### `convertTimeBetweenTimezones(time, fromTimezone, toTimezone)`
```javascript
// Converts time between timezones
const convertedTime = convertTimeBetweenTimezones("08:30 AM", "America/Los_Angeles", "Asia/Kolkata");
// Returns "09:00 PM" (converted to India time)
```

#### `detectUserLocation()`
```javascript
// Detects user's location and suggests timezone
const timezone = await detectUserLocation(); // Uses geolocation API
```

## Usage Examples

### 1. Automatic Dual Time Display (NEW)
- **User from India viewing US rides**:
  - User's timezone: `Asia/Kolkata` (IST)
  - Ride timezone: `America/Los_Angeles` (PST)
  - Display shows: 
    - `7:30 AM CDT` (ride time)
    - `5:30 AM PDT` (user's local time)
  - **No manual interaction required** - system automatically detects and displays both times

- **User from US viewing rides in same timezone**:
  - User's timezone: `America/New_York` (EST)
  - Ride timezone: `America/New_York` (EST)
  - Display shows: `7:30 AM` (single time only, since same timezone)

### 2. User from US viewing rides in different timezones
- User's timezone: `America/New_York` (EST)
- Oakland rides: `America/Los_Angeles` (PST)
- Atlanta rides: `America/New_York` (EST)
- Times are automatically converted to user's timezone

### 3. Manual timezone selection
- Users can manually select any timezone from dropdown
- System remembers their selection
- All times are converted to selected timezone

## Configuration

### Adding New Timezones
To add new timezones, update the `TIMEZONES` array in `src/utils/timezone.js`:

```javascript
export const TIMEZONES = [
  // ... existing timezones
  { value: "Asia/Singapore", label: "Singapore Time (SGT)" },
  // Add more as needed
];
```

### Google Maps API (Optional)
For enhanced location detection, add your Google Maps API key in `src/utils/timezone.js`:

```javascript
const response = await fetch(
  `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${Math.floor(Date.now() / 1000)}&key=YOUR_GOOGLE_API_KEY`
);
```

## Error Handling
- Graceful fallback to UTC if timezone detection fails
- Console warnings for debugging
- User-friendly error messages
- No breaking changes if timezone features fail

## Performance Considerations
- Timezone detection runs once on app initialization
- Time updates every minute (configurable)
- Efficient date-fns library for calculations
- Minimal re-renders with proper React patterns

## Browser Compatibility
- Works in all modern browsers
- Graceful degradation for older browsers
- Geolocation API support (optional)
- Intl API support (required)

## Future Enhancements
1. **Timezone Preferences**: Save user's timezone preference
2. **Multiple Timezone Display**: Show times in multiple timezones simultaneously
3. **Timezone-aware Scheduling**: Schedule rides in user's local timezone
4. **Timezone Notifications**: Notify users of timezone changes
5. **Offline Support**: Cache timezone data for offline use
