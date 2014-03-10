package com.hp.angular.portal.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.hp.angular.portal.dao.CountryDao;
import com.hp.angular.portal.model.Country;
import com.hp.angular.portal.service.CountryService;

@Service("countryService")
@Transactional(propagation=Propagation.REQUIRED,isolation=Isolation.DEFAULT)
public class CountryServiceImpl implements CountryService {

	@Autowired
	private CountryDao countryDao;
	
	@Transactional(propagation=Propagation.NOT_SUPPORTED,readOnly=true)
	public List<Country> getAllCountries() {
		return countryDao.getAllCountries();
	}

	public void createCountry(Country country) {
		countryDao.createCountry(country);
	}

	public void updateCountry(Country country) {
		countryDao.updateCountry(country);
	}

	public void inactivateCountry(Country country) {
		countryDao.inactivateCountry(country);
	}

	public Country getCountryByCode(String countryCode) {
		return countryDao.getCountryByCode(countryCode);
	}

	public void reactivateCountry(Country country) {
		
	}

}
