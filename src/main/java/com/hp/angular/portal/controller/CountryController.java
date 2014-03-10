package com.hp.angular.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hp.angular.portal.model.Country;
import com.hp.angular.portal.model.TemplateResponse;
import com.hp.angular.portal.service.CountryService;

@Controller
public class CountryController {
	@Autowired
	private CountryService countryService;

	@RequestMapping(value="/country/countries",method=RequestMethod.GET)
	public @ResponseBody List<Country> listCountries(){
		return this.countryService.getAllCountries();
	}
	
	@RequestMapping(value="/country/countries/{countryCode}",method=RequestMethod.GET)
	public @ResponseBody Country getCountryByCode(@PathVariable String countryCode){
		return this.countryService.getCountryByCode(countryCode);
	}
	
	@RequestMapping(value="/country/countries",method=RequestMethod.POST)
	public @ResponseBody TemplateResponse<Country> createCountry(Model model, @RequestBody Country country){
		this.countryService.createCountry(country);
		return new TemplateResponse<Country>(country, true, "success");
	}
	
	@RequestMapping(value="/country/countries/{countryCode}",method=RequestMethod.PUT)
	public @ResponseBody TemplateResponse<Country> updateCountry(@PathVariable String countryCode,@RequestBody Country country){
		this.countryService.updateCountry(country);
		return new TemplateResponse<Country>(country, true, "success");
	}
	
	@RequestMapping(value="/country/countries/{countryCode}/inactivation",method=RequestMethod.PUT)
	public @ResponseBody TemplateResponse<Country> inactivateCountry(@PathVariable String countryCode,@RequestBody Country country){
		this.countryService.inactivateCountry(country);
		return new TemplateResponse<Country>(country, true, "success");
	}
	
	@RequestMapping(value="/country/countries/{countryCode}/reactivation",method=RequestMethod.PUT)
	public @ResponseBody TemplateResponse<Country> reactivateCountry(@PathVariable String countryCode,@RequestBody Country country){
		this.countryService.reactivateCountry(country);
		return new TemplateResponse<Country>(country, true, "success");
	}
	
}
