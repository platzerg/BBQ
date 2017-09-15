package com.platzerworld.entities.listener;

/**
 * Created by platzerworld on 02.07.16.
 */
import java.util.Date;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

public class UpdatedAtListener {

    @PrePersist
    @PreUpdate
    public void setUpdatedAt(final Updatable entity) {
        entity.setUpdatedAt(new Date());
    }

}