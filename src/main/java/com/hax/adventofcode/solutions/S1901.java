package com.hax.adventofcode.solutions;

import com.hax.adventofcode.core.Solution;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class S1901 implements Solution {

    String id = getClass().getSimpleName();
    String filepath = "./data/" + id;

    @Override
    public int run() {
        System.out.println("Reading from " + filepath + ".txt");
        File file = new File(String.format("%s.txt", filepath));
        if (!file.exists()) {
            System.err.println(filepath + ".txt does not exist.");
            return 1;
        }
        try {
            ArrayList<Integer> masses = new ArrayList<>();
            Scanner scanner = new Scanner(file);
            while (scanner.hasNext()) {
                masses.add(scanner.nextInt());
            }

            // First Part
            int sum = 0;
            for (Integer mass : masses) {
                sum = sum + Integer.parseInt(String.valueOf(mass / 3).split(",")[0]) - 2;
            }
            System.out.println("Answer 1: " + sum);

            // Second Half
            int sum2 = 0;
            for (Integer mass : masses) {
                boolean calculatedfuelfrommass = false;
                int neededfuel = 0;
                while (true) {
                    if (!calculatedfuelfrommass) {
                        neededfuel = Integer.parseInt(String.valueOf(mass / 3).split(",")[0]) - 2;
                        calculatedfuelfrommass = true;
                    } else neededfuel = Integer.parseInt(String.valueOf(neededfuel / 3).split(",")[0]) - 2;
                    if (neededfuel <= 0) {
                        break;
                    }
                    sum2 = sum2 + neededfuel;
                }
            }

            System.out.println("Answer 2: " + sum2);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return 0;
    }
}
