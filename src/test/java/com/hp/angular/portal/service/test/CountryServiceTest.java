package com.hp.angular.portal.service.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

import com.hp.angular.portal.service.CountryService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:application-context.xml"/*,"classpath:profile.xml"*/})
@ActiveProfiles("test")
public class CountryServiceTest {
	
	@Autowired
	private CountryService countryService;
	
	@Test
	public void testGetAllCountries(){
		assertTrue(this.countryService.getAllCountries().size() > 0);
	}
}
