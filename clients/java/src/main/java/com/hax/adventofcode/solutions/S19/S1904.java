package com.hax.adventofcode.solutions.S19;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

public class S1904 implements Solution {
    @Override
    public Object[] run(String content) {
        String[] array = content.split("-");
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
                    if (entry.getValue() > 1) {
                        if (!partonelist.contains(i))
                            partonelist.add(i);
                    }
                }
            }

        }
        return new Object[]{partonelist.size(), list.size()};
    }
}
