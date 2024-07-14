export interface WeatherParams {
  latitude: number;
  longitude: number;
  current: string[];
  hourly: string[];
  daily: string[];
  timezone: string;
  models: string;
}
