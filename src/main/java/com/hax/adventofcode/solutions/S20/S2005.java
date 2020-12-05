package com.hax.adventofcode.solutions.S20;

import com.hax.adventofcode.core.Solution;

import java.util.ArrayList;
import java.util.Collections;

public class S2005 implements Solution {

    @Override
    public void firstPart(String data, String[] lines) {
        int highestseatid = 0;
        for (String line : lines) {
            int rowlow = 0;
            int rowhigh = 128;
            int columnlow = 0;
            int columnhigh = 8;
            for (String letter : line.split("")) {
                switch (letter) {
                    case "F":
                        rowhigh -= (rowhigh - rowlow) / 2;
                        break;
                    case "B":
                        rowlow += (rowhigh - rowlow) / 2;
                        break;
                    case "R":
                        columnlow += (columnhigh - columnlow) / 2;
                        break;
                    case "L":
                        columnhigh -= (columnhigh - columnlow) / 2;
                        break;
                }
            }
            int seatid = (rowlow * 8 + columnlow);
            if (seatid > highestseatid) highestseatid = seatid;
        }
        System.out.println(highestseatid);
    }

    @Override
    public void secondPart(String data, String[] lines) {
        ArrayList<Integer> idlist = new ArrayList<>();
        for (String line : lines) {
            int rowlow = 0;
            int rowhigh = 128;
            int columnlow = 0;
            int columnhigh = 8;
            for (String letter : line.split("")) {
                switch (letter) {
                    case "F":
                        rowhigh -= (rowhigh - rowlow) / 2;
                        break;
                    case "B":
                        rowlow += (rowhigh - rowlow) / 2;
                        break;
                    case "R":
                        columnlow += (columnhigh - columnlow) / 2;
                        break;
                    case "L":
                        columnhigh -= (columnhigh - columnlow) / 2;
                        break;
                }
            }
            idlist.add(rowlow * 8 + columnlow);
        }
        Collections.sort(idlist);
        for (int i = 0; i <= idlist.get(idlist.size() - 1); i++) {
            if (!idlist.contains(i)) {
                if (idlist.contains(i + 1) && idlist.contains(i - 1)) {
                    System.out.println(i);
                }
            }
        }
    }
}
