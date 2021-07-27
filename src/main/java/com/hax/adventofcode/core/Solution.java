package com.hax.adventofcode.core;

public interface Solution {

    default void run() {}
    default void firstPart(String data, String[] lines) {}
    default void secondPart(String data, String[] lines) {
    }

    default void end() {
    }

}
