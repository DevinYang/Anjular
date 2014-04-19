package com.hp.angular.portal.service.test;

import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hp.angular.portal.service.CountryService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:application-context.xml","classpath:profile.xml"})
@ActiveProfiles("test")
public class CountryServiceTest {
	
	@Autowired
	private CountryService countryService;
	
	@Test
	public void testGetAllCountries(){
		assertTrue(this.countryService.getAllCountries().size() > 0);
	}
	public static void main(String[] args) {
		EqualTest et1 = new EqualTest();
		et1.setValue(123);
		et1.setName("hello");
		EqualTest et2 = new EqualTest();
		et2.setName("world");
		et2.setValue(3333);
		List<EqualTest> list = new ArrayList<EqualTest>();
		list.add(et1);
		list.add(et2);
		System.out.println(list.size());
		Map<EqualTest, EqualTest> map = new HashMap<EqualTest, EqualTest>();
		map.put(et1, et1);
		map.put(et2, et2);
		System.out.println(map.size());
	}
	
}

class EqualTest{
	private int value;
	private String name;
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + value;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		return true;
	}
	
}
