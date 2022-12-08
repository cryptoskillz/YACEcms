DROP TABLE IF EXISTS property;
DROP TABLE IF EXISTS property_token;
DROP TABLE IF EXISTS property_owner;
DROP TABLE IF EXISTS rental_agreement;
DROP TABLE IF EXISTS rental_cost;
DROP TABLE IF EXISTS rental_payment;
DROP TABLE IF EXISTS property_distribution;
DROP TABLE IF EXISTS agent;
DROP TABLE IF EXISTS tenant;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS userAccess;


CREATE TABLE "property" (
	"id"	INTEGER,
	"name"	TEXT,
	"address_1"	TEXT,
	"address_2"	TEXT,
	"address_3"	TEXT,
	"address_4"	TEXT,
	"address_5"	TEXT,
	"address_6"	TEXT,
	"bathrooms" INTEGER,
	"bedrooms" INTEGER,
	"localCurrency" REAL,
	"internationalCurrency" REAL,
	"cryptoCurrency" REAL,
	"imageUrl" TEXT,
	"taxesCost" REAL,
	"suggestedRentalPrice" REAL,
	"internationalCost" REAL,
	"localCost" REAL,
	"currentlyRented" INTEGER,
	"adminId" INTEGER,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "property_token" (
	"id"	INTEGER,
	"name"	TEXT,
	"contractAddress" TEXT,
	"contractSymbol" TEXT,
	"totalSupply" REAL,
	"isDeployed" INTEGER DEFAULT 0,
	"propertyId" INTEGER,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "property_owner" (
	"id"	INTEGER,
	"name" TEXT,
	"address" TEXT,
	"tokenAmount" REAL,
	"propertyId" INTEGER,
	"userId" INTEGER,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "property_distribution" (
	"id"	INTEGER,
	"name"	TEXT,
	"description" TEXT,
	"amount" REAL,
	"datePaid" TEXT,
	"propertyId" INTEGER,
	"propertyOwnerId" INTEGER,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);


CREATE TABLE "rental_agreement" (
	"id"	INTEGER,
	"name"	TEXT,
	"amount" REAL,
	"deposit" REAL, 
	"contract" TEXT,
	"startDate" TEXT,
	"endDate" TEXT,
	"active" INTEGER,
	"propertyId" INTEGER,
	"agentId" INTEGER,
	"tenantId" INTEGER,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "rental_cost" (
	"id"	INTEGER,
	"type"	TEXT,
	"description" TEXT,
	"amount" REAL,
	"datePaid" TEXT,
	"rentalId" INTEGER,
	"propertyId" INTEGER,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "rental_payment" (
	"id"	INTEGER,
	"type"	TEXT,
	"description" TEXT,
	"amount" REAL,
	"datePaid" TEXT,
	"rentalId" INTEGER,
	"propertyId" INTEGER,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);


CREATE TABLE "agent" (
	"id"	INTEGER,
	"name"	TEXT,
	"email" TEXT,
	"url" TEXT,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "tenant" (
	"id"	INTEGER,
	"name"	TEXT,
	"email" TEXT,
	"phone" TEXT,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "user" (
	"id"	INTEGER,
	"name"	TEXT,
	"email" TEXT,
	"phone" TEXT,
	"username" TEXT,
	"password" TEXT,
	"apiSecret" TEXT,
	"confirmed" TEXT DEFAULT 0,
	"isBlocked" INTEGER DEFAULT 0,
	"isAdmin" INTEGER DEFAULT 0,
	"adminId" INTEGER,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "userAccess" (
	"id"	INTEGER,
	"userId"	INTEGER,
	"foreignId" INTEGER,
	"isDeleted" INTEGER DEFAULT 0,
	"createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TEXT,
	"publishedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
	"deletedAt" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);






INSERT INTO "property" ("name",
						"address_1", 
						"address_2",
						"address_3", 
						"address_4", 
						"address_5", 
						"address_6",
						"bathrooms",
						"bedrooms",
						"localCost",
						"taxesCost",
						"adminId") VALUES 
						('DCONDO', 
						'address 1', 
						'address 2', 
						'address 3', 
						'address 4', 
						'address 5', 
						'address 6',
						1,
						2,
						1800000,
						40000,
						1
						);

INSERT INTO "property" ("name",
						"address_1", 
						"address_2",
						"address_3", 
						"address_4", 
						"address_5", 
						"address_6",
						"bathrooms",
						"bedrooms",
						"localCost",
						"taxesCost",
						"adminId") VALUES 
						('DCONDO 2', 
						'address 1', 
						'address 2', 
						'address 3', 
						'address 4', 
						'address 5', 
						'address 6',
						1,
						2,
						1800000,
						40000,
						1
						);



INSERT INTO "property_token" ("name","contractAddress","contractSymbol","totalSupply","propertyId") VALUES ('dcondo001Token','https://shasta.tronscan.org/#/token/1000690','DC1',1800000.00,1);

INSERT INTO "property_owner" ("address","tokenAmount","propertyId","userId") VALUES ('https://shasta.tronscan.org/#/address/TFvzmpCYumneehXj963corUxYi7e2YaWXF',1000000,1,1);
INSERT INTO "property_owner" ("address","tokenAmount","propertyId","userId") VALUES ('https://shasta.tronscan.org/#/address/TFvzmpCYumneehXj963corUxYi7e2YaWXF',800000,1,2);
INSERT INTO "property_owner" ("address","tokenAmount","propertyId","userId") VALUES ('https://shasta.tronscan.org/#/address/TFvzmpCYumneehXj963corUxYi7e2YaWXF',800000,2,2);



INSERT INTO "rental_agreement" ("name","amount","deposit","contract","startDate","endDate","active","agentId","propertyId","tenantId") VALUES ('dcondo1',6700,13400,'','2021-04-04','2022-04-04',0,1,1,1);
INSERT INTO "rental_agreement" ("name","amount","deposit","contract","startDate","endDate","active","agentId","propertyId","tenantId") VALUES ('dcondo2',8000,16000,'','2022-08-01','2023-08-01',1,1,1,1);

INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2021-06-06',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Maintenance','New keycard',200,'2021-06-06',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Maintenance','Service Charge 10%',20,'2021-06-06',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2021-07-05',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Maintenance','A circuit board digital door lock',3000,'2021-07-05',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Maintenance','Tile foolr repair',1000,'2021-07-05',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Service Charge 10%',400,'2021-07-05',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2021-08-05',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Common Area Jul-Sep 2021',4091,'2021-08-05',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Service Charge 5%',205,'2021-08-05',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2021-09-05',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2021-10-05',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2021-11-05',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2021-12-10',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Common Area Oct-Dec 2021',4091,'2021-12-10',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Service Charge 5%',205,'2021-1210',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Misc','The waffles and drinks',985,'2021-12-10',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-01-11',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','New Water heater',3500,'2022-01-11',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Service Charge 10%',350,'2022-01-11',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-02-14',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Common Area Jan - Mar 2022',4091,'2022-02-14',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Service Charge 5%',205,'2022-02-14',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-03-10',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-04-11',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-05-10',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Finders Fee for renew 12 months',3350,'2022-05-10',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Common Area Apr - Jun 2022',4091,'2022-05-10',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Building insurance 2022',335,'2022-05-10',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Lift Mantenance 2022',543,'2022-05-10',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Service Charge 5%',249,'2022-05-10',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-06-13',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-07-08',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-08-08',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Common Area Jul - Sep 2022',500,'2022-08-08',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Service Charge 5%',500,'2022-08-08',1,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Finders Fee',8000,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Immigration',500,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','360 Tour and 1st Year Hosting',1000,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Cleaning Room ',700,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Cleaning Bedsheet',350,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Repairs',1760,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Dining set',395,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Electric Bill Jun - Jul 2022',472,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Water Bill Apr, Jun - Jul 2022',125,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Service Charge 10% ',275,'2022-08-31',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-09-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Quick Cleaning Room',300,'2022-09-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Aircon clean 1 Unit',700,'2022-09-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','New bedsheet set+Delivery to tenant',1781,'2022-09-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Matress protector',480,'2022-09-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Repair shower',450,'2022-09-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Repair shower',1600,'2022-09-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Electric Bill Aug 2022',97,'2022-09-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Service Charge 10% ',441,'2022-09-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Management','Management',500,'2022-10-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Common Area Oct - Dec 2022',3192,'2022-10-20',2,1);
INSERT INTO "rental_cost" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('Service','Service Charge 5%',160,'2022-10-20',2,1);

INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2021-04-02',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2021-05-05',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2021-06-06',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2021-07-05',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2021-08-05',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2021-09-02',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2021-10-05',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2021-11-05',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2021-12-10',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2022-01-11',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2022-02-14',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2022-03-10',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2022-04-11',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2022-06-13',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2022-07-08',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2022-07-08',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',6700,'2022-07-09',1,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',8000,'2022-08-31',2,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',8000,'2022-09-20',2,1);
INSERT INTO "rental_payment" ("type","description","amount","datePaid","rentalId","propertyId") VALUES ('rental payment','rental payment',8000,'2022-10-22',2,1);

INSERT INTO "property_distribution" ("name","description","amount","datePaid","propertyId","propertyOwnerId") VALUES ('cryptoskillz','',10000,'2021-05-05',1,1);

INSERT INTO "agent" ("name","email","url") VALUES ('Perfect Homes','','https://perfecthomes.th');

INSERT INTO "tenant" ("name","email","phone") VALUES ('tenanat 1','tenant1@gmail.com','0123456789');

INSERT INTO "user" ("name","email","phone","username","password","apiSecret","confirmed","isBlocked","isAdmin","isDeleted","adminId") VALUES ('cryptoskillz','cryptoskillz@protonmail.com','123456789','cryptoskillz','test','a7fd098f-79cf-4c37-a527-2c9079a6e6a1',1,0,1,0,0);
INSERT INTO "user" ("name","email","phone","username","password","apiSecret","confirmed","isBlocked","isAdmin","isDeleted","adminId") VALUES ('seller 2','test@test.com','123456789','test','test','a7fd098f-79cf-4c37-a527-2c9079a6e6a1',1,0,0,0,1);

INSERT INTO "userAccess" ("userId","foreignId") VALUES (1,1);
INSERT INTO "userAccess" ("userId","foreignId") VALUES (2,1);