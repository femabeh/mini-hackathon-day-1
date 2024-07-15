import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  getWeatherDescription(code: number): string {
    const weatherDescriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear, partly cloudy, and overcast',
      2: 'Mainly clear, partly cloudy, and overcast',
      3: 'Mainly clear, partly cloudy, and overcast',
      45: 'Fog and depositing rime fog',
      48: 'Fog and depositing rime fog',
      51: 'Drizzle: Light, moderate, and dense intensity',
      53: 'Drizzle: Light, moderate, and dense intensity',
      55: 'Drizzle: Light, moderate, and dense intensity',
      56: 'Freezing Drizzle: Light and dense intensity',
      57: 'Freezing Drizzle: Light and dense intensity',
      61: 'Rain: Slight, moderate and heavy intensity',
      63: 'Rain: Slight, moderate and heavy intensity',
      65: 'Rain: Slight, moderate and heavy intensity',
      66: 'Freezing Rain: Light and heavy intensity',
      67: 'Freezing Rain: Light and heavy intensity',
      71: 'Snow fall: Slight, moderate, and heavy intensity',
      73: 'Snow fall: Slight, moderate, and heavy intensity',
      75: 'Snow fall: Slight, moderate, and heavy intensity',
      77: 'Snow grains',
      80: 'Rain showers: Slight, moderate, and violent',
      81: 'Rain showers: Slight, moderate, and violent',
      82: 'Rain showers: Slight, moderate, and violent',
      85: 'Snow showers slight and heavy',
      86: 'Snow showers slight and heavy',
      95: 'Thunderstorm: Slight or moderate',
      96: 'Thunderstorm with slight and heavy hail',
      99: 'Thunderstorm with slight and heavy hail',
    };

    return weatherDescriptions[code] || 'Unknown weather code';
  }

  formatHour(hour: number): string {
    if (hour < 0 || hour > 23) {
      throw new Error('Hour must be between 0 and 23');
    }
    // Pad the hour with leading zero if necessary and add ":00"
    return hour.toString().padStart(2, '0') + ':00';
  }

  getWeatherCondition(precipitation: number): string {
    if (precipitation < 0 || precipitation > 100) {
      throw new Error('Precipitation must be between 0 and 100');
    }

    if (precipitation === 0) {
      return 'sun';
    } else if (precipitation > 0 && precipitation <= 30) {
      return 'cloud_sun';
    } else if (precipitation > 30 && precipitation <= 70) {
      return 'cloud';
    } else {
      return 'cloud_rain';
    }
  }
}
