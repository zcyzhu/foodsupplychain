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
import { ContractRandCService } from './ContractRandC.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contractrandc',
  templateUrl: './ContractRandC.component.html',
  styleUrls: ['./ContractRandC.component.css'],
  providers: [ContractRandCService]
})
export class ContractRandCComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  contractRCId = new FormControl('', Validators.required);
  restaurant = new FormControl('', Validators.required);
  consumer = new FormControl('', Validators.required);
  sellingPrice = new FormControl('', Validators.required);
  minWeight = new FormControl('', Validators.required);

  constructor(public serviceContractRandC: ContractRandCService, fb: FormBuilder) {
    this.myForm = fb.group({
      contractRCId: this.contractRCId,
      restaurant: this.restaurant,
      consumer: this.consumer,
      sellingPrice: this.sellingPrice,
      minWeight: this.minWeight
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceContractRandC.getAll()
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
      $class: 'org.foodSupplyChain.food.ContractRandC',
      'contractRCId': this.contractRCId.value,
      'restaurant': this.restaurant.value,
      'consumer': this.consumer.value,
      'sellingPrice': this.sellingPrice.value,
      'minWeight': this.minWeight.value
    };

    this.myForm.setValue({
      'contractRCId': null,
      'restaurant': null,
      'consumer': null,
      'sellingPrice': null,
      'minWeight': null
    });

    return this.serviceContractRandC.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'contractRCId': null,
        'restaurant': null,
        'consumer': null,
        'sellingPrice': null,
        'minWeight': null
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
      $class: 'org.foodSupplyChain.food.ContractRandC',
      'restaurant': this.restaurant.value,
      'consumer': this.consumer.value,
      'sellingPrice': this.sellingPrice.value,
      'minWeight': this.minWeight.value
    };

    return this.serviceContractRandC.updateAsset(form.get('contractRCId').value, this.asset)
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

    return this.serviceContractRandC.deleteAsset(this.currentId)
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

    return this.serviceContractRandC.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'contractRCId': null,
        'restaurant': null,
        'consumer': null,
        'sellingPrice': null,
        'minWeight': null
      };

      if (result.contractRCId) {
        formObject.contractRCId = result.contractRCId;
      } else {
        formObject.contractRCId = null;
      }

      if (result.restaurant) {
        formObject.restaurant = result.restaurant;
      } else {
        formObject.restaurant = null;
      }

      if (result.consumer) {
        formObject.consumer = result.consumer;
      } else {
        formObject.consumer = null;
      }

      if (result.sellingPrice) {
        formObject.sellingPrice = result.sellingPrice;
      } else {
        formObject.sellingPrice = null;
      }

      if (result.minWeight) {
        formObject.minWeight = result.minWeight;
      } else {
        formObject.minWeight = null;
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
      'contractRCId': null,
      'restaurant': null,
      'consumer': null,
      'sellingPrice': null,
      'minWeight': null
      });
  }

}
