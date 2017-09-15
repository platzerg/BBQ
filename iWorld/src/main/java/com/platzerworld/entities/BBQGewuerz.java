package com.platzerworld.entities;

import com.platzerworld.entities.listener.*;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

@Entity
@Table(name = "T_BBQ_Gewuerz",schema = "platzerworld")
@EntityListeners({
        TraceListener.class,
        CreatedAtListener.class,
        UpdatedAtListener.class
})

@NamedQueries({
        @NamedQuery(name = BBQGewuerz.FIND_ALL, query = "SELECT m FROM BBQGewuerz m"),
        @NamedQuery(name = "bbqgewuerz.list", query = "select u from BBQGewuerz u")
})
public class BBQGewuerz implements Creatable, Updatable{

    private static final long serialVersionUID = 1L;
    public static final String FIND_ALL = "BBQGewuerz.findAll";

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

    @Column(name = "name", nullable = true)
    private String name;

    @Column(name = "beschreibung", nullable = true)
    private String beschreibung;

    @Column(name = "url", nullable = true)
    private String url;

    @Column(name = "art", nullable = true)
    private  String art;

    public BBQGewuerz() {

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getArt() {
        return art;
    }

    public void setArt(String art) {
        this.art = art;
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
