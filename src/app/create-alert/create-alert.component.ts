import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {Router, RouterLink} from '@angular/router';
import {SmartCityService} from '../data/service/smart-city.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-alert',
  imports: [
    RouterLink,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './create-alert.component.html',
  styleUrl: './create-alert.component.scss',
  providers: [
    HttpClient,
    SmartCityService
  ]
})
export class CreateAlertComponent implements AfterViewInit{
  private map: any;
  latitude: number;
  longitude: number;
  name: string;
  type = 'temperature';
  status = 'active';
  currentValue = 36.04;
  unit = 'C';

  constructor(
    private smartCityService: SmartCityService,
    private router: Router,
  ) {
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ -23.529, -46.6658 ],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const customIconR = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    this.map.on('click', (event: any) => {
      this.latitude = event.latlng.lat;
      this.longitude = event.latlng.lng;
      console.log(event.latlng.lat, event.latlng.lng)

      L.marker([this.latitude, this.longitude], { icon: customIconR }).addTo(this.map)
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap()
  }

  send() {
    this.smartCityService.sendSensor({
      latitude: this.latitude,
      longitude: this.longitude,
      name: this.name,
      type: this.type,
      status: this.status,
      currentValue: this.currentValue,
      unit: this.unit,
    }).subscribe(() => {
      this.router.navigate(['/']);
    })
  }

}
