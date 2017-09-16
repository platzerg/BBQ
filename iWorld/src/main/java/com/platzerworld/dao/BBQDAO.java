package com.platzerworld.dao;

import com.platzerworld.entities.*;

import javax.ejb.Stateless;
import java.util.List;

/**
 * Created by platzerworld on 02.07.16.
 */
@Stateless
public class BBQDAO extends DAO {

    public BBQRub updateBBQRub(BBQRub rub) {
        return this.update(rub);
    }

    public BBQRub updateBBQRub(int id, List<BBQGewuerzMischung> gewuerzMischungen) {
        BBQRub rub = this.find(BBQRub.class, id);
        if (rub == null) {
            throw new IllegalArgumentException("comment with id " + id + " not found");
        }

        for (BBQGewuerzMischung gewuerzMischung : gewuerzMischungen) {
            rub.setGewuerzMischung(gewuerzMischungen);
            this.update(rub);

        }

        return this.find(BBQRub.class, id);
    }

    public BBQRub updateBBQRub(int id, BBQGewuerzMischung bbqGewuerzMischung) {
        BBQRub rub = this.find(BBQRub.class, id);
        if (rub == null) {
            throw new IllegalArgumentException("comment with id " + id + " not found");
        }

        rub.getGewuerzMischung().add(bbqGewuerzMischung);
        this.update(rub);

        return this.find(BBQRub.class, id);
    }

    public BBQGewuerzMischung addBBQGewuerzmischung(int id, BBQGewuerzMischung bbqGewuerzMischung) {
        bbqGewuerzMischung.setRubId(id);
        BBQGewuerz gewuerz = this.find(BBQGewuerz.class, 1);
        bbqGewuerzMischung.setGewuerz(gewuerz);

        BBQGewuerzMischung newBBQGewuerzMischung = this.create(bbqGewuerzMischung);

        return newBBQGewuerzMischung;
    }

    public BBQGewuerzMischung updateBBQGewuerzmischung(int id, BBQGewuerzMischung bbqGewuerzMischung) {
        BBQGewuerzMischung updatedBBQGewuerzMischung = this.update(bbqGewuerzMischung);

        return updatedBBQGewuerzMischung;
    }

    public BBQGewuerz updateBBQGewuerz(BBQGewuerz gewuerz) {
        return this.update(gewuerz);
    }

    public void delete(int id) {
        this.delete(Biergarten.class, id);
    }

    public void deleteGewuerz(int id) {
        this.delete(BBQGewuerz.class, id);
    }

    public void deleteGewuerzmischung(int id) {
        BBQGewuerzMischung gewuerzMischung = this.find(BBQGewuerzMischung.class, id);
        if (gewuerzMischung == null) {
            throw new IllegalArgumentException("BBQGewuerzMischung with id " + id + " not found");
        }
        this.delete(BBQGewuerzMischung.class, gewuerzMischung.getId());
    }

    public void deleteRub(int id) {
        this.delete(BBQRub.class, id);
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
