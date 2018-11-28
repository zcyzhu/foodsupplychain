
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
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.foodSupplyChain.food.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
function instantiateModelForTesting(setupDemo) {
        console.log('数据信息初始化...');
        console.log('有四个参与者分别是：工厂，物流公司，餐厅，消费者');
        console.log('运输的货物是肉类，数量是1000kg')
        console.log('----------------------------------------------------------------');
        var factory = getFactory();
        var NS = 'org.foodSupplyChain.food';
    
        // create the producer
        var producer = factory.newResource(NS, 'Producer', 'meat_factory');
        var producerAddress = factory.newConcept(NS, 'Address');
        producerAddress.country = 'USA';
        producerAddress.city = 'new_York';
        
        producer.address = producerAddress;
        producer.accountBalance = 0;
    
        // create the restaurant
        var restaurant = factory.newResource(NS, 'Restaurant', 'McDonalds');
        var restaurantAddress = factory.newConcept(NS, 'Address');
        restaurantAddress.country = 'China';
        restaurantAddress.city = 'BeiJing';
        restaurant.address = restaurantAddress;
        restaurant.accountBalance = 0;
    
        // create the shipper
        var shipper = factory.newResource(NS, 'Shipper', 'S.F.Express');
        var shipperAddress = factory.newConcept(NS, 'Address');
        shipperAddress.country = 'China';
        shipper.address = shipperAddress;
        shipper.accountBalance = 0;
    
        // create the consumer
        var consumer = factory.newResource(NS, 'Consumer', '249816272@qq.com');
        var consumerAddress = factory.newConcept(NS, 'Address');
        consumerAddress.country = 'China';
        consumerAddress.city = 'BeiJing';
        consumer.address = consumerAddress;
        consumer.accountBalance = 0;

        // create the Temperature sensor
        var temperatureSensor = factory.newResource(NS, 'TemperatureSensor', 'SENSOR_TEMP001');
        
        // create the GPS sensor
        var gpsSensor = factory.newResource(NS, 'GpsSensor', 'SENSOR_GPS001');
        // create the airSensor
        var airSensor = factory.newResource(NS, 'AirSensor', 'SENSOR_TEMP002');
        
        // create the weightSensor
        var weightSensor = factory.newResource(NS, 'WeightSensor', 'SENSOR_TEMP003');
        
        
        // create the  contractFandS
        var contractFandS = factory.newResource(NS, 'ContractFandS', 'CON_001');
        contractFandS.producer = factory.newRelationship(NS, 'Producer', 'meat_factory');
        contractFandS.shipper = factory.newRelationship(NS, 'Shipper', 'S.F.Express');
        var tomorrow = setupDemo.timestamp;
        tomorrow.setDate(tomorrow.getDate() + 1);
        contractFandS.arrivalDateTime = tomorrow; // the shipment has to arrive tomorrow
        contractFandS.shippingFee = 5; // pay 50 cents per unit
        contractFandS.minTemperature = 2; // min temperature for the cargo
        contractFandS.maxTemperature = 10; // max temperature for the cargo
        contractFandS.minPenaltyFactor = 0.2; // we reduce the price by 20 cents for every degree below the min temp
        contractFandS.maxPenaltyFactor1 = 0.1; // we reduce the price by 10 cents for every degree above the max temp

          
        // create the  contractFandR
        var contractFandR = factory.newResource(NS, 'ContractFandR', 'CON_002');
        contractFandR.producer = factory.newRelationship(NS, 'Producer', 'meat_factory');
        contractFandR.restaurant = factory.newRelationship(NS, 'Restaurant', 'McDonalds');
        contractFandR.unitPrice = 20; // pay 50 cents per unit
        contractFandR.maxAirPollution = 200; // max temperature for the cargo
        contractFandR.maxPenaltyFactor2 = 0.05; // we reduce the price by 10 cents for every degree above the max temp

           
        // create the  contractRandC
        var contractRandC = factory.newResource(NS, 'ContractRandC', 'CON_003');
        contractRandC.consumer = factory.newRelationship(NS, 'Consumer', '249816272@qq.com');
        contractRandC.restaurant = factory.newRelationship(NS, 'Restaurant', 'McDonalds');
        contractRandC.sellingPrice = 25; // pay 50 cents per unit
        contractRandC.minWeight = 2; // max temperature for the cargo
    
        // create the shipment
        var shipment = factory.newResource(NS, 'Shipment', 'SHIP_001');
        shipment.type = 'meat';
        shipment.status = 'produced';
        shipment.unitCount = 1000;
        shipment.contractFandS = factory.newRelationship(NS, 'ContractFandS', 'CON_001');
        shipment.contractFandR = factory.newRelationship(NS, 'ContractFandR', 'CON_002');
        shipment.contractRandC = factory.newRelationship(NS, 'ContractRandC', 'CON_003');
        return getParticipantRegistry(NS + '.Producer')
            .then(function (producerRegistry) {
                // add the growers
                return producerRegistry.addAll([producer]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.Consumer');
            })
            .then(function(consumerRegistry) {
                // add the importers
                return consumerRegistry.addAll([consumer]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.Restaurant');
            })
            .then(function(restaurantRegistry) {
                // add the importers
                return restaurantRegistry.addAll([restaurant]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.Shipper');
            })
            .then(function(shipperRegistry) {
                // add the shippers
                return shipperRegistry.addAll([shipper]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.TemperatureSensor');
            })
            .then(function(temperatureSensorRegistry) {
                // add the temperature sensors
                return temperatureSensorRegistry.addAll([temperatureSensor]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.GpsSensor');
            })
            .then(function(gpsSensorRegistry) {
                // add the GPS sensors
                return gpsSensorRegistry.addAll([gpsSensor]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.AirSensor');
            })
            .then(function(airSensorRegistry) {
                // add the airSensor
                return airSensorRegistry.addAll([airSensor]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.WeightSensor');
            })
            .then(function(weightSensorRegistry) {
                // add the weightSensor
                return weightSensorRegistry.addAll([weightSensor]);
            })
            .then(function() {
                return getAssetRegistry(NS + '.ContractRandC');
            })
            .then(function(contractRandCRegistry) {
                // add the contracts
                return contractRandCRegistry.addAll([contractRandC]);
            })
            .then(function() {
                return getAssetRegistry(NS + '.ContractFandS');
            })
            .then(function(contractFandSRegistry) {
                // add the contracts
                return contractFandSRegistry.addAll([contractFandS]);
            })
            .then(function() {
                return getAssetRegistry(NS + '.ContractFandR');
            })
            .then(function(contractFandRRegistry) {
                // add the contracts
                return contractFandRRegistry.addAll([contractFandR]);
            })
            .then(function() {
                return getAssetRegistry(NS + '.Shipment');
            })
            .then(function(shipmentRegistry) {
                // add the shipments
                return shipmentRegistry.addAll([shipment]);
            });
    }
