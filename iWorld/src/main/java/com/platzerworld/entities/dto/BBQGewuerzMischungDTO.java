package com.platzerworld.entities.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by platzerworld on 10.08.17.
 */
public class BBQGewuerzMischungDTO {

    public BBQGewuerzMischungDTO() {

    }

    private Integer id;
    private Integer lockVersion;
    private Date creationDate;
    private Date modificationDate;
    private String createdUser;
    private String modificationUser;

    private Integer menge;
    private String mengeneinheit;

    @JsonBackReference
    private BBQRubDTO rub;

    private BBQGewuerzDTO gewuerz;

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

    public Integer getMenge() {
        return menge;
    }

    public void setMenge(Integer menge) {
        this.menge = menge;
    }

    public String getMengeneinheit() {
        return mengeneinheit;
    }

    public void setMengeneinheit(String mengeneinheit) {
        this.mengeneinheit = mengeneinheit;
    }

    public BBQRubDTO getRub() {
        return rub;
    }

    public void setRub(BBQRubDTO rub) {
        this.rub = rub;
    }

    public BBQGewuerzDTO getGewuerz() {
        return gewuerz;
    }

    public void setGewuerz(BBQGewuerzDTO gewuerz) {
        this.gewuerz = gewuerz;
    }
}
