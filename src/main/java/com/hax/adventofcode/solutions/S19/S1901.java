package com.hax.adventofcode.solutions.S19;

import com.hax.adventofcode.core.Solution;
import com.hax.adventofcode.core.Utils;

public class S1901 implements Solution {

    @Override
    public void run() {
        String content = Utils.getFileContent(this);

        // First Part
        int sum = 0;
        for (String mass : content.split("\n")) {
            sum = sum + Integer.parseInt(String.valueOf(Integer.parseInt(mass) / 3).split(",")[0]) - 2;
        }
        System.out.println("Answer 1: " + sum);

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

        System.out.println("Answer 2: " + sum2);
    }
}
