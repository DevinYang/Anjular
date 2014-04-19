package com.hp.angular.portal.service.test;

public class StringTest {

	public static String value = "I'm good at Java";
	
	public static void reverseString(){
		String[] array = value.split(" ");
		System.out.println(array.length);
		for(int i=0;i<array.length;i++){
			array[i] = reverse(array[i]);
		}
		
		StringBuffer buffer = new StringBuffer();
		for(String str : array){
			buffer.append(str).append(" ");
		}
		System.out.println(buffer.substring(0,buffer.length()-1).toString());
	}
	
	public static String reverse(String string){
		char[] chars = string.toCharArray();
		int length = chars.length-1;
		for(int i=0;i<chars.length/2;i++){
			char c = chars[i];
			chars[i] = chars[length -i];
			chars[length-i] = c;
		}
		System.out.println(String.valueOf(chars));
		return String.valueOf(chars);
	}
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		reverseString();
	}

}
