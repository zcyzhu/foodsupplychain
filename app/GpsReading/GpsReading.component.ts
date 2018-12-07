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
import { GpsReadingService } from './GpsReading.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-gpsreading',
  templateUrl: './GpsReading.component.html',
  styleUrls: ['./GpsReading.component.css'],
  providers: [GpsReadingService]
})
export class GpsReadingComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  readingTime = new FormControl('', Validators.required);
  readingDate = new FormControl('', Validators.required);
  latitude = new FormControl('', Validators.required);
  latitudeDir = new FormControl('', Validators.required);
  longitude = new FormControl('', Validators.required);
  longitudeDir = new FormControl('', Validators.required);
  shipment = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceGpsReading: GpsReadingService, fb: FormBuilder) {
    this.myForm = fb.group({
      readingTime: this.readingTime,
      readingDate: this.readingDate,
      latitude: this.latitude,
      latitudeDir: this.latitudeDir,
      longitude: this.longitude,
      longitudeDir: this.longitudeDir,
      shipment: this.shipment,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceGpsReading.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.foodSupplyChain.food.GpsReading',
      'readingTime': this.readingTime.value,
      'readingDate': this.readingDate.value,
      'latitude': this.latitude.value,
      'latitudeDir': this.latitudeDir.value,
      'longitude': this.longitude.value,
      'longitudeDir': this.longitudeDir.value,
      'shipment': this.shipment.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'readingTime': null,
      'readingDate': null,
      'latitude': null,
      'latitudeDir': null,
      'longitude': null,
      'longitudeDir': null,
      'shipment': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceGpsReading.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'readingTime': null,
        'readingDate': null,
        'latitude': null,
        'latitudeDir': null,
        'longitude': null,
        'longitudeDir': null,
        'shipment': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.foodSupplyChain.food.GpsReading',
      'readingTime': this.readingTime.value,
      'readingDate': this.readingDate.value,
      'latitude': this.latitude.value,
      'latitudeDir': this.latitudeDir.value,
      'longitude': this.longitude.value,
      'longitudeDir': this.longitudeDir.value,
      'shipment': this.shipment.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceGpsReading.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceGpsReading.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceGpsReading.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'readingTime': null,
        'readingDate': null,
        'latitude': null,
        'latitudeDir': null,
        'longitude': null,
        'longitudeDir': null,
        'shipment': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.readingTime) {
        formObject.readingTime = result.readingTime;
      } else {
        formObject.readingTime = null;
      }

      if (result.readingDate) {
        formObject.readingDate = result.readingDate;
      } else {
        formObject.readingDate = null;
      }

      if (result.latitude) {
        formObject.latitude = result.latitude;
      } else {
        formObject.latitude = null;
      }

      if (result.latitudeDir) {
        formObject.latitudeDir = result.latitudeDir;
      } else {
        formObject.latitudeDir = null;
      }

      if (result.longitude) {
        formObject.longitude = result.longitude;
      } else {
        formObject.longitude = null;
      }

      if (result.longitudeDir) {
        formObject.longitudeDir = result.longitudeDir;
      } else {
        formObject.longitudeDir = null;
      }

      if (result.shipment) {
        formObject.shipment = result.shipment;
      } else {
        formObject.shipment = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'readingTime': null,
      'readingDate': null,
      'latitude': null,
      'latitudeDir': null,
      'longitude': null,
      'longitudeDir': null,
      'shipment': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
