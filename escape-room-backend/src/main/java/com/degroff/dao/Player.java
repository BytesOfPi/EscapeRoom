package com.degroff.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity( name = "Player" )
@Table( name = "PLAYER" )
public class Player
    {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "id", insertable = true, updatable = true, unique = true, nullable = false )
    private Long id;

    @Column( name = "team_id" ) // , insertable = false, updatable = false
    private Long teamId;

    private String name;

    // @ManyToOne( cascade = CascadeType.ALL, fetch = FetchType.LAZY )
    // @JoinColumn( name = "team_id" )
    // private Team team;

    protected Player()
        {
        // TODO Auto-generated constructor stub
        }

    public Player( Long teamId, String name )
        {
        super();
        this.teamId = teamId;
        this.name = name;
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

    public void setId( Long id )
        {
        this.id = id;
        }

    public void setName( String name )
        {
        this.name = name;
        }

    // public void setTeam( Team team )
    // {
    // this.team = team;
    // }

    public void setTeamId( Long teamId )
        {
        this.teamId = teamId;
        }

    }
