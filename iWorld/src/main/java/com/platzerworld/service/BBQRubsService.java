package com.platzerworld.service;


import com.platzerworld.dao.BBQDAO;
import com.platzerworld.entities.*;
import com.platzerworld.entities.dto.*;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class BBQRubsService {
    @EJB
    private BBQDAO bbqDAO;

    @PersistenceContext(unitName = "iWorld")
    private EntityManager entityManager;

    public List<BBQRubDTO> getAllRubs() {
        List<BBQRubDTO> allRubDTO = new ArrayList<>();
        entityManager.flush();

        List<BBQRub> allRubs = entityManager.createNamedQuery(BBQRub.FIND_ALL, BBQRub.class).getResultList();

        for (BBQRub rub : allRubs) {
            allRubDTO.add(this.convertToBBQRubDTO(rub));
        }

        return allRubDTO;
    }

    public List<BBQGewuerzDTO> getAllGewuerze() {
        List<BBQGewuerzDTO> allGewuerzDTO = new ArrayList<>();
        entityManager.flush();

        List<BBQGewuerz> allGewuerze = entityManager.createNamedQuery(BBQGewuerz.FIND_ALL, BBQGewuerz.class).getResultList();

        for (BBQGewuerz gewuerz : allGewuerze) {
            allGewuerzDTO.add(this.convertToBBQGewuerzDTO(gewuerz));
        }

        return allGewuerzDTO;
    }

    public BBQGewuerzDTO updateGewuerz(BBQGewuerzDTO gewuerzDTO) {
        BBQGewuerz updatedGewuerz = this.convertToBBQGewuerz(gewuerzDTO);

        BBQGewuerz newUpdatedGewuerz = bbqDAO.updateBBQGewuerz(updatedGewuerz);

        BBQGewuerzDTO newRubDTO = this.convertToBBQGewuerzDTO(newUpdatedGewuerz);

        return newRubDTO;
    }

    public void deleteGewuerzById(int id) {
        bbqDAO.deleteGewuerz(id);
    }

    public BBQRubDTO getBBQRubById(int id) {
        BBQRub rub = bbqDAO.find(BBQRub.class, id);

        return this.convertToBBQRubDTO(rub);
    }

    public List<BBQRubDTO> loadBBQRubByName(String name) {
        List<BBQRubDTO> result = new ArrayList<>();
        List<BBQRub> rubs = bbqDAO.loadBBQRubsByName(name);

        for (BBQRub bbqRub : rubs) {
            result.add(this.convertToBBQRubDTO(bbqRub));
        }

        return result;
    }

    public void deleteBBQRubsByIdByname(String name) {

        List<BBQRub> rubList = bbqDAO.loadBBQRubsByName(name);
        for (BBQRub rub : rubList) {
            bbqDAO.delete(rub.getId());
        }
    }

    public void deleteRubById(int id) {
        bbqDAO.deleteGewuerz(id);
    }

    public BBQRubDTO addGewurzMischungenToRub(int rubId, List<BBQGewuerzMischungDTO> gewuerzMischungen) {
        List<BBQGewuerzMischung> gewuerzMischungenList = new ArrayList<>();

        for (BBQGewuerzMischungDTO gewuerzMischungenDTO : gewuerzMischungen) {
            BBQGewuerzMischung gewuerz = this.convertToGewuerzMischung(gewuerzMischungenDTO);
            gewuerzMischungenList.add(gewuerz);
        }

        BBQRub updatedRub = bbqDAO.updateBBQRub(rubId, gewuerzMischungenList);

        BBQRubDTO newRubDTO = this.convertToBBQRubDTO(updatedRub);

        return newRubDTO;
    }

    public BBQRubDTO addGewurzMischungToRub(int rubId, BBQGewuerzMischungDTO gewuerzDTO) {
        BBQRubDTO rub = this.getBBQRubById(rubId);

        BBQGewuerzMischung newGewuerzMischung = this.convertToGewuerzMischung(gewuerzDTO);

        BBQRub updatedRub = bbqDAO.updateBBQRub(rubId, newGewuerzMischung);

        BBQRubDTO newRubDTO = this.convertToBBQRubDTO(updatedRub);

        return newRubDTO;
    }

    public BBQRubDTO updateRub(BBQRubDTO rubDTO) {
        BBQRub updatedRub = this.convertToBBQRub(rubDTO);

        BBQRub rub = bbqDAO.updateBBQRub(updatedRub);

        BBQRubDTO newRubDTO = this.convertToBBQRubDTO(rub);

        return newRubDTO;
    }


    public List<BBQRubDTO> addRubs(final List<BBQRubDTO> rubsDTO) {
        List<BBQRubDTO> newRubs= new ArrayList<>();

        for (BBQRubDTO rubDTO : rubsDTO) {
            BBQRubDTO newRubDTO = this.addBBQRub(rubDTO);
            newRubs.add(newRubDTO);
        }

        return newRubs;
    }

    public List<BBQGewuerzDTO> addGewuerze(final List<BBQGewuerzDTO> gewuerzeDTO) {
        List<BBQGewuerzDTO> newGewuerze = new ArrayList<>();

        for (BBQGewuerzDTO gewuerzDTO : gewuerzeDTO) {
            BBQGewuerzDTO newBBQGewuerzDTO = this.addBBQGewuerz(gewuerzDTO);
            newGewuerze.add(newBBQGewuerzDTO);
        }

        return newGewuerze;
    }

    public BBQRubDTO addBBQRub(final BBQRubDTO bbqRubDTO) {
        BBQRub newRub = this.convertToBBQRub(bbqRubDTO);

        BBQRub rub = bbqDAO.create(newRub);

        BBQRubDTO newRubDTO = this.convertToBBQRubDTO(rub);
        return newRubDTO;
    }

    public BBQGewuerzDTO addBBQGewuerz(final BBQGewuerzDTO gewuerzDTO) {
        BBQGewuerz newGewuerz = this.convertToBBQGewuerz(gewuerzDTO);

        BBQGewuerz gewuerz = bbqDAO.create(newGewuerz);

        BBQGewuerzDTO newGewuerzDTO = this.convertToBBQGewuerzDTO(gewuerz);
        return newGewuerzDTO;
    }

    private BBQGewuerzMischung convertToGewuerzMischung(BBQGewuerzMischungDTO gewuerzMischungDTO) {
        BBQGewuerzMischung gewuerzMischung = new BBQGewuerzMischung();
        //gewuerzMischung.setId(gewuerzMischungDTO.getId());
        gewuerzMischung.setCreatedUser(gewuerzMischungDTO.getCreatedUser());
        gewuerzMischung.setCreationDate(gewuerzMischungDTO.getCreationDate());
        gewuerzMischung.setModificationUser(gewuerzMischungDTO.getModificationUser());
        gewuerzMischung.setModificationDate(gewuerzMischungDTO.getModificationDate());
        gewuerzMischung.setLockVersion(gewuerzMischungDTO.getLockVersion());

        gewuerzMischung.setMenge(gewuerzMischungDTO.getMenge());
        gewuerzMischung.setMengeneinheit(gewuerzMischungDTO.getMengeneinheit());

        BBQGewuerzDTO gewuerzDTO = gewuerzMischungDTO.getGewuerz();

        BBQGewuerz gewuerz = new BBQGewuerz();
        //gewuerz.setId(gewuerzDTO.getId());
        gewuerz.setCreatedUser(gewuerzDTO.getCreatedUser());
        gewuerz.setCreationDate(gewuerzDTO.getCreationDate());
        gewuerz.setModificationUser(gewuerzDTO.getModificationUser());
        gewuerz.setModificationDate(gewuerzDTO.getModificationDate());
        gewuerz.setLockVersion(gewuerzDTO.getLockVersion());

        gewuerz.setName(gewuerzDTO.getName());
        gewuerz.setArt(gewuerzDTO.getArt());
        gewuerz.setBeschreibung(gewuerzDTO.getBeschreibung());
        gewuerz.setUrl(gewuerzDTO.getUrl());

        gewuerzMischung.setGewuerz(gewuerz);

        return gewuerzMischung;
    }
    private BBQGewuerz convertToBBQGewuerz(BBQGewuerzDTO gewuerzDTO) {
        BBQGewuerz gewuerz = new BBQGewuerz();
        //gewuerz.setId(gewuerzDTO.getId());
        gewuerz.setCreatedUser(gewuerzDTO.getCreatedUser());
        gewuerz.setCreationDate(gewuerzDTO.getCreationDate());
        gewuerz.setModificationUser(gewuerzDTO.getModificationUser());
        gewuerz.setModificationDate(gewuerzDTO.getModificationDate());
        gewuerz.setLockVersion(gewuerzDTO.getLockVersion());

        gewuerz.setName(gewuerzDTO.getName());
        gewuerz.setArt(gewuerzDTO.getArt());
        gewuerz.setBeschreibung(gewuerzDTO.getBeschreibung());
        gewuerz.setUrl(gewuerzDTO.getUrl());

        return gewuerz;
    }

    private BBQGewuerzDTO convertToBBQGewuerzDTO(BBQGewuerz gewuerz) {
        BBQGewuerzDTO gewuerzDTO = new BBQGewuerzDTO();
        gewuerzDTO.setId(gewuerz.getId());
        gewuerzDTO.setCreatedUser(gewuerz.getCreatedUser());
        gewuerzDTO.setCreationDate(gewuerz.getCreationDate());
        gewuerzDTO.setModificationUser(gewuerz.getModificationUser());
        gewuerzDTO.setModificationDate(gewuerz.getModificationDate());
        gewuerzDTO.setLockVersion(gewuerz.getLockVersion());

        gewuerzDTO.setName(gewuerz.getName());
        gewuerzDTO.setArt(gewuerz.getArt());
        gewuerzDTO.setBeschreibung(gewuerz.getBeschreibung());
        gewuerzDTO.setUrl(gewuerz.getUrl());

        return gewuerzDTO;
    }

    private BBQRub convertToBBQRub(BBQRubDTO bbqRubDTO) {
        BBQRub rub = new BBQRub();

        //rub.setId(bbqRubDTO.getId());
        rub.setCreatedUser(bbqRubDTO.getCreatedUser());
        rub.setCreationDate(bbqRubDTO.getCreationDate());
        rub.setModificationUser(bbqRubDTO.getModificationUser());
        rub.setModificationDate(bbqRubDTO.getModificationDate());
        rub.setLockVersion(bbqRubDTO.getLockVersion());

        rub.setName(bbqRubDTO.getName());
        rub.setBeschreibung(bbqRubDTO.getBeschreibung());
        rub.setHerkunft(bbqRubDTO.getHerkunft());
        rub.setUrl(bbqRubDTO.getUrl());

        for (BBQGewuerzMischungDTO gewuerzMischungDTO : bbqRubDTO.getGewuerzMischung()) {
            BBQGewuerzMischung gewuerzMischung = new BBQGewuerzMischung();
            BBQGewuerz gewuerz = new BBQGewuerz();

            //gewuerzMischung.setId(gewuerzMischungDTO.getId());
            gewuerzMischung.setCreatedUser(gewuerzMischungDTO.getCreatedUser());
            gewuerzMischung.setCreationDate(gewuerzMischungDTO.getCreationDate());
            gewuerzMischung.setModificationUser(gewuerzMischungDTO.getModificationUser());
            gewuerzMischung.setModificationDate(gewuerzMischungDTO.getModificationDate());
            gewuerzMischung.setLockVersion(gewuerzMischungDTO.getLockVersion());

            gewuerzMischung.setMenge(gewuerzMischungDTO.getMenge());
            gewuerzMischung.setMengeneinheit(gewuerzMischungDTO.getMengeneinheit());

            BBQGewuerzDTO gewuerzDTO = gewuerzMischungDTO.getGewuerz();
            //gewuerz.setId(gewuerzDTO.getId());
            gewuerz.setCreatedUser(gewuerzDTO.getCreatedUser());
            gewuerz.setCreationDate(gewuerzDTO.getCreationDate());
            gewuerz.setModificationUser(gewuerzDTO.getModificationUser());
            gewuerz.setModificationDate(gewuerzDTO.getModificationDate());
            gewuerz.setLockVersion(gewuerzDTO.getLockVersion());

            gewuerz.setName(gewuerzDTO.getName());
            gewuerz.setArt(gewuerzDTO.getArt());
            gewuerz.setBeschreibung(gewuerzDTO.getBeschreibung());
            gewuerz.setUrl(gewuerzDTO.getUrl());

            gewuerzMischung.setGewuerz(gewuerz);

            gewuerzMischung.setRub(rub);
            rub.getGewuerzMischung().add(gewuerzMischung);

        }

        return rub;
    }

    private BBQRubDTO convertToBBQRubDTO(BBQRub rub) {
        BBQRubDTO rubDTO = new BBQRubDTO();

        rubDTO.setId(rub.getId());
        rubDTO.setCreatedUser(rub.getCreatedUser());
        rubDTO.setCreationDate(rub.getCreationDate());
        rubDTO.setModificationUser(rub.getModificationUser());
        rubDTO.setModificationDate(rub.getModificationDate());
        rubDTO.setLockVersion(rub.getLockVersion());

        rubDTO.setName(rub.getName());
        rubDTO.setBeschreibung(rub.getBeschreibung());
        rubDTO.setHerkunft(rub.getHerkunft());
        rubDTO.setUrl(rub.getUrl());



        for (BBQGewuerzMischung gewuerzMischung : rub.getGewuerzMischung()) {
            BBQGewuerzMischungDTO gewuerzMischungDTO = new BBQGewuerzMischungDTO();
            gewuerzMischungDTO.setId(gewuerzMischung.getId());
            gewuerzMischungDTO.setCreatedUser(gewuerzMischung.getCreatedUser());
            gewuerzMischungDTO.setCreationDate(gewuerzMischung.getCreationDate());
            gewuerzMischungDTO.setModificationUser(gewuerzMischung.getModificationUser());
            gewuerzMischungDTO.setModificationDate(gewuerzMischung.getModificationDate());
            gewuerzMischungDTO.setLockVersion(gewuerzMischung.getLockVersion());

            gewuerzMischungDTO.setMenge(gewuerzMischung.getMenge());
            gewuerzMischungDTO.setMengeneinheit(gewuerzMischung.getMengeneinheit());

            BBQGewuerz gewuerz = gewuerzMischung.getGewuerz();

            BBQGewuerzDTO gewuerzDTO = new BBQGewuerzDTO();
            gewuerzDTO.setId(gewuerz.getId());
            gewuerzDTO.setCreatedUser(gewuerz.getCreatedUser());
            gewuerzDTO.setCreationDate(gewuerz.getCreationDate());
            gewuerzDTO.setModificationUser(gewuerz.getModificationUser());
            gewuerzDTO.setModificationDate(gewuerz.getModificationDate());
            gewuerzDTO.setLockVersion(gewuerz.getLockVersion());

            gewuerzDTO.setName(gewuerz.getName());
            gewuerzDTO.setArt(gewuerz.getArt());
            gewuerzDTO.setBeschreibung(gewuerz.getBeschreibung());
            gewuerzDTO.setUrl(gewuerz.getUrl());

            gewuerzDTO.setGewuerzMischung(gewuerzMischungDTO);
            gewuerzMischungDTO.setGewuerz(gewuerzDTO);

            rubDTO.getGewuerzMischung().add(gewuerzMischungDTO);
        }

        return rubDTO;
    }
}
