import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationData } from '../interfaces/timeperiod';

@Injectable({
  providedIn: 'root',
})
export class LocationWeatherService {
  private locationDataSubject = new BehaviorSubject<LocationData>({
    lat: 0,
    lng: 0,
    city: '',
  });
  locationData$ = this.locationDataSubject.asObservable();
  locations: LocationData[] = [];

  setLocationData(data: LocationData) {
    this.locationDataSubject.next(data);
  }

  async getCityApi(latitude: number, longitude: number): Promise<any> {
    let bdcApi = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
    bdcApi =
      bdcApi +
      '?latitude=' +
      latitude +
      '&longitude=' +
      longitude +
      '&localityLanguage=en';
    return new Promise((resolve, reject) => {
      const Http = new XMLHttpRequest();
      Http.open('GET', bdcApi);
      Http.send();
      Http.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            console.log('this.responseText:', data);
            resolve(data);
          } else {
            reject(new Error(`HTTP error! Status: ${this.status}`));
          }
        }
      };
    });
  }
}
