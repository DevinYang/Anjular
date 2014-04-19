package com.hp.angular.portal.controller;

import java.net.URISyntaxException;
import java.net.URL;

import org.springframework.util.ClassUtils;
import org.springframework.util.ResourceUtils;

/**
 * 
 * This class is used to get the running application classpath
 * 
 * @author heji
 *
 */
public class ClassPathUtils {
	private static URL url = ClassUtils.class.getResource("/");
	
	public static String getClassPath(){
		try {
			return ResourceUtils.toURI(url).getPath().substring(1);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String getRootPathForApplication(){
		String path = getClassPath();
		path = path.substring(0,path.lastIndexOf("/classes"));
		return path.substring(0,path.lastIndexOf("/")+1);
	}
	
}
