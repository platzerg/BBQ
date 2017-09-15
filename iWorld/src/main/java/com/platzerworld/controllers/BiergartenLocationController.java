package com.platzerworld.controllers;

import com.platzerworld.entities.Biergarten;
import com.platzerworld.service.BiergartenService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.List;

/**
 * Created by platzerworld on 27.07.16.
 */
@Path("location")
public class BiergartenLocationController {
    @Inject
    private BiergartenService biergartenService;

    @Path("/allsorted")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Biergarten> getAllBiergarten(
            @DefaultValue("1") @QueryParam("from") int from,
            @DefaultValue("2")@QueryParam("to") int to,
            @DefaultValue("name") @QueryParam("orderBy") String orderBy) {
        return biergartenService.getAllBiergarten();
    }

    @GET
    @Path("/query")
    public Response getUsers(@Context UriInfo info) {

        String from = info.getQueryParameters().getFirst("from");
        String to = info.getQueryParameters().getFirst("to");
        List<String> orderBy = info.getQueryParameters().get("orderBy");

        return Response.status(200).entity("query is called, from : " + from + ", to : " + to
                        + ", orderBy" + orderBy.toString()).build();

    }

}
