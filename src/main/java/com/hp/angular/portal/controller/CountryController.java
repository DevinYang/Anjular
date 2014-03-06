package com.hp.angular.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hp.angular.portal.model.Country;
import com.hp.angular.portal.service.CountryService;

@Controller
public class CountryController {
	@Autowired
	private CountryService countryService;

	@RequestMapping(value="/country/countries",method=RequestMethod.GET)
	public @ResponseBody List<Country> listCountries(){
		return this.countryService.getAllCountries();
	}
}
