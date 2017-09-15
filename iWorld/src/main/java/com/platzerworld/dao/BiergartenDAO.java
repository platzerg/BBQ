package com.platzerworld.dao;

import com.platzerworld.entities.Adresse;
import com.platzerworld.entities.Biergarten;

import javax.ejb.Stateless;
import java.util.List;

/**
 * Created by platzerworld on 02.07.16.
 */
@Stateless
public class BiergartenDAO extends DAO {

    public Biergarten create(String name, String pwd, String mail) {
        Biergarten biergarten = new Biergarten();

        biergarten.setName("platzerworld");
        Adresse adresse = new Adresse();
        adresse.setStrasse("Gyßlingstraße");
        adresse.setPlz("80805");
        adresse.setOrt("München");
        biergarten.setAdresse(adresse);

        biergarten.setTelefon("089 / 36100880");//
        biergarten.setEmail("aumeister@aumeister.de");
        biergarten.setUrl("minihofbraeuhaus.de/");//
        biergarten.setLatitude("48,167011");
        biergarten.setLongitude("11,607648");
        biergarten.setMass("Mass");
        biergarten.setApfelschorle("AS");
        biergarten.setRiesenbreze("RB");
        biergarten.setObazda("Obazda");
        biergarten.setBiermarke("BM");
        biergarten.setLieblingsgericht("LG");
        biergarten.setSpeisekommentar("Speisekommentar");
        biergarten.setDescShort("DESC LONG");
        biergarten.setDescLong("Übers ganze Jahr süddeutsche Kost und Biere im gemütlichen und hundefreundlichen Gastgarten oder im Zelt.");
        biergarten.setFavorit(false);//
        return this.create(biergarten);
    }

    public Biergarten update(int id, String name) {
        Biergarten biergarten = this.find(Biergarten.class, id);
        if (biergarten == null) {
            throw new IllegalArgumentException("comment with id " + id + " not found");
        }
        biergarten.setName(name);

        return this.update(biergarten);
    }

    public void delete(int id) {
        this.delete(Biergarten.class, id);
    }

    public Biergarten getBiergartenById(int biergartenId) {
        Biergarten biergrten = this.find(Biergarten.class, biergartenId);
        if (biergrten == null) {
            throw new IllegalArgumentException("Biergarten with id " + biergartenId + " not found");
        }
        return biergrten;
    }

    public List<Biergarten> list(int first, int max) {
        return this.namedFind(Biergarten.class, "biergarten.list", first, max);
    }
}
