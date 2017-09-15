package com.platzerworld.service;

import javax.ejb.Remote;

@Remote
public interface SchedulerService
{
  public void startTimers();

  public void stopTimers();
}
