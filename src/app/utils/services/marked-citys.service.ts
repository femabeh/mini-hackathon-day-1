import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarkedCitysService {

  marked_citys: string[] = [];
  temp: any[] = [];
  lat: number[] = [];
  lng: number[] = [];

  constructor() { }
}