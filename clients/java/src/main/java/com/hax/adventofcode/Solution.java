package com.hax.adventofcode;

public interface Solution {

    default Object[] run(String content) {
        return new Object[]{"", ""};
    }

    default Object[] run(String[] content) {
        return new Object[]{"", ""};
    }

    default Object firstPart(String data, String[] lines) {
        return "";
    }

    default Object secondPart(String data, String[] lines) {
        return "";
    }

}
