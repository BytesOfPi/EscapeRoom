package com.degroff.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.degroff.dao.Player;
import com.degroff.dao.Team;
import com.degroff.dao.service.GameService;
import com.degroff.model.GameStatusResponse;
import com.degroff.model.PlayerStatusResponse;
import com.degroff.model.TeamStatusResponse;

@RestController
@RequestMapping( "api/team" )
public class TeamController
    {

    @Autowired
    private GameService svc;

    @GetMapping( value = "/player/add/{teamName}/{playerName}" )
    public GameStatusResponse addPlayer( @PathVariable String teamName, @PathVariable String playerName )
        {
        svc.addPlayer( teamName, playerName );
        return new GameStatusResponse( "Success" );
        }

    @GetMapping( value = "/add/{teamName}/{cred}" )
    public GameStatusResponse addTeam( @PathVariable String teamName, @PathVariable String cred )
        {
        svc.addTeam( new Team( teamName, cred ) );
        return new GameStatusResponse( "Success" );
        }

    @GetMapping( value = "/player/delete/{playerId}" )
    public GameStatusResponse deletePlayer( @PathVariable Long playerId )
        {
        svc.deletePlayer( playerId );
        return new GameStatusResponse( "Success" );
        }

    @GetMapping( value = "/player/get/{playerId}" )
    public PlayerStatusResponse getPlayer( @PathVariable Long playerId )
        {
        final Player player = svc.getPlayer( playerId );
        if ( player == null ) return new PlayerStatusResponse(); // return empty response
        final Team team = svc.getTeamById( player.getTeamId() );
        return new PlayerStatusResponse( player, team );
        }

    @GetMapping( value = "/get/{teamName}" )
    public Team getTeam( @PathVariable String teamName )
        {
        return svc.getTeam( teamName );
        }

    @GetMapping( value = "/all" )
    public List<Team> getTeams()
        {
        return svc.getAllTeams();
        }

    @GetMapping( value = "/status" )
    public TeamStatusResponse getTeamStats()
        {
        return svc.getTeamStats();
        }

    @GetMapping( value = "/set/{numOfTeams}" )
    public GameStatusResponse setTeamNumber( @PathVariable Long numOfTeams )
        {
        svc.setTeamNumber( numOfTeams );
        return new GameStatusResponse( "Success" );
        }

    @GetMapping( value = "/player/switch/{playerId}/{teamId}" )
    public GameStatusResponse switchPlayer( @PathVariable Long playerId, @PathVariable Long teamId )
        {
        svc.switchPlayer( playerId, teamId );
        return new GameStatusResponse( "Success" );
        }

    @PostMapping( value = "/player/update" )
    public GameStatusResponse updatePlayer( @RequestBody Player player )
        {
        svc.updatePlayer( player );
        return new GameStatusResponse( "Success" );
        }
    }
