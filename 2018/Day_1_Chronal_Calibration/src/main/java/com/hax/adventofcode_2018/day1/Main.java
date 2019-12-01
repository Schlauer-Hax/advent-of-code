package com.hax.adventofcode_2018.day1;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        new Main().run();
    }

    public void run() {
        try {
            Scanner scanner = new Scanner(new File("input.txt"));
            int i = 0;
            while (scanner.hasNext()) {
                i=i+scanner.nextInt();
            }
            System.out.println(i);
        } catch (FileNotFoundException e) {
            System.err.println("File not found...");
            System.exit(1);
        }
    }

}
