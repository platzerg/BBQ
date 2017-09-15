package com.platzerworld.validator;

import com.platzerworld.constraint.ValidAdresse;
import com.platzerworld.entities.Adresse;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * BV-Validator zum Constraint {@link com.platzerworld.constraint.ValidAdresse}.
 * 
 * Adressen sind gültig, wenn ihre Komponenten entweder komplett <code>null</code> oder nicht <code>null</code> sind.
 * 
 * @author dw
 */
public class AdresseValidator implements ConstraintValidator<ValidAdresse, Adresse>
{
  @Override
  public void initialize(ValidAdresse constraint)
  {
  }

  @Override
  public boolean isValid(Adresse adresse, ConstraintValidatorContext validationContext)
  {
    // null ist ok
    if (adresse == null)
    {
      return true;
    }

    // alles null ist ok
    if (adresse.getOrt() == null && adresse.getPlz() == null && adresse.getStrasse() == null)
    {
      return true;
    }

    // alles gefüllt ist ok
    if (adresse.getOrt() != null && adresse.getPlz() != null && adresse.getStrasse() != null)
    {
      return true;
    }

    return false;
  }
}
