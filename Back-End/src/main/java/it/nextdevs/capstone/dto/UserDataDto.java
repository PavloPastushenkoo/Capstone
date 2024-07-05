package it.nextdevs.capstone.dto;

import it.nextdevs.capstone.enums.TipoUtente;
import lombok.Data;

@Data
public class UserDataDto {
    private int idUtente;
    private String email;
    private String username;
    private String nome;
    private String cognome;
    private TipoUtente tipoUtente;
    private String avatar;
    private Integer eta;
    private double peso;
    private String dataDiNascita;
}
