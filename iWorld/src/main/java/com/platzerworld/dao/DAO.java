package com.platzerworld.dao;

/**
 * Created by platzerworld on 02.07.16.
 */

import com.platzerworld.entities.BBQRub;
import com.platzerworld.entities.Biergarten;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * Simply maps the entitymanager.
 * It simplifies refactoring (unitName change) and wraps some logic (limited queries).
 *
 */
@Stateless
public class DAO {
    @PersistenceContext(unitName = "iWorld")
    private EntityManager em;

    public <E> E create(E e) {
        em.persist(e);
        return e;
    }

    public <E> E update(E e) {
        return em.merge(e);
    }

    public <E> void delete(Class<E> clazz, int id) {
        em.remove(em.find(clazz, id));
    }

    public <E> E find(Class<E> clazz, int id) {
        return em.find(clazz, id);
    }

    public <E> List<E> find(Class<E> clazz, String query, int min, int max) {
        return queryRange(em.createQuery(query, clazz), min, max).getResultList();
    }

    public <E> List<E> namedFind(Class<E> clazz, String query, int min, int max) {
        return queryRange(em.createNamedQuery(query, clazz), min, max).getResultList();
    }

    private static Query queryRange(Query query, int min, int max) {
        if (max >= 0) {
            query.setMaxResults(max);
        }
        if (min >= 0) {
            query.setFirstResult(min);
        }
        return query;
    }

    public List<Biergarten> getBiergartenByName(String name) {
        TypedQuery<Biergarten> query = em.createQuery(
                "SELECT b FROM Biergarten b WHERE b.name = :name", Biergarten.class);
        return query.setParameter("name", name).getResultList();
    }


    public List<Biergarten> loadBiergartenByName(String name) {
        TypedQuery<Biergarten> query = em.createQuery(
                "SELECT b FROM Biergarten b WHERE b.name like  :name", Biergarten.class);
        return query.setParameter("name","%"+name+"%").getResultList();
    }

    public List<BBQRub> loadBBQRubsByName(String name) {
        TypedQuery<BBQRub> query = em.createQuery(
                "SELECT b FROM BBQRub b WHERE b.name like  :name", BBQRub.class);
        return query.setParameter("name","%"+name+"%").getResultList();
    }
}