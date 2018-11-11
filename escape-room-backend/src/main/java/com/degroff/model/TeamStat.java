package com.degroff.model;

import java.util.ArrayList;
import java.util.List;

import com.degroff.dao.Team;

public class TeamStat
    {
    private Long teamId;
    private String teamName;
    private String color;
    private final List<Long> passQIDs = new ArrayList<>();
    private int correct;

    public TeamStat()
        {
        // TODO Auto-generated constructor stub
        }

    // public TeamStat( Long id, String name )
    // {
    // super();
    // this.teamId = id;
    // this.teamName = name;
    // this.correct = 0;
    // }

    public TeamStat( Team team, int correct )
        {
        super();
        this.teamId = team.getId();
        this.teamName = team.getName();
        this.color = team.getColor();
        this.correct = correct;
        }

    // public TeamStat( Long id, String name, int correct )
    // {
    // super();
    // this.teamId = id;
    // this.teamName = name;
    // this.correct = correct;
    // }

    public void addCorrect()
        {
        correct++;
        }

    public void addPassQID( Long passQID )
        {
        passQIDs.add( passQID );
        }

    public String getColor()
        {
        return color;
        }

    public int getCorrect()
        {
        return correct;
        }

    public List<Long> getPassQIDs()
        {
        return passQIDs;
        }

    public Long getTeamId()
        {
        return teamId;
        }

    public String getTeamName()
        {
        return teamName;
        }

    public void setColor( String color )
        {
        this.color = color;
        }

    public void setCorrect( int correct )
        {
        this.correct = correct;
        }

    public void setTeamId( Long id )
        {
        this.teamId = id;
        }

    public void setTeamName( String name )
        {
        this.teamName = name;
        }

    }
