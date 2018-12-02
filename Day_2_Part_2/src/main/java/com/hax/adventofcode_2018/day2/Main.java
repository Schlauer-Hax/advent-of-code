package com.hax.adventofcode_2018.day2;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        try {
            new Main().run();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void run() throws FileNotFoundException {
        Scanner scanner = new Scanner(new File("input.txt"));
        ArrayList<String> tests = new ArrayList<String>();
        while (scanner.hasNext()) {
            tests.add(scanner.next());
        }
        ArrayList<String> correct = new ArrayList<String>();
        String last = "";
        for (String line1:tests) {
            for (String line2:tests) {
                if (!line1.equals(line2)) {
                    int count = 0;
                    for (int i = 0; i < line2.length(); i++) {
                        String char1 = String.valueOf(line1.charAt(i));
                        String char2 = String.valueOf(line2.charAt(i));
                        if (!char1.equals(char2)) count++;
                    }
                    if (count == 1) {
                        if (!correct.contains(line1)) {
                            correct.add(line1);
                            correct.add(line2);
                        }
                    }
                }
            }
        }
        String last2 = "";
        String solution = "";
        for (String correctWord:correct) {
            if (last2.equals("")) last2 = correctWord;
            else {
                solution = last2;
                for (int i = 0; i < last2.length()-1; i++) {
                    String char1 = String.valueOf(last2.charAt(i));
                    String char2 = String.valueOf(correctWord.charAt(i));
                    if (!char1.equals(char2)) {
                        solution = solution.replace(char1, "");
                    }
                }
            }
        }
        System.out.println(solution);
        System.out.println(correct);
    }

}
