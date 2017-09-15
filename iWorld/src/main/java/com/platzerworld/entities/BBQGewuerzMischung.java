package com.platzerworld.entities;

import com.platzerworld.entities.listener.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "T_BBQ_GewuerzMischung",schema = "platzerworld")
@EntityListeners({
        TraceListener.class,
        CreatedAtListener.class,
        UpdatedAtListener.class
})

@NamedQueries({
        @NamedQuery(name = BBQGewuerzMischung.FIND_ALL, query = "SELECT m FROM BBQGewuerzMischung m"),
        @NamedQuery(name = "bbqgewuerzmischung.list", query = "select u from BBQGewuerzMischung u")
})
public class BBQGewuerzMischung implements Creatable, Updatable{

    private static final long serialVersionUID = 1L;
    public static final String FIND_ALL = "BBQGewuerzMischung.findAll";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "lockVersion", nullable = true)
    private Integer lockVersion;

    @Column(name = "creationDate", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Column(name = "modificationDate", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date modificationDate;

    @Column(name = "createdUser", nullable = true)
    private String createdUser;

    @Column(name = "modificationUser", nullable = true)
    private String modificationUser;

    @Column(name = "menge", nullable = true)
    private Integer menge;

    @Column(name = "mengeneinheit", nullable = true)
    private String mengeneinheit;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinColumn(name="rub_id")
    private BBQRub rub;

    @OneToOne (fetch = FetchType.EAGER, cascade = {CascadeType.ALL} )
    private BBQGewuerz gewuerz;

    public BBQGewuerzMischung() {

    }

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

    public BBQRub getRub() {
        return rub;
    }

    public void setRub(BBQRub rub) {
        this.rub = rub;
    }

    public BBQGewuerz getGewuerz() {
        return gewuerz;
    }

    public void setGewuerz(BBQGewuerz gewuerz) {
        this.gewuerz = gewuerz;
    }

    @Override
    public void setCreatedAt(Date date) {
        this.creationDate = date;
        this.modificationDate = date;
        this.createdUser = "bbqworld";
        this.modificationUser = "bbqworld";
        System.out.println("setCreatedAt");
    }

    @Override
    public void setUpdatedAt(Date date) {
        this.modificationUser = "bbqworld";
        this.modificationDate = date;
        System.out.println("setUpdatedAt");
    }

}
