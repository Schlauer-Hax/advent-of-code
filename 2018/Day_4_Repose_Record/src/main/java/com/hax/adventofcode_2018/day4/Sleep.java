package com.hax.adventofcode_2018.day4;

public class Sleep {

    private int timeasleep;
    private int wakeup;
    private String sleepString;

    public Sleep(int timeasleep, int wakeup) {
        this.timeasleep = timeasleep;
        this.wakeup = wakeup;
        sleepString="";
        for (int i = 0; i < 60; i++) {
            if (i<timeasleep) sleepString+=".";
            else if (i>=timeasleep&&i<wakeup) sleepString+="#";
            else if (i>=wakeup) sleepString+=".";
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
