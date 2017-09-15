package com.platzerworld.entities.listener;

import java.util.concurrent.TimeUnit;

/**
 * Created by platzerworld on 02.07.16.
 */
public class EntityListenersExample {
    public void createAndUpdateArticleExample() {
        System.out.println("After creation: ");

        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException ex) {
            throw new RuntimeException(ex);
        }
        System.out.println("After flush: ");
    }
}
