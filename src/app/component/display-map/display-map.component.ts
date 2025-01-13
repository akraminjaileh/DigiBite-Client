import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-display-map',
  templateUrl: './display-map.component.html',
  styleUrls: ['./display-map.component.css']
})
export class DisplayMapComponent {

  @Input() lat: number | undefined;
  @Input() lng: number | undefined;
  @Input() canEdit: boolean = false;

  @Output() markerChanged: EventEmitter<{ lat: number, lng: number }> = new EventEmitter();

  // Called when the map drag ends
  onMapDragEnd(event: any): void {
    const map = event.target;
    const center = map.getCenter();
    this.lng = center.lng;
    this.lat = center.lat;
    this.markerChanged.emit({ lat: center.lat, lng: center.lng });
    console.log(this.lat, this.lng);
  }

}
