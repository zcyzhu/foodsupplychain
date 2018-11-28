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
 * A Shipment has been received.
 * 
 * @param { org.foodSupplyChain.food.ShipmentReceived} shipmentReceived - the ShipmentReceived transaction
 * @transaction
 */
function receiveShipment(shipmentReceived) {//工厂和物流公司之间的交易

    var contractFandS  = shipmentReceived.shipment.contractFandS;
    var shipment = shipmentReceived.shipment;
    var payOut = contractFandS.shippingFee * shipment.unitCount;//运输费用
    console.log('-----------------------------------------------------------------------------------------------------------');
    console.log('收到食品的时间: ' + shipmentReceived.timestamp);
    console.log('规定到达的时间: ' + contractFandS.arrivalDateTime + 1);

    // set the status of the shipment
    shipment.status = 'ARRIVED';

    // if the shipment did not arrive on time the payout is zero
    if (shipmentReceived.timestamp > contractFandS.arrivalDateTime) {//在规定的时间没有到达，则不收款
        payOut = 0;
        console.log('到货迟到');
    } else {
        // find the lowest temperature reading
        if (shipment.temperatureReadings) {
            // sort the temperatureReadings by centigrade
            shipment.temperatureReadings.sort(function (a, b) {
                return (a.centigrade - b.centigrade);
            });
            var lowestReading = shipment.temperatureReadings[0];
            var highestReading = shipment.temperatureReadings[shipment.temperatureReadings.length - 1];
            var penalty = 0;
            console.log('最低温度读数: ' + lowestReading.centigrade);
            console.log('最高温度读数: ' + highestReading.centigrade);

            // does the lowest temperature violate the contract?
            if (lowestReading.centigrade < contractFandS.minTemperature) {
                penalty += (contractFandS.minTemperature - lowestReading.centigrade) * contractFandS.minPenaltyFactor;
                console.log('低温惩罚数额: ' + penalty * shipment.unitCount + '元');
            }

            // does the highest temperature violate the contract?
            if (highestReading.centigrade > contractFandS.maxTemperature) {
                penalty += (highestReading.centigrade - contractFandS.maxTemperature) * contractFandS.maxPenaltyFactor1;
                console.log('高温惩罚数额: ' + penalty + '元');
            }

            // apply any penalities
            payOut -= (penalty * shipment.unitCount);

            if (payOut < 0) {
                payOut = 0;
            }
        }
    }
    console.log('运输费是10元/kg');
    console.log('运输费: ' + payOut);
    contractFandS.producer.accountBalance -= payOut;
    contractFandS.shipper.accountBalance += payOut;

    console.log('工厂: ' + contractFandS.producer.$identifier + ' 支付的金额: ' + contractFandS.producer.accountBalance + '元');
    console.log('物流公司: ' + contractFandS.shipper.$identifier + ' 获取的金额: ' + contractFandS.shipper.accountBalance + '元');

    var NS = 'org.foodSupplyChain.food';
    // Store the ShipmentReceived transaction with the Shipment asset it belongs to
    shipment.shipmentReceived = shipmentReceived;

    var factory = getFactory();
    var shipmentReceivedEvent = factory.newEvent(NS, 'ShipmentReceivedEvent');
    var message = '食品' + shipment.$identifier + ' 已收到';
    console.log(message);
    shipmentReceivedEvent.message = message;
    shipmentReceivedEvent.shipment = shipment;
    emit(shipmentReceivedEvent);

    return getParticipantRegistry('org.foodSupplyChain.food.Producer')
        .then(function (producerRegistry) {
            // update the grower's balance
            return producerRegistry.update(contractFandS.producer);
        })
        .then(function () {
            return getParticipantRegistry('org.foodSupplyChain.food.Shipper');
        })
        .then(function (shipperRegistry) {
            // update the shipper's balance
            return shipperRegistry.update(contractFandS.shipper);
        })
        .then(function () {
            return getAssetRegistry('org.foodSupplyChain.food.Shipment');
        })
        .then(function (shipmentRegistry) {
            // update the state of the shipment
            return shipmentRegistry.update(shipment);
        });
}


/**
 * A Shipment has been packed.
 * 
 * @param { org.foodSupplyChain.food.ShipmentProduced} shipmentProduced - the ShipmentProduced transaction
 * @transaction
 */
