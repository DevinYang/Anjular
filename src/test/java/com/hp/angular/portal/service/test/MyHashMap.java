package com.hp.angular.portal.service.test;

public class MyHashMap<K,V> {

	private int size;
	private Entry<K,V>[] table;
	static final int DEFAULT_INITIAL_CAPACITY = 16;
	
	public MyHashMap() {
		table = new Entry[16];
		size = DEFAULT_INITIAL_CAPACITY;
	}
	
	public void resize(int capacity){
		if(capacity < size)
			return;
		else{
			Entry<K,V>[] newtable = new Entry[capacity];
			transfer(newtable);
		}
	}
	
	private void transfer(Entry<K,V>[] newtable){
		System.arraycopy(table, 0, newtable, 0, size);
		size = newtable.length;
	}
	
	public V put(K key,V value){
		if(key == null){
			table[0] = new Entry<K,V>(key,value);
		}
		int hash = key.hashCode();
		int index = index(hash,size);
		Entry<K,V> e = table[index];
		table[index] = new Entry<K, V>(key, value);
		return e.value;
	}
	
	private int index(int hash,int length){
		return hash & (length-1);
	}
	
	class Entry<K, V> {
		K key;
		V value;
		
		/**
		 * @param key
		 * @param value
		 */
		public Entry(K key, V value) {
			super();
			this.key = key;
			this.value = value;
		}

		public K getKey() {
			return key;
		}

		public void setKey(K key) {
			this.key = key;
		}

		public V getValue() {
			return value;
		}

		public void setValue(V value) {
			this.value = value;
		}

	}
}
