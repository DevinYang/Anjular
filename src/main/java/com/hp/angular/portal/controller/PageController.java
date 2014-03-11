package com.hp.angular.portal.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("Page")
public class PageController {

	static List<Person> persons = new ArrayList<Person>();
	static{
		initData();
	}
	
	@RequestMapping(value="/page",method = RequestMethod.GET)
	public @ResponseBody
	DataTable test(Model model,@RequestParam int iDisplayStart,
            @RequestParam int iDisplayLength, @RequestParam int sEcho) {
		System.out.println("page...");
		System.out.println("start at : ---"+iDisplayStart);
		System.out.println("length : ---"+iDisplayLength);
		System.out.println("echo num : ---"+sEcho);
		int start = (iDisplayStart/iDisplayLength)*iDisplayLength;
		int end = (iDisplayStart/iDisplayLength + 1)*iDisplayLength >= persons.size() ? persons.size() : (iDisplayStart/iDisplayLength + 1)*iDisplayLength;
		List<Person> list = persons.subList(start,end);
		DataTable dataTable = new DataTable();
		dataTable.setsEcho(sEcho+"");
		dataTable.setiTotalRecords(persons.size() + "");
		dataTable.setiTotalDisplayRecords(persons.size() + "");
		dataTable.setAaData(list);
		return dataTable;
	}
	
	private static void initData(){
		String[] data = {
				"Elton Baldwin|Data Coordinator|Edinburgh|64|2012/04/09|$6,730",
				"Gavin Joyce|Developer|Edinburgh|42|2010/12/22|$4,525",
				"Jonas Alexander|Developer|San Francisco|30|2010/07/14|$5,300",
				"Suki Burks|Developer|London|53|2009/10/22|$2,875",
				"Thor Walton|Developer|New York|61|2013/08/11|$3,600",
				"Garrett Winters|Director|Edinburgh|63|2011/07/25|$5,300",
				"Hermione Butler|Director|London|47|2011/03/21|$4,080",
				"Jackson Bradshaw|Director|New York|65|2008/09/26|$5,000",
				"Russell Chavez|Director|Edinburgh|20|2011/08/14|$3,300",
				"Hope Fuentes|Financial Controller|San Francisco|41|2010/02/12|$4,200",
				"Howard Hatfield|Financial Controller|San Francisco|51|2008/12/16|$4,080",
				"Jenette Caldwell|Financial Controller|New York|30|2011/09/03|$4,965",
				"Jenna Elliott|Financial Controller|Edinburgh|33|2008/11/28|$5,300",
				"Elton Baldwin|Financial Controller|Edinburgh|22|2013/03/03|$4,200",
				"Quinn Flynn|Financial Controller|London|37|2008/12/11|$4,200",
				"Brielle Williamson|Integration Specialist|New York|61|2012/12/02|$4,525",
				"Martena Mccray|Integration Specialist|Edinburgh|46|2011/03/09|$4,080",
				"Michelle House|Integration Specialist|Edinburgh|37|2011/06/02|$3,750",
				"Rhona Davidson|Integration Specialist|Edinburgh|55|2010/10/14|$6,730",
				"Cedric Kelly|Javascript Developer|Edinburgh|22|2012/03/29|$3,600",
				"Colleen Hurst|Javascript Developer|San Francisco|39|2009/09/15|$5,000",
				"Charde Marshall|Regional Director|San Francisco|36|2008/10/16|$5,300",
				"Shad Decker|Regional Director|San Edinburgh|37|2005/12/16|$7,360",
				"Cara Stevens|Sales Assistant|New York|46|2011/12/06|$4,800",
				"Doris Wilder|Sales Assistant|Edinburgh|23|2010/09/20|$4,965",
				"Haley Kennedy|SeniorMarketing|Designer|London|43|2012/12/18|$4,800",
				"Zenaida Frank|Software Engineer|New York|63|2010/01/04|$4,800",
				"Donna Snider|System Architect|New York|27|2011/01/25|$3,120",
				"Gloria Little|Systems Administrator|New York|59|2009/04/10|$3,120",
				"Lael Greer|Systems Administrator|London|21|2009/02/27|$3,120",
				"Ashton Cox|Technical Author|San Francisco|66|2009/01/12|$4,800",
				"Gavin Cortez|Technical Author|San Francisco|22|2008/10/26|$6,730"
				};
		for(String str : data){
			String[] temp = str.split("\\|");
			Person p = new Person();
			p.setName(temp[0]);
			p.setPosition(temp[1]);
			p.setOffice(temp[2]);
			p.setAge(temp[3]);
			p.setStartDate(temp[4]);
			p.setSalary(temp[5]);
			persons.add(p);
		}
	}
	
	class DataTable {
		private String sEcho;
		private String iTotalRecords;
		private String iTotalDisplayRecords;
		private List<Person> aaData;

		public String getsEcho() {
			return sEcho;
		}

		public void setsEcho(String sEcho) {
			this.sEcho = sEcho;
		}

		public String getiTotalRecords() {
			return iTotalRecords;
		}

		public void setiTotalRecords(String iTotalRecords) {
			this.iTotalRecords = iTotalRecords;
		}

		public String getiTotalDisplayRecords() {
			return iTotalDisplayRecords;
		}

		public void setiTotalDisplayRecords(String iTotalDisplayRecords) {
			this.iTotalDisplayRecords = iTotalDisplayRecords;
		}

		public List<Person> getAaData() {
			return aaData;
		}

		public void setAaData(List<Person> aaData) {
			this.aaData = aaData;
		}
	}
}

class Person {
	private String name;
	private String position;
	private String office;
	private String age;
	private String startDate;
	private String salary;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getOffice() {
		return office;
	}

	public void setOffice(String office) {
		this.office = office;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}
}
