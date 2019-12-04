package com.hax.adventofcode.nineteen.four;

import java.util.*;

public class App {
    public static void main(String[] args) {
        String input = "108457-562041";
        String[] array = input.split("-");
        ArrayList<Integer> list = new ArrayList<Integer>();
        ArrayList<Integer> partonelist = new ArrayList<Integer>();
        for (int i = Integer.parseInt(array[0]); i >= Integer.parseInt(array[0]) && i <= Integer.parseInt(array[1]); i++) {
            TreeMap<Integer, Integer> map = new TreeMap<>();

            boolean failed = false;
            for (int j = 0; j < String.valueOf(i).length(); j++) {
                if (!failed) {
                    if (j > 0) {
                        if (Integer.parseInt(String.valueOf(String.valueOf(i).charAt(j))) < Integer.parseInt(String.valueOf(String.valueOf(i).charAt(j - 1)))) {
                            failed = true;
                        }
                    }

                    Integer key = Integer.valueOf(String.valueOf(String.valueOf(i).charAt(j)));
                    if (!map.containsKey(key)) {
                        map.put(key, 1);
                    } else {
                        map.put(key, map.get(key) + 1);
                    }
                }
            }
            if (!failed) {
                for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
                    if (entry.getValue() == 2) {
                        if (String.valueOf(i).contains(entry.getKey() + "" + entry.getKey())) {
                            if (!list.contains(i))
                                list.add(i);
                        }
                    }
                    if (entry.getValue()>1) {
                        if (!partonelist.contains(i))
                            partonelist.add(i);
                    }
                }
            }

        }
        System.out.println(partonelist.size());
        System.out.println(list.size());
    }
}