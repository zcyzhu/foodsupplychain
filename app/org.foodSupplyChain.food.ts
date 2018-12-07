import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.foodSupplyChain.food{
   export enum ProductType {
      vegetables,
      meat,
   }
   export enum ShipmentStatus {
      produced,
      IN_TRANSIT,
      ARRIVED,
      sell,
   }
   export enum CompassDirection {
      N,
      S,
      E,
      W,
   }
   export abstract class ShipmentTransaction extends Transaction {
      shipment: Shipment;
   }
   export class APIReading extends ShipmentTransaction {
      unit: number;
   }
   export class TemperatureReading extends ShipmentTransaction {
      centigrade: number;
   }
   export class GpsReading extends ShipmentTransaction {
      readingTime: string;
      readingDate: string;
      latitude: string;
      latitudeDir: CompassDirection;
      longitude: string;
      longitudeDir: CompassDirection;
   }
   export class WeightReading extends ShipmentTransaction {
      kg: number;
   }
   export class ShipmentProducing extends ShipmentTransaction {
      producingDateTime: Date;
   }
   export class ShipmentSelling extends ShipmentTransaction {
      sellingDateTime: Date;
   }
   export class ShipmentReceived extends ShipmentTransaction {
      receivedDateTime: Date;
   }
   export class ShipmentPacked extends ShipmentTransaction {
   }
   export class ShipmentPickup extends ShipmentTransaction {
   }
   export class ShipmentLoaded extends ShipmentTransaction {
   }
   export class Shipment extends Asset {
      shipmentId: string;
      type: ProductType;
      status: ShipmentStatus;
      unitCount: number;
      contractFandS: ContractFandS;
      contractFandR: ContractFandR;
      contractRandC: ContractRandC;
      temperatureReadings: TemperatureReading[];
      gpsReadings: GpsReading[];
      shipmentSelling: ShipmentSelling;
      shipmentPacked: ShipmentPacked;
      shipmentPickup: ShipmentPickup;
      shipmentLoaded: ShipmentLoaded;
      shipmentReceived: ShipmentReceived;
      shipmentProducing: ShipmentProducing;
      aPIReadings: APIReading[];
      weightReadings: WeightReading[];
   }
   export class ContractFandS extends Asset {
      contractFSId: string;
      producer: Producer;
      shipper: Shipper;
      arrivalDateTime: Date;
      shippingFee: number;
      minTemperature: number;
      maxTemperature: number;
      minPenaltyFactor: number;
      maxPenaltyFactor1: number;
   }
   export class ContractFandR extends Asset {
      contractFRId: string;
      producer: Producer;
      restaurant: Restaurant;
      unitPrice: number;
      maxPenaltyFactor2: number;
      maxAirPollution: number;
   }
   export class ContractRandC extends Asset {
      contractRCId: string;
      restaurant: Restaurant;
      consumer: Consumer;
      sellingPrice: number;
      minWeight: number;
   }
   export class Address {
      city: string;
      country: string;
      street: string;
   }
   export abstract class Business extends Participant {
      address: Address;
      name: string;
      accountBalance: number;
   }
   export abstract class People extends Participant {
      address: Address;
      name: string;
      email: string;
      accountBalance: number;
   }
   export class Producer extends Business {
   }
   export class Shipper extends Business {
   }
   export class Consumer extends People {
   }
   export class Restaurant extends Business {
   }
   export abstract class IoTDevice extends Participant {
      deviceId: string;
   }
   export class TemperatureSensor extends IoTDevice {
   }
   export class AirSensor extends IoTDevice {
   }
   export class GpsSensor extends IoTDevice {
   }
   export class WeightSensor extends IoTDevice {
   }
   export class SetupDemo extends Transaction {
   }
   export class AirReadingEvent extends Event {
      message: string;
      airPollution: number;
      shipment: Shipment;
   }
   export class TemperatureThresholdEvent extends Event {
      message: string;
      temperature: number;
      shipment: Shipment;
   }
   export class ShipmentInPortEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class ShipmentPackedEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class ShipmentPickupEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class ShipmentLoadedEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class ShipmentReceivedEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class shipmentSellingEvent extends Event {
      message: string;
      shipment: Shipment;
   }
   export class LackOfFoodEvent extends Event {
      message: string;
      weight: number;
      shipment: Shipment;
   }
// }
