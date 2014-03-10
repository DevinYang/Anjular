package com.hp.angular.portal.dao;

import java.util.List;

import com.hp.angular.portal.model.Country;

public interface CountryDao {
	public List<Country> getAllCountries();
	public Country getCountryByCode(String countryCode);
	public void createCountry(Country country);
	public void updateCountry(Country country);
	public void inactivateCountry(Country country);
	public void reactivateCountry(Country country);
}
