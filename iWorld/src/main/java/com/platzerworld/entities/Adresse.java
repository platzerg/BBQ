package com.platzerworld.entities;


import com.platzerworld.constraint.ValidAdresse;
import com.platzerworld.constraint.ValidPlz;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Embeddable;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Embeddable
@Access(AccessType.FIELD)
@ValidAdresse
public class Adresse implements Serializable
{
  private static final long serialVersionUID = 1L;

  @Size(min = 1)
  private String            strasse;

  // @Pattern(regexp = "\\d{5}", message = "muss genau 5 Ziffern enthalten")
  @ValidPlz
  private String            plz;

  @Size(min = 1)
  private String            ort;

  public String getStrasse()
  {
    return this.strasse;
  }

  public void setStrasse(String strasse)
  {
    this.strasse = strasse;
  }

  public String getPlz()
  {
    return this.plz;
  }

  public void setPlz(String plz)
  {
    this.plz = plz;
  }

  public String getOrt()
  {
    return this.ort;
  }

  public void setOrt(String ort)
  {
    this.ort = ort;
  }

  @Override
  public String toString()
  {
    return "Adresse [strasse=" + this.strasse + ", plz=" + this.plz + ", ort=" + this.ort + "]";
  }
}
