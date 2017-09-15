package com.platzerworld.entities.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Date;

/**
 * Created by platzerworld on 10.08.17. */
public class BBQGewuerzDTO {

    public BBQGewuerzDTO() {

    }

    private Integer id;
    private Integer lockVersion;
    private Date creationDate;
    private Date modificationDate;
    private String createdUser;
    private String modificationUser;
    private String name;
    private String art;
    private String beschreibung;
    private String url;

    @JsonBackReference
    private BBQGewuerzMischungDTO gewuerzMischung;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getLockVersion() {
        return lockVersion;
    }

    public void setLockVersion(Integer lockVersion) {
        this.lockVersion = lockVersion;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
    }

    public String getCreatedUser() {
        return createdUser;
    }

    public void setCreatedUser(String createdUser) {
        this.createdUser = createdUser;
    }

    public String getModificationUser() {
        return modificationUser;
    }

    public void setModificationUser(String modificationUser) {
        this.modificationUser = modificationUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArt() {
        return art;
    }

    public void setArt(String art) {
        this.art = art;
    }

    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public BBQGewuerzMischungDTO getGewuerzMischung() {
        return gewuerzMischung;
    }

    public void setGewuerzMischung(BBQGewuerzMischungDTO gewuerzMischung) {
        this.gewuerzMischung = gewuerzMischung;
    }
}
