package com.hax.adventofcode.solutions.S15;

import com.hax.adventofcode.Solution;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class S1504 implements Solution {

    private static final char[] HEX_DIGITS = "0123456789ABCDEF".toCharArray();

    public static String toHex(byte[] data) {
        char[] chars = new char[data.length * 2];
        for (int i = 0; i < data.length; i++) {
            chars[i * 2] = HEX_DIGITS[(data[i] >> 4) & 0xf];
            chars[i * 2 + 1] = HEX_DIGITS[data[i] & 0xf];
        }
        return new String(chars);
    }

    @Override
    public Object firstPart(String key, String[] lines) {
        long i = 0;
        while (true) {
            try {
                String yourString = key + i;
                byte[] bytesOfMessage = yourString.getBytes("UTF-8");

                MessageDigest md = MessageDigest.getInstance("MD5");
                byte[] thedigest = md.digest(bytesOfMessage);
                String hashtext = toHex(thedigest);
                if (hashtext.startsWith("00000")) {
                    return i;
                }
                i++;
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public Object secondPart(String key, String[] lines) {
        long i = 0;
        while (true) {
            try {
                String yourString = key + i;
                byte[] bytesOfMessage = yourString.getBytes("UTF-8");

                MessageDigest md = MessageDigest.getInstance("MD5");
                byte[] thedigest = md.digest(bytesOfMessage);
                String hashtext = toHex(thedigest);
                if (hashtext.startsWith("000000")) {
                    return i;
                }
                i++;
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
    }
}
