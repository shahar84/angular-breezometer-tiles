import {Component, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('googleMap') googleMapElement: any;
  map: google.maps.Map;
  // Your BreezoMeter API key
  API_KEY = '';
  constructor() { }

  ngOnInit() {
    const mapOptions = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.googleMapElement.nativeElement, mapOptions);
    this.addBreezoMeterTiles();
  }

  addBreezoMeterTiles() {
    const TILE_URL = 'https://tiles.breezometer.com/{z}/{x}/{y}.png?key=' + this.API_KEY;
    // Name the layer anything you like.
    const layerID = 'breezometer_tile_layer';
    // Create a new ImageMapType layer.
    const BreezoMeterLayer = new google.maps.ImageMapType({
      name: layerID,
      getTileUrl: function(coordinates: any, zoom: any) {
        const url = TILE_URL
          .replace('{x}', coordinates.x)
          .replace('{y}', coordinates.y)
          .replace('{z}', zoom);
        return url;
      },
      tileSize: new google.maps.Size(256, 256),
      minZoom: 1,
      maxZoom: 20,
      opacity: 0.6
    });
    this.map.overlayMapTypes.push(BreezoMeterLayer);
  }
}
