package com.hax.adventofcode_2018.day4;

import java.util.List;

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
