interface LocationBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface LocationMapping {
  bounds: LocationBounds;
  district: string;
  divisionalSecretariat: string;
}

interface LocationResult {
  district: string;
  divisionalSecretariat: string;
}

interface GeolocationError {
  code: number;
  message: string;
}

// Comprehensive coordinate mapping for Sri Lankan districts and divisional secretariats
const LOCATION_MAPPINGS: LocationMapping[] = [
  // Western Province
  { bounds: { minLat: 6.7, maxLat: 7.0, minLng: 79.8, maxLng: 80.2 }, district: "Colombo", divisionalSecretariat: "Colombo" },
  { bounds: { minLat: 6.85, maxLat: 7.15, minLng: 79.85, maxLng: 80.15 }, district: "Colombo", divisionalSecretariat: "Dehiwala-Mount Lavinia" },
  { bounds: { minLat: 6.9, maxLat: 7.2, minLng: 79.9, maxLng: 80.3 }, district: "Gampaha", divisionalSecretariat: "Gampaha" },
  { bounds: { minLat: 7.0, maxLat: 7.3, minLng: 79.95, maxLng: 80.25 }, district: "Gampaha", divisionalSecretariat: "Negombo" },
  { bounds: { minLat: 6.5, maxLat: 6.8, minLng: 79.8, maxLng: 80.2 }, district: "Kalutara", divisionalSecretariat: "Kalutara" },
  { bounds: { minLat: 6.45, maxLat: 6.75, minLng: 79.95, maxLng: 80.25 }, district: "Kalutara", divisionalSecretariat: "Beruwala" },

  // Central Province
  { bounds: { minLat: 7.2, maxLat: 7.4, minLng: 80.5, maxLng: 80.8 }, district: "Kandy", divisionalSecretariat: "Kandy" },
  { bounds: { minLat: 7.25, maxLat: 7.35, minLng: 80.55, maxLng: 80.75 }, district: "Kandy", divisionalSecretariat: "Gampola" },
  { bounds: { minLat: 7.4, maxLat: 7.6, minLng: 80.5, maxLng: 80.8 }, district: "Matale", divisionalSecretariat: "Matale" },
  { bounds: { minLat: 7.45, maxLat: 7.65, minLng: 80.6, maxLng: 80.9 }, district: "Matale", divisionalSecretariat: "Dambulla" },
  { bounds: { minLat: 6.9, maxLat: 7.1, minLng: 80.7, maxLng: 81.0 }, district: "Nuwara Eliya", divisionalSecretariat: "Nuwara Eliya" },
  { bounds: { minLat: 6.95, maxLat: 7.15, minLng: 80.75, maxLng: 80.95 }, district: "Nuwara Eliya", divisionalSecretariat: "Hatton" },

  // Southern Province
  { bounds: { minLat: 6.0, maxLat: 6.3, minLng: 80.1, maxLng: 80.4 }, district: "Galle", divisionalSecretariat: "Galle" },
  { bounds: { minLat: 6.1, maxLat: 6.2, minLng: 80.05, maxLng: 80.15 }, district: "Galle", divisionalSecretariat: "Ambalangoda" },
  { bounds: { minLat: 5.9, maxLat: 6.2, minLng: 80.5, maxLng: 80.8 }, district: "Matara", divisionalSecretariat: "Matara" },
  { bounds: { minLat: 5.95, maxLat: 6.05, minLng: 80.4, maxLng: 80.5 }, district: "Matara", divisionalSecretariat: "Weligama" },
  { bounds: { minLat: 6.1, maxLat: 6.4, minLng: 81.0, maxLng: 81.3 }, district: "Hambantota", divisionalSecretariat: "Hambantota" },
  { bounds: { minLat: 6.2, maxLat: 6.3, minLng: 81.0, maxLng: 81.1 }, district: "Hambantota", divisionalSecretariat: "Tangalle" },

  // Northern Province
  { bounds: { minLat: 9.5, maxLat: 9.8, minLng: 80.0, maxLng: 80.3 }, district: "Jaffna", divisionalSecretariat: "Jaffna" },
  { bounds: { minLat: 9.8, maxLat: 9.9, minLng: 80.2, maxLng: 80.3 }, district: "Jaffna", divisionalSecretariat: "Point Pedro" },
  { bounds: { minLat: 9.3, maxLat: 9.6, minLng: 80.3, maxLng: 80.6 }, district: "Kilinochchi", divisionalSecretariat: "Kilinochchi" },
  { bounds: { minLat: 9.1, maxLat: 9.4, minLng: 80.4, maxLng: 80.7 }, district: "Kilinochchi", divisionalSecretariat: "Pachchilaipalli" },
  { bounds: { minLat: 8.9, maxLat: 9.2, minLng: 79.9, maxLng: 80.2 }, district: "Mannar", divisionalSecretariat: "Mannar" },
  { bounds: { minLat: 9.0, maxLat: 9.1, minLng: 79.8, maxLng: 79.9 }, district: "Mannar", divisionalSecretariat: "Madhu" },
  { bounds: { minLat: 8.7, maxLat: 9.0, minLng: 80.4, maxLng: 80.7 }, district: "Vavuniya", divisionalSecretariat: "Vavuniya" },
  { bounds: { minLat: 8.8, maxLat: 9.1, minLng: 80.5, maxLng: 80.8 }, district: "Vavuniya", divisionalSecretariat: "Vavuniya South" },
  { bounds: { minLat: 9.0, maxLat: 9.3, minLng: 80.7, maxLng: 81.0 }, district: "Mullaitivu", divisionalSecretariat: "Mullaitivu" },
  { bounds: { minLat: 9.2, maxLat: 9.5, minLng: 80.8, maxLng: 81.1 }, district: "Mullaitivu", divisionalSecretariat: "Puthukudiyiruppu" },

  // Eastern Province
  { bounds: { minLat: 7.7, maxLat: 8.0, minLng: 81.6, maxLng: 81.9 }, district: "Batticaloa", divisionalSecretariat: "Batticaloa" },
  { bounds: { minLat: 7.6, maxLat: 7.9, minLng: 81.65, maxLng: 81.85 }, district: "Batticaloa", divisionalSecretariat: "Eravur Town" },
  { bounds: { minLat: 7.2, maxLat: 7.5, minLng: 81.6, maxLng: 81.9 }, district: "Ampara", divisionalSecretariat: "Ampara" },
  { bounds: { minLat: 7.1, maxLat: 7.4, minLng: 81.7, maxLng: 82.0 }, district: "Ampara", divisionalSecretariat: "Kalmunai" },
  { bounds: { minLat: 8.5, maxLat: 8.8, minLng: 81.1, maxLng: 81.4 }, district: "Trincomalee", divisionalSecretariat: "Trincomalee" },
  { bounds: { minLat: 8.4, maxLat: 8.7, minLng: 81.2, maxLng: 81.5 }, district: "Trincomalee", divisionalSecretariat: "Kinniya" },

  // North Western Province
  { bounds: { minLat: 7.4, maxLat: 7.7, minLng: 80.3, maxLng: 80.6 }, district: "Kurunegala", divisionalSecretariat: "Kurunegala" },
  { bounds: { minLat: 7.45, maxLat: 7.55, minLng: 80.0, maxLng: 80.3 }, district: "Kurunegala", divisionalSecretariat: "Kuliyapitiya" },
  { bounds: { minLat: 8.0, maxLat: 8.3, minLng: 79.8, maxLng: 80.1 }, district: "Puttalam", divisionalSecretariat: "Puttalam" },
  { bounds: { minLat: 7.5, maxLat: 7.8, minLng: 79.8, maxLng: 80.1 }, district: "Puttalam", divisionalSecretariat: "Chilaw" },

  // North Central Province
  { bounds: { minLat: 8.3, maxLat: 8.6, minLng: 80.3, maxLng: 80.6 }, district: "Anuradhapura", divisionalSecretariat: "Anuradhapura East" },
  { bounds: { minLat: 8.0, maxLat: 8.3, minLng: 80.6, maxLng: 80.9 }, district: "Anuradhapura", divisionalSecretariat: "Kekirawa" },
  { bounds: { minLat: 7.9, maxLat: 8.2, minLng: 80.9, maxLng: 81.2 }, district: "Polonnaruwa", divisionalSecretariat: "Polonnaruwa" },
  { bounds: { minLat: 8.1, maxLat: 8.4, minLng: 81.0, maxLng: 81.3 }, district: "Polonnaruwa", divisionalSecretariat: "Medirigiriya" },

  // Uva Province
  { bounds: { minLat: 6.9, maxLat: 7.2, minLng: 81.0, maxLng: 81.3 }, district: "Badulla", divisionalSecretariat: "Badulla" },
  { bounds: { minLat: 6.95, maxLat: 7.05, minLng: 80.95, maxLng: 81.05 }, district: "Badulla", divisionalSecretariat: "Bandarawela" },
  { bounds: { minLat: 6.8, maxLat: 7.1, minLng: 81.3, maxLng: 81.6 }, district: "Monaragala", divisionalSecretariat: "Monaragala" },
  { bounds: { minLat: 6.85, maxLat: 7.05, minLng: 81.0, maxLng: 81.3 }, district: "Monaragala", divisionalSecretariat: "Wellawaya" },

  // Sabaragamuwa Province
  { bounds: { minLat: 6.6, maxLat: 6.9, minLng: 80.3, maxLng: 80.6 }, district: "Ratnapura", divisionalSecretariat: "Ratnapura" },
  { bounds: { minLat: 6.6, maxLat: 6.8, minLng: 80.6, maxLng: 80.9 }, district: "Ratnapura", divisionalSecretariat: "Balangoda" },
  { bounds: { minLat: 7.2, maxLat: 7.5, minLng: 80.3, maxLng: 80.6 }, district: "Kegalle", divisionalSecretariat: "Kegalle" },
  { bounds: { minLat: 7.25, maxLat: 7.35, minLng: 80.4, maxLng: 80.5 }, district: "Kegalle", divisionalSecretariat: "Mawanella" }
];

