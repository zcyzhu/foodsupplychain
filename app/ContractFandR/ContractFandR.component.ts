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
import { ContractFandRService } from './ContractFandR.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contractfandr',
  templateUrl: './ContractFandR.component.html',
  styleUrls: ['./ContractFandR.component.css'],
  providers: [ContractFandRService]
})
export class ContractFandRComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  contractFRId = new FormControl('', Validators.required);
  producer = new FormControl('', Validators.required);
  restaurant = new FormControl('', Validators.required);
  unitPrice = new FormControl('', Validators.required);
  maxPenaltyFactor2 = new FormControl('', Validators.required);
  maxAirPollution = new FormControl('', Validators.required);

  constructor(public serviceContractFandR: ContractFandRService, fb: FormBuilder) {
    this.myForm = fb.group({
      contractFRId: this.contractFRId,
      producer: this.producer,
      restaurant: this.restaurant,
      unitPrice: this.unitPrice,
      maxPenaltyFactor2: this.maxPenaltyFactor2,
      maxAirPollution: this.maxAirPollution
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceContractFandR.getAll()
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
      $class: 'org.foodSupplyChain.food.ContractFandR',
      'contractFRId': this.contractFRId.value,
      'producer': this.producer.value,
      'restaurant': this.restaurant.value,
      'unitPrice': this.unitPrice.value,
      'maxPenaltyFactor2': this.maxPenaltyFactor2.value,
      'maxAirPollution': this.maxAirPollution.value
    };

    this.myForm.setValue({
      'contractFRId': null,
      'producer': null,
      'restaurant': null,
      'unitPrice': null,
      'maxPenaltyFactor2': null,
      'maxAirPollution': null
    });

    return this.serviceContractFandR.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'contractFRId': null,
        'producer': null,
        'restaurant': null,
        'unitPrice': null,
        'maxPenaltyFactor2': null,
        'maxAirPollution': null
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
      $class: 'org.foodSupplyChain.food.ContractFandR',
      'producer': this.producer.value,
      'restaurant': this.restaurant.value,
      'unitPrice': this.unitPrice.value,
      'maxPenaltyFactor2': this.maxPenaltyFactor2.value,
      'maxAirPollution': this.maxAirPollution.value
    };

    return this.serviceContractFandR.updateAsset(form.get('contractFRId').value, this.asset)
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

    return this.serviceContractFandR.deleteAsset(this.currentId)
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

    return this.serviceContractFandR.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'contractFRId': null,
        'producer': null,
        'restaurant': null,
        'unitPrice': null,
        'maxPenaltyFactor2': null,
        'maxAirPollution': null
      };

      if (result.contractFRId) {
        formObject.contractFRId = result.contractFRId;
      } else {
        formObject.contractFRId = null;
      }

      if (result.producer) {
        formObject.producer = result.producer;
      } else {
        formObject.producer = null;
      }

      if (result.restaurant) {
        formObject.restaurant = result.restaurant;
      } else {
        formObject.restaurant = null;
      }

      if (result.unitPrice) {
        formObject.unitPrice = result.unitPrice;
      } else {
        formObject.unitPrice = null;
      }

      if (result.maxPenaltyFactor2) {
        formObject.maxPenaltyFactor2 = result.maxPenaltyFactor2;
      } else {
        formObject.maxPenaltyFactor2 = null;
      }

      if (result.maxAirPollution) {
        formObject.maxAirPollution = result.maxAirPollution;
      } else {
        formObject.maxAirPollution = null;
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
      'contractFRId': null,
      'producer': null,
      'restaurant': null,
      'unitPrice': null,
      'maxPenaltyFactor2': null,
      'maxAirPollution': null
      });
  }

}
