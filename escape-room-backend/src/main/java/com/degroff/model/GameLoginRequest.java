package com.degroff.model;

public class GameLoginRequest
    {
    private String team;
    private String player;
    private String creds;

    public String getCreds()
        {
        return creds;
        }

    public String getPlayer()
        {
        return player;
        }

    public String getTeam()
        {
        return team;
        }

    public void setCreds( String creds )
        {
        this.creds = creds;
        }

    public void setPlayer( String player )
        {
        this.player = player;
        }

    public void setTeam( String team )
        {
        this.team = team;
        }

    }
