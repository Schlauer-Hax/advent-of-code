package com.hax.adventofcode.solutions.S18;

import com.hax.adventofcode.Solution;

import java.util.HashMap;

public class S1802 implements Solution {

    @Override
    public Object firstPart(String content, String[] lines) {
        HashMap<String, HashMap<String, Integer>> wordMap = new HashMap<>();
        for (String check : content.split("\n")) {

            HashMap<String, Integer> map = new HashMap<>(); // Letter, frequency
            for (int i = 0; i < check.length(); i++) {
                String letter = String.valueOf(check.charAt(i));
                putelseadd(map, letter);
            }
            wordMap.put(check, map);

        }
        final int[] two = {0};
        final int[] three = {0};
        wordMap.forEach((key, map) -> {
            if (map.containsValue(1)) two[0]++;
            if (map.containsValue(2)) three[0]++;
        });

        return two[0] * three[0];
    }

    public void putelseadd(HashMap<String, Integer> map, String string) {
        if (!map.containsKey(string)) {
            map.put(string, 0);
        } else {
            int i1 = map.get(string);
            map.remove(string);
            map.put(string, i1 + 1);
        }
    }

    @Override
    public Object secondPart(String content, String[] lines) {
        HashMap<String, HashMap<String, Integer>> wordMap = new HashMap<>();
        for (String check : content.split("\n")) {

            HashMap<String, Integer> map = new HashMap<>(); // Letter, frequency
            for (int i = 0; i < check.length(); i++) {
                String letter = String.valueOf(check.charAt(i));
                putelseadd(map, letter);
            }
            wordMap.put(check, map);

        }
        final int[] two = {0};
        final int[] three = {0};
        wordMap.forEach((key, map) -> {
            if (map.containsValue(1)) two[0]++;
            if (map.containsValue(2)) three[0]++;
        });

        for (String word : content.split("\n")) {
            for (String word2 : content.split("\n")) {
                int common = 0;
                for (int i = 0; word.length() > i; i++) {
                    if (String.valueOf(word.charAt(i)).equals(String.valueOf(word2.charAt(i)))) {
                        common++;
                    }
                }
                if (word.length() - common == 1) {
                    StringBuilder output = new StringBuilder();
                    for (int i = 0; word.length() > i; i++) {
                        if (String.valueOf(word.charAt(i)).equals(String.valueOf(word2.charAt(i)))) {
                            output.append(word.charAt(i));
                        }
                    }
                    return output.toString();
                }
            }
        }
        return null;
    }
}
