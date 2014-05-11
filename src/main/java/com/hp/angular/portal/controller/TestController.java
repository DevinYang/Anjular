package com.hp.angular.portal.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test")
public class TestController {
	
	@RequestMapping("/classpath")
	public void test(HttpServletRequest request){
		ClassPathResource resource = new ClassPathResource("db/init-data.sql");
		try {
			System.out.println(TestController.class.getResource("/"));
			System.out.println(request.getRealPath("db/init-data.sql"));
			System.out.println(StringUtils.cleanPath(new File(".").getAbsolutePath()));
			System.out.println(StringUtils.cleanPath(new File("/WEB-INF/view").getAbsolutePath()));
			FileSystemResource fsr = new FileSystemResource("WEB-INF/view");
			System.out.println(fsr.exists());
			System.out.println(StringUtils.cleanPath(new File(".").getName()));
			resource.getFile();
			System.out.println(resource.getURL());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		System.out.println(Integer.class.getResource("/"));
	}
}
