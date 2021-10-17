package com.hax.adventofcode.solutions.S15;

import com.hax.adventofcode.Solution;

import java.util.Arrays;

public class S1505 implements Solution {

    @Override
    public Object firstPart(String data, String[] lines) {
        int nice = 0;
        String[] vowels = new String[]{"a", "e", "i", "o", "u"};
        String[] forbiddenstrings = new String[]{"ab", "cd", "pq", "xy"};
        for (String line : lines) {
            int vowelscount = 0;
            String[] letters = line.split("");
            for (String letter : letters) {
                if (Arrays.asList(vowels).contains(letter)) vowelscount++;
            }
            boolean doubled = false;
            for (int i = 1; i < letters.length; i++) {
                if (letters[i].equals(letters[i - 1])) doubled = true;
            }

            boolean xy = true;
            for (String forbiddenstring : forbiddenstrings) {
                if (line.contains(forbiddenstring)) xy = false;
            }

            if (vowelscount >= 3 && doubled && xy) nice++;
        }
        return nice;
    }

}