function produceShipment(shipmentProduced) {//工厂和餐厅的交易

    var contractFandR = shipmentProduced.shipment.contractFandR;
    var shipment = shipmentProduced.shipment;
    var payOut = contractFandR.unitPrice * shipment.unitCount;//运输费用
    console.log('--------------------------------------------------------------------------------------------------------');
    console.log('食品生产的时间: ' + shipmentProduced.producedDateTime );

    // set the status of the shipment
    shipment.status = 'IN_TRANSIT';
    if (shipment.aPIReadings) {
        // sort the aPIReadings by centigrade
        shipment.aPIReadings.sort(function (a, b) {
                return (a.unit - b.unit);
            });
            var highestReading = shipment.aPIReadings[shipment.aPIReadings.length - 1];
            var penalty = 0;
            console.log('最高空气质量读数: ' + highestReading.unit);
            // does the highest temperature violate the contract?
            if (highestReading.unit > contractFandR.maxAirPollution) {
                penalty += (highestReading.unit - contractFandR.maxAirPollution) * contractFandR.maxPenaltyFactor2;
                console.log('空气污染惩罚: ' + penalty * shipment.unitCount + '元');
            }

            // apply any penalities
            payOut -= (penalty * shipment.unitCount);

            if (payOut < 0) {
                payOut = 0;
            }
        
    }
    console.log('成本价是40元/kg');
    console.log('工厂与餐厅交易金额: ' + payOut + '元');
    contractFandR.producer.accountBalance += payOut;
    contractFandR.restaurant.accountBalance -= payOut;

    console.log('工厂: ' + contractFandR.producer.$identifier + ' 获取的金额: ' + contractFandR.producer.accountBalance + '元');
    console.log('餐厅: ' + contractFandR.restaurant.$identifier + ' 支付的金额: ' + contractFandR.restaurant.accountBalance + '元');

    var NS = 'org.foodSupplyChain.food';
    // Store the ShipmentReceived transaction with the Shipment asset it belongs to
    shipment.shipmentProduced = shipmentProduced;

    var factory = getFactory();
    var shipmentProducedEvent = factory.newEvent(NS, 'ShipmentProducedEvent');
    var message = '食品' + shipment.$identifier + ' 已生产';
    console.log(message);
    shipmentProducedEvent.message = message;
    shipmentProducedEvent.shipment = shipment;
    emit(shipmentProducedEvent);

    return getParticipantRegistry('org.foodSupplyChain.food.Producer')
        .then(function (producerRegistry) {
            // update the grower's balance
            return producerRegistry.update(contractFandR.producer);
        })
        .then(function () {
            return getParticipantRegistry('org.foodSupplyChain.food.Restaurant');
        })
        .then(function (restaurantRegistry) {
            // update the restaurant's balance
            return restaurantRegistry.update(contractFandR.restaurant);
        })
        .then(function () {
            return getAssetRegistry('org.foodSupplyChain.food.Shipment');
        })
        .then(function (shipmentRegistry) {
            // update the state of the shipment
            return shipmentRegistry.update(shipment);
        });
}



/**
 * A temperature reading has been received for a shipment
 * @param { org.foodSupplyChain.food.TemperatureReading} temperatureReading - the TemperatureReading transaction
 * @transaction
 */
function temperatureReading(temperatureReading) {

    var shipment = temperatureReading.shipment;
    var NS = 'org.foodSupplyChain.food';
    var contractFandS = shipment.contractFandS;
    var factory = getFactory();
    console.log('--------------------------------------------------------------------------------------');
    console.log('添加温度读数 ' + temperatureReading.centigrade + ' 到货物 ' + shipment.$identifier);

    if (shipment.temperatureReadings) {
        shipment.temperatureReadings.push(temperatureReading);
    } else {
        shipment.temperatureReadings = [temperatureReading];
    }

    var temperatureEvent = factory.newEvent(NS, 'TemperatureThresholdEvent');
    temperatureEvent.shipment = shipment;
    temperatureEvent.temperature = temperatureReading.centigrade;
    temperatureEvent.message = '发送温度事件: ' + shipment.$identifier;   
    emit(temperatureEvent);
    

    return getAssetRegistry(NS + '.Shipment')
        .then(function (shipmentRegistry) {
            // add the temp reading to the shipment
            return shipmentRegistry.update(shipment);
        });
}

/**
 * A GPS reading has been received for a shipment
 * @param {org.foodSupplyChain.food.GpsReading} gpsReading - the GpsReading transaction
 * @transaction
 */
function gpsReading(gpsReading) {

    var factory = getFactory();
    var NS = "org.foodSupplyChain.food";
    var shipment = gpsReading.shipment;
    var PORT_OF_BEIJING = '/纬度:39.6N/经度:115.9W';
    console.log('------------------------------------------------------------------------------');
    if (shipment.gpsReadings) {
        shipment.gpsReadings.push(gpsReading);
    } else {
        shipment.gpsReadings = [gpsReading];
    }

    var latLong = '/纬度:' + gpsReading.latitude + gpsReading.latitudeDir + '/经度:' +
    gpsReading.longitude + gpsReading.longitudeDir;

    if (latLong == PORT_OF_BEIJING) {
        var shipmentInPortEvent = factory.newEvent(NS, 'ShipmentInPortEvent');
        shipmentInPortEvent.shipment = shipment;
        var message = '货物已到达目的地 ' + PORT_OF_BEIJING;
        shipmentInPortEvent.message = message;
        console.log(shipmentInPortEvent.message);
        emit(shipmentInPortEvent);
    }else{
        var shipmentInPortEvent = factory.newEvent(NS, 'ShipmentInPortEvent');
        shipmentInPortEvent.shipment = shipment;
        var message = '货物未到达目的地 ' + latLong;
        shipmentInPortEvent.message = message;
        console.log(shipmentInPortEvent.message);
        emit(shipmentInPortEvent);
    }

    return getAssetRegistry(NS + '.Shipment')
    .then(function (shipmentRegistry) {
        // add the temp reading to the shipment
        return shipmentRegistry.update(shipment);
    });
}


