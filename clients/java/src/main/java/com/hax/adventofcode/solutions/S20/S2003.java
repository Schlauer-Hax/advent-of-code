package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.Solution;

public class S2003 implements Solution {

    public int domagic(String[] lines, int skip, int skip2, boolean debug) {
        int stepright = 0;
        int trees = 0;
        for (int i = 0; i < lines.length; i += skip2) {
            String line = lines[i];
            if (line.length() <= stepright) stepright -= line.length();
            if (line.split("")[stepright].equals("#")) trees++;
            if (debug)
                System.out.println(replaceChar(line, (line.split("")[stepright].equals("#")) ? "X" : "O", stepright));
            stepright += skip;
        }
        return trees;
    }

    @Override
    public Object firstPart(String data, String[] lines) {
        return domagic(lines, 3, 1, false);
    }

    @Override
    public Object secondPart(String data, String[] lines) {
        long sum = 1;
        for (int skip : new int[]{1, 3, 5, 7}) {
            int trees = domagic(lines, skip, 1, false);
            sum *= trees;
        }
        int trees = domagic(lines, 1, 2, false);
        sum *= trees;
        return sum;
    }

    public String replaceChar(String str, String ch, int index) {
        return str.substring(0, index) + ch + str.substring(index + 1);
    }
}
