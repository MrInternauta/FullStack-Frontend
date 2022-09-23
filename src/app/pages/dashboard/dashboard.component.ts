import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import * as timez from 'countries-and-timezones';
import * as moment from 'moment-timezone';
import Swal from 'sweetalert2';

import { environment } from '@advanced-front/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  public isUsed!: boolean;
  public date!: string;
  public paises: Country[];
  paisSelected!: Country;
  hay_cat = true;
  constructor(private http: HttpClient) {
    this.paises = [
      {
        nombre: 'México',
        bandera:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/800px-Flag_of_Mexico.svg.png',
      },
      {
        nombre: 'Colombia',
        bandera:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/800px-Flag_of_Colombia.svg.png',
      },
      {
        nombre: 'Argentina',
        bandera:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/800px-Flag_of_Argentina.svg.png',
      },
      {
        nombre: 'Chile',
        bandera:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/800px-Flag_of_Chile.svg.png',
      },
      {
        nombre: 'Cuba',
        bandera:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Flag_of_Cuba.svg/800px-Flag_of_Cuba.svg.png',
      },
      {
        nombre: 'España',
        bandera:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/750px-Flag_of_Spain.svg.png',
      },
      {
        nombre: 'Canadá',
        bandera:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/800px-Flag_of_Canada.svg.png',
      },
      {
        nombre: 'Brasil',
        bandera:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/720px-Flag_of_Brazil.svg.png',
      },
    ];
  }

  ngOnInit() {
    this.http
      .get(
        'https://api.openweathermap.org/data/2.5/weather?q=M%C3%A9xico&appid=6850ce2e80fa3d46b30d0ce3f8bf1a3e&lang=es&units=standard'
      )
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  select_country(pais: Country) {
    Swal.fire(`El pais "${pais.nombre}" fue seleccionado.`, '', 'success');
    this.paisSelected = pais;
    this.get_current_weather();
  }

  select_TimeZone(timeZone: any) {
    this.paisSelected.timeZoneSelected = timeZone.name;

    if (!this.isUsed) {
      this.isUsed = true;
      if (this.paisSelected.timeZoneSelected) {
        this.date = moment.tz(moment(), this.paisSelected.timeZoneSelected).format('HH:mm:ss');
        setInterval(() => {
          if (this.paisSelected.timeZoneSelected)
            this.date = moment.tz(moment(), this.paisSelected.timeZoneSelected).format('HH:mm:ss');
          else this.date = '';
        }, 1000);
      } else {
        this.date = '';
      }
    }
  }

  get_current_weather() {
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.paisSelected.nombre}&appid=${environment.apiKey}&lang=es&units=metric`
      )
      .subscribe((data: any) => {
        this.paisSelected.climaActual = data;

        this.paisSelected.timeZoneLarge = timez.getTimezonesForCountry(this.paisSelected.climaActual.sys.country);

        this.paisSelected.timeZone = this.paisSelected.timeZoneLarge.map((tz: TimeZoneLarge) => {
          tz.nameShort = tz.name.split('/').pop();
          return tz;
        });
      });
  }
}

type Country = {
  nombre: string;
  bandera: string;
  timeZone?: any;
  timeZoneSelected?: any;
  timeZoneLarge?: any;
  climaActual?: any;
};

type TimeZoneLarge = {
  nameShort?: string;
  name: string;
};