/**
 * A airAPI reading has been received for a shipment
 * @param { org.foodSupplyChain.food.APIReading} aPIReading - the APIReading transaction
 * @transaction
 */
function aPIReading(aPIReading) {


    var shipment = aPIReading.shipment;
    var NS = 'org.foodSupplyChain.food';
    var contractFandR = shipment.contractFandR;
    var factory = getFactory();

    console.log('添加空气质量读数 ' + aPIReading.unit + ' 到货物 ' + shipment.$identifier);

    if (shipment.aPIReadings) {
        shipment.aPIReadings.push(aPIReading);
    } else {
        shipment.aPIReadings = [aPIReading];
    }

    if (aPIReading.unit > contractFandR.maxAirPollution ) {
        var airReadingEvent = factory.newEvent(NS, 'AirReadingEvent');
        airReadingEvent.shipment = shipment;
        airReadingEvent.airPollution = aPIReading.unit;
        airReadingEvent.message = '发送空气检测事件: ' + shipment.$identifier;
      
        emit(airReadingEvent);
    }

    return getAssetRegistry(NS + '.Shipment')
        .then(function (shipmentRegistry) {
            // add the temp reading to the shipment
            return shipmentRegistry.update(shipment);
        });
}



/**
 * A temperature reading has been received for a shipment
 * @param { org.foodSupplyChain.food.WeightReading} weightReading - the WeightReading transaction
 * @transaction
 */
function weightReading(weightReading) {

    var shipment = weightReading.shipment;
    var NS = 'org.foodSupplyChain.food';
    var contractRandC = shipment.contractRandC;
    var factory = getFactory();
    var payOut;
    console.log('------------------------------------------------------------------------------------');
    console.log('食品' + shipment.$identifier +'在冰箱中的剩余量是：' + weightReading.kg + 'kg');

    if (shipment.weightReadings) {
        shipment.weightReadings.push(weightReading);
    } else {
        shipment.weightReadings = [weightReading];
    }

    if (weightReading.kg < contractRandC.minWeight ) {
        var lackOfFoodEvent = factory.newEvent(NS, 'LackOfFoodEvent');
        lackOfFoodEvent.shipment = shipment;
        lackOfFoodEvent.weight = weightReading.kg;
        lackOfFoodEvent.message = '发送食品剩余事件: ' + shipment.$identifier;
        console.log('食品 ' + shipment.$identifier + '剩余不足');
        console.log('食品购买的时间: ' + weightReading.timestamp);
        payOut = contractRandC.sellingPrice * 10;
        console.log('食品存储已不足');
        console.log('出售价：50元/kg');
        console.log('交易金额: ' + payOut + '元');
        console.log('购买的了5kg肉类')
        contractRandC.restaurant.accountBalance += payOut;
        contractRandC.consumer.accountBalance -= payOut;
    
        console.log('餐厅: ' + contractRandC.restaurant.$identifier + ' 获取的金额: ' + contractRandC.restaurant.accountBalance + '元');
        console.log('消费者: ' + contractRandC.consumer.$identifier + ' 支付的金额: ' + contractRandC.consumer.accountBalance + '元');
        var message = '食品' + shipment.$identifier + '已购买';
        console.log(message);
        emit(lackOfFoodEvent);
    }else{  
        var lackOfFoodEvent = factory.newEvent(NS, 'LackOfFoodEvent');
        lackOfFoodEvent.shipment = shipment;
        lackOfFoodEvent.weight = weightReading.kg;
        lackOfFoodEvent.message = '食品充足，不需购买 ' + shipment.$identifier;
        emit(lackOfFoodEvent);
        console.log('食品存储充足,不需购买');
    }

    return getParticipantRegistry('org.foodSupplyChain.food.Restaurant')
        .then(function (restaurantRegistry) {
            // update the grower's balance
            return restaurantRegistry.update(contractRandC.restaurant);
        })
        .then(function () {
            return getParticipantRegistry('org.foodSupplyChain.food.Consumer');
        })
        .then(function (consumerRegistry) {
            // update the restaurant's balance
            return consumerRegistry.update(contractRandC.consumer);
        })
        .then(function () {
            return getAssetRegistry('org.foodSupplyChain.food.Shipment');
        })
        .then(function (shipmentRegistry) {
            // update the state of the shipment
            return shipmentRegistry.update(shipment);
        });
}