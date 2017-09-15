package com.platzerworld.controllers;

import com.platzerworld.controllers.BiergartenController;

import javax.ws.rs.ApplicationPath;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by com.platzerworld on 26.03.16.
 */
@ApplicationPath("bbq")
public class BBQRessource extends javax.ws.rs.core.Application{
    public Set<Class<?>> getClasses() {
        return new HashSet<Class<?>>(Arrays.asList(BBQRubsController.class));
    }
}
