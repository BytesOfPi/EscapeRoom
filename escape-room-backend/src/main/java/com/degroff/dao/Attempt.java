package com.degroff.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity( name = "Attempt" )
@Table( name = "ATTEMPT" )
public class Attempt
    {
    public static String STATUS_IN_PROGRESS = "I";
    public static String STATUS_SUCCESS = "S";
    public static String STATUS_FAIL = "F";

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "id", insertable = true, updatable = true, unique = true, nullable = false )
    private Long id;
    @Column( name = "player_id" )
    private Long playerId;
    @Column( name = "player_name" )
    private String playerName;
    @Column( name = "team_id" )
    private Long teamId;

    @Column( name = "team_name" )
    private String teamName;

    @Column( name = "question_id" )
    private Long questionId;
    @Lob
    @Column( name = "guess" )
    private String guess;
    @Column( name = "status", length = 1 )
    private String status;

    protected Attempt()
        {
        // TODO Auto-generated constructor stub
        }

    public String getGuess()
        {
        return guess;
        }

    public Long getId()
        {
        return id;
        }

    public Long getPlayerId()
        {
        return playerId;
        }

    public String getPlayerName()
        {
        return playerName;
        }

    public Long getQuestionId()
        {
        return questionId;
        }

    public String getStatus()
        {
        return status;
        }

    public Long getTeamId()
        {
        return teamId;
        }

    public String getTeamName()
        {
        return teamName;
        }

    public void setGuess( String guess )
        {
        this.guess = guess;
        }

    public void setId( Long id )
        {
        this.id = id;
        }

    public void setPlayerId( Long playerId )
        {
        this.playerId = playerId;
        }

    public void setPlayerName( String playerName )
        {
        this.playerName = playerName;
        }

    public void setQuestionId( Long questionId )
        {
        this.questionId = questionId;
        }

    public void setStatus( String status )
        {
        this.status = status;
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
