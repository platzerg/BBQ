package com.platzerworld.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

/**
 * Servlet-Filter zum Setzen des Encodings von Request und Response.
 * 
 * Diese Anwendung nutzt UTF-8 für die Kodierung der Webseiten. Dies ist im globalen Template auch so eingetragen. Trotzdem werden
 * Eingabewerte nicht mit UTF-8 angenommen, so dass bswl. Umlaute verfälscht werden. Dieser Filter setzt das Encoding nochmals
 * explizit.
 * 
 * @author dw
 */
@WebFilter(urlPatterns = "/*")
public class Utf8Filter implements Filter
{
  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
  {
    request.setCharacterEncoding("UTF-8");
    response.setCharacterEncoding("UTF-8");
    chain.doFilter(request, response);
  }

  @Override
  public void init(FilterConfig arg0) throws ServletException
  {
  }

  @Override
  public void destroy()
  {
  }
}
