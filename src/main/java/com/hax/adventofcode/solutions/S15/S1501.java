package com.hax.adventofcode.solutions.S15;

import com.hax.adventofcode.core.Solution;

public class S1501 implements Solution {

    @Override
    public void firstPart(String data, String[] lines) {
        int floor = 0;
        for (String s : data.split("")) {
            if (s.equals("(")) floor += 1;
            if (s.equals(")")) floor -= 1;
        }
        System.out.println(floor);
    }

    @Override
    public void secondPart(String data, String[] lines) {
        int floor = 0;
        for (int i = 0; i < data.split("").length; i++) {
            String s = data.split("")[i];
            if (s.equals("(")) floor += 1;
            if (s.equals(")")) floor -= 1;
            if (floor == -1) {
                System.out.println(i + 1);
                break;
            }
        }
    }
}
