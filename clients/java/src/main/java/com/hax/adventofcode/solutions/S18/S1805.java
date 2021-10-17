package com.hax.adventofcode.solutions.S18;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class S1805 implements Solution {

    @Override
    public Object[] run(String content) {
        List<String> letter = strintoList(content);
        int firstpart = react(letter).size();

        HashMap<String, Integer> testedChars = new HashMap<>();
        for (int i = 0; i < content.length(); i++) {
            String toLowerCase = String.valueOf(content.charAt(i)).toLowerCase();
            if (!testedChars.containsKey(toLowerCase)) {
                testedChars.put(String.valueOf(content.charAt(i)), react(strintoList((content.replaceAll(toLowerCase, "")
                        .replaceAll(String.valueOf(content.charAt(i)).toUpperCase(), "")))).size());
            }
        }
        int shortest = content.length();
        for (Integer length : testedChars.values()) {
            if (length < shortest) shortest = length;
        }

        return new Object[]{firstpart, shortest};
    }

    public boolean check_two_chars(String a, String b) {
        return a.toLowerCase().equals(b.toLowerCase()) && !a.equals(b);
    }

    public List<String> react(List<String> letter) {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < letter.size(); i++) {
            if (list.size() > 0 && check_two_chars(letter.get(i), list.get(list.size() - 1))) {
                list.remove(list.size() - 1);
            } else {
                list.add(letter.get(i));
            }
        }
        return list;
    }

    public List<String> strintoList(String string) {
        ArrayList<String> list = new ArrayList<>();
        for (int i = 0; i < string.length(); i++) {
            list.add(String.valueOf(string.charAt(i)));
        }
        return list;
    }
}
