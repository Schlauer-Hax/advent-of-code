package com.hax.adventofcode_2018.day3;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
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
        ArrayList<Claim> claims = new ArrayList<Claim>();
        while (scanner.hasNext()) {
            String id = scanner.next();
            scanner.next();
            String inches = scanner.next();
            String size = scanner.next();
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
                            String field = (claim.getLeftedge()+i)+"x"+(claim.getTopedge()+j);
                            if (hashMap.containsKey(field)) {
                                int value = hashMap.get(field);
                                hashMap.remove(field);
                                hashMap.put(field, value+1);
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
                            String field = (claim.getLeftedge()+i)+"x"+(claim.getTopedge()+j);
                            if (hashMap.containsKey(field) && hashMap.get(field)>0) {
                                ocount++;
                            }
                        }
                    }
                    if (ocount==0) {
                        claim.setOverlapping(false);
                    } else claim.setOverlapping(true);
                }
        );
        // Part 1
        int count = 0;
        for (Map.Entry<String, Integer> entry:hashMap.entrySet()) {
            if (entry.getValue()>=1) count++;
        }
        System.out.println("Overlapping Fields: "+count);
        // Part 2
        claims.forEach(
                claim -> {
                    if (!claim.isOverlapping()) {
                        System.out.println("claim that doesn't overlap: "+claim.getId());
                    }
                }
        );
    }

}
