package com.platzerworld.controllers;

import javax.ws.rs.ApplicationPath;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by platzerworld on 27.07.16.
 */
@ApplicationPath("biergarten")
public class BiergartenRessource extends javax.ws.rs.core.Application{
    public Set<Class<?>> getClasses() {
        return new HashSet<Class<?>>(Arrays.asList(BiergartenLocationController.class));
    }
}