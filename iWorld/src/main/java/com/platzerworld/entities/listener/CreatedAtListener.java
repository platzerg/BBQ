package com.platzerworld.entities.listener;

/**
 * Created by platzerworld on 02.07.16.
 */
import javax.persistence.PrePersist;
import java.util.Date;

public class CreatedAtListener {

    @PrePersist
    public void setCreatedAt(final Creatable entity) {
        entity.setCreatedAt(new Date());
    }

}