# foodsupplychain
Hyperledger Composer   supplychain 
1.The food supply chain, the food supply chain application is written using the project composer framework under Hyperledger, hyperledger composer provides the writing of smart contracts and access control related code, and then deploys the program to the Hyperledger Fabric, which is an open source zone. Blockchain platform.

2.The food supply chain consists of four participants: the factory, the restaurant, the logistics company and the consumer. There are three types of smart contracts, the smart contracts for factories and restaurants, we use contractFandR and the contractual contractFandS of factories and logistics companies, and the smart contract contractRandC for consumers and restaurants.

3.We model the entity using the modeling language that comes with the composer framework. The four participants and related IOT devices have GPS sensors, temperature sensors, air quality detection sensors, and object weight detection sensors.

4.The smart contract contractFandS between the factory producer and the logistics company shipper is that when the GPS sensor receives the goods and has reached the destination, the factory and the logistics company will automatically generate the transaction, and the transaction content is completed by the smart contract, wherein the temperature sensor acts on the cargo transportation process. The temperature is tested. When the temperature is not in the range of 0 to 10 degrees, the logistics company will be fined accordingly. Of course, the fine is also automatically completed by the smart contract. The last money the logistics company receives is the transportation fee minus the fine.

5.The smart contract between the factory and the restaurant is that when the restaurant needs factories to produce food, the factory and the restaurant automatically complete a transaction, but when the factory produces food, there will be corresponding sensors to test the production environment, when the detected air quality exceeds Punish the factory at a certain threshold

6.The smart contract between the restaurant and the consumer is triggered when the food stored in the consumer's refrigerator is below a certain threshold, detected by the weight sensor, a transaction occurs at this time, the food is automatically purchased in the restaurant, and the transaction fee is automatically completed.

7.Access control has the following characteristics: (1) The factory does not have the right to view the contents of the smart contract between the consumer and the restaurant. (2) The restaurant does not have the right to view the contents of the smart contract between the factory and the transporter. (3) The transporter has no Right to view the contents of the smart contract between the factory and the restaurant (4) The consumer does not have the right to view the transaction between the factory and the restaurant and between the factory and the transporter.All participants have the right to view the contents of the goods, and related transportation. Process and status

8.The characteristics of the supply chain: (1) have relevant access control to ensure certain privacy (2) food has a global unique ID number, can trace the source, can view the details of the goods in the transportation process, such as: transportation status at each stage, production time, What logistics company is transporting, which factory is processing, the time of transportation to the destination, etc., to ensure that the entire process of cargo transportation and details of consumer transactions can be viewed.

9.Made an app to verify transactions and implement related processes

10.The hyperledger explorer can be used to view the number of blocks generated during the transaction and the hash value of the previous block and the history of the transaction. The project is self-researched by Hyperledger.

11.We use the project caliper under the hyperledger to test the system performance and test the trading performance of the relevant smart contracts. We send 25, 50, 100, 150, 200 transactions at a time to test the system throughput, latency, and Memory usage, CPU occupancy, and disk read parameters
