package com.hax.adventofcode;

import java.util.Arrays;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class MessageHandler {

    Client client;
    SolutionRunner solutionRunner;

    public MessageHandler(Client client) {
        this.client = client;
        this.solutionRunner = new SolutionRunner();
    }

    public void handleMessage(String message) {
        String[] messagearray = message.split(":");
        if (!messagearray[0].equals("aocserver")) return;

        String command = messagearray[1];
        if (command.equals("solutions")) {
            client.send("aocclient:java:solutions:"+String.join(", ", solutionRunner.getSolutionClasses().stream().map(Class::getSimpleName).toArray(String[]::new)));
        }
        if (command.equals("run")) {
            String runid = messagearray[2];
            String name = messagearray[3];
            String data = String.join(":",Arrays.copyOfRange(messagearray, 4, messagearray.length));
            System.out.println("Running solution "+name+" with runid "+runid);
            CompletableFuture.supplyAsync(() -> {
                long start = System.nanoTime();
                String[] result = solutionRunner.runClass(name, data);
                long end = System.nanoTime();
                client.send("aocclient:java:result:"+runid+":"+ (end-start)/1e6 +":"+ Arrays.toString(result));
                return result;
            });
        }
    }

}
