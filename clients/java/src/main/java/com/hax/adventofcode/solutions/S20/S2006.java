package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class S2006 implements Solution {

    @Override
    public Object firstPart(String data, String[] lines) {
        String[] groups = data.split("\n\n");
        int count = 0;
        for (String group : groups) {
            ArrayList<String> list = new ArrayList();
            for (String person : group.split("\n")) {
                for (String answer : person.split("")) {
                    if (!list.contains(answer)) list.add(answer);
                }
            }
            count += list.size();
        }
        return count;
    }

    @Override
    public Object secondPart(String data, String[] lines) {
        String[] groups = data.split("\n\n");
        int count = 0;
        for (String group : groups) {
            HashMap<String, Integer> map = new HashMap<>();
            String[] persons = group.split("\n");
            for (String person : persons) {
                for (String answer : person.split("")) {
                    if (!map.containsKey(answer)) {
                        map.put(answer, 1);
                    } else {
                        map.replace(answer, map.get(answer) + 1);
                    }
                }
            }
            for (Map.Entry<String, Integer> entry : map.entrySet()) {
                if (entry.getValue() == persons.length)
                    count++;
            }
        }
        return count;
    }
}
