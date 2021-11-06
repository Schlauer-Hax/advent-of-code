package com.hax.adventofcode;

import java.net.URI;
import java.net.URISyntaxException;

public class Main {

    public static void main(String[] args) {
        try {
            new Client(new URI("ws://localhost:9000/api")).connect();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

}
