
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

 /**
  * JSP - Just demonstrates that you don't have to have all your chaincode in logic.js
  * (it will get quite cluttered over time).
  */


/**
 * ShipmentPickup - invoked when the Shipment has been picked up from the packer.
 * 
 * @param {org.foodSupplyChain.food.ShipmentPickup} shipmentPickup - the ShipmentPickup transaction
 * @transaction
 */
function pickupShipment(shipmentPickup) {
    var shipment = shipmentPickup.shipment;
    var NS = 'org.foodSupplyChain.food';
    var contractFandS = shipment.contractFandS;
    var factory = getFactory();

    // Add the ShipmentPacked transaction to the ledger (via the Shipment asset)
    shipment.shipmentPickup = shipmentPickup;

    // Create the message
    var message = '货物已装运 ' + shipment.$identifier;

    // Log it to the JavaScript console
    console.log(message);

    // Emit a notification telling subscribed listeners that the shipment has been packed
    var shipmentPickupEvent = factory.newEvent(NS, 'ShipmentPickupEvent');
    shipmentPickupEvent.shipment = shipment;
    shipmentPickupEvent.message = message;
    console.log(shipmentPickupEvent.message );
    emit(shipmentPickupEvent);

    // Update the Asset Registry
    return getAssetRegistry(NS + '.Shipment')
        .then(function (shipmentRegistry) {
            // add the temp reading to the shipment
            return shipmentRegistry.update(shipment);
        });
}

/**
 * ShipmentLoaded - invoked when the Shipment has been loaded onto the container ship.
 * 
 * @param {org.foodSupplyChain.food.ShipmentLoaded} shipmentLoaded - the ShipmentLoaded transaction
 * @transaction
 */
function loadShipment(shipmentLoaded) {
    var shipment = shipmentLoaded.shipment;
    var NS = 'org.foodSupplyChain.food';
    var contractFandS = shipment.contractFandS;
    var factory = getFactory();

    // Add the ShipmentPacked transaction to the ledger (via the Shipment asset)
    shipment.shipmentLoaded = shipmentLoaded;

    // Create the message
    var message = '货物正在运输 ' + shipment.$identifier;

    // Log it to the JavaScript console
    console.log(message);

    // Emit a notification telling subscribed listeners that the shipment has been packed
    var shipmentLoadedEvent = factory.newEvent(NS, 'ShipmentLoadedEvent');
    shipmentLoadedEvent.shipment = shipment;
    shipmentLoadedEvent.message = message;
    console.log( shipmentLoadedEvent.message );
    emit(shipmentLoadedEvent);

    // Update the Asset Registry
    return getAssetRegistry(NS + '.Shipment')
        .then(function (shipmentRegistry) {
            // add the temp reading to the shipment
            return shipmentRegistry.update(shipment);
        });
}




