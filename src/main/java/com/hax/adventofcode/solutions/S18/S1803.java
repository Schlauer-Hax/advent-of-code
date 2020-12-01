package com.hax.adventofcode.solutions.S18;

import com.hax.adventofcode.core.Solution;
import com.hax.adventofcode.core.Utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class S1803 implements Solution {

    @Override
    public void run() {
        String content = Utils.getFileContent(this);
        ArrayList<Claim> claims = new ArrayList<Claim>();
        for (String line : content.split("\n")) {
            String[] splitted = line.split(" ");
            String id = splitted[0];
            String inches = splitted[2];
            String size = splitted[3];
            claims.add(new Claim(
                    id.replace("#", ""), inches.split(",")[0],
                    inches.split(",")[1].replace(":", ""), size.split("x")[0], size.split("x")[1]
            ));
        }
        final HashMap<String, Integer> hashMap = new HashMap<String, Integer>();
        claims.forEach(
                claim -> {
                    for (int i = 0; i < claim.getWide(); i++) {
                        for (int j = 0; j < claim.getTall(); j++) {
                            String field = (claim.getLeftedge() + i) + "x" + (claim.getTopedge() + j);
                            if (hashMap.containsKey(field)) {
                                int value = hashMap.get(field);
                                hashMap.remove(field);
                                hashMap.put(field, value + 1);
                            } else {
                                hashMap.put(field, 0);
                            }
                        }
                    }
                }
        );
        claims.forEach(
                claim -> {
                    int ocount = 0;
                    for (int i = 0; i < claim.getWide(); i++) {
                        for (int j = 0; j < claim.getTall(); j++) {
                            String field = (claim.getLeftedge() + i) + "x" + (claim.getTopedge() + j);
                            if (hashMap.containsKey(field) && hashMap.get(field) > 0) {
                                ocount++;
                            }
                        }
                    }
                    claim.setOverlapping(ocount != 0);
                }
        );
        // Part 1
        int count = 0;
        for (Map.Entry<String, Integer> entry : hashMap.entrySet()) {
            if (entry.getValue() >= 1) count++;
        }
        System.out.println("Overlapping Fields: " + count);
        // Part 2
        claims.forEach(
                claim -> {
                    if (!claim.isOverlapping()) {
                        System.out.println("claim that doesn't overlap: " + claim.getId());
                    }
                }
        );
    }

    public class Claim {

        private final int id;
        private final int leftedge;
        private final int topedge;
        private final int wide;
        private final int tall;
        private boolean overlapping;

        public Claim(String id, String leftedge, String topedge, String wide, String tall) {
            this.id = Integer.parseInt(id);
            this.leftedge = Integer.parseInt(leftedge);
            this.topedge = Integer.parseInt(topedge);
            this.wide = Integer.parseInt(wide);
            this.tall = Integer.parseInt(tall);
        }

        public Claim(int id, int leftedge, int topedge, int wide, int tall) {
            this.id = id;
            this.leftedge = leftedge;
            this.topedge = topedge;
            this.wide = wide;
            this.tall = tall;
        }

        public int getId() {
            return id;
        }

        public int getLeftedge() {
            return leftedge;
        }

        public int getTopedge() {
            return topedge;
        }

        public int getWide() {
            return wide;
        }

        public int getTall() {
            return tall;
        }

        public boolean isOverlapping() {
            return overlapping;
        }

        public void setOverlapping(boolean overlapping) {
            this.overlapping = overlapping;
        }
    }
}
