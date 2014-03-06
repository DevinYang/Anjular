package com.hp.angular.portal.service;

import java.util.List;

import com.hp.angular.portal.model.Country;

public interface CountryService {
	public List<Country> getAllCountries();
	public void createCountry(Country country);
	public void updateCountry(Country country);
	public void inactivateCountry(Country country);
}
