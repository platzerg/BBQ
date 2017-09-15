package com.platzerworld.constraint;

// CHECKSTYLE:OFF

import com.platzerworld.validator.AdresseValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * BV-Constraint für Strassenadressen.
 * 
 * Anwendbar auf die Klasse {@link com.platzerworld.entities.Adresse}. Details siehe {@link AdresseValidator}.
 * 
 * @author dw
 * 
 */
@Constraint(validatedBy = AdresseValidator.class)
@Target({ FIELD, METHOD, TYPE })
@Retention(RUNTIME)
public @interface ValidAdresse
{
  String message() default "{com.platzerworld.constraint.ValidAdresse.message}";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
