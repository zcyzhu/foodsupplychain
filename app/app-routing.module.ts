/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ShipmentComponent } from './Shipment/Shipment.component';
import { ContractFandSComponent } from './ContractFandS/ContractFandS.component';
import { ContractFandRComponent } from './ContractFandR/ContractFandR.component';
import { ContractRandCComponent } from './ContractRandC/ContractRandC.component';

import { ProducerComponent } from './Producer/Producer.component';
import { ShipperComponent } from './Shipper/Shipper.component';
import { ConsumerComponent } from './Consumer/Consumer.component';
import { RestaurantComponent } from './Restaurant/Restaurant.component';
import { TemperatureSensorComponent } from './TemperatureSensor/TemperatureSensor.component';
import { AirSensorComponent } from './AirSensor/AirSensor.component';
import { GpsSensorComponent } from './GpsSensor/GpsSensor.component';
import { WeightSensorComponent } from './WeightSensor/WeightSensor.component';

import { APIReadingComponent } from './APIReading/APIReading.component';
import { TemperatureReadingComponent } from './TemperatureReading/TemperatureReading.component';
import { GpsReadingComponent } from './GpsReading/GpsReading.component';
import { WeightReadingComponent } from './WeightReading/WeightReading.component';
import { ShipmentProducingComponent } from './ShipmentProducing/ShipmentProducing.component';
import { ShipmentSellingComponent } from './ShipmentSelling/ShipmentSelling.component';
import { ShipmentReceivedComponent } from './ShipmentReceived/ShipmentReceived.component';
import { ShipmentPackedComponent } from './ShipmentPacked/ShipmentPacked.component';
import { ShipmentPickupComponent } from './ShipmentPickup/ShipmentPickup.component';
import { ShipmentLoadedComponent } from './ShipmentLoaded/ShipmentLoaded.component';
import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Shipment', component: ShipmentComponent },
  { path: 'ContractFandS', component: ContractFandSComponent },
  { path: 'ContractFandR', component: ContractFandRComponent },
  { path: 'ContractRandC', component: ContractRandCComponent },
  { path: 'Producer', component: ProducerComponent },
  { path: 'Shipper', component: ShipperComponent },
  { path: 'Consumer', component: ConsumerComponent },
  { path: 'Restaurant', component: RestaurantComponent },
  { path: 'TemperatureSensor', component: TemperatureSensorComponent },
  { path: 'AirSensor', component: AirSensorComponent },
  { path: 'GpsSensor', component: GpsSensorComponent },
  { path: 'WeightSensor', component: WeightSensorComponent },
  { path: 'APIReading', component: APIReadingComponent },
  { path: 'TemperatureReading', component: TemperatureReadingComponent },
  { path: 'GpsReading', component: GpsReadingComponent },
  { path: 'WeightReading', component: WeightReadingComponent },
  { path: 'ShipmentProducing', component: ShipmentProducingComponent },
  { path: 'ShipmentSelling', component: ShipmentSellingComponent },
  { path: 'ShipmentReceived', component: ShipmentReceivedComponent },
  { path: 'ShipmentPacked', component: ShipmentPackedComponent },
  { path: 'ShipmentPickup', component: ShipmentPickupComponent },
  { path: 'ShipmentLoaded', component: ShipmentLoadedComponent },
  { path: 'SetupDemo', component: SetupDemoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
