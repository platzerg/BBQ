package com.platzerworld.entities;

import com.platzerworld.entities.listener.*;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "T_BBQ_Rub",schema = "platzerworld")
@EntityListeners({
        TraceListener.class,
        CreatedAtListener.class,
        UpdatedAtListener.class
})

@NamedQueries({
        @NamedQuery(name = BBQRub.FIND_ALL, query = "SELECT m FROM BBQRub m"),
        @NamedQuery(name = "bbqrub.list", query = "select u from BBQRub u")
})
public class BBQRub implements Creatable, Updatable{

    private static final long serialVersionUID = 1L;
    public static final String FIND_ALL = "BBQRub.findAll";

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

    @Column(name = "herkunft", nullable = true)
    private String herkunft;

    @Column(name = "url", nullable = true)
    private String url;

    @OneToMany(mappedBy="rub", fetch=FetchType.EAGER, cascade = {CascadeType.ALL})
    private List<BBQGewuerzMischung> gewuerzMischung = new ArrayList<>();

    public BBQRub() {

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

    public String getHerkunft() {
        return herkunft;
    }

    public void setHerkunft(String herkunft) {
        this.herkunft = herkunft;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<BBQGewuerzMischung> getGewuerzMischung() {
        return gewuerzMischung;
    }

    public void setGewuerzMischung(List<BBQGewuerzMischung> gewuerzMischung) {
        this.gewuerzMischung = gewuerzMischung;
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
