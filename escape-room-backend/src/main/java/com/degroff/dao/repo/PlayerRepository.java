package com.degroff.dao.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.degroff.dao.Player;

public interface PlayerRepository extends CrudRepository<Player, Long>
    {

    List<Player> findByName( String name );

    List<Player> findByTeamId( Long teamId );
    }
