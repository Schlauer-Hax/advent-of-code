package com.hax.adventofcode;

import java.util.Arrays;
import java.util.concurrent.CompletableFuture;

public class MessageHandler {

    Client client;
    SolutionRunner solutionRunner;

    public MessageHandler(Client client) {
        this.client = client;
        this.solutionRunner = new SolutionRunner();
    }

    public void handleMessage(String message) {
        String[] messagearray = message.split(":");

        String command = messagearray[1];
        if (command.equals("connected")) {
            client.send("aocclient:java:connected");
        }
        if (command.equals("run")) {
            String runid = messagearray[2];
            String name = messagearray[3];
            String data = messagearray[4];
            System.out.println("Running "+name);
            System.out.println(runid);
            System.out.println(name);
            System.out.println(data);
            CompletableFuture.supplyAsync(() ->
                    solutionRunner.runClass(name, data)).thenAccept((result) -> {
                client.send("aocclient:java:result:"+runid+":"+ Arrays.toString(result));
            });
        }
    }

}
