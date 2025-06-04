import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SmartCityService} from '../data/service/smart-city.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  providers: [
    HttpClient,
    SmartCityService
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  private map: any;
  alerts: any[] = [];
  sensors: any[] = [];
  populationReports: any;

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

    const customIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/999/999105.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    const customIconR = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    L.marker([-23.089, -46.218], { icon: customIconR }).addTo(this.map);
    tiles.addTo(this.map);
  }

  constructor(
    private smartCityService: SmartCityService
  ) {
  }

  ngAfterViewInit(): void {
    this.smartCityService.getDashboardOverview().subscribe((res) => {
      console.log(res);
      const customIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/999/999105.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      res.sensors.forEach((a) => {
        L.marker([a.latitude, a.longitude], { icon: customIcon })
          .addTo(this.map)
          .bindPopup(`<b>${a.name}</b> <br> <b>Localização:</b> ${a.location}`)
          .openPopup();
      });
      this.alerts = res.alerts;
      this.sensors = res.sensors;
      this.populationReports = res.populationReports;
      console.log(this.populationReports.byPriority);
    })
    this.initMap()
  }

  getColor(index: number): string {
    switch (index) {
      case 0: return 'bg-red-600'
      case 1: return 'bg-amber-600'
      case 2: return 'bg-yellow-300'
      case 3: return 'bg-green-600'
    }
    return 'bg-gray-600';
  }

  getName(index: number): string {
    switch (index) {
      case 0: return 'Emergência';
      case 1: return 'Meio ambiente';
      case 2: return 'Infraestrutura';
      case 3: return 'Segurança';
      case 4: return 'Sugestão';
      case 5: return 'Trânsito';
    }
    return '';
  }

  ngOnInit() {
  }

}
