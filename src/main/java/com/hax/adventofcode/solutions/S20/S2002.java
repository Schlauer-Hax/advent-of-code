package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.core.Solution;
import com.hax.adventofcode.core.Utils;

public class S2002 implements Solution {
    @Override
    public void run() {
        String str = Utils.getFileContent(this);
        String[] arr = str.split("\n");
        firstpart(arr);
        secondpart(arr);

    }

    public void firstpart(String[] arr) {
        int valid = 0;
        for (String line : arr) {
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

    public void secondpart(String[] arr) {
        int valid = 0;
        for (String line : arr) {
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
