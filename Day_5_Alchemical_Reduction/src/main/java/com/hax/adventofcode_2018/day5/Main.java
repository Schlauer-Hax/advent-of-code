package com.hax.adventofcode_2018.day5;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

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
        String string = scanner.next();
        ArrayList<String> letter = (ArrayList<String>) strintoList(string);
        System.out.println(react(letter).size());

        Scanner scanner2 = new Scanner(new File("input.txt"));
        String testit = scanner2.next();
        System.out.println(testit);
        HashMap<String, Integer> testedChars = new HashMap<>();
        for (int i = 0; i < testit.length(); i++) {
            if (!testedChars.containsKey(String.valueOf(testit.charAt(i)).toLowerCase())) {
                testedChars.put(String.valueOf(testit.charAt(i)), react(strintoList((testit.replaceAll(String.valueOf(testit.charAt(i)).toLowerCase(), "")
                                .replaceAll(String.valueOf(testit.charAt(i)).toUpperCase(), "")))).size());
            }
        }
        int shortest = testit.length();
        for (Integer length:testedChars.values()) {
            if (length<shortest) shortest = length;
        }

        System.out.println(shortest);
    }

    public boolean check_two_chars(String a, String b) {
        return a.toLowerCase().equals(b.toLowerCase()) && !a.equals(b);
    }

    public List<String> react(List<String> letter) {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < letter.size(); i++) {
            if (list.size()>0&&check_two_chars(letter.get(i), list.get(list.size()-1))) {
                list.remove(list.size()-1);
            } else {
                list.add(letter.get(i));
            }
        }
        return list;
    }

    public List<String> strintoList(String string) {
        ArrayList<String> list = new ArrayList<>();
        for (int i = 0; i < string.length(); i++) {
            list.add(String.valueOf(string.charAt(i)));
        }
        return list;
    }
}
