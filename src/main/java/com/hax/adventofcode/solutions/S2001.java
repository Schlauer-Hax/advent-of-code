package com.hax.adventofcode.solutions;

import com.hax.adventofcode.core.Solution;
import com.hax.adventofcode.core.Utils;

public class S2001 implements Solution {

    @Override
    public void run() {
        String str = Utils.getFileContent(this);
        String[] arr = str.split("\n");

        solvefirst(arr);
        solvesecond(arr);
    }

    public void solvefirst(String[] arr) {
        for (String first : arr) {
            for (String second : arr) {
                if (Integer.parseInt(first) + Integer.parseInt(second) == 2020) {
                    System.out.println("Numbers: " + first + " + " + second);
                    System.out.println("Answer: " + Integer.parseInt(first) * Integer.parseInt(second));
                    return;
                }
            }
        }
    }

    public void solvesecond(String[] arr) {
        for (String first : arr) {
            for (String second : arr) {
                for (String third : arr) {
                    if (Integer.parseInt(first) + Integer.parseInt(second) + Integer.parseInt(third) == 2020) {
                        System.out.println("Numbers: " + first + " + " + second+ " + "+ third);
                        System.out.println("Answer: " + Integer.parseInt(first) * Integer.parseInt(second) * Integer.parseInt(third));
                        return;
                    }
                }
            }
        }
    }

}
