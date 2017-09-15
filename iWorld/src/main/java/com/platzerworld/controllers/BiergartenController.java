package com.platzerworld.controllers;

import com.platzerworld.entities.Biergarten;
import com.platzerworld.service.BiergartenService;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by com.platzerworld on 26.03.16.
 */
@Path("biergarten")
public class BiergartenController {

    @Inject
    private BiergartenService biergartenService;

    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Biergarten>  getAllBiergarten() {
        return biergartenService.getAllBiergarten();
    }

    @Path("/list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Biergarten> list(@QueryParam("first") @DefaultValue("0") int first,
                                 @QueryParam("max") @DefaultValue("20") int max) {
        return null;
    }

    @Path("/showbyid/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Biergarten show(@PathParam("id") int id) {
        return this.biergartenService.getAllBiergartenById(id);
    }

    @Path("/showbyname/{name}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Biergarten> getBiergartenByName(@PathParam("name") String name) {
        return this.biergartenService.loadBiergartenByName(name);
    }

    @Path("/adds")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public List<Biergarten> addsBiergarten(final List<Biergarten> biergarten) {
        this.biergartenService.addBiergarten(biergarten);

        return biergarten;
    }

    @Path("/add")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Biergarten addBiergarten(final Biergarten biergarten) {
        Biergarten newBiergarten = this.biergartenService.addBiergarten(biergarten);

        return newBiergarten;
    }

    @Path("/deletebyid/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteById(@PathParam("id") int id) {
        this.biergartenService.deleteBiergartenById(id);
        return "@DELETE/delete/" +id +" OK";
    }

    @Path("/deletebyname/{name}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteByName(@PathParam("name") String name) {
        this.biergartenService.deleteBiergartenByname(name);
        return "@DELETE/delete/{name} OK";
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteBiergarten(final Biergarten biergarten) {

        return "@DELETE OK";
    }
}
