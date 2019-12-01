package com.hax.adventofcode.day1;

import java.io.File;
import java.io.FileNotFoundException;
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
            int sum = 0;
            Scanner scanner = new Scanner(file);
            while (scanner.hasNext()) {
                sum = sum + Integer.parseInt(String.valueOf(scanner.nextInt()/3).split(",")[0])-2;
            }
            System.out.println(sum);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

}
