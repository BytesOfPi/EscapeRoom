package com.degroff.dao.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.degroff.dao.Attempt;

public interface AttemptRepository extends CrudRepository<Attempt, Long>
    {
    List<Attempt> findByStatus( String status );

    List<Attempt> findByTeamId( Long teamId );
    }
