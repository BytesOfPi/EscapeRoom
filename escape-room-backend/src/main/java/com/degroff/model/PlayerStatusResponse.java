package com.degroff.model;

import com.degroff.dao.Player;
import com.degroff.dao.Team;

public class PlayerStatusResponse
    {
    private Long id;
    private Long teamId;
    private String teamName;
    private String name;
    private final String teamColor;

    public PlayerStatusResponse()
        {
        // TODO Auto-generated constructor stub
        this.id = 0L;
        this.name = "BAD";
        this.teamId = 0L;
        this.teamName = "BAD";
        this.teamColor = "BAD";
        }

    public PlayerStatusResponse( Player player, Team team )
        {
        // TODO Auto-generated constructor stub
        this.id = player.getId();
        this.name = player.getName();
        this.teamId = player.getTeamId();
        this.teamName = team.getName();
        this.teamColor = team.getColor();
        }

    public Long getId()
        {
        return id;
        }

    public String getName()
        {
        return name;
        }

    public Long getTeamId()
        {
        return teamId;
        }

    public String getTeamName()
        {
        return teamName;
        }

    public void setId( Long id )
        {
        this.id = id;
        }

    public void setName( String name )
        {
        this.name = name;
        }

    public void setTeamId( Long teamId )
        {
        this.teamId = teamId;
        }

    public void setTeamName( String teamName )
        {
        this.teamName = teamName;
        }

    }
