package com.hax.adventofcode_2018.day2;

import javax.print.attribute.IntegerSyntax;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        try {
            new Main().run();
        } catch (FileNotFoundException e) {
            System.err.println("File not found...");
            System.exit(1);
        }
    }

    public void run() throws FileNotFoundException {
        Scanner scanner = new Scanner(new File("input.txt"));
        HashMap<String, HashMap<String, Integer>> wordMap = new HashMap<String, HashMap<String, Integer>>();
        while (scanner.hasNext()) {
            String check = scanner.next();

            HashMap<String, Integer> map = new HashMap<String, Integer>(); // Letter, frequency
            for (int i = 0; i < check.length(); i++) {
                String letter = String.valueOf(check.charAt(i));
                putelseadd(map, letter);
            }
            wordMap.put(check, map);

        }
        final int[] two = {0};
        final int[] three = {0};
        wordMap.entrySet().forEach(
                entry -> {
                    HashMap<String, Integer> map = entry.getValue();
                    if (map.containsValue(1)) two[0]++;
                    if (map.containsValue(2)) three[0]++;
                }
        );
        System.out.println(two[0]);
        System.out.println(three[0]);
        System.out.println(two[0]*three[0]);
    }

    public Map<String,Integer> putelseadd(HashMap<String, Integer> map, String string) {
        if (!map.containsKey(string)) {
            map.put(string, 0);
        } else {
            int i1 = map.get(string);
            map.remove(string);
            map.put(string, i1+1);
        }
        return map;
    }

}
