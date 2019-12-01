package com.hax.adventofcode_2018.day3;

public class Claim {

    private int id;
    private int leftedge;
    private int topedge;
    private int wide;
    private int tall;
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
