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
import { ContractFandSService } from './ContractFandS.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contractfands',
  templateUrl: './ContractFandS.component.html',
  styleUrls: ['./ContractFandS.component.css'],
  providers: [ContractFandSService]
})
export class ContractFandSComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  contractFSId = new FormControl('', Validators.required);
  producer = new FormControl('', Validators.required);
  shipper = new FormControl('', Validators.required);
  arrivalDateTime = new FormControl('', Validators.required);
  shippingFee = new FormControl('', Validators.required);
  minTemperature = new FormControl('', Validators.required);
  maxTemperature = new FormControl('', Validators.required);
  minPenaltyFactor = new FormControl('', Validators.required);
  maxPenaltyFactor1 = new FormControl('', Validators.required);

  constructor(public serviceContractFandS: ContractFandSService, fb: FormBuilder) {
    this.myForm = fb.group({
      contractFSId: this.contractFSId,
      producer: this.producer,
      shipper: this.shipper,
      arrivalDateTime: this.arrivalDateTime,
      shippingFee: this.shippingFee,
      minTemperature: this.minTemperature,
      maxTemperature: this.maxTemperature,
      minPenaltyFactor: this.minPenaltyFactor,
      maxPenaltyFactor1: this.maxPenaltyFactor1
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceContractFandS.getAll()
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
      $class: 'org.foodSupplyChain.food.ContractFandS',
      'contractFSId': this.contractFSId.value,
      'producer': this.producer.value,
      'shipper': this.shipper.value,
      'arrivalDateTime': this.arrivalDateTime.value,
      'shippingFee': this.shippingFee.value,
      'minTemperature': this.minTemperature.value,
      'maxTemperature': this.maxTemperature.value,
      'minPenaltyFactor': this.minPenaltyFactor.value,
      'maxPenaltyFactor1': this.maxPenaltyFactor1.value
    };

    this.myForm.setValue({
      'contractFSId': null,
      'producer': null,
      'shipper': null,
      'arrivalDateTime': null,
      'shippingFee': null,
      'minTemperature': null,
      'maxTemperature': null,
      'minPenaltyFactor': null,
      'maxPenaltyFactor1': null
    });

    return this.serviceContractFandS.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'contractFSId': null,
        'producer': null,
        'shipper': null,
        'arrivalDateTime': null,
        'shippingFee': null,
        'minTemperature': null,
        'maxTemperature': null,
        'minPenaltyFactor': null,
        'maxPenaltyFactor1': null
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
      $class: 'org.foodSupplyChain.food.ContractFandS',
      'producer': this.producer.value,
      'shipper': this.shipper.value,
      'arrivalDateTime': this.arrivalDateTime.value,
      'shippingFee': this.shippingFee.value,
      'minTemperature': this.minTemperature.value,
      'maxTemperature': this.maxTemperature.value,
      'minPenaltyFactor': this.minPenaltyFactor.value,
      'maxPenaltyFactor1': this.maxPenaltyFactor1.value
    };

    return this.serviceContractFandS.updateAsset(form.get('contractFSId').value, this.asset)
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

    return this.serviceContractFandS.deleteAsset(this.currentId)
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

    return this.serviceContractFandS.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'contractFSId': null,
        'producer': null,
        'shipper': null,
        'arrivalDateTime': null,
        'shippingFee': null,
        'minTemperature': null,
        'maxTemperature': null,
        'minPenaltyFactor': null,
        'maxPenaltyFactor1': null
      };

      if (result.contractFSId) {
        formObject.contractFSId = result.contractFSId;
      } else {
        formObject.contractFSId = null;
      }

      if (result.producer) {
        formObject.producer = result.producer;
      } else {
        formObject.producer = null;
      }

      if (result.shipper) {
        formObject.shipper = result.shipper;
      } else {
        formObject.shipper = null;
      }

      if (result.arrivalDateTime) {
        formObject.arrivalDateTime = result.arrivalDateTime;
      } else {
        formObject.arrivalDateTime = null;
      }

      if (result.shippingFee) {
        formObject.shippingFee = result.shippingFee;
      } else {
        formObject.shippingFee = null;
      }

      if (result.minTemperature) {
        formObject.minTemperature = result.minTemperature;
      } else {
        formObject.minTemperature = null;
      }

      if (result.maxTemperature) {
        formObject.maxTemperature = result.maxTemperature;
      } else {
        formObject.maxTemperature = null;
      }

      if (result.minPenaltyFactor) {
        formObject.minPenaltyFactor = result.minPenaltyFactor;
      } else {
        formObject.minPenaltyFactor = null;
      }

      if (result.maxPenaltyFactor1) {
        formObject.maxPenaltyFactor1 = result.maxPenaltyFactor1;
      } else {
        formObject.maxPenaltyFactor1 = null;
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
      'contractFSId': null,
      'producer': null,
      'shipper': null,
      'arrivalDateTime': null,
      'shippingFee': null,
      'minTemperature': null,
      'maxTemperature': null,
      'minPenaltyFactor': null,
      'maxPenaltyFactor1': null
      });
  }

}
