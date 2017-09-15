package com.platzerworld.controllers;

import com.platzerworld.entities.Biergarten;
import com.platzerworld.entities.dto.BBQGewuerzDTO;
import com.platzerworld.entities.dto.UserDTO;
import com.platzerworld.service.BiergartenService;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.List;

/**
 * Created by platzerworld on 27.07.16.
 */
@Path("authenticate")
public class AuthController {
    @Inject
    private BiergartenService biergartenService;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticate(final UserDTO user) {

        user.setToken("hehehe");

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        jsonObjBuilder.add( "token", "hehehe" );

        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.OK ).entity( user).build();
    }

}
