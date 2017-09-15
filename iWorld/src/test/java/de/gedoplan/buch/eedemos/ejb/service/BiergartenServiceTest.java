package de.gedoplan.buch.eedemos.ejb.service;

import com.platzerworld.entities.Biergarten;
import com.platzerworld.service.BiergartenService;
import de.gedoplan.buch.eedemos.ejb.util.LookupHelper;

import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;

import org.junit.BeforeClass;
import org.junit.Test;

public class BiergartenServiceTest
{
  private static Context jndiCtx;
  private static String  lookupName;
  private static BiergartenService biergartenService;

  @BeforeClass
  public static void beforeClass() throws Exception
  {
    // Anmeldung am JNDI
    jndiCtx = new InitialContext();

    Properties jndiProps = new Properties();
    jndiProps.put(Context.INITIAL_CONTEXT_FACTORY, "org.jboss.naming.remote.client.InitialContextFactory");
    jndiProps.put(Context.PROVIDER_URL, "http-remoting://localhost:8080");
    jndiProps.put("jboss.naming.client.ejb.context", true);
    Context context = new InitialContext(jndiProps);
    // java:module/iWorld/BiergartenService!com.platzerworld.service.BiergartenService
    //biergartenService = context.doLookup("java:module/iWorld/BiergartenService!com.platzerworld.service.BiergartenService");
    //biergartenService = (BiergartenService)context.lookup("java:comp/iWorld/BiergartenService!com.platzerworld.service.BiergartenService");

    InitialContext context1 = new InitialContext();

    //Lookup durchführen:
    biergartenService = (BiergartenService) context.lookup("ejb:/iWorld//BiergartenService!com.platzerworld.service.BiergartenService");


    //ejb:iWorld/BiergartenService!com.platzerworld.service.BiergartenService?stateless
    //ejb:iWorld/BiergartenService!com.platzerworld.service.BiergartenService

    // Lookup-Namen der EJB ermitteln
    //lookupName = LookupHelper.getEjbLookupName(BiergartenService.class, false);
  }


  public void testGetSrvDate() throws Exception
  {
    // Lookup der Bean
    BiergartenService biergartenService = (BiergartenService) jndiCtx.lookup(lookupName);

    // Aufruf von Bean-Methoden
    List<Biergarten> biergartenList = biergartenService.getAllBiergarten();

    System.out.println("Date on server: " + biergartenList);
  }
}
