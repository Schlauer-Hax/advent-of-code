package com.hax.adventofcode.nineteen.one;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class App {

    public static void main(String[] args) {
        System.out.println("Reading from input.txt file...");
        File file = new File("input.txt");
        if (!file.exists()) {
            System.err.println("input.txt does not exist.");
            System.exit(0);
        }
        try {
            ArrayList<Integer> masses = new ArrayList<>();
            Scanner scanner = new Scanner(file);
            while (scanner.hasNext()) {
                masses.add(scanner.nextInt());
            }

            // First Part
            int sum = 0;
            for (Integer mass: masses) {
                sum = sum + Integer.parseInt(String.valueOf(mass/3).split(",")[0])-2;
            }
            System.out.println(sum);

            // Second Half
            int sum2 = 0;
            for (Integer mass: masses) {
                boolean calculatedfuelfrommass = false;
                int neededfuel = 0;
                while (true) {
                    if (!calculatedfuelfrommass) {
                        neededfuel = Integer.parseInt(String.valueOf(mass / 3).split(",")[0]) - 2;
                        calculatedfuelfrommass = true;
                    } else neededfuel = Integer.parseInt(String.valueOf(neededfuel / 3).split(",")[0]) - 2;
                    if (neededfuel<=0) {
                        break;
                    }
                    sum2 = sum2 + neededfuel;
                }
            }

            System.out.println(sum2);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

}