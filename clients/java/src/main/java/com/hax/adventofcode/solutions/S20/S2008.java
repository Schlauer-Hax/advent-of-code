package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.Solution;

import java.util.ArrayList;

public class S2008 implements Solution {

    @Override
    public Object firstPart(String data, String[] lines) {
        int accumulator = 0;
        ArrayList<Integer> executed = new ArrayList<>();
        for (int i = 0; i < lines.length; i++) {
            String[] split = lines[i].split(" ");
            if (!executed.contains(i)) {
                executed.add(i);
                switch (split[0]) {
                    case "acc":
                        accumulator += Integer.parseInt(split[1]);
                        break;

                    case "jmp":
                        i += Integer.parseInt(split[1]) - 1;
                        break;

                    case "nop":

                        break;
                }
            } else {
                return accumulator;
            }
        }
        return null;
    }

    @Override
    public Object secondPart(String data, String[] lines) {
        for (int j = 0; j < lines.length; j++) {
            String[] changedlines = lines.clone();

            if (changedlines[j].startsWith("nop")) changedlines[j] = changedlines[j].replace("nop", "jmp");
            else if (changedlines[j].startsWith("jmp")) changedlines[j] = changedlines[j].replace("jmp", "nop");

            int accumulator = 0;
            boolean looped = false;
            ArrayList<Integer> executed = new ArrayList<>();
            for (int i = 0; i < changedlines.length; i++) {
                String[] split = changedlines[i].split(" ");
                if (!executed.contains(i)) {
                    executed.add(i);
                    switch (split[0]) {
                        case "acc":
                            accumulator += Integer.parseInt(split[1]);
                            break;

                        case "jmp":
                            i += Integer.parseInt(split[1]) - 1;
                            break;

                        case "nop":

                            break;
                    }
                } else {
                    looped = true;
                }
            }

            if (!looped) {
                return accumulator;
            }
        }
        return null;
    }
}
