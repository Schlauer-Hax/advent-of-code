package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.Solution;

import java.util.Arrays;

public class S2009 implements Solution {

    @Override
    public Object firstPart(String data, String[] lines) {
        int preamble = 25;
        skip:
        for (int i = 0; i < lines.length; i++) {
            if (i > preamble) {
                for (String p1 : Arrays.asList(lines).subList(i - preamble, i)) {
                    for (String p2 : Arrays.asList(lines).subList(i - preamble, i)) {
                        if (!p2.equals(p1)) {
                            if (Long.parseLong(p1) + Long.parseLong(p2) == Long.parseLong(lines[i])) {
                                continue skip;
                            }
                        }
                    }
                }
                return lines[i];
            }
        }
        return null;
    }
}
