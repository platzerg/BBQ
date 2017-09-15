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
    public List<BBQRubDTO> getAllRubGewuerzMischungen() {
        List<BBQRubDTO> allRubs = rubsService.getAllRubs();

        return allRubs;
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

    @Path("/gewuerze/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteGewuerzById(@PathParam("id") int id) {
        this.rubsService.deleteGewuerzById(id);

        JsonObjectBuilder jsonObjBuilder = Json.createObjectBuilder();
        jsonObjBuilder.add( "message", "delete method ok" );
        JsonObject jsonObj = jsonObjBuilder.build();

        return Response.status( Response.Status.ACCEPTED ).entity( jsonObj.toString() ).build();

    }

    @Path("/showbyid/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public BBQRubDTO show(@PathParam("id") int id) {
        return this.rubsService.getBBQRubById(id);
    }

    @Path("/showbyname/{name}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<BBQRubDTO> getBiergartenByName(@PathParam("name") String name) {
        List<BBQRubDTO> result = this.rubsService.loadBBQRubByName(name);

        return result;
    }

    @Path("/reservation/v1")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<BBQRubDTO> getT() {

        return null;
    }



    @Path("/adds")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public List<BBQRubDTO> addRubs(final List<BBQRubDTO> rubDTO) {
        List<BBQRubDTO> newRubs = this.rubsService.addRubs(rubDTO);

        return newRubs;
    }

    @Path("/addgewuerze")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public List<BBQGewuerzDTO> addGewuerze(final List<BBQGewuerzDTO> gewuerze) {
        List<BBQGewuerzDTO> newGwuerze = this.rubsService.addGewuerze(gewuerze);

        return newGwuerze;
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

    @Path("/rub/{id}/gewuerze")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public BBQRubDTO addGewuerzMischungenToRub(@PathParam("id") int id, final List<BBQGewuerzMischungDTO> gewuerzMischungen) {
        BBQRubDTO rubDTO = this.rubsService.addGewurzMischungenToRub(id, gewuerzMischungen);
        return rubDTO;
    }

    @Path("/rub/update")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public BBQRubDTO updateRub(final BBQRubDTO rubDTO) {
        BBQRubDTO updatedRubDTO = this.rubsService.updateRub(rubDTO);
        return updatedRubDTO;
    }

    @Path("/gpl")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public BBQRubDTO addRub() {
        BBQRubDTO rub = new BBQRubDTO();
        rub.setName("Mein Magic Dust rub");
        rub.setBeschreibung("Meine Rub Beschreibung");
        rub.setHerkunft("Klaus grillt");
        rub.setUrl("http://klaus-grillt.de");

        BBQGewuerzMischungDTO gewuerzMischung = new BBQGewuerzMischungDTO();

        BBQGewuerzDTO gewuerz = new BBQGewuerzDTO();
        gewuerz.setBeschreibung("Gewürzbeschreibung");
        gewuerz.setName("Paprika");
        gewuerz.setUrl("https://www.ankerkraut.de/paprika-edelsuess");

        gewuerzMischung.setRub(rub);
        gewuerzMischung.setGewuerz(gewuerz);
        gewuerz.setGewuerzMischung(gewuerzMischung);

        rub.getGewuerzMischung().add(gewuerzMischung);
        BBQRubDTO newRubDTO = this.rubsService.addBBQRub(rub);


        return newRubDTO;
    }

    @Path("/deletebyid/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteById(@PathParam("id") int id) {
        this.rubsService.deleteRubById(id);
        return "@DELETE/delete/" +id +" OK";
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


    @Path("/deletebyname/{name}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteByName(@PathParam("name") String name) {
        this.rubsService.deleteBBQRubsByIdByname(name);
        return "@DELETE/delete/{name} OK";
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String deleteRub(final BBQRubDTO rubDTO) {

        return "@DELETE OK";
    }
}
