package com.platzerworld.entities.listener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.lf5.LogLevel;

import javax.persistence.*;
import java.util.logging.Logger;

/**
 * Created by com.platzerworld on 28.03.16.
 */
public class TraceListener {
    Log log = LogFactory.getLog(TraceListener.class);
    private static final Logger LOGGER = Logger.getLogger(TraceListener.class.getName());

    @PrePersist
    public void prePersist(Object entity)
    {
        doLog("prePersist(" + entity + ")");
    }

    @PostPersist
    public void postPersist(Object entity)
    {
        doLog("postPersist(" + entity + ")");
    }

    @PreRemove
    public void preRemove(Object entity)
    {
        doLog("preRemove(" + entity + ")");
    }

    @PostRemove
    public void postRemove(Object entity)
    {
        doLog("postRemove(" + entity + ")");
    }

    @PreUpdate
    public void preUpdate(Object entity)
    {
        doLog("preUpdate(" + entity + ")");
    }

    @PostUpdate
    public void postUpdate(Object entity)
    {
        doLog("postUpdate(" + entity + ")");
    }

    @PostLoad
    public void postLoad(Object entity)
    {
        doLog("postLoad(" + entity + ")");
    }

    private void doLog(String string)
    {
        if (this.log != null && this.log.isTraceEnabled())
        {
            this.log.trace(string);
        }
        LOGGER.info(string);

    }
}
