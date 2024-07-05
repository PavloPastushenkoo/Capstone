package it.nextdevs.capstone.repository;

import it.nextdevs.capstone.model.Esercizio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EsercizioRepository extends JpaRepository <Esercizio, Integer>{
    List<Esercizio> findByUser_IdUtente(int userId);
}

