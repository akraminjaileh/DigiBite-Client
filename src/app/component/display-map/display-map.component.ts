import { Component, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { AddressDTO } from 'src/app/dtos/addressDTO';
import { AddressService } from 'src/app/Services/address.service';

@Component({
  selector: 'app-display-map',
  templateUrl: './display-map.component.html',
  styleUrls: ['./display-map.component.css']
})
export class DisplayMapComponent {
  @Input() lat: number | undefined;
  @Input() lng: number | undefined;

  ngOnInit(): void {
    //For Arabic Address
    (mapboxgl as any).setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
      () => { },
      false
    );
    console.log('lat', this.lat)
    console.log('lat', this.lng)
  }


}
