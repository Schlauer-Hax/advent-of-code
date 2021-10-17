package com.hax.adventofcode;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.net.URI;

public class Client extends WebSocketClient {

    MessageHandler messageHandler;
    URI serverUri;

    public Client(URI serverUri) {
        super(serverUri);
        this.serverUri = serverUri;
        this.messageHandler = new MessageHandler(this);
    }

    @Override
    public void onOpen(ServerHandshake handshakedata) {
        System.out.println("Connected");
    }

    @Override
    public void onMessage(String message) {
        messageHandler.handleMessage(message);
    }

    @Override
    public void onClose(int code, String reason, boolean remote) {
        System.out.println("Closed");
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        new Client(serverUri).connect();
    }

    @Override
    public void onError(Exception ex) {
        ex.printStackTrace();
    }


}