package com.degroff.dao.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.degroff.dao.Team;

public interface TeamRepository extends CrudRepository<Team, Long>
    {

    List<Team> findByName( String name );
    }
