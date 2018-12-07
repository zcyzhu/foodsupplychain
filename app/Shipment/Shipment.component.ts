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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShipmentService } from './Shipment.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-shipment',
  templateUrl: './Shipment.component.html',
  styleUrls: ['./Shipment.component.css'],
  providers: [ShipmentService]
})
export class ShipmentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  shipmentId = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  unitCount = new FormControl('', Validators.required);
  contractFandS = new FormControl('', Validators.required);
  contractFandR = new FormControl('', Validators.required);
  contractRandC = new FormControl('', Validators.required);
  temperatureReadings = new FormControl('', Validators.required);
  gpsReadings = new FormControl('', Validators.required);
  shipmentSelling = new FormControl('', Validators.required);
  shipmentPacked = new FormControl('', Validators.required);
  shipmentPickup = new FormControl('', Validators.required);
  shipmentLoaded = new FormControl('', Validators.required);
  shipmentReceived = new FormControl('', Validators.required);
  shipmentProducing = new FormControl('', Validators.required);
  aPIReadings = new FormControl('', Validators.required);
  weightReadings = new FormControl('', Validators.required);

  constructor(public serviceShipment: ShipmentService, fb: FormBuilder) {
    this.myForm = fb.group({
      shipmentId: this.shipmentId,
      type: this.type,
      status: this.status,
      unitCount: this.unitCount,
      contractFandS: this.contractFandS,
      contractFandR: this.contractFandR,
      contractRandC: this.contractRandC,
      temperatureReadings: this.temperatureReadings,
      gpsReadings: this.gpsReadings,
      shipmentSelling: this.shipmentSelling,
      shipmentPacked: this.shipmentPacked,
      shipmentPickup: this.shipmentPickup,
      shipmentLoaded: this.shipmentLoaded,
      shipmentReceived: this.shipmentReceived,
      shipmentProducing: this.shipmentProducing,
      aPIReadings: this.aPIReadings,
      weightReadings: this.weightReadings
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceShipment.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.foodSupplyChain.food.Shipment',
      'shipmentId': this.shipmentId.value,
      'type': this.type.value,
      'status': this.status.value,
      'unitCount': this.unitCount.value,
      'contractFandS': this.contractFandS.value,
      'contractFandR': this.contractFandR.value,
      'contractRandC': this.contractRandC.value,
      'temperatureReadings': this.temperatureReadings.value,
      'gpsReadings': this.gpsReadings.value,
      'shipmentSelling': this.shipmentSelling.value,
      'shipmentPacked': this.shipmentPacked.value,
      'shipmentPickup': this.shipmentPickup.value,
      'shipmentLoaded': this.shipmentLoaded.value,
      'shipmentReceived': this.shipmentReceived.value,
      'shipmentProducing': this.shipmentProducing.value,
      'aPIReadings': this.aPIReadings.value,
      'weightReadings': this.weightReadings.value
    };

    this.myForm.setValue({
      'shipmentId': null,
      'type': null,
      'status': null,
      'unitCount': null,
      'contractFandS': null,
      'contractFandR': null,
      'contractRandC': null,
      'temperatureReadings': null,
      'gpsReadings': null,
      'shipmentSelling': null,
      'shipmentPacked': null,
      'shipmentPickup': null,
      'shipmentLoaded': null,
      'shipmentReceived': null,
      'shipmentProducing': null,
      'aPIReadings': null,
      'weightReadings': null
    });

    return this.serviceShipment.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'shipmentId': null,
        'type': null,
        'status': null,
        'unitCount': null,
        'contractFandS': null,
        'contractFandR': null,
        'contractRandC': null,
        'temperatureReadings': null,
        'gpsReadings': null,
        'shipmentSelling': null,
        'shipmentPacked': null,
        'shipmentPickup': null,
        'shipmentLoaded': null,
        'shipmentReceived': null,
        'shipmentProducing': null,
        'aPIReadings': null,
        'weightReadings': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.foodSupplyChain.food.Shipment',
      'type': this.type.value,
      'status': this.status.value,
      'unitCount': this.unitCount.value,
      'contractFandS': this.contractFandS.value,
      'contractFandR': this.contractFandR.value,
      'contractRandC': this.contractRandC.value,
      'temperatureReadings': this.temperatureReadings.value,
      'gpsReadings': this.gpsReadings.value,
      'shipmentSelling': this.shipmentSelling.value,
      'shipmentPacked': this.shipmentPacked.value,
      'shipmentPickup': this.shipmentPickup.value,
      'shipmentLoaded': this.shipmentLoaded.value,
      'shipmentReceived': this.shipmentReceived.value,
      'shipmentProducing': this.shipmentProducing.value,
      'aPIReadings': this.aPIReadings.value,
      'weightReadings': this.weightReadings.value
    };

    return this.serviceShipment.updateAsset(form.get('shipmentId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceShipment.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceShipment.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'shipmentId': null,
        'type': null,
        'status': null,
        'unitCount': null,
        'contractFandS': null,
        'contractFandR': null,
        'contractRandC': null,
        'temperatureReadings': null,
        'gpsReadings': null,
        'shipmentSelling': null,
        'shipmentPacked': null,
        'shipmentPickup': null,
        'shipmentLoaded': null,
        'shipmentReceived': null,
        'shipmentProducing': null,
        'aPIReadings': null,
        'weightReadings': null
      };

      if (result.shipmentId) {
        formObject.shipmentId = result.shipmentId;
      } else {
        formObject.shipmentId = null;
      }

      if (result.type) {
        formObject.type = result.type;
      } else {
        formObject.type = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.unitCount) {
        formObject.unitCount = result.unitCount;
      } else {
        formObject.unitCount = null;
      }

      if (result.contractFandS) {
        formObject.contractFandS = result.contractFandS;
      } else {
        formObject.contractFandS = null;
      }

      if (result.contractFandR) {
        formObject.contractFandR = result.contractFandR;
      } else {
        formObject.contractFandR = null;
      }

      if (result.contractRandC) {
        formObject.contractRandC = result.contractRandC;
      } else {
        formObject.contractRandC = null;
      }

      if (result.temperatureReadings) {
        formObject.temperatureReadings = result.temperatureReadings;
      } else {
        formObject.temperatureReadings = null;
      }

      if (result.gpsReadings) {
        formObject.gpsReadings = result.gpsReadings;
      } else {
        formObject.gpsReadings = null;
      }

      if (result.shipmentSelling) {
        formObject.shipmentSelling = result.shipmentSelling;
      } else {
        formObject.shipmentSelling = null;
      }

      if (result.shipmentPacked) {
        formObject.shipmentPacked = result.shipmentPacked;
      } else {
        formObject.shipmentPacked = null;
      }

      if (result.shipmentPickup) {
        formObject.shipmentPickup = result.shipmentPickup;
      } else {
        formObject.shipmentPickup = null;
      }

      if (result.shipmentLoaded) {
        formObject.shipmentLoaded = result.shipmentLoaded;
      } else {
        formObject.shipmentLoaded = null;
      }

      if (result.shipmentReceived) {
        formObject.shipmentReceived = result.shipmentReceived;
      } else {
        formObject.shipmentReceived = null;
      }

      if (result.shipmentProducing) {
        formObject.shipmentProducing = result.shipmentProducing;
      } else {
        formObject.shipmentProducing = null;
      }

      if (result.aPIReadings) {
        formObject.aPIReadings = result.aPIReadings;
      } else {
        formObject.aPIReadings = null;
      }

      if (result.weightReadings) {
        formObject.weightReadings = result.weightReadings;
      } else {
        formObject.weightReadings = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'shipmentId': null,
      'type': null,
      'status': null,
      'unitCount': null,
      'contractFandS': null,
      'contractFandR': null,
      'contractRandC': null,
      'temperatureReadings': null,
      'gpsReadings': null,
      'shipmentSelling': null,
      'shipmentPacked': null,
      'shipmentPickup': null,
      'shipmentLoaded': null,
      'shipmentReceived': null,
      'shipmentProducing': null,
      'aPIReadings': null,
      'weightReadings': null
      });
  }

}