/**
 * Maps GPS coordinates to the corresponding district and divisional secretariat
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @returns Object containing district and divisionalSecretariat
 */
export const getLocationFromCoordinates = (latitude: number, longitude: number): LocationResult => {
  // Find the first matching location mapping
  for (const mapping of LOCATION_MAPPINGS) {
    const { bounds, district, divisionalSecretariat } = mapping;
    if (
      latitude >= bounds.minLat &&
      latitude <= bounds.maxLat &&
      longitude >= bounds.minLng &&
      longitude <= bounds.maxLng
    ) {
      return { district, divisionalSecretariat };
    }
  }

  // Default fallback if no mapping found (Colombo center)
  return { district: "Colombo", divisionalSecretariat: "Colombo" };
};

/**
 * Gets the current GPS location and returns the corresponding district and divisional secretariat
 * @returns Promise that resolves to LocationResult or rejects with error
 */
export const getCurrentLocation = (): Promise<LocationResult> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = getLocationFromCoordinates(latitude, longitude);
        resolve(location);
      },
      (error) => {
        let errorMessage = "Unable to retrieve location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      }
    );
  });
};

/**
 * Utility function to check if GPS is available
 * @returns boolean indicating GPS availability
 */
export const isGeolocationAvailable = (): boolean => {
  return 'geolocation' in navigator;
};

export default {
  getLocationFromCoordinates,
  getCurrentLocation,
  isGeolocationAvailable
};
