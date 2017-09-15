package com.platzerworld.service;


import com.platzerworld.dao.BiergartenDAO;
import com.platzerworld.entities.Adresse;
import com.platzerworld.entities.Biergarten;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Stateless
public class BiergartenService {
    @EJB
    private BiergartenDAO biergartenDAO;

    @PersistenceContext(unitName = "iWorld")
    private EntityManager entityManager;

    public List<Biergarten> getAllBiergarten() {
        entityManager.flush();
        return entityManager.createNamedQuery(Biergarten.FIND_ALL, Biergarten.class).getResultList();
    }

    public Biergarten getAllBiergartenById(int id) {
        return biergartenDAO.find(Biergarten.class, id);
    }

    public List<Biergarten> getBiergartenByName(String name) {
        return biergartenDAO.getBiergartenByName(name);
    }

    public List<Biergarten> loadBiergartenByName(String name) {
        return biergartenDAO.loadBiergartenByName(name);
    }

    public void deleteBiergartenByname(String name) {
        List<Biergarten> biergartenList = biergartenDAO.getBiergartenByName(name);
        for (Biergarten biergarten : biergartenList) {
            biergartenDAO.delete(biergarten.getId());
        }
    }

    public void deleteBiergartenById(int id) {
        biergartenDAO.delete(id);
    }

    public Biergarten addBiergarten(final Biergarten biergarten) {
        Biergarten newBiergarten = biergartenDAO.create(biergarten);
        return newBiergarten;
    }

    public List<Biergarten> addBiergarten(final List<Biergarten> biergartenList) {
        List<Biergarten> addedBiergarten = new ArrayList<Biergarten>();
        for (Biergarten biergarten : biergartenList) {
            Biergarten newBiergarten = biergartenDAO.create(biergarten);
            addedBiergarten.add(newBiergarten);
        }

        return addedBiergarten;
    }
}
