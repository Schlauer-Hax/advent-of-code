package com.hax.adventofcode;

import java.net.URI;
import java.net.URISyntaxException;
import io.github.cdimascio.dotenv.Dotenv;

public class Main {

    public static void main(String[] args) {
        try {
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
            String url = dotenv.get("WEBSOCKETURL");
            if (url == null) {
                url = "ws://localhost:1337/";
            }
            System.out.println("Connecting to " + url);
            new Client(new URI(url)).connect();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

}
