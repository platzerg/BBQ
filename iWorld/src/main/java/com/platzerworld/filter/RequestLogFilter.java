package com.platzerworld.filter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

/**
 * Servlet-Filter zum Loggen von Requests.
 * 
 * @author dw
 */
@WebFilter(urlPatterns = "/*")
public class RequestLogFilter implements Filter
{
  private static final Log LOGGER = LogFactory.getLog(RequestLogFilter.class);

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
  {
    if (LOGGER.isTraceEnabled())
    {
      LOGGER.trace("--------------------------------------------------------------------------------");
    }
    LOGGER.trace("--------------------------------------------------------------------------------");
    System.out.println("-----------------------" +request + "--------------------------");
    System.out.println("-----------------------" +response + "--------------------------");

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
