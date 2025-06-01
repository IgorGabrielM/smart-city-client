import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-create-alert',
  imports: [
    RouterLink
  ],
  templateUrl: './create-alert.component.html',
  styleUrl: './create-alert.component.scss'
})
export class CreateAlertComponent implements AfterViewInit{
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ -23.089, -47.218 ],
      zoom: 8
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
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      console.log(event.latlng.lat, event.latlng.lng)

      L.marker([lat, lng], { icon: customIconR }).addTo(this.map)
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap()
  }

}
