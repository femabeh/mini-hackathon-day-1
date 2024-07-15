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

  getWeatherDescriptionText(weatherCode: number): string {
    const weatherDescriptions: { [key: number]: string } = {
      0: 'clear sky',
      1: 'mainly clear, partly cloudy, and overcast',
      2: 'mainly clear, partly cloudy, and overcast',
      3: 'mainly clear, partly cloudy, and overcast',
      45: 'fog and depositing rime fog',
      48: 'fog and depositing rime fog',
      51: 'light drizzle',
      53: 'moderate drizzle',
      55: 'dense drizzle',
      56: 'light freezing drizzle',
      57: 'dense freezing drizzle',
      61: 'slight rain',
      63: 'moderate rain',
      65: 'heavy rain',
      66: 'light freezing rain',
      67: 'heavy freezing rain',
      71: 'slight snowfall',
      73: 'moderate snowfall',
      75: 'heavy snowfall',
      77: 'snow grains',
      80: 'slight rain showers',
      81: 'moderate rain showers',
      82: 'violent rain showers',
      85: 'slight snow showers',
      86: 'heavy snow showers',
      95: 'slight or moderate thunderstorm',
      96: 'thunderstorm with slight hail',
      99: 'thunderstorm with heavy hail',
    };

    const description = weatherDescriptions[weatherCode];

    if (description) {
      return `It will remain ${description} for the next few hours.`;
    } else {
      return 'Unknown weather code';
    }
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

  getDayNameFromTimestamp(timestamp: number): string {
    const daysOfWeek = [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ];

    const date = new Date(timestamp);
    const today = new Date();

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      return 'Heute';
    }

    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }
}
