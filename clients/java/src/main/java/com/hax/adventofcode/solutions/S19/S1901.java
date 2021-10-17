package com.hax.adventofcode.solutions.S19;

import com.hax.adventofcode.Solution;

public class S1901 implements Solution {

    @Override
    public Object[] run(String content) {

        // First Part
        int sum = 0;
        for (String mass : content.split("\n")) {
            sum = sum + Integer.parseInt(String.valueOf(Integer.parseInt(mass) / 3).split(",")[0]) - 2;
        }

        // Second Half
        int sum2 = 0;
        for (String mass : content.split("\n")) {
            boolean calculatedfuelfrommass = false;
            int neededfuel = 0;
            while (true) {
                if (!calculatedfuelfrommass) {
                    neededfuel = Integer.parseInt(String.valueOf(Integer.parseInt(mass) / 3).split(",")[0]) - 2;
                    calculatedfuelfrommass = true;
                } else neededfuel = Integer.parseInt(String.valueOf(neededfuel / 3).split(",")[0]) - 2;
                if (neededfuel <= 0) {
                    break;
                }
                sum2 = sum2 + neededfuel;
            }
        }

        return new Object[]{sum, sum2};
    }
}
