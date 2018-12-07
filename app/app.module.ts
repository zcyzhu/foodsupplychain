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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
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

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShipmentComponent,
    ContractFandSComponent,
    ContractFandRComponent,
    ContractRandCComponent,
    ProducerComponent,
    ShipperComponent,
    ConsumerComponent,
    RestaurantComponent,
    TemperatureSensorComponent,
    AirSensorComponent,
    GpsSensorComponent,
    WeightSensorComponent,
    APIReadingComponent,
    TemperatureReadingComponent,
    GpsReadingComponent,
    WeightReadingComponent,
    ShipmentProducingComponent,
    ShipmentSellingComponent,
    ShipmentReceivedComponent,
    ShipmentPackedComponent,
    ShipmentPickupComponent,
    ShipmentLoadedComponent,
    SetupDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
