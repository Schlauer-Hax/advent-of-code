package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.Solution;

public class S2001 implements Solution {

    @Override
    public Object firstPart(String data, String[] lines) {
        for (String first : lines) {
            for (String second : lines) {
                if (Integer.parseInt(first) + Integer.parseInt(second) == 2020) {
                    return Integer.parseInt(first) * Integer.parseInt(second);
                }
            }
        }
        return null;
    }

    @Override
    public Object secondPart(String data, String[] lines) {
        for (String first : lines) {
            for (String second : lines) {
                for (String third : lines) {
                    if (Integer.parseInt(first) + Integer.parseInt(second) + Integer.parseInt(third) == 2020) {
                        return Integer.parseInt(first) * Integer.parseInt(second) * Integer.parseInt(third);
                    }
                }
            }
        }
        return null;
    }

}
