package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.core.Solution;
import com.hax.adventofcode.core.Utils;

public class S2002 implements Solution {

    @Override
    public void firstPart(String data, String[] lines) {
        int valid = 0;
        for (String line : lines) {
            String[] split = line.split(" ");
            String letter = split[1].replace(":", "");
            String[] minmax = split[0].split("-");
            int min = Integer.parseInt(minmax[0]);
            int max = Integer.parseInt(minmax[1]);

            int count = 0;
            for (String checkletter : split[2].split("")) {
                if (checkletter.equals(letter)) count++;
            }

            if (count >= min && count <= max) valid++;
        }
        System.out.println(valid);
    }

    @Override
    public void secondPart(String data, String[] lines) {
        int valid = 0;
        for (String line : lines) {
            String[] split = line.split(" ");
            String letter = split[1].replace(":", "");
            String[] positions = split[0].split("-");
            int firstpos = Integer.parseInt(positions[0])-1;
            int secondpos = Integer.parseInt(positions[1])-1;

            String[] chars = split[2].split("");
            if ((chars[firstpos].equals(letter) &&
                    !chars[secondpos].equals(letter)) ||
                    (!chars[firstpos].equals(letter) &&
                            chars[secondpos].equals(letter))) valid++;
        }
        System.out.println(valid);
    }
}
