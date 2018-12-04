package com.hax.adventofcode_2018.day4;

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
        // Read
        Scanner scanner = new Scanner(new File("input.txt"));
        scanner.useDelimiter("\n");
        ArrayList<String> strings = new ArrayList<String>();
        while (scanner.hasNext()) {
            strings.add(scanner.next());
        }

        // Sort
        Collections.sort(strings);

        HashMap<Integer, Guard> map = new HashMap<>();
        Guard guard = null;
        String lastString = null;
        for (int i = 0; i < strings.size(); i++) {
            String string = strings.get(i);
            if (string.endsWith("begins shift")) {
                int id = Integer.parseInt(string.split(" ")[3].replace("#", ""));
                if (!map.containsKey(id)) {
                    Guard guard1 = new Guard(id, 0, new ArrayList<>());
                    guard = guard1;
                    map.put(id, guard1);
                } else guard = map.get(id);
            } else if (string.endsWith("falls asleep")) {
                lastString = string;
            } else if (string.endsWith("wakes up")) {
                int fallminute = Integer.parseInt(lastString.split(" ")[1].replace("]", "").split(":")[1]);
                int wakeminute = Integer.parseInt(string.split(" ")[1].replace("]", "").split(":")[1]);
                int sum = wakeminute-fallminute;
                guard.setAsleep(guard.getAsleep()+sum);
                guard.getSleeplist().add(new Sleep(fallminute, wakeminute));
            }
        }

        Guard most = null;
        for (Map.Entry<Integer, Guard> entry: map.entrySet()) {
            Guard guard1 = entry.getValue();
            if (most==null) most = guard1;
            if (guard1.getAsleep() > most.getAsleep()) most = guard1;
        }

        System.out.println("most asleep: "+most.getAsleep());

        int mostsleep = 0;
        int mostsleepminute = 0;
        for (int i = 0; i < 60; i++) {
            int sleepminute = 0;
            for (Sleep sleep:most.getSleeplist()) {
                if (String.valueOf(sleep.getSleepString().charAt(i)).equals("#"))  {
                    sleepminute++;
                }
            }
            if (sleepminute>mostsleep) {
                mostsleep = sleepminute;
                mostsleepminute = i;
            }
        }

        System.out.println("ID: "+most.getId());
        System.out.println("Sleepminute: "+mostsleepminute);
        System.out.println("sum: "+most.getId()*mostsleepminute);

        // Part 2
        Guard mostguard = null;
        int minute = 0;
        int mostminute = 0;
        for (int i = 0; i < 60; i++) {
            for (Guard guard1 : map.values()) {
                int testminute = 0;
                for (Sleep sleep : guard1.getSleeplist()) {
                    if (String.valueOf(sleep.getSleepString().charAt(i)).equals("#")) {
                        testminute++;
                    }
                }
                if (testminute>mostminute) {
                    mostminute = testminute;
                    minute = i;
                    mostguard = guard1;
                }
            }
        }

        System.out.println("ID: "+mostguard.getId());
        System.out.println("Minute: "+minute);
        System.out.println("Sum: "+mostguard.getId()*minute);
    }

}
