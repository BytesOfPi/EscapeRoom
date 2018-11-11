package com.degroff.model;

import java.util.ArrayList;
import java.util.List;

public class TeamStatusResponse
    {

    private Long total;
    private List<TeamStat> teams;

    public TeamStatusResponse( Long total )
        {
        this.total = total;
        teams = new ArrayList<>();
        }

    public List<TeamStat> getTeams()
        {
        return teams;
        }

    public Long getTotal()
        {
        return total;
        }

    public void setTeams( List<TeamStat> teams )
        {
        this.teams = teams;
        }

    public void setTotal( Long total )
        {
        this.total = total;
        }

    }
