package com.platzerworld.controllers;

import com.platzerworld.entities.dto.BBQGewuerzDTO;
import com.platzerworld.entities.dto.BBQGewuerzMischungDTO;
import com.platzerworld.entities.dto.BBQRubDTO;
import com.platzerworld.service.BBQRubsService;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by platzerworld on 09.08.17.
 */
@Path("rubs")
public class BBQRubsController {


    @Inject
    private BBQRubsService rubsService;

    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllRubGewuerzMischungen() {
        List<BBQRubDTO> allRubs = rubsService.getAllRubs();

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();

        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.OK ).entity( allRubs).build();
    }

    @Path("/{id}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateRub(@PathParam("id") int id, final BBQRubDTO rubDTO) {
        BBQRubDTO updatedRubDTO = this.rubsService.updateRub(rubDTO);

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();

        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.OK ).entity( updatedRubDTO).build();
    }


    @Path("/adds")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addRubs(final List<BBQRubDTO> rubDTO) {
        List<BBQRubDTO> newRubs = this.rubsService.addRubs(rubDTO);

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.OK ).entity( newRubs).build();
    }


    @Path("/addgewuerze")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addGewuerze(final List<BBQGewuerzDTO> gewuerze) {
        List<BBQGewuerzDTO> newGwuerze = this.rubsService.addGewuerze(gewuerze);

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.OK ).entity( newGwuerze).build();
    }

    @Path("/gewuerze")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllGewuerze() {
        List<BBQGewuerzDTO> allGewuerze = rubsService.getAllGewuerze();

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();

        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.OK ).entity( allGewuerze).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response show(@PathParam("id") int id) {
        BBQRubDTO rub = this.rubsService.getBBQRubById(id);


        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();

        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.OK ).entity( rub).build();

    }

    @Path("/rub/template")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRubTemplate() {
        BBQRubDTO rubDTO = new BBQRubDTO();

        rubDTO.setId(0);
        rubDTO.setLockVersion(0);
        rubDTO.setCreationDate(new Date());
        rubDTO.setModificationDate(new Date());
        rubDTO.setCreatedUser("");
        rubDTO.setModificationUser("");
        rubDTO.setName("");
        rubDTO.setBeschreibung("");
        rubDTO.setHerkunft("");
        rubDTO.setUrl("");
        rubDTO.setGewuerzMischung(new ArrayList<>());

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();

        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.OK ).entity( rubDTO).build();
    }

    @Path("/gewuerze")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createGewuerz(final BBQGewuerzDTO gewuerzDTO) {
        BBQGewuerzDTO newGwuerze = this.rubsService.addBBQGewuerz(gewuerzDTO);
        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        jsonObjBuilder.add( "message", "post method ok" );

        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.CREATED ).entity( newGwuerze).build();
    }

    @Path("/gewuerze")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateGewuerz(final BBQGewuerzDTO gewuerzDTO) {
        BBQGewuerzDTO newGwuerze = this.rubsService.updateGewuerz(gewuerzDTO);
        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        jsonObjBuilder.add( "message", "put method ok" );

        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.ACCEPTED ).entity( gewuerzDTO ).build();
    }


    @Path("/add")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addRub(final BBQRubDTO rubDTO) {
        BBQRubDTO newRRubDTO = this.rubsService.addBBQRub(rubDTO);

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        jsonObjBuilder.add( "message", "delete method ok" );
        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.OK ).entity(newRRubDTO).build();
    }

    @Path("/rub/{id}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public BBQRubDTO addGewuerzToRub(@PathParam("id") int id, final BBQGewuerzMischungDTO gewuerzMischungDTO) {
        BBQRubDTO rubDTO = this.rubsService.addGewurzMischungToRub(id, gewuerzMischungDTO);
        return rubDTO;
    }

    @Path("/deletebyid/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteGewuerzmischungById(@PathParam("id") int id) {
        this.rubsService.deleteRubById(id);
        return "@DELETE/delete/" +id +" OK";
    }

    @Path("/rub/{id}/rubmix")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public BBQRubDTO addGewuerzMischungenToRub(@PathParam("id") int id, final List<BBQGewuerzMischungDTO> gewuerzMischungen) {
        BBQRubDTO rubDTO = this.rubsService.addGewurzMischungenToRub(id, gewuerzMischungen);
        return rubDTO;
    }

    @Path("/rub/{id}/rubmix")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addGewuerzMischungToRub(@PathParam("id") int id, final BBQGewuerzMischungDTO gewuerzMischung) {
        BBQGewuerzMischungDTO gewuerzMischungDTO = this.rubsService.addGewurzMischung(id, gewuerzMischung);

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        jsonObjBuilder.add( "message", "post method ok" );
        return Response.status( Response.Status.CREATED ).entity( gewuerzMischungDTO).build();
    }

    @Path("/rub/{rubid}/rubmix/{id}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateGewuerzMischung(@PathParam("rubid") int rubid, @PathParam("id") int id, final BBQGewuerzMischungDTO gewuerzMischung) {
        BBQGewuerzMischungDTO gewuerzMischungDTO = this.rubsService.updateGewurzMischung(id, gewuerzMischung);

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        jsonObjBuilder.add( "message", "post method ok" );

        return Response.status( Response.Status.ACCEPTED ).entity( gewuerzMischungDTO ).build();
    }

    @Path("/delete/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteRubById(@PathParam("id") int id) {
        this.rubsService.deleteRubById(id);
        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        jsonObjBuilder.add( "message", "delete method ok" );
        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.ACCEPTED ).entity( jsonObj.toString() ).build();
    }


    @Path("/{rubid}/gewuerzmischungen/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteGewuerzById(@PathParam("rubid") int rubid, @PathParam("id") int id) {
        this.rubsService.deleteGewuerzMischung(rubid, id);

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        jsonObjBuilder.add( "message", "delete method ok" );
        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.ACCEPTED ).entity( jsonObj.toString() ).build();

    }
}



