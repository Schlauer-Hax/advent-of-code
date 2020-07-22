package com.hax.adventofcode.solutions;

import com.hax.adventofcode.core.Solution;
import com.hax.adventofcode.core.Utils;

import java.util.*;

public class S1804 implements Solution {
    @Override
    public void run() {
        String content = Utils.getFileContent(this);
        List<String> strings = new ArrayList<>(Arrays.asList(content.split("\n")));
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
                int sum = wakeminute - fallminute;
                guard.setAsleep(guard.getAsleep() + sum);
                guard.getSleeplist().add(new Sleep(fallminute, wakeminute));
            }
        }

        Guard most = null;
        for (Map.Entry<Integer, Guard> entry : map.entrySet()) {
            Guard guard1 = entry.getValue();
            if (most == null) most = guard1;
            if (guard1.getAsleep() > most.getAsleep()) most = guard1;
        }

        int mostsleep = 0;
        int mostsleepminute = 0;
        for (int i = 0; i < 60; i++) {
            int sleepminute = 0;
            for (Sleep sleep : most.getSleeplist()) {
                if (String.valueOf(sleep.getSleepString().charAt(i)).equals("#")) {
                    sleepminute++;
                }
            }
            if (sleepminute > mostsleep) {
                mostsleep = sleepminute;
                mostsleepminute = i;
            }
        }
        System.out.println(most.getId() * mostsleepminute);

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
                if (testminute > mostminute) {
                    mostminute = testminute;
                    minute = i;
                    mostguard = guard1;
                }
            }
        }
        System.out.println(mostguard.getId() * minute);
    }

    public class Guard {

        private int id;
        private int asleep;
        private List<Sleep> sleeplist;

        public Guard(int id, int asleep, List<Sleep> sleeplist) {
            this.id = id;
            this.asleep = asleep;
            this.sleeplist = sleeplist;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public int getAsleep() {
            return asleep;
        }

        public void setAsleep(int asleep) {
            this.asleep = asleep;
        }

        public List<Sleep> getSleeplist() {
            return sleeplist;
        }

        public void setSleeplist(List<Sleep> sleeplist) {
            this.sleeplist = sleeplist;
        }
    }

    public class Sleep {

        private final int timeasleep;
        private final int wakeup;
        private String sleepString;

        public Sleep(int timeasleep, int wakeup) {
            this.timeasleep = timeasleep;
            this.wakeup = wakeup;
            sleepString = "";
            for (int i = 0; i < 60; i++) {
                if (i < timeasleep) sleepString += ".";
                else if (i >= timeasleep && i < wakeup) sleepString += "#";
                else if (i >= wakeup) sleepString += ".";
            }
        }

        public String getSleepString() {
            return sleepString;
        }

        public int getTimeasleep() {
            return timeasleep;
        }

        public int getWakeup() {
            return wakeup;
        }
    }
}
