CREATE TABLE CTRY(
	CTRY_CD VARCHAR(20) NOT NULL, 
	CTRY_NM VARCHAR(500) NOT NULL, 
	DTL_IND boolean NOT NULL
);

create unique index ix_country_countryCode on CTRY (CTRY_CD);